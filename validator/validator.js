const validator = require('validator')

const stdRes = require('../utils/standard-response')

exports.fieldValidation = (req, res, next) => {
  if (!req.body.email) return stdRes._400(res, 'email', 'Please enter email')
  req.body.email = req.body.email.trim().toLowerCase()
  if (!validator.isEmail(req.body.email)) return stdRes._400('email', 'Enter a valid email')

  if (!req.body.name) return stdRes._400(res, 'name', 'Please enter name')
  req.body.name = req.body.name.trim()

  if (!req.body.phone) return stdRes._400(res, 'phone', 'Please enter phone')
  if (!req.body.city) return stdRes._400(res, 'city', 'Please enter city')
  if (!req.body.state) return stdRes._400(res, 'state', 'Please enter state')
  if (!req.body.country) return stdRes._400(res, 'country', 'Please enter country')
  if (!req.body.postal_code) return stdRes._400(res, 'postal_code', 'Please enter postal_code')

  // card details
  if (!req.body.number) return stdRes._400(res, 'number', 'Please enter number')
  if (!req.body.exp_month) return stdRes._400(res, 'exp_month', 'Please enter exp_month')
  if (!req.body.exp_year) return stdRes._400(res, 'exp_year', 'Please enter exp_year')
  if (!req.body.cvc) return stdRes._400(res, 'cvc', 'Please enter cvc')

  next()
}
