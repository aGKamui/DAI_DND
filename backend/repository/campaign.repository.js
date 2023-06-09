const { connect } = require("../config/db.config");
const Campaign = require("../model/campaign.model");

class CampaignRepository {
    constructor() {
      connect();
    }

    async createCampaign( campaignInfo, scene){
        let campaign = await Campaign.create(campaignInfo);
        campaign.scenes = [scene];
        await Campaign.updateOne({_id: campaign._id}, campaign);
        return campaign;
    }

    async getCampaign(campaignId){
        try{
            return await Campaign.findOne({_id: campaignId})
        }catch{
            return 404
        }
    }
}

module.exports = new CampaignRepository();