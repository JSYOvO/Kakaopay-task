export default {
    getList() {
        return new Promise((resolve, reject) => {
            fetch('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
            .then((res) => {
                resolve(res.json());
            })
            .catch((err) => {
                console.log("Fetch Error!!!", err);
            })
        })
    }
}