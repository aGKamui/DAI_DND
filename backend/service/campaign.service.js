const campaignRepository = require("../repository/campaign.repository");
const sceneRepository = require("../repository/scene.repository");
const userRepository = require("../repository/user.repository");
const characterRepository = require("../repository/character.repository");

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
        return 403;
    }

    async updateCampaign(campaignId, username, toChange){
        const {title, system, characters, scenes} = toChange;
        if(!title && !system && !characters && !scenes){
            return 400;
        }
        const user = await userRepository.getUser(username);
        const campaign = await campaignRepository.getCampaign(campaignId);
        if(campaign == 404){
            return 404;
        }
        if(user.campaigns.includes(campaignId)){
            if((characters && await this.unknownCharacters(characters)) || (scenes && await this.unknownScenes(scenes))){
                return 404;
            }
            if((characters && this.isCharacterInAnotherCampaign(await this.getCampaignIdsByCharacterList(characters),campaignId)) ||
               (scenes && await this.isSceneInAnotherCampaign(scenes, campaignId))
            ){
                return 400;
            }
            
           
            return await campaignRepository.updateCampaign(campaignId, toChange);
        }
        return 403;
    }

    async unknownCharacters(characters){
        
        for(const element of characters){
            if((await characterRepository.exists(element)) == 404){
                 return true
            }
        }
        return false
    }
    
    async unknownScenes(scenes){
        for(const scene of scenes){
            if(await sceneRepository.getScene(scene) == 404){
                return true
            }
        }
        return false
    }

    async getCampaignIdsByCharacterList(characters){
        let campaignIds = []
         for(const element of characters){
            for(const campaign of await campaignRepository.getAll()){
                if(campaign.characters.includes(element)){
                    campaignIds.push(campaign._id)
                }
            }
        }
        return campaignIds
    }

    isCharacterInAnotherCampaign(campaignIds, campaignId){
        for(const campaign in campaignIds){
            if(!(campaign == campaignId)){
                return true
            }
        }
        return false
    }

    async isSceneInAnotherCampaign(scenes, campaignId){
        for(const scene in scenes){
            for(const campaign of await campaignRepository.getAll()){
                if(campaign.scenes.includes(scene) && !(campaign._id == campaignId)){
                    return false
                }
            }
        }
        return true
    }

    async getCampaigns(username){
        const user = await userRepository.getUser(username);
        let campaigns = []
        const playsIn = await this.getCampaignIdsByCharacterList(user.characters)
        if(playsIn){
            (playsIn).forEach((element) => {
                campaigns.push(element);
            });
        }
        const owns = user.campaigns
        if(owns){
            user.campaigns.forEach((element) => {
                campaigns.push(element);
            });
        }
        if(campaigns){
            for(let index = 0; index < campaigns.length; index++){
                campaigns[index] = await campaignRepository.getCampaign(campaigns[index]);
            }
        }
        
        return campaigns;
    }
}

module.exports = new CampaignService();