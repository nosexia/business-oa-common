# business-oa-common
OA通用模块，因为目前OA分成各子系统，但前端基本一致，所以维护一个项目级通用模块。目前该模块封装了common，dialog，pagination,select,suggestInput,suggestSelect,multiSuggestSelect和xhr这几个部分。

## 安装
```sh
npm install git+http://gitlab.futunn.com/webpackage/business-oa-common.git#1.5.2
```

## 使用

```javascript
var common = require('business-oa-common/common');
common.run();   // 处理公共业务，包括左侧导航，头像点击响应等。

// 弹框封装了几个方法，传的参数与ui-modal/Dialog是一致的，封装的意义是应用了新OA的默认弹框模板，
// 并且支持confirmText和cancelText等参数。
var dialog = require('business-oa-common/dialog');
dialog.getDialog({
    title : '标题',
    content : '内容'
}).show();     // 弹框
dialog.getAlert({
    content : '内容',
    confirmText : '我知道了'
}).show();      // 警告框
dialog.getConfirm({
    confirmText : 'ok',
    cancelText : '取消',
    autofocusConfirm : true, // 回车时自动响应Confirm的回调，默认是false
    onModalBtnConfirm: function(){/* 确认回调*/},
    onModalBtnCancel : function(){/* 取消回调*/}
}).show();    // 确认框
dialog.getSuccessDialog({
    content : '设置成功'
}).show();  // 成功提示

// 封装的xhr设置好了codeName,msgName和dataName属性
var xhr = require('business-oa-common/xhr');
xhr.get({
    url : '/xxx'
}).done(function(data){
    // success
}).fail(function(error){
    // fail
});

// 封装的分页控件
var pagination = require('business-oa-common/pagination');
pagination.generate({
    rawNode : dom,
    data : {
        total : 56,
        page : 1,
        pageCount : 6
    },
    onClick : function(page){/* 点击某个页码时的回调*/}
});

// 封装的下拉框控件
var select = require('business-oa-common/select');
select.generate({
    rawNode : dom,
    data : [{
        name : 'option1',
        id : 1
    }, {
        name : 'option2',
        id : 2
    }],
    keyName : 'name',
    valueName : 'id'
});

// 封装的suggestInput
var suggestInput = require('business-oa-common/suggestInput');
suggestInput.generate({
    rawNode : dom,
    getResult : function(value){
        // 这里实现异步请求结果，返回一个Deferred对象
    },
    onChange : function(value){
        // 值改变时的回调
    }
});

// 封装的suggestSelect
var suggestInput = require('business-oa-common/suggestSelect');
suggestInput.generate({
    rawNode : dom,
    valueName : 'uid',
    keyName : 'nick',
    getResult : function(value){
        // 这里实现异步请求结果，返回一个Deferred对象
    },
    onChange : function(value){
        // 值改变时的回调
    }
});

// 封装的日期选择控件
var datepicker = require('business-oa-common/datepicker');
datepicker.generate({
    zIndex : 1000,//控件显示层级
    format : 'yyyy-MM-dd',//日期格式化字符串
    rawNode : dom,
    elementNum:2,//两个月份详情选取框
    dateNum:2,//必须选择两个时间点
    startYear:2016,//第一个月份详情选取框年份为2016
    startMonth:5,//第一个月份详情选取框月份为5
    callback:function(){//选取日期后回调
        var val = '';
        for(var i=0;i<this.result.length;i++){
            val += this.result[i].formatStr+' ';
        }
        this.$trigger.val(val);
    }
});

// 封装的文件上传控件
var fileupload = require('business-oa-common/fileupload');
fileupload.generate({
    name:'test',
    rawNode:$('#rawNode'),
    action:'/upload',
    demoTemplate:'<div class="upld-demo"><p>图片尺寸</p><p>1080*1920</p></div>',
    parse:function(response){
        /**
         * 如果是formData方式上传则response表示服务器返回数据，如果是iframe方式上传则response为空，this指向组件本身，使用组件必须重写该方法
         * 解析后台数据为json对象，且该对象必须具有remotePath属性，用来赋值文件的服务器路径，若后台没有返回服务器路径，则用来赋值某个标识，为true则表示上传成功，false表示上传失败
         */
        console.log('解析回调被执行'+response);
        return {
            remotePath:'http://gitlab.futunn.com/assets/logo-white-96c5cdf684c799df72c830d36ecc7fec.png'
        };
    },
    success:function(response){
        /* response表示服务器返回数据，this指向组件本身，使用组件必须重写该方法 */
        console.log(response);
        this.$wrapper.find('div.upld-demo').css('opacity','0');//隐藏示例图片（需要占位所以设置透明度即可）
    },
    error:function(response){
        /* response表示服务器返回数据，this指向组件本身，使用组件必须重写该方法 */
        console.log(response);
    },
    deleteItem:function($target){
        /* $target表示触发组件的jquery对象，this指向组件本身，使用组件必须重写该方法 */
        console.log('删除回调被执行'+$target);
        $target.parent().remove();//删除图片
        this.$wrapper.find('div.upld-demo').css('opacity','1');//显示示例图片（需要占位所以设置透明度即可）
    },
    lookItem:function($target){
        /* $target表示触发组件的jquery对象，this指向组件本身，使用组件必须重写该方法 */
        console.log('查看回调被执行'+$target);
        window.open(this.remotePath);
    }
});

// 封装的对MultiSuggestSelect的调用
var multiSelect = require('business-oa-common/multiSuggestSelect');
multiSelect.generateSuggestSelect({
    rawNode : $('#stocktest')[0],
    keyName : 'value',
    placeholder : '输入股票名称、代码、拼音',
    minWidth : '200px',
    getResult : function(value) {
        // 异步获取结果，返回一个Deferred对象
    },
    createDisplay : function(item) {
        // 展示在右侧的已选结果的问题，如果不实现该方法则会默认用选项的value来展示
        return item.value + '_test';
    }
});

```

## 版本记录

### 1.5.0 - 1.5.2 2016-01-28 - 2016-02-26

- 增加对可多选的提示选择框的封装`multiSuggestSelect`。
- 增加select的一些方法。
- 修复左侧导航点击主体部分不展开问题。

### 1.4.0 - 1.4.4 2016-01-15

- 增加`select.generate24HourSelect`方法。
- 增加`fileupload.generateSingleUpload`方法。
- 引入`datepicker.css`和`imgupload.css`。
- 修复`datepicker`的样式问题。
- 对`dialog`和`confirmDialog`增加`autofocusConfirm`属性以支持回车响应。
- `pagination`的`data-page`属性改为放到`li`元素上。

### 1.3.2 2016-01-15

- 上传组件升级到1.3.1。

### 1.3.0 2016-01-13

- 增加成功提示框的封装。

### 1.2.2 - 1.2.3 2016-01-11

- 提升select版本。

### 1.2.1 2016-01-11

- 修复select模板中带有id的bug。

### 1.2.0 2016-01-08

- 添加日期选择控件的封装`datepicker`。
- 添加文件上传控件的封装`fileupload`。

### 1.1.0 2016-01-05

- 添加分页控件的封装`pagination`。
- 添加下拉框控件的封装`select`。

### 1.0.0 2015-12-08

- 整理文档，打tag。

### before1.0.0

- 整理代码。
