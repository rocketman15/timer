document.addEventListener("DOMContentLoaded", main);

function main(){
    /**
     * Constants
     */
    var KEY_DOWN_ARROW = 40;
    var KEY_UP_ARROW = 38;
    var KEY_LEFT_ARROW = 37;
    var KEY_RIGHT_ARROW = 39;
    var KEY_TAB = 9;
    var KEY_SHIFT = 16;
    var KEY_CTRL = 17;
    var KEY_ENTER = 13;
    var KEY_END = 35;
    var KEY_HOME = 36;
    // var KEY_BACKSPACE = 8;
    // var KEY_DELETE = 46;
    var KEY_ALT = 19;
    var KEY_ESCAPE = 27;
    var KEY_PAGE_UP = 33;
    var KEY_PAGE_DOWN = 34;

    var NAVIGATION_KEYS = [
        KEY_DOWN_ARROW,
        KEY_UP_ARROW,
        KEY_LEFT_ARROW,
        KEY_RIGHT_ARROW,
        KEY_PAGE_UP,
        KEY_PAGE_DOWN,
        KEY_END,
        KEY_HOME,
        KEY_TAB
    ];

    var CONTROL_KEYS = [
        KEY_CTRL,
        KEY_SHIFT,
        KEY_ALT,
        KEY_ESCAPE
    ];

    // Variables

    /** {HTMLElement} */
    var cat;
    /** {HTMLElement} */
    var timer;
    var movementStep = 2;
    var startTime;
    var timerInterval;

    init();
    function init(){
        timer = document.getElementById('timer');
        cat = document.getElementById('cat');
        cat.style.top = '50%';
        cat.style.left = '50%';

        document.addEventListener('keydown', keydownHandler);
        alert('Use the movement keys to reach the edge. Your time is being tracked!');

        startTime = window.performance.now();
        timerInterval = window.setInterval(updateTimer, 10);
    }

    /**
     * @param {Event} event
     */
    function keydownHandler(event){
        switch(event.which){
            case KEY_UP_ARROW:
                moveUp();
                break;
            case KEY_RIGHT_ARROW:
                moveRight();
                break;
            case KEY_DOWN_ARROW:
                moveDown();
                break;
            case KEY_LEFT_ARROW:
                moveLeft();
                break;
        }
    }

    function updateTimer(){
        timer.innerHTML = (Math.round(window.performance.now() - startTime)) + 'ms';
    }

    function moveUp(){
        var percent = getAxisPercentAsNumber(cat.style.top);
        var newPosition = percent - movementStep;
        cat.style.top = newPosition + '%';
        checkPosition(newPosition);
    }

    function moveRight(){
        var percent = getAxisPercentAsNumber(cat.style.left);
        var newPosition = percent + movementStep;
        cat.style.left = newPosition + '%';
        checkPosition(newPosition);
    }

    function moveDown(){
        var percent = getAxisPercentAsNumber(cat.style.top);
        var newPosition = percent + movementStep;
        cat.style.top = newPosition + '%';
        checkPosition(newPosition);
    }

    function moveLeft(){
        var percent = getAxisPercentAsNumber(cat.style.left);
        var newPosition = percent - movementStep;
        cat.style.left = newPosition + '%';
        checkPosition(newPosition);
    }

    function checkPosition(newPosition){
        if( newPosition > 0 && newPosition < 100 ){
            return;
        }
        outOfBounds();
    }

    function outOfBounds(){
        var endTime = window.performance.now();
        document.removeEventListener('keydown', keydownHandler);
        clearInterval(timerInterval);
        alert('Time! Moved out of bounds in: ' + (Math.round(endTime - startTime)) + ' ms');
    }

    /**
     * @param property
     * @return number
     */
    function getAxisPercentAsNumber(property){
        var percent = parseInt(property.replace('%', ''));
        return percent;
    }

}