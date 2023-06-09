const campaignService = require("../service/campaign.service");

class CampaignController {

    async createCampaign(campaignInfo, username) {
      return await campaignService.createCampaign(campaignInfo, username);
    };

    async getCampaign(campaignId, username) {
        return await campaignService.getCampaign(campaignId, username);
    }

    async updateCampaign(campaignId, username, toChange){
        return await campaignService.updateCampaign(campaignId, username, toChange);
    }
}


  module.exports = new CampaignController();