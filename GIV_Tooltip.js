define( [ 'jquery',"qlik",'./extUtils','./quill','ng!$http','text!./main.css','text!./ext.css','text!./template.ng.html','text!./quillcss.css','./ec-about'
],
function ( $, qlik,extUtils,Quill,$http ,style, style2,ngtemplate, quillcss, about) {

	'use strict';
	var palette = [
        "#b0afae",
        "#7b7a78",
        "#545352",
        "#4477aa",
        "#7db8da",
        "#b6d7ea",
        "#46c646",
        "#f93f17",
        "#ffcf02",
        "#276e27",
        "#ffffff",
        "#000000"
    ];
	
	$('style').append(quillcss);
	extUtils.addStyleToHeader( style );
	extUtils.addStyleToHeader( style2 );
	var faUrl = extUtils.getBasePath() + '/Extensions/GIV_Tooltip/css/font-awesome.min.css';
	extUtils.addStyleLinkToHeader( faUrl, 'GIV_Tooltip__fontawesome' );

	var icons=[];

	$http.get( extUtils.getExtensionPath( 'GIV_Tooltip' ) + '/icons-fa.json' ).then( function ( res ){
		$.each(res,function(inx,data){
		$.each(data.icons,function(index,datas){
			icons.push({"value": datas.id, "label": datas.name});

	})})})

return {

	template:ngtemplate,
	definition : {
		type:"items",
		component :"accordion",
		items :{
			settings:{
				uses :"settings",
				items :{
					icons:{
					label: "Icon",
					items:{
						icon:{
							type:"string",
							component:"dropdown",
							label:"Icon",
							ref:"buttonIcon",
							options: function(){
								return icons
							}
							
						},
						iconColor:{
							type:"integer",
							label:"Icon Color",
							ref:"iconColor",
							component:"color-picker",
							defaultValue:"0"
						}
					}
					},
					Tooltipfontsize:{
						type:"string",
						label:"Tooltip font size",
						defaultValue:14,
						ref:"fontsize",
						expression: "optional"
					},
					Tooltipfontcolor:{
						label:"Tooltip font color",
						deaultValue:"0",
						type:"integer",
						ref:"fontcolor",
						component:"color-picker"
					},
					Tooltipbackgroundcolor:{
						label : "Tooltip background color",
						defaultValue:"0",
						type:"integer",
						component:"color-picker",
						ref: "color"
					},
					Tooltipfontfamily:{
					type:"string",
					component:"dropdown",
					label:"Tooltip font family",
					ref:"fontfamily",
					options :[{
						value:"arial",
						label:"Arial"
					},{
						value:"times new roman",
						label:"Times New Roman"
					},
					{
						value:"courier",
						label:"Courier"
					},
					{
						value:"verdana",
						label:"Verdana"
					},
					{
						value:"georgia",
						label:"Georgia"
					},
					{
						value:"times",
						label:"Times"
					},
					{
						value:"courier",
						label:"Courier"
					}],
					},
					Tooltipfontstyle:{
					type:"string",
					component:"dropdown",
					label:"Tooltip font style",
					ref:"fontstyle",
					options:[{
						value:"normal",
						label:"Normal"
					},{
						value:"italic",
						label:"Italic"
					},
					{
						value:"bold",
						label:"Bold"
					},
					{
						value:"underline",
						label:"Underline"
					},
					{
						value:"line-through",
						label:"Strikethrough"
					}
					]
					},
					Tooltipposition:{
					type:'string',
					component: 'dropdown',
					label:'Tooltip board position',
					ref : 'position',
					options:[{
						value: 'top',
						label: 'Top'
					},
					{
						value: 'bottom',
						label: 'Bottom'
					},
					{
						value: 'left',
						label: 'Left'
					},
					{
						value: 'right',
						label: 'Right'
					}
					]
					},
					about: {
						component: "about-r",
						show: !0,
						label: "About"
					}


			}
	}}},
	/*resize: function(){
		return false;
	},*/
	controller:function($scope){
		$scope.tooltip = "Tooltip Text";
		$scope.icon = null;
		$scope.update = function(text) {
			//$("#tooltip2").html(text);
			$scope.tooltip = text;
		}
		$scope.quill = new Quill('#editor',
			{
				modules : {toolbar:true},
				placeholder:'Enter tooltip text...!',
				theme:'snow'
			});

	},
	paint: function ($element, layout) {

	var scope = this.$scope;


	scope.icon='fa '+'fa-'+layout.buttonIcon+ ' ' + " fa-lg ";
	scope.iconColor = palette[layout.iconColor];
	
	var tooltiptext = layout.tooltip;
	var tooltipbackgroundcolor = palette[layout.color];
	var tooltipfontcolor = palette[layout.fontcolor];
	var tooltipfontsize = layout.fontsize;
	var tooltipfontfamily = layout.fontfamily;
	var tooltipfontstyle = layout.fontstyle;
	var tooltipposition = layout.position;


	console.log(tooltipfontsize);
	var css = null;
	if(tooltipfontstyle =="underline" || tooltipfontstyle=="line-through"){
		css = "text-decoration";
	}else{
		css = "font-style" ;
	}

	$("#tooltip2").css({'text-decoration':'none', 'font-style': 'none'});
	$('#tooltip2').css(css, tooltipfontstyle);
	$('#tooltip2').css('background-color',tooltipbackgroundcolor);
	$('#tooltip2').css('color', tooltipfontcolor);
	$('#tooltip2').css('font-size', tooltipfontsize + "px");



	scope.quill.on('text-change', function(delta, oldDelta, source) {
		if (source == 'api') {
			scope.update (quill.container.firstChild.innerHTML)
		}else if (source == 'user') {
		scope.update (scope.quill.container.firstChild.innerHTML)  }
		});

	if($('#tooltip2').length){

	}
	else{
		$('body').append("<div id='tooltip2' style='display:none;max-width:auto;height:auto;padding:20px;box-shadow:0 0 3px;border-radius:3px;top:100px;left:25px;z-index:1;position:absolute;background-color:"+tooltipbackgroundcolor+ ";color:"+ tooltipfontcolor+";font-size:"+tooltipfontsize+"px;font-family:"+tooltipfontfamily +";'></div>");

	}
	if(qlik.navigation.getMode()=='edit')
	{

		$('#tooltip2').css('display', 'none');
		$('#icon').mouseover(function(){
			$("#tooltip2").css('display','none');
		});
		$('#icon').mouseout(function(){
			$("#tooltip2").css('display','none');
		});
		$('.ng-scope').dblclick(function(){
			$('#editor').show();
			$('.ql-toolbar.ql-snow').show();
			$('#close').show();
		});

	}
	if(qlik.navigation.getMode()=='analysis')
	{

		$('#icon').mouseover(function(){
			$("#tooltip2").css('display','block');
		});
		$('#icon').mouseout(function(){
			$("#tooltip2").css('display','none');
		});
		/*
		$('#icon').mouseover(function(){
			$("#tooltip2").css('display','block');
		});
		$('#icon').mouseout(function(){
			$("#tooltip2").css('display','none');
		});*/
		$('#editor').hide();
		// close icon
		$('#close').hide();
		// expand button
		$('.qv-object-GIV_Tooltip .qv-object-nav').hide();
		$('.ql-toolbar.ql-snow').hide();
		$('.ng-scope').dblclick(function(){
			$('#editor').hide();
			$('.ql-toolbar.ql-snow').hide();
			$('#close').hide();
		});


	}



	$('#close').click(function(){

		$('#editor').hide();
		$('.ql-toolbar.ql-snow').hide();
		$('#close').css('display', 'none');
	});




	$('#tooltip2').css({'background-color': tooltipbackgroundcolor, 'color': tooltipfontcolor, 'font-size': tooltipfontsize, 'font-family': tooltipfontfamily, 'font-style': tooltipfontstyle});
	$('#tooltip2').html(scope.tooltip);

	

	var from_left = $('.qv-object-GIV_Tooltip').offset().left;
	var from_top = $('.qv-object-GIV_Tooltip').offset().top;

	if (tooltipposition=='right'){
		$('#tooltip2').css({'left':from_left + 30  , 'top': from_top});
	}
	else if(tooltipposition =='left'){
		var width = $('#tooltip2').width();
		$('#tooltip2').css({'left':from_left -(width + 50),'top':from_top});
	}
	else if(tooltipposition == 'top'){
		var width = $('#tooltip2').width();
		var height = $('#tooltip2').height();
		$('#tooltip2').css({'left':from_left - (width / 2), 'top': from_top - (height+ 50)});
	}
	else {
		var width = $('#tooltip2').width();
		$('#tooltip2').css({'left':from_left - (width / 2), 'top': from_top + 30});
	}


	$('.ql-editor').click(function(){
		scope.quill.focus();
	});




	}
	};


} );
