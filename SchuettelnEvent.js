
'use strict';

import { Accelerometer } from 'expo-sensors';

const LIMIT = 170;

export class SchuettelnEvent {
  static addListener(handler) {
    let
      last_x,
      last_y,
      last_z;
    let number = 0;
    let lastUpdate = 0;
    Accelerometer.setUpdateInterval(100);
    Accelerometer.addListener(data => {
      let { x, y, z } = data;
      let currTime = Date.now();
      let diffTime = (currTime - lastUpdate);
      let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

      console.log('speed: ' + speed);
      console.log('x: ' + x);
      console.log('y: ' + y);
      console.log('z: ' + z);
      console.log('currTime: ' + currTime);
      console.log('lastUpdate: ' + lastUpdate);
      console.log('currTime - lastUpdate: ' + (currTime - lastUpdate));

      if ((currTime - lastUpdate) > 10) {
        let diffTime = (currTime - lastUpdate);
        lastUpdate = currTime;
        let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

        if (speed > LIMIT) {
          handler(); // Aufruf vom Listener Code
        }

        last_x = x;
        last_y = y;
        last_z = z;
      }
    });
  }
  static removeListener() {
    Accelerometer.removeAllListeners()
  }
};