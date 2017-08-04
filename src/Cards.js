class Cards {
    constructor(container_id, gameSize, cardImages){
        this.container = document.getElementById(container_id);
        this.message = document.getElementById('message');
        this.width = (gameSize.width%2) ? (gameSize.width+1) : gameSize.width;
        this.height = (gameSize.height%2) ? (gameSize.height+1) : gameSize.height;
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
    generateCardImages(){
        for (let i = 0; i < this.width * this.height / 2; i++) {
            this.card_images[i] = this.images_src[i % this.images_src.length];
        };
        this.card_images = this.card_images.concat(this.card_images);
        this.shuffle(this.card_images);
    }
    shuffle(arr) {
        for (let i = arr.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
        }
    }
    generateCards(){
        for (let top = 0; top < this.height; top++) {
            let row = document.createElement("div");
            row.className = 'row';

            for(let left = 0; left < this.width; left++) {
                let card = this.generateCard(top*this.width+left);
                this.cards.push(card);
                row.appendChild(card);
            }
            this.container.appendChild(row);
        };
    }
    generateCard(cardId){
        let cardWrapp = document.createElement("span");
        cardWrapp.className = "card_item_wrap";
        let card = document.createElement("img");
        card.className = "card_item";
        card.setAttribute("id", 'card_id_'+cardId);
        card.setAttribute("src", SERVER_URL + this.card_images[cardId]);
        card.addEventListener('click', this.handleCardClick.bind(this));
        cardWrapp.appendChild(card);
        return cardWrapp;
    }
    resetVisibleCards(){
        this.flipBackVisibleCards();
        this.visibleCards = [];
        this.prevCard = null;
    }
    flipBackVisibleCards(){
        if (typeof this.visibleCards[0] !== 'undefined'){
            this.visibleCards[0].classList.remove("flipped");
        }
        if (typeof this.visibleCards[1] !== 'undefined'){
            this.visibleCards[1].classList.remove("flipped");
        }
    }
    setVisibleCardsAsMatched(){
        for (let card of this.visibleCards) {
            card.classList.add("matched");
        }
        this.visibleCards = [];
    }
    winGame() {
        this.message.innerHTML = 'Awesome!!!';
    }
    handleCardClick(action){
        let card = action.target;
        clearTimeout(this.timer);
        if (!card.classList.contains('matched')){
            if (this.prevCard !== card){
                card.classList.add("flipped");
                this.visibleCards.push(card);
            }else{
                this.prevCard = null;
            }
            if(this.visibleCards.length === 2) {
                if (this.visibleCards[0].getAttribute('src') === this.visibleCards[1].getAttribute('src')) {
                    setTimeout(this.setVisibleCardsAsMatched.bind(this), 200);	// we have to show matched cards before hiding them
                    this.flippedCardsCounter += 2;
                    if (this.flippedCardsCounter === this.width * this.height) { this.winGame(); };
                }
            }
            if(this.visibleCards.length === 3) {
                this.flipBackVisibleCards();
                this.visibleCards = this.visibleCards.slice(2);
                this.prevCard = null;
            }
            this.timer = setTimeout(this.resetVisibleCards.bind(this), 2000);

            this.prevCard = card;
        }
    }
};


