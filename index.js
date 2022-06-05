const express = require('express');
const Firestore = require('@google-cloud/firestore');
const db = new Firestore();
const { nanoid } = require('nanoid');
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`GetFix Rest API listening on port ${port}`);
});

app.get('/', async (req, res) => {
    res.json({status: 'GetFix is ready.'});
})


//membuat orderan panggil teknisi
app.post('/orders',async (req,res)=>{
  const data ={
    id: nanoid(10),
	id_user : req.body.id_user,
	id_teknisi : req.body.id_teknisi,
    layanan: req.body.layanan,
    alamat: req.body.alamat,
    wilayah: req.body.wilayah,
    jadwal: req.body.jadwal,
	deskripsi: req.body.deskripsi,
	teknisi: req.body.teknisi
  }
  await db.collection('orders').doc().set(data);
  res.json({message:'order success', data : {pesananID: id}});
 
})

//menampilkan data orderan berdasarkan id
app.get('/orders/:id', async (req, res) => {
    const id = req.params.id;
    const query = db.collection('orders').where('id', '==', id);
    const querySnapshot = await query.get();
    if (querySnapshot.size > 0) {
        res.json(querySnapshot.docs[0].data());
    }
    else {
        res.json({status: 'Not found'});
    }
})

//menampilkan semua orderan user berdasarkan id_user
app.get('/allorder:id_user', async (req, res) => {
  const id_user = req.params.id_user;
  const snapshot = await db.collection('orders').where('id_user', '==', id_user).get();
  if (snapshop.empty) {
    console.log('Data Tidak Ditemukan');
	return;
  }
  snapshot.forEach(doc => {
	console.log(doc.id, '=>', doc.data());
  });
})
