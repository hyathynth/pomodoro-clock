function subsTime (ele){
    var current_time = ele.text();
    if (current_time > 1) {
        ele.text(parseInt(current_time) - 1);
    }
}

function addTime (ele) {
    var current_time = ele.text();
    ele.text(parseInt(current_time) + 1);
}

function formatTime (hr, min, sec) {
    if (hr < 10) {
        has_hr = ('0' + hr).slice(-2);
    }
    if (min < 10) {
        min = ('0' + min).slice(-2);
    }
    if (sec < 10) {
        sec = ('0' + sec).slice(-2);
    }
    if (hr == 0) {
        return min + ':' + sec;
    }
    else return has_hr + ':' + min + ':' + sec;
}

function displayTime (session, ele, optional){
    var temp_time = session * 60;
    var temp_hr = Math.floor(temp_time / 3600);
    var temp_min = Math.floor((temp_time / 60 - temp_hr * 60));
    var temp_sec = Math.floor(temp_time - temp_hr*3600 - temp_min*60);
    ele.removeClass();
   
    if (optional === undefined) {}
    if (optional == 1) {
        if (temp_hr == 0 && temp_min > 0 && temp_min <= 2 && temp_sec <= 59) {
        ele.addClass("yello");
    }
        else if (temp_hr == 0 && temp_min == 0 && temp_sec <= 59) {
        ele.addClass("red");
    }
        else ele.addClass("green"); 
    }
     ele.text(formatTime(temp_hr, temp_min, temp_sec));
}

function updateTime (ele) {
    var str_time = $('#clock').text().split(':');
    if (str_time.length == 2) {
        temp_hr = 0;
        temp_min = str_time[0];
        temp_sec = str_time[1];
    }
    else {
        temp_hr = str_time[0];
        temp_min = str_time[1];
        temp_sec = str_time[2];
    }
    
    if (temp_sec > 0) {
        temp_sec--;
    }
    else if (temp_min > 0) {
        temp_sec = 59;
        temp_min--;
    }
    else if (temp_hr > 0) {
        temp_min = 59;
        temp_hr--;
    }
    
    if (temp_hr == 0 && temp_min > 0 && temp_min <= 2 && temp_sec <= 59) {
        ele.addClass("yello");
    }
    else if (temp_hr == 0 && temp_min == 0 && temp_sec <= 59) {
        ele.addClass("red");
    }
    else ele.addClass("green");
        
    ele.text(formatTime(temp_hr, temp_min, temp_sec));
}

function checkTime (ele) {
    
}

    
var interval = null;
var default_session = 25;
var default_break = 5;


$(document).ready(function () {
    var session_count = $('#session').text() * 60;
    var break_count = $('#break').text() * 60;
    var temp_count = session_count;
    var name_count = 0;
    
    displayTime($('#session').text(), $('#clock'));
    
    
    $('#s_minus').on('click', function(){
        subsTime($('#session'));
        session_count = $('#session').text() * 60;
        temp_count = session_count;
        displayTime($('#session').text(), $('#clock'));
    })
      
    
    $('#s_add').on('click', function(){
        addTime($('#session')); 
        session_count = $('#session').text() * 60;
        temp_count = session_count;
        displayTime($('#session').text(), $('#clock'));
    })
    
    
     $('#b_minus').on('click', function(){
        subsTime($('#break'));
        break_count = $('#break').text() * 60;
        
    })
    
     $('#b_add').on('click', function(){
        addTime($('#break'));
        break_count = $('#break').text() * 60;
        
    })
    
   
    $('#play').on('click', function() {
        $(this).prop("disabled", true);
        $("#pause").prop("disabled", false);
        $("#s_minus").prop("disabled", true);
        $("#s_add").prop("disabled", true);
        $("#b_minus").prop("disabled", true);
        $("#b_add").prop("disabled", true);
        interval = setInterval(function () {
            updateTime($('#clock'));
            temp_count--;
            
            if (temp_count < 0) {
                displayTime(break_count/60, $('#clock'), 1); 
                temp_count = break_count;
                break_count = session_count;
                session_count = temp_count; 
                
                if (name_count%2 == 0) {
                    $('#clock_name').text("Break");
                }
                else $('#clock_name').text("Session");
                name_count++;
            }
        },1000);
    })

    $('#pause').on('click', function(){
        $(this).prop("disabled", true);
        $('#play').prop("disabled", false);
        clearInterval(interval); 
    })
    
    $('#stop').on('click', function(){
        $('#play').prop("disabled", false);
        $("#s_minus").prop("disabled", false);
        $("#s_add").prop("disabled", false);
        $("#b_minus").prop("disabled", false);
        $("#b_add").prop("disabled", false);
        clearInterval(interval); 
        temp_count = session_count;
        $('#clock_name').text("Session");
        displayTime($('#session').text(), $('#clock'));
    })
    
    $('#reset').on('click', function(){
        $('#play').prop("disabled", false);
        $("#s_minus").prop("disabled", false);
        $("#s_add").prop("disabled", false);
        $("#b_minus").prop("disabled", false);
        $("#b_add").prop("disabled", false);
        clearInterval(interval);
        $('#session').text(default_session);
        $('#break').text(default_break);
        session_count = $('#session').text() * 60;
        break_count = $('#break').text() * 60;
        temp_count = session_count;
        $('#clock_name').text("Session");
        displayTime($('#session').text(), $('#clock'));
    })
    
    
})
    
