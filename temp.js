document.addEventListener('DOMContentLoaded', () => {
  const deleteBtns = document.querySelectorAll('[data-name="delete-button"]');
  const deleteForm = document.querySelector('[data-name="delete-form"]');

  deleteBtns.forEach((btn) => {
    btn.onclick = function () {
      const productId = this.dataset.id;
      deleteForm.action = `/admin/manage-products/${productId}?_method=PATCH`;
      deleteForm.submit();
    };
  });
});
