$(function () {

    $.get('http://192.168.0.18:8080/hour/current', function (data) {
        console.log(data);
        var date = new Date();
        var hour = (date.getHours() * 100) + date.getMinutes();
        var test = data.end -hour;
        
        if (hour < data.start) {
            var timeToShow = data.start - hour;
        } else if (hour < data.end)
            var timeToShow = (test >= 40) ? (test - 40) : test;


        $('.toEnd').html('<i class="fa fa-bell-o animated shake"></i> ' + timeToShow + ' min');
        console.log(test + ' ' + hour);
    });

    $.get("http://192.168.0.18:8080/lesson/currentAndNext", function (data) {
        console.log(data);

        $.each(data, function (index, lesson) {
            var currentLesson = lesson[0];
            var nextLesson = lesson[1];


            var divCurrentLesson = '<div class="current-lesson ' + currentLesson.aClass.number + currentLesson.aClass.type + '"><h2 class="header">';
            divCurrentLesson += (currentLesson.name === null) ? '<i class="fa fa-home"></i> ' : '<i class="fa fa-graduation-cap"></i> ';

            divCurrentLesson += currentLesson.aClass.number + ' ' + currentLesson.aClass.type + '</h2>';

            if (currentLesson.name === null) {
                divCurrentLesson += '<span class="lesson free">Wolne <i class="fa fa-smile-o"></i></div>'
            } else {
                divCurrentLesson +=
                    '<span class="lesson">' + currentLesson.name + ' s.' + currentLesson.classRoom.number +
                    '<span class="teacher">' + currentLesson.teacher.firstName[0] + '. ' + currentLesson.teacher.lastName + '</span>' +
                    '</span>';
                if (nextLesson.name === null) {
                    divCurrentLesson += '<span class="lesson next free">Wolne <i class="fa fa-smile-o"></i></div>';
                } else {
                    divCurrentLesson +=
                        '<span class="lesson next">' + nextLesson.name + ' s.' + nextLesson.classRoom.number +
                        '<span class="teacher">' + nextLesson.teacher.firstName[0] + '. ' + nextLesson.teacher.lastName + '</span>' +
                        '</span>';
                }
                divCurrentLesson += '</div>';
            }

            $('.current-lessons').append(divCurrentLesson);

        });

    });



})