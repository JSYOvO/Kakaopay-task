import TimeView from '../views/TimeView.js'
import ScoreView from '../views/ScoreView.js'
import GameView from '../views/GameView.js'
import DataModel from '../models/DataModel.js'

// let gameData, gameDataLength, this.cnt = -1, score = 0, sumTime = 0, solve = 0;
export default {
    init(router) {
      this.router = router;
      this.gameData = [];
      this.gameDataLength = 0;
      this.cnt = -1;
      this.score = 0;
      this.sumTime = 0;
      this.solve = 0;

      TimeView.setup(document.querySelector(".header__time"))
      .on('@timeout', e => this.timeOut());
      ScoreView.setup(document.querySelector(".header__score"));
      GameView.setup(document.querySelector(".game"))
      .on('@gameStart', e => this.gameStart())
      .on('@gameStop', e => this.gameStop())
      .on('@submit', e => this.onSubmit(e.detail.input));
      
      this.fetchGameData();
    },

    fetchGameData() {
      DataModel.getList().then(data => {
        this.gameData = data;
        this.gameDataLength = data.length;
      })
    },

    gameStart() {
      this.cnt++;
      if(this.cnt === this.gameDataLength){
        this.gameEnd();
        return;
      }
      
      this.renderGameData();
    },

    gameStop(){
      this.cnt = -1;
      this.renderInitialDate();
    },

    gameEnd(){
      document.querySelector(".game__button").click();
      // 결과페이지로 이동
      this.router.push('result', this.solve, this.sumTime/this.solve);
    },

    renderInitialDate(){
      TimeView.renderInitialDate();
      ScoreView.renderInitialDate();
      GameView.renderInitialDate()
    },

    renderGameData() {
      const second = this.gameData[this.cnt].second;
      const text = this.gameData[this.cnt].text;
      
      TimeView.renderGameData(second);
      ScoreView.renderGameData(this.score);
      GameView.renderGameData(text)
    },

    onSubmit(input) {
      if(this.compare(input, this.gameData, this.cnt)){
        this.renderInitialDate();
        this.renderGameData();
      }
    },

    compare(input, gameData, cnt) {
      const second = gameData[cnt].second;
      const text = gameData[cnt].text;
      if(input === text){
        this.score++; 
        this.cnt++;
        this.solve++;
        
        TimeView.getLeftTime().then(time => {
          this.sumTime += time
        });

        if(this.cnt === this.gameDataLength){
          this.gameEnd();
          return false;
        }
        
        return true;
      }
     return false;
    },

    timeOut(){
      this.score = this.score === 0 ? this.score : this.score - 1;
      this.cnt ++;
      this.renderInitialDate();
      GameView.clearInput();

      if(this.cnt === this.gameDataLength){
        this.gameEnd();
        return;
      }
      
      this.renderGameData();
    },
}