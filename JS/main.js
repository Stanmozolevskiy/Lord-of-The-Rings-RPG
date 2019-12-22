import { characters } from "./data.js";
import { audio } from "./audio.js";
import { character } from "./character.js";
import { message } from "./message.js";

$(document).ready(function() {
  
  const game = {
    combatants: [],
    attacker: null,
    defender: null,
    isEnemyAttack: false,
    turnCounter: 1,
    killCount: 0,
    initializeGame: function() {
      for (let key in characters) {
        character.createPlayerCard(characters[key], "#characters-section");
      }
    },
    updateCharacter: function(charObj, areaRender) {
      $(areaRender).empty();
      character.createPlayerCard(charObj, areaRender);
    },
    restatrtGame: function(resultMessage) {
      const restart = $("<button>Restart</button>").click(() => {
        location.reload();
      });
      const gameState = $("<div>").text(resultMessage);
      $("#restart").append(gameState);
      $("#restart").append(restart);
    },
    populateCombatantsList: function() {
      for (let key in characters) {
        if (key !== this.attacker.name) {
          this.combatants.push(characters[key]);
        }
      }
    },
    ifNoPlayer: function(name) {
      if (this.attacker == null) {
        this.attacker = characters[name];
        console.log(name);
        audio.playAudio(
          `${"./audio/" + this.attacker.name + ".mp3"}`,
          null,
          0,
          0.2
        );
        $("#selected-character").fadeIn();
        this.populateCombatantsList();
        $("#characters-section").hide();
        this.updateCharacter(this.attacker, "#selected-character");
        character.renderEnemies(this.combatants);
      }
    },
    doAttack: function() {
      audio.playAudio("./audio/atack.mp3", null, 0, 0.3);
      message.clearMessage();
      $("#defender").effect("shake");
      $("#selected-character").effect("shake");
      this.defender.health -= this.attacker.attack * this.turnCounter;
    },
    isEnemyAlive: function() {
      if (this.defender.health > 0) {
        this.updateCharacter(this.defender, "#defender");
        message.renderMessage(
          `${this.attacker.name +
            " attacked " +
            this.defender.name +
            " " +
            this.attacker.attack * this.turnCounter +
            " damage."}`
        );
        message.renderMessage(
          `${this.defender.name +
            " attacked you back for " +
            this.defender.enemyAttackBack +
            " damage."}`
        );
        this.attacker.health -= this.defender.enemyAttackBack;
        this.updateCharacter(this.attacker, "#selected-character");

        // if you have less than 0 helth game over
        if (this.attacker.health <= 0) {
          $("#defender").off("click");
          message.clearMessage();
          this.restatrtGame(
            this.attacker.name +
              " " +
              " have been defeted by" +
              " " +
              this.defender.name
          );
          defenderAtackBtn.off("click");
        }
      } else {
        // if emeny has less than 0 helth get new enemy
        $("#defender").empty();
        message.renderMessage(
          `${this.attacker.name +
            " " +
            "has defeted " +
            " " +
            this.defender.name}`
        );
        // Increment your kill count.
        this.killCount++;
      }
    }
  };

  // =============== Game Starts Here ====================================================
  audio.playAudio("./audio/gamesong.mp3", true, 1000, 0.07);
  game.initializeGame();

  // On click event for selecting our character.
  $("#characters-section").on("click", ".character", function() {
    let name = $(this).attr("data-name");
    game.ifNoPlayer(name);
  });

  //Create event hendler for all enemies
  $("#available-to-attack-section").on("click", ".character", function() {
    let name = $(this).attr("data-name");
    if ($("#defender").children().length === 0) {
      game.defender = characters[name];
      audio.playAudio(
        `${"./audio/" + game.defender.name + ".mp3"}`,
        null,
        0,
        0.2
      );
      game.updateCharacter(game.defender, "#defender");
      $(this).fadeOut();
      message.clearMessage();
      message.renderMessage("Clisk on the enemy to attack!");
    }
  });

  // Create event for the attack button
  $("#defender").on("click", function() {
    if ($("#defender").children.length !== 0) {
      game.doAttack();
      game.isEnemyAlive();

      // if you kill all of the enemies
      if (game.killCount >= game.combatants.length) {
        message.clearMessage();
        console.log(game.combatants.length, game.killCount);
        game.restatrtGame("You won all heroes in midle erth");
      }

      // Increment turn counter. This is used for determining how much damage the player does.
      game.turnCounter++;
    } else {
      //  If there is no defender, render an error message.
      message.clearMessage();
      message.renderMessage("Select enemy");
    }
  });
});
