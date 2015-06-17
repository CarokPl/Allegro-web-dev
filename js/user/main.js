$(document).ready(function () {
    var sourceMessage = $("#message-template").html();
    var templateMessage = Handlebars.compile(sourceMessage);
    $.get("/api/post.json", function (data) {
        $.each(data, function (index, value) {
            var htmlMessage = templateMessage(value);
            $('#messages').append(htmlMessage);
        });
    });

    var sourceLesson = $("#lesson-template").html();
    var templateLesson = Handlebars.compile(sourceLesson);

    $.get("http://192.168.0.18:8080/lessonsView/current", function (data) {
        console.log(data);
        $.each(data, function (index, value) {
            var html = templateLesson(value);
            $('.current-lessons').append(html);
        });
    });

});
