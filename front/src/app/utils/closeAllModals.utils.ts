export const closeAllModals = () =>  {
  document.querySelectorAll('.btn-close').forEach((button: any) => button.click());
}