 $(document).ready(function () {
     $.get("/api/post.json", function (data) {
         var source = $("#message-template").html();
         var template = Handlebars.compile(source);
         $.each(data, function (index, value) {
             var html = template(value);
             $('#messages').append(html);
         });
     });
 })