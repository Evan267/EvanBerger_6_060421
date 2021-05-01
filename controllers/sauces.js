const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes:0,
        dislikes: 0
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Nouvel sauce créée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req,res,next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({error}));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(201).json({
            message: 'Sauce mis à jour avec succès !'
        }))
        .catch(error => res.status(400).json({error}))
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

exports.likeSauce = (req,res,next) => {
    if(req.body.like == 1){
        Sauce.updateOne({_id: req.params.id},{ $addToSet: {usersLiked: req.body.userId},$inc: {likes: 1 }})
            .then(() => res.status(201).json({message: 'Aime'}))
            .catch(() => res.status(400).json({error}));
    } else if(req.body.like == 0){
        let userId = req.body.userId;
        let queryUser = {};
        let queryInc = {};
        Sauce.findOne({_id: req.params.id}, function(err, doc){
            let indexUsersLiked = doc.usersLiked.indexOf(userId);
            if( err || !doc) {
                return res.status(404).json({err});
            }
            if (indexUsersLiked >= 0){
                queryUser.usersLiked = userId;
                queryInc.likes = -1;
            }else {
                queryUser.usersDisliked = userId;
                queryInc.dislikes = -1;
            }
            Sauce.updateOne({_id: req.params.id}, {$pull : queryUser,$inc: queryInc}, {new: false})
                .then(() => res.status(201).json({message: "plus d'avis"}))
                .catch(error => res.status(404).json({error}));
        })
    } else if(req.body.like == -1){
        Sauce.updateOne({_id: req.params.id},{ $addToSet: {usersDisliked: req.body.userId}, $inc: {dislikes: 1 }})
            .then(() => res.status(201).json({message: "N'aime pas"}))
            .catch(() => res.status(400).json({error}));
    }
}