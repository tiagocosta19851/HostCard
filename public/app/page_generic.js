var GenericPage = (function(context, $) {
    'use strict';
   
    let obj = {
        Elements: {}, 
        Options: {}, 
        Templates: {}, 
        FlagPreLoader: true,
        Data:{},
        init: function () {
             
            

            // Get position of the nav bar and the position of the link with the matching ID
            var navPosition = $('#myNavbar').scrollLeft(),
            elemPosition = $('.nav-item.act-suavemente').offset().left;

            // Add the two together to get your scroll distance and animate    
            $("#myNavbar").animate({scrollLeft: navPosition + elemPosition}, 800);


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

        //mostrar o preload
        showPreLoader: function () { 
            let self5 = obj;  

            self5.Elements.preloader.show();
            self5.FlagPreLoader = true;


            let time = self5.Options.MaxSecondsPreLoader * 10000;

            setTimeout(
              function () {

                  self5.hidePreLoader();


              }, time);



        },

        //esconder o preload
        hidePreLoader: function () { 
            let self5 = obj;
            if (self5.FlagPreLoader == true) { 
                self5.Elements.preloader.fadeOut("slow");
                self5.FlagPreLoader = false; 
            } 
        },

        eventClickOutsideMenu: function(ev){

            let bsMain = $('.bs-offset-main');
            let bsOverlay = $('.bs-canvas-overlay');

            let canvas, aria;
            if ($(this).hasClass('bs-canvas-close')) {
    
                $('.dropdown').show();
    
    
                canvas = $(this).closest('.bs-canvas');
                aria = $(this).add($('[data-toggle="canvas"][data-target="#' + canvas.attr('id') + '"]'));
                if (bsMain.length)
                    bsMain.css(($(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left'), '');
            } else {
    
              $('.dropdown').show();
                canvas = $('.bs-canvas');
                aria = $('.bs-canvas-close, [data-toggle="canvas"]');
                if (bsMain.length)
                    bsMain.css({
                        'margin-left': '',
                        'margin-right': ''
                    });
            }
            canvas.css('width', '');
            aria.attr('aria-expanded', "false");
            if (bsOverlay.length)
                bsOverlay.removeClass('show');
            return false;  
        },
 
  
        //set menu active
        setMenuActive:function(nameClass){ 
            $('.list-group-item').removeClass('active');
            $('.'+nameClass).addClass('active'); 
        },
        
        
        isDesktopVisible:function(){

            return !$(".mobile-brand-logo").is(":visible");
 
         },
        
        openLeftMenuMobile:function(){

            $('[data-toggle="canvas"][data-target="#bs-canvas-left"][aria-expanded="false"]').trigger('click');

        },
        
        closeOpenMenuMobile:function(){

            $('.bs-canvas-close').trigger('click'); 

        },
         

    }; 
   
    return { 
      Init: obj.init 
    };

   
  }(this,jQuery));
 