var myApp = angular.module('myApp', []);
myApp.controller('LoginController', LoginController);
LoginController.$inject = ['UserService', '$scope'];

function LoginController(UserService, $scope,$rootScope,$window,$filter,$q) {
    $scope.IsLogedIn= false;
    $scope.Submitted= false;
    $scope.IsFormValid=false;
    $scope.Message='';
    $scope.LoginData={
        Username:'',
        Password:''
    };

    $scope.$watch('form.$valid',function(newVal){
        $scope.IsFormValid=newVal;
    });

    $scope.Login=function(){
        $scope.Submitted=true;
        if($scope.IsFormValid){
            UserService.CheckLoginCredentials($scope.LoginData)
                .then(function (response) {
                    if (response.success) {
                        window.location="Home.html";
                    }
                    else{
                        $scope.Message="Invalid Credentials";
                    }
                });
        }
    };
}
angular
    .module('myApp')
    .factory('UserService',function($filter,$q,$window){
        var service = {};


        service.GetByUsername = GetByUsername;
        service.CreateUser = CreateUser;
        service.CheckLoginCredentials = CheckLoginCredentials;
        service.GetUserCredentials = GetUserCredentials;

        return service;
        function GetUserCredentials(LoginData){
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { Username: LoginData.Username },{ Password: LoginData.Password });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
        function CheckLoginCredentials(LoginData){
            var deferred = $q.defer();
            GetUserCredentials(LoginData)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        deferred.resolve({ success: true });
                    } else {
                        deferred.resolve({ success: false, message: 'Invalid Credentails '});
                    }
                });
            return deferred.promise;
        }
        function CreateUser(RegistrationData){
            var deferred = $q.defer();
            GetByUsername(RegistrationData.Username)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        deferred.resolve({ success: false, message: 'Username "' + RegistrationData.Username + '" is already taken' });
                    } else {
                        var users = getUsers();
                        users.push(RegistrationData);
                        setUsers(users);
                        deferred.resolve({ success: true });
                    }
                });
            return deferred.promise;
        };
        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { Username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        };
        function getUsers(){
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }
            return JSON.parse(localStorage.users);
        };
        function setUsers(users){
            localStorage.users = JSON.stringify(users);
        };
    });