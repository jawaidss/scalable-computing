// User param extraction shamelessly stolen from http://www.netlobo.com/url_query_string_javascript.html
function http_param(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) {
        return "";
    } else {
        return results[1];
    }
}

$(document).ready(function() {
    if(http_param("message") != "") {
        $("div.flash_msg").html("Message successfully posted.");
        $("div.flash_msg").slideDown('fast', function() {
            $("div.flash_msg").delay(1000).slideUp('fast');
        });
    }
});
