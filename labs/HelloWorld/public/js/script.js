$(document).ready(function() {
    $('#create_status form').submit(function() {
        $.ajax({
            data: $(this).serialize(),
            success: function(data, textStatus, jqXHR) {
                var li = $('<li></li>');
                li.html(data.message);
                $('ul#statuses').append(li);
                $('#create_status').modal('hide');
                $('#create_status form').get(0).reset();
                var div = $('<div></div>');
                div.addClass('alert');
                div.addClass('alert-success');
                var a = $('<a></a>');
                a.addClass('close');
                a.attr('data-dismiss', 'alert');
                a.html("&times;");
                div.append(a);
                div.append('Successfully created: ' + data.message);
                $('body > div.container').prepend(div);
                return false;
            },
            type: $(this).attr('method'),
            url: $(this).attr('action')
        });
        return false;
    });
});