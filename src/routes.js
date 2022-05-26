const {
    addNewOrder,
    getAll,
    getOrderId,
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/Orders',
      handler: addNewOrder,
    },
    {
      method: 'GET',
      path: '/Orders',
      handler: getAll,
    },
    {
      method: 'GET',
      path: '/Orders/{id}',
      handler: getOrderId,
    },
  ];
  
  module.exports = routes;
  