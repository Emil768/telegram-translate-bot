import cherrio from "cheerio";
import fs from "fs";
import axios from "axios";

async function scrap() {
  const { data } = await axios.get(
    "https://dicipedia.com/dic-ru-ct-lat.htm?letter=29"
  );

  const scrapedData = [];

  const $ = cherrio.load(data);
  const letters = $("ul li h2");

  letters.each((index, item) => {
    const scrapItem = { title: "", link: "" };
    scrapItem.title =
      $(item).children("a").children("span").text() +
      $(item).children("a").children("strong ").text();
    scrapItem.link = $(item).children("a").attr("href");

    scrapedData.push(scrapItem);
  });

  const newArray = scrapedData.map(async ({ title, link }) => {
    let { data } = await axios.get(`https://dicipedia.com${link}`);

    const $ = cherrio.load(data);
    const titleCRH = $(".des .par1").text();

    return {
      title,
      link,
      titleCRH,
    };
  });

  const array = await Promise.all(newArray);

  fs.writeFile("./translates/RU.json", JSON.stringify(array, null, 2), (e) => {
    if (e) {
      console.log(e);
      return;
    }
    console.log("Scraping completed.");
  });
}
