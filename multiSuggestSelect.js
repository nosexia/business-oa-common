/**
 * Created by rick on 2016/1/27.
 */

var $ = require('jquery');
var MultiSuggestSelect = require('ui-multi-suggest-select');

module.exports = {
    generateSuggestSelect : function(props) {
        require('./css/multiSuggestSelect.css');
        return new MultiSuggestSelect($.extend({
            template : _.template(require('./templates/multiSuggestSelectTpl.html'))({
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
            },
            createResultItemHtml : function(item) {
                return '<div class="pull-left text-center selected-label"><span>' + ((this.createDisplay && this.createDisplay(item)) || item.value) + '</span><i class="fa fa-times"></i></div>';
            }
        }, props));
    }
};