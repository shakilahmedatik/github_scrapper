const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
require('dotenv').config()
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4000

app.post('/get-push-time', async (req, res) => {
  const { repoUrl } = req.body
  try {
    const { data } = await axios(repoUrl)
    const $ = cheerio.load(data)

    const rawDate = $('relative-time').attr('datetime')
    console.log(rawDate)

    if (rawDate) {
      // const fullTime = {
      //   date: rawDate.slice(0, 10),
      //   time: rawDate.slice(11, 19),
      // }
      // res.json(fullTime)

      var localDate = new Date(rawDate).toLocaleString()
      console.log(localDate)

      res.json({ fullTime: localDate })
    } else {
      res.send('Try Again Please!')
    }
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`)
})
