const { connect } = require("../config/db.config");
const Purchase = require("../model/purchase.model");

class PurchaseRepository {
    constructor() {
      connect();
    }

    async createPurchase( purchaseInfo, user){
        purchaseInfo.user = user;
        return await Purchase.create(purchaseInfo);
    }
}

module.exports = new PurchaseRepository();