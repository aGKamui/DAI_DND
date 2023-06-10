const { connect } = require("../config/db.config");
const Scene = require("../model/scene.model");

class SceneRepository {
    constructor() {
      connect();
    }

    async createScene(sceneInfo){
        return await Scene.create(sceneInfo);
    }

    async getScene(scene_id){
      try { return await Scene.findById(scene_id) }
      catch (error) { return 404 }
    }

    async uploadImage(scene_id, image_name){
      try {
        let scene = await Scene.findById(scene_id)
        scene.image = "/images/" + image_name
        scene.save();
        return scene;
      } catch (error) { return 403 }
    }
}

module.exports = new SceneRepository();