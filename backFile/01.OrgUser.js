/*
* @Author: hewang2
* @Date:   2017-05-25 09:41:57
* @Last Modified by:   hewang2
* @Last Modified time: 2017-05-25 09:42:14
*/

'use strict';
(function() {
	angular.module("app")
		.factory('orgUserHttpFactory', function($http, userService) {
			return {
				//get All users
				getAllUsers: function() {
					return $http({
						method: 'GET',
						url: 'http://10.75.221.125/api/v1/users/',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': userService.token
						}
					}).then(function successCallback(response) {
						return response.data;
					}, function errorCallback(response) {
						//alert("error");
					});
				},
				postOneUser: function(curData) {
					return $http({
						method: 'POST',
						data: curData,
						url: 'http://10.75.221.125/api/v1/users/',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': userService.token
						}
					}).then(function successCallback(response) {
						return 'successPostUser';
					}, function errorCallback(response) {
						console.log("error");
					});
				},
				//edit one user
				putOneUser: function(userAccount, putData) {
					return $http({
						method: 'PUT',
						data: putData,
						url: 'http://10.75.221.125/api/v1/users/' + userAccount,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': userService.token
						}
					}).then(function successCallback(response) {
						return "putSuccessUser";
					}, function errorCallback(response) {
						console.log("error");
						console.log(response.data);
						alert("updata error");
					});

				},
				//delete one user
				deleteOneUser: function(userAccount) {
					$http({
						method: 'DELETE',
						url: 'http://10.75.221.125/api/v1/users/' + userAccount,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': userService.token
						}
					}).then(function successCallback(response) {
						console.log("succeess delete");
						console.log(response);
					}, function errorCallback(response) {
						console.log("error");
						console.log(response);
					});
				}
			}
		})
		.controller("orgUserCtrl", function($scope, $http, orgUserHttpFactory, userService) {
//			orgUserHttpFactory.getAllUsers().then(function(data) {
//				$scope.users = data;
//				$scope.len = $scope.users.length;
//			})
			$scope.users = [{
					account: "aaaa@cisco.com",
					"username": "Marie",
					privilege: "admin",
					status: "active",
					last_login_attempts:"2017-05-22T16:26:08.441000",
					last_login_time: "2017-06-22T16:26:08.441000",
					log: "add"
				},
				{
					account: "bbbb@cisco.com",
					"username": "Jack",
					privilege: "monitor",
					status: "disabled",
					last_login_attempts:"2017-06-22T16:26:08.441000",
					last_login_time: "2017-06-22T16:26:08.441000",
					log: "edit"
				},
				{
					account: "cccc@cisco.com",
					"username": "Haie",
					privilege: "configure",
					status: "active",
					last_login_attempts:"2017-05-12T16:26:08.441000",
					last_login_time: "2017-06-22T16:26:08.441000",
					log: "delete"
				},
				{
					account: "dddd@cisco.com",
					"username": "Lucy",
					privilege: "monitor configure",
					status: "disabled",
					last_login_attempts:"2017-04-22T16:26:08.441000",
					last_login_time: "2017-06-22T16:26:08.441000",
					log: "reset password"
				},
				{
					account: "dddd@cisco.com",
					"username": "Dell",
					privilege: "monitor configure",
					status: "disabled",
					last_login_attempts:"2017-04-22T16:26:08.441000",
					last_login_time: "2017-06-22T16:26:08.441000",
					log: "reset password"
				},
				{
					account: "dddd@cisco.com",
					"username": "Super HH C ",
					privilege: "monitor configure",
					status: "disabled",
					last_login_attempts:"2017-04-22T16:26:08.441000",
					last_login_time: "2017-06-22T16:26:08.441000",
					log: "reset password"
				},
				{
					account: "dddd@cisco.com",
					"username": "Dilll",
					privilege: "monitor configure",
					status: "disabled",
					last_login_attempts:"2017-04-22T16:26:08.441000",
					last_login_time: "2017-06-22T16:26:08.441000",
					log: "reset password"
				}
			];
			$scope.len = $scope.users.length;
			//add selected attribute
			angular.forEach($scope.users, function(value) {
				value.selected = false;
			});

			/*sort funtion*/
			$scope.propertyName = 'time';
			$scope.reverse = true;
			$scope.sortBy = function(propertyName) {
				$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
				$scope.propertyName = propertyName;
			};

			/*editDisable funciton*/
			$scope.editDisable = true; //control button able or disable 
			$scope.allVal = false;
			$scope.selectedCount = 0;
			$scope.currUser = new Object();
			$scope.addOneUser = new Object();
			//			$scope.addOneUser={ //this step needed
			//				"username": "",
			//				"status": "actived",
			//				"account": "",
			//				"role": "SYSADMIN",
			//				"privilege": "ADMIN",//now must
			//				"organization": ""
			//			}
			$scope.emptyAddOneUser = {
				"username": "",
				"status": "actived",
				"account": "",
				"role": "SYSADMIN",
				"privilege": "ADMIN",
				"organization": ""
			}
			angular.copy($scope.emptyAddOneUser, $scope.addOneUser);
			//Select all or not
			$scope.isAll = function(val) {
				if(val == true) {
					for(var i = 0; i < $scope.len; i++) {
						$scope.users[i].selected = true;
						console.log("success");
					}
					$scope.selectedCount = $scope.len;
					$scope.editDisable = true;

				} else {
					for(var i = 0; i < $scope.len; i++) {
						$scope.users[i].selected = false;
					}
					$scope.selectedCount = 0;
					$scope.editDisable = true;
				}
			}

			$scope.isChecked = function(val) {
				val ? $scope.selectedCount++ : $scope.selectedCount--;
				console.log($scope.selectedCount);
				if($scope.selectedCount == 0) {
					$scope.editDisable = true;
					$scope.allVal = false;
				}
				if($scope.selectedCount == 1) {
					$scope.editDisable = false;
					$scope.allVal = false;
					console.log($scope.editDisable);
				}
				if(1 < $scope.selectedCount && $scope.selectedCount < $scope.len) {
					$scope.editDisable = true;
					$scope.allVal = false;
				}
				if($scope.selectedCount == $scope.len) {
					$scope.editDisable = true;
					$scope.allVal = true;
				}
			}

			//editUser process
			$scope.editAdminSelected = false;
			$scope.editConfigSelected = false;
			$scope.editMonitorSelected = false;

			$scope.editModal = function() {
				if(!$scope.editDisable) {
					angular.forEach($scope.users, function(data) {
						if(data.selected == true) {
							angular.copy(data, $scope.currUser);
						}
					});
				}
				$('#editmodal-data').modal('show');
				$scope.editingUserAcc = $scope.currUser.account;
				if($scope.currUser.privilege == "ADMIN") {
					$scope.editAdminSelected = true;
				} else if($scope.currUser.privilege == "CONFIG") {
					$scope.editConfigSelected = true;
				} else if($scope.currUser.privilege == "MONITOR") {
					$scope.editMonitorSelected = true;
				} else {
					$scope.editAdminSelected = false;
					$scope.editConfigSelected = false;
					$scope.editMonitorSelected = false;
				}
				console.log($scope.editingUserAcc);
			}

			$scope.editUserSubmitted = false;

			$scope.isEditPriChecked = function() {
				if($scope.editAdminSelected) {
					$scope.currUser.privilege = "ADMIN";
				} else if($scope.editMonitorSelected && (!$scope.editConfigSelected)) {
					$scope.currUser.privilege = "MONITOR";
				} else if($scope.editConfigSelected && (!$scope.editMonitorSelected)) {
					$scope.currUser.privilege = "CONFIG";
				} else if($scope.editConfigSelected && $scope.editMonitorSelected) {
					$scope.currUser.privilege = " ";
				} else {
					$scope.currUser.privilege = "";
				}
				console.log($scope.currUser.privilege);
			}

			$scope.editUser = function() {
				$scope.editUserSubmitted = true;
				if($scope.editUserForm.$valid) {
//					delete $scope.currUser["selected"];
//					orgUserHttpFactory.putOneUser($scope.editingUserAcc, $scope.currUser).then(function(res) {
//						if(res == "putSuccessUser") {
//							angular.copy($scope.emptyAddOneUser, $scope.addOneUser);
//							$('#editmodal-data').modal('hide');
//							$scope.editUserSubmitted = true;
//							$scope.editAdminSelected = false;
//							$scope.editConfigSelected = false;
//							$scope.editMonitorSelected = false;
//							orgUserHttpFactory.getAllUsers().then(function(data) {
//								$scope.users = data;
//								angular.forEach($scope.users, function(value) {
//									value.selected = false;
//								});
//								$scope.len = $scope.users.length;
//								$scope.selectedCount = 0;
//								$scope.editDisable = true;
//							});
//						}
//					});
				}
			}

			$scope.editUserCancel = function() {
				//Not doing any database operations, refresh your browser
				$('#editmodal-data').modal('hide');
				$scope.editAdminSelected = false;
				$scope.editConfigSelected = false;
				$scope.editMonitorSelected = false;
				$scope.selectedCount = 1;
				//				$scope.editDisable = true;
			}

			$scope.editUserClose = function() {
				$scope.editAdminSelected = false;
				$scope.editConfigSelected = false;
				$scope.editMonitorSelected = false;
				$scope.selectedCount = 1;
				//				$scope.editDisable = true;
			}

			//addOrg process
			$scope.addOrgAccess="none";
			$scope.editOrgAccess="none";
			$scope.addUserSubmitted = false;
			$scope.addUser = function() {
				$scope.addUserSubmitted = true;
				if($scope.addUserForm.$valid) {
//					//update database
//					orgUserHttpFactory.postOneUser($scope.addOneUser).then(function(res) {
//						if(res == "successPostUser") {
//							angular.copy($scope.emptyAddOneUser, $scope.addOneUser);
//							$('#addmodal-data').modal('hide');
//							$scope.addUserSubmitted = false;
//							$scope.configSelected = false;
//							$scope.monitorSelected = false;
//							$scope.adminSelected = false;
//							orgUserHttpFactory.getAllUsers().then(function(data) {
//								$scope.users = data;
//								angular.forEach($scope.users, function(value) {
//									value.selected = false;
//								});
//								$scope.len = $scope.users.length;
//							});
//						}
//					});
				}
		} 

			$scope.addUserCancel = function() {
				//Not doing any database operations, refresh your browser
				$('#addmodal-data').modal('hide');
				$scope.addUserSubmitted = false;
				$scope.configSelected = false;
				$scope.monitorSelected = false;
				$scope.adminSelected = false;
				angular.copy($scope.emptyAddOneUser, $scope.addOneUser);
			}

			$scope.addUserClose = function() {
				$scope.addUserSubmitted = false;
				$scope.configSelected = false;
				$scope.monitorSelected = false;
				$scope.adminSelected = false;
				angular.copy($scope.emptyAddOneUser, $scope.addOneUser);
			}
			//selectPrivilege

			$scope.configSelected = false;
			$scope.monitorSelected = false;
			$scope.adminSelected = false;
			$scope.isPriChecked = function() {
				//				console.log($scope.adminSelected);
				if($scope.adminSelected) {
					$scope.addOneUser.privilege = "ADMIN";
				} else if($scope.monitorSelected && (!$scope.configSelected)) {
					$scope.addOneUser.privilege = "MONITOR";
				} else if($scope.configSelected && (!$scope.monitorSelected)) {
					$scope.addOneUser.privilege = "CONFIG";
				} else if($scope.configSelected && $scope.monitorSelected) {
					$scope.addOneUser.privilege = "MONITOR";
				} else {
					$scope.addOneUser.privilege = "";
				}
				console.log($scope.addOneUser.privilege);
			}
			
			$scope.sitePris=[];
			
			$scope.newSitePri={sitePriId:0,site:"Select a Site",privilege:"admin",ifShow:false};
			$scope.addOneSitePri=function(){
				$scope.newSitePri.sitePriId=$scope.sitePris.length+1;
				$scope.sitePris.push($scope.newSitePri);
				$scope.newSitePri={sitePriId:0,site:"Select a Site",privilege:"admin"};//this is must
			}
			

			
			$scope.orgSites=[
			{id:"1",name:"Shanghai"},
			{id:"2",name:"Beijing"},
			{id:"3",name:"Hangzhou"},
			{id:"4",name:"Suzhou"},
			{id:"3",name:"Songjing"},
			{id:"4",name:"Caohejing"}
			];
			
			$scope.selectSite=$scope.orgSites[1].name;
			
			$scope.isClicked = function(siteId,name) {
				angular.forEach($scope.orgSites, function(value) {
					if(value.name==name){
						$scope.siteTempName=value.name;
					}	
				});
				
				angular.forEach($scope.sitePris, function(value) {
					if(value.sitePriId==siteId){
						value.site=$scope.siteTempName;
						value.ifShow=false;
					}	
				});
			}
			
			$scope.isDeleteSitePri=function(key,){
				$scope.sitePris.splice(key,1);
				var initSiteId=0;
				angular.forEach($scope.sitePris,function(value){
					value.sitePriId=initSiteId+1;
					initSiteId++;
				});
				console.log($scope.sitePris);
			}
			
		})

})()