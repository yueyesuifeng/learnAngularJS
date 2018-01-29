/*
* @Author: hewang2
* @Date:   2017-05-18 15:02:11
* @Last Modified by:   hewang2
* @Last Modified time: 2017-05-18 15:03:02
*/

'use strict';
			//			delete
			//			$scope.DeleteOneOrgName = "testOrgs"
			//			$scope.testDelete = function() {
			//				$http({
			//					method: 'DELETE',
			//					url: 'http://10.75.221.125/api/v1/organization_list/' + $scope.DeleteOneOrgName,
			//					headers: {
			//						'Content-Type': 'application/json',
			//						'Authorization': userService.token
			//					}
			//				}).then(function successCallback(response) {
			//					console.log("succeess delete");
			//					console.log(response);
			//				}, function errorCallback(response) {
			//					console.log("error");
			//					console.log(response);
			//				});
			//			}

			//			$http.delete('http://10.75.221.125/api/v1/organization_list/cisco',{
			//			headers: {
			//					'Content-Type': 'application/json',
			//					'Authorization': userService.token
			//				}
			//			}).then(function successCallback(response) {
			//				console.log("succeess delete");
			//				console.log(response);
			//			}, function errorCallback(response) {
			//				console.log("error");
			//			});

			//post success
			//			$scope.postData = {
			//				"status": "active",
			//				"create_time": "2017-05-15T14:19:18.154447",
			//				"name": "testOrgName",
			//				"organization_domain": "string",
			//				"notes": "some notes",
			//				"contact_info": "string",
			//				"email": "abc@company1.com",
			//				"description": "a big company"
			//			}

			//			$http({
			//				method: 'POST',
			//				data:$scope.postData,
			//				url: 'http://10.75.221.125/api/v1/organization_list/',
			//				headers: {
			//					'Content-Type': 'application/json',
			//					'Authorization': userService.token
			//				}
			//			}).then(function successCallback(response) {
			//				console.log("succeess POST");
			//				console.log(response);
			//			}, function errorCallback(response) {
			//				console.log("error");
			//			});

			//			put success
			//						$scope.putData = {
			//							"status": "active",
			//							"create_time": "2017-05-15T14:19:18.154447",
			//							"name": "ciscoOrgName",
			//							"organization_domain": "string",
			//							"notes": "some notes",
			//							"contact_info": "string",
			//							"email": "abc@company1.com",
			//							"description": "a biger company"
			//						}
			//						
			//						$scope.putOrgName = "wangheOrgName";
			//						$scope.testPut = function() {
			//							console.log("putFun");
			//							$http({
			//								data: $scope.putData,
			//								method: 'PUT',
			//								url: 'http://10.75.221.125/api/v1/organization_list/' + $scope.putOrgName,
			//								headers: {
			//									'Content-Type': 'application/json',
			//									'Authorization': userService.token
			//								}
			//							}).then(function successCallback(response) {
			//								console.log(response.data);
			//							}, function errorCallback(response) {
			//								console.log("error");
			//								console.log(response.data);
			//								alert("updata error");
			//							});
			//						}