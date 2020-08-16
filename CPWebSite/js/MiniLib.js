(function() {
    //X list-----------
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.querySelector('.line_x').scrollLeft -= (delta*10); // Multiplied by 10
        e.preventDefault();
    }
    if (document.querySelector('.line_x').addEventListener) {
        // IE9, Chrome, Safari, Opera
        document.querySelector('.line_x').addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        document.querySelector('.line_x').addEventListener("DOMMouseScroll", scrollHorizontally, false);
    }
    //X list-----------

})();