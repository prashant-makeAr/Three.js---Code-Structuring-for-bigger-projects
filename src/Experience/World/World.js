import Experience from "../Experience";
import * as THREE from "three";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.resources = this.experience.resources;

    //! Test Mesh

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        color: "red",
        wireframe: false,
      })
    );

    // this.scene.add(testMesh);

    //! Listen to the 'ready' event from Resources Class when all the resources are loaded in the scene and then create a instance of Environment Class.

    //* So we create the environment after loading the resources.

    //* So this way we are creating the Environment after loading the resources
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.fox = new Fox();

      // Add environment at last so that the environment intensity can be applied to every objects i.e. floor, fox etc
      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
