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
        var gameImages = values[0];
        var gameSize = values[1];
        var gameProperties = document.getElementById('gameProperties');
        var width = gameSize.width % 2 ? gameSize.width + 1 : gameSize.width;
        var height = gameSize.height % 2 ? gameSize.height + 1 : gameSize.height;
        gameProperties.innerHTML = 'width : ' + width + '; height : ' + height;
        var Game = new Cards('gameContent', gameSize, gameImages);
    });
};
newGame();
document.getElementById('startNewGame').addEventListener('click', newGame, false);