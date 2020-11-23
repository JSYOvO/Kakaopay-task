import TimeView from '../views/TimeView.js'
import ScoreView from '../views/ScoreView.js'
import GameView from '../views/GameView.js'
import DataModel from '../models/DataModel.js'

export default {
    init(router) {
      this.router = router;
      this.gameData = [];
      this.gameDataLength = 0;
      this.cnt = -1;
      this.score = 0;
      this.sumTime = 0;
      this.solve = 0;

      // 뷰 초기화 및 커스텀 이벤트 콜백함수 등록
      TimeView.setup(document.querySelector(".header__time"))
      .on('@timeout', e => this.timeOut()); // 각 단어의 제한시간이 경과하면 호출되는 커스텀 이벤트 
      ScoreView.setup(document.querySelector(".header__score"));
      GameView.setup(document.querySelector(".game"))
      .on('@gameStart', e => this.gameStart()) // 시작버튼을 눌렀을때 호출되는 커스텀 이벤트
      .on('@gameStop', e => this.gameStop()) // 초기화버튼을 눌렀을때 호출되는 커스텀 이벤트
      .on('@submit', e => this.onSubmit(e.detail.input)); // 사용자가 단어를 입력하고 엔터를 누르면 호출되는 커스텀 이벤트
      
      // 모델에게 게임데이터 요청
      this.fetchGameData();
    },

    fetchGameData() { // 모델로부터 게임데이터 반환
      DataModel.getList().then(data => {
        this.gameData = data;
        this.gameDataLength = data.length;
      })
    },

    gameStart() { // 게임데이터의 인덱스를 하나씩 증가시키고, 그떄의 게임 데이터를 화면에 출력
      this.cnt++;
      if(this.cnt === this.gameDataLength){ // 게임데이터의 모든 단어를 다 풀면 gameEnd() 함수 호출
        this.gameEnd();
        return;
      }
      
      this.renderGameData(); // 변경된 게임 데이터 화면에 출력
    },

    gameStop(){ // 개암데이터 인덱스를 -1(초기화)로 초기화하고, 기본 초기화면을 화면에 출력
      this.cnt = -1;
      this.renderInitialDate(); // 개암 가본 초가화면 화면에 출력
    },

    gameEnd(){ // game__button을 클릭함으로서 @gameStop 커스텀 이벤트를 발생시켜 기본 초기화면을 화면에 출력시킴
      document.querySelector(".game__button").click();
      // 라우터를 활용하여 결과페이지로 이동 (푼 문제수와 평균시간을 같이 전송)
      this.router.push('result', this.solve, this.sumTime/this.solve);
    },

    renderInitialDate(){ // 게임의 초기화면을 출력하도록 각 뷰에게 요청
      TimeView.renderInitialDate();
      ScoreView.renderInitialDate();
      GameView.renderInitialDate()
    },

    renderGameData() { // 게임의 현재 진행상태를 출력하도록 각 뷰에게 요청
      const second = this.gameData[this.cnt].second;
      const text = this.gameData[this.cnt].text;
      
      TimeView.renderGameData(second);
      ScoreView.renderGameData(this.score);
      GameView.renderGameData(text)
    },

    onSubmit(input) { // 사용자가 단어를 입력한 단어와 화면상의 문제단어와 비교하여 맞다면 회면 초기화 후 다음 단어 출력
      if(this.compare(input, this.gameData, this.cnt)){
        this.renderInitialDate();
        this.renderGameData();
      }
    },

    compare(input, gameData, cnt) { // 사용자가 입력한 단어와 화면상의 문제단어 비교
      const second = gameData[cnt].second;
      const text = gameData[cnt].text;

      if(input === text){ // 비교하며 동일하다면 점수, 문제 인덱스, 푼 갯수 증가
        this.score++; 
        this.cnt++;
        this.solve++;

        TimeView.getElapsedTime().then(time => { // TimeView에게 경과시간을 확인하여 전체 진행시간 체크
          this.sumTime += time
        });

        if(this.cnt === this.gameDataLength){ // 문제 끝에 도달시 게임 종료
          this.gameEnd();
          return false;
        }
        
        return true;
      }
     return false;
    },

    timeOut(){ // 문제에 주어진 시간이 모두 지나간 경우 점수를 차감하고 다음 단어를 출력
      this.score = this.score === 0 ? this.score : this.score - 1;
      this.cnt ++;
      this.renderInitialDate();
      GameView.clearInput(); // GamaView에게 입력창의 텍스트 초기화 요청

      if(this.cnt === this.gameDataLength){ // 문제 끝 도달시 게임 종료
        this.gameEnd();
        return;
      }
      
      this.renderGameData();
    },
}