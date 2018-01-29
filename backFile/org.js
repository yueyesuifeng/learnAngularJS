(function() {
	angular.module('app')
		.controller("organizationCtrl", function($scope, $rootScope, $http, userService, getIP, orgHttpFactory, orgUserHttpFactory) {
			$scope.openLoad();
			orgHttpFactory.getAllOrgs().then(function(data) {
				$scope.closeLoad();
				//				console.log(data)
				$scope.orgs = data;
			},function(error){
				$scope.closeLoad();
			});
			angular.forEach($scope.orgs, function(value) {
				value.selected = false;
			});
			/*sort funtion*/
			$scope.propertyName = 'create_time';
			$scope.reverse = true;
			$scope.sortBy = function(propertyName) {
				$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
				$scope.propertyName = propertyName;
			};

			/*editDisable funciton*/
			$scope.editDisable = true;
			$scope.addOneOrg ={};
			$scope.currOrg ={};
			$scope.emptyAddOneOrg = {
				"status": "active",
				"org_name": "",
				"contact_info": "",
				"notes": "",
				"organization_domain": "",
				"email": "",
				"description": ""
			}
			angular.copy($scope.emptyAddOneOrg, $scope.addOneOrg); //clear $scope.addOrgOne
			$scope.selected = false;

			$scope.getIndex = function(id) {
				var thisData = null;
				angular.forEach($scope.orgs, function(data) {
					if(data.org_id == id) {
						thisData = data;
					}
				})
				return thisData;
			}

			$scope.isSelected = function(id) {
				console.log(id)
				$scope.editDisable = false;
				var data = $scope.getIndex(id);
				angular.copy(data,$scope.currOrg);
				$scope.editOrgtName = $scope.currOrg.org_name;
				console.log($scope.currOrg)
				$scope.editOrgId = $scope.currOrg.org_id;
			}

			//editOrg process
			$scope.editOrgSubmitted = false;

			$scope.editPhone = function() {
				console.log("editPhonehahha");
			}

			$scope.editOrgModal = function() {
				var tempEditPho=$scope.currOrg.contact_info;
				editPhoInput.intlTelInput("setNumber",tempEditPho);
				$scope.currOrg.contact_info=tempEditPho;
				var countryData = editPhoInput.intlTelInput("getSelectedCountryData");
				var acquirePho=tempEditPho.substring(countryData.dialCode.length+1,tempEditPho.length)
				editPhoInput.val(acquirePho);
				$('#editmodal-data').modal('show');			
			}
			
			$scope.editPhoValid=true;
			$scope.editOrgSaveDisable=false;
			$scope.editOrg = function() {
				
				$scope.editOrgSubmitted = true;
				
				if(!$scope.editPhoValid) {
							$scope.ifShowEditPhoValid = true;
					} else {
							$scope.ifShowEditPhoValid = false;
					}
				if($scope.editOrgInfoForm.$valid&&$scope.editPhoValid) {
					$('#editmodal-data').modal('hide');
					$scope.openLoad();
					$scope.editOrgSaveDisable=true;
					orgHttpFactory.putOneOrg($scope.editOrgId, $scope.currOrg).then(function(res) {
						orgHttpFactory.getAllOrgs().then(function(data) {
							$scope.orgs = data;
							$scope.closeLoad();
						},function(erro){
							$scope.closeLoad();
						});
						$scope.editDisable = true;
						$scope.editOrgSubmitted = false;
						$scope.editPhoValid=true;
						ifShowEditPhoValid=false;
						$scope.editOrgSaveDisable=false;
					},function(){
						$scope.closeLoad();
						$scope.editDisable = true;
						$scope.editOrgSubmitted = false;
						$scope.editPhoValid=true;
						ifShowEditPhoValid=false;
						$scope.editOrgSaveDisable=false;
					});
				}
			}

			$scope.editOrgCancel = function() {
				//Not doing any database operations, refresh your browser
				$scope.editDisable = true;
				$('#editmodal-data').modal('hide');
				orgHttpFactory.getAllOrgs().then(function(data) {
					$scope.orgs = data;
					angular.forEach($scope.orgs, function(value) {
						value.selected = false;
					});
				});
			}

			$scope.closeEditOrgModal = function() {
				$scope.editDisable = true;
				orgHttpFactory.getAllOrgs().then(function(data) {
					$scope.orgs = data;
					angular.forEach($scope.orgs, function(value) {
						value.selected = false;
					});
				});
			}

			//addOrg process
			$scope.addOrgSubmitted = false;
			$scope.addFistUserSubmitted = false;
			$scope.selctCretFistUser=false;
			$scope.ifShowAddPhoValid = false;
			$scope.ifShowEditPhoValid = false;
			$scope.addOrg = function() {
				$scope.addOrgSubmitted = true;
				if(!$scope.addPhoValid) {
					$scope.ifShowAddPhoValid = true;
				}
				if($scope.addOrgInfoForm.$valid && $scope.addPhoValid) {
					$('#addmodal-data').modal('hide');
					$scope.openLoad(); 
					$scope.addOrgSaveEable=true;
					$scope.ifShowAddPhoValid = false;
					orgHttpFactory.postOneOrg($scope.addOneOrg).then(function(res) {
						angular.copy($scope.emptyAddOneOrg, $scope.addOneOrg); //clear $scope.addOrgOne
						orgHttpFactory.getAllOrgs().then(function(data) {
							$scope.orgs = data;
							$scope.closeLoad(); 
						},function(){
							$scope.closeLoad(); 
						});
						addPhoInput.intlTelInput("setNumber", "");
						$scope.addOrgSaveEable=false;
					},function(){
						$scope.closeLoad(); 
						addPhoInput.intlTelInput("setNumber", "");
						$scope.addOrgSaveEable=false;
					});
					setTimeout(function() {
						$scope.getNewOrg();
					}, 200);
					$scope.addOrgSubmitted = false;
				}
			}

			$scope.addOrgCancel = function() {
				//Not doing any database operations, refresh your browser
				$('#addmodal-data').modal('hide');
				angular.copy($scope.emptyAddOneOrg, $scope.addOneOrg); //clear $scope.addOrgOne
				addPhoInput.intlTelInput("setNumber", "");
				angular.copy($scope.emptyFistUser, $scope.addFistUser);
				$scope.addOrgSubmitted = false;
				$scope.addFistUserSubmitted = false;
				$scope.selctCretFistUser=false;
				$scope.ifShowAddPhoValid = false;
			}

			$scope.closeAddOrgModal = function() {
				angular.copy($scope.emptyAddOneOrg, $scope.addOneOrg); //clear $scope.addOrgOne
				addPhoInput.intlTelInput("setNumber", "");
				$scope.addOrgSubmitted = false;
				$scope.ifShowAddPhoValid = false;
			}

			//select create the first user
			$scope.selctCretFistUser = false;
			$scope.isCretFistUser = function() {
				if($scope.selctCretFistUser) {
					$("#createFistUser").collapse('show');
				} else {
					$("#createFistUser").collapse('hide');
				}
			}
			$scope.addFistUser=new Object();
			$scope.emptyFistUser = {
				"username": "",
				"status": "actived",
				"account": "",
				"organization_access": "ORGADMIN",
				"site_privilege": [{
					"privilege": "ADMIN",
					"site_id": "string"
				}],
				"role": "ORGUSER",
				"privilege": "ADMIN"
			}
			$scope.addOrgSaveEable=false;
			angular.copy($scope.emptyFistUser, $scope.addFistUser);
			$scope.addOrgBefore=function(){
				$scope.selctCretFistUser=false;
				$("#createFistUser").collapse('hide');
			}
			$scope.addOrgAndFistUser = function() {
				$scope.addOrgSubmitted = true;
				$scope.addFistUserSubmitted = true;
				if(!$scope.addPhoValid) {
					$scope.ifShowAddPhoValid = true;
				}
				if($scope.addOrgInfoForm.$valid && $scope.addPhoValid && $scope.addFistUserForm.$valid) {
					$scope.addOrgSaveEable=true;
					$scope.openLoad(); 
					orgHttpFactory.postOneOrg($scope.addOneOrg).then(function(resOrg) {
						$('#addmodal-data').modal('hide');
						$http({
							method: 'POST',
							data: $scope.addFistUser,
							url: '//'+getIP+'/api/v1/' + resOrg.org_id + '/users',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': userService.token
							}
						}).then(function successCallback(response) {
							angular.copy($scope.emptyFistUser, $scope.addFistUser);
							$scope.closeLoad(); 
						}, function eoorCallback(err) {
							overdueToken(err);
							$scope.closeLoad();
						});
						orgHttpFactory.getAllOrgs().then(function(data) {
							$scope.orgs = data;
							$scope.addOrgSubmitted = false;
							$scope.addFistUserSubmitted = false;
							$scope.selctCretFistUser=false;
							$scope.ifShowAddPhoValid = false;
						});
						angular.copy($scope.emptyAddOneOrg, $scope.addOneOrg); //clear $scope.addOrgOne
						addPhoInput.intlTelInput("setNumber", "");
						$scope.addOrgSaveEable=false;
					},function(){
						    $scope.addOrgSubmitted = false;
							$scope.addFistUserSubmitted = false;
							$scope.selctCretFistUser=false;
							$scope.ifShowAddPhoValid = false;
						$scope.addOrgSaveEable=false;
						$scope.closeLoad();
					});
					setTimeout(function() {
						$scope.getNewOrg();
					}, 200);
					$scope.addOrgSubmitted = false;
				}
			}

			//add and edit International Telephone Input
			var addPhoInput = $("#addPhone");

			addPhoInput.intlTelInput({
				//autoPlaceholder: "on",
				preferredCountries: ['us', 'gb', 'cn'],
				separateDialCode: true,
				utilsScript: "lib/intTell/utils.js"
			});

			//add phoneNumber for orgnazation
			$scope.addPhoValid =false;
			addPhoInput.on("keyup change", function() {
				var intlNumber = addPhoInput.intlTelInput("getNumber");
				var countryData = addPhoInput.intlTelInput("getSelectedCountryData");
				var addPhoneNum = '+' + countryData.dialCode + addPhoInput.val();
				var isValid = addPhoInput.intlTelInput("isValidNumber");
				console.log(addPhoneNum);
				console.log(isValid);
				if(intlNumber == "+" + countryData.dialCode) {
					$scope.addOneOrg.contact_info = ""
					$scope.addPhoValid = true;
				} else {
					$scope.addOneOrg.contact_info = addPhoneNum;
					$scope.addPhoValid = isValid;
				}
				if($scope.addOrgSubmitted) {
					if(!$scope.addPhoValid) {
						$scope.$apply(function() {
							$scope.ifShowAddPhoValid = true;
						});
					} else {
						$scope.$apply(function() {
							$scope.ifShowAddPhoValid = false;
						});
					}
				}

			});

			addPhoInput.on("countrychange", function(e, countryData) { //listen CountryData change
				var intlNumber = addPhoInput.intlTelInput("getNumber");
				var countryData = addPhoInput.intlTelInput("getSelectedCountryData");
				var addPhoneNum = '+' + countryData.dialCode + addPhoInput.val();
				$scope.addOneOrg.contact_info = addPhoneNum;
			});

			//edit phoneNumber
//			$scope.editPhoValid=true;
			var editPhoInput = $("#editPhone");
			editPhoInput.intlTelInput({
				//autoPlaceholder: "on",
				preferredCountries: ['us', 'gb', 'cn'],
				separateDialCode: true,
				utilsScript: "lib/intTell/utils.js"
			});
			editPhoInput.on("keyup change", function() {
				var intlNumber = editPhoInput.intlTelInput("getNumber");
				var countryData = editPhoInput.intlTelInput("getSelectedCountryData");
				var editPhoneNum = '+' + countryData.dialCode + editPhoInput.val();
				var isValid = editPhoInput.intlTelInput("isValidNumber");
				if(intlNumber == "+" + countryData.dialCode) {
					$scope.currOrg.contact_info = ""
					$scope.editPhoValid = true;
				} else {
					$scope.currOrg.contact_info = editPhoneNum;
					$scope.editPhoValid = isValid;
				}
				
				if($scope.editOrgSubmitted){
					if(!$scope.editPhoValid) {
						$scope.$apply(function() {
							$scope.ifShowEditPhoValid = true;
						});
					} else {
						$scope.$apply(function() {
							$scope.ifShowEditPhoValid = false;
						});
					}
				}
				
				console.log($scope.ifShowEditPhoValid);
			});

			editPhoInput.on("countrychange", function(e, countryData) { //listen CountryData change
				var intlNumber = editPhoInput.intlTelInput("getNumber");
				var countryData = editPhoInput.intlTelInput("getSelectedCountryData");
				var editPhoneNum = '+' + countryData.dialCode + editPhoInput.val();
				var isValid = editPhoInput.intlTelInput("isValidNumber");
				$scope.currOrg.contact_info = editPhoneNum;
				if(intlNumber == "+" + countryData.dialCode) {
					$scope.currOrg.contact_info = ""
					$scope.editPhoValid = true;
				} else {
					$scope.currOrg.contact_info = editPhoneNum;
					$scope.editPhoValid = isValid;
				}
				
				if($scope.editOrgSubmitted){
					if(!$scope.editPhoValid) {
						$scope.$apply(function() {
							$scope.ifShowEditPhoValid = true;
						});
					} else {
						$scope.$apply(function() {
							$scope.ifShowEditPhoValid = false;
						});
					}
				}
				
			});

		})
})()