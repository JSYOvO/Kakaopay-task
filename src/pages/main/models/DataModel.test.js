import DataModel from './DataModel';


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

// test("[DataModel] fetch data test rejected", () => {
//     return DataModel.getList()
//     .catch(error => {
//         expect.assertions(1);
//         expect(error).toMatch('Fetch Error!!!');
//     })
// });
