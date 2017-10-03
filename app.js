//Require the pigpio package, this is from https://github.com/fivdi/pigpio
//This is a Node.js wrapper around the native pigpio C library https://github.com/joan2937/pigpio
let Gpio = require('pigpio').Gpio;

//Initialize the LED pin for output (GPIO5, GPIO Header Pin 29) 
let led = new Gpio(5,{mode: Gpio.OUTPUT});

//and drive it low (off) initially...
led.digitalWrite(0);

//Initialize the Button pin for input (GPIO6, GPIO Header Pin 31) 
//Use the internal pull down resistor, and have it trigger interrupts
//on both the rising (button pushed) and falling (button released) edges.
let button = new Gpio(6,{
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN,
  edge: Gpio.EITHER_EDGE
});

//Setup a flag to indicate if the button is currently being debounced.
let debouncing = false;

//We'll stop the app after a certain number of button presses.
let presses = 0;
let maxpresses = 10;

//When the button interrupt is triggered
//(that could be either when it is turned on or off)
//take in the level of the button (1 or 0)
button.on('interrupt',function(level){

  if(debouncing){
    //console.log('Ignoring change. Previous change is debouncing');
    return;
  }

  //Turn on the debouncing flag.
  debouncing = true;

    //debounce by waiting for a number of milliseconds then testing to see if the value is still the same...
  setTimeout(() => {
    if(button.digitalRead()==level){
      //And set the LED to match the level
      led.digitalWrite(level);

      //If the level is 0, the button was 
      //just released, completing a button press
      if(level==0){
        presses++

        //Report the level to the console
        console.log(`${level} - ${presses} of ${maxpresses}`);

        if(presses >= maxpresses){
          process.exit(0);
        }
      }
    }

    //Turn off the debouncing flag
    debouncing = false;
  },25);

});
