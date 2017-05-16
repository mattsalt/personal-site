

var getHeight = function(){
    //window.innerHeight IE9+. Height (in pixels) of the browser window viewport including, if rendered, the horizontal scrollbar.
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

var getScrollTop = function(){
    //window.pageYOffset - number of pixels scrolled from top of page. IE 9+
    return (window.pageYOffset !== undefined) ? window.pageYOffset 
                                              : (document.documentElement || document.body.parentNode || document.body).scrollTop
}

var smoothScroll = function(event){
    targetOffset = document.getElementById(event.target.hash.substr(1)).offsetTop;
    currentPosition = getScrollTop();
    bodyHeight = document.body.getBoundingClientRect().height
    targetHeight = document.getElementById(event.target.hash.substr(1)).getBoundingClientRect().height
    if(currentPosition + (targetOffset - currentPosition) + window.innerHeight > bodyHeight){
        scrollDistance = (bodyHeight - window.innerHeight) - currentPosition
    }else{
        scrollDistance = targetOffset - currentPosition
    }
    
    document.body.classList.add('in-transition')

    document.body.style.WebkitTransform = "translate(0, " + -(scrollDistance) + "px)"
    document.body.style.MozTransform = "translate(0, " + -(scrollDistance) + "px)"
    document.body.style.transform = "translate(0, " + -(scrollDistance) + "px)"

    window.setTimeout(function(){
        document.body.classList.remove("in-transition")
        document.body.style.cssText = "";
        window.scrollTo(0, targetOffset)
    },  900)

    event.preventDefault()
}

Array.prototype.forEach.call(document.getElementsByClassName("navlink"), function(elem){
    elem.addEventListener('click', smoothScroll, false)
})

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

    if(getScrollTop() + window.innerHeight + contactlink.getBoundingClientRect().height > document.body.getBoundingClientRect().height){
        aboutLink.classList.remove("active")   
        projectslink.classList.remove("active")
        contactlink.classList.add("active")  
    }else if(inView(document.getElementById("about"))) {
        aboutLink.classList.add("active")   
        projectslink.classList.remove("active")  
        contactlink.classList.remove("active")  
    } else if(inView(document.getElementById("projects"))) {
        aboutLink.classList.remove("active") 
        projectslink.classList.add("active")  
        contactlink.classList.remove("active")  
    }
    // else if(inView(document.getElementById("contact"))) {
// 
    // }

    // if()
}

document.addEventListener('scroll', updateLinks)





