export class Twitch {
    constructor() {
        this.maintain();
        
        // setup a timer to validate, maintain token every 15 minutes
        setInterval(() => {
            this.maintain();
        }, 15 * 60 * 1000);
    }

    async maintain() {
        // Testing Token: 4hngfjnt5kr9txw3v5htntxirsjizm 
        // Check token for expiration if it exists
        if (process.env.ACCESS_TOKEN) {
            this.validate();
            return;
        }

        this.getToken();
    }
    
    async validate() {
        let resp = await fetch("https://id.twitch.tv/oauth2/validate",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        if (resp.status != 200) {
            console.log("Token failed validation");
            this.getToken();
            return;
        }

        let res = await resp.json();
        // Get a new token if it expires within a hour
        if (res.expires_in <= 36000) {
            this.getToken();
            return;
        }
    }

    async getToken() {
        let resp = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
        {
            method: "POST"
        });

        if (resp.status != 200) {
            let res = await resp.json();
            console.log("Failed to get a token", res.status, res.message);
            return;
        }

        let res = await resp.json();
        process.env.ACCESS_TOKEN = res.access_token;
    }
}