const express = require('express')
const router = express.Router()
const request = require('request')

const mailchimpInstance = 'us4'
// process.env.MAILCHIMP_INSTANCE
// "us4"
const mailchimpListID = 'e750d9dc4d'
// process.env.MAILCHIMP_LISTID
// "e750d9dc4d"
const mailchimpAPIKey = process.env.MAILCHIMP_APIKEY
// process.env.MAILCHIMP_APIKEY

router.post('/subscribe', (req, res) => {

  const { fName, lName, email } = req.body

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  }

  const postData = JSON.stringify(data)

  const options = {
    url: `https://${mailchimpInstance}.api.mailchimp.com/3.0/lists/${mailchimpListID}`,
    method: 'POST',
    headers: {
      Authorization: `auth ${mailchimpAPIKey}`,
    },
    body: postData,
  }

  request(options, (err, response, body) => {
    if (err) {
      console.log(err)
    } else {
      if (response.statusCode === 200) {
        console.log(response.statusCode)
      } else {
        console.log(response.statusCode)
      }
    }
  })
})

module.exports = router
