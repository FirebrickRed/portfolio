import { createInteractiveTimeline } from "./InteractiveTimeline.js";

export function ProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'contact-card dark:bg-gray-800 m-6 p-4 rounded-lg shadow-lg';
  // card.className = 'contact-card block bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition hover:shadow-xl';
  // card.className = 'fade-in contact-card bg-pink-50 dark:bg-gray-800 shadow-lg rounded-lg p-6 transition';


  const titleRow = document.createElement('div');
  titleRow.className = 'flex items-center flex-wrap justify-between items-end';
  
  const title = document.createElement('h3');
  title.textContent = project.title;
  title.className = 'text-kirby font-black';

  titleRow.appendChild(title);


  const techIcons = {
    "Java": "https://cdn.simpleicons.org/java/white",
    "Gradle": "https://cdn.simpleicons.org/gradle/white",
    "PaperMC": "https://assets.papermc.io/brand/papermc_combination_mark_dark.min.svg",
    "GitHub": "https://cdn.simpleicons.org/github/white",
    "Netlify": "https://cdn.simpleicons.org/netlify/white",
    "Figma": "https://cdn.simpleicons.org/figma/white",
    "Svelte": "https://cdn.simpleicons.org/svelte/white"
  };

  const techListContainer = document.createElement('ul');
  techListContainer.className = 'flex';
  // techListContainer.innerHTML = ""; // Clear existing icons

  project.tech.forEach(tech => {
    const iconUrl = techIcons[tech];
    if (iconUrl) {
      const img = document.createElement("img");
      img.src = iconUrl;
      img.alt = tech;
      img.title = tech;
      img.className = "h-8 hover:scale-110 transition-transform duration-200 pl-6"
      // img.className = "w-6 h-6 hover:scale-110 transition-transform duration-200";
      techListContainer.appendChild(img);
    } else {
      const fallback = document.createElement("span");
      fallback.textContent = tech;
      // fallback.className = "text-sm text-white bg-pink-600 px-2 py-1 rounded";
      techListContainer.appendChild(fallback);
    }
  });

  titleRow.appendChild(techListContainer);
  // const tech = document.createElement('p');
  // tech.textContent = `Tech: ${project.tech.join(', ')}`;

  const timelineContainer = document.createElement('div');
  timelineContainer.className = 'w-3/4';
  
  const stepDetail = document.createElement('div');

  const updateStepDetail = (i, step) => {
    const { Label, Status, Link, UserFeedback } = step;
    stepDetail.innerHTML = `
      <div class="space-y-2">
        <h4 class="text-lg font-semibold text-pink-600 dark:text-pink-300">${Label || ''}</h4>
        ${Status ? `<p class="text-xs text-pink-800 dark:text-pink-100 bg-pink-100 dark:bg-pink-900 inline-block px-2 py-0.5 rounded">${Status}</p>` : ''}
        ${UserFeedback ? `<p class="italic text-gray-500 dark:text-gray-400">“${UserFeedback}”</p>` : ''}
        ${Link ? `<a href="${Link}" target="_blank" class="inline-block mt-2 text-pink-600 dark:text-pink-300 hover:underline">View Work</a>` : ''}
      </div>
    `;
  };

  // Create timeline from steps
  const stepLabels = project.steps.map(s => s.Label || '');
  const timeline = createInteractiveTimeline(stepLabels, (index, label) => {
    updateStepDetail(index, project.steps[index]);
  });

  // Default to first step
  updateStepDetail(0, project.steps[0]);

  timelineContainer.appendChild(timeline);

  // Assemble full card
  // card.appendChild(title);
  // card.appendChild(techListContainer);
  card.appendChild(titleRow);
  card.appendChild(timelineContainer);
  card.appendChild(stepDetail);

  return card;
}