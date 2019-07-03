var mixedSet = document.getElementsByClassName('songs');
var pickedSet = document.getElementsByClassName('picks');
var picks = [];



for (i = 0; i < mixedSet.length; i++) {
    mixedSet[i].addEventListener("click", function(e){
        var song = e.target.textContent;
        e.target.style.visibility = "hidden";
        picks.push(song);
        console.log(picks);
        var newPick = document.createElement('li');
        newPick.textContent = song;
        document.getElementById('picks').appendChild(newPick);
    });
}




