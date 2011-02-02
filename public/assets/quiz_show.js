$(document).ready(function(){$(".delete_quiz_link").click(function(a){a.preventDefault();$("nothing").confirmDelete({url:$(this).attr("href"),message:"Are you sure you want to delete this quiz?",success:function(){window.location.href=$("#context_quizzes_url").attr("href")}})});$(".quiz_details_link").click(function(a){a.preventDefault();$("#quiz_details").slideToggle()});$(".message_students_link").click(function(a){a.preventDefault();var g={};a=$("#quiz_title").text();$(".student_list .student").each(function(){var d=
{};d.id=$(this).attr("data-id");d.name=$.trim($(this).find(".name").text());d.submitted=$(this).closest(".student_list").hasClass("submitted");g[d.id]=d});var b=[],c;for(c in g)b.push(g[c]);window.messageStudents({options:[{text:"Have taken the quiz"},{text:"Have NOT taken the quiz"}],title:a,students:b,callback:function(d,h,e){e=$.grep(e,function(f){f=f.user_data;if(d=="Have taken the quiz")return f.submitted;else if(d=="Have NOT taken the quiz")return!f.submitted});return $.map(e,function(f){return f.user_data.id})}})});
$.scrollSidebar();$("#let_students_take_this_quiz_button").ifExists(function(a){var g=$("#unlock_for_how_long_dialog");a.click(function(){g.dialog("open");return false});g.dialog({autoOpen:false,modal:true,resizable:false,width:400,buttons:{Unlock:function(){var b=$(this).find(".datetime_suggest").text();a.closest("form").append($(this).dialog("destroy")).find("#quiz_lock_at").val(b).end().submit()}}}).find(".datetime_field").datetime_field()})});
(function(){var a=$("#message_students_dialog"),g={};window.messageStudents=function(b){g=b;a.find(".message_types").empty();for(var c in b.options){var d=$("<option/>"),h=b.options[c];d.val(c).text(h.text);a.find(".message_types").append(d)}d=b.title;h=a.find("ul li.blank:first");var e=a.find("ul"),f={};a.find("ul li:not(.blank)").remove();for(c in b.students){var i=h.clone(true).removeClass("blank");i.find(".name").text(b.students[c].name);i.find(".score").text(b.students[c].score);i.data("id",
b.students[c].id);i.user_data=b.students[c];e.append(i.show());f[b.students[c].id]=i}e.show();a.data("students_hash",f);a.find(".asset_title").text(d);a.find(".out_of").showIf(b.points_possible!=null);a.find(".subject").val(d);a.find(".send_button").text("Send Message");a.find(".points_possible").text(b.points_possible);a.find("textarea").val("");a.find("select")[0].selectedIndex=0;a.find("select").change();a.dialog("close").dialog({width:600,height:400}).dialog("open").dialog("option","title","Message Students for "+
d)};$(document).ready(function(){a.find(".cutoff_score").bind("change blur keyup",function(){a.find("select").change()});a.find(".cancel_button").click(function(){a.dialog("close")});$("#message_assignment_recipients").formSubmit({processData:function(b){var c=[];$(this).find(".student:visible").each(function(){c.push($(this).data("id"))});if(c.length==0)return false;b["context_message[recipients]"]=c.join(",");return b},beforeSubmit:function(){$(this).find("button").attr("disabled",true).filter(".send_button").text("Sending Message...")},
success:function(){$(this).find(".send_button").text("Message Sent!");var b=$(this);setTimeout(function(){b.find("button").attr("disabled",false).filter(".send_button").text("Send Message");$("#message_students_dialog").dialog("close")},2E3)},error:function(){$(this).find("button").attr("disabled",false).filter(".send_button").text("Sending Message Failed, please try again")}});a.find("select").change(function(){var b=parseInt($(this).val(),10)||0,c=g.options[b],d=a.data("students_hash"),h=parseFloat(a.find(".cutoff_score").val(),
10)||null,e=null,f=[];for(b in d)f.push(d[b]);if(d)if(c&&c.callback)e=c.callback.call(window.messageStudents,h,f);else if(g.callback)e=g.callback.call(window.messageStudents,c.text,h,f);e=e||[];a.find(".cutoff_holder").showIf(c.cutoff);a.find(".student_list").toggleClass("show_score",c.cutoff||c.score);a.find("button").attr("disabled",e.length==0);c={};for(b in e)c[parseInt(e[b],10)||0]=true;for(b in d)d[b].showIf(c[b])})})})();
