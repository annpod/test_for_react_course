'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cards = function () {
    function Cards(container_id, gameSize, cardImages) {
        _classCallCheck(this, Cards);

        this.container = document.getElementById(container_id);
        this.message = document.getElementById('message');
        this.width = gameSize.width % 2 ? gameSize.width + 1 : gameSize.width;
        this.height = gameSize.height % 2 ? gameSize.height + 1 : gameSize.height;
        this.images_src = cardImages;
        this.card_images = [];
        this.cards = [];
        this.generateCardImages();
        this.generateCards();
        this.prevCard = null;
        this.visibleCards = [];
        this.timer = null;
        this.flippedCardsCounter = 0;
    }

    _createClass(Cards, [{
        key: 'generateCardImages',
        value: function generateCardImages() {
            for (var i = 0; i < this.width * this.height / 2; i++) {
                this.card_images[i] = this.images_src[i % this.images_src.length];
            };
            this.card_images = this.card_images.concat(this.card_images);
            this.shuffle(this.card_images);
        }
    }, {
        key: 'shuffle',
        value: function shuffle(arr) {
            for (var i = arr.length; i; i--) {
                var j = Math.floor(Math.random() * i);
                var _ref = [arr[j], arr[i - 1]];
                arr[i - 1] = _ref[0];
                arr[j] = _ref[1];
            }
        }
    }, {
        key: 'generateCards',
        value: function generateCards() {
            for (var top = 0; top < this.height; top++) {
                var row = document.createElement("div");
                row.className = 'row';

                for (var left = 0; left < this.width; left++) {
                    var card = this.generateCard(top * this.width + left);
                    this.cards.push(card);
                    row.appendChild(card);
                }
                this.container.appendChild(row);
            };
        }
    }, {
        key: 'generateCard',
        value: function generateCard(card_id) {
            var cardWrapp = document.createElement("span");
            cardWrapp.className = "card_item_wrap";
            var card = document.createElement("img");
            card.className = "card_item";
            card.setAttribute("id", 'card_id_' + card_id);
            card.setAttribute("src", SERVER_URL + this.card_images[card_id]);
            card.addEventListener('click', this.handleCardClick.bind(this));
            cardWrapp.appendChild(card);
            return cardWrapp;
        }
    }, {
        key: 'resetVisibleCards',
        value: function resetVisibleCards() {
            this.flipBackVisibleCards();
            this.visibleCards = [];
            this.prevCard = null;
        }
    }, {
        key: 'flipBackVisibleCards',
        value: function flipBackVisibleCards() {
            if (typeof this.visibleCards[0] !== 'undefined') {
                this.visibleCards[0].classList.remove("flipped");
            }
            if (typeof this.visibleCards[1] !== 'undefined') {
                this.visibleCards[1].classList.remove("flipped");
            }
        }
    }, {
        key: 'setVisibleCardsAsMatched',
        value: function setVisibleCardsAsMatched() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.visibleCards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var card = _step.value;

                    card.classList.add("matched");
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.visibleCards = [];
        }
    }, {
        key: 'winGame',
        value: function winGame() {
            this.message.innerHTML = 'Awesome!!!';
        }
    }, {
        key: 'handleCardClick',
        value: function handleCardClick(action) {
            var card = action.target;
            clearTimeout(this.timer);
            if (!card.classList.contains('matched')) {
                if (this.prevCard !== card) {
                    card.classList.add("flipped");
                    this.visibleCards.push(card);
                } else {
                    this.prevCard = null;
                }
                if (this.visibleCards.length === 2) {
                    if (this.visibleCards[0].getAttribute('src') === this.visibleCards[1].getAttribute('src')) {
                        setTimeout(this.setVisibleCardsAsMatched.bind(this), 400); // we have to show matched cards before hiding them
                        this.flippedCardsCounter += 2;
                        if (this.flippedCardsCounter === this.width * this.height) {
                            this.winGame();
                        };
                    }
                }
                if (this.visibleCards.length === 3) {
                    this.flipBackVisibleCards();
                    this.visibleCards = this.visibleCards.slice(2);
                    this.prevCard = null;
                }
                this.timer = setTimeout(this.resetVisibleCards.bind(this), 2000);

                this.prevCard = card;
            }
        }
    }]);

    return Cards;
}();

;