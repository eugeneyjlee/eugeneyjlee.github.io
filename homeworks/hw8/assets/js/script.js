function toggleSongs() {
  let element = document.getElementById("songs-second-half");
  element.classList.toggle("hidden");
}

document.getElementById("toggle-button").onclick = toggleSongs;