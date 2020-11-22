
// import MainController from './pages/game/controllers/MainController';
import Main from './pages/main/Main';
import Result from './pages/result/Result';
import Router from './Router';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const pages = [
        { page: Main, path: 'main' },
        { page: Result, path: 'result' },
    ];
    
    const router = new Router({ pages });
    router.push('main');
    
})
