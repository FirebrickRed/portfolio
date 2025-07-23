const modal = document.createElement('div');
modal.id = 'generic-modal';
modal.className = 'modal-overlay';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';

const closeButton = document.createElement('button');
closeButton.id = 'modal-close-btn';
closeButton.textContent = '×';

const dynamicContentContainer = document.createElement('div');
dynamicContentContainer.id = 'dynamic-modal-content';

modalContent.appendChild(closeButton);
modalContent.appendChild(dynamicContentContainer);
modal.appendChild(modalContent);
document.body.appendChild(modal);

closeButton.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.classList.remove('modal-open');
  dynamicContentContainer.innerHTML = ''; // Clear content on close
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    dynamicContentContainer.innerHTML = ''; // Clear content on close
  }
});

export function showModal(content) {
  dynamicContentContainer.innerHTML = ''; // Clear previous content

  // Reset iframe specific class
  dynamicContentContainer.classList.remove('modal-iframe-content');

  if (typeof content === 'string') {
    dynamicContentContainer.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    dynamicContentContainer.appendChild(content);
  }

  // Add iframe specific class if content is an iframe
  if (content instanceof HTMLElement && content.tagName === 'IFRAME') {
    dynamicContentContainer.classList.add('modal-iframe-content');
  }

  modal.classList.add('show');
  document.body.classList.add('modal-open');
}
