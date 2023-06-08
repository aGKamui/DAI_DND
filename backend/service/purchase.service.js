const purchaseRepository = require("../repository/purchase.repository");
const userRepository = require("../repository/user.repository")

class PurchaseService{
    async createPurchase(purchaseInfo, username){
        if(purchaseInfo.type === "Free" || purchaseInfo.type === "Dolphin" || purchaseInfo.type === "Whale"){
            const user = await userRepository.changeType(username, {type: purchaseInfo.type})
            return await purchaseRepository.createPurchase(purchaseInfo, user._id);
          }
        return 400;
    }
}

module.exports = new PurchaseService();