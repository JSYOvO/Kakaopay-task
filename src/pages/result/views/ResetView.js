import View from './View.js'
const ResetView = Object.create(View) // 리셋버튼을 사용자에게 전달하기 위한 뷰

ResetView.setup = function (el) {
    this.init(el) // html 요소 등록
    this.bindEvent();

    return this;
}

ResetView.bindEvent = function() { // 리셋버튼 클릭시 onClickButton 호출되도록 선언
    this.el.addEventListener('click', e => this.onClickButton());
}

ResetView.onClickButton = function() { // @gameReset 커스텀 이밴트 생성
    this.emit('@gameReset');
}

export default ResetView;