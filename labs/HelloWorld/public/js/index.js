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

function flash(msg) {
    $("div.flash_msg").html(msg);
    $("div.flash_msg").slideDown('fast', function() {
        $("div.flash_msg").delay(1000).slideUp('fast');
    });
}

$(document).ready(function() {
    $("#create_status input.btn-primary").click(function() {
        alert($("#create_status input[name='message']").val());
        $.ajax({
            data:{message:$("#create_status input[name='message']").val()},
            type:"PUT",
            url:"/status/create"
        });
    });

    if(http_param("message") != "") {
        flash("Message successfully posted: " + http_param("message"));
    }
});
