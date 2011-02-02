var wikiSidebar,attachAddAssignment,topics={};
(function(){function h(a,c){if(!a){a=$("#topic_blank").clone(true);a.find(".delete_topic_link").show();a.find(".edit_topic_link").show();a.appendTo($("#topic_list")).show();a.attr("id","topic_new")}var b=c.discussion_topic||c.announcement;if(b.assignment){b.points_possible=b.assignment.points_possible;b.due_at=$.parseFromISO(b.assignment.due_at).datetime_formatted;b.assignment_group_id=b.assignment.assignment_group_id}var d=$("#topics_reorder_list topic_"+b.id);if(d.length===0){d=$("<li class='topic'/>");
d.addClass("topic_"+b.id);$("#topics_reorder_list").prepend(d)}d.text(b.title);$("#topics_reorder_list").sortable("refresh");a.toggleClass("announcement",!!c.announcement);b.user_name=b.user_name?b.user_name:"";delete b.user;d=$.parseFromISO(b.created_at,"event");b.post_date=d.datetime_formatted;if(b.assignment){b.assignment_title=b.assignment.title;a.find(".topic_assignment_link").attr("href",$.replaceTags(a.find(".topic_assignment_url").attr("href"),"assignment_id",b.assignment_id));if(b.assignment.points_possible)b.assignment_points_possible=
b.assignment.points_possible}a.find(".attachment_data").showIf(b.attachment);if(b.attachment){b.attachment_name=b.attachment.display_name;d=$.replaceTags(a.find(".topic_attachment_url").attr("href"),"attachment_id",b.attachment.id);a.find(".attachment_name").attr("href",d)}if(b.workflow_state=="post_delayed"&&b.delayed_post_at)b.delayed_post_at=$.parseFromISO(b.delayed_post_at).datetime_formatted;a.find(".locked_icon").toggleClass("locked",b.workflow_state=="locked");b.assignment_title=b.title;a.find(".content .message_html").val(b.message);
a.fillTemplateData({id:"topic_"+b.id,data:b,htmlValues:["message"],hrefValues:["id","user_id","discussion_topic_id"]});a.find("a.user_name").text().length&&a.find("a.user_name").show();b.discussion_subentry_count&&a.find(".replies").text(b.discussion_subentry_count+" Replies");a.find(".for_assignment").showIf(b.assignment_id);a.find(".assignment_points").showIf(b.assignment&&b.assignment.points_possible);a.find(".delayed_posting").showIf(b.workflow_state=="post_delayed"&&b.delayed_post_at);a.find(".edit_topic_link").showIf(b.permissions&&
b.permissions.update);a.find(".delete_topic_link").showIf(b.permissions&&b.permissions["delete"])}function g(a){f(true);var c=$("#add_topic_form").clone(true);a.attr("id")=="topic_id"&&a.attr("id","topic_new");var b=a.attr("id");c.addClass("add_topic_form_new").attr("id","add_topic_form_"+b).find(".topic_content").addClass("topic_content_new").attr("id","topic_content_"+b);var d=a.getTemplateData({textValues:["title","is_announcement","delayed_post_at","assignment[id]","attachment_name","assignment[points_possible]",
"assignment[assignment_group_id]","assignment[due_at]"],htmlValues:["message"]});d.message=a.find(".content .message_html").val();if(d.title=="No Title")d.title="Topic Title";if(d.delayed_post_at)d.delay_posting="1";if(d["assignment[id]"])d["assignment[set_assignment]"]="1";var e=a.hasClass("announcement")?"Announcement":"Topic",i="Update",j="Update";c.attr("method","PUT");c.attr("action",a.find(".edit_topic_url").attr("href"));c.find(".discussion_remove_attachment").val("0");c.find(".add_attachment").show().end().find(".no_attachment").showIf(!d.attachment_name).end().find(".current_attachment").showIf(d.attachment_name).end().find(".upload_attachment").hide().end().find(".attachment_name").text(d.attachment_name);
c.find(".datetime_field").datetime_field();c.find(".announcement_option").showIf(a.attr("id")=="topic_new");if(a.attr("id")=="topic_new"){i="Add New";j="Add";c.attr("method","POST");c.attr("action",$("#topic_urls .add_topic_url").attr("href"))}c.fillFormData(d,{object_name:"discussion_topic"});c.find(".is_announcement").change();a.find(".content").show().find(".links").hide().end().find(".message").hide().end().append(c.show()).end().find(".header").find(".post_date").hide().end().find(".link_box").hide().end().find(".title").hide().end().find(".topic_icon").hide().end().prepend("<span class='add_message title'>"+
i+" "+e+"</span>").hide();c.find("#topic_content_"+b).editorBox();c.find("#topic_content_"+b).editorBox("set_code",d.message);if(wikiSidebar){wikiSidebar.attachToEditor(c.find("#topic_content_"+b));wikiSidebar.show();$("#sidebar_content").hide()}c.find("button.submit_button").html(j+" "+e);c.find("input[type='text']:first").focus().select();$("html,body").scrollTo(c)}function f(a){var c=$(".add_topic_form_new");c.hideErrors();var b=c.parents(".topic");try{c.find(".topic_content_new").editorBox("destroy")}catch(d){INST.log_error({Msg:d.message||
d.description||"",Line:d.lineNumber||""})}c.hide();b.find(".header .add_message").remove();b.find(".header").show().find(".post_date").show().end().find(".add_message").remove().end().find(".title").show().end().find(".topic_icon").css("display","").end().find(".link_box").show().end().end().find(".content").show().find(".links").show().end().find(".message").show().end();c.appendTo($("body"));if(wikiSidebar){wikiSidebar.hide();$("#sidebar_content").show()}if(a){b.attr("id")=="topic_new"&&b.remove();
$("#topic_list > .topic").length===0&&$("#no_topics_message").show()}}topics.updateTopic=h;$(document).ready(function(){if(wikiSidebar){wikiSidebar.init();$.scrollSidebar()}attachAddAssignment&&$.isFunction(attachAddAssignment)&&attachAddAssignment($("#add_topic_form .assignment_id_value"),null,".assignment_id_value",function(){return $(this).parents("form").find(".topic_title").val()});$(".reorder_topics_link").click(function(a){a.preventDefault();$("#reorder_topics_dialog").dialog("close").dialog({autoOpen:false,
title:"Reorder Discussions",width:400,modal:true}).dialog("open")});$("#topics_reorder_list").sortable({axis:"y"});$("#reorder_topics_form").submit(function(){var a=[];$("#reorder_topics_form .reorder_topics_button").text("Reordering...");$("#reorder_topics_form button").attr("disabled",true);$("#topics_reorder_list li").each(function(){var c=$(this).attr("class").split(/\s/),b=null,d;for(d in c){var e=c[d];if(e.match(/topic_/))b=e.substring(6)}b&&a.push(b)});$("#reorder_topics_ids").val(a.join(","))});
$("#reorder_topics_form .cancel_button").click(function(){$("#reorder_topics_dialog").dialog("close")});$("#add_topic_form .topic_title").formSuggestion();$("#add_topic_form .delay_posting").change(function(){$(this).parents("form").find(".delay_posting_option").showIf($(this).attr("checked"))}).change();$("#add_topic_form .set_assignment").change(function(){$(this).parents("form").find(".set_assignment_option").showIf($(this).attr("checked"));$(this).parents("form").find(".announcement_option").showIf(!$(this).attr("checked")&&
$(this).parents("form").attr("id").match(/_new$/))}).change();$("#add_topic_form .is_announcement").change(function(){$(this).parents("form").find(".assignment_options").showIf(!$(this).attr("checked"))});$("#add_topic_form .add_attachment_link").click(function(a){a.preventDefault();a=$(this).parents("form");a.find(".no_attachment").slideUp().addClass("current");a.find(".current_attachment").hide().removeClass("current");a.find(".upload_attachment").slideDown()});$("#add_topic_form .delete_attachment_link").click(function(a){a.preventDefault();
a=$(this).parents("form");a.find(".current_attachment").slideUp().removeClass("current");a.find(".no_attachment").slideDown().addClass("current");a.find(".upload_attachment").hide();a.find(".discussion_remove_attachment").val("1")});$("#add_topic_form .replace_attachment_link").click(function(a){a.preventDefault();a=$(this).parents("form");a.find(".upload_attachment").slideDown();a.find(".no_attachment").hide().removeClass("current");a.find(".current_attachment").slideUp().addClass("current")});$("#add_topic_form .cancel_attachment_link").click(function(a){a.preventDefault();
a=$(this).parents("form");a.find(".no_attachment.current").slideDown();a.find(".upload_attachment").slideUp();a.find(".current_attachment.current").slideDown();a.find(".attachment_uploaded_data").val("");a.find(".discussion_remove_attachment").val("0")});$(".topic .editable_locked_icon").click(function(a){a.preventDefault();var c=$(this).parents(".topic");a=$(this).hasClass("locked")?"0":"1";var b=$(this);b.loadingImage({image_size:"small"});var d=$(this).parents(".topic").find(".edit_topic_link").attr("href");
$.ajaxJSON(d,"PUT",{"discussion_topic[lock]":a},function(e){b.loadingImage("remove");e=e.discussion_topic||e.announcement;c.find(".locked_icon").toggleClass("locked",e.workflow_state=="locked");c.find(".locked_icon").attr("title",e.workflow_state=="locked"?"Unlock this Topic":"Lock this Topic")},function(){b.loadingImage("remove")})});$("#add_topic_form").formSubmit({fileUpload:function(a){(a=a["attachment[uploaded_data]"])&&$(this).attr("action",$(this).attr("action")+".text");return a},object_name:"discussion_topic",
required:["title"],processData:function(a){var c=$(this).getFormData({object_name:"discussion_topic"});try{c.message=$(this).find(".topic_content_new").editorBox("get_code")}catch(b){return}c.message=$(this).find(".topic_content_new").editorBox("get_code");c["discussion_topic[message]"]=c.message;if(!c.message){$(this).errorBox("Please enter a message");return false}if(a.delay_posting=="1")if(!c["discussion_topic[delayed_post_at]"]){$(this).find(".delayed_post_at_value").errorBox("Please select a valid date time");
return false}return c},beforeSubmit:function(a){var c="Updating...",b=$(this).parents(".topic");if(b.attr("id")=="topic_new"){c="Adding...";b.attr("id","topic_id")}a.post_date=c;b.fillTemplateData({data:a,htmlValues:["message"]});b.find(".content").loadingImage();f();return b},success:function(a,c){h(c,a);c.find(".content").loadingImage("remove")},error:function(a,c){c.find(".content").loadingImage("remove");g(c);if(c.attr("id")=="topic_id"){addingMessage="Adding...";c.attr("id","topic_new")}return c.find("form")}});
$("#add_topic_form .cancel_button").click(function(){$(this).parents(".topic");f(true)});$(".add_topic_link").click(function(a){a.preventDefault();$("#no_topics_message").hide();if(!($("#topic_new").length>0)){a=$("#topic_blank").clone(true);a.find(".delete_topic_link").show();a.find(".edit_topic_link").show();a.prependTo($("#topic_list")).show();a.attr("id","topic_new");g(a)}});$(".switch_topic_views_link").click(function(a){a.preventDefault();$(this).parents("form").find("textarea").editorBox("toggle")});
$(".topic").bind("mouseover focus",function(){$(this).find(".header .locked_icon").addClass("locked_icon_hover")}).bind("mouseout blur",function(){$(this).find(".header .locked_icon").removeClass("locked_icon_hover")});$(".edit_topic_link").click(function(a){a.preventDefault();$topic=$(this).parents(".topic");if($topic.length==0)$topic=$("#topic_list .topic:visible:first");$topic.length>0&&g($topic)});$(".delete_topic_link").click(function(a){a.preventDefault();a=$("form:first").getFormData().authenticity_token;
var c=$(this).parents(".topic"),b=c.hasClass("announcement")?"Announcement":"Topic";c.confirmDelete({message:"Are you sure you want to delete this "+b.toLowerCase()+"?",token:a,url:$(this).attr("href"),success:function(){$(this).fadeOut("slow",function(){$(this).remove();$("#topic_list > .topic").length||$("#no_topics_message").show()})},error:function(d){$(this).formErrors(d)}})});$("#add_topic_form :text").keycodes("tab esc",function(a){if($(this).hasClass("topic_title")&&a.keyCode==9){$(this).blur();
$(this).parents("form").find(".topic_content_new").editorBox("focus");a.preventDefault()}else if(a.keyCode==27){a.preventDefault();f(true)}});$(document).fragmentChange(function(a,c){c=="#new"&&$(".add_topic_link:visible:first").click()}).fragmentChange()})})();