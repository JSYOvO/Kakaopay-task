import View from './View.js'
// import Util from '../../../util';
const ResultView = Object.create(View)

ResultView.setup = function (el, totalScroe, avgTime) {
    this.init(el)
    this.resultTop = el.querySelector('h1');
    this.resultDown = el.querySelector('p');
    this.resultTop.innerHTML = this.renderResultDataScore(totalScroe);
    this.resultDown.innerHTML = this.renderResultDataAvgTime(avgTime);
    return this;
}

ResultView.renderResultDataScore = function(totalScroe = 10) {
    return "당신의 점수는 " + totalScroe + "점입니다.";
}

ResultView.renderResultDataAvgTime = function(avgTime = 10) {
    return "단어당 평균 답변 시간은 " + parseInt(avgTime) + "초입니다.";
}

export default ResultView;