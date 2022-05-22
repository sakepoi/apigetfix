const {
    addNewBook,
    getAll,
    getBookId,
    editBook,
    deleteBook,
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addNewBook,
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: editBook,
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAll,
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: getBookId,
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: deleteBook,
    },
  ];
  
  module.exports = routes;
  