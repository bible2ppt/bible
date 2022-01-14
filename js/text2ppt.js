/**
*. make text to ppt
*/
$( document ).ready(function() {
	var icon_top = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAApklEQVQ4y7XSTQ6CMBCG4TbKopGtey7gfYhB4HysTNR4CDkQ0QV+NW9NVwINTvKEdJhO+mfMirGVXHYTcmq/seFbyiiDPPFCGA/UlPFcy6CQVio5SSNHNOQqagrm2DWP4NPNLylj7KSHI5dRY3818bFn4oie3OSyw8+D1PJATW7WvuOCM8zSQwtXe0Ocm32gPq5YfGWh+ILkBnckN+iQ/Opc9Ij+E28tUh+JLDua8wAAAABJRU5ErkJggg==';
	
	var icon_middle = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAdUlEQVQ4y2NgwA/soZhkwAild0MxshhRgBlKr4diZDGibDYD4tVA/BiKV0PFSHJJPxD/h+J+UvzOhMRvh2IYYCI1LIgCTEhRBgrxzUC8BYi3AvE2KN4KFdsMVWOPrJdiA6gKqBqIZEcjVRIS2UmZapmJ6OwMALtlJWGTnZQcAAAAAElFTkSuQmCC';
	
	var icon_bottom = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAoElEQVQ4y7XSQQqCQBTG8RnSReS2vRfoPhKmna+VUNIhmgNJLeoL/g9mEeqIPfgx+Hx+KjPO/bm2SC7PekHcSwq4Y3HAFYsDbkgO2LD2iHuz3/6tDm7uV9jAQRp5oKE3GWI39xLkjUBvNMDzn3l0iALsMOXM+FWPq6WVcpZaTtLKES29mpkyfta2p+J/B3niBbsemKl+bW0mhewmFMyuUx+cJx+JRwKj+AAAAABJRU5ErkJggg==';
	
	$("#icon_top").attr("src", icon_top);
	$("#icon_middle").attr("src", icon_middle);
	$("#icon_bottom").attr("src", icon_bottom);
	//alert("103");

});

// http://www.htmldrive.net/items/show/713/simple-Dynamic-tabs-using-jQuery.html
function copyText() {

	var now = new Date();	// 현재 날짜 및 시간
	
	var copyText = document.getElementById("content");
	copyText.select();
	copyText.setSelectionRange(0, 99999)
	document.execCommand("copy");
	//alert("Copied the text: " + copyText.value);
	
	var trimed = copyText.value.replace(/\s/gi, "");
	var historyName = trimed.substr(0,5);
	//alert("공백제거한 5글자: " + trimed.substr(0,5) );
	//if($('#restore').length){ alert('aaa') }; // 존재하는지 검사
	
	var historyBtn = "<div name='" + now + "' class='mini ui basic button' onclick='restore(this)'>" + historyName + "<a href='#' class='remove' onclick='remove(this)'>ⓧ</a></div>";
	var histroyTextArea = "<textarea id='" + now + "' style='display:none;'>" + copyText.value + "</textarea>";
	$("#history").append(historyBtn + histroyTextArea);

}

function restore(val) {
	var id = $(val).attr("name");
	//alert(id);
	var restoreText = document.getElementById(id);
	restoreText.select();
	restoreText.setSelectionRange(0, 99999)
	document.execCommand("copy");
//	alert("restoreText: " + restoreText.value);
	  
	$("#content").val(restoreText.value);
	  
}

function remove(val) {
	$(val).parent().remove();
}

function replaceAll(str, searchStr, replaceStr) { // 모든 문자열 대체 함수, https://mingggu.tistory.com/m/64
   return str.split(searchStr).join(replaceStr);
}


// https://semantic-ui.com/modules/accordion.html#/settings
$( document ).ready(function() {
    $('.ui.accordion').accordion({exclusive: false, onChanging: getSetValues()}); // 세부설정 열고 닫기 
});


