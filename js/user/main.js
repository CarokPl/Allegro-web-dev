var base_url = "http://localhost:8080/";

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

    $.get(base_url + "lessonsView/current", function (data) {
        console.log(data);
        $.each(data, function (index, value) {
            var html = templateLesson(value);
            $('.current-lessons').append(html);
        });
    });

});
