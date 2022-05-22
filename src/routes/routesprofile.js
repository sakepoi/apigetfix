const express = require('express');
const { 
    addProfile, 
    getAllProfiles, 
    getProfile, 
    updateProfile 
  } = require('../handlers/controllerprofile');

const router = express.Router();

router.post('/profile', addProfile);
router.get('/profiles', getAllProfiles);
router.get('/profile/:id', getProfile);
router.put('profile/update/:id', updateProfile);

module.exports ={
    routes : router
}