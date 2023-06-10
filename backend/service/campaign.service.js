const campaignRepository = require("../repository/campaign.repository");
const sceneRepository = require("../repository/scene.repository");
const userRepository = require("../repository/user.repository");
const characterRepository = require("../repository/character.repository");
const chatRepository = require("../repository/chat.repository");
const chatData = require("../model/chatData.model");

class CampaignService{
    async createCampaign(campaignInfo, username){
        const user = userRepository.getUser(username)
        if(user.type == "Free"){
            return 403
        }
        const scene = await sceneRepository.createScene({
            width: 40,
            height: 40,
            image: "blank",
            tokens: []
        });
        const chat = await chatRepository.createChat({
            messages:[]
        })
        const campaign = await campaignRepository.createCampaign(campaignInfo, scene._id, chat._id);
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
        const {title, system, characters, scenes, bio, image, chatId } = toChange;
        if((!title && !system && !characters && !scenes && !bio && !chatId) || image){
            return 400;
        }
        const user = await userRepository.getUser(username);
        const campaign = await campaignRepository.getCampaign(campaignId);
        if(campaign == 404){
            return 404;
        }
        if(user.campaigns.includes(campaignId)){
            if((characters && await this.unknownCharacters(characters)) || (scenes && await this.unknownScenes(scenes)) ||
                (chatId && await this.unknownChat(chatId))){
                return 404;
            }
            if((characters && this.isCharacterInAnotherCampaign(await this.getCampaignIdsByCharacterList(characters),campaignId)) ||
               (scenes && await this.isSceneInAnotherCampaign(scenes, campaignId) || (chatId && await this.isChatFromAnotherCampaign(chatId)))
            ){
                return 400;
            }
            
           
            return await campaignRepository.updateCampaign(campaignId, toChange);
        }
        return 403;
    }

    async unknownChat(chatId){
        return await chatData.exists(chatId)
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

    async isChatFromAnotherCampaign(chatId, campaignId){
        for(const campaign in await campaignRepository.getAll()){
            if(campaign.chatId == chatId && !(campaign._id == campaignId)){
                return false
            }
        }
        return true
    }

    async getCampaigns(username){
        const user = await userRepository.getUser(username);
        let campaigns = []

        if(user.characters){
            const playsIn = await this.getCampaignIdsByCharacterList(user.characters)
            console.log(playsIn)
            if(playsIn){
                (playsIn).forEach((element) => {
                    campaigns.push(element);
                });
            }
        };
        if(user.campaigns){
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

    async uploadImage(campaign_id, image_name){
        return await campaignRepository.uploadImage(campaign_id, image_name);
    }

    async deleteCampaign(campaignId, username){
        const user = await userRepository.getUser(username);
        const campaign = await campaignRepository.getCampaign(campaignId)
        if(!(campaign)){
            return 404
        }
        if(user.campaigns.includes(campaignId)){
            for(let index; index < campaign.scenes.length; index++){
                
                await sceneRepository.deleteScene(campaign.scenes[index]);
            }
            chatRepository.deleteChat(campaign.chatId)
            campaignRepository.deleteCampaign(campaignId);
            userRepository.deleteCampaign(username, campaignId);
            return campaign;
        }
        return 403;
    }
}

module.exports = new CampaignService();