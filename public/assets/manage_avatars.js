$(document).ready(function(){$(".update_avatar_link").live("click",function(b){b.preventDefault();b=$(this);if(b.attr("data-state")=="none"){var c=confirm("Are you sure you want to delete this user's profile pic?");if(!c)return}else if(b.attr("data-state")=="locked"){c=confirm("Locking this picture will approve it and prevent the user from updating it.  Continue?");if(!c)return}var a=b.parents("td");c=a.find(".user_avatar_url").attr("href");a.find(".progress").text("Updating...").css("visibility",
"visible");$.ajaxJSON(c,"PUT",{"avatar[state]":b.attr("data-state")},function(d){a.find(".lock_avatar_link").showIf(d.avatar_state!="locked").end().find(".unlock_avatar_link").showIf(d.avatar_state=="locked").end().find(".reject_avatar_link").showIf(d.avatar_state!="none").end().find(".approve_avatar_link").hide();d.avatar_state=="none"&&a.parents("tr").find(".avatar img").attr("src","/images/dotted_pic.png");a.parents("tr").attr("class",d.avatar_state);a.find(".progress").css("visibility","hidden")},
function(){a.find(".progress").text("Update failed, please try again").css("visibility","visible")})})});