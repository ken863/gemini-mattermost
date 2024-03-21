class UIactions {
  constructor(mmURL, intURL) {
    const Util = require('./util');
    const Message = require('./message');
    this.moment = require('moment');

    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_ACCESS_TOKEN);

    // For text-only input, use the gemini-pro model
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });

    this.util = new Util();
    this.message = new Message(mmURL);
    this.mmURL = mmURL;
    this.intURL = intURL;
  }

  async translateIntoVNFromText(req, res, axios) {
    const msg = "Dịch sang tiếng việt: " + req.body.text;
    this.gemniAiAction(msg, res);
  }

  async translateIntoJPFromText(req, res, axios) {
    const msg = "Dịch sang tiếng nhật: " + req.body.text;
    this.gemniAiAction(msg, res);
  }

  async gemniAiAction(msg, res){
    const chat = this.model.startChat({
        generationConfig: {
            maxOutputTokens: 100,
        },
    });

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const responsetext = response.text();

    // console.log(JSON.stringify(response, null, 2));

    res.send(responsetext);
  }
}

module.exports = UIactions;
