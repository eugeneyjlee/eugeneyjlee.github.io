document.addEventListener('DOMContentLoaded', (event) => {
  const box = document.querySelector('.box');
  box.classList.add('fade-in');

  const startButton = document.querySelector('.start-button');
  startButton.addEventListener('click', function(e) {
    e.preventDefault();
    box.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = this.href;
    }, 1000);
  });
});