驗證表單

#使用方式

<head>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="include/Scripts/validate/validate.css" media="all">
<script type="text/javascript" src="include/Scripts/validate/validate.js"></script>
<script type="text/javascript"> 
    $(function(){
        //驗證表單
        $(".validateform").JFormValidator(
        	msg: {
				required: '必填顯示訊息',
				text: '文字顯示訊息',
				number: '數字顯示訊息',
				email: '信箱顯示訊息',
				choice_require: '必選顯示訊息',
				captcha: '驗證顯示訊息'
			}
        );
    })
</script>
</head>

<body>
<form  method="post" action="<送出表單的伺服器程序>" class="validateform" enctype="multipart/form-data">
	
	<!-- 文字欄位 只允許文字,必填 -->
	<input type="text" name="field1" placeholder=" * allow text and no empty field" data-validate="required,text">

	<!-- 文字欄位 只允許數字,必填 -->
	<input type="text" name="field2" placeholder=" * allow number and no empty field" data-validate="required,number">

	<!-- 文字欄位 只允許信箱格式,必填 -->
	<input type="text" name="field1" placeholder=" * allow text and no empty field" data-validate="required,email">

	<!-- 單選欄位 必選 -->
	<input name="radio[]" type="radio" value="radio1" /> radio1
    <input name="radio[]" type="radio" value="radio2" /> radio2
    <input name="radio[]" type="radio" value="radio3" /> radio3
    <input name="radio_group1" value="radio[]" type="hidden" data-validate="choice_require">

    <!-- 複選欄位 必選 -->
    <input name="checkbox[]" type="checkbox" value="checkbox1" /> checkbox1
    <input name="checkbox[]" type="checkbox" value="checkbox2" /> checkbox2
    <input name="checkbox[]" type="checkbox" value="checkbox3" /> checkbox3
    <input name="checkbox_group1" value="checkbox[]" type="hidden" data-validate="choice_require">

    <!-- 下拉欄位 必選 -->
    <select class="input1" name="select" data-validate="required">
        <option value="">empty</option>
        <option value="option1">select option 1</option>
        <option value="option2">select option 2</option>
    </select>

    <!-- 文字欄位 必填 -->
    <textarea name="textarea" placeholder=" * Comments" data-validate="required"></textarea>

    <!-- 檔案欄位 必填 -->
    <input type="file" name="attach1" data-validate="required" />

    <!-- 驗證欄位 必填 -->
    <input type="text" name="validate" data-validate="captcha" />
    <img class="captcha" src="validate/code.php" />

</body>

