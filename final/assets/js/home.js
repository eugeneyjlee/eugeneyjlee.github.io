document.addEventListener('DOMContentLoaded', (event) => {
  const wrapper = document.querySelector('.wrapper');
  wrapper.classList.add('fade-in');

  const startButton = document.querySelector('.start-button');
  startButton.addEventListener('click', function(e) {
    e.preventDefault();
    wrapper.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = this.href; // Ensure this.href points to "game.html"
    }, 1000); // This should match the duration of the fadeOut animation
  });
});