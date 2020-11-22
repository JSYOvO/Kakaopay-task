import ResultView from '../views/ResultView.js'
import ResetView from '../views/ResetView.js'


export default {
    init(router, solve, avg) {
      this.router = router;
      ResultView.setup(document.querySelector(".result__result"), solve, avg);
      ResetView.setup(document.querySelector(".reset__button"))
      .on('@gameReset', e => this.gameReset());
    },

    gameReset() {
      // 게임페이지로 이동
      this.router.push('main');
    }

}