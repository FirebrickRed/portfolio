
import { showModal } from "../Modal.js";

export function renderDeliveredStep(step) {
  const { githublink, livesite } = step;
  const container = document.createElement('div');
  container.className = 'space-y-4 transition-opacity duration-500';

  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'delivered-actions';

  if (livesite) {
    const linkEl = document.createElement('a');
    linkEl.href = livesite;
    linkEl.target = '_blank';
    linkEl.className = 'action-button';
    linkEl.textContent = 'View Live Site';
    actionsContainer.appendChild(linkEl);

    const previewButton = document.createElement('button');
    previewButton.textContent = 'Preview Site';
    previewButton.className = 'action-button preview-button';
    previewButton.addEventListener('click', () => {
      showModal(livesite);
    });
    actionsContainer.appendChild(previewButton);
  }

  if (githublink) {
    const gitHubEl = document.createElement('a');
    gitHubEl.href = githublink;
    gitHubEl.target = '_blank';
    gitHubEl.className = 'action-button github-button';
    gitHubEl.innerHTML = `
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .3a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2c-3.34.73-4-1.61-4-1.61a3.14 3.14 0 00-1.3-1.71c-1.07-.73.08-.72.08-.72a2.49 2.49 0 011.82 1.22 2.52 2.52 0 003.44 1 2.52 2.52 0 01.75-1.57c-2.67-.3-5.47-1.33-5.47-5.91a4.61 4.61 0 011.22-3.2 4.3 4.3 0 01.12-3.15s1-.32 3.3 1.22a11.4 11.4 0 016 0C17 6.27 18 6.6 18 6.6a4.3 4.3 0 01.12 3.15 4.61 4.61 0 011.22 3.2c0 4.59-2.81 5.6-5.49 5.89a2.83 2.83 0 01.81 2.2v3.27c0 .32.22.7.83.58A12 12 0 0012 .3"/>
      </svg>
      <span>GitHub</span>
    `;
    actionsContainer.appendChild(gitHubEl);
  }

  container.appendChild(actionsContainer);
  return container;
}

