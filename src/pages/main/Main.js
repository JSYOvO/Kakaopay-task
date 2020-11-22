import MainController from './controllers/MainController';

class Main {
    constructor({router}){
        this.router = router;
    }

    mount(){
        MainController.init(this.router);
    }

    render() {
        return `
            <div class="main">
                <div class="header">
                    <div class="header__time">
                        <p>남은 시간 : </p>
                        <p class="header__time__left"></p>
                    </div>
                    <div class="header__score">
                        <p>점수 : </p>
                        <p class="header__score__left"></p>
                    </div>
                </div>
                <div class="game">
                    <h1></h1>
                    <input type="text" placeholder="입력" >
                    <p class="game__button">시작</p>
                </div>
            </div>
        `
    }
}

export default Main;
