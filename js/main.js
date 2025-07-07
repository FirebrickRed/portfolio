import { ProjectCard } from './components/ProjectCard.js';
import { showModal } from './components/Modal.js';

async function loadProjects() {
  console.log('in load projects');
  const res = await fetch('../data/projects.json');
  const projects = await res.json();
  console.log('projects: ', projects);
  const container = document.getElementById('projects-templates');

  projects.forEach(project => {
    const card = ProjectCard(project);
    container.appendChild(card);
  });
}

document.getElementById('preview-resume-button').addEventListener('click', () => {
  showModal('JessicaKirbyResume.pdf');
});



// document.getEventListener('DOMContentLoaded', loadProjects);
loadProjects();