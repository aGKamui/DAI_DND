const { connect } = require("../config/db.config");
const Campaign = require("../model/campaign.model");

class CampaignRepository {
    constructor() {
      connect();
    }

    async createCampaign( campaignInfo, scene){
        let campaign = await Campaign.create(campaignInfo);
        campaign.scene = [scene];
        await Campaign.updateOne({_id: campaign._id}, campaign);
        return campaign;
    }
}

module.exports = new CampaignRepository();