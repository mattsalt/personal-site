var getHeight = function(){
    //window.innerHeight IE9+. Height (in pixels) of the browser window viewport including, if rendered, the horizontal scrollbar.
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

var getScrollTop = function(){
    //window.pageYOffset - number of pixels scrolled from top of page. IE 9+
    return (window.pageYOffset !== undefined) ? window.pageYOffset 
                                              : (document.documentElement || document.body.parentNode || document.body).scrollTop
}


var inView = function(el){
    var windowTop = getScrollTop();
    var windowBottom = windowTop + getHeight()
    var elTop = el.getBoundingClientRect().top + window.pageYOffset
    var elBot = el.getBoundingClientRect().bottom + window.pageYOffset
    if(windowTop + 100  > elBot){
        return false
    }

    if(windowTop < elBot){
        return true
    }

}

var updateLinks = function(){
    var aboutLink = document.getElementById("aboutlink")
    var projectsLink = document.getElementById("projectslink")
    var contactlink = document.getElementById("contactlink")
    if(inView(document.getElementById("about"))) {
        aboutLink.classList.add("active")   
        projectslink.classList.remove("active")  
        contactlink.classList.remove("active")  
    } else if(inView(document.getElementById("projects"))) {
        aboutLink.classList.remove("active") 
        projectslink.classList.add("active")  
        contactlink.classList.remove("active")  
    }else if(inView(document.getElementById("contact"))) {
        aboutLink.classList.remove("active")   
        projectslink.classList.remove("active")
        contactlink.classList.add("active")  
    }
}

document.addEventListener('scroll', updateLinks)





