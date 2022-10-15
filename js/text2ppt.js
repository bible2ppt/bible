/**
 *. make text to ppt
 */
Array.prototype.division = function(n) {
    var arr = this;
    var len = arr.length;
    var cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
    var tmp = [];

    for (var i = 0; i < cnt; i++) {
        tmp.push(arr.splice(0, n));
    }
    return tmp;
}

$(document).ready(function() {
    var icon_top = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAApklEQVQ4y7XSTQ6CMBCG4TbKopGtey7gfYhB4HysTNR4CDkQ0QV+NW9NVwINTvKEdJhO+mfMirGVXHYTcmq/seFbyiiDPPFCGA/UlPFcy6CQVio5SSNHNOQqagrm2DWP4NPNLylj7KSHI5dRY3818bFn4oie3OSyw8+D1PJATW7WvuOCM8zSQwtXe0Ocm32gPq5YfGWh+ILkBnckN+iQ/Opc9Ij+E28tUh+JLDua8wAAAABJRU5ErkJggg==';
    var icon_middle = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAdUlEQVQ4y2NgwA/soZhkwAild0MxshhRgBlKr4diZDGibDYD4tVA/BiKV0PFSHJJPxD/h+J+UvzOhMRvh2IYYCI1LIgCTEhRBgrxzUC8BYi3AvE2KN4KFdsMVWOPrJdiA6gKqBqIZEcjVRIS2UmZapmJ6OwMALtlJWGTnZQcAAAAAElFTkSuQmCC';
    var icon_bottom = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAoElEQVQ4y7XSQQqCQBTG8RnSReS2vRfoPhKmna+VUNIhmgNJLeoL/g9mEeqIPfgx+Hx+KjPO/bm2SC7PekHcSwq4Y3HAFYsDbkgO2LD2iHuz3/6tDm7uV9jAQRp5oKE3GWI39xLkjUBvNMDzn3l0iALsMOXM+FWPq6WVcpZaTtLKES29mpkyfta2p+J/B3niBbsemKl+bW0mhewmFMyuUx+cJx+JRwKj+AAAAABJRU5ErkJggg==';

    $("#icon_top").attr("src", icon_top);
    $("#icon_middle").attr("src", icon_middle);
    $("#icon_bottom").attr("src", icon_bottom);

    // https://semantic-ui.com/modules/accordion.html#/settings
    $('.ui.accordion').accordion({
        exclusive: false,
        onChanging: getSetValues()
    }); // 세부설정 열고 닫기 
    $('.ui.form').form();
    $('select.dropdown').dropdown();
    $('.ui.dropdown').dropdown({
        fullTextSearch: true,
        allowReselection: true
    }); // https://semantic-ui.com/modules/dropdown.html#additional-settings   
    $('.ui.radio.checkbox').checkbox();
    $('.ui.checkbox').checkbox();

});

// http://www.htmldrive.net/items/show/713/simple-Dynamic-tabs-using-jQuery.html

// 자막 히스토리 
var countTabs = 1;
var countIds = 1;

function copyText() {
    //console.log("사작 : " + countTabs);

    if (countTabs > 10) {

        let lengthTabs = $("div[id*='tab']");
        //console.log("삭제할 tab: " + lengthTabs[0].id);
        let removeTabId = "#" + lengthTabs[0].id;
        $(removeTabId).remove();

        countTabs--;
    };

    //console.log("tab생성 : tab" + countTabs);
    var now = new Date(); // 현재 날짜 및 시간
    var copyText = document.getElementById("content").value;

    if (copyText) {
        navigator.clipboard.writeText(copyText)
            // 성공인 경우
            .then(() => {


                //console.log('클립보드에 복사 성공', copyText.value);
                var trimed = copyText.replace(/\s/gi, "");
                var historyName = countIds + "/" + trimed.substr(0, 6);
                //console.log("공백제거한 5글자: " + trimed.substr(0,5) );
                //if($('#restore').length){ alert('aaa') }; // 존재하는지 검사
                var historyBtn = "<div name='" + now + "' id = 'tab" + countIds + "' class='mini ui basic button' onclick='restore(this)'>" + historyName + "<a href='#' class='remove' onclick='remove(this)'>ⓧ</a></div>";
                var histroyTextArea = "<textarea id='" + now + "' style='display:none;'>" + copyText + "</textarea>";
                $("#history").append(historyBtn + histroyTextArea);


                countTabs++;
                countIds++;


            })
            // 실패인 경우
            .catch(err => {
                console.log('클립보드에 복사 실패', err);
            })
    }

}


