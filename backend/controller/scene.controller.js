const sceneService = require('../service/scene.service');
const logger = require("../logger/api.logger");

class SceneController {

  async getScene(scene_id) {
    return await sceneService.getScene(scene_id);
  };
  async getSceneValue(scene_id, value) {
    return (await sceneService.getScene(scene_id))[value];
  };
  

  async uploadImage(scene_id, image_name){
    return await sceneService.uploadImage(scene_id, image_name);

  }

}
module.exports = new SceneController();
