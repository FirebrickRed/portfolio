
import { showModal } from "../Modal.js";

export function renderWireframeStep(step) {
  const { description, figmaEmbed, userfeedback } = step;
  const container = document.createElement('div');
  container.className = 'space-y-2 transition-opacity duration-500';

  if (description) {
    const descriptionEl = document.createElement('p');
    descriptionEl.className = 'text-2xl';
    descriptionEl.innerHTML = description;
    container.appendChild(descriptionEl);
  }


  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'delivered-actions';

  if (step.previewWireFrameLink) {
    const figmaButton = document.createElement('button');
    figmaButton.textContent = 'Preview Wireframe';
    figmaButton.className = 'action-button preview-button';
    figmaButton.addEventListener('click', () => {
      showModal(step.previewWireFrameLink);
    });
    actionsContainer.appendChild(figmaButton);
  }

  if (step.viewInFigmaLink) {
    const openInNewTabButton = document.createElement('a');
    openInNewTabButton.href = step.viewInFigmaLink;
    openInNewTabButton.target = '_blank';
    openInNewTabButton.textContent = 'View in Figma';
    openInNewTabButton.className = 'action-button github-button';
    actionsContainer.appendChild(openInNewTabButton);
  }

  if (actionsContainer.children.length > 0) {
    container.appendChild(actionsContainer);
  }

  if (userfeedback) {
    const feedbackEl = document.createElement('p');
    feedbackEl.className = 'italic text-gray-500 dark:text-gray-400 text-2xl';
    feedbackEl.textContent = `“${userfeedback}”`;
    container.appendChild(feedbackEl);
  }

  return container;
}
