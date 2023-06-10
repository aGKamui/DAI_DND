const { connect } = require("../config/db.config");
const Campaign = require("../model/campaign.model");

class CampaignRepository {
    constructor() {
      connect();
    }

    async createCampaign( campaignInfo, scene, chat){
        let campaign = await Campaign.create(campaignInfo);
        campaign.scenes = [scene];
        campaign.chatId = chat
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

    async uploadImage(campaign_id, image_name){
        try {
          let campaign = await Campaign.findById(campaign_id)
          campaign.image = "/images/" + image_name
          campaign.save();
          return campaign;
        } catch (error) { return 403 }
      }

    async deleteCampaign(campaignId){
        return await Campaign.deleteOne({_id: campaignId})
    }
}

module.exports = new CampaignRepository();