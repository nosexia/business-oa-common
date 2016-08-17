/**
 * Created by rick on 2016/1/5.
 */

var $ = require('jquery');
var _ = require('underscore');
var Select = require('ui-combobox/Select');

function get24HoursData(type) {
    var data = [];
    for (var i = 0; i < 24; ++i) {
        data.push({
            value : i,
            name : type == 1 ? (i + '') : (i + ':00')
        });
    }
    return data;
}

function get60MinutesData() {
    var data = [];
    for (var i = 0; i < 60; ++i) {
        data.push({
            value : i,
            name : i < 10 ? ('0' + i) : (i + '')
        });
    }
    return data;
}

module.exports = {
    generate : function(props) {
        return new Select($.extend({
            template : _.template(require('./templates/selectTpl.html'))({
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
    },

    generate24HourSelect : function(props) {
        return this.generate($.extend({
            data : get24HoursData(props && props.hourType),
            value : 0,
            minWidth : '99px'
        }, props));
    },

    generate60MinutesSelect : function(props) {
        return this.generate($.extend({
            data : get60MinutesData(),
            value : 0,
            minWidth : '80px'
        }, props));
    }
};
