"use strict";
;(function ($) {
    $.fn.masterPassword = function (options) {

        const init = function (elem) {
            elem.hide();
            if (elem.data('inited')) {
                return;
            }
            let currentActive = 0;
            const passwordLength = parseInt(elem.attr('length') || '4');
            const theme = elem.attr('theme') || 'smart-ui-master-password-theme-default';
            let commponent = $(`<div class="smart-ui smart-ui-master-password ${theme}"></div>`);
            let fields = [];
            const syncVal = () => {
                let rs = [];
                for (let i = 0; i < fields.length; i++) {
                    rs.push(fields[i].val());
                }
                elem.val(rs.join(''));
            };
            for(let i =0; i < passwordLength; i++){
                let field = $(`<input class="smart-ui-master-password-field" maxlength="1" data-id="${i}" type="${elem.attr('type')}"/>`);
                field.on('focus', (e)=>{
                    currentActive = $(e.currentTarget).data('id');
                });
                field.on('keyup',(event) => {
                    const keyCode = event.which || event.keyCode;
                    if( (keyCode>=48 && keyCode <=57) || (keyCode>=96 && keyCode <=105)){

                        fields[currentActive].val(event.key);
                        if (currentActive < passwordLength-1) {
                            fields[++currentActive].focus();
                        }
                        else{
                            fields[currentActive].blur();
                        }
                    }
                    else if( keyCode === 8 ){
                        let current = fields[currentActive];
                        if (current.val()) {
                            current.val('');
                        }
                        else if(currentActive > 0){
                            current = fields[--currentActive];
                            current.val('').focus();
                        }
                    }
                    else{
                        fields[currentActive].val('').focus();
                    }

                    syncVal();
                });
                fields.push(field);
                commponent.append(field);
            };
            elem.after(commponent);
            elem.data('inited', true);
        };

        $(this).each(function (i, item) {
           init($(item));
        });
    }
})(jQuery);