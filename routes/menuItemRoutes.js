const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// route for menu.
router.post('/', async (req, res) => {
  try{
    const data = req.body; //got the data from the http req body
    
    //create model document from mongoose model
    const newmenuIteam = new MenuItem(data);
    
    //saving it into the database using await and showing the response.
    const response = await newmenuIteam.save();
    console.log("Saved menu");
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  }
})

router.get('/', async (req, res) =>{
  try{
    const data = await MenuItem.find();
    console.log("fetched menu");
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
})

router.get('/:tasteOfItem', async (req, res) => {
  try{
    const tasteOfItem = req.params.tasteOfItem;
    if(tasteOfItem == 'sweet' || tasteOfItem == 'Spicy' || tasteOfItem == 'Sour'){
      const response = await MenuItem.find({taste: tasteOfItem});
      console.log('fetched successfully');
      res.status(200).json(response);
    }else{
      res.status(404).json('Invalid not found');
    }

  }catch(err){
    console.log(err);
    res.status(500).json({error: "internal Server Error"});
  }
})

router.put('/:id', async (req, res) =>{
    try{
        const menuId = req.params.id; // Extract the id from the url parameter
        const updateMenuData = req.body; //updateed data for the person

        const response = await MenuItem.findByIdAndUpdate(menuId, updateMenuData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation jo models me defined hai
        })
        if(!response){
            return res.status(404).json({error: 'Menu not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const menuId = req.params.id
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error: "Menu not Found"});
        }
        console.log("Selected Menu Deleted suceessfully");
        res.status(200).json({message:"Selected Menu Deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;