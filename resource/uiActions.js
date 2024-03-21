class UIactions {
  constructor(mmURL, intURL) {
    const Util = require('./util');
    const Message = require('./message');
    this.moment = require('moment');
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    this.genAI = new GoogleGenerativeAI("AIzaSyDYt2KEM9rmghmU6pvT1XCarNAyle953ow");
    this.util = new Util();
    this.message = new Message(mmURL);
    this.mmURL = mmURL;
    this.intURL = intURL;
  }

  translateFromText(req, res, axios) {
    this.message.showNotification(res, axios, req.text);
  }
}

module.exports = UIactions;
