const campaignRepository = require("../repository/campaign.repository");
const sceneRepository = require("../repository/scene.repository");
const userRepository = require("../repository/user.repository");

class CampaignService{
    async createCampaign(campaignInfo, username){
        const scene = await sceneRepository.createScene({
            width: 40,
            height: 40,
            image: "blank",
            tokens: []
        });
        const campaign = await campaignRepository.createCampaign(campaignInfo, scene);
        await userRepository.addCampaign(username, campaign._id);
        return campaign;
    }
}

module.exports = new CampaignService();