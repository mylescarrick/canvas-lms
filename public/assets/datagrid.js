var datagrid={};
(function(){datagrid={columns:[],rows:[],dataRows:[],dataFragment:document.createDocumentFragment(),cells:{},divs:{},init:function(a,b){var c=b.onReady,e=b.tick,d=b.maxWidth||150;datagrid.borderSize=b.borderSize||1;if(b.scroll&&$.isFunction(b.scroll))datagrid.scrollCallback=b.scroll;datagrid.table=a;var h=a.find("tr:first td"),f=a.find("tr"),i=0;h.each(function(g){var j=$(this);datagrid.columns[g]=j;j.metrics={};j.metrics.width=Math.min(j.width(),d)+5;j.metrics.outerWidth=Math.min(j.outerWidth(),d)+
5;i+=j.metrics.width});var l=0;f.each(function(g){var j=$(this);datagrid.rows[g]=j;j.metrics={};j.metrics.outerHeight=j.find("td:first").outerHeight();j.metrics.height=j.find("td:first").height();l+=j.metrics.height});e&&$.isFunction(e)&&e();datagrid.divs.all=$(".datagrid");datagrid.divs.topleft=$("#datagrid_topleft");datagrid.divs.left=$("#datagrid_left");datagrid.divs.top=$("#datagrid_top");datagrid.divs.data=$("#datagrid_data");datagrid.divs.filler=$("#datagrid_filler");datagrid.divs.topleft.width(datagrid.columns[0].metrics.width+
datagrid.borderSize);datagrid.divs.left.width(datagrid.columns[0].metrics.width+datagrid.borderSize);datagrid.divs.filler.width(i-datagrid.columns[0].metrics.width);datagrid.divs.top.height(datagrid.rows[0].metrics.height+datagrid.borderSize);datagrid.divs.topleft.height(datagrid.rows[0].metrics.height+datagrid.borderSize);datagrid.divs.filler.height(l-datagrid.rows[0].metrics.height);datagrid._initializeListeners();datagrid._templateCellHTML=b.templateCellHTML;datagrid.sizeToWindow();$(window).resize(datagrid.sizeToWindow);
var k=datagrid._createRow(0,true);k.append(datagrid._createCell(0,0,a.find("tr:first td:first")));datagrid.divs.topleft.children(".content:first").append(k);k=datagrid._createRow(0);k.width(i-datagrid.columns[0].metrics.width+datagrid.columns.length);a.find("tr:first").children("td:not(:first)").each(function(g){k.append(datagrid._createCell(0,g+1,$(this)))});datagrid.divs.top.children(".content:first").append(k);e&&$.isFunction(e)&&e();var s=false,t=function(g){if(!s){k=datagrid._createRow(g+1,true);
k.append(datagrid._createCell(g+1,0,$(this).find("td:first")));datagrid.divs.left.children(".content:first").append(k)}k=datagrid._createRow(g+1);$(this).children("td:not(:first)").each(function(j){datagrid._createCell(g+1,j+1,$(this));datagrid._placeDataCell(g+1,j+1)});datagrid._placeDataRow(g+1)},n=[],u=0;a.find("tr:not(:first)").each(function(g){var j=0;k=datagrid._createRow(g+1,true);k.append(datagrid._createCell(g+1,0,$(this).find("td:first")));datagrid.divs.left.children(".content:first").append(k);
k=datagrid._createRow(g+1);k.width(i-datagrid.columns[0].metrics.width+datagrid.columns.length-1);$(this).children("td:not(:first)").each(function(v){j+=datagrid.columns[v+1].metrics.width});datagrid._placeDataRow(g+1);u+=datagrid.rows[g+1].metrics.height;n.push($(this))});s=true;datagrid._placeDataFragment();b&&b.onViewable&&$.isFunction(b.onViewable)&&b.onViewable.call(this);var o=0,m=function(g){try{e&&$.isFunction(e)&&g&&e();if(o<n.length){g=o;o++;t.call(n[g],g);setTimeout(function(){m(true)},
1)}else if(g&&!m.finished){m.finished=true;datagrid.initialized=true;a.hide();datagrid.ready&&$.isFunction(datagrid.ready)&&datagrid.ready();c&&$.isFunction(c)&&c()}}catch(j){INST.log_error({Msg:j.toString()})}};setTimeout(function(){m(true)},5);setTimeout(function(){m(false)},5);setTimeout(function(){m(false)},5);setTimeout(function(){m(false)},5);var p=datagrid.divs.top.children(".content:first"),q=datagrid.divs.left.children(".content:first"),r=false;setInterval(function(){if(r){if(p.length===
0)p=datagrid.divs.top.children(".content:first");if(q.length===0)q=datagrid.divs.left.children(".content:first");p.css("left",0-datagrid.divs.data.scrollLeft());q.css("top",0-datagrid.divs.data.scrollTop());datagrid.scrollCallback&&datagrid.scrollCallback();r=false}},100);datagrid.divs.data.bind("scroll",function(){r=true});datagrid.mouseHasMoved=true;$(document).mousemove(function(){datagrid.mouseHasMoved=true});$(document).keycodes("up down left right tab shift+tab",function(g){if(!($(g.target).closest(".ui-dialog").length>
0)){g.preventDefault();g.stopPropagation();if(g.keyString=="right"||g.keyString=="tab")datagrid.moveRight();else if(g.keyString=="down")datagrid.moveDown();else if(g.keyString=="up")datagrid.moveUp();else if(g.keyString=="left"||g.keyString=="shift+tab")datagrid.moveLeft()}})},_initializeListeners:function(){datagrid.divs.all.delegate(".cell","mousemove",datagrid._cellMove).delegate(".cell","mouseover",datagrid._cellOver).delegate(".cell","mouseout",datagrid._cellOut).delegate(".cell","click",datagrid._cellClick)},
titles:function(a){var b=[],c;for(c in a)b.push(datagrid.cells["0,"+a[c]].find(".assignment_title").text()||"--")},reorderColumns:function(a){for(var b={},c=[],e=[],d=0;d<a.length;d++)e[d]=d;for(var h=0;h<a.length;h++){var f=a[h];for(d=0;d<datagrid.rows.length;d++){var i=datagrid.cells[d+","+f];if(e[h]!=f)e[h]<f?datagrid.cells[d+","+e[h]].before(i):datagrid.cells[d+","+e[h]].after(i);b[d+","+h]=datagrid.cells[d+","+f];b[d+","+h].column=h;b[d+","+h].data("datagrid_position",{row:d,column:h});b[d+","+
h].data("column",h);c[h]=datagrid.columns[f]}i=-1;for(d=0;d<e.length;d++)if(e[d]==f)i=d;if(h!=i)if(h<i){e.splice(h,0,f);e.splice(i+1,1)}else{e.splice(h,0,f);e.splice(i,1)}}datagrid.cells=b;datagrid.columns=c},reorderRows:function(a){for(var b={},c=[],e=[],d=0;d<a.length;d++)e[d]=d;for(var h=0,f=0;f<a.length;f++){var i=a[f];d=datagrid.cells[i+",0"].parents(".row");var l=datagrid.cells[i+",1"].parents(".row");l.css("top",h);d.css("top",h);if(f>0)h=h+datagrid.rows[i].metrics.height+1;if(e[f]!=i)if(e[f]<
i){datagrid.cells[e[f]+",0"].parents(".row").before(d);datagrid.cells[e[f]+",1"].parents(".row").before(l)}else{datagrid.cells[e[f]+",0"].parents(".row").after(d);datagrid.cells[e[f]+",1"].parents(".row").after(l)}c[f]=datagrid.rows[i];for(d=0;d<datagrid.columns.length;d++){b[f+","+d]=datagrid.cells[i+","+d];b[f+","+d].row=f;b[f+","+d].data("datagrid_position",{row:f,column:d});b[f+","+d].data("row",f);c[f]=datagrid.rows[i]}l=-1;for(d=0;d<e.length;d++)if(e[d]==i)l=d;if(f!=l)if(f<l){e.splice(f,0,i);
e.splice(l+1,1)}else{e.splice(f,0,i);e.splice(l,1)}}datagrid.cells=b;datagrid.rows=c},moveColumn:function(a,b){new_order=[];if(!(a==0||b==0||a==b)){for(var c=0;c<datagrid.columns.length;c++)if(c==b)new_order.push(a);else if(c>=b&&c<=a||c<=b&&c>=a)b<a?new_order.push(c-1):new_order.push(c+1);else new_order.push(c);datagrid.reorderColumns(new_order)}},_placeDataCell:function(a,b){if(!(a<1||b<1)){var c=datagrid.cells[a+","+b];if(!(c&&c.placed)){var e=datagrid.dataRows[a];if(e){e.append(c);c.placed=true}}}},
_initializeCell:function(a,b){if(!datagrid.cells[a+","+b]){var c=["cell"];a===0&&c.push("column_header");b===0&&c.push("row_header");b!==0&&a!==0&&c.push("data_cell");c=$(["<div class='",c.join(" "),"' style='visiblity: hidden; height:",datagrid.rows[a].metrics.height,"px; width:",datagrid.columns[b].metrics.width,"px;' data-row='",a,"' data-column='",b,"'/>"].join("")).data({row:a,column:b});c.row=a;c.column=b;datagrid.cells[a+","+b]=c}return datagrid.cells[a+","+b]},_createCell:function(a,b,c){var e=
datagrid._initializeCell(a,b);if(e.transferred)return e;a!=0&&b!=0&&datagrid._templateCellHTML?e.append(datagrid._templateCellHTML(a,b)):e.append(c.children());e.attr("id",c.attr("id"));c.attr("id","original_"+e.attr("id"));e.originalTD=c;e.addClass(c.attr("class"));e.css("visibility","");e.transferred=true;return e},_trigger:function(a,b,c){a=$.Event(a);a.originalEvent=b;a.originalTarget=c;datagrid.table.trigger(a,{cell:c,trueEvent:b&&b.originalEvent})},_cellClick:function(a){var b=datagrid.position($(this));
b=datagrid.cells[b.row+","+b.column];datagrid.columns[b.column].hidden?datagrid.toggleColumn(b.column):datagrid._trigger("entry_click",a,b)},_cellMove:function(){if(!datagrid.disableHighlights){var a=datagrid.position($(this));a=datagrid.cells[a.row+","+a.column];datagrid.table.trigger("entry_move",a);$(this).index(datagrid.currentHover)==-1&&a.trigger("mouseover")}},_cellOver:function(a){if(!datagrid.disableHighlights)if(!(a.originalEvent&&!datagrid.mouseHasMoved)){datagrid.mouseHasMoved=false;var b=
datagrid.position($(this));b=datagrid.cells[b.row+","+b.column];b.addClass("selected");datagrid.currentHover&&b.index(datagrid.currentHover)==-1&&$(datagrid.currentHover).trigger("mouseout");datagrid.currentHover=b;if(b.row==0)for(var c=1;c<datagrid.rows.length;c++)datagrid.cells[c+","+b.column].addClass("related");else if(b.column==0)for(c=1;c<datagrid.columns.length;c++)datagrid.cells[b.row+","+c].addClass("related");else{datagrid.cells[b.row+",0"].addClass("related");datagrid.cells["0,"+b.column].addClass("related")}datagrid._trigger("entry_over",
a,b)}},_cellOut:function(a){if(!datagrid.disableHighlights)if($(a.target).parents("div").index(this)==-1){var b=datagrid.position($(this));b=datagrid.cells[b.row+","+b.column];b.removeClass("selected");if(b.row==0)for(var c=1;c<datagrid.rows.length;c++)datagrid.cells[c+","+b.column].removeClass("related");else if(b.column==0)for(c=1;c<datagrid.columns.length;c++)datagrid.cells[b.row+","+c].removeClass("related");else{datagrid.cells[b.row+",0"].removeClass("related");datagrid.cells["0,"+b.column].removeClass("related")}datagrid._trigger("entry_out",
a,b)}},_placeDataFragment:function(){if(datagrid.dataFragment){datagrid.divs.data.find(".content:first")[0].appendChild(datagrid.dataFragment);datagrid.dataFragment=null}},_placeDataRow:function(a){if(!(a<1)){a=datagrid.dataRows[a]||datagrid._createRow(a);if(!a.placed){datagrid.dataFragment?datagrid.dataFragment.appendChild(a[0]):datagrid.divs.data.find(".content:first").append(a);a.placed=true}}},_createRow:function(a,b){if(datagrid.dataRows[a])return datagrid.dataRows[a];var c=document.createDocumentFragment(),
e=$(document.createElement("div")).addClass("row");c.appendChild(e[0]);e.height(datagrid.rows[a].metrics.height);c=0;for(var d=1;d<a;d++)c+=datagrid.rows[d].metrics.height+1;e.css({top:c,left:0});if(a>0&&!b)datagrid.dataRows[a]=e;return e},toggleColumn:function(a,b,c){var e=!datagrid.columns[a].hidden,d=!!datagrid.columns[a].hidden;if(b)d=true;else if(b===false)d=false;if(e!=d){for(b=0;b<datagrid.rows.length;b++)datagrid.cells[b+","+a].width(d?datagrid.columns[a].metrics.width:10).children().showIf(d).toggleClass("hidden_column",
!d);datagrid.columns[a].hidden=!d;c||datagrid.sizeGrid()}},sizeGrid:function(){for(var a=0,b=1;b<datagrid.columns.length;b++)a+=datagrid.columns[b].hidden?10:datagrid.columns[b].metrics.width;datagrid.divs.filler.width(a-datagrid.columns[0].metrics.width);for(b=1;b<datagrid.rows.length;b++)datagrid.cells[b+",1"].parent(".row").width(a+datagrid.columns.length+3)},focus:function(a,b){var c=datagrid.cells[a+","+b];if(!(datagrid.currentFocus&&c.index(datagrid.currentFocus||[])!=-1)){datagrid.currentFocus&&
datagrid.blur();c.addClass("focus");datagrid.currentFocus=c;datagrid._trigger("entry_focus",null,c)}},blur:function(){if(datagrid.currentFocus){datagrid.currentFocus.removeClass("focus");datagrid._trigger("entry_blur",null,datagrid.currentFocus);datagrid.currentFocus=null}},scrollTo:function(a,b){datagrid.disableHighlights=true;if(a==0)a=1;if(b==0)b=1;var c=datagrid.cells[a+","+b];datagrid.divs.data.scrollToVisible(c).triggerHandler("scroll");datagrid.disableHighlights=false;if(c&&c.filter(":visible").length>
0){c.attr("tabindex",0);return true}},sizeToWindow:function(){$("html,body").css("overflow","hidden");var a=$("#content,#wide_content");if(a.length===0||a.width()<100)a=$(window);var b=1;if($("body").hasClass("ff")||$("body").hasClass("webkit"))b=1;var c=$(window).height()-b-datagrid.divs.top.offset().top;a=a.width()-b;datagrid.divs.left.height(c-datagrid.rows[0].metrics.height-datagrid.borderSize+1);datagrid.divs.data.height(c-datagrid.rows[0].metrics.height-datagrid.borderSize+1);datagrid.divs.top.width(a-
datagrid.columns[0].metrics.width-datagrid.borderSize+1);datagrid.divs.data.width(a-datagrid.columns[0].metrics.width-datagrid.borderSize+1);datagrid.divs.data.metrics={width:a-datagrid.columns[0].metrics.width-datagrid.borderSize+1,height:c-datagrid.rows[0].metrics.height-datagrid.borderSize+1}},_selectFirstCell:function(){var a=datagrid.cells["1,1"];a.trigger("mouseover");datagrid.currentHover=a;datagrid.scrollTo(1,1)},position:function(a){a.hasClass("cell")||(a=a.closest(".cell"));if(a.data("datagrid_position"))return a.data("datagrid_position");
if(a.length==0)return{};var b={row:parseInt(a.attr("data-row"),10),column:parseInt(a.attr("data-column"),10)};a.data("datagrid_position",b);return b},moveLeft:function(){var a=datagrid.currentHover;if(datagrid.currentHover){for(var b=a.column-1,c=datagrid.cells[a.row+","+b];c&&c.hidden;){b--;c=datagrid.cells[a.row+","+b]}if(!c||c.length===0)c=a;c.trigger("mouseover").focus();datagrid.currentHover=c;datagrid.scrollTo(c.row,c.column)}else datagrid._selectFirstCell()},moveRight:function(){var a=datagrid.currentHover;
if(datagrid.currentHover){for(var b=a.column+1,c=datagrid.cells[a.row+","+b];c&&c.hidden;){b++;c=datagrid.cells[a.row+","+b]}if(!c||c.length===0)c=a;c.trigger("mouseover").focus();datagrid.currentHover=c;datagrid.scrollTo(c.row,c.column)}else datagrid._selectFirstCell()},moveUp:function(){var a=datagrid.currentHover;if(datagrid.currentHover){for(var b=a.row-1,c=datagrid.cells[b+","+a.column];c&&c.hidden;){b--;c=datagrid.cells[b+","+a.column]}if(!c||c.length===0)c=a;c.trigger("mouseover").focus();
datagrid.currentHover=c;datagrid.scrollTo(c.row,c.column)}else datagrid._selectFirstCell()},moveDown:function(){var a=datagrid.currentHover;if(datagrid.currentHover){for(var b=a.row+1,c=datagrid.cells[b+","+a.column];c&&c.hidden;){b++;c=datagrid.cells[b+","+a.column]}if(!c||c.length===0)c=a;c.trigger("mouseover").focus();datagrid.currentHover=c;datagrid.scrollTo(c.row,c.column)}else datagrid._selectFirstCell()}}})();