function remove(val) {
    $(val).parent().remove();
    countTabs--;
    //console.log(countTabs);
}

function restore(val) {
    var id = $(val).attr("name");
    var restoreText = document.getElementById(id).value;
    if (restoreText) {
        navigator.clipboard.writeText(restoreText)
            // 성공인 경우
            .then(() => {
                $("#content").val(restoreText);
                $("#content").focus();
                $("#content").trigger('keyup');
            })
            // 실패인 경우
            .catch(err => {
                console.log('히스토리 복원 실패', err);
            })
    }
}


// 모든 문자열 대체 함수, https://mingggu.tistory.com/m/64
function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

// https://jsbin.com/lakikegepe/edit?html,js,console,output
// 1. 사용법 button class 에 button dynamic 지정
// 2. 필수설정 id, value
// 3. 동작 : 클릭시 id값이 value 값으로 지정되고 siblings에 의해 같은 depth의 값과 선택은 삭제
// 4. 단독 사용시 <div></div>로 버튼을 따로 감싸줌
$(document).ready(function() {
    $('.bible .button.dynamic').on('click', function() { // button dynamic 모두 적용됨
        //console.log(this.value);
        if ($(this).hasClass('active')) $(this).removeClass('active').val('');
        else $(this).addClass('active').val(this.id).siblings().removeClass('active').val('');
        getSetValues();
        //console.log(this.value);
    });
    //console.log( "ready!" );
});


function getSetValues() {

    // 테마선택 (defaultTheme, blackTheme, whiteTheme, greenTheme)
    var defaultTheme = "defaultTheme"; //default
    var themeVal = defaultTheme;
    if (themeVal === "") themeVal = defaultTheme; //선택된게 없으면 default 값
    if (themeVal === "defaultTheme") themeVal = '<div class="ui green label">기본</div>';
    $("#themeMsg").html(themeVal);

    // 본문정렬 (left, center, right, justify)
    var defaultAlign = "left"; //default
    var left = $("#left").val();
    var center = $("#center").val();
    var right = $("#right").val();
    var justify = $("#justify").val();
    var alignVal = left + center + right + justify;
    if (alignVal === "") alignVal = defaultAlign; //선택된게 없으면 default 값

    // 본문위치 (top, middle, bottom)
    var defaultVertical = "bottom"; //default
    var top = $("#top").val();
    var middle = $("#middle").val();
    var bottom = $("#bottom").val();
    var valignVal = top + middle + bottom;
    if (valignVal === "") valignVal = defaultVertical; //선택된게 없으면 default 값

    // 폰트스타일 (bold, italic, underline)
    var defaultFontStyle = "normal";
    var bold = $("#bold").val();
    var italic = $("#italic").val();
    var underline = $("#underline").val();
    var fontStyleVal = bold + italic + underline;
    if (fontStyleVal === "") fontStyleVal = defaultFontStyle; //선택된게 없으면 default 값
    else fontStyleVal = bold + " " + italic + " " + underline;

    // Layout
    var LyricsLayout = $("#LyricsLayout").val(); 

    // Font Face
    var LyricsFontface = $("#LyricsFontface").val();

    // Font Size
    var LyricsFontSize = $("#LyricsFontSize").val();

    // Font Family
    var line = $("#line").val();

    var fontFamily = "sans-serif";

    var msgFontface; // Ko Pub 돋움체 KoPubWorld돋움체_Pro Bold">Ko Pub 돋움체
    if (LyricsFontface === "KoPubWorld돋움체_Pro Bold") fontFamily = "'KoPubDotumMedium', sans-serif", msgFontface = "Ko Pub 돋움체";
    if (LyricsFontface === "G마켓 산스 Medium") fontFamily = "'GmarketSansLight', sans-serif", msgFontface = "G마켓 산스";
    if (LyricsFontface === "경기천년제목 Bold") fontFamily = "'GyeonggiTitleM', sans-serif", msgFontface = "경기천년제목";
    if (LyricsFontface === "나눔바른고딕 Bold") fontFamily = "'NanumBarunGothic', sans-serif", msgFontface = "나눔바른고딕";
    if (LyricsFontface === "나눔고딕 Bold") fontFamily = "'Nanum Gothic', sans-serif", msgFontface = "나눔고딕";
    if (LyricsFontface === "나눔명조 Bold") fontFamily = "'Nanum Myeongjo', serif", msgFontface = "나눔명조";

    document.getElementById("LyricsDownBtn").style.fontFamily = fontFamily;

    var message = "<b>레이아웃:</b> " + LyricsLayout +
        " | " + "<b>폰트:</b> " + msgFontface + "(" + fontStyleVal + ")" +
        " | " + "<b>폰트크기:</b> " + LyricsFontSize +
        " | " + "<b>본문정렬:</b> " + alignVal +
        " | " + "<b>본문위치:</b> " + valignVal;

    var btnMessage = msgFontface + "(" + LyricsFontSize + ")" + " | " + line + "줄 ";
    var lineMessage = line + "줄 ";

    $('.ui.table td').each(function() {
        $(this).removeClass("top middle bottom aligned").addClass(valignVal + " aligned").css({
            "font-family": fontFamily,
            "font-style": italic,
            "font-weight": bold,
            "text-decoration": underline,
        });
    });
    
    // 수평 정렬 적용하기 (tr)
    $('.ui.table tr').each(function() {
        $(this).removeClass("left center right justify aligned").addClass(alignVal + " aligned");
    });

    // 하이라이트 세팅
    var highlightColor = $("#highlight").val();
    $("#sampleText").css('background-color', highlightColor);
    $("#sampleText").css('text-shadow', '');


    $("#sampleText").css('color', '#FFFFFF');

    if (highlightColor === "none") { // 하이라이트가 없을 때
        $("#sampleText").css('background-color', '');
        $("#sampleText").css('text-shadow', '1px 1px 0px #000');
    }

    if (highlightColor === "#FFFF00" || highlightColor === "#FFFFFF") { // 하이라이트가 노란색이나 흰색일 때 글자색 검정
        $("#sampleText").css('color', '#000000');
        $("#sampleText").css('text-shadow', '');
    }

    // 메세지 출력
    $("#message").html(message);
    $("#LyricsBtnMsg").html(btnMessage);
    $("#lineMsg").html(lineMessage);

}

