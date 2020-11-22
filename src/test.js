// import DataModel from './pages/main/models/DataModel';
const DataModel = require('./pages/main/models/DataModel');

 test("fetch data test", () => {
    DataModel.getList().then(data => {
        const getData = data;

        expect(getData).toContainEqual({secone : 10, text : 'hello'});
    })
 })