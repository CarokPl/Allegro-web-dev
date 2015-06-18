var base_url = 'http://localhost:8080/';
$(document).ready(function () {

    getTeachers();
    getClasses();
    getClassRooms();
    getHours();
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    $(document).on('submit', '#addLesson', function (e) {
        e.preventDefault();
        addLesson();
    });
    $(document).on('submit', '#addTeacherForm', function (e) {
        e.preventDefault();
        addTeacher();
    });
    $(document).on('submit', '#addClassForm', function (e) {
        e.preventDefault();
        addClass();
    });
    $(document).on('submit', '#addClassRoomForm', function (e) {
        e.preventDefault();
        addClassRoon();
    });
    $('#editLessonModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var lessonId = button.data('lesson-id');
        var modal = $(this);

        getLesson(lessonId, modal);
    })
});

function getLesson(lessonId, modal) {
    $.get(base_url + "lessons/" + lessonId, function (data) {
        console.log(data);
        $('#editLessonModal input[name=lessonName]').val(data.name);
        $('#editLessonModal select[name=teacher] option[value=' + data.teacher.id + ']').attr('selected', 'selected');
        $('#editLessonModal select[name=class] option[value=' + data.aClass.id + ']').attr('selected', 'selected');
        $('#editLessonModal select[name=classRoom] option[value=' + data.classRoom.id + ']').attr('selected', 'selected');
        $('#editLessonModal select[name=hour] option[value=' + data.hour.number + ']').attr('selected', 'selected');
    });
}

function getTeachers() {
    $('#teacherList').html('<option value="0">Wybierz nauczyciela</option>');
    $.get(base_url + "teachers", function (data) {
        $('#teacherList').html('');
        $.each(data, function (index, value) {
            $('#teacherList').append('<option value="' + value.id + '">' + value.firstName + ' ' + value.lastName + '</option>');
        });
    });
}

function getClasses() {
    $('#classList').html('<option value="0">Wybierz klase</option>');
    $.get(base_url + "classes", function (data) {
        $('#classList').html('');
        $.each(data, function (index, value) {
            $('#classList').append('<option value="' + value.id + '">' + value.number + ' ' + value.type + '</option>');
        });
    });
}

function getClassRooms() {
    $('#classRoomList').html('<option value="0">Wybierz sale</option>');
    $.get(base_url + "classrooms", function (data) {
        $('#classRoomList').html('');
        $.each(data, function (index, value) {
            $('#classRoomList').append('<option value="' + value.id + '">' + value.number + ' [' + value.building + ']</option>');
        });
    });
}

function getHours() {
    $('#hourList').html('<option value="0">Wybierz godzinę</option>');
    $.get(base_url + "hours", function (data) {
        $.each(data, function (index, value) {
            $('#hourList').append('<option value="' + value.number + '">' + value.number + ' [' + value.start + ' - ' + value.end + ']</option>');
        });
    });
}
function addLesson() {
    var data = $('#addLesson').serializeArray();
    console.log(data);
    var lesson = {};
    lesson.name = data[0].value;
    lesson.teacher = {};
    lesson.teacher.id = data[1].value;
    lesson.aClass = {};
    lesson.aClass.id = data[2].value;
    lesson.classRoom = {};
    lesson.classRoom.id = data[3].value;
    lesson.hour = {};
    lesson.hour.number = data[4].value;


    console.log(lesson);
    $.ajax({
        method: "PUT",
        url: base_url + "lessons",
        data: JSON.stringify(lesson),
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            201: function () {
                $('#addLessonAlert').html('<div class="alert alert-success"><p>Lekcja został dodany pomyślnie</p></div>').show();
            }
        }
    }).error(function () {
        $('#addLessonAlert').html('<div class="alert alert-danger"><p>Wystąpił błąd. Spróbuj ponownie później.</p></div>').show();
    });
}

function addTeacher() {
    var data = $('#addTeacherForm').serializeArray();
    var teacher = {};
    teacher.firstName = data[0].value;
    teacher.lastName = data[1].value;
    teacher.shortName = data[2].value;
    $.ajax({
        method: "PUT",
        url: base_url + "teachers",
        data: JSON.stringify(teacher),
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            201: function () {
                getTeachers();
                $('#addTeacherModal').modal('hide');
                $('#addLessonAlert').html('<div class="alert alert-success"><p>Nayczyciel został dodany pomyślnie</p></div>').show();
            }
        }
    });
}
function addClass() {
    var data = $('#addClassForm').serializeArray();
    var aClass = {};
    aClass.number = data[0].value;
    aClass.type = data[1].value;
    $.ajax({
        method: "PUT",
        url: base_url + "classes",
        data: JSON.stringify(aClass),
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            201: function () {
                getClasses();
                $('#addClassModal').modal('hide');
                $('#addLessonAlert').html('<div class="alert alert-success"><p>Klasa został dodany pomyślnie</p></div>').show();
            }
        }
    });
}
function addClassRoon() {
    var data = $('#addClassRoomForm').serializeArray();
    var classRoom = {};
    classRoom.number = data[0].value;
    classRoom.building = data[1].value;
    $.ajax({
        method: "PUT",
        url: base_url + "classrooms",
        data: JSON.stringify(classRoom),
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            201: function () {
                getClassRooms();
                $('#addClassRoomModal').modal('hide');
                $('#addLessonAlert').html('<div class="alert alert-success"><p>Sala został dodany pomyślnie</p></div>').show();
            }
        }
    });
}