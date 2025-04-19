import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProjects, saveProjects, deleteProject, LocalProject, ProjectStatus } from "../utils/localProjects";

// Utilidad para badges de estado
const getStatusBadge = (estado: ProjectStatus | string) => {
  switch (estado) {
    case "desplegado":
      return <span className="px-3 py-1 rounded text-sm font-semibold bg-green-100 text-green-700 shadow-sm border border-green-200">Online</span>;
    case "en pausa":
      return <span className="px-3 py-1 rounded text-sm font-semibold bg-amber-100 text-amber-700 shadow-sm border border-amber-200">En pausa</span>;
    case "error":
      return <span className="px-3 py-1 rounded text-sm font-semibold bg-red-100 text-red-700 shadow-sm border border-red-200">Error</span>;
    default:
      return <span className="px-3 py-1 rounded text-sm font-semibold bg-gray-100 text-gray-700 shadow-sm border border-gray-200">Desconocido</span>;
  }
};

// Sidebar Dashboard
import LanzoLogo from "../assets/logos/LanzoLogo.png";

const DashboardNav: React.FC<{ onNavigate: (page: string) => void; active: string }> = ({ onNavigate, active }) => (
  <aside className="bg-blue-800 min-h-screen w-64 flex flex-col justify-between shadow-lg">
    <div>
      <div className="flex items-center justify-center h-16 px-6 border-b border-indigo-600">
        <img src={LanzoLogo} alt="Lanzo Logo" className="h-8 w-8 mr-2 brightness-200" />
      </div>
      <nav className="flex flex-col gap-2 mt-6 px-4">
        <button className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${active === "dashboard" ? "bg-indigo-900/40 text-white" : "text-white/80 hover:bg-indigo-600/30 hover:text-white"}`} onClick={() => onNavigate("dashboard")}>Dashboard</button>
        <button className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${active === "projects" ? "bg-indigo-900/40 text-white" : "text-white/80 hover:bg-indigo-600/30 hover:text-white"}`} onClick={() => onNavigate("projects")}>Aplicaciones</button>
      </nav>
    </div>
  </aside>
);

// Tarjeta de proyecto
interface ProjectCardProps {
  project: LocalProject;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

import { useStopContainer, usePauseContainer, useUnpauseContainer } from "../hooks/useDocker";
import useTerraform from "../hooks/useTerraform";

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete, onToggleStatus }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-indigo-100">
    <div>
      <h2 className="text-2xl font-bold mb-2 text-indigo-900">{project.nombre}</h2>
      <div className="text-lg text-indigo-700 mb-3">Proveedor: {project.proveedor}</div>
      <div className="text-lg text-indigo-700 mb-3">
        IP: <a
          href={`http://${project.ip}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#2563eb", textDecoration: "underline", cursor: "pointer" }}
        >
          {project.ip}
        </a>
      </div>
      <div className="flex items-center gap-8 text-lg text-indigo-800">
        <span>Estado: {getStatusBadge(project.estado)}</span>
        <span>Último despliegue: {project.fecha}</span>
      </div>
    </div>
    <div className="flex gap-3 md:flex-col md:gap-3 min-w-[120px]">
      {project.proveedor?.toLowerCase() !== 'azure' && (
        <button
          onClick={() => onToggleStatus(project.id)}
          className={`px-6 py-3 rounded-lg font-semibold text-lg transition shadow-sm ${project.estado === 'desplegado' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
        >
          {project.estado === 'desplegado' ? 'Pausar' : project.estado === 'en pausa' ? 'Reanudar' : 'Sin acción'}
        </button>
      )}
      <button
        onClick={() => onDelete(project.id)}
        className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-semibold text-lg transition shadow-sm"
      >
        Eliminar
      </button>
    </div>
  </div>
);

import DeploymentPage from "./Deployment";

