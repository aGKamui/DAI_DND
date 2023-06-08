const { connect } = require("../config/db.config");
const Scene = require("../model/scene.model");

class SceneRepository {
    constructor() {
      connect();
    }

    async createScene(sceneInfo){
        return await Scene.create(sceneInfo);
    }
}

module.exports = new SceneRepository();