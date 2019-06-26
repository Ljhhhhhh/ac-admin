const Customer = require("../model/customer");
const Card = require("../model/card");

class CustomerController {
  async active(userinfo) {
    const { identity, card_no, pwd } = userinfo;
    const customer = await Customer.findOne({ identity });
    if (customer) {
      return {
        code: -1,
        data: {},
        msg: "此用户已注册"
      };
    }
    const card = await Card.findOne({
      card_no,
      pwd
    });
    if (!card || card.status === 1) {
      return {
        code: -1,
        msg: "此卡无法使用",
        data: {}
      };
    }

    await card.update({
      status: 1
    });

    userinfo.exp_time = Date.now() + 365 * 24 * 60 * 60 * 1000;
    await Customer.create(userinfo);

    return {
      code: 0,
      data: {},
      msg: "激活成功"
    };
  }

  async getList({ page, username, card_no }) {
    let filter = {};
    if (username) {
      filter.username = {
        $regex: username
      };
    }
    if (card_no) {
      filter.card_no = {
        $regex: card_no
      };
    }
    const customer = await Customer.find(filter)
      .skip((page - 1) * 10)
      .limit(10)
      .sort({
        create_time: -1
      });
    const total = await Customer.find(filter).countDocuments();
    return {
      customer,
      total
    };
  }

  async getInfo(card_no) {
    if (!card_no) return null;
    return await Customer.findOne({card_no})
  }
}

module.exports = CustomerController;
