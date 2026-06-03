const express  = require('express');
const router = express.Router();
const Person = require('../models/person');

// route for person.

router.post('/',async (req, res) =>{

  try{
    const data = req.body //Assuming the request body contains the person data
  
    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    //Save the  new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error : "Internal server error"});
  }

  // const data = req.body //Assuming the request body contains the person data
  
  // // Create a new Person document using the Mongoose model
  // const newPerson = new Person(data);

  // //Save the  new person to the database
  // newPerson.save((error, savedPerson) =>{
  //   if(error){
  //     console.log('Error saving person:', error);
  //     res.status(500).json({error: 'Internal server error'})
  //   }else{
  //     console.log('data saved successfully');
  //     res.status(200).json(savedPerson);
  //   }
  // })

  // newPerson.name = data.name;
  // newPerson.age = data.age;
  // newPerson.mobile = data.mobile;
  // newPerson.email = data.email;
  // newPerson.address = data.address;

})

router.get('/',async (req,res)=>{
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error : "Internal server error"});
  }
})

router.get('/:workType', async (req, res) =>{
  try{
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'manger' || workType == 'waiter'){
      const response = await Person.find({work: workType});
      console.log("response fatched");
      res.status(200).json(response);
    }else{
      console.log("Invail work type");
      res.status(404).json({error:"Invail work type"});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  }
})

router.put('/:id', async (req, res) =>{
    try{
        const personId = req.params.id; // Extract the id from the url parameter
        const updatePersonData = req.body; //updateed data for the person

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation jo models me defined hai
        })
        if(!response){
            return res.status(404).json({error: 'Person not found'});
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
        const personId = req.params.id
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: "Person not Found"});
        }
        console.log("deleted suceessfully");
        res.status(200).json({message:"Person Deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})



module.exports = router;