import { ProjectCard } from './components/ProjectCard.js';
import { showModal } from './components/Modal.js';

async function loadProjects() {
  const res = await fetch('../data/projects.json');
  const projects = await res.json();
  const container = document.getElementById('projects-templates');

  projects.forEach(project => {
    const card = ProjectCard(project);
    container.appendChild(card);
  });
}

document.getElementById('preview-resume-button').addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'JessicaKirbyResume.pdf';
  iframe.style.height = '100%';
  showModal(iframe);
});

const emailContactButton = document.getElementById('email-contact-button');
emailContactButton.addEventListener('click', (event) => {
  event.preventDefault();
  const messageHtml = `
    <div class="text-center p-8">
      <h2 class="text-2xl font-bold text-kirby mb-4">Email Functionality In Progress!</h2>
      <p class="text-gray-700 dark:text-gray-300">We're currently working on setting up direct email sending. Please check back soon!</p>
    </div>
  `;
  showModal(messageHtml);
});


// document.getEventListener('DOMContentLoaded', loadProjects);
loadProjects();