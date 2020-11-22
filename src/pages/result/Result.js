import MainController from './controllers/MainController';

class Result {
    constructor({router}){
        this.router = router;
    }

    mount(solve, avg){
        MainController.init(this.router, solve, avg);
    }

    render() {
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







