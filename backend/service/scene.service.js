const SceneRepository = require("../repository/scene.repository");

class SceneService {
  async getScene(scene_id){
    return await SceneRepository.getScene(scene_id);
  }

  async uploadImage(scene_id, image_name){
    return await SceneRepository.uploadImage(scene_id, image_name);
  }

}

module.exports = new SceneService();