const axios = require('axios')

exports.handler = function (event) {
  console.log(event.headers)
  if (event.headers.referer.includes('nosgestesclimat')) {
    return axios
      .get(
        `https://stats.data.gouv.fr/?${event.rawQuery}&token_auth=${process.env.MATOMO_API_KEY}`
      )
      .then((res) => ({
        statusCode: 200,
        body: JSON.stringify(res.data),
      }))
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify('Unauthorized'),
    }
  }
}
