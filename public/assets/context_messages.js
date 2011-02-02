$(document).ready(function(){var d=[];$("#visible_message_types :checkbox").each(function(){$(this).attr("checked")&&d.push($(this).val())});d=d.join(",");$("#visible_message_types :checkbox").change(function(){var a=[];$("#visible_message_types :checkbox").each(function(){$("#message_list").toggleClass("show_"+$(this).val(),!!$(this).attr("checked"));$(this).attr("checked")&&a.push($(this).val())});a=a.join(",");a!=d&&$.ajaxJSON($(".update_user_url").attr("href"),"PUT",{"user[visible_inbox_types]":a},
function(b){d=b.user.visible_types},function(){})}).change();$("#mark_inbox_as_read_form").formSubmit({beforeSubmit:function(){$(this).find("button").attr("disabled",true).find(".msg").text("Marking All as Read...")},success:function(){$("#message_list .inbox_item:visible").addClass("read");$(this).find("button").attr("disabled",false).find(".msg").text("Mark All as Read");$("#identity .unread-messages-count").remove();$(this).slideUp()},error:function(){$(this).find("button").attr("disabled",false).find(".msg").text("Marking failed, please try again")}});
$(".context_message.read").find(".header_icon,.title").attr("title","Click to Expand Message");$(".recipients_dialog .clear_recipients_link").click(function(a){a.preventDefault();a=$(this).parents(".recipients_dialog");a.find(".right_side :checkbox").attr("checked",false);a.find(".left_side .select_recipients_link").removeClass("selected")});$(".recipients_dialog .right_side :checkbox").change(function(){$(this).parents(".recipients_dialog").triggerHandler("recipients_change")});$(".recipients_dialog").bind("recipients_change",
function(){var a=$(this);a.find(".left_side .select_recipients_link.selected").each(function(){var b=true;$(this).find(".group_recipient").each(function(){var e=$(this).find(".user_id").text();if(a.find(".right_side #"+a.attr("id")+"_user_"+e).length>0)a.find(".right_side #"+a.attr("id")+"_user_"+e).attr("checked")||(b=false)});$(this).toggleClass("selected",b)})});$(".recipients_dialog").bind("recipients_group_select",function(){var a=$(this);a.find(".left_side .select_recipients_link.selected").each(function(){$(this).find(".group_recipient").each(function(){var b=
$(this).find(".user_id").text();a.find(".right_side #"+a.attr("id")+"_user_"+b).attr("checked",true)})})});$(".recipients_dialog .select_recipients_link").click(function(a){a.preventDefault();var b=$(this).parents(".recipients_dialog");$(this).toggleClass("selected");$(this).hasClass("selected")||$(this).find(".group_recipient").each(function(){var e=$(this).find(".user_id").text();b.find(".right_side #"+b.attr("id")+"_user_"+e).attr("checked",false)});b.triggerHandler("recipients_group_select")});
$(".send_message_form").formSubmit({fileUpload:function(){return $(this).find(".file_input:visible").length>0},object_name:"context_message",required:["subject","body"],processData:function(a){var b=[];$(this).find(".recipients .recipient:visible").each(function(){var e=$(this).getTemplateData({textValues:["id"]}).id;e&&b.push(e)});if(b.length===0){$(this).errorBox("Please select at least one recipient");return false}$(this).find(".recipient_ids").val(b.join(","));a["context_message[recipients]"]=
b.join(",");$(this).attr("action").match(/\.text$/)||$(this).attr("action",$(this).attr("action")+".text");return a},beforeSubmit:function(){$(this).loadingImage();$(this).find(".send_button").attr("disabled",true).text("Sending Message...");$(this).find(".cancel_button").attr("disabled",true)},success:function(a){$(this).find(".send_button").attr("disabled",false).text("Send Message");$(this).find(".cancel_button").attr("disabled",false);$(this).loadingImage("remove");if($("#messages_view").text()==
"Sentbox"){$(this).find(".cancel_button").click();a=messages.updateMessage(null,a,"top");$("#message_list").prepend(a)}else{$.flashMessage("Message Sent!");var b=$(this);setTimeout(function(){b.slideUp(function(){b.find(".cancel_button").click()})},500)}},error:function(a){$(this).find(".send_button").attr("disabled",false).text("Send Message");$(this).find(".cancel_button").attr("disabled",false);$(this).loadingImage("remove");$(this).formErrors(a)}});$(".send_message_form .select_recipients").click(function(){var a=
$(this).parents(".send_message_form"),b=a.find(".recipients_url").attr("href"),e=$("#"+a.attr("id")+"_dialog");if(e.hasClass("loaded"))a.triggerHandler("recipients_loaded");else{e.children(".left_side,.right_side").children().hide();e.children(".left_side").append("<div class='message'>Loading Recipients List...</div>");$.ajaxJSON(b,"GET",{},function(f){e.find(".message").remove();e.children(".left_side,.right_side").children().show();var g=f.groups,l={};student_ids={};for(var h in f.groups){var k=
g[h].group||g[h].course_assigned_group;l[k.category]=l[k.category]||[];l[k.category].push(k)}for(h in f.teachers){var i=f.teachers[h].user,j=e.find(".group_recipient.blank:first").clone(true).removeClass("blank");j.find(".user_id").text(i.id);e.find(".message_all_teachers_link").append(j)}for(h in f.students){i=f.students[h].user;j=e.find(".group_recipient.blank:first").clone(true).removeClass("blank");student_ids[i.id]=true;j.find(".user_id").text(i.id);e.find(".message_all_students_link").append(j)}for(var o in l){g=
l[o];var n=e.find(".category.blank").clone(true).removeClass("blank");for(h in g){k=g[h];var m=n.find(".message_group.blank").clone(true).removeClass("blank");m.find(".group_name").text(k.name);for(var p in f.group_members[k.id]){i=f.group_members[k.id][p].user;j=m.find(".group_recipient.blank").clone(true).removeClass("blank");j.find(".user_id").text(i.id);m.find(".message_group_link").append(j)}n.append(m.show())}e.find(".left_side .message_groups").show().append(n.show())}for(h in f.users){i=f.users[h].user;
j=e.find(".right_side .recipient.blank").clone(true).removeClass("blank");student_ids[i.id]&&j.find(":checkbox").addClass("student");j.find(":checkbox").attr("id",e.attr("id")+"_user_"+i.id).val(i.id);j.find(".name").attr("for",e.attr("id")+"_user_"+i.id).text(i.name||i.short_name||i.id);e.find(".right_side .recipients").append(j.show())}e.addClass("loaded");a.triggerHandler("recipients_loaded")})}e.dialog("close").dialog({autoOpen:false,width:600,open:function(){$(this).find(".clear_recipients_link").click()}}).dialog("open")});
$(".recipients_dialog .select_button").click(function(){var a=$("#"+$(this).parents(".recipients_dialog").attr("id").substring().replace("_dialog","")),b=[];$(this).parents(".recipients_dialog").find(".right_side :checkbox:checked").each(function(){var e=$(this).attr("id").split("_").pop(),f=$(this).next("label").text(),g=$(this).hasClass("student");b.push({id:e,user_name:f,is_student:g})});messages.addRecipientsToForm(a,b);$(this).parents(".recipients_dialog").dialog("close")});$(".send_message_form .recipient .delete_recipient_link").click(function(a){a.preventDefault();
$form=$(this).parents("form");$(this).parents(".recipient").remove();messages.updateFacultyJournalOption($form)});$(".recipients_dialog .cancel_button").click(function(){$(this).parents(".recipients_dialog").dialog("close")});$(".context_message .mark_as_read_link").click(function(a){a.preventDefault();var b=$(this).parents(".context_message");b.loadingImage();$.ajaxJSON($(this).attr("href"),"PUT",{},function(){b.loadingImage("remove");b.find(".content:visible").css("display","block");b.addClass("read");
b.find(".content").slideUp()},function(){b.loadingImage("remove")})});$(".context_message").find(".show_message_body_link,.header_title").click(function(a){$(a.target).closest(".sub_title").length==0&&a.preventDefault();var b=$(this).parents(".context_message");if($(a.target).closest("a:not(.show_message_body_link)").length===0){b.find(".show_message_body").remove();b.toggleClass("read_open")}});$(".context_message .content").click(function(a){$(this).parents(".context_message.read:not(.read_open)").length>
0&&$(a.target).closest("a").length===0&&$(this).parents(".context_message").find(".header_title").click()});$(".context_message.read:visible").each(function(){$(this).find(".content").height()+10>$(this).find(".content .inner_content").height()&&$(this).find(".header_title").click()});$("#current_message_context").change(function(){$(".send_message_form").hide();var a=$("#"+$(this).val()+"_recipients");a.find(".recipients .recipient:not(.blank)").remove();a.find(".no_recipients").remove();a.find(".recipients recipients_scroll").prepend("<div class='no_recipients'>No Recipients</div>");
a.find(".context_message_attachment:not(.blank)").remove();a.find(".also_announcement").attr("checked",false);a.find(".root_context_message_id").val("");a.find(":text,textarea").val("");messages.updateFacultyJournalOption(a);a.show()}).change();$(".send_message_form .cancel_button").click(function(){$("#send_message").hide()});$(".new_message_link").click(function(a){a.preventDefault();$("#send_message .context_message").remove();$("#current_message_context").change();$("#send_message").show();$("html,body").scrollTo($("#send_message"))});
$(document).fragmentChange(function(a,b){if(b=="#new_students_message")$(".message_link").click();else if(b.match(/^#reply/)){var e=null;try{e=JSON.parse(decodeURIComponent(b.substring(6)))}catch(f){}e&&$(document).triggerHandler("message_recipients",e)}});$(document).bind("message_recipients",function(a,b){if(b&&b.context_code)if(b.reply_id&&$("#context_message_"+b.reply_id))$("#context_message_"+b.reply_id+" .reply_link").click();else{var e=(b.recipients||"").split(","),f=[];$(".new_message_link").click();
$("#current_message_context").val(b.context_code).change();var g=$(".send_message_form:visible:first");g.find(".root_context_message_id").val(b.reply_id||b.root_id||"");g.find("textarea:first").val(b.body||"");if(b.subject)g.find(".subject").val(b.subject.replace(/\+/g," ")||"");if($("#current_message_context").val()!=b.context_code){g.find(".cancel_button").click();alert("You don't have permissions to create messages for that context")}for(var l in e){var h=e[l],k=messages.findUserName(h);f.push({id:h,
user_name:k,is_student:true})}messages.addRecipientsToForm(g,f,b.context_code)}});$(".context_message").find(".reply_link,.reply_to_all_link").click(function(a){a.preventDefault();a=$(this).parents(".context_message");var b=a.getTemplateData({textValues:["context_code"]}).context_code;$(".new_message_link:first").click();$("#current_message_context").val(b).change();var e=$(".send_message_form:visible:first");if($("#current_message_context").val()!=b){e.find(".cancel_button").click();alert("You don't have permissions to create messages for that context")}var f=
[];if($("#messages_view").text()=="Sentbox")a.find(".recipients_list .recipient").each(function(){var k=$(this).getTemplateData({textValues:["id","user_name"]});f.push(k)});else{var g=a.find(".sub_title .sender_name").text(),l=a.find(".sub_title .sender_name").attr("href").split("/").pop(),h=a.hasClass("student");f.push({id:l,user_name:g,is_student:h})}messages.addRecipientsToForm(e,f,b);b=a.getTemplateData({textValues:["subject"]}).subject;b=(b||"").replace(/^re:\s*/i,"");g=a.getTemplateData({textValues:["root_context_message_id"]}).root_context_message_id;
e.fillFormData({subject:"Re: "+b,root_context_message_id:g},{object_name:"context_message"});a=a.clone(true).removeClass("read");a.find(".link_box,.sub_title,.show_recipients_link").remove();a.find(".subject").text("Original Message");e.find("textarea:first").next().after(a)});var c=0;$(".send_message_form .add_attachment_link").click(function(a){a.preventDefault();a=$(this).parents("td").find(".context_message_attachment.blank").clone(true);c++;a.find(".file_input").attr("name","context_message[attachments]["+
c+"]");a.removeClass("blank");$(this).parents("td").append(a);a.slideDown()});$(".send_message_form .remove_attachment_link").click(function(a){a.preventDefault();$(this).parents(".context_message_attachment").slideUp(function(){$(this).remove()})});$(".context_message").find(".show_recipients_link").click(function(a){a.preventDefault();$(this).parents(".context_message").find(".recipients_list_holder").slideToggle()})});
var messages={findUserName:function(d,c){var a=$.trim($(".user_name_"+d+":first").text());if(!a)for(var b in c){var e=c[b].user;if(e.id==d)a=e.name}return a},addRecipientsToForm:function(d,c,a){var b=false,e;for(e in c){var f=c[e];if(f.id&&f.user_name)if(!a||$("#possible_recipients .user_name_"+f.id+".for_"+a).length>0){b=true;var g=d.find(".recipients .recipient.blank").clone(true).removeClass("blank");g.find(".name").text(f.user_name);g.find(".id").text(f.id);g.addClass("user_"+f.id);f.is_student&&
g.addClass("student");d.find(".recipients .user_"+f.id).length===0&&d.find(".recipients .recipients_scroll").append(g.show());d.find(".recipients .no_recipients").remove()}}b||$("#context_message_recipient_not_available_dialog").dialog({modal:true,width:466,buttons:{Ok:function(){$(this).dialog("close")}}});messages.updateFacultyJournalOption(d)},updateFacultyJournalOption:function(d){if($add_as_user_note=d.find(".add_as_user_note"))if(d.find(".recipients .recipient").size()==2&&d.find(".recipients .recipient.student").size()==
1)$add_as_user_note.attr("disabled",false);else{$add_as_user_note.attr("disabled",true);$add_as_user_note.attr("checked",false)}},updateInboxItem:function(d,c,a){c=c.inbox_item;c.created_at=$.parseFromISO(c.created_at).datetime_formatted;if(!d||d.length===0)d=$("#inbox_item_blank:first").clone(true).removeAttr("id");for(var b in c.recipients){var e=c.recipients[b],f=messages.findUserName(e,c.users),g=d.find(".recipient_blank").clone(true);g.removeClass("recipient_blank").fillTemplateData({data:{id:e,
recipient_id:e,name:f},hrefValues:["recipient_id"]});d.find(".recipients_list").append(g.show())}c.recipient_id=c.user_id;c.recipient_name=messages.findUserName(c.user_id);d.addClass($.underscore(c.asset_type));d.find(".reply_inbox_item_link").showIf(c.asset_type=="ContextMessage");c.sender_name=c.sender_name||messages.findUserName(c.sender_id);b=c.context_code.split("_");c.context_id=b.pop();c.context_type_pluralized=$.pluralize(b.join("_"));c.context_name=$(".context_name_for_"+c.context_code).text();
d.fillTemplateData({data:c,id:"inbox_item_"+c.id,hrefValues:["id","user_id","sender_id","context_id","context_type_pluralized"]});$("#message_list .no_messages").remove();if(d.parents("#message_list").length===0){d.css("display","");if(a&&a=="top"){$("#message_list").prepend(d);$("html,body").scrollTo($("#messages_view"))}else{d.toggleClass("read",c.workflow_state=="read");$("#message_list #pageless-loader").length>0?$("#message_list #pageless-loader").before(d):$("#message_list").append(d)}}return d},
updateMessage:function(d,c,a){c=c.context_message;c.created_at=$.parseFromISO(c.created_at).datetime_formatted;if(!d||d.length===0)d=$(".context_message_blank.for_"+$.underscore(c.context_type)+"_"+c.context_id+":first").clone(true);d.removeClass("context_message_blank");c.is_student&&d.addClass("student");if(c.protect_recipients&&!c.recipients){var b=d.find(".recipient_blank").clone(true);b.removeClass("recipient_blank").text("Recipient list is protected");d.find(".recipients_list").append(b.show());
d.find(".single_recipient_link").showIf(true).end().find(".multiple_recipient_link").showIf(false);c.recipient_id=$("#identity .user_id").text();c.recipient_name=messages.findUserName(c.recipient_id,[]);c.users_count=1}else{for(var e in c.recipients){var f=c.recipients[e],g=messages.findUserName(f,c.users);b=d.find(".recipient_blank").clone(true);b.removeClass("recipient_blank").fillTemplateData({data:{id:f,recipient_id:f,name:g},hrefValues:["recipient_id"]});d.find(".recipients_list").append(b.show())}d.find(".single_recipient_link").showIf(c.recipients.length==
1).end().find(".multiple_recipient_link").showIf(c.recipients.length!=1);c.recipient_id=c.recipients[0];c.recipient_name=messages.findUserName(c.recipients[0],c.users);c.users_count=c.recipients.length}d.addClass("context_message_"+c.id);c.sender_name=messages.findUserName(c.user_id,c.users);d.fillTemplateData({data:c,id:"context_message_"+c.id,hrefValues:["user_id","recipient_id","id"],htmlValues:["formatted_body","subject"]});for(e in c.attachments){b=c.attachments[e].attachment;b.attachment_id=
b.id;f=d.find(".attachment_blank").clone(true).removeClass("attachment_blank");f.fillTemplateData({data:b,hrefValues:["attachment_id"]});d.find(".attachments_list").show().append(f.show())}$("#message_list .no_messages").remove();if(d.parents("#message_list").length===0){d.show();if(a&&a=="top"){$("#message_list").prepend(d);$("html,body").scrollTo($("#messages_view"))}else{a=parseInt($("#identity .user_id").text(),10);a=$.inArray(a,c.viewed_user_ids||[])!=-1;d.toggleClass("read",a);$("#message_list").append(d)}}return d}};
