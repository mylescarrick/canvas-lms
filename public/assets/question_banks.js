$(document).ready(function(){$(".add_bank_link").click(function(a){a.preventDefault();a=$("#question_bank_blank").clone(true).attr("id","question_bank_new");$("#questions").prepend(a.show());a.find(".edit_bank_link").click()});$(".question_bank .delete_bank_link").click(function(a){a.preventDefault();$(this).parents(".question_bank").confirmDelete({url:$(this).attr("href"),message:"Are you sure you want to delete this bank of questions?",success:function(){$(this).slideUp(function(){$(this).remove()})}})});
$(".question_bank .bookmark_bank_link").click(function(a){a.preventDefault();var b=$(this).parents(".question_bank");$.ajaxJSON($(this).attr("href"),"POST",{},function(){b.find(".bookmark_bank_link").toggle()})});$(".question_bank .edit_bank_link").click(function(a){a.preventDefault();a=$(this).parents(".question_bank");var b=a.getTemplateData({textValues:["title"]});a.find(".header_content").hide();var c=$("#edit_bank_form");a.find(".header").prepend(c.show());c.attr("action",$(this).attr("href"));
c.attr("method","PUT");if(a.attr("id")=="question_bank_new"){c.attr("action",$("#bank_urls .add_bank_url").attr("href"));c.attr("method","POST")}c.fillFormData(b,{object_name:"assessment_question_bank"});c.find(":text:visible:first").focus().select()});$("#edit_bank_form .bank_name_box").keycodes("return esc",function(a){if(a.keyString=="esc"){$(this).parents(".question_bank").addClass("dont_save");$(this).blur()}else a.keyString=="return"&&$("#edit_bank_form").submit()});$("#edit_bank_form .bank_name_box").blur(function(){var a=
$(this).parents(".question_bank");if(!a.hasClass("dont_save")&&a.attr("id")!="question_bank_new")$("#edit_bank_form").submit();else{a.removeClass("dont_save");a.find(".header_content").show();$("body").append($("#edit_bank_form").hide());a.attr("id")=="question_bank_new"&&a.remove()}});$("#edit_bank_form").formSubmit({object_name:"assessment_question_bank",beforeSubmit:function(a){var b=$(this).parents(".question_bank");b.attr("id","question_bank_adding");try{b.addClass("dont_save");b.find(".bank_name_box").blur();
b.removeClass("saving")}catch(c){}b.fillTemplateData({data:a});b.loadingImage();return b},success:function(a,b){b.loadingImage("remove");var c=a.assessment_question_bank;c.last_updated_at=$.parseFromISO(c.updated_at).datetime_formatted;b.fillTemplateData({data:c,hrefValues:["id"]})},error:function(a,b){b.loadingImage("remove");b.find(".edit_bank_link").click();$("#edit_bank_form").formErrors(a)}})});
