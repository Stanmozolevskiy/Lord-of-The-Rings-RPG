export const message = {
  renderMessage: function(message) {
    let gameMessage = $("#game-message");
    let newMessage = $("<div>").text(message);
    gameMessage.append(newMessage);
  },
  clearMessage: function () {
    const gameMessage = $("#game-message");
    gameMessage.text("");
  }
};
