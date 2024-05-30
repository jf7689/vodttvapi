import supabase from "../config/supabaseClient.js";

const getID = async (req, res) => {
    // Get token from database
    const { data, error } = await supabase
    .from("twitch_tokens")
    .select()
    .eq("id", 1)
    .single()

    if (error) {
        console.log(error);
    }
    
    const { name } = req.params;
    let resp = await fetch(`https://api.twitch.tv/helix/users?login=${name}`, 
    {
        method: "GET",
        headers: {            
            "Client-ID": process.env.CLIENT_ID,                
            "Authorization": `Bearer ${data.token}`           
        }
    })
    
    // Handle bad request
    if (resp.status != 200) {
        res.status(400).send({ msg: "Bad request" });
        return;
    }

    let respData = await resp.json();
    // Handle nonexistent user
    if (!respData.data.length) {
        res.status(404).send({ msg: "User not found" });
        return;
    }
    
    res.status(200).send({ id: respData.data[0].id });
}

const getVods = async (req, res) => {
    // Get token from database
    const { data, error } = await supabase
    .from("twitch_tokens")
    .select()
    .eq("id", 1)
    .single()

    if (error) {
        console.log(error);
    }

    const { userId } = req.params;
    let vods = []

    // Get initital vods
    let resp = await fetch(`https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=30`, 
    {
        method: "GET",
        headers: {            
            "Client-ID": process.env.CLIENT_ID,                
            "Authorization": `Bearer ${data.token}`           
        }
    })

    // Handle bad request
    if (resp.status != 200) {
        res.status(400).send({ msg: "Bad request" });
        return;
    }

    let respData = await resp.json();
    vods = [...respData.data];

    // Check for more vods if there is any initial data
    if (respData.data.length) {
        let cursor = "";
        let paginationObj = respData.pagination;
        if (paginationObj) {
            cursor = paginationObj.cursor;
        }
        
        // Loop through pagination for vods
        while (cursor) {
            resp = await fetch(`https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=100&after=${cursor}`, 
            {
                method: "GET",
                headers: {            
                    "Client-ID": process.env.CLIENT_ID,                
                    "Authorization": `Bearer ${data.token}`           
                }
            })

            respData = await resp.json();
            vods = [...vods, ...respData.data];

            // Check if next page of vods exists
            paginationObj = respData.pagination;
            if (paginationObj) {
                cursor = paginationObj.cursor;
            }
        }
    }

    res.status(200).send(vods);
}

export { getID, getVods };