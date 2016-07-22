var app = angular.module('RegisterApp', ['ngAnimate', 'ui.bootstrap']);
app.controller('RegisterCtrl', function($scope, $http) {
    $scope.register = {};
    $scope.register_ret_tip = "";
    $scope.on_register = function() {
        var checkvalidate = $scope.on_check_not_validate();
        if (checkvalidate) {
            alert("两次输入密码不一致。");
            return false;
        };
        var promise = $http({
            method: 'POST',
            url: 'register',
            params: {},
            data: {
                mail: $scope.register.input_mail,
                name: $scope.register.input_name,
                password: $scope.register.input_password,
                confirmpassword: $scope.register.input_confirmpassword,
            },
        });

        promise.success(function(data, status, headers, config) {
            var code = data.code;
            var msg = data.msg;
            if (code == 1) {
                $scope.register_ret_tip = data.msg;
            }
        });

        promise.error(function(data, status, headers, config) {
            var code = data.code;
            if (code == 0) {
                $scope.register_ret_tip = data.msg;
                return
            }
        });
        return true;
    };
    $scope.on_check_not_validate = function() {
        if ($scope.register.input_password == null || $scope.register.input_confirmpassword == null) {
            return false;
        }

        if ($scope.register.input_password != $scope.register.input_confirmpassword) {
            return true;
        };
        return false;
    }
});
