const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type:  String, required: true, validate: {validator: /[\wéèêëàâäîïôöûüç\s]{1,}/, message: "La valeur ne doit pas contenir de caractère spéciaux"}, maxlength: 25},
    manufacturer: {type: String, required: true, validate: {validator: /[\wéèêëàâäîïôöûüç\s]{1,}/, message: "La valeur ne doit pas contenir de caractère spéciaux"}, maxlength: 25},
    description: {type: String, required: true, validate: {validator: /[\wéèêëàâäîïôöûüç\s]{1,}/, message: "La valeur ne doit pas contenir de caractère spéciaux"}, maxlength: 250},
    imageUrl: {type: String, required: true},
    mainPepper: {type: String, required: true, validate: {validator: /[\wéèêëàâäîïôöûüç\s]{1,}/, message: "La valeur ne doit pas contenir de caractère spéciaux"}, maxlength: 25},
    heat: {type: Number, required: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]}
});

module.exports = mongoose.model('Sauce', sauceSchema);