$.fn.inView = function(){
    var win = $(window);
    obj = $(this);
    var scrollPosition = win.scrollTop();
    var visibleArea = win.scrollTop() + win.height();
    var objEndPos = (obj.offset().top + obj.outerHeight());
    return(visibleArea >= objEndPos && (scrollPosition + 40)<= objEndPos ? true : false)
};

var updateLinks = function(){
    if($("#about").inView()) {
        $("#aboutlink").addClass("active")   
        $("#projectslink").removeClass("active")  
        $("#contactlink").removeClass("active")  
    } else if($("#projects").inView()) {
        $("#aboutlink").removeClass("active") 
        $("#projectslink").addClass("active")  
        $("#contactlink").removeClass("active")  
    }else if($("#contact").inView()) {
        $("#aboutlink").removeClass("active")   
        $("#projectslink").removeClass("active")
        $("#contactlink").addClass("active")  
    }
}

$(window).scroll(updateLinks);

$(document).ready(function(){
    $("#aboutlink").addClass("active") 
})