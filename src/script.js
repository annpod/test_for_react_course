const SERVER_URL = 'https://ec-test-react.herokuapp.com/';

let newGame = function(){
    let gameContent = document.getElementById('gameContent').innerHTML = '';
    const cardImages = fetch(SERVER_URL + 'api/v1/pictures')
        .then(function(response){
            return response.json()
        });
    const gameSize = fetch(SERVER_URL + 'api/v1/items')
        .then(function(response){
            return response.json()
        });

    Promise.all([cardImages,gameSize])
        .then(function(values){
            let gameImages = values[0];
            let gameSize = values[1];
            let gameProperties = document.getElementById('gameProperties');
            let width = (gameSize.width%2) ? (gameSize.width+1) : gameSize.width;
            let height = (gameSize.height%2) ? (gameSize.height+1) : gameSize.height;
            gameProperties.innerHTML = 'width : ' + width + '; height : ' + height;
            const Game = new Cards('gameContent', gameSize, gameImages);
        });
};
newGame();
document.getElementById('startNewGame').addEventListener('click', newGame, false);


