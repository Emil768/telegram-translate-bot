import { RuLang, CrhLang } from "../locales/index.js";

export default function getAllTranslate(letter) {
  if (RuLang.letterAll[letter]) {
    return `${RuLang.letterAll[letter]} - ${CrhLang.letterAll[letter]}`;
  } else {
    return "В словаре нету такой буквы 🙃";
  }
}
