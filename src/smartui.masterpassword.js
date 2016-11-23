"use strict";
;(function ($) {
    $.fn.masterPassword = function (options) {

        const init = function (elem) {
            elem.hide();
            const passwordLength = parseInt(elem.attr('length') || '4');
            let commponent = $('<div class="smart-ui smart-ui-master-password"></div>');
            let fields = [];
            for(let i =0; i < passwordLength; i++){
                let field = $(`<input class="smart-ui-master-password-field" maxlength="1" data-id="${i}" type="text"/>`);
                field.on('focus', (e)=>{
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
    }
})(jQuery);