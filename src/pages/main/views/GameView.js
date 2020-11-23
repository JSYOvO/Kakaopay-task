import View from './View.js'
const GameView = Object.create(View)
let gameStartToggle = false;

GameView.setup = function (el) {
    this.init(el);
    this.gameStartToggle = false;
    this.gameWordEl = el.querySelector('h1');
    this.gameButtonEl = el.querySelector('p');
    this.gameinputEl = el.querySelector('input');
    this.renderInitialDate();
    this.ButtonToogle(false);
    this.bindEvents();
    return this;
}

GameView.renderGameData = function (text) {
  this.showGameWord(text);
}

GameView.renderInitialDate = function () {
  this.showGameWord("문제 단어");
}

GameView.showGameWord = function(word) {
  this.gameWordEl.innerHTML = word;
}

GameView.ButtonToogle = function(toggle) {
  if(toggle) this.gameButtonEl.innerHTML = "초기화";
  else this.gameButtonEl.innerHTML = "시작";
}
GameView.bindEvents = function() {
  this.gameButtonEl.addEventListener('click', e => this.onClickButton());
  this.gameinputEl.addEventListener('keyup', e => this.onKeyup(e))
}
GameView.onClickButton = function() {
  this.gameStartToggle = !this.gameStartToggle;

  if(this.gameStartToggle) this.emit('@gameStart');
  else this.emit('@gameStop');

  this.ButtonToogle(this.gameStartToggle);
}

GameView.onKeyup = function (e) {
  const enter = 13;
  if (e.keyCode !== enter) return ;
  this.emit('@submit', {input: this.gameinputEl.value});
  this.clearInput();
}

GameView.clearInput = function () {
  this.gameinputEl.value = "";
}
export default GameView;