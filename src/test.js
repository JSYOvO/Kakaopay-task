import DataModel from './pages/main/models/DataModel';
import ResultView from './pages/result/views/ResultView';
import TimeView from './pages/main/views/TimeView';

// DataModel.js에서 Fetch를 통해 서버로 받아온 데이터가 정상적인지 확인하는 테스트 진행
test("[DataModel] fetch data test", () => {
    return DataModel.getList()
    .then(data => {
        // Snapshot 생성하여 동일한 데이터가 들어오는지 확인
        // 타자게임의 경우는 동일한 데이터만을 서버에서 받아오므로 위의 테스트 진행
        expect(data).toMatchSnapshot();
        
        // 서버에서 받아온 데이터가 문제의 요구사항에서의 second, text의 응답형식을 가졌는지 확인
        // 서버로부터 지속적으로 동일한 데이터를 받는게 아니라면 위의 테스트 진행
        for(let i = 0; i< data.length; i += 1){
            expect(data[i]).toHaveProperty('second');
            expect(data[i]).toHaveProperty('text');
        }  
    })
});

// TimeView 시간 경과시간이 제대로 반환되는지 확인
test("[TimeView] getElapsedTime", () => {
    return TimeView.getElapsedTime(10, 5)
    .then(data => {
        expect(data).toEqual(5);
    })
})

// ResultView의 사용자 게임 결과화면이 제대로 반환되는지 확인
test("[ResultView - renderResultDataScore]", () => {
    expect(ResultView.renderResultDataScore(5)).toEqual("당신의 점수는 5점입니다.");
    expect(ResultView.renderResultDataScore()).toEqual("당신의 점수는 10점입니다.");
});

test("[ResultView - renderResultDataAvgTime]", () => {
    expect(ResultView.renderResultDataAvgTime(5)).toEqual("단어당 평균 답변 시간은 5초입니다.");
    expect(ResultView.renderResultDataAvgTime()).toEqual("단어당 평균 답변 시간은 10초입니다.");
});