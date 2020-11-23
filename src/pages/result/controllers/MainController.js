import ResultView from '../views/ResultView.js'
import ResetView from '../views/ResetView.js'


export default {
    init(router, solve, avg) {
      this.router = router;
      // 뷰 초기화 및 커스텀 이벤트 콜백함수 등록
      ResultView.setup(document.querySelector(".result__result"), solve, avg);
      ResetView.setup(document.querySelector(".reset__button"))
      .on('@gameReset', e => this.gameReset()); // 게임 리셋버튼 클릭시 호출되는 커스텀 이벤트 
    },

    gameReset() {
      //  라우터를 활용하여 게임페이지로 이동
      this.router.push('main');
    }

}