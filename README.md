# Kakaopay - Typing Game (타자게임)
  주어진 단어가 표시되면 input에 단어를 정재신 시간 내에 입력하여 점수를 획득하는 어플리케이션 개발
  
## 1. 과제 요구사항 및 해결전략
+ webpack 환경을 구성

  + webpack-dev-server 환경구성
  
   ```
   $ npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader
   ```
  + start script를 통해서 hot-loading 적용
   ``` 
   [package.json]
    "scripts": {
      "start": "webpack-dev-server"
     }
   ```
  
  + build script를 구성하여 /public 폴더에 html, js, css를 export
   ``` 
   [package.json]
    "scripts": {
      "build": "webpack --config webpack.config.js"
     }
     
   [webpack.config.js]
    var path = require('path');
    var webpack = require('webpack');
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      mode: "development",
      entry: {
        main: './src/index.js',
      },
      output: {
        filename: '[name].js',
        path: path.resolve('./public'),
      },
      module : {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',     // css-loader 로 번들링한 js형식의 스타일코드를 직접 html에 주입
                    'css-loader'        // css => js 로 번들링
                ],
            }
        ]
      },
      devServer: {
        contentBase: path.join(__dirname, "public"),
        publicPath: "/",
        overlay: true,
        hot: true
      },
      plugins: [
        new HtmlWebpackPlugin({
          // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
          template: './src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
    };
   ```

+ 모든 구현은 vanila javascript로 구현한다.

  + 기본적인 MVC패턴 활용
   ```
   [디렉토리 구조]
     src
       ├── index.html
       ├── index.js
       ├── Router.js
       ├── style.css
       └── pages
              ├── main
              │     ├── main.js
              │     ├── controllers
              │     │       └── MainController.js
              │     ├── models
              │     │       └── DataModel.js
              │     └── views
              │             ├── GameView.js
              │             ├── ScoreView.js
              │             ├── TimeView.js
              │             └── View.js
              │     
              └── result
                    ├── result.js
                    ├── controllers
                    │       └── MainController.js
                    └── views
                            ├── ResetView.js
                            ├── ResultView.js
                            └── View.js
   ```
    
+ 게임 화면과 완료 화면은 Routing을 통하여 이동한다. (Router 클래스를 직접 구현)
   
   + Routing 할 페이지 등록
      ```
      [index.js]
        const pages = [
            { page: Main, path: 'main' },
            { page: Result, path: 'result' },
        ];

        const router = new Router({ pages });
      
        // Main, Result Component와 대응하는 Routing 주소를 매핑하여 페이지 구성
        // 구성한 페이지로 Router 객체 생성
      ```
      
   + Routing 객체 생성
      ```
      [Router.js]
        class Router {
          constructor({pages}) {
            this.app = document.querySelector('.app');
            this.solve = 0, this.avg = 0, this.page = pages;
            
            // 윈도우의 hash가 변경되거나, 페이지가 Relaod되면 해시값애 매핑되는 페이지 호출
            window.onhashchange = () => { this.loadPage(this.page); } 
            if(window.PerformanceNavigation.TYPE_RELOAD){ this.loadPage(this.page); }
          }
          loadPage(page){
            this.nowPage = window.location.hash.replace('#',''); // 변경되거나 Reload된 현재의 해시값 확인
            const matchPage = page.find((el) => el.path === this.nowPage); // 확인한 해시와 매핑되는 페이지 확인
            const toRenderPage = matchPage.page;
            const currentPage = new toRenderPage({router : this}); // 매핑되는 페이지 객체 생성
            this.app.innerHTML = currentPage.render(); // 매핑되는 페이지 객체의 render 함수 호출
            currentPage.mount(this.solve, this.avg);
          }
        }
      
      => Main, Result Component와 대응하는 Routing 주소를 매핑하여 페이지 구성
         구성한 페이지로 Router 객체 생성
      ```
      
   + Routing으로 페이지 이동
      ```
      [index.js]
        router.push('main'); // 해쉬주소 #main으로 기본 Routing 주소 선언
        
      [Router.js]
        push(pageName, solve, avg) {
          this.solve = solve ? solve : this.solve;
          this.avg = avg ? avg : this.avg;

          window.location.hash = pageName; // 윈도우 해쉬주소를 위에서 선언한 주소로 변경
        }

      ```
      
+ 단위 테스트 적용 (Jest 활용)
   
   + Jest 환경구성
      ```
      $ npm i -D jest jest-fetch-mock babel-jest @babel/core @babel/preset-env
      
      [setupJest.js]
        require('jest-fetch-mock').enableMocks()
        fetchMock.dontMock() 

      [babel.config.js]
        module.exports = {
            "presets": ["@babel/preset-env"]
        }
      
      [package.json]
        "jest": {
          "automock": false,
          "setupFiles": [
            "./setupJest.js"
           ]
        }
        "scripts": {
          "test": "jest"
        }
      ```
      
   + 테스트 파일 구성 (예시 : DataModel.test.js)
      ```
      [DataModel.test.js]
      import DataModel from './DataModel';
      
      // DataModel.js에서 Fetch를 통해 서버로 부터 받아온 데이터가 정상적인지 확인하는 테스트 진행
      test("[DataModel] fetch data test", () => {
          return DataModel.getList()
          .then(data => {
              // Snapshot 생성하여 동일한 데이터가 들어오는지 확인
              // 타자게임의 경우는 동일한 데이터만을 서버에서 받아오므로 위의 테스트 진행
              expect(data).toMatchSnapshot();

              // 서버에서 받아온 데이터가 문제의 요구사항에서의 second, text의 응답형식을 가졌는지 확인
              // 서버로부터 지속적으로 동일한 데이터를 받는게 아니라면 위의 테스트 진행
              for(let i = 0; i< data.length; i += 1){
                  expect(data[i]).toHaveProperty('second');
                  expect(data[i]).toHaveProperty('text');
              }  
          })
      });        
      ```
     
+ 단어는 서버에 요청하여 받아 온다.

  + 비동기 방식으로 서버에서 받은 데이터 반환
      ```
      [DataModel.js]
        getList() { 
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
      ```