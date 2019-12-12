const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const User = mongoose.model("User");
const textApiProvider = require('../providers/textApiProvider');

exports.list_all_users = (req, res) => {
  User.find({}, (error, users) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(users);
    }
  })
}

exports.create_a_user = (req, res) => {
  let new_user = new User(req.body);

  const randomTextPromise = textApiProvider.getRandomText();

  randomTextPromise.then(response => {
    if(!new_user.content){
      new_user.content = response;
    }
    new_user.save((error, user) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(201);
        res.json(user);
      }
    });
  }, error => {
    console.log(error)
  })
}

exports.get_a_user = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(user);
    }
  })
}

exports.update_a_user = (req, res) => {
  User.findOneAndUpdate({_id: req.params.user_id}, req.body, {new: true}, (error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(user);
    }
  })
}

exports.delete_a_user = (req, res) => {
  User.remove({_id: req.params.user_id}, (error) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json({message: "Article supprimé"});
    }
  })
}
