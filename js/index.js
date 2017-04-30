/**
 * Created by zhangzidong on 2017/4/7.
 */
angular.module('myApp',['ionic'])

/*自定义*/
  //服务
  .service('$acjHttp',['$http','$ionicLoading',function ($http,$ionicLoading) {
    this.sendRequest=function (url,successCallback) {
      $ionicLoading.show({
        template:'loading...'
      });
      $http.get(url).success(function (data) {
        $ionicLoading.hide();
        successCallback(data);
      })
    }
  }])
  //指令
  .directive('hideTabs',function ($rootScope) {
    return  {
      restrict:'A',
      link:function (scope,element,attributes) {
        scope.$on('$ionicView.beforeEnter', function() {
          scope.$watch(attributes.hideTabs, function(value){
            $rootScope.hideTabs = value;
          });
        });
        scope.$on('$ionicView.beforeLeave', function() {
          $rootScope.hideTabs = false;
        });
      }
    }
  })
  //过滤器
  .filter('mfint', function() {
    return function(input) {
      //input是传入的字符串
      if (input) {
        return parseInt(input);
      }
    };
  })


/*路由设置*/
  .config(function ($stateProvider,$ionicConfigProvider,$urlRouterProvider) {
    //android导航位置
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider
      //冷启动
      .state('start',{
        url:'/uStart',
        templateUrl:'tpl/start.html'
      })
      //登录注册
      .state('login',{
        url:'/uLogin',
        templateUrl:'tpl/login.html',
        controller:'loginCtrl'
      })
      .state('log',{
        url:'/Log',
        templateUrl:'tpl/login/log.html'
      })
      //主页面
      .state('main',{
        url:'/uMain',
        abstract: true,
        templateUrl:'tpl/main.html',
        controller:'mainCtrl'
      })
      .state('main.daily',{
        url:'/Daily',
        views:{
          'daily-tab': {
            templateUrl:'tpl/main/daily.html',
            controller:'dailyCtrl'
          }
        }
      })
      .state('main.pay',{
        url:'/Pay',
        views:{
          'daily-tab': {
            templateUrl:'tpl/main/daily/pay.html'
          }
        }
      })
      .state('main.takings',{
        url:'/Takings',
        views:{
          'daily-tab': {
            templateUrl:'tpl/main/daily/takings.html'
          }
        }
      })
      .state('main.addbud',{
        url:'/Addbud',
        views:{
          'daily-tab': {
            templateUrl:'tpl/main/daily/addbud.html'
          }
        }
      })
      //记账入口
      .state('main.write',{
        url:'/Write',
        views:{
          'daily-tab': {
            templateUrl:'tpl/main/tally-write.html'
          }
        }
      })
      .state('main.speech',{
        url:'/Speech',
        views:{
          'daily-tab': {
            templateUrl:'tpl/main/tally-speech.html'
          }
        }
      })
      .state('main.shoot',{
        url:'/Shoot',
        views:{
          'daily-tab': {
            templateUrl:'tpl/main/tally-shoot.html'
          }
        }
      })
      .state('main.wish',{
        url:'/Wish',
        views:{
          'wish-tab':{
            templateUrl:'tpl/main/wish.html'
          }
        }
      })
      .state('main.trends',{
        url:'/Trends',
        views:{
          'trends-tab':{
            templateUrl:'tpl/main/trends.html',
            controller:'trendsCtrl'
          }
        }
      })
    //侧边栏内页
      .state('main.promotion',{
        url:'/Promotion',
        views:{
          'daily-tab':{
            templateUrl:'tpl/main/side/promotion.html'
          }
        }
      })
      .state('main.personal',{
        url:'/Personal',
        views:{
          'daily-tab':{
            templateUrl:'tpl/main/side/personal.html'
          }
        }
      })
      .state('main.remind',{
        url:'/Remind',
        views:{
          'daily-tab':{
            templateUrl:'tpl/main/side/remind.html'
          }
        }
      })
      .state('main.tickling',{
        url:'/Tickling',
        views:{
          'daily-tab':{
            templateUrl:'tpl/main/side/tickling.html'
          }
        }
      })
      .state('main.password',{
        url:'/Password',
        views:{
          'daily-tab':{
            templateUrl:'tpl/main/side/password.html'
          }
        }
      })
    $urlRouterProvider.otherwise('/uStart');
  })

