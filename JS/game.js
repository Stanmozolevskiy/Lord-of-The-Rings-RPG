$(document).ready(function () {

    const characters = {
        "Aragorn": {
            name: "Aragorn",
            health: 120,
            attack: 8,
            imageUrl: "./Media/aragorn.jpg",
            enemyAttackBack: 15,
            info: "Aragorn II, son of Arathorn is a fictional character from J. R. R. Tolkien's legendarium. He is one of the protagonists of The Lord of the Rings. Aragorn was a Ranger of the North, first introduced with the name Strider at Bree, as the Hobbits continued to call him throughout The Lord of the Rings. "
        },
        "Gandalf": {
            name: "Gandalf",
            health: 100,
            attack: 14,
            imageUrl: "./Media/gandalf.jpg",
            enemyAttackBack: 5,
            info: "Gandalf is a fictional character in J. R. R. Tolkien's novels The Hobbit and The Lord of the Rings. He is a wizard, member of the Istari order, as well as leader of the Fellowship of the Ring and the army of the West. "
        },
        "Saruman": {
            name: "Saruman",
            health: 100,
            attack: 14,
            imageUrl: "./Media/saruman.jpg",
            enemyAttackBack: 5,
            info: "Saruman the White is a fictional character and a major antagonist in J. R. R. Tolkien's fantasy novel The Lord of the Rings. He is leader of the Istari, wizards sent to Middle-earth in human form by the godlike Valar to challenge Sauron, the main antagonist of the novel, but eventually he desires Sauron's power for himself and tries to take over Middle-earth by force."
        },
        "Thranduil": {
            name: "Thranduil",
            health: 100,
            attack: 14,
            imageUrl: "./Media/thranduil.jpg",
            enemyAttackBack: 5,
            info: "Thranduil is a fictional character in J. R. R. Tolkien's Middle-earth legendarium. He is a supporting character in The Hobbit, where he is referred to as the 'Elvenking,' and he is referenced briefly in The Lord of the Rings, The Silmarillion, and Unfinished Tales."
        },
        "Lurtz": {
            name: "Lurtz",
            health: 100,
            attack: 14,
            imageUrl: "./Media/lurtz.jpg",
            enemyAttackBack: 5,
            info: "Lurtz was the first of Saruman's Uruks to be bred in Lord fo the Rings movie, choking the first orc he sees to death within seconds of his birth. Attempting to intervene, other orcs move towards the newly born Uruk-Hai warrior, but Saruman halts their advance, intrigued by the malice and violence present in the Uruk's blood, leaving the unfortunate orc to its fate."
        }
    }
    // Will be populated when the player selects a character.
    let attacker;
    // Populated with all the characters the player didn't select.
    let combatants = [];
    // Will be populated when the player chooses an opponent.
    let defender;
    // Will keep track of turns during combat. Used for calculating player damage.
    const turnCounter = 1;
    // Tracks number of defeated opponents.
    const killCount = 0;

    function createPlayerCard(character, randerArea) {
        let charDiv = $("<div class= 'character card' data-name='" + character.name + "'>");
        let charName = $("<div class='character-name'>").text(character.name);
        let charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        let charHelth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHelth);
        $(randerArea).append(charDiv)
    }

    function initializeGame() {
        for (let key in characters) {
            createPlayerCard(characters[key], "#characters-section")
        }
    }

    initializeGame()
    // This function handles updating the selected player or the current defender. If there is no selected player/defender this
    // function will also place the character based on the areaRender chosen (e.g. #selected-character or #defender)
    function updateCharacter(charObj, areaRender) {
        $(areaRender).empty()
        createPlayerCard(charObj, areaRender);
    }

    function renderEnemies(enemyArr) {
        for (let i = 0; i < enemyArr.length; i++) {
            createPlayerCard(enemyArr[i], "#available-to-attack-section")
        }
    }
    // Function to handle rendering game messages.
    function renderMessage(message) {
        const gameMessage = $("#game-message");
        const newMessage = $("<div>").text(message);
        gameMessage.append(newMessage)
    }
    // Function which handles restarting the game after victory or defeat.
    function restatrtGame(resultMessage) {
        const restart = $("<button>Restart</button>").click(() => {
            location.reload()
        })
        // Build div that will display the victory/defeat message.
        const gameState = $("<div>").text(resultMessage);

        // Render the restart button and victory/defeat message to the page.
        $("body").append(gameState);
        $("body").append(restart);
    };
    // Function to clear the game message section
    function clearMessage() {
        const gameMessage = $("#game-message");
        gameMessage.text("")
    }
    // =============== Game Starts Here ====================================================

    // On click event for selecting our character.
    $("#characters-section").on('click', '.character', function () {
        //saving the picked character's name
        let name = $(this).attr("data-name");
        //if a player has not been chosen yet 
        if (!attacker) {
            // We populate attacker with the selected character's information.
            attacker = characters[name];
            // We then loop through the remaining characters and push them to the combatants array.
            for (let key in characters) {
                if (key !== name) {
                    combatants.push(characters[key])
                }
            }
            //Hide the characters section div.
            $("#characters-section").hide();

            // Then render our selected character and our combatants.
            updateCharacter(attacker, "#selected-character");
            renderEnemies(combatants);
        }
    })
    //Create event hendler for all enemies 
    $("#available-to-attack-section").on('click', '.character', function () {
        let name = $(this).attr("data-name");
        if($("#defender").children().length === 0){
            defender = characters[name];
            updateCharacter(defender, "#defender")
            $(this).remove()
            clearMessage();
            $("#available-to-attack-section").hide()
        }
    })
})