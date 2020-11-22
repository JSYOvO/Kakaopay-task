import View from './View.js'
const TimeView = Object.create(View)
let discountLeftTime;

TimeView.setup = function (el) {
    this.init(el)
    this.leftTimeEl = el.querySelector('.header__time__left');
    this.showLeftTime(0);
    this.leftTime = 0;
    this.initialTime = 0;
    return this
}

TimeView.renderGameData = function (time) {
  this.initialTime = this.leftTime = time;
  this.showLeftTime(this.leftTime);

  discountLeftTime = setInterval(() => {
    this.leftTime--;
    this.showLeftTime(this.leftTime);
    
    if(this.leftTime == 0) {
      clearInterval(discountLeftTime);
      this.emit('@timeout');
    }
  }, 1000)
}

TimeView.showLeftTime = function (leftTime) {
  this.leftTimeEl.innerHTML = leftTime + '초';
}

TimeView.renderInitialDate = function () {
  clearInterval(discountLeftTime);
  this.showLeftTime(0);
}

TimeView.getLeftTime = function() {

  return new Promise(res => {
    res(this.initialTime - this.leftTime);
  })
}

export default TimeView;