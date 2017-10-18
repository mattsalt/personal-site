var getHeight = function(){
    //window.innerHeight IE9+. Height (in pixels) of the browser window viewport including, if rendered, the horizontal scrollbar.
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

var getScrollTop = function(){
    //window.pageYOffset - number of pixels scrolled from top of page. IE 9+
    return (window.pageYOffset !== undefined) ? window.pageYOffset 
                                              : (document.documentElement || document.body.parentNode || document.body).scrollTop
}

var scollDistanceToTarget = function(id){
    targetOffset = document.getElementById(id).offsetTop; //distance to closest relative position parent
    currentPosition = getScrollTop();
    bodyHeight = document.body.getBoundingClientRect().height
    targetHeight = document.getElementById(id).getBoundingClientRect().height
    var scrollDistance
    if(currentPosition + (targetOffset - currentPosition) + window.innerHeight > bodyHeight){
        scrollDistance = (bodyHeight - window.innerHeight) - currentPosition
    }else{
        scrollDistance = targetOffset - currentPosition
    }
    return scrollDistance
}

var smoothScroll = function(event){
    var scrollDistance = scollDistanceToTarget(event.target.hash.substr(1));
    var scrollingDiv = document.getElementById('scrolling')    
    scrollingDiv.classList.add('in-transition')    
    scrollingDiv.style.WebkitTransform = "translate3d(0," + -(scrollDistance) + "px,0)"
    scrollingDiv.style.MozTransform = "translate3d(0,"+ -(scrollDistance) + "px,0)"
    scrollingDiv.style.transform = "translate3d(0,"+ -(scrollDistance) + "px,0)"

    window.setTimeout(function(){
        scrollingDiv.classList.remove("in-transition")
        scrollingDiv.style.WebkitTransform = ""
        scrollingDiv.style.MozTransform = ""
        scrollingDiv.style.transform = ""
        window.scroll(0, targetOffset)
    },  500)
    event.preventDefault()
}

Array.prototype.forEach.call(document.getElementsByClassName("smoothscroll"), function(elem){
    elem.addEventListener('click', smoothScroll, false)
})

var inView = function(el){
    var windowTop = getScrollTop();
    var elBot = el.getBoundingClientRect().bottom + window.pageYOffset
    //If the top of the window + navbar is below the bottom of the element then it is not in view.
    if(windowTop + 100  > elBot){ 
        return false
    }
    //If the top of the window is above the bottom of the element then it is in view.
    if(windowTop < elBot){
        return true
    }

}

// var updateLinks = function(){
//     var aboutLink = document.getElementById("aboutlink")
//     var projectsLink = document.getElementById("projectslink")
//     var contactlink = document.getElementById("contactlink")
//     //If the position of the top of the page + 
//     //the height of the last section + 
//     // height of the viewport is > the documents height then we are at the bottom of
//     //the page and should add the active link to the contact section
//     if(getScrollTop() + window.innerHeight + contactlink.getBoundingClientRect().height > document.body.getBoundingClientRect().height){
//         aboutLink.classList.remove("active")   
//         projectslink.classList.remove("active")
//         contactlink.classList.add("active")  
//     }else if(inView(document.getElementById("about"))) {
//         aboutLink.classList.add("active")   
//         projectslink.classList.remove("active")  
//         contactlink.classList.remove("active")  
//     } else if(inView(document.getElementById("projects"))) {
//         aboutLink.classList.remove("active") 
//         projectslink.classList.add("active")  
//         contactlink.classList.remove("active")  
//     }
// }

// document.addEventListener('scroll', updateLinks)
// updateLinks()