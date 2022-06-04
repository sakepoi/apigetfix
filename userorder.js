  

  //menampilkan data orderan berdasarkan username
  app.get('/users/:username', async (req, res) => {
      const username = req.params.username;
      const query = db.collection('users').where('username', '==', username);
      const querySnapshot = await query.get();
      if (querySnapshot.size > 0) {
          res.json(querySnapshot.docs[0].data());
      }
      else {
          res.json({status: 'Not found'});
      }
  })
  
  //menampilkan semua orderan user
  app.get('/alluser', async (req, res) => {
    let ord=[]
     const order = await db.collection('users').where('username', '==', username).get()
    if (order.docs.length > 0) {
      for (const orders of order.docs) {
       ord.push(orders.data())
    }}
    res.json(ord)
  })