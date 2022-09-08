import db from "../db.json" assert { type: "json" };

export default function getTranslate(search) {
  console.log(search);
  console.log(typeof db);
  const letter = search[0].toUpperCase();
  const getLetter = JSON.parse(db);

  if (getLetter) {
    return true;
  } else {
    return "В словаре нету такого слова 🙃";
  }
}
