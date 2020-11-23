import DataModel from './pages/main/models/DataModel';
import ResultView from './pages/result/views/ResultView';
import TimeView from './pages/main/views/TimeView';

test("[DataModel] fetch data test", () => {
    return DataModel.getList()
    .then(data => {
        expect(data).toMatchSnapshot();
        
        for(let i = 0; i< data.length; i += 1){
            expect(data[i]).toHaveProperty('second');
            expect(data[i]).toHaveProperty('text');
        }  
    })
});

test("[TimeView] getElapsedTime", () => {
    return TimeView.getElapsedTime(10, 5)
    .then(data => {
        expect(data).toEqual(5);
    })
})

test("[ResultView - renderResultDataScore]", () => {
    expect(ResultView.renderResultDataScore(5)).toEqual("당신의 점수는 5점입니다.");
    expect(ResultView.renderResultDataScore()).toEqual("당신의 점수는 10점입니다.");
});

test("[ResultView - renderResultDataAvgTime]", () => {
    expect(ResultView.renderResultDataAvgTime(5)).toEqual("단어당 평균 답변 시간은 5초입니다.");
    expect(ResultView.renderResultDataAvgTime()).toEqual("단어당 평균 답변 시간은 10초입니다.");
});