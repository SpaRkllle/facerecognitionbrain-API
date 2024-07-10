

const handleRegister = (req, resp, db, bcrypt) => {
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
       return resp.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
       trx.insert({
           hash: hash,
           email: email
       }).into('login').returning('email').then(loginEmail => {
            return trx('users').returning('*').insert({
               name: name,
               email: loginEmail[0].email,
               joined: new Date()
             }).then(user => {
               resp.json(user[0])
             })
       })
       .then(trx.commit).catch(trx.rollback)
    })
   .catch(err => resp.status(400).json('unable to register'))
}


module.exports = {
    handleRegister: handleRegister
};