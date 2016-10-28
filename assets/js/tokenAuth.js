$(function(){
    if (typeof localStorage !== 'undefined') {
        if(localStorage.getItem('token') === null) {
            var date = new Date();
            localStorage.setItem('token', btoa(date.getTime()+date.getUTCMilliseconds()));
        }
    } else {
        console.log("localStorage not available");
    }
});