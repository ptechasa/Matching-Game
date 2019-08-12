
var matchingCounter = 30;
var timer = setInterval (decreaseTimer, 1 * 1000)

function decreaseTimer()  {
    matchingCounter--;
    $('.timer').text('Time Remaining: ' + matchingCounter);

    if (matchingCounter == 0){
        $('.timer').text('Game over!!')
        clearInterval(timer)
    }
}