const Projects: React.FC = () => {
  const { stop: stopContainer } = useStopContainer();
  const { pause: pauseContainer } = usePauseContainer();
  const { unpause: unpauseContainer } = useUnpauseContainer();
  const { destroy } = useTerraform();
  const [projects, setProjects] = useState<LocalProject[]>([]);
  const [page, setPage] = useState("projects");
  const [showAzureModal, setShowAzureModal] = useState(false);
  const [azureModalProject, setAzureModalProject] = useState<LocalProject | null>(null);
  const [azureCreds, setAzureCreds] = useState({
    azure_client_id: "",
    azure_client_secret: "",
    azure_subscription_id: "",
    azure_tenant_id: "",
  });

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  // Handler para el botón de actualizar
  const handleRefresh = () => {
    setProjects(getProjects());
  };

  const handleDelete = async (id: string) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    if (project.proveedor.toLowerCase() === "azure") {
      setAzureModalProject(project);
      setAzureCreds({
        azure_client_id: project.azure_client_id || "",
        azure_client_secret: project.azure_client_secret || "",
        azure_subscription_id: project.azure_subscription_id || "",
        azure_tenant_id: project.azure_tenant_id || "",
      });
      setShowAzureModal(true);
      return;
    } else {
      // Lógica de borrado para Docker/local
      const toastId = toast.loading("Eliminando contenedor...");
      const res = await stopContainer(project.nombre);
      if (res && res.message) {
        toast.update(toastId, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        deleteProject(id);
        setProjects(getProjects());
      } else {
        toast.update(toastId, {
          render: "Error al eliminar el contenedor.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    if (project.estado === "desplegado") {
      // Pausar
      const dockerHost = project.ip?.split(':')[0];
const isLocal = !dockerHost || dockerHost === "localhost" || dockerHost === "127.0.0.1";
const res = await pauseContainer(project.nombre, isLocal ? undefined : dockerHost);
      if (res && res.message) {
        toast.success(res.message);
        const updated = projects.map(proj =>
          proj.id === id ? { ...proj, estado: "en pausa" as ProjectStatus } : proj
        );
        setProjects(updated);
        saveProjects(updated);
      } else {
        alert("Error al pausar el contenedor.");
      }
    } else if (project.estado === "en pausa") {
      // Reanudar
      const dockerHost = project.ip?.split(':')[0];
const isLocal = !dockerHost || dockerHost === "localhost" || dockerHost === "127.0.0.1";
const res = await unpauseContainer(project.nombre, isLocal ? undefined : dockerHost);
      if (res && res.message) {
        toast.success(res.message);
        const updated = projects.map(proj =>
          proj.id === id ? { ...proj, estado: "desplegado" as ProjectStatus } : proj
        );
        setProjects(updated);
        saveProjects(updated);
      } else {
        alert("Error al reanudar el contenedor.");
      }
    }
  };

  // Maneja la confirmación de borrado en Azure con credenciales
  const handleConfirmAzureDelete = async () => {
    if (!azureModalProject) return;
    const toastId = toast.loading("Eliminando proyecto, por favor espere...");
    try {
      const res = await destroy("customvm", azureCreds);
      if (res && res.message) {
        toast.update(toastId, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        deleteProject(azureModalProject.id);
        setProjects(getProjects());
      } else {
        toast.update(toastId, {
          render: "Error al eliminar recursos en Azure.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Error al eliminar recursos en Azure.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
    setShowAzureModal(false);
    setAzureModalProject(null);
  };

  // Dashboard dummy page
  if (page === "dashboard") {
    return (
      <div className="flex min-h-screen">
        <DashboardNav onNavigate={setPage} active={page} />
        <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
          <div className="w-full max-w-3xl">
            {/* Incrustamos la página de despliegue aquí */}
            <DeploymentPage />
          </div>
        </main>
      </div>
    );
  }

  // Projects page
  if (projects.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-12">
        <p className="text-xl mb-4 text-indigo-900">No tienes ninguna aplicación aún.</p>
        <div className="flex gap-4">
          <button
            onClick={handleRefresh}
            className="px-8 py-4 rounded-xl bg-blue-500 text-white font-bold text-lg shadow-md hover:bg-blue-600 transition"
          >
            Actualizar
          </button>
          <button
            onClick={() => setPage("dashboard")}
            className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-md hover:bg-indigo-700 transition"
          >
            + Nueva Aplicación
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen">
        <DashboardNav onNavigate={setPage} active={page} />
        <main className="flex-1 bg-gradient-to-br from-indigo-50 to-blue-50 p-12">
          <div className="flex items-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-900 mr-4">Aplicaciones</h1>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
            >
              Actualizar
            </button>
          </div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setPage("dashboard")}
              className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-md hover:bg-indigo-700 transition"
            >
              + Nueva Aplicación
            </button>
          </div>
          <div className="grid gap-8">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
            ))}
          </div>
        </main>
      </div>
      {showAzureModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Credenciales Azure</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Client ID</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={azureCreds.azure_client_id}
                onChange={(e) => setAzureCreds({ ...azureCreds, azure_client_id: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Client Secret</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={azureCreds.azure_client_secret}
                onChange={(e) => setAzureCreds({ ...azureCreds, azure_client_secret: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Subscription ID</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={azureCreds.azure_subscription_id}
                onChange={(e) => setAzureCreds({ ...azureCreds, azure_subscription_id: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tenant ID</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={azureCreds.azure_tenant_id}
                onChange={(e) => setAzureCreds({ ...azureCreds, azure_tenant_id: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setShowAzureModal(false); setAzureModalProject(null); }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAzureDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
