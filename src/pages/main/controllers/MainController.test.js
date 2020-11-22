import DataModel from './MainController';


test("[MainController]", () => {
    expect(DataModel.comapare("hello")).toEqual(true);
})