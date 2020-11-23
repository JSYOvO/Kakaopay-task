export default {
    getList() {
        return new Promise((resolve, reject) => {
            fetch('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
            .then((res) => {
                // throw new Error("error");
                resolve(res.json());
            })
            .catch((err) => {
                // console.log("Fetch Error!!!");
                reject('Fetch Error!!!');
            })
        })
    }
}