var mixedSet = document.getElementsByClassName('songs');
var pickedSet = document.getElementsByClassName('picks');
var picks = [];


// click[0].addEventListener('click', function(e){
//     pickOne.textContent = e.target.textContent;
// });

for (i = 0; i < mixedSet.length; i++) {
    mixedSet[i].addEventListener("click", function(e){
        var song = e.target.textContent;
        picks.push(song);
        console.log(picks);
        var newPick = document.createElement('li');
        newPick.textContent = song;
        document.getElementById('picks').appendChild(newPick);
        
        

    });
}

function remove() {
    var elem = document.getElementById('dummy');
    elem.parentNode.removeChild(elem);
    return false;
}


