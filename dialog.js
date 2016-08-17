/**
 * Created by rick on 2015/11/16.
 */

var $ = require('jquery');
var _ = require('underscore');
var Dialog = require('ui-modal/Dialog');
var _dialogTemplate = null;
var _alertTemplate = null;
var _confirmTemplate = null;

module.exports = {
    getDialog : function(props) {
        _dialogTemplate = _dialogTemplate || _.template(require('./templates/dialogTpl.html'));
        props = $.extend({
            template : _dialogTemplate({
                cancelText : props.cancelText || '',
                confirmText : props.confirmText || '',
                autofocusConfirm : props.autofocusConfirm || false
            }),
            onModalBtnCancel : function() {
                this.hide()
            },
            maskClassName : 'modal-backdrop in'
        }, props);
        return new Dialog(props);
    },

    getAlert : function(props, iconClassName) {
        _alertTemplate = _alertTemplate || _.template(require('./templates/alertTpl.html'));
        var zIndex = window.$mask && window.$mask.css('zIndex');
        iconClassName = iconClassName || 'msg-warning';
        return this.getDialog($.extend({
            template : _alertTemplate({
                confirmText : props.confirmText,
                iconClassName : iconClassName
            }),
            destroyMode : true,
            onModalBtnConfirm : function() {
                this.hide();
            },
            show : function() {
                this.inherited('show', arguments);
                zIndex && window.$mask.css('zIndex', 1050);
                this.$wrapper.before(window.$mask);
            },
            hide : function() {
                zIndex && window.$mask.css('zIndex', zIndex);
                this.inherited('hide', arguments);
            }
        }, props));
    },

    getConfirm : function(props) {
        _confirmTemplate = _confirmTemplate || _.template(require('./templates/confirmTpl.html'));
        var zIndex = window.$mask && window.$mask.css('zIndex');
        return this.getDialog($.extend({
            template : _confirmTemplate({
                cancelText : props.cancelText || '',
                confirmText : props.confirmText || '',
                autofocusConfirm : props.autofocusConfirm || false
            }),
            destroyMode : true,
            show : function() {
                this.inherited('show', arguments);
                zIndex && window.$mask.css('zIndex', 1050);
                this.$wrapper.before(window.$mask);
            },
            hide : function() {
                zIndex && window.$mask.css('zIndex', zIndex);
                this.inherited('hide', arguments);
            }
        }, props));
    },

    getSuccessDialog : function(props) {
        return this.getAlert($.extend({
            title : '成功'
        }, props), 'msg-warning msg-ok');
    }
};
