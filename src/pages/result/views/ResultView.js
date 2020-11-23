import View from './View.js'
const ResultView = Object.create(View) // 게임결과 사용자에게 전달하기 위한 뷰

ResultView.setup = function (el, totalScroe, avgTime) {
    this.init(el)
    this.resultTop = el.querySelector('h1'); // 게임 점수를 포함하는 영역
    this.resultDown = el.querySelector('p'); // 게임 평균 답변시간을 포함하는 영역
    this.resultTop.innerHTML = this.renderResultDataScore(totalScroe);
    this.resultDown.innerHTML = this.renderResultDataAvgTime(avgTime);
    // router push 호출시 같이 넘어온 totalScore, avgTime인자를 활용하여 게임 점수 및 평균 답변시간 화면에 출력
    return this;
}

ResultView.renderResultDataScore = function(totalScroe = 10) {
    return "당신의 점수는 " + totalScroe + "점입니다.";
}

ResultView.renderResultDataAvgTime = function(avgTime = 10) {
    return "단어당 평균 답변 시간은 " + parseInt(avgTime) + "초입니다.";
}

export default ResultView;