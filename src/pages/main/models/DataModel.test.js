import DataModel from './DataModel';


test("[DataModel] fetch data test", () => {
    return DataModel.getList()
    .then(data => {
        expect(data).toBeTruthy(
            expect(data[0].second).toBeTruthy(),
            expect(data[0].text).toBeTruthy()
        )
        // expect(data).not.toBeTruthy();
    }) 
})