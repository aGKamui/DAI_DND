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
        const campaign = await campaignRepository.createCampaign(campaignInfo, scene._id);
        await userRepository.addCampaign(username, campaign._id);
        return campaign;
    }

    async getCampaign(campaignId, username){
        const user = await userRepository.getUser(username);
        const campaign = await campaignRepository.getCampaign(campaignId);
        if(campaign == 404){
            return 404;
        }
        if(user.campaigns.includes(campaignId)){
            return {campaign: campaign, owner: true}
        }
        let isPlayer = false;
        user.characters.forEach((element) => {
            if(campaign.characters.includes(element)){
                isPlayer = true;
            }
        })
        if(isPlayer){
            return {campaign: campaign, owner:false}
        }
        return 401;
    }
}

module.exports = new CampaignService();