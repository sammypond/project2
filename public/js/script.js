var mixedSet = document.getElementsByClassName('songs');
var pickedSet = document.getElementsByClassName('picks');
var picks = [];
var newPick;



for (i = 0; i < mixedSet.length; i++) {
    mixedSet[i].addEventListener("click", function(e){
        var song = e.target.textContent;
        e.target.style.visibility = "hidden";
        picks.push(song);
        console.log(picks);
        var newPick = document.createElement('form');
        newPick.textContent = song;
        document.getElementById('picks').appendChild(newPick);
    });
}
myFunction();
function myFunction() {
    var btn = document.createElement("button");
    btn.innerHTML = "RESET";
    btn.style.textAlign = 'center;'
    document.body.appendChild(btn);
  };

function sendPicksToBack() {
    fetch('/attempts', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({picks, actualOrder, apiId: setId}), // body data type must match "Content-Type" header
    })
}

function sendSetGamesToBack(){
    fetch('/setgames', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({userId: currentUser.id, apiId: apiId}), // body data type must match "Content-Type" header
    })
}
