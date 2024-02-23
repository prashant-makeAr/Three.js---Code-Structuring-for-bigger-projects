import * as THREE from "three";
import Camera from "./Camera";
import Time from "./Utils/Time";
import Sizes from "./Utils/sizes";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";

//! Converting the Experience class to a Singleton i.e. The Experience class will always return the first created instance of Experience. It will not return new instance of Experience every time we create a new Experience
let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }

    instance = this;

    // Adding this Experience Class to Global Window Object to have access of it anywhere.
    //! (Don't have to add it to the window object)
    window.experience = this;

    //! Options
    this.canvas = canvas;

    //! Setup
    this.sizes = new Sizes();
    this.time = new Time();

    this.scene = new THREE.Scene();
    this.resources = new Resources();
    this.camera = new Camera();
    this.renderer = new Renderer();

    //! World
    this.world = new World();

    //! Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    //! Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}
