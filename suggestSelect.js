/**
 * Created by rick on 2016/1/15.
 */

var $ = require('jquery');
var _ = require('underscore');
var SuggestSelect = require('ui-combobox/SuggestSelect');

module.exports = {
    generate : function(props) {
        return new SuggestSelect($.extend({
            template : _.template(require('./templates/SuggestInputTpl.html'))({
                minWidth : props && props.minWidth
            }),
            optionItemSelector : 'li',
            optionHoverClassName : 'selected',
            createOptionsHtml : function(list, valueName, keyName) {
                return _.template(require('./templates/selectOptionsTpl.html'))({
                    list : list || [],
                    valueName : valueName,
                    keyName : keyName
                });
            }
        }, props));
    }
};