import View from './View.js'
const ScoreView = Object.create(View)

ScoreView.setup = function (el) {
    this.init(el)
    this.getScoreEl = el.querySelector('.header__score__left');
    
    this.renderInitialDate();
    return this
}
ScoreView.renderGameData = function (score) {
  this.showGetScore(score);
}

ScoreView.renderInitialDate = function () {
  this.showGetScore(0);
}

ScoreView.showGetScore = function (getScore) {
  this.getScoreEl.innerHTML = getScore + '점';
}

export default ScoreView;