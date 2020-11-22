import TimeView from '../views/TimeView.js'
import ScoreView from '../views/ScoreView.js'
import GameView from '../views/GameView.js'
import DataModel from '../models/DataModel.js'

let gameData, gameDataLength, cnt = -1, score = 0;

export default {
    init(router) {
      this.router = router;
      TimeView.setup(document.querySelector(".header__time"))
      .on('@timeout', e => this.timeOut());
      ScoreView.setup(document.querySelector(".header__score"));
      GameView.setup(document.querySelector(".game"))
      .on('@gameStart', e => this.gameStart())
      .on('@gameStop', e => this.gameStop())
      .on('@submit', e => this.onSubmit(e.detail.input));
      this.sumTime = 0, this.solve = 0;
      this.fetchGameData();
    },

    fetchGameData() {
      DataModel.getList().then(data => {
        gameData = data;
        gameDataLength = data.length;
      })
    },

    gameStart() {
      cnt++;
      if(cnt === gameDataLength){
        this.gameEnd();
        return;
      }
      
      this.renderGameData();
    },

    gameStop(){
      cnt = -1;
      this.renderInitialDate();
    },

    renderInitialDate(){
      TimeView.renderInitialDate();
      ScoreView.renderInitialDate();
      GameView.renderInitialDate()
    },

    renderGameData() {
      const second = gameData[cnt].second;
      const text = gameData[cnt].text;
      
      TimeView.renderGameData(second);
      ScoreView.renderGameData(score);
      GameView.renderGameData(text)
    },

    onSubmit(input) {
      if(this.compare(input)){
        this.renderInitialDate();
        this.renderGameData();
      }
    },

    compare(input) {
      const second = gameData[cnt].second;
      const text = gameData[cnt].text;
      if(input === text){
        score++; 
        cnt++;
        this.solve++;
        TimeView.getLeftTime().then(time => {
          this.sumTime += time
        });

        if(cnt === gameDataLength){
          this.gameEnd();
          return false;
        }
        
        return true;
      }
     return false;
    },

    timeOut(){
      score = score === 0 ? score : score - 1;
      cnt ++;
      this.renderInitialDate();

      if(cnt === gameDataLength){
        this.gameEnd();
        return;
      }
      
      this.renderGameData();
    },

    gameEnd(){
      document.querySelector(".game__button").click();

      // 결과페이지로 이동
      this.router.push('result', this.solve, this.sumTime/this.solve);
    }

}