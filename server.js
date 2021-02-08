/* eslint-disable camelcase */
const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
const mercadopago = require('mercadopago')
mercadopago.configurations.setAccessToken('TEST-2528813857390327-011214-ec73171c325ec8e222037a81f54c5253-28897842')

const stdRes = require('./utils/standard-response')

const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (_req, res) {
  res.render('payment')
})

// payment
app.post('/process_payment', async function (req, res) {
  try {
    console.log('req.body---', req.body)

    const payment_data = {
      transaction_amount: Number(req.body.transactionAmount),
      token: req.body.token,
      description: req.body.description,
      installments: Number(req.body.installments),
      payment_method_id: req.body.paymentMethodId,
      issuer_id: req.body.issuer,
      payer: {
        email: req.body.email,
        identification: {
          type: req.body.docType,
          number: req.body.docNumber
        }
      }
    }

    console.log('payment_data----------------------', payment_data)

    mercadopago.payment.save(payment_data)
      .then(function (response) {
        console.log('response', response)
        res.status(response.status).json({
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id
        })
      })
      .catch(function (error) {
        console.log('error----------------------', error)

        res.status(error.status).send(error)
      })
  } catch (error) {
    console.log('error', error)
    stdRes._500(res, error.message)
  }
})

app.listen(port, function (_error) {
  console.log('Server created Successfully')
})
