/**
 * Created by young on 2016/1/8.
 */
var FileUpload = require('ui-upload');
var dialog = require('./dialog');
var $ = require('jquery');

module.exports = {
    generate : function(props) {
        return new FileUpload($.extend({
            triggerText:'上传',
            preventImgShow:false,
            type:'single'
        }, props));
    },

    generateSingleUpload : function(props){
        require('./css/imgupload.css');
        return new FileUpload($.extend({
            triggerText:'上传',
            preventImgShow:false,
            type:'single',
            name : 'file',
            demoTemplate:'<div class="upld-demo"><p>图片尺寸</p><p>1080*1920</p></div>',
            success:function(response){
                this.$wrapper.find('div.upld-demo').css('opacity','0');
            },
            error:function(response){
                dialog.getAlert({
                    title : '上传图片失败',
                    content : response.message,
                    confirmText : '确认'
                }).show();
            },
            deleteItem:function($target){
                this.remotePath = '';
                $target.parent().remove();//删除图片
                this.$wrapper.find('div.upld-demo').css('opacity','1');
            },
            lookItem:function($target){
                window.open(this.remotePath);
            }
        }, props));
    }
};
