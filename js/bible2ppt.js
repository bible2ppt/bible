/**
*. make bible to ppt
*/
    var show_debug = false;
    var bibleArrays = {"창세기":50,"출애굽기":40,"레위기":27,"민수기":36,"신명기":34,"여호수아":24,"사사기":21,"룻기":4,"사무엘상":31,"사무엘하":24,"열왕기상":22,"열왕기하":25,"역대상":29,"역대하":36,"에스라":10,"느헤미야":13,"에스더":10,"욥기":42,"시편":150,"잠언":31,"전도서":12,"아가":8,"이사야":66,"예레미야":52,"예레미야애가":5,"에스겔":48,"다니엘":12,"호세아":14,"요엘":3,"아모스":9,"오바댜":1,"요나":4,"미가":7,"나훔":3,"하박국":3,"스바냐":3,"학개":2,"스가랴":14,"말라기":4,"마태복음":28,"마가복음":16,"누가복음":24,"요한복음":21,"사도행전":28,"로마서":16,"고린도전서":16,"고린도후서":13,"갈라디아서":6,"에베소서":6,"빌립보서":4,"골로새서":4,"데살로니가전서":5,"데살로니가후서":3,"디모데전서":6,"디모데후서":4,"디도서":3,"빌레몬서":1,"히브리서":13,"야고보서":5,"베드로전서":5,"베드로후서":3,"요한1서":5,"요한2서":1,"요한3서":1,"유다서":1,"요한계시록":22}     


    var oldArrays = ["창세기","출애굽기","레위기","민수기","신명기","여호수아","사사기","룻기","사무엘상","사무엘하","열왕기상","열왕기하","역대상","역대하","에스라","느헤미야","에스더","욥기","시편","잠언","전도서","아가","이사야","예레미야","예레미야애가","에스겔","다니엘","호세아","요엘","아모스","오바댜","요나","미가","나훔","하박국","스바냐","학개","스가랴","말라기"]

    var newArrays = ["마태복음","마가복음","누가복음","요한복음","사도행전","로마서","고린도전서","고린도후서","갈라디아서","에베소서","빌립보서","골로새서","데살로니가전서","데살로니가후서","디모데전서","디모데후서","디도서","빌레몬서","히브리서","야고보서","베드로전서","베드로후서","요한1서","요한2서","요한3서","유다서","요한계시록"]

    var oldAndNewArrays = oldArrays.concat(newArrays)//두 배열 합치기       

    $.each(bibleArrays, function(index, item) {
        //if(show_debug) console.log("bibleArrays: " + index);
        var option = $("<option>"+index+"</option>");
        $('#book').append(option);             
    });

    function oldAndNewChange(){ // 신구약 선택
        //$('#chapter').prop('disabled', false);
        var selectItem = $("#oldAndNew").val();
        if(show_debug) console.log(selectItem);
        $('#book').empty();
        $('#chapter').prop('disabled', false);
        $('#btn1').prop('disabled', false);
        $('#btn1').removeClass('basic');
        var selectedArray = oldAndNewArrays;
        if(selectItem == '전체') {selectedArray = oldAndNewArrays}
        if(selectItem == '구약') {selectedArray = oldArrays}
        if(selectItem == '신약') {selectedArray = newArrays}

        $.each(selectedArray, function(index, item) {
            var option = $("<option>"+item+"</option>");
            $('#book').append(option);         
        });      
        bookChange();
    }        

    function bookChange(){ // 책이름 선택

        var selectBook = $("#book").val();
        var num = bibleArrays[selectBook];

        if(num == "undefined" || num == null || num == "") { // -- 책이름 -- 을 선택했을 때
            $('#chapter').empty();
            $('#chapter').append($("<option>--장--</option>"));
            $('#chapter').prop('disabled', true);

            $("#chapterName").html("다운로드"); 
            $('#btn1').prop('disabled', true);
            $('#btn1').addClass('basic');              
            return false;
        }

        $('#chapter').prop('disabled', false);
        $('#btn1').prop('disabled', false);
        $('#btn1').removeClass('basic');
        
        var selectChapter = $("#chapter").val();
        $("#chapterName").html(selectBook + " " +selectChapter + "장 다운로드");

        var chapter = [];
        for (var i = 0; i < num; i++) {
            chapter.push(i+1);
        }

        $('#chapter').empty();

        $.each(chapter, function(index, item) {
            var option = $("<option>"+item+"</option>");
            $('#chapter').append(option);             
        });
        //if(show_debug) console.log(num);
        if(chapter == '') { // 선택되지 않거나 정의되지 않았을 때
            var option = $("<option>--장--</option>");
            $('#chapter').append(option);  
            $('#chapter').prop('disabled', 'disabled');
        }
        chapterChange();
    }

    function chapterChange(){ // 장 선택
        var selectBook = $("#book").val();
        var selectChapter = $("#chapter").val();
        $("#chapterName").html(selectBook + " " +selectChapter + "장 다운로드");         
    }        

    // 새로 삽입 2021-01-14

    var bibleNumberArray = [{"name": "창세기", "number": 1},{"name": "출애굽기", "number": 2},{"name": "레위기", "number": 3},{"name": "민수기", "number": 4},{"name": "신명기", "number": 5},{"name": "여호수아", "number": 6},{"name": "사사기", "number": 7},{"name": "룻기", "number": 8},{"name": "사무엘상", "number": 9},{"name": "사무엘하", "number": 10},{"name": "열왕기상", "number": 11},{"name": "열왕기하", "number": 12},{"name": "역대상", "number": 13},{"name": "역대하", "number": 14},{"name": "에스라", "number": 15},{"name": "느헤미야", "number": 16},{"name": "에스더", "number": 17},{"name": "욥기", "number": 18},{"name": "시편", "number": 19},{"name": "잠언", "number": 20},{"name": "전도서", "number": 21},{"name": "아가", "number": 22},{"name": "이사야", "number": 23},{"name": "예레미야", "number": 24},{"name": "예레미야애가", "number": 25},{"name": "에스겔", "number": 26},{"name": "다니엘", "number": 27},{"name": "호세아", "number": 28},{"name": "요엘", "number": 29},{"name": "아모스", "number": 30},{"name": "오바댜", "number": 31},{"name": "요나", "number": 32},{"name": "미가", "number": 33},{"name": "나훔", "number": 34},{"name": "하박국", "number": 35},{"name": "스바냐", "number": 36},{"name": "학개", "number": 37},{"name": "스가랴", "number": 38},{"name": "말라기", "number": 39},{"name": "마태복음", "number": 40},{"name": "마가복음", "number": 41},{"name": "누가복음", "number": 42},{"name": "요한복음", "number": 43},{"name": "사도행전", "number": 44},{"name": "로마서", "number": 45},{"name": "고린도전서", "number": 46},{"name": "고린도후서", "number": 47},{"name": "갈라디아서", "number": 48},{"name": "에베소서", "number": 49},{"name": "빌립보서", "number": 50},{"name": "골로새서", "number": 51},{"name": "데살로니가전서", "number": 52},{"name": "데살로니가후서", "number": 53},{"name": "디모데전서", "number": 54},{"name": "디모데후서", "number": 55},{"name": "디도서", "number": 56},{"name": "빌레몬서", "number": 57},{"name": "히브리서", "number": 58},{"name": "야고보서", "number": 59},{"name": "베드로전서", "number": 60},{"name": "베드로후서", "number": 61},{"name": "요한1서", "number": 62},{"name": "요한2서", "number": 63},{"name": "요한3서", "number": 64},{"name": "유다서", "number": 65},{"name": "요한계시록", "number": 66}];



