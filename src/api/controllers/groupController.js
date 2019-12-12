const mongoose = require('mongoose');
const groupModel = require('../models/groupModel');
const Group = mongoose.model("Group");
const textApiProvider = require('../providers/textApiProvider');

exports.list_all_groups = (req, res) => {
  Group.find({}, (error, groups) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(groups);
    }
  })
}

exports.create_a_group = (req, res) => {
  let new_group = new Group(req.body);

  const randomTextPromise = textApiProvider.getRandomText();

  randomTextPromise.then(response => {
    if(!new_group.content){
      new_group.content = response;
    }
    new_group.save((error, group) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(201);
        res.json(group);
      }
    });
  }, error => {
    console.log(error)
  })
}

exports.get_a_group = (req, res) => {
  Group.findById(req.params.group_id, (error, group) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(group);
    }
  })
}

exports.update_a_group = (req, res) => {
  Group.findOneAndUpdate({_id: req.params.group_id}, req.body, {new: true}, (error, group) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(group);
    }
  })
}

exports.delete_a_group = (req, res) => {
  Group.remove({_id: req.params.group_id}, (error) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json({message: "Groupe supprimé"});
    }
  })
}
