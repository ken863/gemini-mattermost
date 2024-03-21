class Message {
    constructor(mmURL) {
        this.config = {
            headers: { 'Authorization': 'Bearer ' + process.env.MATTERMOST_BOT_TOKEN }
        };
        this.mmURL = mmURL;
    }

    showMsg(req, res, axios, msg) {
        this.channel_id = req.body.channel_id;
        this.user_id = req.body.user_id;

        this.msgObj = {
            "user_id": this.user_id,
            "post": {
                "channel_id": this.channel_id,
                "message": msg
            }
        };

        axios.post(this.mmURL + 'posts/ephemeral',
        this.msgObj, this.config).then((result) => {
                if (result.data) {
                    res.send('Show message post succeeded!').status(200);

                }
                else {
                    console.log('Show message post failed!');
                    res.send().status(400);

                }
            }).catch((err) => {
                console.log('Show message post failed: %o', err);
                res.send().status(500);
            });
    }

    showNotification(res, axios, msg) {
	    console.log("Creating notification for ChannelID: ", this.channel_id);
	    this.msgObj.post.message = msg;
	    console.log("Notification post message: ", this.msgObj);
            axios.post(this.mmURL + 'posts/ephemeral',
                this.msgObj, this.config).then((result) => {
                if (result.data) {
                    res.send('Show notification post succeeded!').status(200);

                }
                else {
                    console.log('Show notification post failed!');
                    res.send().status(400);

                }
            }).catch((err) => {
                console.log('Show notification post failed: %o', err);
                res.send().status(500);
            });
    }
}
module.exports = Message;
