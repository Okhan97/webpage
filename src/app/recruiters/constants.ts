const shinySort = (a: Technology, b: Technology) => {
  if (a.isShiny === b.isShiny) return a.name.localeCompare(b.name);
  return a.isShiny ? -1 : 1;
};

type Technology = {
  name: string;
  isShiny: boolean;
};

export const FRONTEND_TECHNOLOGIES: Technology[] = [
  { name: "React", isShiny: true },
  { name: "Next.js", isShiny: true },
  { name: "TypeScript", isShiny: true },
  { name: "Tailwind", isShiny: true },
  { name: "CSS", isShiny: true },
  { name: "JavaScript", isShiny: false },
  { name: "Bootstrap", isShiny: false },
  { name: "Ant Design", isShiny: false },
  { name: "Material-UI", isShiny: false },
  { name: "Sass", isShiny: false },
  { name: "Styled Components", isShiny: false },
  { name: "GraphQL", isShiny: false },
  { name: "Redux", isShiny: false },
  { name: "Mapbox", isShiny: false },
  { name: "HTML", isShiny: false },
  { name: "Angular", isShiny: false },
].sort(shinySort);

export const BACKEND_TECHNOLOGIES: Technology[] = [
  { name: "Node.js", isShiny: true },
  { name: "Python", isShiny: true },
  { name: "Go", isShiny: false },
  { name: "FastAPI", isShiny: true },
  { name: "SQL", isShiny: false },
  { name: "MongoDB", isShiny: false },
  { name: "Django", isShiny: false },
  { name: "Jupyter Notebook", isShiny: false },
  { name: "Flask", isShiny: false },
].sort(shinySort);

export const TOOLS_AND_DEVOPS: Technology[] = [
  { name: "Git", isShiny: true },
  { name: "GitHub", isShiny: true },
  { name: "GCP", isShiny: true },
  { name: "Netlify", isShiny: true },
  { name: "GitLab", isShiny: false },
  { name: "Bitbucket", isShiny: false },
  { name: "Docker", isShiny: false },
  { name: "Vercel", isShiny: false },
].sort(shinySort);
