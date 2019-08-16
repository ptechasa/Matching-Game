var matchingCounter = 30;
var userName;
var level;
var pairsTwoWin = 6;
var submitted = false;
var generateImages = [];
var imagesCounter = 0;
var imagesDup = [];

//when the player click on image, it will hide 
// $(document).on('click', '.hide', function () {
//     $(this).attr('src', '')
//     console.log('click')
// })

//Hiding all images
$('#imgContainer').hide()

//submitting button
$('#btnSubmit').on('click', function (e) {
    e.preventDefault()

    //grab the username
    userName = $('#userName').val()
    level = $('#level').val()

    //Show images
    $('#imgContainer').show()

    //Win game for Easy Level is 6
    if (level === 'easy') {
        pairsTwoWin = 6

        //Win game for Medium Level is 8
    } else if (level === 'medium') {
        pairsTwoWin = 8

        //Win game for Hard Level is 10
    } else if (level === 'hard') {
        pairsTwoWin = 10
    }

    $('#imgContainer').show()

    //Prevent to submit button
    if (submitted == false) {

        //Decrease timer will start after click 'submit' button 
        var timer = setInterval(decreaseTimer, 1 * 1000)
        submitted = true;
    }

    pushImages()
})


//setup Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCbb2wOPgqTLzBV_kwpeFlnuIta9oN8pdg",
    authDomain: "matching-game-56ad7.firebaseapp.com",
    databaseURL: "https://matching-game-56ad7.firebaseio.com",
    projectId: "matching-game-56ad7",
    storageBucket: "matching-game-56ad7.appspot.com",
    messagingSenderId: "235534445416",
    appId: "1:235534445416:web:f70e82fc94bb6d90"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var queryURL = 'https://api.giphy.com/v1/gifs/random?api_key=N0CBgF93RZv7210eKzxfG7V8BhLtcqg0';

function pushImages() {
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        generateImages.push(response.data.images.downsized_large.url)
        imagesCounter++

        if (imagesCounter < pairsTwoWin) {
            pushImages()
        } else {
            //
            imagesDup = generateImages.concat(generateImages)
            shuffle(imagesDup)

            //recursive function
            imagesDup.forEach(element => {
                console.log(element)

                var $imagesContainer = $('<div class ="imgContainer">')
                var $img = $('<img>')
                $img.attr('src', element);

                $(.imagesContainer).append($img)
            })
        }
    })
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {

        //random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1));
        //swap elements
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//Create countdown timer
function decreaseTimer() {
    matchingCounter--;
    $('.timer').text('Time Remaining: ' + matchingCounter + ' seconds');

    if (matchingCounter == 0) {
        $('.timer').text('Game over!!')
        clearInterval(timer)
    }
}






// var queryURL = ""


// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response){

//     var img = $('<img>')
//     img.attr('src', response.)
//     $('div').prepend(img)
// });