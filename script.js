var app=angular.module('mainapp',['ngRoute']);

app.config(function($routeProvider){
	
	$routeProvider.when('/profile',{
		templateUrl:'profile.html',
		controller: 'profileController'
	});
	$routeProvider.when('/home',{
		template: '<img src="https://s3.amazonaws.com/albanymedia/wp-content/uploads/sites/71/2016/09/underconstruction.jpg" width=100% height=100%>'
	});
	$routeProvider.when('/messages',{
		templateUrl:'messages.html',
		controller:'messagesController'
	});

	$routeProvider.when('/logout',{
		template: 'this is the logout page'
		//templateUrl: 'example2.html',
		//controller:'loginController'
	});
});

app.controller('loginController',['$scope','$rootScope','dataFactory', function($scope,$rootScope,dataFactory){
	$scope.navBar= false;
	$scope.loginFrm=true;
	$scope.login= function(){
		$rootScope.uname= $scope.username;
		var upwd= $scope.password;
		//var obj= $scope.users_data;
		angular.forEach(obj, function(value, key){
			if($rootScope.uname== obj[key].username && $scope.password==obj[key].password){
				$scope.navBar=true;
				$scope.loginFrm=false;
				$rootScope.id=key;
				$scope.newobj= obj[key];
				$rootScope.newobj=$scope.newobj;
				//console.log($scope.newobj);
				//$scope.obj_data=obj[key];
				//$rootScope.obj_data=$scope.obj_data;
					//$location.path('/home');
			} else{
				console.log('error');
			}
		});
	};
}]);

app.factory('dataFactory',function(){
	var retrievedData=localStorage.getItem("testJSON");
	obj=JSON.parse(retrievedData);
	return obj;
});

/*app.controller('logoutCntrl',['$scope','$rootScope','dataFactory', '$location', function($scope,$rootScope,dataFactory, $location){
	alert('hello');
	$location.path('/example2.html').replace();
}]);*/


app.controller('profileController',['$scope','$rootScope','dataFactory', function($scope,$rootScope,dataFactory){
	$scope.navBar=true;
	var id=$rootScope.id;
	//$scope.user_obj=$rootScope.obj_data;
	$scope.updateForm= function(){
		$scope.update= true;
		$scope.user_name=$scope.newobj.username;
		//$scope.user_name=$scope.user_obj.username;
		$scope.user_loc=$scope.newobj.location;
		$scope.user_phone=$scope.newobj.phone;
		$scope.user_mail=$scope.newobj.email;
	}
	$scope.saveData=function(){
		$scope.update=false;
		$scope.newobj.username=$scope.user_name;
		$scope.newobj.location=$scope.user_loc;
		$scope.newobj.phone=$scope.user_phone;
		$scope.newobj.email=$scope.user_mail;
		obj[id]=$scope.newobj;
		myJSON = JSON.stringify(obj);
  		localStorage.setItem("testJSON", myJSON);
	}
	$scope.noUpdate=function(){
		$scope.update= false;
	}
}]);

app.controller('messagesController',['$scope','$rootScope','dataFactory', function($scope,$rootScope,dataFactory){
	$scope.navBar=true;
	$scope.messageDetails=false;
	$scope.tableList=true;

	var id=$rootScope.id;
	//console.log(obj[id].message);
	//$scope.newobj=obj[id];
	$scope.obj_message = $scope.newobj.message;
	$scope.ComposeMsg= function(){
		if($scope.composeForm!=true){
			$scope.composeForm=true;
		} else{
			$scope.composeForm=false;
		}
		//$scope.tableInfo=false;
	}

	$scope.send= function(){
		$scope.composeForm=false;
		$scope.replyForm=false;
		var toName=$scope.receiver_name;
		//console.log(toName);
		//console.log($scope.receiver_name);
		//var sub= $scope.subject;
		//var messageBody=$scope.MsgBody;
		var message_data= {
			"from": $rootScope.uname,
			"mes": $scope.MsgBody,
			"sub": $scope.subject,
			"imp": 0
		}
		//console.log(message_data);
		//console.log(obj);
		angular.forEach(obj, function(value, key){
			if(obj[key].username==toName){
				//$scope.newobj= obj[key];
				obj[key].message.push(message_data);
				//$scope.newobj.message.push(message_data);
				myJSON = JSON.stringify(obj);
  				localStorage.setItem("testJSON", myJSON);
			} else {
				alert("wrong receiver name");
			}
		});
	}

	$scope.deleteMsg=function($index){
		//var msgDetails=$scope.newobj.message[$index].from;
		angular.forEach(obj, function(value,key){
			if(obj[key].username==$rootScope.uname){
				obj[key].message.splice($index,1);
				myJSON = JSON.stringify(obj);
  				localStorage.setItem("testJSON", myJSON);
			}
		});
		//$scope.composeForm=false;
	}

	$scope.ImpMsg=function($index){
		angular.forEach(obj, function(value,key){
			if(obj[key].username==$rootScope.uname){
				if(obj[key].message[$index].imp==0){
					obj[key].message[$index].imp=1;
					myJSON = JSON.stringify(obj);
  					localStorage.setItem("testJSON", myJSON);
				} else {
					obj[key].message[$index].imp=0;
					myJSON = JSON.stringify(obj);
  					localStorage.setItem("testJSON", myJSON);
				}
			}
		});
	}

	$scope.viewBtn=function($index){
		var msgDetails=$scope.newobj.message[$index];
		$scope.tableList=false;
		$scope.messageDetails=true;
		$scope.messageFrom=msgDetails.from;
		$scope.messageText=msgDetails.mes;
		$scope.messageSub=msgDetails.sub;
	}

	$scope.GoBack=function(){
		$scope.messageDetails=false;
		$scope.tableList=true;
	}

	$scope.MessageReply= function(){
		$scope.replyForm=true;
		$scope.receiver_name=$scope.messageFrom;
		$scope.subject=$scope.messageSub;
	}
}]);

/*
[{"username":"balaji","password":"balaji123","location":"atlanta","phone":"264799195","message":[{"from":"aadil","mes":"welcome to marlabs training center","sub":"introduction","imp":0}],"email":"balaji@ymail.com"},{"username":"aadil","password":"aadil123","location":"bangalore","phone":"2587412563","message":[{"from":"balaji","mes":"study well.Do good.","sub":"greetings","imp":0},{"from":"balaji","mes":"learn angularjs well. understand the concepts","sub":"angularjs","imp":0}],"email":"aadil@ymail.com"}]



<!--
//model is inside the app folder- user model is the main thing. it gives the model by default.
//controller.php is the parent controller class. 
//use of middleware- logic that is executed during incoming and outgoing request.

//public folder: accessed by the users, entry point to the application. 

in the layouts folder:
put the template that is common for all the files- give

<div class='container'>
@yield('content');
</div>

//in the common file in the layout folder.

// add the blade templating engine.
@extends('layouts.main');

@section('content');
// incude whatever you want to display in that content
@endsection

{{csrf_field()}} use for tokens.
ORM
-->
*/
