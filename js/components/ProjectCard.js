
export function ProjectCard(project) {
    const card = document.createElement('div');
    // card.className = 'fade-in contact-card bg-pink-50 dark:bg-gray-800 shadow-lg rounded-lg p-6 transition';

    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.tech.join(', ')}</p>
        <p>${project.description}</p>
        ${project.url ? `<a href="${project.url}" target="_blank" class="text-kirby hover:text-firebrick">Visit</a>` : ''}
    `;

  return card;
}