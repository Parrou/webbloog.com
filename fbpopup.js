/*
 * eZmodal
 * doc: http://markusslima.github.io/ezmodal/
 * github: https://github.com/markusslima/ezmodal
 *
 * Copyright (c) 2015 Markus Vinicius da Silva Lima
 * Version 0.1.0
 * Licensed under the MIT license.
 */
(function ($) {
    "use strict";
    
    $(window).on('keyup', function (event) {
        if (event.keyCode === 27) {
            var data = $('.fbpopup').data('fbpopup');
            if (data.options.closable) {
                $('.fbpopup').fbpopup('hide');
            }
        }
    });

    $(document).on('click', '.fbpopup', function () {
        var data = $(this).data('fbpopup');
        if (data.options.closable) {
            $(this).fbpopup('hide');
        }
    });

    $(document).on('click', '.fbpopup .fbpopup-container', function (event) {
        event.stopPropagation();
    });
    
    $(document).on('click', '[data-dismiss="fbpopup"]', function () {
        $(this).parent().parent().parent().fbpopup('hide');
    });

    $(document).on('click', '[fbpopup-target]', function () {
        $($(this).attr('fbpopup-target')).fbpopup('show');
    });

    var fbpopup = function (element, options) {
        this.options = options;
        this.$element = $(element);
    };

    fbpopup.prototype = {
        width: function () {

            
        },
        
        show: function () {
            this.$element.show();
            this.options.onShow();
        },
        
        hide: function () {
            this.$element.hide();
            this.options.onClose();
        },

        isVisible: function () {
            return this.$element.css('visibility') === 'visible' ? true : false;
        },
        
        constructor: function () {
            var _this = this,
                container = this.$element.find('.fbpopup-container');
                
            if (this.options.autoOpen) {
                this.show();
            }
            
            if (Number(this.options.width)) {
                container.css({
                    'width':  _this.options.width+'px'
                });
            } else {
                switch (_this.options.width) {
                    case 'small':
                        container.css({'width': '40%'});
                        break;
                    case 'medium':
                        container.css({'width': '75%'});
                        break;
                    case 'full':
                        container.css({'width': '95%'});
                        break;
                }
            }
        }
    };

    var old = $.fn.fbpopup;

    $.fn.fbpopup = function (option, value) {
        var get = '',
            element = this.each(function () {
                var $this = $(this),
                    data = $this.data('fbpopup'),
                    options = $.extend({}, $.fn.fbpopup.defaults, option, typeof option === 'object' && option);

                if (!data) {
                    $this.data('fbpopup', (data = new fbpopup(this, options)));
                    data.constructor();
                }

                if (typeof option === 'string') {
                    get = data[option](value);
                }
            });

        if (typeof get !== 'undefined') {
            return get;
        } else {
            return element;
        }
    };

    $.fn.fbpopup.defaults = {
        'width': 500,
        'closable': true,
        'autoOpen': false,
        'onShow': function () {},
        'onClose': function () {}
    };

    $.fn.fbpopup.noConflict = function () {
        $.fn.fbpopup = old;
        return this;
    };
})(window.jQuery);
