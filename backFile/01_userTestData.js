/*
* @Author: hewang2
* @Date:   2017-05-18 17:42:06
* @Last Modified by:   hewang2
* @Last Modified time: 2017-05-19 11:14:53
*/

'use strict';
			$scope.users = [{
					account: "aaaa@cisco.com",
					username: "Emma",
					privilege: "admin",
					status: "active",
					last_login_time: "Mar26 16:40",
					log: "add"
				},
				{
					account: "bbbb@cisco.com",
					username: "Wanghe",
					privilege: "monitor",
					status: "disabled",
					last_login_time: "Mar26 16:40",
					log: "edit"
				},
				{
					account: "cccc@cisco.com",
					username: "Xutao",
					privilege: "configure",
					status: "active",
					last_login_time: "Mar26 16:40",
					log: "delete"
				},
				{
					account: "dddd@cisco.com",
					username: "Lucy",
					privilege: "monitor configure",
					status: "disabled",
					last_login_time: "Mar26 16:40",
					log: "reset password"
				}
			];
			$scope.len = $scope.users.length;


			$scope.emptyAddOneUser={ //this step needed
				"username": "",
				"status": "actived",
				"account": "",
				"role": "",
				"privilege": "",
				"organization": ""
			}
			angular.copy($scope.emptyAddOneUser,$scope.addOneUser);