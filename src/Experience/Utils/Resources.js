import EventEmitter from "./EventEmitter";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

//! In the World Class, retrieve the Resources instance and listed to the "ready" event before instantiating the Environment class
export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    //!Setup

    this.items = {}; // The loaded resources

    this.toLoad = this.sources.length; // The no. of resources to load
    this.loaded = 0; // The no of loaded resources. Starts at 0

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    //*Load each source

    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  //! On each load, we are going to call a sourceLoaded method that will
  //* 1. Save the loaded resources in the item property ,
  //* 2. Update the loaded property,
  //* 3. Test if the loading is done

  //* If all the sources are loaded, we trigger a ready event

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
