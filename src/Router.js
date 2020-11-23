class Router {
    constructor({pages}) {
      this.app = document.querySelector('.app');
      this.solve = 0;
      this.avg = 0;
      this.page = pages;

      // 윈도우의 hash가 변경되거나, 페이지가 Relaod되면 해시값애 매핑되는 페이지 호출
      window.onhashchange = () => {  
        this.loadPage(this.page);
      }
      
      if(window.PerformanceNavigation.TYPE_RELOAD){
        this.loadPage(this.page);
      }
    }

    loadPage(page){
        this.nowPage = window.location.hash.replace('#',''); // 변경되거나 Reload된 현재의 해시값 확인
        const matchPage = page.find((el) => el.path === this.nowPage); // 확인한 해시와 매핑되는 페이지 확인
        const toRenderPage = matchPage.page;
        const currentPage = new toRenderPage({router : this}); // 매핑되는 페이지 객체 생성
        this.app.innerHTML = currentPage.render(); // 매핑되는 페이지 객체의 render 함수 호출
        currentPage.mount(this.solve, this.avg);
    }

    push(pageName, solve, avg) {
      this.solve = solve ? solve : 0;
      this.avg = avg ? avg : 0;
       // 만일 push 호출시 solve, avg 데이터가 넘어오면 해당정보를 활용하여 페이지 랜더링 진행
      
      window.location.hash = pageName; // 윈도우 해쉬주소를 위에서 선언한 주소로 변경
    }
  
    // replace(pageName) {
    //   window.location.replace(`${window.location.origin}#${pageName}`);
    // }
  }
    
  export default Router;