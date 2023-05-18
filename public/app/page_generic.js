var GenericPage = (function(context, $) {
    'use strict';
   
    let obj = {
        Elements: {}, 
        Options: {}, 
        Templates: {}, 
        FlagPreLoader: true,
        Data:{},
        init: function () {
             
            
 

            let self=obj;
            let deferred = $.Deferred();
            
            self.cache();
            self.bindEvents(); 
            self.initTemplates();

            self.initPage().done(function(){
 
                deferred.resolve();

            });
 
            return deferred.promise();
            
        },



        cache: function () {

           this.Elements.body = $('body');
           this.Elements.preloader = $('#preload'); 
        },

        bindEvents: function () { 
            // //mobile view
            //  this.Elements.body.on('click', '[data-target="#bs-canvas-left"][aria-expanded="false"]', $.proxy(this.eventToggleBtnMenuMobile));
            //  this.Elements.body.on('click', '.bs-canvas-close, .bs-canvas-overlay', $.proxy(this.eventClickOutsideMenu)); 
            // $(window).on('activate.bs.scrollspy', function (e,obj) {
            //     console.log(e.relatedTarget);
            //     var navPosition = $('#myNavbar').scrollLeft();
            //     let result = e.relatedTarget.replace("#", ".nav-item.");
            //     var elemPosition = $(result).offset().left;
    
            //     // Add the two together to get your scroll distance and animate    
            //     $("#myNavbar ul").animate({scrollLeft: navPosition + elemPosition}, 800);
                
            // });
             

        },
 
        initTemplates: function () { 
        },
       
        initPage: function () {


            let deferred = $.Deferred();
            let self5=obj;

            this.Options.MaxSecondsPreLoader = 15; //indica o tempo maximo que o preload fica ativo
 

            deferred.resolve();
              
             return deferred.promise();
          
        },
 
   
         

    }; 
   
    return { 
      Init: obj.init 
    };

   
  }(this,jQuery));
 