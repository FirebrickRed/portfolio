import { createInteractiveTimeline } from "./InteractiveTimeline.js";
import { renderStep } from "./StepRenderer.js";
// import { fetchFormResponses } from "../utils/fetchFeedback.js";

// const stepRenderers = {
//   overview: renderOverviewStep,
// }

export function ProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'contact-card dark:bg-gray-800 m-6 p-4 rounded-lg shadow-lg';

  const titleRow = document.createElement('div');
  titleRow.className = 'flex items-center flex-wrap justify-between items-end';
  
  const title = document.createElement('h3');
  title.textContent = project.title;
  title.className = 'text-kirby font-black';

  titleRow.appendChild(title);

  //#region chart stuff
  const gearLookupChart = document.createElement('canvas');

  // fetchFormResponses().then(feedbacks => {
  //   console.log('feedback: ', feedbacks);

  //   const gearLookupData = feedbacks.reduce((acc, current) => {
  //     const answer = current["How Often do you look up gear while playing Wizard101"];
  //     acc[answer] = (acc[answer] || 0) + 1;
  //     return acc;
  //   }, {});

  //   console.log('gearlookupdata: ', gearLookupData);

  //   new Chart(gearLookupChart, {
  //     type: 'bar',
  //     data: {
  //       labels: ['1 - Never', '2 - Rarely', '3 - Sometimes', '4 - Frequently', '5 - Very Frequently'],
  //       datasets: [{
  //         label: 'erm?',
  //         data: [gearLookupData[1] || 0, gearLookupData[2] || 0, gearLookupData[3] || 0, gearLookupData[4] || 0, gearLookupData[5] || 0],
  //         borderWidth: 1,
  //         backgroundColor: '#efb6d4'
  //       }]
  //     }
  //   })

    

  //   // information to display:
  //   // How Often do you look up gear while playing wizard101
  //   // Would you create an account to save, share, and/or organize your loadouts
  //   // How useful would a tool like this be to you

  //   // const container = document.createElement("div");
  //   // container.className = "space-y-4 mt-6";

  //   // feedbacks.forEach(fb => {
  //   //   const p = document.createElement("p");
  //   //   p.className = "text-sm italic text-gray-300 bg-gray-700 p-2 rounded";
  //   //   p.textContent = fb["What did you like?"] || "No comment.";
  //   //   container.appendChild(p);
  //   // });

  //   // document.body.appendChild(container); // Or insert in your card
  // });

  //#endregion

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
    "PhaserJs": "https://cdn.phaser.io/images/logo/phaser-planet-web.png",
    "CreateJs": "https://symbols.getvecta.com/stencil_25/13_createjs.d7de4f0c5d.svg"
  };

  const techListContainer = document.createElement('ul');
  techListContainer.className = 'flex';
  // techListContainer.innerHTML = ""; // Clear existing icons

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
  stepDetail.className = "relative overflow-hidden step-detail";

  const stepHeading = document.createElement('h3');
  stepHeading.className = 'text-3xl font-bold text-kirby my-8 text-center tracking-wide';
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
  // Set initial max-height after content is active and rendered
  setTimeout(() => {
    const headingStyle = window.getComputedStyle(stepHeading);
    const headingMargin = parseInt(headingStyle.marginTop) + parseInt(headingStyle.marginBottom);
    const headingHeight = stepHeading.offsetHeight + headingMargin;

    const contentHeight = allStepElements[0].scrollHeight;
    
    stepDetail.style.maxHeight = `${headingHeight + contentHeight}px`;
  }, 100);

  const timeline = createInteractiveTimeline(stepLabels, index => {
    const currentActiveStep = allStepElements.find(el => el.classList.contains("is-active"));
    
    if (currentActiveStep) {
      currentActiveStep.classList.remove("is-active");
    }

    const newActiveStep = allStepElements[index];
    newActiveStep.classList.add("is-active");
    stepHeading.textContent = project.steps[index].label;

    setTimeout(() => {
      const headingStyle = window.getComputedStyle(stepHeading);
      const headingMargin = parseInt(headingStyle.marginTop) + parseInt(headingStyle.marginBottom);
      const headingHeight = stepHeading.offsetHeight + headingMargin;

      const contentHeight = newActiveStep.scrollHeight;
      
      stepDetail.style.maxHeight = `${headingHeight + contentHeight}px`;
    }, 50);
  });

  // Create timeline from steps

  timelineContainer.appendChild(timeline);

  // Assemble full card
  // card.appendChild(title);
  // card.appendChild(techListContainer);
  card.appendChild(titleRow);
  card.appendChild(timelineContainer);
  card.appendChild(stepDetail);

  return card;
}