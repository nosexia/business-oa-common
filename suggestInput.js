/**
 * Created by rick on 2016/1/15.
 */

var $ = require('jquery');
var _ = require('underscore');
var SuggestInput = require('ui-combobox/SuggestInput');

module.exports = {
    generate : function(props) {
        return new SuggestInput($.extend({
            template : _.template(require('./templates/suggestInputTpl.html'))({
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