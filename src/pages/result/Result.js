import MainController from './controllers/MainController';

class Result {
    constructor({router}){
        this.router = router;
    }

    mount(solve, avg){ // 생성자로부터 받은 router를 컨트롤러에 넘김 + push함수로부터 넘어온 solve, avg로 함꼐 넘김
        MainController.init(this.router, solve, avg);
    }

    render() { // 라우터에서 해당 화면 호출시 아래의 html코트를 화면에 출력
        return `
            <div class="result">
                <div class="header">
                    Mission Complete!
                </div>
                <div class="result__result">
                    <h1></h1>
                    <p></p>
                </div>
                <button class="reset__button">다시시작</button>
            </div>
        `
    }
}

export default Result;







