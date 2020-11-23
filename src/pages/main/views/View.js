export default {
  init(el) { // html 요소를 받아서 el로 저장
    if (!el) throw el
    this.el = el
    return this
  },

  on(event, handler) { // 이벤트 발생시 콜백함수 등록
    this.el.addEventListener(event, handler)
    return this
  },

  emit(event, data) { // 커스텀 이벤트 생성
    const evt = new CustomEvent(event, { detail: data })
    this.el.dispatchEvent(evt)
    return this
  },
}