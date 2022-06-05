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
  let docRef=db.collection('orders')
  await docRef.add({
    id: nanoid(10),
	id_user : req.body.id_user,
	id_teknisi : req.body.id_teknisi,
    layanan: req.body.layanan,
    alamat: req.body.alamat,
    wilayah: req.body.wilayah,
    jadwal: req.body.jadwal,
	deskripsi: req.body.deskripsi,
	teknisi: req.body.teknisi
  });
 res.json({message:'order success'});
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
app.get('/allorder/:id_user', async (req, res) => {
  const id_user = req.params.id_user;
  let ord=[]
   const order = await db.collection('orders').where('id_user', '==', id_user).get()
  if (user.docs.length > 0) {
    for (const orders of orders.docs) {
     ord.push(orders.data())
  }}
  res.json(ord)
})