const purchaseRepository = require("../repository/purchase.repository");

class PurchaseService{
    async createPurchase(purchaseInfo, username){
        if(purchaseInfo.type === "Free" || purchaseInfo.type === "Dolphin" || purchaseInfo.type === "Whale"){
            return purchaseRepository.createPurchase(purchaseInfo, username);
          }
        return 400;
    }
}

module.exports = new PurchaseService();