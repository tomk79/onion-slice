window.bindDirectorySuggestion=function(t){var a=$(t),n=$('<div class="directory-suggestion"></div>');a.after(n),a.on("keyup change",(function(){$.ajax({url:"?a=api.directory_suggestion",type:"post",data:{realpath_base_dir:a.val(),CSRF_TOKEN:$('meta[name="csrf-token"]').attr("content")}}).done((function(t){if(n.html(""),t&&t.result){var e="";t.suggestion.forEach((function(t){e+='<li><button type="button" data-type="'.concat(t.type,'" data-value="').concat(t.realpath,'"').concat("directory"!=t.type?"disabled":"",">").concat(t.realpath,"</button></li>")})),n.append("<ul>".concat(e,"</ul>")),n.find("button").on("click",(function(t){var n=$(this);a.val(n.attr("data-value")).trigger("change")}))}}))}))};