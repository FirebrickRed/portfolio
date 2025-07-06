const modal = document.createElement('div');
modal.id = 'preview-modal';
modal.className = 'modal-overlay';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';

const closeButton = document.createElement('button');
closeButton.id = 'modal-close-btn';
closeButton.textContent = '×';

const iframe = document.createElement('iframe');
iframe.id = 'modal-iframe';

modalContent.appendChild(closeButton);
modalContent.appendChild(iframe);
modal.appendChild(modalContent);
document.body.appendChild(modal);

closeButton.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.classList.remove('modal-open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }
});

export function showModal(url) {
  iframe.src = url;
  modal.classList.add('show');
  document.body.classList.add('modal-open');
}
