/**
 * @author Zikiy Vadim
 * @package jQuery Plugins
 * @name VZVShowMore
 * @copyright Copyright (C) 2017 All rights reserved.
 * @link http://online-services.org.ua/
 */

(function ($) {
    $.fn.vzv_show_more = function (options) {
        // console.log('options');
        // console.log(options);
        // console.log('this');
        // console.log(this);

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
            show_btn_class: 'vzv_sm_show',
            hide_btn_class: 'vzv_sm_hide',
            controls_class: 'vzv_sm_control',
            btn_class: 'vzv_sm_btn',
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
        }, options);

        $content_block.each(function(){
            var $content_item = $(this);
            //Скрываем контент
            $content_item.hide();
            //Обертка
            $content_item.wrap($('<div></div>').addClass(_settings.main_class));
            //Разметка управления
            $content_item.parent('.'+_settings.main_class).append(
                $('<div></div>').addClass(_settings.controls_class)
                    .css({
                        'text-align': default_settings.controls_align,
                    })
                    .append(
                        $('<'+default_settings.control_btn_tag+'>'+default_settings.show_btn_text+'</'+default_settings.control_btn_tag+'>')
                            .addClass( _settings.btn_class + ' ' + _settings.show_btn_class + ' ' + default_settings.control_btn_class)
                            .css({
                                cursor: 'pointer',
                            })
                    )
            );
        });

        // В случае множественного использованием скрипта на одной странице
        $('.'+_settings.btn_class).off('click');
        //Обработка клика по кнопкам
        $('.'+_settings.btn_class).on('click',function(){
            if($(this).hasClass(_settings.show_btn_class)){
                $(this).text(default_settings.hide_btn_text);
            }else{
                $(this).text(default_settings.show_btn_text);
            }
            $(this).parent('.'+_settings.controls_class)
                    .prev()
                    .slideToggle(default_settings.duration);
            $(this).toggleClass(_settings.show_btn_class +' '+ _settings.hide_btn_class);
        });

        // if(default_settings.auto === true){
        //     $('.'+default_settings.main_content_class).vzv_show_more({
        //         auto: false,//Предотвращаем зацикливание
        //     });
        // }

        return $content_block;

    };
})(jQuery);
