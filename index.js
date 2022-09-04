import express, { json } from "express";
import cors from "cors";
import { Telegraf, session, Markup } from "telegraf";
import dotenv from "dotenv";
import { commands } from "./const.js";
import { parse } from "node-html-parser";
import cheerio from "cheerio";

dotenv.config();

import db from "./locales/locales.json" assert { type: "json" };
import axios from "axios";

const app = express();

app.use(cors());

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour24: true,
  day: "numeric",
};

function getLetter(search) {
  const letter = search[0].toUpperCase();
  const getLetter = db.Russian.letterAll[letter];
  if (getLetter) {
    const getIndex = getLetter.indexOf(search.toLowerCase());
    if (getIndex !== -1) {
      return db.Crimean.letterAll[letter][getIndex];
    } else {
      return "В словаре нету такого слова 🙃";
    }
  } else {
    return "В словаре нету такого слова 🙃";
  }
}

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(async (ctx) => {
  await ctx.reply(`Selyam aleykum ${ctx.message.from.username} !`);
  await ctx.reply("Жду слово которое нужно перевести 😄");
});

bot.on("sticker", (ctx) =>
  ctx.replyWithPhoto(
    "https://i.pinimg.com/originals/80/59/e3/8059e336689af3fc256bf41d6d1ae4c5.jpg"
  )
);

bot.command("time", (ctx) =>
  ctx.reply(String(new Date().toLocaleDateString("ru-RU", options)))
);

bot.command("help", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Если возникли вопросы,предложения 👇</b> ",
      Markup.inlineKeyboard([
        Markup.button.url("Написать", "https://t.me/Emilka22878"),
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.command("links", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Интересные группы🤗</b>",
      Markup.inlineKeyboard([
        [Markup.button.url("Красота Крыма🕌", "https://t.me/QIRIM_TOPONIMIKA")],
        [Markup.button.url("Кулинария🥐", "https://t.me/elvinaadilovna")],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.on("message", async (ctx) => {
  try {
    const res = getLetter(ctx.message.text);
    ctx.reply(res);
  } catch (err) {
    console.log(err);
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

// app.get("/upload", async (req, res) => {
//   try {
//     const resQ = await axios.get(
//       "https://gufo.me/dict/rucrh/%D0%B0%D0%B1%D0%B1%D1%80%D0%B5%D0%B2%D0%B8%D0%B0%D1%82%D1%83%D1%80%D0%B0"
//     );

//     res.json({
//       message: req.data && resQ.data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(3333, () => {
  console.log("server is starting!");
});
