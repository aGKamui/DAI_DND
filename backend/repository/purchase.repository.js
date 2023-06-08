const { connect } = require("../config/db.config");
const Purchase = require("../model/purchase.model");
const User = require("../model/user.model");

class PurchaseRepository {
    constructor() {
      connect();
    }

    async createPurchase( purchaseInfo, username){
        const user = await User.findOne({username: username});
        purchaseInfo.user = user._id
        return await Purchase.create(purchaseInfo);
    }
}

module.exports = new PurchaseRepository();