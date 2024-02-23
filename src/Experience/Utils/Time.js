import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
  constructor() {
    super();

    //! Setup

    this.start = Date.now(); // timestamp when the experience starts and will stay the same
    this.current = this.start; // current timestamp and will change on each frame
    this.elapsed = 0; // How much time spent since start of experience
    this.delta = 16; // How much time spent since previous frame (By default 16 because it is close to how many milliseconds there is between two frames at 60 fps)

    // console.log(this.start);

    //! Don't call the tick function directly
    // this.tick();

    //! Instead call it like this
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
