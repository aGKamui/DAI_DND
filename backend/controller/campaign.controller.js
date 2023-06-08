const campaignService = require("../service/campaign.service");

class CampaignController {

    async createCampaign(campaignInfo, username) {
      return await campaignService.createCampaign(campaignInfo, username);
    };
}


  module.exports = new CampaignController();