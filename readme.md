JS驗證表單
=============

#JS
-------------
```
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="../dist/validate.css" media="all">
<script type="text/javascript" src="../dist/validate.js"></script>
```


#JS
-------------
```
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
```



#HTML
-------------
```
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

    <!-- 客製檢查 必填 -->
    <input type="text" name="custom" data-validate="custom" data-validator="your_custom_server_validate_script.php" />
    <!-- 
        在自訂的伺服器檢查程式中,您會收到的 $_POST['data'] 會是您在此欄位要檢查的資料,回傳會以json的方式來處理
        訊息格式為
        [{
            'state': 0 (錯誤)/1(正確),
            'msg': 要顯示在提示訊息中的文字
        }]
    -->

    <!-- 欄位對照 必填 -->
    <input type="password" name="password" data-validate="match" data-matched="match_group_name" data-msg="兩次輸入的密碼並不相符合!">
    <input type="password" name="password2" data-validate="match" data-matched="match_group_name" data-msg="兩次輸入的密碼並不相符合!">
    <!-- 
        檢查多個欄位的值是否相符合, data-matched="群組名稱", 一樣的值就會一起比較, data-msg="要顯示在提示訊息中的文字"
    -->

</form>
```
