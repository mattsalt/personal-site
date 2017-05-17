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
    
    var scrolling = document.getElementById('scrolling')    
    scrolling.classList.add('in-transition')    
    scrolling.style.WebkitTransform = "translate3d(0," + -(scrollDistance) + "px,0)"
    scrolling.style.MozTransform = "translate3d(0,"+ -(scrollDistance) + "px,0)"
    scrolling.style.transform = "translate3d(0,"+ -(scrollDistance) + "px,0)"

    window.setTimeout(function(){
        scrolling.classList.remove("in-transition")
        scrolling.style.WebkitTransform = ""
        scrolling.style.MozTransform = ""
        scrolling.style.transform = ""
        window.scroll(0, targetOffset)
    },  500)




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
}

document.addEventListener('scroll', updateLinks)