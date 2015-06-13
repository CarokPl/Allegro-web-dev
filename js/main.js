 $(document).ready(function () {
     var source = $("#message-template").html();
     var template = Handlebars.compile(source);
     $.get("/api/post.json", function (data) {
         $.each(data, function (index, value) {
             var html = template(value);
             $('#messages').append(html);
         });
     });
 })