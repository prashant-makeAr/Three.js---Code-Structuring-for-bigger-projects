import GUI from "lil-gui";

export default class Debug {
  constructor() {
    //! To test the presence of the #debug in the URL, we can use window.location.hash (You need to refresh the browser after adding hash in the URL)
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.ui = new GUI();
    }
  }
}