function setInitialize() {
	$('.ui.dimmer.subtitle').dimmer('hide');
    //$("#defaultTheme").addClass('active').val($("#defaultTheme").id).siblings().removeClass('active').val(''); // 테마 초기화
    $("#left").addClass('active').val($("#left").id).siblings().removeClass('active').val(''); // 본문 정렬 초기화  
    $("#bottom").addClass('active').val($("#bottom").id).siblings().removeClass('active').val(''); // 본문 위치 초기화
    $("#bold").removeClass('active').val(''); // bold 초기화
    $("#italic").removeClass('active').val(''); // italic 초기화  
    $("#underline").removeClass('active').val(''); // underline 초기화
    $('#line').dropdown('restore defaults'); // 줄수 초기화
    $('#LyricsLayout').dropdown('restore defaults'); // 레이아웃 초기화
    $('#LyricsFontface').dropdown('restore defaults'); // 폰트 페이스 초기화
    $('#LyricsLayout').dropdown('restore defaults');
    $('#LyricsFontSize').val('36'); // 폰트 크기 초기화
    $('#highlight').dropdown('restore defaults'); // 하이라이트 초기화
    $("#color-picker").val('#00FF00'); // 배경 색상 초기화  
    $("#color-picker").trigger('keyup'); // blur, focus, load, resize, scroll, unload, beforeunload, click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave, change, select, submit, keydown, keypress, and keyup
    $("#preview").css('backgroundColor', '#00FF00');
    $("#sampleText").css('backgroundColor', '#000000');
    $("#LyricsDownBtn").css('backgroundColor', '#00FF00');
    $("#LyricsDownBtn").css('color', '#FFFFFF');

    getSetValues();

}

function getTimestamp() { // 현재 타임스탬프 가져오기
    var dateNow = new Date();
    var dateMM = dateNow.getMonth() + 1;
    dateDD = dateNow.getDate();
    dateYY = dateNow.getFullYear(), h = dateNow.getHours();
    m = dateNow.getMinutes();
    return dateNow.getFullYear() + '' + (dateMM <= 9 ? '0' + dateMM : dateMM) + '' + (dateDD <= 9 ? '0' + dateDD : dateDD) + (h <= 9 ? '0' + h : h) + (m <= 9 ? '0' + m : m);
}

