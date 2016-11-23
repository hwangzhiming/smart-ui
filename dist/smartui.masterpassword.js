"use strict";

;(function ($) {
    $.fn.masterPassword = function (options) {

        var init = function init(elem) {
            elem.hide();
            var passwordLength = parseInt(elem.attr('length') || '4');
            var commponent = $('<div class="smart-ui smart-ui-master-password"></div>');
            var fields = [];
            for (var i = 0; i < passwordLength; i++) {
                var field = $('<input class="smart-ui-master-password-field" maxlength="1" data-id="' + i + '" type="text"/>');
                field.on('focus', function (e) {
                    // currentActive = $(e.currentTarget).data('id');
                });
                fields.push(field);
                commponent.append(field);
            };
            elem.after(commponent);
        };

        $(this).each(function (i, item) {
            init($(item));
        });
    };
})(jQuery);