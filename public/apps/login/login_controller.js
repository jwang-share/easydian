can.Control('Apps.LoginCtrl', {
        pluginName: 'login'
    },
    {
        init: function(element) {
            var self = this;
            element.html(can.view('apps/login/ejs/login.ejs'));
            can.when(
            ).then(function(){                                  
            });            
        },
        "#login_form submit": function(ele, eve) {
            eve.preventDefault();
            formParams = ele.formParams();
            alert("Input: " + formParams);
        }
});