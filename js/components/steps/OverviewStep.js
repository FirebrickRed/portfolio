
export function renderOverviewStep(step) {
  const { description } = step;

  const container = document.createElement('div');
  container.className = 'space-y-2 transition-opacity duration-500';

  if (description) {
    const descriptionEl = document.createElement('p');
    descriptionEl.className = 'text-2xl';
    descriptionEl.innerHTML = description;
    container.appendChild(descriptionEl);
  }

  return container;
}