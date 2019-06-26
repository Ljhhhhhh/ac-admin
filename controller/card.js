const Card = require("../model/card");

class CardController {
  async getList(pageNum, card_no = "") {
    let filter = {};
    if (card_no) {
      filter = {
        card_no: {
          $regex: card_no,
          $options: 'i'
        }
      };
    }
    const cards = await Card.find(filter)
      .skip((pageNum - 1) * 100)
      .limit(100)
      .sort({
        create_time: -1
      });
    const total = await Card.find(filter).countDocuments();
    return {
      cards,
      total
    };
  }

  async createCards() {
    const newArr = [];
    for (let i = 0; i < 100; i++) {
      const card_no = getRandomNum("account")
      const has = await Card.findOne({card_no})
      if (has) {
        --i;
        continue
      }
      const newCard = {
        pwd: getRandomNum("pwd"),
        card_no
      };
      newArr.push(newCard);
    }
    const result = await Card.insertMany(newArr);
    return result;
  }
}

module.exports = CardController;

const getRandomNum = type => {
  // ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678 如果需要英文
  const chars = type === 'pwd' ? "1234567890" : '1234567890';
  var maxPos = chars.length;
  var pwd = "";
  for (i = 0; i < 8; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

