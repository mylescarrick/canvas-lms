(function(a){function g(){a("#wiki_page_rename_link").click(function(b){b.preventDefault();a("#wiki_page_rename_section").slideToggle("fast",function(){a(this).find(":text:visible:first").focus().select()})});wikiSidebar.init();wikiSidebar.attachToEditor(a("#wiki_page_body"))}function h(){a("#wiki_show_view_secondary a.edit_link").click(function(b){b.preventDefault();f()});a("#wiki_page_new").find("a.new").click(function(b){b.preventDefault();a("#wiki_page_new").find("form").slideToggle("fast",function(){a("#wiki_page_new :text:visible:first").focus().select()})}).end().find("form").hide()}
function i(){a("#wiki_page_body").editorBox({fullHeight:true,elementToLeaveInViewport:a("#below_editor")});a("#wiki_edit_view_main #cancel_editing").click(function(b){b.preventDefault();f()});a("#wiki_edit_view_main .wiki_switch_views_link").click(function(b){b.preventDefault();a("#wiki_page_body").editorBox("toggle")});if(a("a#page_doesnt_exist_so_start_editing_it_now").length){a("a#page_doesnt_exist_so_start_editing_it_now").click(function(b){b.preventDefault();f()});a(function(){a("a#page_doesnt_exist_so_start_editing_it_now:not(.dont_click)").triggerHandler("click")})}}
function f(){a("#wiki_edit_view_main, #wiki_show_view_main, #wiki_show_view_secondary, #wiki_edit_view_secondary").toggle();a("#wiki_edit_view_page_tools").showIf(a("#wiki_edit_view_page_tools li").length>0);wikiSidebar.toggle();a(window).triggerHandler("resize")}window.wikiPage={init:function(){i();a(function(){g();h()})},updateComment:function(b,d,c){if(!b||b.length==0){b=a("#wiki_page_comment_blank").clone(true).removeAttr("id");c?a("#add_wiki_page_comment_form").after(b):a("#wiki_page_comments .wiki_page_comment:last").after(b);
b.show()}d.created_at_formatted=a.parseFromISO(d.created_at).datetime_formatted;b.fillTemplateData({data:d,id:"wiki_page_commment_"+d.id,hrefValues:["id"],htmlValues:["formatted_body"]});b.toggleClass("current",d.workflow_state=="current");b.toggleClass("deletable_comment",!!(d.permissions&&d.permissions["delete"]))}};a(document).ready(function(){a(document).fragmentChange(function(c,e){e==="#edit"&&a("#wiki_show_view_secondary a.edit_link:visible").click()});var b=false;a(document).bind("mousemove focus keypress",
function(){b=true});var d=function(){if(b){b=false;a.ajaxJSON(a("#latest_page_version").attr("href"),"GET",{},function(c){var e=parseInt(a("#wiki_page_version_number").text(),10);c=c&&c&&c.wiki_page&&c.wiki_page.version_number;if(e&&c&&c>e){a(".someone_else_edited").slideDown();setTimeout(d,24E4)}else setTimeout(d,12E4)},function(){setTimeout(d,6E4)})}else setTimeout(d,12E4)};setTimeout(d,5E3);a(".more_pages_link").click(function(c){c.preventDefault();a(this).parents("ul").find("li").show();a(this).parent("li").remove()});
a(".add_comment_link,.wiki_page_comment .cancel_button").click(function(c){c.preventDefault();a(this).parents(".wiki_page_comment").toggleClass("commenting").find("textarea:visible").val("").focus().select()});a(".delete_comment_link").click(function(c){c.preventDefault();a(this).parents(".wiki_page_comment").confirmDelete({url:a(this).attr("href"),message:"Are you sure you want to delete this comment?",success:function(){a(this).slideUp(function(){a(this).remove()})}})});a("#add_wiki_page_comment_form").formSubmit({beforeSubmit:function(){a(this).find("button").attr("disabled",
true).filter(".submit_button").text("Adding Comment...")},success:function(c){a(this).find("button").attr("disabled",false).filter(".submit_button").text("Add Comment");wikiPage.updateComment(null,c.wiki_page_comment,true);a(this).removeClass("commenting")},error:function(c){a(this).formErrors(c);a(this).find("button").attr("disabled",false).filter(".submit_button").text("Add Comment Failed, Please Try Again")}})})})(jQuery);