import { $ } from '../variables/utils.js';

function toast({
  title = '',
  message = '',
  type = 'success',
  duration = 5000,
}) {
  const wrapper = document.getElementById('toast');
  if (!wrapper) throw 'Wrapper not found';
  const delayTime = (duration / 1000).toFixed(2);
  const fadeOutTime = 1;

  const toastStates = {
    success: 'check',
    warning: 'exclamation',
    error: 'xmark',
  };
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  toast.style.animation = `slideIn 0.5s ease, fadeOut ${fadeOutTime}s ease ${delayTime}s forwards`;

  toast.innerHTML = /* html */ `
      <div class="toast-icon">
        <i class="fa-solid fa-circle-${toastStates[type]}"></i>
      </div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
      <button type='button' class="toast-close" data-name='close'>
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

  wrapper.appendChild(toast);

  const timOutId = setTimeout(() => {
    wrapper.removeChild(toast);
  }, duration + fadeOutTime * 1000);

  toast.onclick = (e) => {
    if (e.target.closest('[data-name="close"]')) {
      clearTimeout(timOutId);
      wrapper.removeChild(toast);
    }
  };
}

export default toast;
