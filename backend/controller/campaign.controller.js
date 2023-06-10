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

    async getCampaigns(username){
        return await campaignService.getCampaigns(username);
    }

    async deleteCampaign(campaignId, username){
        return await campaignService.deleteCampaign(campaignId, username);
    }
}


  module.exports = new CampaignController();