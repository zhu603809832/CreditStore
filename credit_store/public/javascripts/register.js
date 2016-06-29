var app = angular.module('RegisterApp', ['ngAnimate', 'ui.bootstrap']);
app.controller('RegisterCtrl', function($scope) {
    $scope.on_register = function(){
      alert("register request");
    };
    // $scope.register.mail = $scope.register.mail;
    // $scope.register.name = $scope.register.name;
    // $scope.register.password = $scope.register.password;
    // $scope.register.confirmpassword = $scope.register.confirmpassword;
});
