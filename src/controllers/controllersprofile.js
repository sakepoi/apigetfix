'use strict';

const firebase = require('../db');
const Profile = require('../models/profile');
const firestore = firebase.firestore();

const addProfile = async(req,res) =>{
    try {
        const data = req.body;
        await firestore.collection('profiles').doc().set(data);
        res.send('Berhasil tersimpan');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProfile = async(req,res) =>{
    try {
        const id = req.params.id;
        const profile = await firestore.collection('profiles').doc(id);
        const data = await profile.get();
        if (!data.exists) {
            res.status(404).send('Profile with the given ID not found');    
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProfile = async(req,res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const profile = await firestore.collection('profiles').doc(id);
        await profile.update(data);
        res.send('Perbaruan data tersimpan');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addProfile,
    getProfile,
    updateProfile,
}