/*控制器*/
  //全局控制器
  .controller('parentCtrl',['$scope','$state','$timeout',function ($scope,$state,$timeout) {
    //跳转方法
    $scope.jump=function (desState,args) {
      $state.go(desState,args)
    };
  }])
  //login控制器
  .controller('loginCtrl',['$scope',function ($scope) {

  }])
  //main控制器
  .controller('mainCtrl',['$scope','$ionicPopover','$state',function ($scope,$ionicPopover,$state) {
    //浮动框
    var template='<ion-popover-view class="mp-main-pop"><ion-list class="list-inset"><a href="" class="item">记账</a><a href="" class="item">取钱</a><a href="" class="item">存钱</a><a href="" class="item">添加好友</a><a href="" class="item">恋爱日记</a></ion-list></ion-popover-view>';
    $scope.popover=$ionicPopover.fromTemplate(template,{
      scope:$scope
    });
    $scope.openPopover=function ($event) {
      $scope.popover.show($event)
    };
    $scope.closePopover=function () {
      $scope.popover.hide();
    };
    $scope.tabSelected=function () {
      $state.go('main.daily')
    };
  }])
  //m.daily控制器
  .controller('dailyCtrl',['$scope','$timeout','$ionicScrollDelegate','$state','$http',function ($scope,$timeout,$ionicScrollDelegate,$state,$http) {
    $timeout(function () {
    //记账浮动按钮事件
      $('.btn-triger').click(function () {
        $(this).closest('.float-btn-group').toggleClass('open');
      });
    //重新计算高度已能完整显示内容
      $ionicScrollDelegate.resize();
//m.canvas绘图
      var progress=0;
      var img0=new Image();
      img0.src='images/daily-cav-0.png';
      img0.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      var img1=new Image();
      img1.src='images/daily-cav-1.png';
      img1.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      var img2=new Image();
      img2.src='images/daily-cav-2.png';
      img2.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      var img3=new Image();
      img3.src='images/daily-cav-3.png';
      img3.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      var imgb=new Image();
      imgb.src='images/daily-cav-b.png';
      imgb.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      var imgbl=new Image();
      imgbl.src='images/daily-cav-bl.png';
      imgbl.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      var imgbr=new Image();
      imgbr.src='images/daily-cav-br.png';
      imgbr.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      var imgt=new Image();
      imgt.src='images/daily-cav-t.png';
      imgt.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      var imgtl=new Image();
      imgtl.src='images/daily-cav-tl.png';
      imgtl.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      var imgtr=new Image();
      imgtr.src='images/daily-cav-tr.png';
      imgtr.onload=function () {
        progress+=10;
        if(progress===100)
          startDraw()
      };
      function startDraw() {
        var cboxList=[
          {price:87.00,icon:img1,time:'19:16'},
          {price:127.00,icon:img2,time:'12:00'},
          {price:8.00,icon:img3,time:'8:16'},
          {price:238.00,icon:img1,time:'6:16'},
          {price:87.00,icon:img1,time:'19:16'},
          {price:127.00,icon:img2,time:'12:00'},
          {price:8.00,icon:img3,time:'8:16'},
          {price:238.00,icon:img1,time:'6:16'}
        ];
        var canvas=document.getElementById('dailyCanvas');
        var content=canvas.getContext('2d');
        var percent= 0.75;
        var w=500;
        var h=300;
        // var timer;
        var points=new Array();
        // var ball={x:0,y:0,speed:0.01,t:0};

        var startX=0,startY=164;
        var c1x=29.5,c1y=145.5,c2x=60.5,c2y=129.5;
        var endX=90,endY=148;
        var a1x=125.5,a1y=170.5,a2x=184.5,a2y=245.5;
        var a3x=239.5,a3y=162.5;
        var b1x=299.5,b1y=71.5,b2x=329.5,b2y=141.5;
        var b3x=342.5,b3y=158.5;
        var d1x=353.5,d1y=172.5,d2x=407.5,d2y=309.5;
        var d3x=493.5,d3y=85.5;
        var e1x=494.5,e1y=82.5,e2x=497.5,e2y=75.5;
        var e3x=500,e3y=73.5;

        var p0={x:startX,y:startY};
        var p1={x:c1x,y:c1y};
        var p2={x:c2x,y:c2y};
        var p3={x:endX,y:endY};

        var a0={x:endX,y:endY};
        var a1={x:a1x,y:a1y};
        var a2={x:a2x,y:a2y};
        var a3={x:a3x,y:a3y};

        var b0={x:a3x,y:a3y};
        var b1={x:b1x,y:b1y};
        var b2={x:b2x,y:b2y};
        var b3={x:b3x,y:b3y};

        var d0={x:b3x,y:b3y};
        var d1={x:d1x,y:d1y};
        var d2={x:d2x,y:d2y};
        var d3={x:d3x,y:d3y};

        var e0={x:d3x,y:d3y};
        var e1={x:e1x,y:e1y};
        var e2={x:e2x,y:e2y};
        var e3={x:e3x,y:e3y};
        cauculate(p0,p1,p2,p3);
        cauculate(a0,a1,a2,a3);
        cauculate(b0,b1,b2,b3);
        cauculate(d0,d1,d2,d3);
        cauculate(e0,e1,e2,e3);
        function cauculate(p0,p1,p2,p3){

          var cx=3*(p1.x-p0.x);
          var bx=3*(p2.x-p1.x)-cx;
          var ax=p3.x-p0.x-bx-cx;
          var cy=3*(p1.y-p0.y);
          var by=3*(p2.y-p1.y)-cy;
          var ay=p3.y-p0.y-by-cy;
          for(var i=0;i<1;i+=0.01){
            var t=i;
            var xt=ax*(t*t*t)+bx*(t*t)+cx*t+p0.x;
            var yt=ay*(t*t*t)+by*(t*t)+cy*t+p0.y;
            points.push({x:xt,y:yt});
          }
          // ball.t+=ball.speed;
          // if(ball.t>1){
          //  ball.t=1;
          //  clearInterval(timer)
          }

          var i=0;

          //动画
          function drawScreen(offsetX){
            if(offsetX){
              i=parseInt(i+offsetX/3);
              // console.log(i)
            }
            var length=parseInt((points.length-1));
            console.log(length);
            // i+=1;
            // var length=parseInt((points.length-1)*percent);
            // if(i>=length){i=length;}
            content.fillStyle= "#ffffff";
            content.fillRect(0,0,w,h);

            //绘制主线条
            content.drawImage(img0,-50,10,600,220);

            //绘制上小盒子&圆
            function drawTBox(img,price,time,space,b,mpercent) {
              var mi=i-b*space;
              //运动位置
              var lengthed=length*mpercent;
              if(i>b*space&&mi<=lengthed){
                // mi++;
                var xt=points[mi].x;
                var yt=points[mi].y;
                var mx=xt;
                var my=yt+6;
                var mbw=120,mbh=70;//盒子大小
                content.textAlign = 'center'; //设置文本的水平对对齐方式
                content.baseline="middle";
                if(xt<40){
                  content.save();
                  content.translate(mx,my-mbh*1.3);
                  content.drawImage(imgtl,0,0,mbw,mbh);
                  content.drawImage(img,8,8,mbh*0.45,mbh*0.45);
                  content.font='22px sans-serif';
                  content.fillStyle='#f65f53';
                  content.fillText('￥'+price,mbw*0.64,mbh*0.4);
                  content.font='18px sans-serif';
                  content.fillStyle='#707070';
                  content.fillText(time,mbw/2,mbh*0.8);
                  content.restore();
                }else if(xt>(w-40)){
                  content.save();
                  content.translate(mx-mbw,my-mbh*1.2);
                  content.drawImage(imgtr,0,0,mbw,mbh);
                  content.drawImage(img,8,8,mbh*0.45,mbh*0.45);
                  content.font='22px sans-serif';
                  content.fillStyle='#f65f53';
                  content.fillText('￥'+price,mbw*0.64,mbh*0.4);
                  content.font='18px sans-serif';
                  content.fillStyle='#707070';
                  content.fillText(time,mbw/2,mbh*0.8);
                  content.restore();
                }else{
                  content.save();
                  content.translate(mx-mbw/2,my-mbh*1.5);
                  content.drawImage(imgt,0,0,mbw,mbh);
                  content.drawImage(img,8,8,mbh*0.45,mbh*0.45);
                  content.font='22px sans-serif';
                  content.fillStyle='#f65f53';
                  content.fillText('￥'+price,mbw*0.64,mbh*0.4);
                  content.font='18px sans-serif';
                  content.fillStyle='#707070';
                  content.fillText(time,mbw/2,mbh*0.8);
                  content.restore();
                }
                drawCircle(xt,yt)
              }
            }
            //绘制下小盒子
            function drawBBox(img,price,time,space,b,mpercent) {
              var mi=i-b*space;
              //运动位置
              var lengthed=length*mpercent;
              if(i>b*space&&mi<=lengthed){

                // mi++;
                var xt=points[mi].x;
                var yt=points[mi].y;
                var mx=xt;
                var my=yt+6;
                var mbw=120,mbh=70;//盒子大小
                // content.fillStyle="#ffaa00";
                // content.font="12px Arial";
                content.textAlign = 'center'; //设置文本的水平对对齐方式
                content.baseline="middle";
                if(xt<40){
                  content.save();
                  content.translate(mx,my+mbh*0.2);
                  content.drawImage(imgbl,0,0,mbw,mbh);
                  content.drawImage(img,8,28,mbh*0.45,mbh*0.45);
                  content.font='22px sans-serif';
                  content.fillStyle='#f65f53';
                  content.fillText('￥'+price,mbw*0.64,mbh*0.8);
                  content.font='18px sans-serif';
                  content.fillStyle='#707070';
                  content.fillText(time,mbw/2,mbh*0.4);
                  content.restore();
                }else if(xt>(w-40)){
                  content.save();
                  content.translate(mx-mbw,my+mbh*0.2);
                  content.drawImage(imgbr,0,0,mbw,mbh);
                  content.drawImage(img,8,28,mbh*0.45,mbh*0.45);
                  content.font='22px sans-serif';
                  content.fillStyle='#f65f53';
                  content.fillText('￥'+price,mbw*0.64,mbh*0.8);
                  content.font='18px sans-serif';
                  content.fillStyle='#707070';
                  content.fillText(time,mbw/2,mbh*0.4);
                  content.restore();
                }else{
                  content.save();
                  content.translate(mx-mbw/2,my+mbh*0.3);
                  content.drawImage(imgb,0,0,mbw,mbh);
                  content.drawImage(img,8,28,mbh*0.45,mbh*0.45);
                  content.font='22px sans-serif';
                  content.fillStyle='#f65f53';
                  content.fillText('￥'+price,mbw*0.64,mbh*0.8);
                  content.font='18px sans-serif';
                  content.fillStyle='#707070';
                  content.fillText(time,mbw/2,mbh*0.4);
                  content.restore();
                }
                drawCircle(xt,yt)
              }
            }
            //绘制小圆方法
            function drawCircle(xt,yt) {
              content.save();
              content.shadowOffsetX =0; // 阴影Y轴偏移
              content.shadowOffsetY = 0; // 阴影X轴偏移
              content.shadowBlur =4; // 模糊尺寸
              content.shadowColor = '#f67164'; // 颜色
              content.beginPath();
              content.fillStyle="#fff";
              content.arc(xt,yt,10,0,Math.PI*2,false);
              content.closePath();
              content.fill();
              content.restore();

              content.beginPath();
              content.fillStyle="rgba(246,132,83,0.5)";
              content.arc(xt,yt,6,0,Math.PI*2,false);
              content.closePath();
              content.fill();
            }
            //遍历数据输出盒子
            for(var b=0;b<cboxList.length;b++){
              var scope=80;//方块间距 时间间隔计算
              let list=cboxList[b];
              if(b%2==0){
                drawTBox(list.icon,list.price,list.time,scope,b,0.8);
              }else{
                drawBBox(list.icon,list.price,list.time,scope,b,0.8)
              }
            }

            //绘制透明蒙版
            var lineGradient3=content.createLinearGradient(0,0,500,0);
            lineGradient3.addColorStop(0,'rgba(255,255,255,0.7)');
            lineGradient3.addColorStop(1,'rgba(255,255,255,0');
            content.save();
            content.fillStyle=lineGradient3;
            content.fillRect(0,0,500,300);
            content.restore();
          }
          var send=0;
          var timer1=setInterval(function(){
            drawScreen(8);
            send++;
            if(send>=120){
              clearInterval(timer1)
            }
          },20);

          //手指滑动功能
          var startX=0;
          $(canvas).on("touchstart",function(e){
            startX=e.originalEvent.changedTouches[0].pageX;
            // console.log("start:"+startX);
          });
          $(canvas).on("touchmove",function(e){
            var offsetX = e.originalEvent.changedTouches[0].pageX-startX;
            startX=e.originalEvent.changedTouches[0].pageX;
            // console.log(offsetX)
            drawScreen(offsetX)
          });
        }

    },0);
    //标题切换标签
    $scope.surplusToggle=true;
    $scope.taskToggle=false;
    $scope.tabSurplus=function ($event) {
      if($scope.surplusToggle===false){
        $scope.surplusToggle=true;
        $scope.taskToggle=false;
        $event.target.className="button activate";
        $event.target.nextElementSibling.className="button";
      }
    };
    $scope.tabTask=function ($event) {
      if($scope.taskToggle===false){
        $scope.taskToggle=true;
        $scope.surplusToggle=false;
        $event.target.className="button activate";
        $event.target.previousElementSibling.className="button";
      }
    };
    // $state.go('main.daily')
    $scope.cavSwipe=function($event){
      console.log($event.gesture.deltaX)
    };
    //异步请求动态数据
    $scope.data={surplus:3400};
    $http.get('http://aicunji.applinzi.com/daily.php').success(function (output) {
      console.log(output);
      $scope.data.surplus=output.surplus;
    });
  }])
  //m.d.pay控制器
  // .controller('payCtrl',['$scope','$timeout','$ionicNavBarDelegate',function ($scope,$timeout,$ionicNavBarDelegate) {
  //   $scope.goBack = function() {
  //     $ionicNavBarDelegate.back();
  //   };
  // }])
  //m.trends控制器
  .controller('trendsCtrl',['$scope',function ($scope) {
    $scope.trendsToggle=true;
    $scope.informationToggle=false;
    $scope.tabTrends=function ($event) {
      if($scope.trendsToggle===false){
        $scope.trendsToggle=true;
        $scope.informationToggle=false;
        $event.target.className="button activate";
        $event.target.nextElementSibling.className="button";
      }
    }
    $scope.tabInformation=function ($event) {
      if($scope.informationToggle===false){
        $scope.informationToggle=true;
        $scope.trendsToggle=false;
        $event.target.className="button activate";
        $event.target.previousElementSibling.className="button";
      }
    }
  }])