function readTextFile(fileName, selectVersion, selectBook, selectChapter) { //  txt 파일 읽기

///////////////////////////////////////////////////////////////////////////////////////
            //PPT에 들어갈 변수
            // 이미지
            var bibleBkg = { path:'img/bible_bg.jpg' }; // 마스터 배경 이미지
            var objImg = { path:'img/NSHC_logo.png', x:4.6, y:3.5, w:4, h:1.8 }; // 로고

            /*
            여기에 바이블 역본 selectVersion 언어에 따른 bibleName 새로 셋팅하기
            */


            var bibleName = selectVersion; //바이블 역본 이름
            if(show_debug) console.log ("bibleName :" + bibleName);              
            
            // 폰트 및 색상
            var FONT_FACE = '나눔바른고딕'; //폰트지정
            var COLOR_TITLE = 'FFFFFF';
            var COLOR_BODY = 'FFFFFF';
            var BibleFontSize = 40;



            // PPTX 선언

            var pptx = new PptxGenJS();
            var pLayout = 'LAYOUT_WIDE'; // LAYOUT_WIDE (fontSize:34, lineSpacing:50), LAYOUT_4x3 (fontSize:32, lineSpacing:40)
            pptx.layout = pLayout; // default 값

            // 마스터 슬라이드 정의하기
            pptx.defineSlideMaster({
                title: 'MASTER_BIBLE',
                // background: bibleBkg, <- 배경이미지 경로
                background: { color: "334655", transparency: 0 },
                //margin:  [ 0.5, 0.25, 1.0, 0.25 ], // 1cm * 28.346 LRBT 왼 오 아 위
                //slideNumber: { x:0.6, y:7.0, color:'FFFFFF', align:'left', valign:'middle', fontFace:FONT_FACE, fontSize:12 },
                objects: [
                    //{ 'rect':  { x: 0.00, y:6.90, w:'100%', h:0.6, fill:{color:'003b75'} } },
                    //{ 'image': { x:11.45, y:5.95, w:1.67, h:0.75, data:starlabsLogoSml } },
                    { 'placeholder':
                        {
                            text: 'Insert your title',
                            options: { 
                                name:'title', type:'title', 
                                x:0.0, y:0.2, w:'100%', h:1.0, 
                                align:'right',
                                isTextBox:true, 
                                fit: 'shrink',
                                fontSize:20, 
                                color:COLOR_TITLE, 
                                fontFace:FONT_FACE
                            }
                            
                        }
                    },
                    { 'placeholder':
                        {
                            text: 'Insert your body text',
                            options: { 
                                name:'body', type:'body', 
                                w:'100%', h:'100%', 
                                color:COLOR_BODY, 
                                fontFace:FONT_FACE,
                                fontSize: BibleFontSize,
                                lineSpacing: BibleFontSize * 1.35, // 50
                                charSpacing: 0,
                                bold: false,
                                underline: false,
                                isTextBox: true,
                                align:'justify',
                                fit: 'shrink',
                                glow:{size:0, opacity:0.8, color:'000000'}, // glow:{size:7, opacity:0.8, color:'000000'},
                                //outline:{size:0, color:'000000'}, // outline:{size:0.75, color:'000000'},

                            }                   
                        }
                    }

                ]
            }); // 마스터 슬라이드                       
///////////////////////////////////////////////////////////////////////////////////////




        $.get(fileName, function(data) {
            data = data.replace(/\n$/gm, ''); // 중복된 줄바꿈 제거하기
            data = data.replace(/\r$/gm, ''); // 중복된 엔터 제거하기
            data = data.replace(/\t$/gm, ''); // 중복된 탭 제거하기
            data = data.replace(/(^\s*)|(\s*$)/gm, ""); // 각 줄마다 앞 뒤 공백 제거

            data = data.trim(); //앞 뒤 공백 제거

            if(show_debug) console.log(data);

            var lines = data.split("\n");

            lines = $.map(lines, $.trim); // 각 array 앞뒤 공백 제거

            if(show_debug) console.log(lines);

            var lineLength = lines.length; // 총길이


            let book = selectBook; //책이름
            let num = selectChapter; //장
            let chapter = book + ' ' + num + '장';

            pptx.addSection({
                title: chapter
            });
            let vLength = lineLength;                


            //$('#myContainer').append('<div>' + decodeURI(fileName)); //검수
            //$('#myContainer').append('<div>총 ' + lineLength + ' 절<br />'); //검수    
                
            $.each(lines, function(n, elem) {

                elem = elem.trim(); // 앞 뒤 공백 제거

                var God = $("#God").is(":checked");
                var Jehovah = $("#Jehovah").is(":checked");
                var Baptism = $("#Baptism").is(":checked");

                if (God == true) elem = elem.replace(/하느님/gi, '하나님');
                if (Jehovah == true) elem = elem.replace(/야훼/gi, '여호와');
                if (Baptism == true) elem = elem.replace(/세례/gi, '침례');

                //elem = elem.replace('세례', '침례'); // 세례 => 침례
                //elem = elem.replace('하느님', '하나님'); // 하느님 => 하나님
                //elem = elem.replace('야훼', '여호와'); // 야훼 => 여호와

                elem = elem.split('\t');

                elem.length; // 탭으로 나눈 수 (기본적으로 3)

                var rtrText = elem[1] + "  " + elem[2];
                if (elem.length > 3) { // 탭수가 3이상일 경우(영문버전 등) 앞 숫자 제외하고 나머지 문자열 합치기
                    rtrText = elem[1] + "  ";
                    for(i=0; i < elem.length - 2; i++){
                        rtrText +=  elem[i + 2];
                    }
                }

                    createSlides(pptx, chapter, rtrText, vLength, n+1);

                //$('#myContainer').append('<div>'+ '탭수: ' + elem.length + ' | ' + rtrText + '</div>'); //검수
            }); //Each


            //pptx.writeFile(selectVersion + '_' +selectBook + '_' + selectChapter + '장');
            pptx.writeFile({ fileName: selectVersion + '_' +selectBook + '_' + selectChapter + '장' });
            
            $('.ui.dimmer.bible').dimmer('hide');
            //return false;

        }); // getFile

    function createSlides(pptx, chapter, result, vLength, index) {
        let slide = pptx.addSlide({masterName:'MASTER_BIBLE', sectionTitle:chapter});
        slide.addText(chapter, { placeholder:'title', valign: 'middle', margin: [56.7, 56.7, 0, 0] });

        slide.addText(result, { 
            placeholder:'body',
            fit: 'shrink',
            valign: 'top',
            margin: [56.7, 56.7, 28.34, 85] // margin: 30 
        }); // 1cm * 28.346 LRBT 왼 오 아 위 [56.7, 56.7, 28.34, 85] 기준 2cm, 2cm, 1cm, 3cm

        slide.addText(bibleName, {x:'25%', y:6.9, w:'50%', h:0.6, align:'center', valign:'middle', margin: [56.7, 56.7, 0, 0], color:COLOR_TITLE, fontSize:14, fontFace:FONT_FACE });
        slide.addText(index + ' / ' + vLength, {x:'50%', y:6.9, w:'50%', h:0.6, align:'right', valign:'middle', margin: [56.7, 56.7, 0, 0], color:COLOR_TITLE, fontSize:14, fontFace:FONT_FACE });
    };


} // readTextFile

    // var dataUrl = encodeURI("bibleDB/공동번역/4_민수기_31장.txt");

function readExecute() {

    if(confirm($("#loadVersion").children("option:selected").text() + " | " + $('#book').val() + " " + $('#chapter').val() + "장을 다운로드 하시겠습니까?") == false) {
        return false;
    }
    
    $('.ui.dimmer.bible').dimmer('show');

    var selectVersion = $("#loadVersion").val(); // 역본이름
    if(show_debug) console.log(selectVersion);
    var selectBook = $("#book").val(); // 책이름
    var selectChapter = $("#chapter").val(); // 장

    const found = bibleNumberArray.find(element => element.name == selectBook);
    var selectBookNum = found.number;
    if(show_debug) console.log(found.name + found.number);

    // "bibleDB" + "/" + "공동번역" + "/" + "4" + "_" + selectBook + "_" + selectChapter + "장.txt";

    var dataUrl = encodeURI("bibleDB" + "/") + selectVersion + encodeURI("/" + selectBookNum + "_" + selectBook + "_" + selectChapter + "장.txt");
    if(show_debug) console.log(dataUrl);
    readTextFile(dataUrl, selectVersion, selectBook, selectChapter); // 텍스트 파일 읽기         
}
