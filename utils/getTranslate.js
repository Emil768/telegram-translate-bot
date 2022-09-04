import { RuLang, CrhLang } from "../locales/index.js";

export default function getTranslate(search) {
  const letter = search[0].toUpperCase();
  const getLetter = RuLang.letterAll[letter];
  if (getLetter) {
    const getIndex = getLetter.indexOf(search.toLowerCase());
    if (getIndex !== -1) {
      return CrhLang.letterAll[letter][getIndex];
    } else {
      return "В словаре нету такого слова 🙃";
    }
  } else {
    return "В словаре нету такого слова 🙃";
  }
}
