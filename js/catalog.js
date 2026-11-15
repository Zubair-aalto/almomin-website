/* ============================================================
   ALMO'MIN CATALOGUE: edit this file to add books and bundles.
   - cover: path to an image in assets/books/ (leave "" for "cover coming")
   - bundle: the id of the bundle the book belongs to
   ============================================================ */

window.ALMOMIN = {
  // WhatsApp number in international format, digits only (+358 41 722 5258)
  whatsapp: "358417225258",
  currency: "€",

  bundles: [
    { id: "beginning", no: "I",   title: "In the Beginning",     urdu: "آغازِ انسانیت", price: 10,
      blurb: "The first chapters of humankind: the Garden, the first brothers, the great flood and the nations of ‘Ad and Thamud." },
    { id: "ibrahim",   no: "II",  title: "The House of Ibrahim", urdu: "آلِ ابراہیم",   price: 10,
      blurb: "A family of prophets: Lut (AS), Ismail’s (AS) sacrifice, Yaqub (AS) and his sons, and the beautiful story of Yusuf (AS)." },
    { id: "trials",    no: "III", title: "Trials & Triumph",     urdu: "صبر و ظفر",     price: 12,
      blurb: "Patience in hardship and courage before kings: Ayub, Shuaib, Musa, Dawud and Sulaiman (peace be upon them)." },
    { id: "light",     no: "IV",  title: "Light upon Light",     urdu: "نورٌ علیٰ نور", price: 12,
      blurb: "From Yunus (AS) in the whale and the Companions of the Cave to the life of the final Messenger, Muhammad ﷺ." }
  ],

  books: [
    // I. In the Beginning (5)
    { title: "Adam and Eve",               prophet: "Hazrat Adam (AS)",     cover: "assets/books/adam-eve.jpg",          bundle: "beginning", spine: "#C2603F" },
    { title: "Cain and Abel",              prophet: "Sons of Adam (AS)",    cover: "assets/books/cain-abel.jpg",         bundle: "beginning", spine: "#22396E" },
    { title: "Noah’s Ark",                 prophet: "Hazrat Nuh (AS)",      cover: "assets/books/noah.jpg",              bundle: "beginning", spine: "#2B3F86" },
    { title: "Hud and the Terrible Storm", prophet: "Hazrat Hud (AS)",      cover: "assets/books/hud.jpg",               bundle: "beginning", spine: "#3A1F1C" },
    { title: "Salih and the She-Camel",    prophet: "Hazrat Salih (AS)",    cover: "assets/books/salih.jpg",             bundle: "beginning", spine: "#B5482C" },

    // II. The House of Ibrahim (5)
    { title: "Lot and the Nation of Sodom",   prophet: "Hazrat Lut (AS)",    cover: "assets/books/lot.jpg",               bundle: "ibrahim", spine: "#14213F" },
    { title: "Ismail’s Great Sacrifice",      prophet: "Hazrat Ismail (AS)", cover: "assets/books/ismail.jpg",            bundle: "ibrahim", spine: "#1E2D63" },
    { title: "Yaqub and His Sons",            prophet: "Hazrat Yaqub (AS)",  cover: "assets/books/yaqub.jpg",             bundle: "ibrahim", spine: "#3A2C8A" },
    { title: "Yusuf and His Brothers",        prophet: "Hazrat Yusuf (AS)",  cover: "assets/books/yusuf-brothers.jpg",    bundle: "ibrahim", spine: "#C9853F" },
    { title: "Yusuf and the King’s Dream",    prophet: "Hazrat Yusuf (AS)",  cover: "assets/books/yusuf-kings-dream.jpg", bundle: "ibrahim", spine: "#E0812E" },

    // III. Trials & Triumph (6)
    { title: "Ayub’s Patience",                 prophet: "Hazrat Ayub (AS)",     cover: "assets/books/ayub.jpg",          bundle: "trials", spine: "#5A3426" },
    { title: "Shuaib and the People of Madyan", prophet: "Hazrat Shuaib (AS)",   cover: "assets/books/shuaib.jpg",        bundle: "trials", spine: "#B53F22" },
    { title: "Moses and the Evil Pharaoh",      prophet: "Hazrat Musa (AS)",     cover: "assets/books/moses-pharaoh.jpg", bundle: "trials", spine: "#163A5C" },
    { title: "Moses and the Miser Qaroon",      prophet: "Hazrat Musa (AS)",     cover: "assets/books/moses-qaroon.jpg",  bundle: "trials", spine: "#1F3A86" },
    { title: "Dawud and King Talut",            prophet: "Hazrat Dawud (AS)",    cover: "assets/books/dawud.jpg",         bundle: "trials", spine: "#2E5FA8" },
    { title: "Sulaiman and the Hoopoe Bird",    prophet: "Hazrat Sulaiman (AS)", cover: "assets/books/sulaiman.jpg",      bundle: "trials", spine: "#2C5A7A" },

    // IV. Light upon Light (6)
    { title: "Yunus in the Whale’s Belly",  prophet: "Hazrat Yunus (AS)",    cover: "assets/books/yunus.jpg",      bundle: "light", spine: "#1B2F8C" },
    { title: "Life of Hazrat Zakariyah",    prophet: "Hazrat Zakariya (AS)", cover: "assets/books/zakariyah.jpg",  bundle: "light", spine: "#1F3C8E" },
    { title: "Yahya and King Herod",        prophet: "Hazrat Yahya (AS)",    cover: "assets/books/yahya.jpg",      bundle: "light", spine: "#3B6FB0" },
    { title: "Isa’s Miraculous Life",       prophet: "Hazrat Isa (AS)",      cover: "assets/books/isa.jpg",        bundle: "light", spine: "#D2493A" },
    { title: "Companions of the Cave",      prophet: "Ashab al-Kahf",        cover: "assets/books/companions-cave.jpg", bundle: "light", spine: "#1E2A33" },
    { title: "Life of Hazrat Muhammad ﷺ",  prophet: "Hazrat Muhammad ﷺ",   cover: "assets/books/muhammad.jpg",   bundle: "light", spine: "#1C3678" }
  ]
};
