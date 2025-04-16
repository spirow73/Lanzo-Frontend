// Modelo de proyecto
export type ProjectStatus = 'desplegado' | 'en pausa';

export interface LocalProject {
  id: string;
  nombre: string;
  proveedor: string;
  fecha: string;
  estado: ProjectStatus;
  ip: string;
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
