const db = require("../db.json");

function getTranslate(search) {
  const letter = search[0].toUpperCase();
  if (db[letter]) {
    const check = db[letter].find(
      (item) => item.title.toLowerCase() === search.toLowerCase()
    );
    if (check) return check.titleCRH;
  }
  return "В словаре нету такого слова 🙃";
}

module.exports = getTranslate;
