import View from './View.js'
const ScoreView = Object.create(View) // 게임점수를 사용자에게 전달하기 위한 뷰

ScoreView.setup = function (el) {
    this.init(el) // html 요소 등록
    this.getScoreEl = el.querySelector('.header__score__left'); // 게임점수 출력 영역
    
    this.renderInitialDate(); // 게임점수 초기화
    return this
}
ScoreView.renderGameData = function (score) { // 게임점수를 츌력하기 위해 showGetScore 호출
  this.showGetScore(score);
}

ScoreView.renderInitialDate = function () { // showGetScore 함수 호출하여 0점으로 초기화
  this.showGetScore(0);
}

ScoreView.showGetScore = function (getScore) {
  this.getScoreEl.innerHTML = getScore + '점';
}

export default ScoreView;