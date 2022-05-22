'use strict'

const Hapi = require('@hapi/hapi')

const detailorder = require('./detailorder')

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST
  })

  server.route([
    {
      method: 'GET',
      path: '/detailorder',
      handler: () => detailorder
    },
    {
      method: 'GET',
      path: '/detailorder/{id}',
      handler: (request, handler) => {
        const { id } = request.params
        const index = detailorder.findIndex(order => order.id === Number(id))

        if (index === -1) {
          const response = handler.response({ message: 'order not found' })
          response.code(404)
          return response
        }

        const order = detailorder[index]

        return order
      }
    },
    {
      method: 'POST',
      path: '/detailorder',
      handler: (request, handler) => {
        const { name, email, phone } = request.payload
        const id = detailorder[detailorder.length - 1].id + 1

        detailorder.push({
          lokasi,
          date,
          jobdesk,
          desc,
          image
        })

        const response = handler.response({ message: 'berhasil diorder' })
        response.code(201)
        return response
      }
    },   
  ])

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
