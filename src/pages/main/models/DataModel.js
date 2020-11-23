export default {
    getList() { // 컨트롤러가 게임데이터 요청시 서버에 요청하여 비동기 방식으로 반환
        return new Promise((resolve, reject) => {
            fetch('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
            .then((res) => {
                resolve(res.json());
            })
            .catch((err) => {
                reject('Fetch Error!!!');
            })
        })
    }
}