//////////////////////////////////////////////////////////////////////////////
function openpage(evt, pageName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("page");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " w3-red";
}
//////////////////////////////////////////////////////////////////////////////