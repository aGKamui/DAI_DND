const purchaseService = require("../service/purchase.service");

class PurchaseController {
    async createPurchase(purchaseInfo, username){
        return await purchaseService.createPurchase(purchaseInfo, username);
    }
}

module.exports = new PurchaseController();