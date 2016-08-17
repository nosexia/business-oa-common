/**
 * Created by rick on 2016/1/5.
 */

var $ = require('jquery');
var Pagination = require('ui-pagination');

module.exports = {
    generate : function(props) {
        return new Pagination($.extend({
            nodeOrder : ['total', 'prev', 'startPage', 'pages', 'maxPage', 'next', 'first', 'last'],
            clickableSelector : 'li:not(.disabled,.active)',
            template : '<nav><ul class="pager pagination pagination-sm oa-pagination"></ul></nav>',
            createTotalHtml : function(total) {
                return '<li class="pager-text"> <span>共' + total + '条纪录</span> </li>';
            },
            createStartPageHtml : function() {
                return '<li data-page="1"> <a href="javascript:void(0)">...1</a> </li>';
            },
            createPageHtml : function(page, current) {
                var className = current ? 'active' : '';
                return '<li class="' + className + '" data-page="' + page + '"> <a href="javascript:void(0)">' + page + '</a> </li>';
            },
            createMaxPageHtml : function(maxPage) {
                return '<li data-page="' + maxPage + '"> <a href="javascript:void(0)">...' + maxPage + '</a> </li>';
            },
            createPrevPageHtml : function(prev, disabled) {
                var className = disabled ? 'disabled' : '';
                return '<li class="' + className + '" data-page="' + prev + '"> <a href="javascript:void(0)">' +
                    '<i class="fa fa-angle-double-left"></i></a> </li>';
            },
            createNextPageHtml : function(next, disabled) {
                var className = disabled ? 'disabled' : '';
                return '<li class="' + className + '" data-page="' + next + '"> <a href="javascript:void(0)">' +
                    '<i class="fa fa-angle-double-right"></i></a> </li>';
            },
            createFirstPageHtml : function(disabled) {
                var className = disabled ? 'disabled' : '';
                return '<li class="' + className + '" data-page="1"> <a href="javascript:void(0)">首页</a> </li>';
            },
            createLastPageHtml : function(maxPage, disabled) {
                var className = disabled ? 'disabled' : '';
                return '<li class="' + className + '" data-page="' + maxPage + '"> <a href="javascript:void(0)">末页</a> </li>';
            }
        }, props));
    }
};
