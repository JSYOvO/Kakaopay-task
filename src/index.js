
// import MainController from './pages/game/controllers/MainController';
import Main from './pages/main/Main';
import Result from './pages/result/Result';
import Router from './Router';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const pages = [
        { page: Main, path: '' },
        { page: Main, path: 'main' },
        { page: Result, path: 'result' },
    ];
    // Main, Result Component와 대응하는 Routing 주소를 매핑하여 페이지 구성
    
    const router = new Router({ pages }); // 구성한 페이지로 Router 객체 생성
    router.push('main'); // 해쉬주소 #main으로 기본 Routing 주소 선언
    
})
