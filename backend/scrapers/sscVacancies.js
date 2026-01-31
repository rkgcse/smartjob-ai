const axios = require("axios");
const cheerio = require("cheerio");
const pdfParse = require("pdf-parse");
const Job = require("../models/job"); // your job model

const SSC_VACANCY_PAGE = "https://ssc.gov.in/for-candidates/tentative-vacancy";

async function scrapeSSCJobs() {
  try {
    const { data } = await axios.get(SSC_VACANCY_PAGE);
    const $ = cheerio.load(data);

    // find PDF links on vacancy page
    let pdfLinks = [];
    $("a").each((i, el) => {
      const href = $(el).attr("href");
      if (href && href.toLowerCase().endsWith(".pdf")) {
        pdfLinks.push(href.startsWith("http") ? href : "https://ssc.gov.in" + href);
      }
    });

    // iterate each PDF
    for (let pdfUrl of pdfLinks) {
      const pdfBuffer = (await axios.get(pdfUrl, { responseType: "arraybuffer" })).data;
      const pdfData = await pdfParse(pdfBuffer);

      const text = pdfData.text.split("\n");
      let title, applyLink;

      // simple parsing logic — look for lines with uppercase + numbers
      text.forEach((line) => {
        line = line.trim();
        if (/SSC|Vacancy|Recruitment/i.test(line) && line.length < 150) {
          title = title || line;
        }
        if (/http[s]?:\/\/\S+/i.test(line)) {
          applyLink = applyLink || line.match(/http[s]?:\/\/\S+/i)[0];
        }
      });

      if (title && applyLink) {
        await Job.updateOne(
          { title },
          { title, company: "SSC", skills: [], applyLink },
          { upsert: true }
        );
      }
    }

    console.log("SSC jobs scraped");
  } catch (err) {
    console.error("Scraper error:", err.message);
  }
}

module.exports = scrapeSSCJobs;
const scrapeSSCJobs = require("./scrapers/sscVacancies");

// run on start
scrapeSSCJobs();

// every 24 hours
setInterval(scrapeSSCJobs, 1000 * 60 * 60 * 24);