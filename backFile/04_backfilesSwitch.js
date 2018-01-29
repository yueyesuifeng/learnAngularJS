/**
 * *back files 2017/7/5
 * @return {[type]} [description]
 */
(function() {
	angular.module('app').controller('switchesController', ['$scope', '$http', '$state', '$filter', 'localStorageService', 'orgInvHttpFactory', 'siteHttpFactory', function($scope, $http, $state, $filter, localStorageService, orgInvHttpFactory, siteHttpFactory) {
		// default checked
		$scope.showConProgress=true;
		$scope.isStatus = true;
		$scope.isHostname = true;
		$scope.isDescription = false;
		$scope.isMacaddress = true;
		$scope.isModel = true;
		$scope.isConnectivity = true;
		$scope.isActiveports = true;
		$scope.isAlerts = true;
		$scope.isUptime = true;
		$scope.isTags = true;
		//default unchecked
		$scope.isSerialnumber = false;
		$scope.isPortnumber = false;
		$scope.isStacking = false;
		$scope.isiosfirmware = false;
		$scope.isLocation = false;
		$scope.isLocalipaddress = false;
		$scope.isPublicipaddress = false;
		$scope.isLocalipv6address = false;
		$scope.isBuilding = false;
		$scope.isFloor = false;
		$scope.isNotes = false;
		$scope.isLastcontacted = false;
		$scope.isUsage = false;
		$scope.isPoeconsumption = false;
		$scope.isClientsconnected = false;

		$scope.anothersite = {};
		$scope.curSelectAnothersite = {}; //move to anothersite site select item ,such as {"site_name":"site-1","description":"cisco-shanghai","org_id":"79833297","site_id":"887112","poc_info":{"phone":null,"user_name":null,"email":null},"create_time":"2017-06-02T13:50:42.874000"}
		//get site list
		siteHttpFactory.getAllSites(sessionStorage.selectedOrganizationID).then(function(res) {
			$scope.sites = res;
			$scope.anothersite = $scope.sites[0];
		});

		$scope.changeCol = function($event) {
			switch($event.target.id) {
				case "status":
					$scope.isStatus = $scope.isStatus ? false : true;
					break;
				case "hostname":
					$scope.isHostname = $scope.isHostname ? false : true;
					break;
				case "description":
					$scope.isDescription = $scope.isDescription ? false : true;
					break;
				case "macaddress":
					$scope.isMacaddress = $scope.isMacaddress ? false : true;
					break;
				case "model":
					$scope.isModel = $scope.isModel ? false : true;
					break;
				case "connectivity":
					$scope.isConnectivity = $scope.isConnectivity ? false : true;
					break;
				case "activeports":
					$scope.isActiveports = $scope.isActiveports ? false : true;
					break;
				case "alerts":
					$scope.isAlerts = $scope.isAlerts ? false : true;
					break;
				case "uptime":
					$scope.isUptime = $scope.isUptime ? false : true;
					break;
				case "tags":
					$scope.isTags = $scope.isTags ? false : true;
					break;

				case "serialnumber":
					$scope.isSerialnumber = $scope.isSerialnumber ? false : true;
					break;
				case "portnumber":
					$scope.isPortnumber = $scope.isPortnumber ? false : true;
					break;
				case "stacking":
					$scope.isStacking = $scope.isStacking ? false : true;
					break;
				case "iosfirmware":
					$scope.isiosfirmware = $scope.isiosfirmware ? false : true;
					break;
				case "location":
					$scope.isLocation = $scope.isLocation ? false : true;
					break;
				case "localipaddress":
					$scope.isLocalipaddress = $scope.isLocalipaddress ? false : true;
					break;
				case "publicipaddress":
					$scope.isPublicipaddress = $scope.isPublicipaddress ? false : true;
					break;
				case "localipv6address":
					$scope.isLocalipv6address = $scope.isLocalipv6address ? false : true;
					break;
				case "building":
					$scope.isBuilding = $scope.isBuilding ? false : true;
					break;
				case "floor":
					$scope.isFloor = $scope.isFloor ? false : true;
					break;
				case "notes":
					$scope.isNotes = $scope.isNotes ? false : true;
					break;
				case "lastcontacted":
					$scope.isLastcontacted = $scope.isLastcontacted ? false : true;
					break;
				case "usage":
					$scope.isUsage = $scope.isUsage ? false : true;
					break;
				case "poeconsumption":
					$scope.isPoeconsumption = $scope.isPoeconsumption ? false : true;
					break;
				case "clientsconnected":
					$scope.isClientsconnected = $scope.isClientsconnected ? false : true;
					break;

				default:
					break;
			}
		};
		$scope.toDetail = function(data, $event) {

			//console.log(id);
			$state.go('sw_detail', {
				ID: data
			});
			localStorageService.set("myData", data);

			//console.log(data);
			// sessionStorage.filtertags = $scope.search.tag_list;
			sessionStorage.filterhostname = $scope.search.basic.name;
			sessionStorage.filterdescription = $scope.filterdescription;
			sessionStorage.filterstatus = $scope.search.connected;

		};

		$scope.sw_text = "for the last day";
		$scope.timeList = ['for the last 2hours', 'for the last day', 'for the last week', 'for the last month'];

		$scope.selectedTime = function($event) {
			$scope.sw_text = $event.target.innerHTML;
			$scope.end_time = Date.now();
			$scope.endUTCSeconds = localToUTCSeconds($scope.end_time);
			console.log($scope.end_time)
			//			$scope.base_hour = new Date().getHours();
			//			$scope.base_day = new Date().getDate();
			if($scope.sw_text == 'for the last 2hours') {
				$scope.x = $scope.end_time - 2 * 60 * 60 * 1000;
				$scope.strat_time = new Date($scope.x);
				$scope.stratTimeUtc =covertLocalDateToUTCDate($scope.strat_time)
				console.log("153",utcToSeconds('2017-06-28T00:00:00'))
				console.log("154",$scope.stratTimeUtc);
				$scope.startUTCSeconds = localToUTCSeconds($scope.strat_time);
				console.log($scope.startUTCSeconds);
				console.log($scope.endUTCSeconds)
				console.log('for the last 2hours');
				$scope.refresh($scope.startUTCSeconds, $scope.endUTCSeconds,$scope.stratTimeUtc);
				//				console.log($scope.UTCSeconds);
			} else if($scope.sw_text == 'for the last day') {
				$scope.y = $scope.end_time - 24 * 60 * 60 * 1000;
				$scope.strat_time = new Date($scope.y);
				$scope.stratTimeUtc =covertLocalDateToUTCDate($scope.strat_time)
				console.log($scope.stratTimeUtc);
				$scope.startUTCSeconds = localToUTCSeconds($scope.strat_time);
				console.log($scope.startUTCSeconds);
				console.log($scope.endUTCSeconds);
				console.log('for the last day');
				$scope.refresh($scope.startUTCSeconds, $scope.endUTCSeconds,$scope.stratTimeUtc);
			} else if($scope.sw_text == 'for the last week') {
				$scope.z = $scope.end_time - 7 * 24 * 60 * 60 * 1000;
				$scope.strat_time = new Date($scope.z);
				$scope.stratTimeUtc =covertLocalDateToUTCDate($scope.strat_time)
				$scope.startUTCSeconds = localToUTCSeconds($scope.strat_time);
				console.log($scope.startUTCSeconds);
				console.log($scope.endUTCSeconds);
				console.log('for the last week');
				$scope.refresh($scope.startUTCSeconds, $scope.endUTCSeconds,$scope.stratTimeUtc);
			} else if($scope.sw_text == 'for the last month') {
				$scope.a = $scope.end_time - 30 * 24 * 60 * 60 * 1000;
				$scope.strat_time = new Date($scope.a);
				$scope.stratTimeUtc =covertLocalDateToUTCDate($scope.strat_time)
				$scope.startUTCSeconds = localToUTCSeconds($scope.strat_time);
				console.log($scope.startUTCSeconds);
				console.log($scope.endUTCSeconds);
				console.log('for the last month');
				$scope.refresh($scope.startUTCSeconds, $scope.endUTCSeconds,$scope.stratTimeUtc);
			}

		};

		/*sort function*/
		$scope.propertyName = 'stid';
		$scope.reverse = false;
		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};

		//another site
		//$scope.site=['Shanghai','Beijing','Nanjing'];
		//增加 行数属性
		$scope.types = {
			"baseinfo": {
				"hostname": "Hostname",
				"description": "Description",
				"macaddress": "MAC address",
				"model": "Model",
				"serialnumber": "Serial number",
				"activeports": "#Active ports",
				"uptime": "Up-time",
				"portnumber": "#Port number",
				"stacking": "Stacking",
				"iosfirmware": "iOS/Firmware",
				"location": "Location",
				"localipaddress": "Local IP address",
				"publicipaddress": "Public IP address",
				"localipv6address": "Local IPv6 address",
				"building": "Building",
				"floor": "Floor",
				"tags": "Tags",
				"notes": "Notes"
			},
			"status": {
				"status": "Status",
				"connectivity": "Connectivity",
				"alerts": "Alerts",
				"lastcontacted": "Last contacted"
			},
			"usage": {
				"usage": "Usage",
				"poeconsumption": "PoE consumption",
				"clientsconnected": "Clients connected"
			}
		};

		$scope.data = [];

		//refresh initialization
		$scope.refresh = function(state_time, end_time,stratTimeUtc) {
			$scope.data = [];
			$scope.search = {
				basic: {
					name: ''
				},
				connected: '',
				tag_list: undefined
			};

			$scope.search.tag_list = sessionStorage.filtertags ? sessionStorage.filtertags : undefined;
			$scope.search.basic.name = sessionStorage.filterhostname ? sessionStorage.filterhostname : '';
			$scope.filterdescription = sessionStorage.filterdescription ? sessionStorage.filterdescription : '';
			$scope.search.connected = sessionStorage.filterstatus ? sessionStorage.filterstatus : '';
			$scope.selectAll = undefined;
			$scope.count = 0;
			$scope.openLoad();

			/*
			 * fuction for getting the all devices
			 * */
			orgInvHttpFactory.getOrgSiteInvs(sessionStorage.selectedOrganizationID, sessionStorage.selectedSiteID).then(function(res) {
				console.log(sessionStorage.selectedOrganizationID, sessionStorage.selectedSiteID)
				//				$scope.closeLoad();
				$scope.allDevices = res;
				//				console.log(res)
				angular.forEach($scope.allDevices, function(value) {
					if(value.basic.device_type == 'SWITCH') {
						$scope.data.push(value);
						//get connectivity
						orgInvHttpFactory.getOneInvConnectivity(sessionStorage.selectedOrganizationID, value.platform.serial_number, value.platform.pid, state_time, end_time)
							.then(function(res) {
							    console.log('272',res);
							    console.log(state_time);
							    console.log(end_time);
								if(res.serial_number == value.platform.serial_number && res.pid == value.platform.pid) {
									value.connectivity = [];
									angular.copy(res.connections, value.connectivity)
								}
							}, function() {
								$scope.closeLoad();
							})

					}
				})

				console.log($scope.data);
				setTimeout(function() { //Wait for the get http request to end
					$scope.closeLoad();
					console.log(stratTimeUtc)
					//$scope.testStartTime = 1498608000;
					console.log('291',stratTimeUtc)
					$scope.testStartTime = $scope.startUTCSeconds;
					var totalTime = $scope.endUTCSeconds - $scope.testStartTime;
					angular.forEach($scope.data, function(value) {
						var emptyConEle = {};
//						console.log(value);
						if(value.connectivity.length > 0) {
							angular.copy(value.connectivity[0], emptyConEle);
							if(value.connectivity[0].link_status == "on") {
								emptyConEle.link_status = "off";
							} else if(value.connectivity[0].link_status == "off") {
								emptyConEle.link_status = "on";
							}
							emptyConEle.timestamp = stratTimeUtc;
							value.connectivity.unshift(emptyConEle);
							var conLen = value.connectivity.length;
							//						console.log(conLen);
							var sum = 0;
							for(var i = 0; i < conLen; i++) {
								//								console.log(value.connectivity[i])
								var currTimeSec = utcToSeconds(value.connectivity[i].timestamp);
								var nextTimeSec;
								if(i == conLen - 1) {
									nextTimeSec = $scope.endUTCSeconds;
								} else {
									nextTimeSec = utcToSeconds(value.connectivity[i + 1].timestamp);
								}

								$scope.$apply(function() {
									if(i == conLen - 1) {
										value.connectivity[i].percent = 100 - sum;
//										console.log('320',value.connectivity[i].percent);
										sum = sum + value.connectivity[i].percent;
										if(value.connectivity[i].link_status == "on") {
											value.connectivity[i].description = "Connected from " + formatDate(covertUTCDateToLoalDate(new Date(value.connectivity[i].timestamp))) + " to " + $filter('date')($scope.end_time, 'medium');
										} else {
											value.connectivity[i].description = "Offline from " + formatDate(covertUTCDateToLoalDate(new Date(value.connectivity[i].timestamp))) + " to " + $filter('date')($scope.end_time, 'medium');
										}
									} else {
										value.connectivity[i].percent = 100 * (nextTimeSec - currTimeSec) / totalTime;
//										console.log('329',value.connectivity[i].percent);
										if(value.connectivity[i].percent < 0.84) { //0.84
											value.connectivity[i].percent = 0.84; //0.84
										}
										sum = sum + value.connectivity[i].percent;
										if(value.connectivity[i].link_status == "on") {
											value.connectivity[i].description = "Connected from " + formatDate(covertUTCDateToLoalDate(new Date(value.connectivity[i].timestamp))) + " to " + formatDate(covertUTCDateToLoalDate(new Date(value.connectivity[i].timestamp)));
										} else {
											value.connectivity[i].description = "Offline from " + formatDate(covertUTCDateToLoalDate(new Date(value.connectivity[i].timestamp))) + " to " + formatDate(covertUTCDateToLoalDate(new Date(value.connectivity[i].timestamp)));
										}
									}
								});
//								console.log('sum',sum)
//								
							}
							
						}
//						console.log(sum);
					});
				}, 1000);
			}, function(err) {
				$scope.closeLoad();
			})

		};
		$scope.end_time = Date.now();

		$scope.endUTCSeconds = localToUTCSeconds($scope.end_time);
		$scope.z = $scope.end_time - 24 * 60 * 60 * 1000;
		$scope.start_time = new Date($scope.z);
		console.log($scope.start_time);
		$scope.startUTCSeconds = localToUTCSeconds($scope.start_time);
		console.log("start" + $scope.startUTCSeconds);
		console.log("end" + $scope.endUTCSeconds);
		setTimeout(function() {
			$scope.refresh($scope.startUTCSeconds, $scope.endUTCSeconds);
		}, 400);
		/*tagSearchChange*/
		$scope.tagSearchChange = function() {
			if($scope.search.tag_list == '')
				$scope.search.tag_list = undefined;
		};
		$scope.cleanfilter = function() {
			$scope.search.tag_list = undefined;
			$scope.search.basic.name = '';
			$scope.filterdescription = '';
			$scope.search.connected = '';

			// sessionStorage.filtertags = $scope.search.tag_list;
			sessionStorage.filterhostname = $scope.search.basic.name;
			sessionStorage.filterdescription = $scope.filterdescription;
			sessionStorage.filterstatus = $scope.search.connected;

			$scope.selectAll = undefined;

		};
		$scope.count = 0; //已选择数量
		$scope.selectData = []; //checked已选对象
		$scope.isSelected = function(p, $event) {
			$scope.count += p.checked ? 1 : -1;
			$scope.selectAll = $scope.count === $scope.pdata.length;

			$scope.selectData = [];
			angular.forEach($scope.pdata, function(item) {
				if(item.checked) {
					$scope.selectData[$scope.selectData.length] = item;
				}
			});
			//console.log($scope.selectData);
			//console.log($scope.count);
			$event.stopPropagation(); //防止冒泡
		};

		$scope.pdata = [];
		//全选,取消全选
		$scope.changeAll = function() {
			angular.forEach($scope.pdata, function(item) {
				item.checked = $scope.selectAll;
			});
			$scope.count = $scope.selectAll ? $scope.pdata.length : 0;
			if($scope.selectAll) {
				$scope.selectData = $scope.pdata;
			} else {
				$scope.selectData = [];
			}
			//console.log($scope.selectData);
		};
		//防止冒泡
		$scope.stopro = function($event) {
			//console.log($event);
			$scope.search.tag_list = $event.target.innerHTML;
			$event.stopPropagation();
		};

		//unclaim
		$scope.unclaim = function() {
			$("#unclaimModal").modal('show');

		};
		$scope.unclaimCancel = function() {
			$("#unclaimModal").modal('hide');
		};
		$scope.unclaimConfirm = function() {
			//now only unclaim one
			var putData = $scope.selectData[0];
			putData.org_id = "00000000";
			putData.site_id = "";
			orgInvHttpFactory.putOneInv(sessionStorage.selectedOrganizationID, putData, putData.platform.pid, putData.platform.serial_number).then(function(res) {
				//console.log(res);
				$("#unclaimModal").modal('hide');
				$scope.count--;
				$scope.selectAll = $scope.count;
				$scope.refresh();
			}, function() {
				alert("unclaim failed")
			})
		};

		//綁定
		$scope.tagsin = [];
		$scope.tagsdelete = [];
		//add tags
		$scope.showAddTags = function() {
			$("#showAddTagsModal").modal('show');
			/*
			 * fuction for getting the autocompletetaglist
			 * */
			siteHttpFactory.getOneSite(sessionStorage.selectedOrganizationID, sessionStorage.selectedSiteID).then(function(res) {
				$scope.autoCompleteTagList = res.device_tag_list;
			}, function(erro) {

			});
		};

		$scope.loadTags = function() {
			return $scope.autoCompleteTagList;
		};

		$scope.addTags = function() {

			angular.forEach($scope.pdata, function(item) {

				var changetagsin = [];
				$scope.tagsin.forEach(function(val) {
					changetagsin.push(val.text);
				});

				if(item.checked) {
					//					console.log($scope.tagsin);
					item.tag_list = MergeArray(item.tag_list, changetagsin);
					//item.tags.push.apply(item.tags,changetagsin);
					//					console.log(item.tags);
				}

			});
			angular.forEach($scope.selectData, function(item) {

				var changetagsin = [];
				$scope.tagsin.forEach(function(val) {
					changetagsin.push(val.text);
				});

				item.tag_list = MergeArray(item.tag_list, changetagsin);

			});
			$scope.tagsin = [];
			$("#showAddTagsModal").modal('hide');
			for(var i in $scope.selectData) {
				console.log($scope.selectData);
				var putData = $scope.selectData[i];
				console.log(putData);
				orgInvHttpFactory.putOneInv(sessionStorage.selectedOrganizationID, putData, putData.platform.pid, putData.platform.serial_number).then(function(res) {

				}, function() {
					alert(" add tag failed")
				})
			}
		};

		$scope.removeTags = function() {
			angular.forEach($scope.pdata, function(item) {

				var changetagsin = [];
				$scope.tagsdelete.forEach(function(val) {
					changetagsin.push(val.text);
				});

				if(item.checked) {
					item.tag_list = SubArray(item.tag_list, changetagsin);

				}

			});
			angular.forEach($scope.selectData, function(item) {

				var changetagsin = [];
				$scope.tagsin.forEach(function(val) {
					changetagsin.push(val.text);
				});

				item.tag_list = MergeArray(item.tag_list, changetagsin);

			});

			$scope.tagsdelete = [];
			$("#showAddTagsModal").modal('hide');
			for(var i in $scope.selectData) {
				var putData = $scope.selectData[i];
				orgInvHttpFactory.putOneInv(sessionStorage.selectedOrganizationID, putData, putData.platform.pid, putData.platform.serial_number).then(function(res) {

				}, function() {
					alert(" delete tag failed")
				})
			}
		};

		//move to another site

		$scope.showMoveSite = function() {
			$("#showMoveSiteModal").modal('show');

		};
		$scope.selectAnothersiteChange = function(anothersite) {
			$scope.curSelectAnothersite = anothersite;
		};
		$scope.showMoveSiteCancel = function() {
			$("#showMoveSiteModal").modal('hide');
		};
		$scope.showMoveSiteMove = function() {
			var putData = $scope.selectData[0];
			$scope.curSelectAnothersite = $scope.anothersite;
			putData.site_id = $scope.curSelectAnothersite.site_id;
			orgInvHttpFactory.putOneInv(sessionStorage.selectedOrganizationID, putData, putData.platform.pid, putData.platform.serial_number).then(function(res) {
				//console.log(res);
				$scope.count--;
				$scope.selectAll = $scope.count;
				//$scope.curSelectAnothersite=$scope.siteList[0];
				$("#showMoveSiteModal").modal('hide');
				$scope.refresh();
			}, function() {
				alert("moved failed")
			})
		};

		//remove switch from site

		$scope.removeSite = function() {
			$("#removeSiteModal").modal('show');
		};
		$scope.removeSiteCancel = function() {
			$("#removeSiteModal").modal('hide');

		};
		$scope.removeSiteConfirm = function() {
			// var selectDataSimp=[];
			// for(var i in $scope.selectData){
			//         var obj=new Object();
			//         obj.lan_ip= $scope.selectData[i].lan_ip;
			//         obj.org_id= $scope.selectData[i].org_id;
			//         obj.notes= $scope.selectData[i].notes;
			//         obj.site_id= "";
			//         obj.platform= $scope.selectData[i].platform;
			//         obj.basic= $scope.selectData[i].basic;
			//         obj.tag_list= $scope.selectData[i].tag_list;
			//         selectDataSimp.push(obj);
			// }

			for(var i in $scope.selectData) {
				var putData = $scope.selectData[i];
				putData.site_id = "";
				orgInvHttpFactory.putOneInv(sessionStorage.selectedOrganizationID, putData, putData.platform.pid, putData.platform.serial_number).then(function(res) {
					//console.log(res);

					$scope.count--;
					$scope.selectAll = $scope.count;
					$scope.refresh();

				}, function() {
					alert("remove failed")
				})
			}

			$("#removeSiteModal").modal('hide');

		};
		/*
		 * function to cofigurebaseinfo
		 * selectdata
		 *
		 * */
		$scope.temp = [];
		$scope.configureBaseInfoOpen = function() {
			$("#BasicInfoModal").modal('show');
			console.log($scope.selectData);
			$scope.modalData = angular.copy($scope.selectData[0]);
			$scope.temp = angular.copy($scope.modalData);
			if($scope.modalData.lan_ip.ip_type == 'static')
				$scope.mark = false;
			else if($scope.modalData.lan_ip.ip_type == 'dhcp')
				$scope.mark = true;
		};
		$scope.editBasicInfo = function() {
			orgInvHttpFactory.putOneInv(sessionStorage.selectedOrganizationID, $scope.modalData, $scope.modalData.platform.pid, $scope.modalData.platform.serial_number)
				.then(function(res) {
					$("#BasicInfoModal").modal('hide');
					$scope.refresh();
				}, function(err) {
					alert("edit failed");
				})
		};
		$scope.cancelBaseInfo = function() {
			$("#BasicInfoModal").modal('hide');
			$scope.modalData = [];
			// $scope.modalData = $scope.selectData[0];
			// console.log($scope.modalData);
		};
		/*
		        $scope.deleteSwitchTag = function (num) {
		            $scope.modalData.tag_list.splice(num, 1);
		        };

		        $scope.isTag = true;
		        $scope.tagCtrl = function () {
		            $scope.isTag = !$scope.isTag;
		        };

		        $scope.addSwitchTag = function (newTag) {
		            var partten = /[A-Za-z0-9]/;
		            if (newTag != null && newTag.match(partten) && newTag != undefined) {
		                $scope.modalData.tag_list.push(newTag);
		            } else {
		                alert("The input value can't be empty and non-existent");
		            }
		            $scope.newTag = '';
		        };

		        $scope.addPortTag = function (newTag) {
		            var partten = /[A-Za-z0-9]/;
		            if (newTag != null && newTag.match(partten) && newTag != undefined) {
		                $scope.getPortModal.tag_list.push(newTag);
		            } else {
		                alert("The input value can't be empty and non-existent");
		            }
		            $scope.newTag = '';
		        };
		*/
		$scope.StIP = function() {
			$scope.mark = false;
			//angular.copy($scope.temp,$scope.modalData);
			$scope.modalData = angular.copy($scope.temp);
			console.log($scope.modalData)
		};

		$scope.DHCP = function() {
			$scope.mark = true;
			$scope.modalData = angular.copy($scope.temp);
			$scope.modalData.lan_ip.ip_type = 'dhcp';
			$scope.modalData.lan_ip.ip = '';
			$scope.modalData.lan_ip.mask = '';
			$scope.modalData.lan_ip.gateway = '';
			$scope.modalData.lan_ip.dns1 = '';
			$scope.modalData.lan_ip.dns2 = '';
			console.log($scope.modalData);
		};

		//合并并去重
		function MergeArray(arr1, arr2) {
			var _arr = new Array();
			for(var i = 0; i < arr1.length; i++) {
				if(arr1[i] != "") {
					_arr.push(arr1[i]);
				}
			}
			for(var i = 0; i < arr2.length; i++) {
				var flag = true;
				for(var j = 0; j < arr1.length; j++) {
					if(arr2[i] == arr1[j]) {
						flag = false;
						break;
					}
				}
				if(flag && arr2[i] != "") {
					_arr.push(arr2[i]);
				}
			}
			return _arr;
		}

		//数组相减
		function SubArray(arr1, arr2) {
			var arr3 = new Array();
			for(var i = 0; i < arr1.length; i++) {
				var flag = true;
				for(var j = 0; j < arr2.length; j++) {
					if(arr1[i] == arr2[j])
						flag = false;
				}
				if(flag)
					arr3.push(arr1[i]);
			}
			return arr3;
		}

	}])
})();