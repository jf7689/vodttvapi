const getID = async (req, res) => {
    const { name } = req.params;
    let resp = await fetch(`https://api.twitch.tv/helix/users?login=${name}`, 
    {
        method: "GET",
        headers: {            
            "Client-ID": process.env.CLIENT_ID,                
            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`           
        }
    })

    let respData = await resp.json();
    res.status(200).send({ id: respData.data[0].id });
}

const getVods = async (req, res) => {
    const { userId } = req.params;
    let vods = []

    // Get initital vods
    let resp = await fetch(`https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=30`, 
    {
        method: "GET",
        headers: {            
            "Client-ID": process.env.CLIENT_ID,                
            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`           
        }
    })

    let respData = await resp.json();
    vods = [...respData.data];

    // Check for next page of vods
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
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`           
            }
        })

        respData = await resp.json();
        vods = [...vods, ...respData.data];

        // Check for next page of vods
        paginationObj = respData.pagination;
        if (paginationObj) {
            cursor = paginationObj.cursor;
        }
    }

    res.status(200).send(vods);
}

export { getID, getVods };