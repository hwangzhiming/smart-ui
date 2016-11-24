"use strict";

;(function ($, window) {
    window.sui = window.sui || {};
    window.sui.modal = function (options) {

        var def = $.extend({
            theme: 'smart-ui-modal-default',
            type: 'info',
            title: 'Title',
            message: 'Thanks for try SmartUI!'
        }, options);
        var deferred = jQuery.Deferred();
        var modal = $('<div class="smart-ui smart-ui-modal ' + def.theme + '"/>');
        var modalContent = $('<div class="smart-ui smart-ui-modal-content"/>');
        var modalClosebtn = $('<div class="smart-ui smart-ui-modal-close"/>');
        var title = $('<div class="smart-ui-modal-title">' + def.title + '</div>');
        var message = $('<div class="smart-ui-modal-message"></div>');
        message.append(def.message);
        modalContent.append([modalClosebtn, title, message]);
        modal.append(modalContent).appendTo($('body'));
    };
})(jQuery, window);