(function(a){a.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(c,e){this.defaults.type=c;this.defaults.name=e},get:function(c,e){var d=a.extend({},this.defaults,e);if(!d.single.length)d.single="metadata";var b=a.data(c,d.single);if(b)return b;b="{}";if(d.type=="class"){var f=d.cre.exec(c.className);if(f)b=f[1]}else if(d.type=="elem"){if(!c.getElementsByTagName)return;f=c.getElementsByTagName(d.name);if(f.length)b=a.trim(f[0].innerHTML)}else if(c.getAttribute!=
undefined)if(f=c.getAttribute(d.name))b=f;if(b.indexOf("{")<0)b="{"+b+"}";b=eval("("+b+")");a.data(c,d.single,b);return b}}});a.fn.metadata=function(c){return a.metadata.get(this[0],c)}})(jQuery);
(function(a){var c={init:function(){a(".assignment_header").click(function(e){e.preventDefault();a(this).find(".ui-icon").toggleClass("ui-icon-circle-arrow-n").end().next(".assignment_details").slideToggle("fast")});a(".revert-grade-link").bind("mouseenter mouseleave",function(){a(this).toggleClass("ui-state-hover")}).click(c.handleGradeSubmit)},handleGradeSubmit:function(e){e.preventDefault();e=a(this).parents("tr").metadata("id").assignment_id;var d=a(this).parents("tr").metadata().user_id,b=a(this).find(".grade").text().replace("--",
""),f=a(".update_submission_grade_url").attr("href"),h=a(".update_submission_grade_url").attr("title");a(".assignment_"+e+"_user_"+d+"_current_grade").addClass("loading");a.ajaxJSON(f,h,{"submission[assignment_id]":e,"submission[user_id]":d,"submission[grade]":b},function(i){a.each(i,function(){var g=this.submission;a(".assignment_"+g.assignment_id+"_user_"+g.user_id+"_current_grade").removeClass("loading").attr("title",a.parseFromISO(g.graded_at).datetime_formatted+" by me.").text(g.grade||"--")})})}};
a(document).ready(c.init)})(jQuery);