// https://jsbin.com/lakikegepe/edit?html,js,console,output
// 1. 사용법 button class 에 button dynamic 지정
// 2. 필수설정 id, value
// 3. 동작 : 클릭시 id값이 value 값으로 지정되고 siblings에 의해 같은 depth의 값과 선택은 삭제
// 4. 단독 사용시 <div></div>로 버튼을 따로 감싸줌
$( document ).ready(function() {
    $('.bible .button.dynamic').on('click', function() { // button dynamic 모두 적용됨
        //alert(this.value);
        if ($(this).hasClass('active')) $(this).removeClass('active').val('');
        else $(this).addClass('active').val(this.id).siblings().removeClass('active').val('');
        getSetValues();
        //alert(this.value);
    });
    //console.log( "ready!" );
});


function getSetValues(){

  console.log("===== Get Theme ======");
// 테마선택 (defaultTheme, blackTheme, whiteTheme, greenTheme)
  var defaultTheme = "defaultTheme"; //default

  var themeVal = defaultTheme;
  if(themeVal === "") themeVal = defaultTheme; //선택된게 없으면 default 값
  if(themeVal === "defaultTheme") themeVal = '<div class="ui green label">기본</div>';
  $("#themeMsg").html(themeVal);

  console.log("테마: " + themeVal);

  console.log("===== Get Values ======");
// 본문정렬 (left, center, right, justify)
  var defaultAlign = "center"; //default
  var left = $("#left").val();
  var center = $("#center").val();
  var right = $("#right").val();
  var justify = $("#justify").val();
  var alignVal = left + center + right + justify;
  if(alignVal === "") alignVal = defaultAlign; //선택된게 없으면 default 값
  
  console.log("정렬: " + alignVal);

  
// 본문위치 (top, middle, bottom)
  var defaultVertical = "bottom"; //default
  var top = $("#top").val();
  var middle = $("#middle").val();
  var bottom = $("#bottom").val();
  var valignVal = top + middle + bottom;  
  if(valignVal === "") valignVal = defaultVertical; //선택된게 없으면 default 값  
  
  console.log("위치: " + valignVal);
  
// 폰트스타일 (bold, italic, underline)
  var defaultFontStyle = "normal";
  var bold = $("#bold").val();
  var italic = $("#italic").val();
  var underline = $("#underline").val();
  var fontStyleVal = bold + italic + underline;  
  if(fontStyleVal === "") fontStyleVal = defaultFontStyle; //선택된게 없으면 default 값
  else fontStyleVal = bold + " " + italic + " " + underline;

  console.log(fontStyleVal);

// Layout
  var  LyricsLayout = $("#LyricsLayout").val();
  console.log("레이아웃: " + LyricsLayout);  

// Font Face
  var  LyricsFontface = $("#LyricsFontface").val();

// Font Size
  var  LyricsFontSize = $("#LyricsFontSize").val();
  
  console.log("글씨체: " + LyricsFontface);

// Font Size
  var  line = $("#line").val();

// 테마 미리보기 스타일 적용하기 (td)
//  'NanumBarunGothic', sans-serif;
//  'Nanum Gothic', sans-serif;
//  'Nanum Myeongjo', serif;
/*
                      <option value="GyeonggiTitleB">경기천년제목</option>
                      <option value="NanumBarunGothicBold">나눔바른고딕</option>
                      <option value="NanumGothicExtraBold">나눔고딕</option>
                      <option value="NanumMyeongjoExtraBold">나눔명조</option>
*/

    var fontFamily = "sans-serif";

    var msgFontface;
    if(LyricsFontface === "G마켓 산스 Medium") fontFamily = "'GmarketSansLight', sans-serif", msgFontface = "G마켓 산스";    
    if(LyricsFontface === "경기천년제목 Bold") fontFamily = "'GyeonggiTitleM', sans-serif", msgFontface = "경기천년제목";
    if(LyricsFontface === "나눔바른고딕") fontFamily = "'NanumBarunGothic', sans-serif", msgFontface = "나눔바른고딕";
    if(LyricsFontface === "나눔고딕 ExtraBold") fontFamily = "'Nanum Gothic', sans-serif", msgFontface = "나눔고딕";
    if(LyricsFontface === "나눔명조 ExtraBold") fontFamily = "'Nanum Myeongjo', serif", msgFontface = "나눔명조";
    
    
    document.getElementById("LyricsDownBtn").style.fontFamily = fontFamily;
	    

	    var bgColor = $("#color-select").val();
	    var bgColorInput = $("#color-picker").val();
	    $("#color-picker").attr("disabled", true);
	    
	    //if(bgColor != "123") {$("#color-picker").val('#00FF00'); $("#color-picker").trigger('keyup'); $("#LyricsDownBtn").css('color', '#FFFFFF');}
	    if(bgColor === "Green") {$("#color-picker").val('#00FF00'); $("#color-picker").trigger('keyup'); $("#LyricsDownBtn").css('color', '#FFFFFF');}
	    if(bgColor === "Orange") {$("#color-picker").val('#FFA500'); $("#color-picker").trigger('keyup'); $("#LyricsDownBtn").css('color', '#FFFFFF');}
	    if(bgColor === "Black") {$("#color-picker").val('#000000'); $("#color-picker").trigger('keyup'); $("#LyricsDownBtn").css('color', '#FFFFFF');}
	    if(bgColor === "White") {$("#color-picker").val('#FFFFFF'); $("#color-picker").trigger('keyup'); $("#LyricsDownBtn").css('color', '#000000');}
	    if(bgColor === "Pink") {$("#color-picker").val('#FFC0CB'); $("#color-picker").trigger('keyup'); $("#LyricsDownBtn").css('color', '#FFFFFF');}
	    if(bgColor === "Blue") {$("#color-picker").val('#0000FF'); $("#color-picker").trigger('keyup'); $("#LyricsDownBtn").css('color', '#FFFFFF');}
	    if(bgColor === "Yellow") {$("#color-picker").val('#FFFF00'); $("#color-picker").trigger('keyup'); $("#LyricsDownBtn").css('color', '#000000');}
	    if(bgColor === "Gray") {$("#color-picker").val('#808080'); $("#color-picker").trigger('keyup'); $("#LyricsDownBtn").css('color', '#FFFFFF');}
	    if(bgColor === "Self") {$("#color-picker").attr("disabled", false); $("#color-picker").focus();}
	    // Black	Pink	White	Blue	Yellow	Gray


  var message = "<b>레이아웃:</b> " + LyricsLayout
                 + " | " + "<b>폰트:</b> " + msgFontface + "("  + fontStyleVal + ")"
           + " | " + "<b>폰트크기:</b> " + LyricsFontSize
                 + " | " + "<b>본문정렬:</b> " + alignVal
                 + " | " + "<b>본문위치:</b> " + valignVal
                 ;

  var btnMessage = msgFontface + "("  + LyricsFontSize + ")" + " | " + line + "줄 ";
  

  $('.ui.table td').each(function (){
    $(this).removeClass("top middle bottom aligned").addClass(valignVal + " aligned").css({
        "font-family": fontFamily,
        "font-style": italic,
        "font-weight": bold,
        "text-decoration": underline,
    });
  });


// 수평 정렬 적용하기 (tr)
  $('.ui.table tr').each(function (){
    $(this).removeClass("left center right justify aligned").addClass(alignVal + " aligned");
  });

  $("#message").html(message);
  $("#LyricsBtnMsg").html(btnMessage);

}

