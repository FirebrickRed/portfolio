import { createInteractiveTimeline } from "./InteractiveTimeline.js";
// import { fetchFormResponses } from "../utils/fetchFeedback.js";

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

  const techIcons = {
    "Java": "https://cdn.simpleicons.org/java/white",
    "Gradle": "https://cdn.simpleicons.org/gradle/white",
    "PaperMC": "https://assets.papermc.io/brand/papermc_combination_mark_dark.min.svg",
    "GitHub": "https://cdn.simpleicons.org/github/white",
    "Netlify": "https://cdn.simpleicons.org/netlify/white",
    "Figma": "https://cdn.simpleicons.org/figma/white",
    "Svelte": "https://cdn.simpleicons.org/svelte/white",
    "Godot": "https://cdn.simpleicons.org/Godotengine/white",
    "JavaScript": "https://cdn.simpleicons.org/javascript/white",
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

  const updateStepDetail = (i, step) => {
    const { label, status, link, userfeedback, description, livesite, githublink } = step;
    stepDetail.innerHTML = '';
    
    const labelElement = document.createElement('h4');
    labelElement.className = 'text-firebrick text-2xl';
    labelElement.textContent = label;

    stepDetail.appendChild(labelElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'text-xl';
    descriptionElement.innerHTML = description ? description : '';


    // Delivered
    if(githublink) {
      const githublinkElement = document.createElement('a');
      githublinkElement.href = githublink;
      githublinkElement.target = '_blank';
      githublinkElement.textContent = 'View on GitHub';
      githublinkElement.className = 'text-kirby hover:text-firebrick underline transition-colors';
      stepDetail.appendChild(githublinkElement);
    }

    if(livesite) {
      const siteEmbedElement = document.createElement('iframe');
      siteEmbedElement.src = livesite;
      siteEmbedElement.className = 'w-full h-[800px] rounded-md border-2 border-firebrick';
      stepDetail.appendChild(siteEmbedElement);
    }

    stepDetail.appendChild(descriptionElement);
    // stepDetail.appendChild(gearLookupChart);

    // stepDetail.innerHTML = `
    //   <div class="space-y-2">
    //     <h4 class="text-lg font-semibold text-pink-600 dark:text-pink-300">${label || ''}</h4>
    //     ${status ? `<p class="text-xs text-pink-800 dark:text-pink-100 bg-pink-100 dark:bg-pink-900 inline-block px-2 py-0.5 rounded">${status}</p>` : ''}
    //     ${userfeedback ? `<p class="italic text-gray-500 dark:text-gray-400">“${userfeedback}”</p>` : ''}
    //     ${link ? `<a href="${link}" target="_blank" class="inline-block mt-2 text-pink-600 dark:text-pink-300 hover:underline">View Work</a>` : ''}
    //   </div>
    // `;
  };

  // Create timeline from steps
  const stepLabels = project.steps.map(s => s.label || '');
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