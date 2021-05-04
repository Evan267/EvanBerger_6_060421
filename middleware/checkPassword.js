module.exports = (req, res, next) => {
    const regex = /(?=.*\d)(?=.*[!@#$&*])(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    const checkPassword = regex.test(req.body.password);
    if(checkPassword == true){
        next();
    }else{
        return res.status(403).json('Veuillez utiliser au moins 1 majuscule, 1 minuscule, 1 chiffre et au moins 6 caractères.')
    }
};