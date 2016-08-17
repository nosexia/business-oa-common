/**
 * Created by rick on 2015/11/16.
 */

var $ = require('jquery');
var oaDialog = require('./dialog');

module.exports = {
    run : function(minusHeight) {
        minusHeight = minusHeight || 50;
        $('#main-container').css('minHeight', ($(window).height() - minusHeight) + 'px');
        $('.nav-main').on('click', 'em', function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).closest('li').toggleClass('open');
        }).on('click', '.nav-submenu ', function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).closest('li').toggleClass('open');
        });

        var $avatarBtn = $('#avatarBtn');
        var $avatarOpts = $('#avatarOpts');
        $avatarBtn.on('click', function(e){
            $(this).toggleClass('userToolBar01-open');
            $avatarOpts.toggle();
        });
        $(document).on('click.avatar', function(e){
            if ($(e.target).parents('#avatarOpts,#avatarBtn').length || e.target === $avatarBtn[0]) {
                return;
            }
            $avatarOpts.hide();
            $avatarBtn.removeClass('userToolBar01-open');
        });
        $avatarOpts.on('click', 'a', function(){
            var type = $(this).data('type');
            if (type === 'logout') {
                $('#logoutForm').submit();
            }
        });

        var navModal = oaDialog.getDialog({
            rawNode : $('#navModal')[0],
            template : null
        });
        $('#navBtn').on('click', function(){
            navModal.show();
        });
    }
};
