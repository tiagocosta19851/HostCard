"use strict";
(function (context, $) {


    var obj = {
        Elements: {},
        Templates: {},
        Options: {},
        LstUrl: {},
        FlagPreLoader: true,
        
        init: function () {
            
            //inicialize cache
            if (!document.hasFocus()) {
                window.focus();
              
                if (navigator.vibrate) {
                    window.navigator.vibrate([500, 50, 500]);
                }
                else { alert('Não suporta vibração'); }

                alert('Você tem nova mensagem no chat...');
            }
            else { window.navigator.vibrate([500, 50, 500]); }
            var deferred = $.Deferred();
         

            this.cache();
            this.bindEvents();
            this.initTemplates();
            this.initVendors();

            this.initPage().done(function(){
 
                deferred.resolve();

            });
 
            return deferred.promise();
            
        },


        cache: function () {

           this.Elements.body = $('body');
           this.Elements.preloader = $('#preload');
 

        },

        bindEvents: function () {

        },

        initVendors: function () {

        },

        initTemplates: function () {

        },

        initPage: function () {


            var deferred = $.Deferred();
            var self5=obj;

            this.Options.MaxSecondsPreLoader = 15; //indica o tempo maximo que o preload fica ativo
            deferred.resolve();
             
            //this.hidePreLoader();
             return deferred.promise();
          
        },
 

    };


    context.App.PageGeneric = obj;

})(this, jQuery);




