function setInitialize(){
  console.log("초기화");
  //$("#defaultTheme").addClass('active').val($("#defaultTheme").id).siblings().removeClass('active').val(''); // 테마 초기화
  $("#center").addClass('active').val($("#center").id).siblings().removeClass('active').val(''); // 본문 정렬 초기화
  $("#bottom").addClass('active').val($("#bottom").id).siblings().removeClass('active').val(''); // 본문 위치 초기화
  $("#bold").removeClass('active').val(''); // bold 초기화
  $("#italic").removeClass('active').val(''); // italic 초기화  
  $("#underline").removeClass('active').val(''); // underline 초기화
  $('#line').dropdown('restore defaults'); // 줄수 초기화
  $('#LyricsLayout').dropdown('restore defaults'); // 레이아웃 초기화
  $('#LyricsFontface').dropdown('restore defaults'); // 폰트 페이스 초기화
  $('#LyricsLayout').dropdown('restore defaults');
  $('#LyricsFontSize').val('32'); // 폰트 크기 초기화

  $('#color-select').dropdown('restore defaults'); // 배경 색상 선택 초기화
  $("#color-picker").val('#00FF00'); // 배경 색상 초기화  
  $("#color-picker").trigger('keyup');  // blur, focus, load, resize, scroll, unload, beforeunload, click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave, change, select, submit, keydown, keypress, and keyup
  $("#preview").css('backgroundColor', '#00FF00');
  $("#LyricsDownBtn").css('backgroundColor', '#00FF00');
  $("#LyricsDownBtn").css('color', '#FFFFFF');
  
  getSetValues();  
}




