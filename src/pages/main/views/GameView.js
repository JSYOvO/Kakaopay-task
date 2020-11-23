import View from './View.js'
const GameView = Object.create(View) // 게임화면을 사용자에게 전달하기 위한 뷰

GameView.setup = function (el) {
    this.init(el); // html 요소 등록
    this.gameStartToggle = false; // 게임 시작/초기화 버튼 토글
    this.gameWordEl = el.querySelector('h1'); // 게임 단어 출력 영역
    this.gameButtonEl = el.querySelector('p'); // 시작 및 초기화 버튼 출력 영역
    this.gameinputEl = el.querySelector('input'); // 사용자 단어 입력 출력 영역
    this.renderInitialDate(); // 기본 초기화면으로 화면 랜더링
    this.ButtonToogle(false); // 버튼을 false => 시작으로 초기화
    this.bindEvents();
    return this;
}

GameView.renderGameData = function (text) { // 게임단어 출력을 위해 showGameWord 함수 호출
  this.showGameWord(text);
}

GameView.renderInitialDate = function () { // 초기화면 "문제 단어" 출력
  this.showGameWord("문제 단어");
}

GameView.showGameWord = function(word) { // 게임단어 출력
  this.gameWordEl.innerHTML = word;
}

GameView.ButtonToogle = function(toggle) { // 버튼을 토글키에 맞추어 출력
  if(toggle) this.gameButtonEl.innerHTML = "초기화"; 
  else this.gameButtonEl.innerHTML = "시작";
}
GameView.bindEvents = function() { 
  // 시작 및 출력 버튼 클릭시 onClickButton 함수 호출
  this.gameButtonEl.addEventListener('click', e => this.onClickButton());
  // 사용자가 input 영역에 입력시 onKeyup 함수 호출
  this.gameinputEl.addEventListener('keyup', e => this.onKeyup(e));
}
GameView.onClickButton = function() { 
  this.gameStartToggle = !this.gameStartToggle; // 토글을 변경하고 ButtonToggle 함수 호출

  if(this.gameStartToggle) this.emit('@gameStart'); // 토글이 true라면 @gamestart 커스텀 이벤트 생성
  else this.emit('@gameStop'); // 토글이 false라면 @gamestop 커스텀 이벤트 생성

  this.ButtonToogle(this.gameStartToggle);
}

GameView.onKeyup = function (e) {
  const enter = 13;
  if (e.keyCode !== enter) return ; // 사용자가 enter키를 누를때 @submit 커스텀 이벤트 발생
  this.emit('@submit', {input: this.gameinputEl.value});
  this.clearInput(); // input영역 초기화
}

GameView.clearInput = function () {
  this.gameinputEl.value = ""; // input 영역 초기화
}
export default GameView;