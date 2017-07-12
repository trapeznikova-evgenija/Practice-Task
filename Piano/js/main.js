"use strict";

let context = new AudioContext();

addEventListener('keydown', play);

function play(event) {
  let firstOctave = { 'D': 261.63, 'Ds': 277.18, 'Re': 293.66, 'Res': 311.13, 'Mi': 329.63, 'Fa': 349.23,
                    'Fas': 369.99, 'Sol': 392, 'Sols': 415.3, 'Lya': 440, 'Lyas': 466.16, 'Si': 493.88};
  let oscillator = context.createOscillator();

  switch (event.keyCode) {
    case keys['Q']:
      oscillator.frequency.value = firstOctave.D;
      break;
    case keys['R']:
      oscillator.frequency.value = firstOctave.Ds;
      break;
    case keys['S']:
      oscillator.frequency.value = firstOctave.Re;
      break;
    case keys['T']:
      oscillator.frequency.value = firstOctave.Res;
      break;
    case keys['U']:
      oscillator.frequency.value = firstOctave.Mi;
      break;
    case keys['Y']:
      oscillator.frequency.value = firstOctave.Fa;
      break;
    case keys['I']:
      oscillator.frequency.value = firstOctave.Fas;
      break;
    case keys['O']:
      oscillator.frequency.value = firstOctave.Sol;
      break;
    case keys['P']:
      oscillator.frequency.value = firstOctave.Sols;
      break;
    case keys['A']:
      oscillator.frequency.value = firstOctave.Lya;
      break;
    case keys['D']:
      oscillator.frequency.value = firstOctave.Lyas;
      break;
    case keys['F']:
      oscillator.frequency.value = firstOctave.Si;
      break;
  }

  oscillator.type = 'sine';
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(function () {
    oscillator.stop(0);
    oscillator.disconnect(context.destination);
  }, 1000 / 2);

  console.log(oscillator.frequency.value);
}