import Experience from "../Experience";
import * as THREE from "three";
import Environment from "./Environment";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    //! Test Mesh

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        color: "red",
        wireframe: false,
      })
    );

    this.scene.add(testMesh);

    //! Setup

    this.environment = new Environment();
  }
}
