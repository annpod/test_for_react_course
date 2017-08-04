'use strict';

var SERVER_URL = 'https://ec-test-react.herokuapp.com/';

var newGame = function newGame() {
    var gameContent = document.getElementById('gameContent').innerHTML = '';
    var cardImages = fetch(SERVER_URL + 'api/v1/pictures').then(function (response) {
        return response.json();
    });
    var gameSize = fetch(SERVER_URL + 'api/v1/items').then(function (response) {
        return response.json();
    });

    Promise.all([cardImages, gameSize]).then(function (values) {
        var game_images = values[0];
        var game_size = values[1];
        var gameProperties = document.getElementById('gameProperties');
        var width = game_size.width % 2 ? game_size.width + 1 : game_size.width;
        var height = game_size.height % 2 ? game_size.height + 1 : game_size.height;
        gameProperties.innerHTML = 'width : ' + width + '; height : ' + height;
        var Game = new Cards('gameContent', game_size, game_images);
    });
};
newGame();
document.getElementById('startNewGame').addEventListener('click', newGame, false);