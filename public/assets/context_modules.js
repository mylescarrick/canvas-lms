var INST,modules=function(){return{updateTaggedItems:function(){},currentIndent:function(b){b=b.attr("class").split(/\s/);var a=0;for(idx=0;idx<b.length;idx++)if(b[idx].match(/^indent_/)){var c=parseInt(b[idx].substring(7),10);isNaN(c)||(a=c)}return a},refreshProgressions:function(b){$("#context_modules .context_module:visible").each(function(){var a=$(this),c=a.find(".header").getTemplateData({textValues:["id"]}),d={progression_complete_count:0,progression_started_count:0};$("#progression_list .progression_"+
c).each(function(){var e=$(this).getTemplateData({textValues:["workflow_state"]}).workflow_state;if(e=="completed")d.progression_complete_count++;else if(e=="unlocked"||e=="started")d.progression_started_count++});a.find(".progression_details_link").showIf(d.progression_complete_count||d.progression_started_count);a.find(".footer").fillTemplateData({data:d}).find(".progression_details_link").showIf(d.progression_complete_count||d.progression_started_count).end().find(".progression_complete").showIf(d.progression_complete_count>
0).end().find(".progression_started").showIf(d.progression_started_count>0)});$(".context_module .progression_complete").showIf($(".context_module .prerequisites_footer:visible,.context_module_item .criterion img.not_blank").length>0);if(b){$(".loading_module_progressions_link").remove();$(".module_progressions_link").showIf($(".editable_context_module").length>0||$(".context_module .progression_complete:visible").length>0||$(".context_module_item.completed_item").length>0)}},updateProgressions:function(b,
a){var c=$(".progression_list_url").attr("href");if(b)c=c+"?user_id="+b;$(".context_module_item.progression_requirement:visible").length>0&&$(".loading_module_progressions_link").show().attr("disabled",true);$.ajaxJSON(c,"GET",{},function(d){$(".loading_module_progressions_link").remove();b?$("#progression_list .student_"+b+" .progressions").empty():$("#progression_list .student .progressions").empty();var e=$("#identity .user_id").text(),f=$("#progression_list_blank"),g=$("#current_user_progression_list"),
h=$("#progression_list"),k={},j=false,l=[],o;for(o in d)l.push(d[o]);var n=function(){$("#context_modules").hasClass("editable")||$("#context_modules .context_module").each(function(){modules.updateProgressionState($(this))});modules.refreshProgressions(j&&!b);a&&a()},p=0,r=function(){var i=l.shift();if(i){i=i.context_module_progression;if(i.workflow_state=="locked")j=true;if(i.user_id==e){var m=g.find(".progression_"+i.context_module_id);if(m.length===0&&g.length>0){m=g.find(".progression_blank").clone(true);
m.removeClass("progression_blank").addClass("progression_"+i.context_module_id);g.append(m)}if(m.length>0){i.requirements_met=$.map(i.requirements_met||[],function(s){return s.id}).join(",");m.fillTemplateData({data:i})}}m=f.clone(true).removeAttr("id");m.fillTemplateData({data:i});m.addClass("progression_"+i.context_module_id);m.data("progression",i);var q=k[i.user_id];if(!q){q=h.find(".student_"+i.user_id+" .progressions");k[i.user_id]=q}q.append(m);if(i.workflow_state=="unlocked"||i.workflow_state==
"started")if(!k[i.user_id].found){k[i.user_id].found=true;q.parents(".student").fillTemplateData({data:{current_module:$("#context_module_"+i.context_module_id+" .header .name").text()}})}p++;if(p>=50){p=0;setTimeout(r,150)}else r()}else n()};r()},function(){a&&a()})},updateAssignmentData:function(){$.ajaxJSON($(".assignment_info_url").attr("href"),"GET",{},function(b){$.each(b,function(a,c){var d={};if(c.points_possible!=null)d.points_possible_display="<span class='points_possible_block'>"+c.points_possible+
"</span> pts";if(c.due_date!=null)d.due_date_display=$.parseFromISO(c.due_date).date_formatted;$("#context_module_item_"+a).fillTemplateData({data:d,htmlValues:["points_possible_display"]})})},function(){})},editModule:function(b){var a=$("#add_context_module_form");a.data("current_module",b);var c=b.getTemplateData({textValues:["name","unlock_at","require_sequential_progress"]});a.fillFormData(c,{object_name:"context_module"});var d=false;if(b.attr("id")=="context_module_new"){d=true;a.attr("action",
a.find(".add_context_module_url").attr("href"));a.find(".completion_entry").hide();a.attr("method","POST");a.find(".submit_button").text("Add Module")}else{a.attr("action",b.find(".edit_module_link").attr("href"));a.find(".completion_entry").show();a.attr("method","PUT");a.find(".submit_button").text("Update Module")}a.find("#unlock_module_at").attr("checked",c.unlock_at).triggerHandler("change");a.find("#require_sequential_progress").attr("checked",c.require_sequential_progress=="true"||c.require_sequential_progress==
"1");a.find(".prerequisites_entry").showIf($("#context_modules .context_module").length>1);var e=[];b.find(".prerequisites .criterion").each(function(){e.push($(this).getTemplateData({textValues:["id","name","type"]}))});a.find(".prerequisites_list .criteria_list").empty();for(var f in e){c=e[f];a.find(".add_prerequisite_link:first").click();c.type=="context_module"&&a.find(".prerequisites_list .criteria_list .criterion:last select").val(c.id)}a.find(".completion_criteria_list .criteria_list").empty();
b.find(".content .context_module_item .criterion.defined").each(function(){var g=$(this).parents(".context_module_item").getTemplateData({textValues:["id","criterion_type","min_score"]});a.find(".add_completion_criterion_link").click();a.find(".completion_criteria_list .criteria_list .criterion:last").find(".id").val(g.id||"").change().end().find(".type").val(g.criterion_type||"").change().end().find(".min_score").val(g.min_score||"")});f=$("#context_modules .context_module").length==1;c=b.find(".content .context_module_item").length===
0;a.find(".prerequisites_list .no_prerequisites_message").showIf(e.length===0).end().find(".prerequisites_list .criteria_list").showIf(e.length!=0).end().find(".add_prerequisite_link").showIf(!f).end().find(".completion_criteria_list .no_items_message").showIf(c).end().find(".completion_criteria_list .no_criteria_message").showIf(!c&&b.find(".content .context_module_item .criterion.defined").length===0).end().find(".completion_criteria_list .criteria_list").showIf(!c).end().find(".add_completion_criterion_link").showIf(!c);
b.fadeIn("fast",function(){});b.addClass("dont_remove");a.find(".module_name").toggleClass("lonely_entry",d);a.dialog("close").dialog({autoOpen:false,modal:true,width:600,close:function(){modules.hideEditModule(true)}}).dialog("option",{title:d?"Add Module":"Edit Module Settings",width:d?"auto":600}).dialog("open");b.removeClass("dont_remove");a.find(":text:visible:first").focus().select()},hideEditModule:function(b){var a=$("#add_context_module_form").data("current_module");b&&a&&a.attr("id")=="context_module_new"&&
!a.hasClass("dont_remove")&&a.remove();$("#add_context_module_form:visible").dialog("close")},addItemToModule:function(b,a){if(!a)return $("<div/>");a.id=a.id||"new";a.type=a.type||a["item[type]"]||$.underscore(a.content_type);a.title=a.title||a["item[title]"];a.id!="new"&&$("#context_module_item_"+a.id).remove();var c=$("#context_module_item_blank").clone(true).removeAttr("id");c.addClass(a.type+"_"+a.id);c.addClass(a.type);c.fillTemplateData({data:a,id:"context_module_item_"+a.id,hrefValues:["id",
"context_module_id"]});for(var d=0;d<10;d++)c.removeClass("indent_"+d);c.addClass("indent_"+(a.indent||0));var e=null;b.find(".context_module_items").children().each(function(){var f=parseInt($(this).getTemplateData({textValues:["position"]}).position,10);if((a.position||a.position===0)&&(f||f===0))if(e==null&&f-a.position>=0)e=$(this)});e?e.before(c.show()):b.find(".context_module_items").append(c.show());return c},refreshModuleList:function(){$("#module_list").find(".context_module_option").remove();
$("#context_modules .context_module").each(function(){var b=$(this).find(".header").getTemplateData({textValues:["name","id"]}),a=$(document.createElement("option"));a.val(b.id);a.text("the module, "+b.name).addClass("context_module_"+b.id).addClass("context_module_option");$("#module_list").append(a)})},filterPrerequisites:function(b,a){var c=modules.prerequisites(),d=b.attr("id").substring(15),e=[],f;for(f in a)$.inArray(a[f],c[d])==-1&&e.push(a[f]);return e},prerequisites:function(){var b={to_visit:{},
visited:{}};$("#context_modules .context_module").each(function(){var e=$(this).attr("id").substring(15);b[e]=[];$(this).find(".prerequisites .criterion").each(function(){var f=$(this).getTemplateData({textValues:["id"]}).id;if($(this).hasClass("context_module_criterion")){b[e].push(f);b.to_visit[e+"_"+f]=true}})});for(var a in b.to_visit)if(b.to_visit.hasOwnProperty(a)){var c=a.split("_");if(!b.visited[a]){b.visited[a]=true;for(var d in b[c[1]]){b[c[0]].push(b[c[1]][d]);b.to_visit[c[0]+"_"+b[c[1]][d]]=
true}}}delete b.to_visit;delete b.visited;return b},updateProgressionState:function(b){b=b.attr("id").substring(15);var a=$("#current_user_progression_list .progression_"+b).getTemplateData({textValues:["context_module_id","workflow_state","requirements_met","collapsed","current_position"]});b=$("#context_module_"+a.context_module_id);b.toggleClass("completed",a.workflow_state=="completed");var c=a.workflow_state;if(c=="unlocked"||c=="started")c="in progress";if(c=="completed"&&!b.find(".progression_requirement").length)c=
"";b.fillTemplateData({data:{progression_state:c}});b.toggleClass("locked_module",a.workflow_state=="locked"&&!b.hasClass("editable_context_module"));b.find(".context_module_item").each(function(){var e=parseInt($(this).getTemplateData({textValues:["position"]}).position,10);a.current_position&&e&&a.current_position<e&&$(this).addClass("after_current_position")});if(a.requirements_met){c=a.requirements_met.split(",");for(var d in c)b.find("#context_module_item_"+c[d]).addClass("completed_item")}a.collapsed==
"true"&&b.addClass("collapsed_module")},sortable_module_options:{connectWith:".context_module_items",handle:".move_item_link",helper:"clone",placeholder:"context_module_placeholder",forcePlaceholderSize:true,axis:"y",containment:"#context_modules",update:function(b,a){var c=a.item.parents(".context_module"),d=c.find(".reorder_items_url").attr("href");c.find(".content").loadingImage();var e=[];c.find(".context_module_items .context_module_item").each(function(){e.push($(this).getTemplateData({textValues:["id"]}).id)});
$.ajaxJSON(d,"POST",{order:e.join(",")},function(){c.find(".content").loadingImage("remove")},function(){c.find(".content").loadingImage("remove");c.find(".content").errorBox("Reorder failed, please try again.")})}}}}();
$(document).ready(function(){$(".datetime_field").datetime_field();$(".context_module").live("mouseover",function(){$(".context_module_hover").removeClass("context_module_hover");$(this).addClass("context_module_hover")});$(".context_module_item").live("mouseover",function(){$(".context_module_item_hover").removeClass("context_module_item_hover");$(this).addClass("context_module_item_hover")});var b=null;$(document).keycodes("j k",function(a){b=$(".context_module_hover:visible,.context_module_item_hover:visible").filter(":last");
if(b.length===0)b=$(".context_module:visible:first");else{var c=null;if(a.keyString=="j")if(b.hasClass("context_module")){c=b.find(".context_module_item:visible:first");if(c.length===0)c=b.next(".context_module")}else{if(b.hasClass("context_module_item")){c=b.next(".context_module_item:visible");if(c.length===0)c=b.parents(".context_module").next(".context_module")}}else if(a.keyString=="k")if(b.hasClass("context_module")){c=b.prev(".context_module").find(".context_module_item:visible:last");if(c.length===
0)c=b.prev(".context_module")}else if(b.hasClass("context_module_item")){c=b.prev(".context_module_item:visible");if(c.length===0)c=b.parents(".context_module")}if(c&&c.length>0)b=c}a=b;if(a.hasClass("context_module")){$(".context_module_hover").removeClass("context_module_hover");$(".context_module_item_hover").removeClass("context_module_item_hover");a.addClass("context_module_hover")}else if(a.hasClass("context_module_item")){$(".context_module_item_hover").removeClass("context_module_item_hover");
$(".context_module_hover").removeClass("context_module_hover");a.addClass("context_module_item_hover");a.parents(".context_module").addClass("context_module_hover")}a.find(":tabbable:first").focus()}).keycodes("e d i o",function(a){if(!(!b||b.length===0))if(a.keyString=="e")b.find(".edit_link:first:visible").click();else if(a.keyString=="d")b.find(".delete_link:first:visible").click();else if(a.keyString=="i")b.find(".indent_item_link:first:visible").click();else a.keyString=="o"&&b.find(".outdent_item_link:first:visible").click()}).keycodes("n",
function(a){a.keyString=="n"&&$(".add_module_list:visible:first").click()});$(".context_module:first .content:visible").length==0&&$("html,body").scrollTo($(".context_module .content:visible").filter(":first").parents(".context_module"));$("#context_modules").hasClass("editable")&&setTimeout(modules.initModuleManagement,1E3);modules.updateProgressions();modules.refreshProgressions();modules.updateAssignmentData();$(".context_module").find(".expand_module_link,.collapse_module_link").bind("click",
function(a,c){a.preventDefault();var d=null;if(c&&$.isFunction(c)){d=c;c=null}var e=$(this).hasClass("collapse_module_link")?"1":"0",f=$(this).parents(".context_module"),g=f.find(".content .context_module_items").children().length===0,h=function(j){var l=function(){f.find(".collapse_module_link").showIf(f.find(".content:visible").length>0);f.find(".expand_module_link").showIf(f.find(".content:visible").length===0);if(f.find(".content:visible").length>0){f.find(".footer .manage_module").css("display",
"");f.toggleClass("collapsed_module",false)}else{f.find(".footer .manage_module").css("display","");f.toggleClass("collapsed_module",true)}d&&$.isFunction(d)&&d()};if(j){f.find(".content").show();l()}else f.find(".content").slideToggle(l)};if(g||c)f.loadingImage();var k=$(this).attr("href");if(c)k=f.find(".edit_module_link").attr("href");$.ajaxJSON(k,c?"GET":"POST",{collapse:e},function(j){if(c){f.loadingImage("remove");var l=function(){var n=j.shift();if(n){modules.addItemToModule(f,n.content_tag);
l()}else{f.find(".context_module_items").sortable("refresh");h(true);modules.updateProgressionState(f);$("#context_modules").triggerHandler("slow_load")}};l()}else if(g){f.loadingImage("remove");for(var o in j)modules.addItemToModule(f,j[o].content_tag);f.find(".context_module_items").sortable("refresh");h();modules.updateProgressionState(f)}},function(){f.loadingImage("remove")});if(e=="1"||!g)h()});$(".refresh_progressions_link").click(function(a){a.preventDefault();$(this).addClass("refreshing");
var c=$(this);(a=$("#student_progression_dialog").find(".student.selected_side_tab:first").getTemplateData({textValues:["id"]}).id)&&modules.updateProgressions(a,function(){c.removeClass("refreshing");c.blur();$("#student_progression_dialog").find(".student.selected_side_tab:first").click()})});$("#student_progression_dialog").delegate(".student","click",function(a){$("#student_progression_dialog").find(".selected_side_tab").removeClass("selected_side_tab");$(this).addClass("selected_side_tab");a.preventDefault();
a=$(this).getTemplateData({textValues:["id"]}).id;var c=$("#progression_list .student_"+a+":first");$("#context_modules .context_module:visible").each(function(){var d=$(this).find(".header").getTemplateData({textValues:["id","name"]}),e=$("#student_progression_dialog .module_"+d.id);d.progress=c.find(".progression_"+d.id+":first").getTemplateData({textValues:["workflow_state"]}).workflow_state;d.progress=d.progress||"no information";var f="nothing";if(d.progress=="unlocked"){f="in_progress";d.progress=
"in progress"}else if(d.progress=="started"){f="in_progress";d.progress="in progress"}else if(d.progress=="completed")f="completed";else if(d.progress=="locked")f="locked";e.find(".still_need_completing").empty();if(d.progress=="in progress"){var g=$("#context_module_"+d.id+" .context_module_item.progression_requirement"),h=c.find(".progression_"+d.id).data("progression"),k=[];g.each(function(){var j=$(this),l={id:j.attr("id").substring(20)};if(j.hasClass("must_view_requirement"))l.type="must_view";
else if(j.hasClass("min_score_requirement"))l.type="min_score";else if(j.hasClass("max_score_requirement"))l.type="max_score";else if(j.hasClass("must_contribute_requirement"))l.type="must_contribute";else if(j.hasClass("must_submit_requirement"))l.type="must_submit";var o=false;if(h&&h.requirements_met)for(var n=0;n<h.requirements_met.length;n++){var p=h.requirements_met[n];if(p.id==l.id&&p.type==l.type)o=true}o||k.push(j.find(".title:first").text())});e.find(".still_need_completing").append("<b>Still Needs to Complete:</b><br/>").append(k.join("<br/>"))}e.removeClass("locked").removeClass("in_progress").removeClass("completed").addClass(f);
d.progressString=d.progress;e.fillTemplateData({data:d})})});$(".module_progressions_link").click(function(a){a.preventDefault();var c=$("#student_progression_dialog"),d=c.find(".student_list");d.find(".student:not(.blank)").remove();c.find(".side_tabs_content tbody .module:not(.blank)").remove();a=$("#context_modules .context_module:visible");var e=[];a.each(function(){var f=$(this).attr("id").substring(15);e.push(f)});$("#progression_list .student").each(function(){var f=c.find(".student.blank:first").clone(true).removeClass("blank"),
g=$(this).getTemplateData({textValues:["name","id","current_module"]});g.current_module=g.current_module||"none in progress";f.find("a").attr("href","#"+g.id);f.fillTemplateData({data:g});d.append(f.show())});a.each(function(){var f=$(this).find(".header").getTemplateData({textValues:["id","name"]}),g=c.find(".module.blank:first").clone(true).removeClass("blank");g.addClass("module_"+f.id);g.fillTemplateData({data:f});c.find(".side_tabs_content tbody").append(g.show())});$("#student_progression_dialog").dialog("close").dialog({autoOpen:false,
width:800,open:function(){$(this).find(".student:not(.blank):first .name").click()}}).dialog("open")});$(".context_module .progression_details_link").click(function(a){a.preventDefault();var c=$(this).parents(".context_module").find(".header").getTemplateData({textValues:["id","name"]});c.module_name=c.name;var d=$("#module_progression_dialog");d.fillTemplateData({data:c});d.find("ul").empty();d.find(".progression_list").hide();$("#progression_list .student").each(function(){var e=$(this).find(".progressions .progression_"+
c.id).getTemplateData({textValues:["context_module_id","workflow_state"]});e.workflow_state=e.workflow_state||"locked";e.name=$(this).getTemplateData({textValues:["name"]}).name;d.find("."+e.workflow_state+"_list").show().find("ul").show().append("<li>"+e.name+"</li>")});$("#module_progression_dialog").dialog("close").dialog({autoOpen:false,title:"Student Progress for Module",width:500}).dialog("open")})});
modules.initModuleManagement=function(){$("#unlock_module_at").change(function(){$(".unlock_module_at_details").showIf($(this).attr("checked"));$(this).attr("checked")||$("#context_module_unlock_at").val("").triggerHandler("change")}).triggerHandler("change");$(".context_module").bind("update",function(b,a){a.context_module.unlock_at=$.parseFromISO(a.context_module.unlock_at).datetime_formatted;var c=$("#context_module_"+a.context_module.id);c.find(".header").fillTemplateData({data:a.context_module,
hrefValues:["id"]});c.find(".footer").fillTemplateData({data:a.context_module,hrefValues:["id"]});c.find(".unlock_details").showIf(a.context_module.unlock_at&&Date.parse(a.context_module.unlock_at)>new Date);c.find(".footer .prerequisites").empty();for(var d in a.context_module.prerequisites){var e=a.context_module.prerequisites[d],f=$("#display_criterion_blank").clone(true).removeAttr("id");f.fillTemplateData({data:e});c.find(".footer .prerequisites").append(f.show())}c.find(".context_module_items .context_module_item").removeClass("progression_requirement").removeClass("min_score_requirement").removeClass("max_score_requirement").removeClass("must_view_requirement").removeClass("must_submit_requirement").removeClass("must_contribute_requirement");
for(d in a.context_module.completion_requirements){e=a.context_module.completion_requirements[d];e.criterion_type=e.type;f=c.find("#context_module_item_"+e.id);f.find(".criterion").fillTemplateData({data:e});f.find(".completion_requirement").fillTemplateData({data:e});f.find(".criterion").addClass("defined");f.addClass(e.type+"_requirement").addClass("progression_requirement")}c.find(".footer.prerequisites_footer").showIf(a.context_module.prerequisites&&a.context_module.prerequisites.length>0);modules.refreshModuleList()});
$("#add_context_module_form").formSubmit({object_name:"context_module",processData:function(b){var a=[];$(this).find(".prerequisites_list .criteria_list .criterion").each(function(){var c=$(this).find(".option select").val();c&&a.push("module_"+c)});b["context_module[prerequisites]"]=a.join(",");b["context_module[completion_requirements][none]"]="none";$(this).find(".completion_criteria_list .criteria_list .criterion").each(function(){var c=$(this).find(".id").val();b["context_module[completion_requirements]["+
c+"][type]"]=$(this).find(".type").val();b["context_module[completion_requirements]["+c+"][min_score]"]=$(this).find(".min_score").val()});return b},beforeSubmit:function(b){var a=$(this).data("current_module");a.loadingImage();a.find(".header").fillTemplateData({data:b});a.addClass("dont_remove");modules.hideEditModule();a.removeClass("dont_remove");return a},success:function(b,a){a.loadingImage("remove");a.attr("id","context_module_"+b.context_module.id);$("#no_context_modules_message").slideUp();
a.triggerHandler("update",b)},error:function(b,a){a.loadingImage("remove")}});$("#add_context_module_form .add_prerequisite_link").click(function(b){b.preventDefault();b=$(this).parents("#add_context_module_form");var a=b.data("current_module"),c=$("#module_list").clone(true).removeAttr("id"),d=b.find("#criterion_blank").clone(true).removeAttr("id");c.find("."+a.attr("id")).remove();var e=[];$("#context_modules .context_module").each(function(){if($(this)[0]==a[0]||e.length>0)e.push($(this).getTemplateData({textValues:["id"]}).id)});
for(var f in e)c.find(".context_module_"+e[f]).attr("disabled",true);d.find(".option").empty().append(c.show());b.find(".prerequisites_list .criteria_list").append(d).show();d.slideDown();b.find(".no_prerequisites_message").hide();c.focus()});$("#add_context_module_form .add_completion_criterion_link").click(function(b){b.preventDefault();b=$(this).parents("#add_context_module_form");var a=b.data("current_module"),c=$("#completion_criterion_option").clone(true).removeAttr("id"),d=c.find("select.id"),
e=b.find("#criterion_blank").clone(true).removeAttr("id");e.find(".prereq_desc").remove();modules.prerequisites();var f={};a.find(".content .context_module_item").not(".context_module_sub_header").each(function(){var g=$(this).getTemplateData({textValues:["id","title","type"]}),h=$.pluralize($.titleize(g.type||"item"));if(g.type=="assignment")h="Assignments";else if(g.type=="attachment")h="Files";else if(g.type=="quiz")h="Quizzes";else if(g.type=="external_url")h="External URLs";else if(g.type=="discussion_topic")h=
"Discussions";else if(g.type=="wiki_page")h="Wiki Pages";var k=f[h];if(!k){k=f[h]=$(document.createElement("optgroup"));k.attr("label",h);d.append(k)}h=g.title;var j=$(document.createElement("option"));j.val(g.id).text(h);k.append(j)});e.find(".option").empty().append(c);c.slideDown();b.find(".completion_criteria_list .criteria_list").append(e).show();e.slideDown();b.find(".no_criteria_message").hide();d.change().focus()});$("#completion_criterion_option .id").change(function(){var b=$(this).parents(".completion_criterion_option"),
a=$("#context_module_item_"+$(this).val()).getTemplateData({textValues:["type"]});b.find(".type option").hide().attr("disabled",true).end().find(".type option.any").show().attr("disabled",false).end().find(".type option."+a.type).show().attr("disabled",false);b.find(".type").val(b.find(".type option."+a.criterion_type+":first").val());b.find(".type").change()});$("#completion_criterion_option .type").change(function(){var b=$(this).parents(".completion_criterion_option");b.find(".min_score_box").showIf($(this).val()==
"min_score");var a=b.find(".id").val();b.find(".points_possible").text($("#context_module_item_"+a+" .points_possible").text())});$("#add_context_module_form .delete_criterion_link").click(function(b){b.preventDefault();$(this).parents(".criterion").slideUp(function(){$(this).remove()})});$(".delete_module_link").live("click",function(b){b.preventDefault();$(this).parents(".context_module").confirmDelete({url:$(this).attr("href"),message:"Are you sure you want to delete this module?",success:function(a){var c=
a.context_module.id;$(".context_module .prerequisites .criterion").each(function(){var d=$(this).getTemplateData({textValues:["id","type"]});d.type=="context_module"&&d.id==c&&$(this).remove()});$(this).slideUp(function(){$(this).remove();modules.updateTaggedItems()})}})});$(".outdent_item_link,.indent_item_link").live("click",function(b){b.preventDefault();b=$(this).hasClass("indent_item_link");var a=$(this).parents(".context_module_item"),c=modules.currentIndent(a);c=Math.max(Math.min(c+(b?1:-1),
5),0);a.loadingImage({image_size:"small"});$.ajaxJSON($(this).attr("href"),"PUT",{"content_tag[indent]":c},function(d){a.loadingImage("remove");var e=$("#context_module_"+d.content_tag.context_module_id);modules.addItemToModule(e,d.content_tag);e.find(".context_module_items").sortable("refresh")},function(){})});$(".edit_item_link").live("click",function(b){b.preventDefault();b=$(this).parents(".context_module_item");var a=b.getTemplateData({textValues:["title","url","indent"]});a.indent=modules.currentIndent(b);
$("#edit_item_form").find(".external_url").showIf(b.hasClass("external_url"));$("#edit_item_form").attr("action",$(this).attr("href"));$("#edit_item_form").fillFormData(a,{object_name:"content_tag"});$("#edit_item_form").dialog("close").dialog({autoOpen:false,title:"Edit Item Details"}).dialog("open")});$("#edit_item_form .cancel_button").click(function(){$("#edit_item_form").dialog("close")});$("#edit_item_form").formSubmit({beforeSubmit:function(){$(this).loadingImage()},success:function(b){$(this).loadingImage("remove");
var a=$("#context_module_"+b.content_tag.context_module_id);modules.addItemToModule(a,b.content_tag);a.find(".context_module_items").sortable("refresh");$(this).dialog("close")},error:function(b){$(this).loadingImage("remove");$(this).formErrors(b)}});$(".delete_item_link").live("click",function(b){b.preventDefault();$(this).parents(".context_module_item").confirmDelete({url:$(this).attr("href"),message:"Are you sure you want to remove this item from the module?",success:function(){$(this).slideUp(function(){$(this).remove();
modules.updateTaggedItems()})}})});$(".edit_module_link").live("click",function(b){b.preventDefault();modules.editModule($(this).parents(".context_module"))});$(".add_module_link").live("click",function(b){b.preventDefault();b=$("#context_module_blank").clone(true).attr("id","context_module_new");$("#context_modules").append(b);b.find(".context_module_items").sortable(modules.sortable_module_options);$("#context_modules").sortable("refresh");$("#context_modules .context_module .context_module_items").each(function(){$(this).sortable("refresh");
$(this).sortable("option","connectWith",".context_module_items")});modules.editModule(b)});$(".add_module_item_link").live("click",function(b){b.preventDefault();var a=$(this).closest(".context_module");if(a.hasClass("collapsed_module"))a.find(".expand_module_link").triggerHandler("click",function(){a.find(".add_module_item_link").click()});else if(INST&&INST.selectContentDialog){var c=$(this).parents(".context_module").find(".header").getTemplateData({textValues:["name","id"]});b={for_modules:true};
b.select_button_text="Add Item";b.holder_name=c.name;b.dialog_title="Add Item to "+c.name;b.submit=function(d){var e=$("#context_module_"+c.id),f=modules.addItemToModule(e,d);e.find(".context_module_items").sortable("refresh");var g=e.find(".add_module_item_link").attr("href");f.loadingImage({image_size:"small"});$.ajaxJSON(g,"POST",d,function(h){f.loadingImage("remove");f.remove();h.content_tag.type=d["item[type]"];modules.addItemToModule(e,h.content_tag);e.find(".context_module_items").sortable("refresh");
modules.updateAssignmentData()})};INST.selectContentDialog(b)}});$("#add_module_prerequisite_dialog .cancel_button").click(function(){$("#add_module_prerequisite_dialog").dialog("close")});$(".delete_prerequisite_link").live("click",function(b){b.preventDefault();var a=$(this).parents(".criterion"),c=[];$(this).parents(".context_module .prerequisites .criterion").each(function(){if($(this)[0]!=a[0]){var e=$(this).getTemplateData({textValues:["id","type"]});c.push((e.type=="context_module"?"module":
e.type)+"_"+e.id)}});b=$(this).parents(".context_module").find(".edit_module_link").attr("href");var d={"context_module[prerequisites]":c.join(",")};a.dim();$.ajaxJSON(b,"PUT",d,function(e){$("#context_module_"+e.context_module.id).triggerHandler("update",e)})});$("#add_module_prerequisite_dialog .submit_button").click(function(){var b=$("#add_module_prerequisite_dialog .prerequisite_module_select select").val();if(b){$("#add_module_prerequisite_dialog").loadingImage();var a=[];a.push("module_"+b);
b=$("#context_module_"+$("#add_module_prerequisite_dialog").getTemplateData({textValues:["context_module_id"]}).context_module_id);b.find(".prerequisites .criterion").each(function(){a.push("module_"+$(this).getTemplateData({textValues:["id","name","type"]}).id)});b=b.find(".edit_module_link").attr("href");var c={"context_module[prerequisites]":a.join(",")};$.ajaxJSON(b,"PUT",c,function(d){$("#add_module_prerequisite_dialog").loadingImage("remove");$("#add_module_prerequisite_dialog").dialog("close");
$("#context_module_"+d.context_module.id).triggerHandler("update",d)},function(d){$("#add_module_prerequisite_dialog").loadingImage("remove");$("#add_module_prerequisite_dialog").formErrors(d)})}});$(".context_module .add_prerequisite_link").live("click",function(b){b.preventDefault();b=$(this).parents(".context_module").find(".header").getTemplateData({textValues:["name","id"]});$("#add_module_prerequisite_dialog").fillTemplateData({data:{module_name:b.name,context_module_id:b.id}});var a=$(this).parents(".context_module"),
c=$("#module_list").clone(true).removeAttr("id");c.find("."+a.attr("id")).remove();var d=[];$("#context_modules .context_module").each(function(){if($(this)[0]==a[0]||d.length>0)d.push($(this).getTemplateData({textValues:["id"]}).id)});for(var e in d)c.find(".context_module_"+d[e]).attr("disabled",true);$("#add_module_prerequisite_dialog").find(".prerequisite_module_select").empty().append(c.show());$("#add_module_prerequisite_dialog").dialog("close").dialog({autoOpen:true,title:"Add Prerequisite to "+
b.name,width:400}).dialog("open")});$("#add_context_module_form .cancel_button").click(function(){modules.hideEditModule(true)});setTimeout(function(){var b=[];$("#context_modules .context_module_items").each(function(){b.push($(this))});var a=function(){if(b.length>0){b.shift().sortable(modules.sortable_module_options);setTimeout(a,10)}};a();$("#context_modules").sortable({handle:".reorder_module_link",helper:"clone",containment:"#context_modules_sortable_container",axis:"y",update:function(){var c=
[];$("#context_modules .context_module").each(function(){c.push($(this).attr("id").substring(15))});var d=$(".reorder_modules_url").attr("href");$("#context_modules").loadingImage();$.ajaxJSON(d,"POST",{order:c.join(",")},function(e){$("#context_modules").loadingImage("remove");for(var f in e){var g=e[f];$("#context_module_"+g.context_module.id).triggerHandler("update",g)}},function(){$("#context_modules").loadingImage("remove")})}});modules.refreshModuleList()},1E3)};