"use strict";
;(function ($) {
    $.fn.masterPassword = function (options) {
        let def =  $.extend({
            callback: null
        }, options);
        const init = function (elem, opt) {
            elem.hide();
            if (elem.data('inited')) {
                return;
            }
            let currentActive = 0;
            const passwordLength = parseInt(elem.attr('length') || '4');
            const autofocus = elem.attr('autofocus') ? true : false;
            const theme = elem.attr('theme') || 'smart-ui-master-password-theme-default';
            let commponent = $(`<div class="smart-ui smart-ui-master-password ${theme}"></div>`);
            let fields = [];
            const syncVal = () => {
                let rs = [];
                for (let i = 0; i < fields.length; i++) {
                    rs.push(fields[i].val());
                }
                const val = rs.join('');
                elem.val(val);

                if(val.length === passwordLength && opt.callback){
                    opt.callback(val);
                }
            };
            for(let i =0; i < passwordLength; i++){
                let field = $(`<input class="smart-ui-master-password-field" maxlength="1" data-id="${i}" type="${elem.attr('type')}"/>`);
                field.on('focus', (e)=>{
                    currentActive = $(e.currentTarget).data('id');
                });
                field.on('keyup',(event) => {
                    const keyCode = event.which || event.keyCode;
                    if( (keyCode>=48 && keyCode <=57) || (keyCode>=96 && keyCode <=105)){
                        // fields[currentActive].val(event.key);
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
            }
            elem.after(commponent);
            if(autofocus && fields.length){
                fields[0].focus();
            }
            elem.data('inited', true);
            return elem;
        };

        $(this).each(function (i, item) {
            init($(item), def);
        });
    }
})(jQuery);