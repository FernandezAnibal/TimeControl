const userCtrl = {};

const User = require('../models/user');

userCtrl.getUsers = async (req, res) => { 
    const user = await User.find();
    res.json(user);
}


userCtrl.createUser = async (req, res) => {
    const {username} =req.body;
    const newUser = new User({username});
    await newUser.save()
    res.json({message: 'User Created'})
}

userCtrl.getUser = async (req, res) => 
{
    const user = await User.findById(req.params.id); 
    console.log(user);
    res.json(user)
}


userCtrl.deleteUser = async (req, res) => 
{
    const user = await User.findOneAndDelete(req.params.id); 
    console.log(user);
    res.json({title: 'Deleted User'})
}
module.exports = userCtrl;