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
        let modalContent = $('<div class="smart-ui smart-ui-modal-content"/>');
        let modalClosebtn = $('<div class="smart-ui smart-ui-modal-close">CLOSE</div>');
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

        modalContent.append([modalClosebtn, title, placeholder]);
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
            fieldMaxLength: null,
            button: { type:'warning', text: 'OK'}
        }, options);

        def.button.func =() => {
            let val = input.val();
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
        input = $(`<input class="smart-ui-modal-form-field" type="${def.fieldType}" maxlength="${def.fieldMaxLength}"/>`);
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
            fieldMaxLength: null,
            button: { type:'warning', text: 'OK'}
        }, options);

        def.button.func =() => {
            let val = input.val();
            deferred.resolve(val);
            dialog.close();
        };
        let content = $('<div></div>');
        let message = $(`<p>${def.message}</p>`);
        input = $(`<input class="smart-ui-modal-form-field" type="${def.fieldType}" maxlength="${def.fieldMaxLength}"/>`);
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