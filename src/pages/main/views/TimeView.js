import View from './View.js'
const TimeView = Object.create(View) // 게임의 남은시간을 사용자에게 전달하기 위한 뷰

TimeView.setup = function (el) {
    this.init(el) // html 요소 등록
    this.discountLeftTime = 0; // setInterval를 활용해 남은시간을 줄이기 위해 선언
    this.leftTimeEl = el.querySelector('.header__time__left'); // 게임의 남은시간 영역
    this.showLeftTime(0); // 0으로 남은시간 초기화
    this.leftTime = 0; // 현재 남은 시간
    this.initialTime = 0; // 각 단어의 제한시간
    return this
}

TimeView.renderGameData = function (time) { // 각 단어의 제한 시간 출력 및 매초 감소
  this.initialTime = this.leftTime = time;
  this.showLeftTime(this.leftTime); // 남은 시간 출력

  this.discountLeftTime = setInterval(() => { // setInterval을 활용하여 매초 남은시간 감소
    this.leftTime--; 
    this.showLeftTime(this.leftTime);
    
    if(this.leftTime == 0) { // 만일 남은시간이 0라면 setInterval 종료
      clearInterval(this.discountLeftTime);
      this.emit('@timeout'); // @timeout 커스텀 이벤트 생성
    }
  }, 1000)
}

TimeView.showLeftTime = function (leftTime) {
  this.leftTimeEl.innerHTML = leftTime + '초';
}

TimeView.renderInitialDate = function () { // 남은시간 0으로 초기화
  clearInterval(this.discountLeftTime); // 만약에 실행중 일수도 있는 setInterval 중지
  this.showLeftTime(0);
}

TimeView.getElapsedTime = function(initialTime = this.initialTime, leftTime = this.leftTime) { // 컨트롤러에서 문제를 푸는데 경과시간을 요청시 반환

  return new Promise(res => {
    res(initialTime - leftTime);
  })
}

export default TimeView;