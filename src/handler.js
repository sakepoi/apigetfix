const { nanoid } = require('nanoid');
const order = require('./books');

//menambahkan order baru
const addNewOrder = (request, h) => {
    const {
      jenisLayanan, 
      loc, 
      jadwal, 
      detailPekerjaan, 
      desc, 
      image, 
    } = request.payload;

    const id = nanoid(10);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newOrder = {
        jenisLayanan, 
        loc, 
        jadwal, 
        detailPekerjaan, 
        desc, 
        image,
        insertedAt,
        updatedAt,
      };

      if (jenisLayanan === undefined) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal membuat pesanan',
        });
        response.code(400);
        return response;
      }
    
      order.push(newOrder);

      const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      response.code(500);
      return response;
}

module.exports = {
    addNewOrder,
  };
  