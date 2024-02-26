import * as THREE from "three";
import Camera from "./Camera";
import Time from "./Utils/Time";
import Sizes from "./Utils/sizes";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import sources from "./sources";
import Debug from "./Utils/Debug.js";

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
    // window.experience = this;

    //! Options
    this.canvas = canvas;

    //! Setup
    //* add debug at the start
    this.debug = new Debug();

    this.sizes = new Sizes();
    this.time = new Time();

    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();

    console.log();

    //! World
    this.world = new World();

    //! Respondoing to resize event

    //* Don't use directly otherwise it will not properly get the context. You will need to use bind to resolve it.
    // this.sizes.on("resize", this.resize);

    //* This way you will get the contexts properly
    this.sizes.on("resize", () => {
      this.resize();
    });

    //! Responding to tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    // this.renderer.update();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  //! Add a destroy method to our Experience Class.
  destroy() {
    //! Stop listening to the Time and Sizes events with off()
    this.sizes.off();
    this.time.off();

    //! Dispose of everything in the Scene (Check How to dispose of object in THREE.js Documentation)

    //* We are going to traverse the scene and look for the things that we want to dispose

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
