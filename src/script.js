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
            let game_images = values[0];
            let game_size = values[1];
            let gameProperties = document.getElementById('gameProperties');
            let width = (game_size.width%2) ? (game_size.width+1) : game_size.width;
            let height = (game_size.height%2) ? (game_size.height+1) : game_size.height;
            gameProperties.innerHTML = 'width : ' + width + '; height : ' + height;
            const Game = new Cards('gameContent', game_size, game_images);
        });
};
newGame();
document.getElementById('startNewGame').addEventListener('click', newGame, false);

