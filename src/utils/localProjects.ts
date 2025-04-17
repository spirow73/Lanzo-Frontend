// Modelo de proyecto
export type ProjectStatus = 'desplegado' | 'en pausa';

export interface LocalProject {
  id: string;
  nombre: string;
  proveedor: string;
  fecha: string;
  estado: ProjectStatus;
  ip: string;
  // Campos opcionales para Azure
  azure_client_id?: string;
  azure_client_secret?: string;
  azure_subscription_id?: string;
  azure_tenant_id?: string;
}

const STORAGE_KEY = 'lanzo_projects';

export function getProjects(): LocalProject[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveProjects(projects: LocalProject[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function addProject(project: LocalProject): void {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter(p => p.id !== id);
  saveProjects(projects);
}
