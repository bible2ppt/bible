/**
* NAME: demos.js
* AUTH: Brent Ely (https://github.com/gitbrent/)
* DESC: Common test/demo slides for all library features
* DEPS: Used by various demos (./demos/browser, ./demos/node, etc.)
* VER.: 3.3.1
* BLD.: 20200823
*/

var isIE11 = typeof window !== 'undefined' && !!window['MSInputMethodContext'] && !!document['documentMode'];
// Detect Node.js (NODEJS is ultimately used to determine how to save: either `fs` or web-based, so using fs-detection is perfect)
var NODEJS = false;
{
	// NOTE: `NODEJS` determines which network library to use, so using fs-detection is apropos.
	if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' && typeof window === 'undefined' ) {
		try {
			require.resolve('fs');
			NODEJS = true;
		}
		catch (ex) {
			NODEJS = false;
		}
	}
}
if (NODEJS) { var LOGO_STARLABS; }

// Constants
var TESTMODE = false
var CUST_NAME = 'David';
var USER_NAME = 'David Sung';
var CHROMA_KEY = '00FF00'; // 크로마키 값 ( 또는 008000 )
var FONT_FACE = '나눔바른고딕'; //  NanumBarunGothic, Arial, Courier



var COLOR_RED = 'FF0000';
var COLOR_AMB = 'F2AF00';
var COLOR_GRN = '7AB800';
var COLOR_CRT = 'AA0000';
var COLOR_BLU = '0088CC';
var COLOR_UNK = 'A9A9A9';
var ARRSTRBITES = [130];
var CHARSPERLINE = 130; // "Open Sans", 13px, 900px-colW = ~19 words/line ~130 chars/line
// Lorem text / base64 images
{
	// Pre-Encoded (base64) images (if any)
	var checkGreen =
		'data:image/png;base64,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';
	var starlabsLogoSml =
		'data:image/png;base64,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';

}
var gArrNamesF = ['Markiplier','Jack','Brian','Paul','Ev','Ann','Michelle','Jenny','Lara','Kathryn'];
var gArrNamesL = ['Johnson','Septiceye','Lapston','Lewis','Clark','Griswold','Hart','Cube','Malloy','Capri'];
var gStrHello = 'BONJOUR - CIAO - GUTEN TAG - HELLO - HOLA - NAMASTE - OLÀ - ZDRAS-TVUY-TE - こんにちは - 你好';
var gOptsTabOpts = { x:0.5, y:0.13, colW:[9,3.33] }; // LAYOUT_WIDE w=13.33
var gOptsTextL = { color:'9F9F9F', margin:3, border:[null,null,{pt:'1',color:'CFCFCF'},null] };
var gOptsOptsR = { color:'9F9F9F', margin:3, border:[0,0,{pt:'1',color:'CFCFCF'},0], align:'right' };
var gOptsTextR = { text:'PptxGenJS', options:gOptsOptsR };
var gOptsCode = { color:'9F9F9F', margin:3, border:{pt:'1',color:'CFCFCF'}, fill:{color:'F1F1F1'}, fontFace:FONT_FACE, fontSize:12 };
var gOptsSubTitle = { x:0.5, y:0.7, w:4, h:0.3, fontSize:18, fontFace:FONT_FACE, color:'0088CC', fill:{color:'FFFFFF'} };
var gDemoTitleText = { fontSize:14, color:'0088CC', bold:true };
var gDemoTitleTextBk = { fontSize:14, color:'0088CC', bold:true, breakLine:true };
var gDemoTitleOpts = { fontSize:13, color:'9F9F9F' };
var gPaths = {
	'starlabsBkgd': { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/images/starlabs_bkgd.jpg' },
	'starlabsLogo': { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/images/starlabs_logo.png' },
	'wikimedia1'  : { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/images/wiki-example.jpg' },
	'wikimedia2'  : { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/images/png-gradient-hex.png' },
	'wikimedia_svg': { path:'https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@master/demos/common/images/lock-green.svg' },
	'ccCopyRemix'  : { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/images/cc_copyremix.gif' },
	'ccLogo'       : { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/images/cc_logo.jpg' },
	'ccLicenseComp': { path:'common/images/cc_license_comp.png' },
	'ccDjGif'      : { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/images/cc_dj.gif' },
	'gifAnimTrippy': { path:'https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@latest/demos/common/images/trippy.gif' },
	'chicagoBean'  : { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/images/chicago_bean_bohne.jpg?op=paramTest&ampersandTest' },
	'tokyoSubway' : { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/images/tokyo-subway-route-map.jpg' },
	'sample_avi': { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/media/sample.avi' },
	'sample_m4v': { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/media/sample.m4v' },
	'sample_mov': { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/media/sample.mov' },
	'sample_mp4': { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/media/sample.mp4' },
	'sample_mpg': { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/media/sample.mpg' },
	'sample_mp3': { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/media/sample.mp3' },
	'sample_wav': { path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/master/demos/common/media/sample.wav' }
}

// ==================================================================================================================

function getTimestamp() {
	var dateNow = new Date();
	var dateMM = dateNow.getMonth() + 1; dateDD = dateNow.getDate(); dateYY = dateNow.getFullYear(), h = dateNow.getHours(); m = dateNow.getMinutes();
	return dateNow.getFullYear() +''+ (dateMM<=9 ? '0' + dateMM : dateMM) +''+ (dateDD<=9 ? '0' + dateDD : dateDD) + (h<=9 ? '0' + h : h) + (m<=9 ? '0' + m : m);
}

// ==================================================================================================================

function runEveryTest() {
	return execGenSlidesFuncs( ['Master', 'Bible', 'Hymn', 'Lyrics2Top', 'Lyrics2Bottom', 'Text', 'Table'] );

	// NOTE: Html2Pptx needs table to be visible (otherwise col widths are even and look horrible)
	// ....: Therefore, run it mnaually. // if ( typeof table2slides1 !== 'undefined' ) table2slides1();
}

function execGenSlidesFuncs(type, pTitle, pContents) {
	// STEP 1: Instantiate new PptxGenJS object
	var pptx;
	var marginT = 0.5 // [ 0.5, 0.25, 1.0, 0.25 ]
	var marginR = 0.25 // [ 0.5, 0.25, 1.0, 0.25 ]
	var marginB = 1.0 // [ 0.5, 0.25, 1.0, 0.25 ]
	var marginL = 0.25 // [ 0.5, 0.25, 1.0, 0.25 ]


	if ( NODEJS ) {
		var PptxGenJsLib;
		var fs = require('fs');
		// TODO: we dont use local anymore as of 3.1
		if (fs.existsSync('dist/pptxgen.cjs.js')) {
			PptxGenJsLib = require('dist/pptxgen.cjs.js'); // for LOCAL TESTING
		}
		else {
			PptxGenJsLib = require("pptxgenjs");
		}
		pptx = new PptxGenJsLib();
		var base64Images = require('dist/base64Images.js');
		LOGO_STARLABS = base64Images.LOGO_STARLABS();
	}
	else {
		pptx = new PptxGenJS();
	}

	// STEP 2: Set Presentation props (as QA test only - these are not required)
	pptx.title = 'PptxGenJS로 PPTX 만들기';
	pptx.subject = 'PptxGenJS Suite Export';
	pptx.author = '성준영';
	pptx.company = CUST_NAME;
	pptx.revision = '15';

	// STEP 3: Set layout
	pptx.layout = 'LAYOUT_WIDE';

	// STEP 4: Create Master Slides (from the old `pptxgen.masters.js` file - `gObjPptxMasters` items)
	{

		var objBkg = { path:'img/ppt-bg.jpeg' }; // 마스터 배경 이미지
		var bibleBkg = { path:'img/bible_bg.jpg' }; // 마스터 배경 이미지
		var objImg = { path:'img/NSHC_logo.png', x:4.6, y:3.5, w:4, h:1.8 }; // 로고

		// 타이틀 슬라이드
		pptx.defineSlideMaster({
			title: 'TITLE_SLIDE',
			background: objBkg,
			//bkgd: objBkg, // TEST: @deprecated
			objects: [
				//{ 'line':  { x:3.5, y:1.0, w:6.0, h:0.0, line:{color:'0088CC'}, lineSize:5 } },
				//{ 'chart': { type:'PIE', data:[{labels:['R','G','B'], values:[10,10,5]}], options:{x:11.3, y:0.0, w:2, h:2, dataLabelFontSize:9} } },
				//{ 'image': { x:11.3, y:6.4, w:1.67, h:0.75, data:starlabsLogoSml } },
				{ 'rect':  { x: 0.0, y:5.7, w:'100%', h:0.75, fill:{color:'F1F1F1'} } },
				{ 'text':
					{
						text: 'Global IT & Services :: Status Report',
						options: { x: 0.0, y: 5.7, w: '100%', h: 0.75, fontFace: FONT_FACE, color: '363636', fontSize: 20, align: 'left', valign: 'bottom', margin: 0 }
					}
				}
			]
		});

		// 빈화면 슬라이드
		pptx.defineSlideMaster({
			title: 'MASTER_PLAIN',
			background: { fill: 'FFFFFF' },
			margin:  [ marginT, marginR, marginB, marginL ],
			objects: [
				{ 'rect':  { x: 0.00, y:6.90, w:'100%', h:0.6, fill:{color:'003b75'} } },
				//{ 'image': { x:11.45, y:5.95, w:1.67, h:0.75, data:starlabsLogoSml } },
				{ 'text':
					{
						options: {x:0, y:6.9, w:'100%', h:0.6, align:'center', valign:'middle', color:'FFFFFF', fontSize:12, fontFace:FONT_FACE},
						text: 'Create by David Sung'
					}
				}
			],
			slideNumber: { x:0.6, y:7.1, color:'FFFFFF', fontFace:FONT_FACE, fontSize:10 }
		});


		// 바이블 슬라이드
		pptx.defineSlideMaster({
			title: 'MASTER_BIBLE',
			background: bibleBkg,
			margin:  [ marginT, marginR, marginB, marginL ],
			slideNumber: { x:0.6, y:7.1, color:'FFFFFF', fontFace:FONT_FACE, fontSize:10 },
			objects: [
				//{ 'rect':  { x: 0.00, y:6.90, w:'100%', h:0.6, fill:{color:'003b75'} } },
				//{ 'image': { x:11.45, y:5.95, w:1.67, h:0.75, data:starlabsLogoSml } },
				{ 'placeholder':
					{
						options: { name:'title', type:'title', x:0.6, y:0.2, w:12, h:1.0, align:'right', fontSize:15, valign:'middle', color:'FFFFFF', fontFace:FONT_FACE},
						text: 'Insert your title'
					}
				},
				{ 'placeholder':
					{
						options: { name:'body', type:'body', x:0.6, y:1.5, w:12, h:5.25, fontSize:30, autoFit:true, color:'FFFFFF', fontFace:FONT_FACE},
						text: 'Insert your text'
					}
				}
			]
		});



		// MASTER_SLIDE (MASTER_PLACEHOLDER)
		// https://gitbrent.github.io/PptxGenJS/docs/api-text.html
		pptx.defineSlideMaster({
			title: 'MASTER_SLIDE',
			background: { fill: 'F1F1F1' },
			//margin:  [ marginT, marginR, marginB, marginL ],
			slideNumber: { x:0.6, y:7.1, color:'FFFFFF', fontFace:FONT_FACE, fontSize:10 },
			objects: [
				//{ 'rect':  { x: 0.00, y:6.90, w:'100%', h:0.6, fill:{color:'003b75'} } },
				//{ 'image': { x:11.45, y:5.95, w:1.67, h:0.75, data:starlabsLogoSml } },
				{ 'placeholder':
					{
						text: 'Insert your title',						
						options: { name:'title', type:'title', x:0.6, y:0.2, w:12, h:1.0, align:"right", fontSize:20, fontFace:FONT_FACE}

					}
				},
				{ 'placeholder':
					{
						text: 'Insert text',						
						options: { name:'body', type:'body', x:0.6, y:1.5, w:12, h:5.25, fontSize:36, autoFit:true, fontFace:FONT_FACE}
					}
				}
			]
		});

		// THANKS_SLIDE (THANKS_PLACEHOLDER)
		pptx.defineSlideMaster({
			title: 'THANKS_SLIDE',
			bkgd: '36ABFF', // BACKWARDS-COMPAT/DEPRECATED CHECK (`bkgd` will be removed in v4.x)
			objects: [
				{ 'rect':  { x:0.0, y:3.4, w:'100%', h:2.0, fill:{color:'FFFFFF'} } },
				{ 'placeholder': { options:{ name:'thanksText', type:'title', x:0.0, y:0.9, w:'100%', h:1, fontFace:FONT_FACE, color:'FFFFFF', fontSize:60, align:'center' } } },
				{ 'image': objImg },
				{ 'placeholder':
					{
						options: { name:'body', type:'body', x:0.0, y:6.45, w:'100%', h:1, fontFace:FONT_FACE, color:'FFFFFF', fontSize:32, align:'center' },
						text: '(add homepage URL)'
					}
				}
			]
		});

		// PLACEHOLDER_SLIDE
		/* FUTURE: ISSUE#599
		pptx.defineSlideMaster({
		  title : 'PLACEHOLDER_SLIDE',
		  margin: [0.5, 0.25, 1.00, 0.25],
		  bkgd  : 'FFFFFF',
		  objects: [
			  { 'placeholder':
			  	{
					options: {type:'body'},
					image: {x:11.45, y:5.95, w:1.67, h:0.75, data:starlabsLogoSml}
				}
			},
			  { 'placeholder':
				  {
					  options: { name:'body', type:'body', x:0.6, y:1.5, w:12, h:5.25 },
					  text: '(supports custom placeholder text!)'
				  }
			  }
		  ],
		  slideNumber: { x:1.0, y:7.0, color:'FFFFFF' }
	  });*/

		// MISC: Only used for Issues, ad-hoc slides etc (for screencaps)
		pptx.defineSlideMaster({
			title: 'DEMO_SLIDE',
			objects: [
				{ 'rect':  { x:0.0, y:7.1, w:'100%', h:0.4, fill:{color:'F1F1F1'} } },
				{ 'text':  { text:'PptxGenJS - JavaScript PowerPoint Library - (github.com/gitbrent/PptxGenJS)', options:{ x:0.0, y:7.1, w:'100%', h:0.4, color:'6c6c6c', fontSize:10, align:'center', fontFace:FONT_FACE } } }
			]
		});
	}

	// STEP 5: Run requested test
	eval( 'genSlides_'+type+'(pptx, pTitle, pContents)' );



	/*
	var arrTypes = ( typeof type === 'string' ? [type] : type );
	arrTypes.forEach(function(type,idx){
		//if (console.time) console.time(type);
		eval( 'genSlides_'+type+'(pptx)' );
		//if (console.timeEnd) console.timeEnd(type);
	});
	*/

	// LAST: Export Presentation
	if ( NODEJS ) {
		return pptx.writeFile('PptxGenJS_Demo_Node_'+type+'_'+getTimestamp());
	}
	else {
		return pptx.writeFile('PptxGenJS_Demo_Browser_'+type+'_'+getTimestamp());
	}
}

function genSlides_Bible(pptx, pTitle, pContents) {

	pptx.addSection({ title: pTitle });

	var slide1 = pptx.addSlide({masterName:'TITLE_SLIDE', sectionTitle:pTitle});
	//var slide1 = pptx.addSlide({masterName:'TITLE_SLIDE', sectionTitle:'FAILTEST'}); // TEST: Should show console warning ("title not found")
	slide1.addNotes('Master name: `TITLE_SLIDE`\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');

	var slide2 = pptx.addSlide({masterName:'MASTER_SLIDE', sectionTitle:pTitle});
	slide2.addNotes('Master name: `MASTER_SLIDE`\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide2.addText('', { placeholder:'title' });

	var slide3 = pptx.addSlide({masterName:'MASTER_SLIDE', sectionTitle:pTitle});
	slide3.addNotes('Master name: `MASTER_SLIDE` using pre-filled placeholders\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide3.addText(pTitle, { placeholder:'title', valign: 'middle' });
	slide3.addText(
		[
			{ text:pContents, options:{ breakLine:true, valign:'top' } },
			{ text:'Add any text, charts, whatever', options:{ breakLine:true, color:'0000AB' } },
			{ text:'Check out the online API docs for more', options:{ breakLine:true, color:'0000AB' } },
		],
		{ placeholder:'body', valign:'top' }
	);
	slide3 = pptx.addSlide({masterName:'MASTER_SLIDE', sectionTitle:pTitle});
	slide3.addText('추가 슬라이드 3', { placeholder:'title', valign: 'middle' });

	var slide4 = pptx.addSlide({masterName:'MASTER_SLIDE', sectionTitle:pTitle});
	slide4.addNotes('Master name: `MASTER_SLIDE` using pre-filled placeholders\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide4.addText('Image Placeholder', { placeholder:'title' });
	slide4.addImage({ placeholder:'body', path:(NODEJS ? gPaths.starlabsBkgd.path.replace(/http.+\/examples/, '../common') : gPaths.starlabsBkgd.path) });

	var dataChartPieLocs = [
		{
			name  : 'Location',
			labels: ['CN', 'DE', 'GB', 'MX', 'JP', 'IN', 'US'],
			values: [  69,   35,   40,   85,   38,   99,  101]
		}
	];
	var slide5 = pptx.addSlide({masterName:'MASTER_SLIDE', sectionTitle:pTitle});
	slide5.addNotes('Master name: `MASTER_SLIDE` using pre-filled placeholders\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide5.addText('Chart Placeholder', { placeholder:'title' });
	slide5.addChart( pptx.charts.PIE, dataChartPieLocs, {showLegend:true, legendPos:'l', placeholder:'body'} );

	var slide6 = pptx.addSlide({masterName:'THANKS_SLIDE', sectionTitle:pTitle});
	slide6.addNotes('Master name: `THANKS_SLIDE`\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide6.addText('Thank You!', { placeholder:'thanksText' });
	//slide6.addText('github.com/gitbrent', { placeholder:'body' });

	//var slide7 = pptx.addSlide('PLACEHOLDER_SLIDE');

	// LEGACY-TEST-ONLY: To check deprecated functionality
	/*
	if ( pptx.masters && Object.keys(pptx.masters).length > 0 ) {
		var slide1 = pptx.addSlide( pptx.masters.TITLE_SLIDE  );
		var slide2 = pptx.addSlide( pptx.masters.MASTER_SLIDE );
		var slide3 = pptx.addSlide( pptx.masters.THANKS_SLIDE );

		var slide4 = pptx.addSlide( pptx.masters.TITLE_SLIDE,  { bkgd:'0088CC', slideNumber:{x:'50%', y:'90%', color:'0088CC'} } );
		var slide5 = pptx.addSlide( pptx.masters.MASTER_SLIDE, { bkgd:{ path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/v2.1.0/examples/images/title_bkgd_alt.jpg' } } );
		var slide6 = pptx.addSlide( pptx.masters.THANKS_SLIDE, { bkgd:'ffab33' } );
		//var slide7 = pptx.addSlide( pptx.masters.LEGACY_TEST_ONLY );
	}
	*/
}

function genSlides_Master(pptx) {
	pptx.addSection({ title: 'Masters' });

	var slide1 = pptx.addSlide({masterName:'TITLE_SLIDE', sectionTitle:'Masters'});
	//var slide1 = pptx.addSlide({masterName:'TITLE_SLIDE', sectionTitle:'FAILTEST'}); // TEST: Should show console warning ("title not found")
	slide1.addNotes('Master name: `TITLE_SLIDE`\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');

	var slide2 = pptx.addSlide({masterName:'MASTER_SLIDE', sectionTitle:'Masters'});
	slide2.addNotes('Master name: `MASTER_SLIDE`\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide2.addText('', { placeholder:'title' });

	var slide3 = pptx.addSlide({masterName:'MASTER_SLIDE', sectionTitle:'Masters'});
	slide3.addNotes('Master name: `MASTER_SLIDE` using pre-filled placeholders\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide3.addText('Text Placeholder', { placeholder:'title' });
	slide3.addText(
		[
			{ text:'Pre-filled placeholder bullets', options:{ valign:'top' } },
			{ text:'Add any text, charts, whatever', options:{ indentLevel:1, color:'0000AB' } },
			{ text:'Check out the online API docs for more', options:{ indentLevel:2, color:'0000AB' } },
		],
		{ placeholder:'body', valign:'top' }
	);

	var slide4 = pptx.addSlide({masterName:'MASTER_SLIDE', sectionTitle:'Masters'});
	slide4.addNotes('Master name: `MASTER_SLIDE` using pre-filled placeholders\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide4.addText('Image Placeholder', { placeholder:'title' });
	slide4.addImage({ placeholder:'body', path:(NODEJS ? gPaths.starlabsBkgd.path.replace(/http.+\/examples/, '../common') : gPaths.starlabsBkgd.path) });

	var dataChartPieLocs = [
		{
			name  : 'Location',
			labels: ['CN', 'DE', 'GB', 'MX', 'JP', 'IN', 'US'],
			values: [  69,   35,   40,   85,   38,   99,  101]
		}
	];
	var slide5 = pptx.addSlide({masterName:'MASTER_SLIDE', sectionTitle:'Masters'});
	slide5.addNotes('Master name: `MASTER_SLIDE` using pre-filled placeholders\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide5.addText('Chart Placeholder', { placeholder:'title' });
	slide5.addChart( pptx.charts.PIE, dataChartPieLocs, {showLegend:true, legendPos:'l', placeholder:'body'} );

	var slide6 = pptx.addSlide({masterName:'THANKS_SLIDE', sectionTitle:'Masters'});
	slide6.addNotes('Master name: `THANKS_SLIDE`\nAPI Docs: https://gitbrent.github.io/PptxGenJS/docs/masters.html');
	slide6.addText('Thank You!', { placeholder:'thanksText' });
	//slide6.addText('github.com/gitbrent', { placeholder:'body' });

	//var slide7 = pptx.addSlide('PLACEHOLDER_SLIDE');

	// LEGACY-TEST-ONLY: To check deprecated functionality
	/*
	if ( pptx.masters && Object.keys(pptx.masters).length > 0 ) {
		var slide1 = pptx.addSlide( pptx.masters.TITLE_SLIDE  );
		var slide2 = pptx.addSlide( pptx.masters.MASTER_SLIDE );
		var slide3 = pptx.addSlide( pptx.masters.THANKS_SLIDE );

		var slide4 = pptx.addSlide( pptx.masters.TITLE_SLIDE,  { bkgd:'0088CC', slideNumber:{x:'50%', y:'90%', color:'0088CC'} } );
		var slide5 = pptx.addSlide( pptx.masters.MASTER_SLIDE, { bkgd:{ path:'https://raw.githubusercontent.com/gitbrent/PptxGenJS/v2.1.0/examples/images/title_bkgd_alt.jpg' } } );
		var slide6 = pptx.addSlide( pptx.masters.THANKS_SLIDE, { bkgd:'ffab33' } );
		//var slide7 = pptx.addSlide( pptx.masters.LEGACY_TEST_ONLY );
	}
	*/
}

// ==================================================================================================================

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = {
		execGenSlidesFuncs: execGenSlidesFuncs,
		runEveryTest: runEveryTest
	}
}
