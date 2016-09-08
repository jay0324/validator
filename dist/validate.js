/*
code: jquery form validator
coder: JH
date: 2016/05/13

usage:
$(yourForm).JFormValidator();

param:
$(yourForm).JFormValidator({
	checkType: 'input, textarea, select', //check field type
	msg: {
		required: 'field return msg ',
		text: 'field return msg ',
		number: 'field return msg ',
		email: 'field return msg ',
		choice_require: 'field return msg ',
		captcha: validate code return msg
	}
});

for input, textarea, select field validation setting:
<input type="text" data-validate="validation method" />

for checkbox, radio validation settion:
<input name="any_name" value="your checkbox or radio group name" type="hidden" data-validate="choice_require">

validation method:
require,text,number,email 

*/
(function($) {
    $.fn.JFormValidator = function(options) {
        var defaults = {
        	checkType: 'input, textarea, select, radio, checkbox',
        	msg: {}
        };
        options = $.extend(defaults, options);
        var checkType = options.checkType;
        var msg = options.msg;

        $(this).each(function(){
        	var myform = $(this);

        	$(checkType,myform).each(function(){
				//在所有檢查欄位後建立訊息區塊
				if ($(this).type!='checkbox' && $(this).type!='radio') {
					$(this).after('<span class="validate-msg">');
				}
			})
			
			$(checkType).each(function(){
				//建立檢察欄位的script
				$(this).on('change',function(){
					fnCheckField($(this),msg,myform);
				})
			})

			$("input[type='submit'], submit",myform).on('click',function(){
				var validateResult = [];
				$(checkType,myform).each(function(){
					validateResult.push(fnCheckField($(this),msg,myform));
				});

				if ($.inArray(false,validateResult) == -1) {
					return true;
				}else{
					return false;
				}

			})

        })

        //reflash captcha image
        $(".captcha").on('click',function(){
			$(this).attr('src',$(this).attr('src')+'?');
		})

        //check field
		function fnCheckField(obj,msg,myform){
			var val = $(obj).val();
			var type = $(obj).attr('type');
			var name = $(obj).attr('name');
			var validateStr = (type=='checkbox' || type=='radio') ? $("input[value='"+name+"']",myform).attr('data-validate') : $(obj).attr('data-validate');
			var validate = (validateStr != undefined) ? (validateStr.indexOf(',') != -1) ? validateStr.split(',') : [validateStr] : '';
			var is_validate = [];
			var returnMsg = "";

					for (var i= 0; i < validate.length; i++) {
						switch(validate[i]){
							case 'required':
								if (val == ''){
									is_validate.push(false);
									returnMsg += createNotifyMsg(validate[i],msg);
								}
							break;
							case 'text':
								if (val.match(/[\d]/gi) != null){
									is_validate.push(false);
									returnMsg += createNotifyMsg(validate[i],msg);
								}
							break;
							case 'number':
								if (val.match(/[^\d]/gi) != null){
									is_validate.push(false);
									returnMsg += createNotifyMsg(validate[i],msg);
								}
							break;
							case 'email':
								if (val.match(/\S+@\S+\.\S+/gi) == null){
									is_validate.push(false);
									returnMsg += createNotifyMsg(validate[i],msg);
								}
							break;
							case 'choice_require':
								if (type=='checkbox' || type=='radio') {
									if ($("input[name='"+name+"']:checked",myform).length == 0){
										is_validate.push(false);
										returnMsg += createNotifyMsg(validate[i],msg);
									}
								}else{
									if ($("input[name='"+val+"']:checked",myform).length == 0){
										is_validate.push(false);
										returnMsg += createNotifyMsg(validate[i],msg);
									}
								}
							break;
							case 'captcha':
								if (val == ''){
									is_validate.push(false);
									returnMsg += createNotifyMsg(validate[i],msg);
								}else{
									$.ajax({
										url: $(".captcha", myform).attr('src'),
										method: 'post',
										data: {v: 'fcaptcha',g: val},
										success: function (r) {
											console.log(r);
										    if (r != '1') {
												is_validate.push(false);
												returnMsg += createNotifyMsg(validate[i],msg);
											}
										 }, 
										 async: false
									})
								}
							break;
						}
					}

					if ($.inArray(false,is_validate) == 0) {
						if (type=='checkbox' || type=='radio') {
							$("input[value='"+name+"']",myform).next('.validate-msg').text(returnMsg);
						}else{
							$(obj).removeClass('validate-ok').addClass('validate-error');
							$(obj).next('.validate-msg').text(returnMsg);
						}
						return false;
					}else{
						if (type=='checkbox' || type=='radio') {
							$("input[value='"+name+"']",myform).next('.validate-msg').text('');
						}else{
							$(obj).removeClass('validate-error').addClass('validate-ok');
							$(obj).next('.validate-msg').text('');
						}
						return true;
					}
		}

		function createNotifyMsg(type,msg) {
			//default msg
			var default_msg = {
	        		required: 'This is require field, please do not leave empty! ',
					text: 'This field only allow text! ',
					number: 'This field only allow number! ',
					email: 'This is field only allow email fomate! ',
					choice_require: 'You must select one option! ',
					captcha: 'You validate code is incorrect! '
	        	};

	        var returnMsg = '';

	        //check custom msg first
			for (var k in msg) {
				if (k == type) {
					returnMsg = msg[k];
				}
			}

			//if no return msg then check the default msg
			if (returnMsg == '') {
				for (var k in default_msg) {
					if (k == type) {
						returnMsg = default_msg[k];
					}
				}
			}

			return returnMsg;
		}
        

    }
})(jQuery);