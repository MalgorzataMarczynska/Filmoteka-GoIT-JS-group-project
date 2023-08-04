const scrollUpBtn = document.querySelector('.scroll-up-button');
scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  //window.scrollTo(0, 0);
});
