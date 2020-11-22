import View from './View.js'
const ResetView = Object.create(View)

ResetView.setup = function (el) {
    this.init(el)
    this.bindEvent();

    return this
}

ResetView.bindEvent = function() {
    this.el.addEventListener('click', e => this.onClickButton());
}

ResetView.onClickButton = function() {  
    this.emit('@gameReset');
}

export default ResetView;