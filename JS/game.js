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


    function createPlayerCard(character, randerArea) {
        let charDiv = $("<div class= 'card' data-name='" + character.name + "'>");
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

    


})