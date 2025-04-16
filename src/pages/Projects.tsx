import React, { useEffect, useState } from "react";
import { getProjects, saveProjects, deleteProject, LocalProject } from "../utils/localProjects";

// Utilidad para badges de estado
const getStatusBadge = (estado: string) => {
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

const dummyProjects: LocalProject[] = [
  {
    id: "1",
    nombre: "Mi Aplicación Web",
    proveedor: "Localhost",
    fecha: "16-04-2025",
    estado: "desplegado",
    ip: "192.168.1.10",
  },
  {
    id: "2",
    nombre: "API de Servicios",
    proveedor: "Azure",
    fecha: "10-04-2025",
    estado: "en pausa",
    ip: "10.0.0.5",
  },
];

// Sidebar Dashboard
import LanzoLogo from "../assets/logos/LanzoLogo.png";

const DashboardNav: React.FC<{ onNavigate: (page: string) => void; active: string }> = ({ onNavigate, active }) => (
  <aside className="bg-gradient-to-b from-indigo-700 to-blue-800 h-screen w-64 flex flex-col justify-between shadow-lg">
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

// Formulario para nueva aplicación
const NewProjectForm: React.FC<{ onAdd: (project: LocalProject) => void; onCancel: () => void }> = ({ onAdd, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [proveedor, setProveedor] = useState("Vercel");
  const [estado, setEstado] = useState<LocalProject["estado"]>("desplegado");
  const [ip, setIp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !ip.trim()) return;
    onAdd({
      id: Date.now().toString(),
      nombre,
      proveedor,
      fecha: "Ahora",
      estado,
      ip,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-10 flex flex-col gap-6 mb-8 max-w-2xl mx-auto border border-indigo-200">
      <h2 className="text-2xl font-bold text-indigo-900">Nueva Aplicación</h2>
      <div className="flex flex-col gap-3">
        <label className="font-medium">Nombre</label>
        <input className="border rounded px-4 py-3 text-lg" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Mi Aplicación" required />
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-medium">Proveedor</label>
        <select className="border rounded px-4 py-3 text-lg" value={proveedor} onChange={e => setProveedor(e.target.value)}>
          <option value="Vercel">Vercel</option>
          <option value="Netlify">Netlify</option>
          <option value="Railway">Railway</option>
          <option value="Render">Render</option>
        </select>
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-medium">Estado</label>
        <select className="border rounded px-4 py-3 text-lg" value={estado} onChange={e => setEstado(e.target.value as LocalProject["estado"])}>
          <option value="desplegado">Desplegado</option>
          <option value="en pausa">En pausa</option>
          <option value="error">Error</option>
        </select>
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-medium">Dirección IP</label>
        <input className="border rounded px-4 py-3 text-lg" value={ip} onChange={e => setIp(e.target.value)} placeholder="192.168.1.10" required />
      </div>
      <div className="flex gap-4 justify-end">
        <button type="button" onClick={onCancel} className="px-6 py-3 rounded-lg border border-indigo-300 bg-white hover:bg-indigo-50 text-indigo-700 font-semibold transition">Cancelar</button>
        <button type="submit" className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow transition">Añadir</button>
      </div>
    </form>
  );
};

// Tarjeta de proyecto
interface ProjectCardProps {
  project: LocalProject;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

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
      <button
        onClick={() => onToggleStatus(project.id)}
        className={`px-6 py-3 rounded-lg font-semibold text-lg transition shadow-sm ${project.estado === 'desplegado' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
      >
        {project.estado === 'desplegado' ? 'Pausar' : project.estado === 'en pausa' ? 'Reanudar' : 'Sin acción'}
      </button>
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
  const [projects, setProjects] = useState<LocalProject[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState("projects");

  useEffect(() => {
    let loaded = getProjects();
    if (loaded.length === 0) {
      saveProjects(dummyProjects);
      loaded = dummyProjects;
    }
    setProjects(loaded);
  }, []);

  // Handler para el botón de actualizar
  const handleRefresh = () => {
    setProjects(getProjects());
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    setProjects(getProjects());
  };

  const handleAdd = (project: LocalProject) => {
    const updated = [...projects, project];
    setProjects(updated);
    saveProjects(updated);
    setShowForm(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = projects.map((proj) => {
      if (proj.id === id) {
        if (proj.estado === "desplegado") return { ...proj, estado: "en pausa" };
        if (proj.estado === "en pausa") return { ...proj, estado: "desplegado" };
      }
      return proj;
    });
    setProjects(updated);
    saveProjects(updated);
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
  return (
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
        {showForm && <NewProjectForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />}
        <div className="grid gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
