import { createInteractiveTimeline } from "./InteractiveTimeline.js";
import { renderStep } from "./StepRenderer.js";

export function ProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'contact-card dark:bg-gray-800 m-6 p-4 rounded-lg shadow-lg';

  const titleRow = document.createElement('div');
  titleRow.className = 'flex items-center flex-wrap justify-between items-end';
  
  const title = document.createElement('h3');
  title.textContent = project.title;
  title.className = 'text-kirby font-black';

  titleRow.appendChild(title);

  const techIcons = {
    "Java": "https://img.icons8.com/?size=&id=13679&format=png&color=000000",
    "Gradle": "https://cdn.simpleicons.org/gradle/white",
    "PaperMC": "https://assets.papermc.io/brand/papermc_combination_mark_dark.min.svg",
    "GitHub": "https://cdn.simpleicons.org/github/white",
    "Netlify": "https://cdn.simpleicons.org/netlify/white",
    "Figma": "https://cdn.simpleicons.org/figma/white",
    "Svelte": "https://cdn.simpleicons.org/svelte/white",
    "Godot": "https://cdn.simpleicons.org/Godotengine/white",
    "JavaScript": "https://cdn.simpleicons.org/javascript/white",
    "PhaserJs": "https://cdn.phaser.io/images/logo/logo-download-vector.png",
    "CreateJs": "https://symbols.getvecta.com/stencil_25/13_createjs.d7de4f0c5d.svg"
  };

  const techListContainer = document.createElement('ul');
  techListContainer.className = 'flex';

  project.tech.forEach(tech => {
    const iconUrl = techIcons[tech];
    if (iconUrl) {
      const wrapper = document.createElement('div');
      wrapper.className = 'relative group px-2';

      const img = document.createElement("img");
      img.src = iconUrl;
      img.alt = tech;
      img.title = tech;
      img.className = "h-8 hover:scale-110 transition-transform duration-200 pl-6"
      
      const tooltip = document.createElement('div');
      tooltip.className = 'tech-tooltip';
      tooltip.textContent = tech;

      wrapper.appendChild(img);
      wrapper.appendChild(tooltip);

      wrapper.addEventListener('mouseenter', () => {
        tooltip.classList.add('show');
      });

      wrapper.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
      });

      techListContainer.appendChild(wrapper);
    } else {
      const fallback = document.createElement("span");
      fallback.textContent = tech;
      techListContainer.appendChild(fallback);
    }
  });

  titleRow.appendChild(techListContainer);

  const timelineContainer = document.createElement('div');
  timelineContainer.className = 'w-3/4';
  
  const stepDetail = document.createElement('div');
  stepDetail.className = "relative overflow-hidden step-detail";

  const stepHeading = document.createElement('h3');
  stepHeading.className = 'text-3xl font-bold text-kirby text-center tracking-wide';
  stepDetail.appendChild(stepHeading);
  const stepLabels = project.steps.map(s => s.label || '');

  const allStepElements = project.steps.map(step => {
    const el = document.createElement('div');
    el.className = "step-content";
    const wrapper = document.createElement('div');
    wrapper.className = 'transition-all duration-500';

    el.appendChild(renderStep(step));

    stepDetail.appendChild(el);
    return el;
  });

  allStepElements[0].classList.add("is-active");
  stepHeading.textContent = project.steps[0].label;

  const recalculateHeight = () => {
    const activeStep = allStepElements.find(el => el.classList.contains("is-active"));
    if (activeStep) {
      const headingStyle = window.getComputedStyle(stepHeading);
      const headingMargin = parseInt(headingStyle.marginTop) + parseInt(headingStyle.marginBottom);
      const headingHeight = stepHeading.offsetHeight + headingMargin;
      const contentHeight = activeStep.scrollHeight;
      stepDetail.style.maxHeight = `${headingHeight + contentHeight}px`;
    }
  };

  // Set initial max-height after content is active and rendered
  setTimeout(recalculateHeight, 100);

  const timeline = createInteractiveTimeline(stepLabels, index => {
    const currentActiveStep = allStepElements.find(el => el.classList.contains("is-active"));
    
    if (currentActiveStep) {
      currentActiveStep.classList.remove("is-active");
    }

    const newActiveStep = allStepElements[index];
    newActiveStep.classList.add("is-active");
    stepHeading.textContent = project.steps[index].label;

    setTimeout(recalculateHeight, 50);
  });

  stepDetail.addEventListener('chartRendered', () => {
    setTimeout(recalculateHeight, 50);
  });

  timelineContainer.appendChild(timeline);

  card.appendChild(titleRow);
  card.appendChild(timelineContainer);
  card.appendChild(stepDetail);

  return card;
}