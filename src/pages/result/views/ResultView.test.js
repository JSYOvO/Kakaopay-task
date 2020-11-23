import ResultView from './ResultView';

test("[ResultView - renderResultDataScore]", () => {
    expect(ResultView.renderResultDataScore(5)).toEqual("당신의 점수는 5점입니다.");
    expect(ResultView.renderResultDataScore()).toEqual("당신의 점수는 10점입니다.");
});

test("[ResultView - renderResultDataAvgTime]", () => {
    expect(ResultView.renderResultDataAvgTime(5)).toEqual("단어당 평균 답변 시간은 5초입니다.");
    expect(ResultView.renderResultDataAvgTime()).toEqual("단어당 평균 답변 시간은 10초입니다.");
});