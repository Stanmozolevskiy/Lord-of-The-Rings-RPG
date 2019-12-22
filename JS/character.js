export const character = {
  createPlayerCard: function(character, randerArea) {
    let charDiv = $(
      "<div class= 'character card' id='" +
        character.name +
        "' data-name='" +
        character.name +
        "'>"
    );
    let charName = $("<div class='character-name'>").text(character.name);
    let charImage = $("<img alt='image' class='character-image'>").attr(
      "src",
      character.imageUrl
    );
    let charHelth = $("<div class='character-health'>").text(character.health);
    charDiv
      .append(charName)
      .append(charImage)
      .append(charHelth);
    $(randerArea).append(charDiv);
  },
  renderEnemies: function(enemyArr) {
    for (let i = 0; i < enemyArr.length; i++) {
      character.createPlayerCard(enemyArr[i], "#available-to-attack-section");
    }
  },

};
