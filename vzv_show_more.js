/**
 * @author Zikiy Vadim
 * @package jQuery Plugins
 * @name VZVShowMore
 * @copyright Copyright (C) 2017 All rights reserved.
 * @link http://online-services.org.ua/
 */

(function ($) {
    $.fn.vzv_show_more = function (options) {
        //console.log('options');
        //console.log(options);
        //console.log('search_clock|this');
        //console.log(this);

        if( !(this instanceof $) || (!this.length) ){
            console.error('Error! Not find content element');
            return;
        }

        var $content_block = this;
        //Основные настройки для плагина (приватные)
        var _settings = {
            id: 'vzv_show_more',
            main_content_class: 'vzv_show_more_content',
            main_class: 'vzv_show_more',
            show_btn_class: 'vzv_sm_show_btn',
            hide_btn_class: 'vzv_sm_hide_btn',
            controls_class: 'vzv_sm_control',
        };

        //Настройки плагина по умолчанию, можно перекрыть
        var default_settings = $.extend({
            show_btn_text: 'Show',
            hide_btn_text: 'Hide',
            controls_align: 'left',
            control_btn_tag: 'span',
            control_btn_class: '',
            duration: 400,
            // auto: true,
        }, options, _settings);

        //Скрываем контент
        $content_block.hide();
        //Обертка
        $content_block.wrap($('<div></div>').addClass(default_settings.main_class));
        //Разметка управления
        $('.'+default_settings.main_class).append(
            $('<div></div>').addClass(default_settings.controls_class)
                .css({
                    'text-align': default_settings.controls_align,
                })
                .append(
                    $('<'+default_settings.control_btn_tag+'>'+default_settings.show_btn_text+'</'+default_settings.control_btn_tag+'>')
                        .addClass(default_settings.show_btn_class + ' ' + default_settings.control_btn_class)
                        .css({
                            cursor: 'pointer',
                        })
                )
        );

        //Обработка клика по кнопкам
        $('.'+default_settings.controls_class+' '+default_settings.control_btn_tag).on('click',function(){
            if($(this).hasClass(default_settings.show_btn_class)){
                $(this).text(default_settings.hide_btn_text);
            }else{
                $(this).text(default_settings.show_btn_text);
            }
            $content_block.slideToggle(default_settings.duration);
            $(this).toggleClass(default_settings.show_btn_class +' '+ default_settings.hide_btn_class);
        });

        // if(default_settings.auto === true){
        //     $('.'+default_settings.main_content_class).vzv_show_more({
        //         auto: false,//Предотвращаем зацикливание
        //     });
        // }

        return $content_block;
    };
})(jQuery);
