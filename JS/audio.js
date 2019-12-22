export const audio = {
  playAudio: function(audioLocation, repeat, delay, power) {
    let audio = new Audio(audioLocation);
    audio.volume = power;
    setTimeout(function() {
      if (repeat) {
        audio.addEventListener(
          "ended",
          function() {
            this.currentTime = 0;
            this.play();
          },
          false
        );
      }
      audio.play();
    }, delay);
  }
};
