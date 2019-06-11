const axios = require('axios');
const cheerio = require('cheerio');

const handle = require('../utils/promise-handler');

// scrape whosampled and send to front end when GET '/api/samples' is hit
// this accepts req.query => {q: "query string"}
// /api/samples/?q="michael jackson"
const scrapeWhoSampled =  async (req, res) => {
  console.log(req.query);
  // const [err, data ] = await handle(axios.get('https://www.whosampled.com/search/connections', {params: {q: req.query.q.split(" ").join("%20")}}));
  const [err, data ] = await handle(axios.get('https://www.whosampled.com/search/connections', {params: {q: req.query.q}}));
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    const $ = cheerio.load(data.data);
    const samples = [];
    $('.listEntry').each((i, element) => {
      const sampleData = {
        title: $(element).text(),
        link: $(element)
          .find('a')
          .attr('href')
      };
      samples.push(sampleData);
    });

    return res.status(200).json(samples);
  }

// export our data
module.exports = {
  scrapeWhoSampled
}
