const Gamecord = require("discord-gamecord");

module.exports = {
    name: "juegos",
    description: "Lista de juegos disponibles.",
    type: 1,
    options: [
        {
            type: 3,
            name: "juego",
            description: "Juegos disponibles",
            required: true,
            choices: [
                { name: "π Wordle π", value: "wordle" },
                { name: "π Snake π", value: "snake" },
                { name: "π© Ahorcado π©", value: "ahorcado" },
                { name: "π£ buscaminas π£", value: "buscaminas" },
                { name: "π Busca el Emoji π", value: "buscaelemoji" },
                { name: "π€ Acierta el Pokemon π€", value: "aciertaelpokemon" },
                { name: "π ΒΏQuΓ© prefieres? π", value: "queprefieres" },
                { name: "π§© parejas π§©", value: "parejas" },
                { name: "π’ 2048 π’", value: "2048" },
                { name: "π§¨ InundaciΓ³n π§¨", value: "inundacion" },
                { name: "π Dedos Γgiles π", value: "dedosagiles" }
            ]
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config) => {
        const selected = interaction.options.data[0].value;

        const Snake = new Gamecord.Snake({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "Snake Game",
                overTitle: "Game Over",
                color: "#5865F2"
            },
            emojis: {
                board: "β¬",
                food: "π",
                up: "β¬οΈ",
                down: "β¬οΈ",
                left: "β¬οΈ",
                right: "β‘οΈ"
            },
            stopButton: "Salir",
            timeoutTime: 120000,
            snake: { head: "π’", body: "π©", tail: "π’", over: "π" },
            foods: ["π", "π", "π", "π«", "π₯", "π₯", "π½"],
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        const Minesweeper = new Gamecord.Minesweeper({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "Buscaminas",
                color: "#5865F2",
                description: "Haz click en los botones para revelar los bloques excepto las minas."
            },
            emojis: { flag: "π©", mine: "π£" },
            mines: 5,
            timeoutTime: 120000,
            winMessage: "Β‘Ganaste el juego! Has evitado con Γ©xito todas las minas.",
            loseMessage: "π₯ Β‘Perdiste el juego!\nCuidado con las minas la prΓ³xima vez.",
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        const TwoZeroFourEight = new Gamecord.TwoZeroFourEight({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "CΓMO JUGAR: Utiliza las flechas para mover las fichas.\nLos mosaicos con el mismo nΓΊmero se fusionan en uno cuando se tocan.\nΒ‘SΓΊmalos para llegar a 2048!",
                color: "#5865F2"
            },
            emojis: {
                up: "β¬οΈ",
                down: "β¬οΈ",
                left: "β¬οΈ",
                right: "β‘οΈ"
            },
            timeoutTime: 120000,
            buttonStyle: "PRIMARY",
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        const GuessThePokemon = new Gamecord.GuessThePokemon({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "Who's The Pokemon",
                color: "#5865F2"
            },
            timeoutTime: 120000,
            winMessage: "Β‘Lo Adivinaste! Era un {pokemon}.",
            loseMessage: "Β‘Mejor suerte la prΓ³xima vez! Era un {pokemon}.",
            errMessage: "Β‘No se pueden obtener los datos de PokΓ©mon! IntΓ©ntalo de nuevo.",
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        const MatchPairs = new Gamecord.MatchPairs({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "Parejas",
                color: "#5865F2",
                description: "**Haz click en los botones para unir emojis con su pareja.**"
            },
            timeoutTime: 120000,
            emojis: ["π", "π", "π", "π₯­", "π", "π", "π₯", "π₯₯", "π", "π«", "π", "π₯", "π₯"],
            winMessage: "**Β‘Ganaste el juego! Emparejaste un total de `{tilesTurned}` fichas.**",
            loseMessage: "**Β‘Perdiste el juego! Emparejaste un total de `{tilesTurned}` fichas.**",
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        const WouldYouRather = new Gamecord.WouldYouRather({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "ΒΏQuΓ© prefieres?",
                color: "#5865F2"
            },
            buttons: {
                option1: "OpciΓ³n 1",
                option2: "OpciΓ³n 2",
                option3: "Terminar"
            },
            timeoutTime: 120000,
            errMessage: "Β‘No se pueden obtener los datos de la pregunta! IntΓ©ntalo de nuevo.",
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        const Flood = new Gamecord.Flood({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "InundaciΓ³n",
                color: "#5865F2"
            },
            //Gamemodes
            // Easy Mode   => 8
            // Normal Mode => 13
            // Hard Mode   => 18
            difficulty: 13,
            timeoutTime: 120000,
            buttonStyle: "PRIMARY",
            emojis: ["π₯", "π¦", "π§", "πͺ", "π©"],
            winMessage: "Β‘Ganaste! Jugaste **{turns}** turnos.",
            loseMessage: "Β‘Perdiste! Jugaste **{turns}** turnos.",
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        const FindEmoji = new Gamecord.FindEmoji({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "Busca el Emoji",
                color: "#5865F2",
                description: "Recuerda los emojis del tablero de abajo.",
                findDescription: "Encuentra el {emoji} emoji antes de que se acabe el tiempo."
            },
            timeoutTime: 120000,
            hideEmojiTime: 5000,
            buttonStyle: "PRIMARY",
            emojis: ["π", "π", "π", "π", "π₯­", "π", "π", "π₯"],
            winMessage: "Β‘Ganaste! Seleccionaste el emoji correcto. {emoji}",
            loseMessage: "Β‘Perdiste! Seleccionaste el emoji equivocado. {emoji}",
            timeoutMessage: "Β‘Perdiste! Te has quedado sin tiempo. El emoji es {emoji}",
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        const Hangman = new Gamecord.Hangman({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "Ahorcado",
                color: "#5865F2"
            },
            hangman: { hat: "π©", head: "π", shirt: "π", pants: "π©³", boots: "ππ" },
            customWord: "",
            timeoutTime: 120000,
            theme: "palabras",
            winMessage: "Β‘Ganaste! la palabra era **{word}**.",
            loseMessage: "Β‘Perdiste! la palabra era **{word}**.",
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        const FastType = new Gamecord.FastType({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "Dedos Γgiles",
                color: "#5865F2",
                description: "Tienes {time} segundos para escribir la siguiente oraciΓ³n."
            },
            timeoutTime: 120000,
            sentence: "",
            winMessage: "Β‘Ganaste! Terminaste en {time} segundos con {wpm}ppm.",
            loseMessage: "Β‘Perdiste! No escribiste la frase correcta a tiempo."
        });

        const Wordle = new Gamecord.Wordle({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "Wordle",
                color: "#5865F2",
                description: "Adivina la palabra oculta en 6 intentos"
            },
            customWord: null,
            timeoutTime: 120000,
            winMessage: "Β‘Ganaste! la palabra era **{word}**.",
            loseMessage: "Β‘Perdiste! la palabra era **{word}**.",
            playerOnlyMessage: "Solo {player} puede usar estos botones."
        });

        switch (selected) {
            case "snake":
                Snake.startGame();
                break;
            case "buscaminas":
                Minesweeper.startGame();
                break;
            case "2048":
                TwoZeroFourEight.startGame();
                break;
            case "aciertaelpokemon":
                GuessThePokemon.startGame();
                break;
            case "parejas":
                MatchPairs.startGame();
                break;
            case "queprefieres":
                WouldYouRather.startGame();
                break;
            case "inundacion":
                Flood.startGame();
                break;
            case "buscaelemoji":
                FindEmoji.startGame();
                break;
            case "ahorcado":
                Hangman.startGame();
                break;
            case "dedosagiles":
                FastType.startGame();
                break;
            case "wordle":
                Wordle.startGame();
                break;
        }
    }
};
