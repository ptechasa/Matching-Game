var firebaseConfig = {
    apiKey: "AIzaSyBjHkuiXwX8NF68P9suoG15wwn8T24Z0NQ",
    authDomain: "matching-fun-game.firebaseapp.com",
    databaseURL: "https://matching-fun-game.firebaseio.com",
    projectId: "matching-fun-game",
    storageBucket: "",
    messagingSenderId: "793782454862",
    appId: "1:793782454862:web:4223b1cc2cde498b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
var db = firebase.database()
var formName;

function pushName() {
    formName = $("#userName").val();
    score = $("#score").text();
    db.ref().push({
        name: formName,
        score: score,
    })
}
// $(document).on("click", "#btnSubmit", function() {
// pushName()

// })

// function pushScoreToFireBase() {
//     database.ref().push({
//         userName: userName,
//         score: score,
//         counter: counter,
//         difficulty: difficulty,
//         dateAdded: firebase.database.ServerValue.TIMESTAMP
//     });
// }

// Timer;
var counter = 30;
var $span = $('#timer');
var alertedScore = false;

var interval;

$span.text(counter);

function decreaseTime() {
    if ((counter == 0) && (alertedScore == false)) {
        alert('Your score is ' + score);
        alertedScore = true;
    }

    counter--;
    $span.text(counter);

    if (counter == -1) {
        $span.text('Time is up');
        clearInterval(interval);
        pushName();
    }
}

// The function to ask their name;
var userName;

// About the number of blocks;
var rows = 3;
var cols = 4;

$('button').on('click', function() {
    // Input the user names;
    userName = $('#userName').val();

    interval = setInterval(decreaseTime, 1 * 1000);
    // Different Levels;
    var level = $('#level').val()
    console.log(level)
    if (level === 'easy') {
        rows = 3;
        cols = 4;
    } else if (level === 'medium') {
        rows = 4;
        cols = 4;
    } else {
        rows = 4;
        cols = 5;
    }

    var imageUrls = [
        'https://media0.giphy.com/media/l0MYNJC1oGwKLfqso/200.webp?cid=790b7611d34c1c000e51269097b60ed2641e1d871812a2fc&rid=200.webp',
        'https://media2.giphy.com/media/UtvkbCvOJCJtC/200w.webp?cid=790b7611361e9dda43fa5d4ceadefc1d6ffba77218c5b525&rid=200w.webp',
        'https://media2.giphy.com/media/k8kA7AOLFVohq/200.webp?cid=790b7611361e9dda43fa5d4ceadefc1d6ffba77218c5b525&rid=200.webp',
        'https://media1.giphy.com/media/cQz5MLlnP5rfa/200.webp?cid=790b7611561f26b842f49393a2fbf4e32a0542969b591acd&rid=200.webp',
        'https://media3.giphy.com/media/9MraLzmkWiZqM/200w.webp?cid=790b7611561f26b842f49393a2fbf4e32a0542969b591acd&rid=200w.webp',
        'https://media3.giphy.com/media/3ov9k4e03yTNRWTgYM/200w.webp?cid=790b7611fc7ad1db280bdc6f9bb012ccc148ab3e0adda710&rid=200w.webp',
        'https://media0.giphy.com/media/RHJjogamfp4Qm4D9pz/giphy.gif?cid=ecf05e47317383e20249b53a927d22a3f3625315e480e5d2&tid=a632eba0c20cffca6be46e41b0b923982d23f91a95cfd90b2181e30262e60d9d&rid=giphy.gif',
        'https://media2.giphy.com/media/lOmoovGKkQet9N4uJw/giphy.gif?cid=790b761126043efbe3fc870e111cda1fc0f0733abc621772&rid=giphy.gif',
        'https://media3.giphy.com/media/L2Gu7sMT7kXR13acn7/giphy.gif?cid=790b7611f15b7653c85e8a769ce525c802a31e7380ecdbda&rid=giphy.gif',
        'https://media2.giphy.com/media/26DONKguJRB1vZsAM/giphy.gif?cid=790b76118f4e0bee8a27468831bae75a099a9f6f78c6649c&rid=giphy.gif'
    ];
    // var imageUrls = 'https://api.giphy.com/v1/gifs/random?api_key=N0CBgF93RZv7210eKzxfG7V8BhLtcqg0';

    var imageIdxs = [];
    for (var idx = 0; idx < rows * cols; idx++) {
        imageIdxs.push(Math.floor(idx / 2));
    }
    imageIdxs = shuffle(imageIdxs);

    // function pushImages() {
    //     $.ajax({
    //         url: imageUrls,
    //         method: 'GET'
    //     }).then(function(response) {
    //         imageIdxs.push(response.data.images.downsized_large.url);
    //     })
    // };

    var $container = $('.container');
    for (var row = 0; row < rows; row++) {
        var $cardRowElem = $('<div class="row"></div>');
        for (var col = 0; col < cols; col++) {
            var idx = row * cols + col;
            var $card = $('<div class="imgContainer"><img class="hide" src="' + imageUrls[imageIdxs[idx]] + '"></div>');
            $cardRowElem.append($card);
        }
        $container.append($cardRowElem);
    }

    $('.container').removeClass('hide');
    $('form').addClass('hide');

    $('#userNameGoesHere').text(userName);
    $('#h2UserNameGoesHere').removeClass('hide');

    event.preventDefault();
});

// Score Countdown;
var score = 0;
$('#score').text(score);

// How many pair to win;
var pairsToWin = 6;

// Click Function; 
var firstSrc;
var secondSrc;

// Shuffling function: enables that no two games have the same card arrangement;
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

var $firstImg;
var $secondImg;

$(document).on('click', '.imgContainer', function() {

    // If either one is empty;
    if ((firstSrc == undefined) || (secondSrc == undefined)) {

        clearInterval(timer);

        var $img = $(this).children().eq(0);

        // Disable clicking on the last image you clicked on
        $img.addClass('noClickAllowed');

        var src = $img.attr('src');

        // After the user clicks on two divs, check if those images are equal;
        if (firstSrc == undefined) {
            firstSrc = src;
            $firstImg = $img;
        } else if (secondSrc == undefined) {
            secondSrc = src;
            $secondImg = $img;
        }
        // If the last two images clicked on match, it would keep them turned over; else, keep them hidden; 
        var timer = setTimeout(function() {

            // Both are not empty;
            if ((firstSrc != undefined) && (secondSrc != undefined)) {
                if (firstSrc != secondSrc) {
                    $firstImg.addClass('hide');
                    $secondImg.addClass('hide');

                    // Disable clicking on the last image you clicked on
                    $firstImg.parent().removeClass('noClickAllowed');
                    $secondImg.parent().removeClass('noClickAllowed');
                } else {
                    score++;
                    $('#score').text(score);

                    // Position to win the game;
                    if ((score == pairsToWin) && (alertedScore == false)) {

                        alertedScore = true;
                        pushName();
                        // Let the timer stops;
                        clearInterval(interval);
                    }
                }
                // Refresh;
                firstSrc = undefined;
                secondSrc = undefined;
            }
            // The Speed when the cards turn;
        }, 750);
    };
    $img.removeClass('hide');
});