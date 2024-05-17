const getID = async (req, res) => {
    const { name } = req.params;
    let resp = await fetch(`https://api.twitch.tv/helix/users?login=${name}`, {
        method: "GET",
        headers: {            
            "Client-ID": process.env.CLIENT_ID,                
            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`           
        }
    })

    let respData = await resp.json();
    res.status(200).send({ id: respData.data[0].id });
}

export { getID };