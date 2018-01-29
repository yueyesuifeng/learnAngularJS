var myApp=angular.module('helloworld',['ui.router']);//创建Angular模块
		myApp.config(function($stateProvider){
			var helloState={//创建状态
				name:'hello',//状态的名字，要和某个ui-serf的属性值相同
				url:'/hello',//浏览器被激活的时候，浏览器显示的url,可以不和name相同
				template:'<h3>hello world!</h3>'
			};
			var aboutState={//创建第二个状态
				name:'about',
				url:'/about',
				template:'<h3>Its the UI-Router hello world app!<h3>'
			}
			$stateProvider.state(helloState);///在配置模块中，使用$stateProvider注册两个状态
			$stateProvider.state(aboutState);
		});