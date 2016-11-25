"use strict";
;(function ($, window) {
    window.sui = window.sui || {};
    window.sui.modal = function (options) {

        let def =  $.extend({
            theme: 'smart-ui-modal-default',
            type: 'info',
            title:'Title',
            message: 'Thanks for try SmartUI!',
            buttons: []
        }, options);
        let modal = $(`<div class="smart-ui smart-ui-modal ${def.theme}"/>`);
        let modalContent = $('<div class="smart-ui-modal-content"/>');
        let signDom = $(`<div class="smart-ui-modal-sign ${def.type}"><span></span></div>`);
        let modalClosebtn = $('<div class="smart-ui-modal-close">CLOSE</div>');
        let title = $(`<div class="smart-ui-modal-title">${def.title}</div>`);
        let placeholder = $(`<div class="smart-ui-modal-placeholder"></div>`);
        placeholder.append(def.message);
        if(def.buttons && def.buttons.length) {
            let buttons = $(`<div class="smart-ui-modal-buttons"></div>`);
            for(let i=0; i< def.buttons.length; i++){
                let btnConfig = def.buttons[i];
                let btn = $(`<button class="smart-ui-modal-button ${btnConfig.type}">${btnConfig.text}</button>`);
                if(btnConfig.func){
                    btn.on('click', ()=>{
                        return btnConfig.func.apply(null,[modal]);
                    });
                };

                buttons.append(btn);
            }
            placeholder.append(buttons);
        }

        modalContent.append([signDom, modalClosebtn, title, placeholder]);
        modal.append(modalContent).appendTo($('body'));
        modal.open = () => {
            modal.addClass('opened');
        };
        modal.close = () => {
            modal.removeClass('opened');
            setTimeout(()=>{
                modal.remove();
            }, 200);
        };
        modalClosebtn.on('click', modal.close);
        setTimeout(modal.open, 0);
        return modal;
    };

    window.sui.alert = function (options) {
        if (typeof options === 'string') {
            options = {message: options};
        };
        let dialog;
        let def =  $.extend({
            theme: 'smart-ui-modal-default',
            type: 'info',
            title:'Alert',
            message: 'This is alert!',
            button: { type:'default', text: 'OK'}
        }, options);

        def.button.func =() => {
            dialog.close();
        };
        let alertContent = $('<div></div>');
        let message = $(`<p>${def.message}</p>`);
        alertContent.append([message]);
        dialog = this.modal({
            type: def.type,
            title: def.title,
            theme: def.theme,
            message: alertContent,
            buttons: [def.button]
        });
    };

    window.sui.prompt = function (options) {
        let deferred = jQuery.Deferred();
        let dialog, input;
        let def =  $.extend({
            theme: 'smart-ui-modal-default',
            type: 'question',
            title: 'Prompt',
            message: 'This is Prompt!',
            fieldType: 'text',
            maxLength: null,
            required: true,
            pattern: null,
            button: { type:'warning', text: 'OK'}
        }, options);

        const validate = (val) => {
            const addCls = (b, cls)=>{
                if(b){
                    input.addClass(cls);
                }else{
                    input.removeClass(cls);
                };
                return b;
            };
            if(addCls(def.required && !val, 'sui-error sui-require')){
                return false;
            };

            if(def.pattern){
                let reg = new RegExp(def.pattern, 'ig');
                if(addCls(!reg.test(val), 'sui-error sui-pattern-error')){
                    return false;
                }
            };

            if(def.maxLength){
                if(addCls(val.length > def.maxLength, 'sui-error sui-max-length-error')){
                    return false;
                }
            }

            return true;
        };

        def.button.func =() => {
            let val = input.val();
            if(!validate(val)){
                input.focus();
                return;
            };
            deferred.resolve(val);
            dialog.close();
        };
        let cancelBtn = {
            type:'default',
            text: 'Cancel',
            func: (modal)=>{
                deferred.reject();
                modal.close();
            }
        };

        let content = $('<div></div>');
        let message = $(`<p>${def.message}</p>`);
        input = $(`<input class="smart-ui-modal-form-field" type="${def.fieldType}" maxlength="${def.maxLength}"/>`);

        input.on('keyup', () => {
            let val = input.val();
            validate(val);
        });
        content.append([message, input]);
        dialog = this.modal({
            type: def.type,
            title: def.title,
            theme: def.theme,
            message: content,
            buttons: [cancelBtn, def.button]
        });
        return deferred.promise();
    };

    window.sui.masterPassword = function (options) {
        let deferred = jQuery.Deferred();
        let dialog, input;
        let def =  $.extend({
            theme: 'smart-ui-modal-default',
            type: 'question',
            title: 'Master Password',
            message: 'Please enter your master password!',
            fieldType: 'password',
            maxLength: 4,
            required: true,
            button: { type:'warning', text: 'OK'}
        }, options);

        def.button.func = () => {
            let val = input.val();
            if(def.required && !val){
                return;
            }
            if(def.maxLength && val.length < def.maxLength){
                return;
            }
            deferred.resolve(val);
            dialog.close();
        };
        let content = $('<div></div>');
        let message = $(`<p>${def.message}</p>`);
        input = $(`<input class="smart-ui-modal-form-field" autofocus="true" type="${def.fieldType}" maxlength="${def.fieldMaxLength}"/>`);
        content.append([message, input]);
        dialog = this.modal({
            type: def.type,
            title: def.title,
            theme: def.theme,
            message: content,
            buttons: [def.button]
        });
        input.masterPassword();
        return deferred.promise();
    };


})(jQuery, window);