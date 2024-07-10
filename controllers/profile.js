

const handleProfile = (req, resp, db) => {
    const { id } = req.params;
       db.select('*').from('users').where({
        id : id  
       }).then(user => {
        if (user.length) {
            resp.json(user[0])
        } else {
            resp.status(400).json("user not found")
        }
       }).catch(err => resp.status(404).json("error getting user"))
}

module.exports = {
   handleProfile : handleProfile
};