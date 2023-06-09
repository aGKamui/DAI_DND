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

    async updateCampaign(campaignId, toChange){
        return await Campaign.findOneAndUpdate({_id: campaignId}, toChange)
    }

    async getAll(){
        return await Campaign.find()
    }
}

module.exports = new CampaignRepository();