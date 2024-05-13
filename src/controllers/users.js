const getUsers = (req, res) => {
    const { id } = req.params;
    res.status(200).send({ msg: "Hello " + id });
}

export { getUsers };