$(document).ready(function() {
    $('.ui.form').form();
    $('select.dropdown').dropdown();
    $('.ui.radio.checkbox').checkbox();
    $('.ui.checkbox').checkbox();
});


function getTimestamp() { // 현재 타임스탬프 가져오기
    var dateNow = new Date();
    var dateMM = dateNow.getMonth() + 1;
    dateDD = dateNow.getDate();
    dateYY = dateNow.getFullYear(), h = dateNow.getHours();
    m = dateNow.getMinutes();
    return dateNow.getFullYear() + '' + (dateMM <= 9 ? '0' + dateMM : dateMM) + '' + (dateDD <= 9 ? '0' + dateDD : dateDD) + (h <= 9 ? '0' + h : h) + (m <= 9 ? '0' + m : m);
}

// 자막 만드는 함수
function createSubTitle() {
    var content = $("#content").val();
    content = content.replace(/\n$/gm, ''); // 중복된 줄바꿈 제거하기
    content = content.replace(/\r$/gm, ''); // 중복된 엔터 제거하기
    content = content.replace(/\t$/gm, ''); // 중복된 탭 제거하기
    content = content.replace(/(^\s*)|(\s*$)/gm, ""); // 각 줄마다 앞 뒤 공백 제거



    content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    if (content.trim().length < 1) {
        alert("텍스트를 입력해 주세요!");
        $("#content").val('');
        $("#content").focus();
        return false;
    };
    var addContent = content.split('<br>');
    //console.log(addContent);

    var cleanContent = $.map(addContent, $.trim); // 각 array 앞뒤 공백 제거

    var n = $("#line").val(); // 줄씩 자르기

    var len = cleanContent.length; // 컨텐츠 총 라인 수

    var cnt = Math.floor(len / n); // 컨텐츠 라인을 n으로 나누기

    if (cnt === 0) cnt = 1; // 나눈 값이 0일 경우 강제로 1 넣어주기

    var resultContent = [];
    for (var i = 0; i <= cnt; i++) {
        resultContent.push(cleanContent.splice(0, n));
    }

    //console.log(resultContent);

    // ===================== 자막 PPTX 관련 =============================
    // PPT 파일 이름 셋팅
    var lyricsTitle = resultContent[0][0].replace(/ /g, '').substring(0, 6);

    // align 정렬 값 가져오기
    // 본문정렬 (left, center, right, justify)
      var defaultAlign = "center"; //default
      var left = $("#left").val();
      var center = $("#center").val();
      var right = $("#right").val();
      var justify = $("#justify").val();
      var alignVal = left + center + right + justify;
      if(alignVal === "") alignVal = defaultAlign; //선택된게 없으면 default 값

      var lyricsAlign = alignVal;

    // valign 정렬 값 가져오기
    // 본문위치 (top, middle, bottom)
      var defaultVertical = "bottom"; //default
      var top = $("#top").val();
      var middle = $("#middle").val();
      var bottom = $("#bottom").val();
      var valignVal = top + middle + bottom;  
      if(valignVal === "") valignVal = defaultVertical; //선택된게 없으면 default 값

      var lyricsValign = valignVal;

    // 폰트스타일 (bold, italic, underline)
      var bold = $("#bold").val();
      var italic = $("#italic").val();
      var underline = $("#underline").val();
      if(bold == "bold") bold = true; if(!bold) bold = false;
      if(italic == "italic") italic = true; if(!italic) italic = false;
      if(underline == "underline") underline = true; if(!underline) underline = false;

    // 레이아웃 가져오기
    // var LyricsLayout = $("#LyricsLayout").children("option:selected").val();
    var  LyricsLayout = $("#LyricsLayout").val();

    // 폰트 타입 및 사이즈 가져오기
    //var LyricsFontface = $("#LyricsFontface").children("option:selected").val();
    //var LyricsFontSize = $("#LyricsFontSize").val();

    // Font Face
      var  LyricsFontface = $("#LyricsFontface").val();

    // Font Size
      var  LyricsFontSize = $("#LyricsFontSize").val();
      
      
    // Background Color
      var backgroundColor = $("#color-picker").val(); 

    // 1. Create a new Presentation
    let pres = new PptxGenJS();
    pres.layout = LyricsLayout;

    pres.addSection({
        title: lyricsTitle
    });

            var marginBT = 28.346 * 1.5; // 1cm(28.34) 1.5cm(42.519) 2cm(56.7) 3cm (85)
            var marginRL = 28.346 * 1.5; // 1cm(28.34) 1.5cm(42.519) 2cm(56.7) 3cm (85)

    // 마스터 슬라이드 정의하기
    pres.defineSlideMaster({
        title: 'PLACEHOLDER_SLIDE',
        /*background: { color: '00FF00' },
        //009933, 00B140
        파워포인트로 만들 경우Green Screen as RGB Color Value: 0, 177, 64
        인쇄용, 가림막으로 만들 경우Green Screen as CMYK Color Value: 81, 0, 92, 0
        프로그램으로 처리할 경우Green Screen as Hex Color Value: #00b140
        html로 할 경우Green Screen as Websafe Color Value: #009933
        */

        //background: { color: "00B140", transparency: 0 }, // 크로마키 초록색
        background: { color: backgroundColor, transparency: 0 }, // 크로마키 초록색
        
        objects: [
	    	{
	            placeholder: {
	                text: '',
	                options: {
	                    name: 'body',
	                    type: 'body',
	                    w: '100%',
	                    h: '100%',
	                    color: 'FFFFFF',
	                    bold: bold,
	                    italic: italic,
	                    underline: underline,
	                    isTextBox: true,                   
	                    fit: 'shrink',
		                fontSize: LyricsFontSize,
		                fontFace: LyricsFontface,
						valign: lyricsValign,
						align: lyricsAlign,
	                    //outline: {size: 0.5, color:'000000'},
	                    //glow:{size:2, opacity:1.0, color:'000000'},
	                    lineSpacing: LyricsFontSize * 1.025,
	                    charSpacing: -1,
	                    margin: [marginBT, marginBT, marginRL, marginRL]
	                },
	            },
	        },
        ]

    }); // 마스터 슬라이드


    $.each(resultContent, function(index, item) {
        if (resultContent[index].length != 0) {
            console.log(index + 1 + "페이지: " + item);
            var lyrics = item.join("\n");

            // ============== PPT 슬라이드 생성 ================= //
            // 1cm * 28.346 LRBT 왼 오 아 위 [56.7, 56.7, 28.34, 85] 기준 2cm, 2cm, 1cm, 3cm
            var marginBT = 28.346 * 1.5; // 1cm(28.34) 1.5cm(42.519) 2cm(56.7) 3cm (85)
            var marginRL = 28.346 * 1.5; // 1cm(28.34) 1.5cm(42.519) 2cm(56.7) 3cm (85)

            var slide = pres.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
                sectionTitle: lyricsTitle
            });

            
            slide.addText(lyrics, {
                placeholder: 'body',
                shadow: {type:"outer", angle: 45, blur: 0.1, color:"000000", offset: 1, opacity: 1.0} // 각도 45, 흐리게 0.1, 색 000, 간격 1, 투명도 0
            });
                      
            // ============== PPT 슬라이드 생성 ================= //

            console.log(index + 1 + "페이지: " + lyrics);

        }
    });

    // PPT 파일 다운로드
    pres.writeFile({ fileName: lyricsTitle + "_" + getTimestamp() });
    copyText();



}
