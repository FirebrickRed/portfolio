export function renderUserStoriesStep(step) {
  const container = document.createElement('div');
  const comingSoon = document.createElement('p');
  comingSoon.textContent = 'Working on implementation currently!';
  container.appendChild(comingSoon);
  return container;
}