/**
 * Created by young on 2016/1/8.
 */
var DatePicker = require('ui-datepicker');
require('./css/datepicker.css');

module.exports = {
    generate : function(props) {
        return new DatePicker(props);
    }
};
