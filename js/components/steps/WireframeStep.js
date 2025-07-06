
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

  if (figmaEmbed) {
    const figmaEl = document.createElement('iframe');
    figmaEl.src = figmaEmbed;
    figmaEl.width = '100%';
    figmaEl.height = '450';
    figmaEl.allowfullscreen = true;
    container.appendChild(figmaEl);
  }

  if (userfeedback) {
    const feedbackEl = document.createElement('p');
    feedbackEl.className = 'italic text-gray-500 dark:text-gray-400 text-2xl';
    feedbackEl.textContent = `“${userfeedback}”`;
    container.appendChild(feedbackEl);
  }

  return container;
}
