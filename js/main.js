import { ProjectCard } from './components/ProjectCard.js';
// import { createInteractiveTimeline } from './components/InteractiveTimeline.js';

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

// console.log('in main.js')

// const steps = ['Idea', 'Design', 'Build', 'Launch'];
// const timelineContainer = document.getElementById('timeline-container');
// const contentBox = document.getElementById('step-content');

// const timeline = createInteractiveTimeline(steps, (index, label) => {
//   contentBox.textContent = `Currently viewing: ${label}`;
// });

// timelineContainer.appendChild(timeline);



// document.getEventListener('DOMContentLoaded', loadProjects);
loadProjects();