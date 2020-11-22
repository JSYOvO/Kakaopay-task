import View from './View.js'
const ResultView = Object.create(View)

ResultView.setup = function (el, totalScroe, avgTime) {
    this.init(el)
    this.resultTop = el.querySelector('h1');
    this.resultDown = el.querySelector('p');
    this.renderResultData(totalScroe, avgTime);
    return this;
}

ResultView.renderResultData = function(totalScroe = 10, avgTime = 10) {
    this.resultTop.innerHTML = "당신의 점수는 " + totalScroe + "점입니다.";
    this.resultDown.innerHTML = "단어당 평균 답변 시간은 " + parseInt(avgTime) + "초입니다.";
}

export default ResultView;