// TextArea에 입력된 내용을 정리하기
function assembleTextBox() {

    let content = $("#content").val();
    content = content.replace(/\n$/gm, ''); // 중복된 줄바꿈 제거하기
    content = content.replace(/\r$/gm, ''); // 중복된 엔터 제거하기
    content = content.replace(/\t$/gm, ''); // 중복된 탭 제거하기
    content = content.replace(/(^\s*)|(\s*$)/gm, ""); // 각 줄마다 앞 뒤 공백 제거
    content = content.replace(/,/gm, '&&&'); // 컴마(,)를 강제로 다른 문자(&&&)로 치환
    content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    
    if (content.trim().length < 1) {
        alert("텍스트를 입력해 주세요!");
        $("#content").val('');
        $("#content").empty();
        $("#content").focus();
        $("#content").trigger('keyup');
        return false;
    };

    let addContent = content.split('<br>');
    let cleanContent = $.map(addContent, $.trim); // 각 array 앞뒤 공백 제거
    let n = $("#line").val(); // 줄씩 자르기
    let divisionResult = cleanContent.division(n);
    let cleanInputVal = divisionResult.join('\n\n');

    cleanInputVal = cleanInputVal.replace(/,/gm, '\n');
    cleanInputVal = cleanInputVal.replace(/&&&/gm, ','); // 원래대로 &&& 문자를 컴마(,)로 치환
    //cleanInputVal = replaced_str.replace(/|/gm, '\n');

    $("#content").val(cleanInputVal);
    $("#content").focus();
    $("#content").trigger('keyup');
}

