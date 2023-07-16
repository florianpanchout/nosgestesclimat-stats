var SibApiV3Sdk = require('sib-api-v3-sdk')

var defaultClient = SibApiV3Sdk.ApiClient.instance

var apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.BREVO_API_KEY

exports.handler = function (event) {
  var api = new SibApiV3Sdk.ContactsApi()
  return api.getList(10).then((data) => ({
    statusCode: 200,
    body: JSON.stringify(data),
  }))
}
