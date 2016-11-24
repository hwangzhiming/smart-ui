"use strict";
;(function ($, window) {
    window.sui = window.sui || {};
    window.sui.modal = function (options) {

        let def =  $.extend({
            theme: 'smart-ui-modal-default',
            type: 'info',
            title:'Title',
            message: 'Thanks for try SmartUI!'
        }, options);
        let deferred = jQuery.Deferred();
        let modal = $(`<div class="smart-ui smart-ui-modal ${def.theme}"/>`);
        let modalContent = $('<div class="smart-ui smart-ui-modal-content"/>');
        let modalClosebtn = $('<div class="smart-ui smart-ui-modal-close"/>');
        let title = $(`<div class="smart-ui-modal-title">${def.title}</div>`);
        let message = $(`<div class="smart-ui-modal-message"></div>`);
        message.append(def.message);
        modalContent.append([modalClosebtn, title, message]);
        modal.append(modalContent).appendTo($('body'));
    };

})(jQuery, window);