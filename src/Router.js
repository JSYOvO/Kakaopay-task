
class Router {
    constructor({pages}) {
      this.app = document.querySelector('.app');
      this.solve = 0;
      this.avg = 0;
      this.page = pages;

      window.onhashchange = () => {  
        this.loadPage(this.page);
      }
      
      if(window.PerformanceNavigation.TYPE_RELOAD){
        this.loadPage(this.page);
      }
    }

    loadPage(page){
        this.nowPage = window.location.hash.replace('#','');
        const matchPage = page.find((el) => el.path === this.nowPage);
        const toRenderPage = matchPage.page;
        const currentPage = new toRenderPage({router : this});
        this.app.innerHTML = currentPage.render();
        currentPage.mount(this.solve, this.avg);
    }

    push(pageName, solve, avg) {
      this.solve = solve ? solve : this.solve;
      this.avg = avg ? avg : this.avg;
      
      window.location.hash = pageName;
    }
  
    replace(pageName) {
      window.location.replace(`${window.location.origin}#${pageName}`);
    }
  }
    
  export default Router;