// 자막 생성 함수
function createSubTitle() {
	$('.ui.dimmer.subtitle').dimmer('show');
/*	
    //////////////// 수정 전 ///////////////
    var content = $("#content").val();
    content = content.replace(/\n$/gm, ''); // 중복된 줄바꿈 제거하기
    content = content.replace(/\r$/gm, ''); // 중복된 엔터 제거하기
    content = content.replace(/\t$/gm, ''); // 중복된 탭 제거하기
    content = content.replace(/(^\s*)|(\s*$)/gm, ""); // 각 줄마다 앞 뒤 공백 제거

    content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    if (content.trim().length < 1) {
        alert("텍스트를 입력해 주세요!");
        $("#content").val('');
        $("#content").empty();
        $("#content").focus();
        $("#content").trigger('keyup');
        
        return false;
    };
    
    var addContent = content.split('<br>');
    var cleanContent = $.map(addContent, $.trim); // 각 array 앞뒤 공백 제거
    var n = $("#line").val(); // 줄씩 자르기
    var resultContent = cleanContent.division(n);
*/

    //////////////// 수정 후 시작 (엔터값에 따라서 페이지 바꿈) ///////////////
    var content = $("#content").val();

    if (content.trim().length < 1) {
        alert("텍스트를 입력해 주세요!");
        $("#content").val('');
        $("#content").empty();
        $("#content").focus();
        $("#content").trigger('keyup');
        
        return false;
    };
    var n = $("#line").val(); // 줄씩 자르기
    var tempContent = content.replace(/\r\n/g,"\n").split("\n\n");
    tempContent = $.map(tempContent, $.trim);
    
    var resultContent = [];
    for (var i = 0; i < tempContent.length; i++) {
        if (tempContent != "") resultContent.push(tempContent[i]);
    }
    console.log(resultContent.length);

    //////////////// 수정 후 끝///////////////

    // ===================== 자막 PPTX 관련 =============================
    // PPT 파일 이름 셋팅
    //var lyricsTitle = resultContent[0][0].replace(/ /g, '').substring(0, 6);
      var lyricsTitle = resultContent[0][0].replace(/ /g, '').slice(0, 6);

    // align 정렬 값 가져오기
    // 본문정렬 (left, center, right, justify)
      var defaultAlign = "left"; //default
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
      
      // Text Highlight Color
      var highlightColor = $("#highlight").val();
      
      // Grow Color
      var glowColor = highlightColor;
      if (highlightColor === "none") glowColor = "#000000";
      
      
      //var fontHighlight = $("#highlight").val();
      //if (fontHighlight === "default") fontHighlight = backgroundColor; 
      //console.log("fontHighlight: " + fontHighlight);
      
      
	  // Background Image
	  var bgData = $("#file-content").text();
	  //console.log("bgData : " + bgData.length);
	  var bgOption = "";
	  if (bgData.length > 0) {
	  	bgOption = { image: { w: '100%', h: '100%', data:bgData, sizing: { type: 'cover', w: '100%', h: '100%' } } };
	  	};
	  //console.log("bgData : " + bgData);
	  
  
    // 1. Create a new Presentation
    let pres = new PptxGenJS();
    pres.layout = LyricsLayout;

    pres.addSection({
        title: lyricsTitle
    });

            var marginBT = 28.346 * 1.5; // 1cm(28.34) 1.5cm(42.519) 2cm(56.7) 3cm (85)
            var marginRL = 28.346 * 2.0; // 1cm(28.34) 1.5cm(42.519) 2cm(56.7) 3cm (85)

    // 마스터 슬라이드 정의하기
    
    
    let masterOpt = 	{ name: 'contents', type: 'body' };
	//masterOpt.paraSpaceAfter: 10,
	masterOpt.w = '100%';
	masterOpt.h = '100%';
	masterOpt.bold = bold;
	masterOpt.italic = italic;
	masterOpt.underline = underline;
	masterOpt.autoFit = true; //또는 (둘중 하나만) masterOpt.fit = 'shrink';
	masterOpt.fontSize = LyricsFontSize;
	masterOpt.fontFace = LyricsFontface;
	masterOpt.valign = lyricsValign;
	masterOpt.align = lyricsAlign;
	masterOpt.charSpacing = 0; //-1
	masterOpt.margin = [marginRL, marginRL, marginBT, marginBT];
	masterOpt.color = 'FFFFFF'; //글자색 기본 흰색
    
    if (highlightColor != "none") { //하이라이트가 있을때 glow 값을 3으로
    	masterOpt.glow = {size:3, opacity:1.0, color:glowColor};
    }

    if (highlightColor === "none") { //하이라이트가 없을때는 아웃라인과 라인스페이스 추가
    	masterOpt.outline = {size: 0.5, color:'000000'}; //{size: 0.5, color:'000000'};
    	masterOpt.lineSpacing = LyricsFontSize * 1.025;
    	masterOpt.glow = {size:2, opacity:1.0, color:glowColor}; //{size:2, opacity:1.0, color:glowColor};
    }
    
    if (highlightColor === "#FFFF00" || highlightColor === "#FFFFFF") { // 하이라이트가 노란색이나 흰색일 때 글자색 검정
    	masterOpt.color = '000000';
    }
	
	
	                	
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
        
        //background: backgroundVal,
        bkgd: backgroundColor,
        //bkgd: {data : "blob:https://david97.synology.me/41d975e6-97fd-479f-be94-afe1fb8ff406"},
        
        objects: [
        	bgOption, //{ image: { w: '100%', h: '100%', data:bgData, sizing: { type: 'cover', w: '100%', h: '100%' } } },
			//{ rect: { x: 0.0, y: 6.9, w: "100%", h: 0.6, fill: { color: "003b75" } }},

	    	{
	            placeholder: {
	            	options: masterOpt,
	                text: "",
	            },
	        },
        ]

    }); // 마스터 슬라이드


    $.each(resultContent, function(index, item) {
        if (resultContent[index].length != 0) {
            //console.log(index + 1 + "페이지: " + item);
            var lyrics = item;//item.join("\n"); 수정 전

            // ============== PPT 슬라이드 생성 ================= //
            // 1cm * 28.346 LRBT 왼 오 아 위 [56.7, 56.7, 28.34, 85] 기준 2cm, 2cm, 1cm, 3cm
            var marginBT = 28.346 * 1.5; // 1cm(28.34) 1.5cm(42.519) 2cm(56.7) 3cm (85)
            var marginRL = 28.346 * 1.5; // 1cm(28.34) 1.5cm(42.519) 2cm(56.7) 3cm (85)

            var slide = pres.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
                sectionTitle: lyricsTitle
            });

            
            //slide.background = { path: bgData };            
            let placeholderOpt = { placeholder: 'contents' };
            let shadowOpt = {shadow: {type:'outer', angle: 45, blur: 3, color:'000000', offset: 1, opacity: 1.0}};
            
            
            if (highlightColor != "none") {
            	placeholderOpt.highlight = highlightColor;
            	shadowOpt = null;
            }
            
            
            let lyricsOptions = Object.assign(placeholderOpt, shadowOpt); // 두개 옵션 합치기

            
            //console.log("lyricsOptions: " + lyricsOptions);
            slide.addText(lyrics,  lyricsOptions);
            
            /*
            slide.addText(lyrics, {
                placeholder: 'contents',              
                //isTextBox: true,
				//valign: lyricsValign,
				//align: lyricsAlign,
                shadow: {type:"outer", angle: 45, blur: 3, color:"000000", offset: 1, opacity: 1.0} // 각도 45, 흐리게 0.1, 색 000, 간격 1, 투명도 0
            });
            */

            // ============== PPT 슬라이드 생성 ================= //

            //console.log(index + 1 + "페이지: " + lyrics);

        }
    });

    // PPT 파일 다운로드
    pres.writeFile({ fileName: lyricsTitle + "_" + getTimestamp() }, function(blob){console.log(blob);},'blob');
    $('.ui.dimmer.subtitle').dimmer('hide');
    copyText();

}
