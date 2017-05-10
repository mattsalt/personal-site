$.fn.inView = function(){
    var win = $(window);
    obj = $(this);

    var scrollPosition = win.scrollTop();
    var visibleArea = win.scrollTop() + win.height();
    var objEndPos = (obj.offset().top + obj.outerHeight());
    return(visibleArea >= objEndPos && (scrollPosition + 40)<= objEndPos ? true : false)
};


$(window).scroll(function(){
    if($("#about").inView()) {
        $("#aboutlink").addClass("active")   
        $("#projectslink").removeClass("active")   
    } else if($("#projects").inView()) {
        $("#aboutlink").removeClass("active")   
        $("#projectslink").addClass("active")  
    }
});