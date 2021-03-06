# Kakaopay - Typing Game (타자게임)
  주어진 단어가 표시되면 input에 단어를 정재신 시간 내에 입력하여 점수를 획득하는 어플리케이션 개발
  

## 해결전략 및 과제 요구사항
+ 해결전략 - 구성  
  게임에 접속시 초기화면을 화면에 출력하며 필요한 데이터를 서버에서 받아옵니다.  
  게임이 시작되면 받아온 데이터를 하나씩 화면에 출력하며 각 단어의 제한시간 및 획득점수도 출력합니다.  
  사용자가 타이핑한 단어와 화면의 단어가 같은지 비교하고 같다면 진행시간, 맞춘문제, 획득점수를 체크해둡니다.  
  게임이 끝나면 맞춘문제 및 획득점수를 담아서 라우팅의 push를 통해 결과화면으로 보냅니다.  

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
       ├── index.js - main, result 페이지 라우팅
       ├── Router.js - 라우팅 객체 선언
       ├── test.js - test파일
       ├── style.css
       └── pages
              ├── main - 기본 게임페이지
              │     ├── main.js - 라우팅으로 호출되며 게임페이지 render
              │     ├── controllers
              │     │       └── MainController.js - 모델로부터 데이터를 요구하고, 그 결과를 뷰로 전달
              │     ├── models
              │     │       └── DataModel.js - 서버로부터 게임데이터를 받아 컨트롤러에 전달
              │     └── views
              │             ├── GameView.js - 페이지 중앙의 게임화면을 사용자에게 전달
              │             ├── ScoreView.js - 페이지 상단의 획득점수를 사용자에게 전달
              │             ├── TimeView.js - 페이지 상단의 남은시간을 사용자에게 전달
              │             └── View.js - 뷰 생성 및 관리를 위한 기본파일
              │     
              └── result - 결과페이지
                    ├── result.js - 라우팅으로 호출되며 결과페이지 render
                    ├── controllers
                    │       └── MainController.js - 모델로부터 데이터를 요구하고, 그 결과를 뷰로 전달
                    └── views
                            ├── ResetView.js - 리셋버튼을 사용자에게 전달
                            ├── ResultView.js - 게임결과를 사용자에게 전달
                            └── View.js - 뷰 생성 및 관리를 위한 기본파일
   ```
    
+ 게임 화면과 완료 화면은 Routing을 통하여 이동한다. (Router 클래스를 직접 구현)
   
   + Routing 할 페이지 등록
      ```
      [index.js]
        const pages = [
            { page: Main, path: 'main' },
            { page: Result, path: 'result' },
        ];
        // Main, Result Component와 대응하는 Routing 주소를 매핑하여 페이지 구성

        const router = new Router({ pages }); // 구성한 페이지로 Router 객체 생성
      ```
      
   + Routing 객체 생성
      ```
      [Router.js]
        class Router {
          constructor({pages}) {
            this.app = document.querySelector('.app');
            this.solve = 0, this.avg = 0, this.page = pages;
            
            // 윈도우의 hash가 변경되거나, 페이지가 Relaod되면 해시 값에 매핑되는 페이지 호출
            window.onhashchange = () => { this.loadPage(this.page); } 
            if(window.PerformanceNavigation.TYPE_RELOAD){ this.loadPage(this.page); }
          }
          loadPage(page){
            // 변경되거나 Reload된 현재의 해시값 확인
            this.nowPage = window.location.hash.replace('#',''); 

            // 확인한 해시와 매핑되는 페이지 확인
            const matchPage = page.find((el) => el.path === this.nowPage); 
            const toRenderPage = matchPage.page;

            // 매핑되는 페이지 객체 생성
            const currentPage = new toRenderPage({router : this}); 

            // 매핑되는 페이지 객체의 render 함수 호출
            this.app.innerHTML = currentPage.render(); 
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
      
   + 테스트 파일 구성 
      ```
      [test.js]
      import DataModel from './DataModel';
      
      // DataModel.js에서 Fetch를 통해 서버로 받아온 데이터가 정상적인지 확인하는 테스트 진행
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

  + 서버에 요청하여 받은 데이터 비동기 방식으로 반환
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
