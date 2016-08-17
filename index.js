/**
 * Created by rick on 2015/11/16.
 */

var dialog = require('./dialog');
var xhr = require('./xhr');
var common = require('./common');
var pagination = require('./pagination');
var datepicker = require('./datepicker');
var fileupload = require('./fileupload');

module.exports = {
    dialog : dialog,
    xhr : xhr,
    common : common,
    pagination : pagination,
    datepicker : datepicker,
    fileupload : fileupload
};
