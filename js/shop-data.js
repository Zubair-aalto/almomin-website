/* Almo’min shop catalogue. Prices in EUR; options[].price is what customers pay.
   Checkout prices and stock (lib/catalog.js) and the product pages are generated from this file on every deploy. */
window.SHOP = {
 "categories": [
  {
   "id": "bundles",
   "label": "Prophet Stories & Sets"
  },
  {
   "id": "baby",
   "label": "Baby & Toddler"
  },
  {
   "id": "story",
   "label": "Story Books"
  },
  {
   "id": "activity",
   "label": "Activities & Cards"
  }
 ],
 "items": [
  {
   "id": "bundle-beginning",
   "title": "Bundle I: In the Beginning",
   "cat": "bundles",
   "isNew": false,
   "desc": "The first chapters of humankind: the Garden, the first brothers, the great flood and the nations of ‘Ad and Thamud.",
   "specs": "5 illustrated storybooks · Stories from the Holy Quran",
   "cover": "assets/shop/bundle-beginning.webp",
   "includes": [
    {
     "title": "Adam and Eve",
     "cover": "assets/books/adam-eve.jpg",
     "hi": "assets/shop/gallery/book-adam-eve.webp"
    },
    {
     "title": "Cain and Abel",
     "cover": "assets/books/cain-abel.jpg",
     "hi": "assets/shop/gallery/book-cain-abel.webp"
    },
    {
     "title": "Noah’s Ark",
     "cover": "assets/books/noah.jpg",
     "hi": "assets/shop/gallery/book-noah.webp"
    },
    {
     "title": "Hud and the Terrible Storm",
     "cover": "assets/books/hud.jpg",
     "hi": "assets/shop/gallery/book-hud.webp"
    },
    {
     "title": "Salih and the She-Camel",
     "cover": "assets/books/salih.jpg",
     "hi": "assets/shop/gallery/book-salih.webp"
    }
   ],
   "options": [
    {
     "label": null,
     "price": 10.0
    }
   ],
   "gallery": [
    "assets/shop/bundle-beginning.webp",
    "assets/shop/gallery/book-adam-eve.webp",
    "assets/shop/gallery/book-cain-abel.webp",
    "assets/shop/gallery/book-noah.webp",
    "assets/shop/gallery/book-hud.webp",
    "assets/shop/gallery/book-salih.webp"
   ],
   "explore": "/shop/stories-from-the-quran/#bundle-i"
  },
  {
   "id": "bundle-ibrahim",
   "title": "Bundle II: The House of Ibrahim",
   "cat": "bundles",
   "isNew": false,
   "desc": "A family of prophets: Lut (AS), Ismail’s (AS) sacrifice, Yaqub (AS) and his sons, and the beautiful story of Yusuf (AS).",
   "specs": "5 illustrated storybooks · Stories from the Holy Quran",
   "cover": "assets/shop/bundle-ibrahim.webp",
   "includes": [
    {
     "title": "Lot and the Nation of Sodom",
     "cover": "assets/books/lot.jpg",
     "hi": "assets/shop/gallery/book-lot.webp"
    },
    {
     "title": "Ismail’s Great Sacrifice",
     "cover": "assets/books/ismail.jpg",
     "hi": "assets/shop/gallery/book-ismail.webp"
    },
    {
     "title": "Yaqub and His Sons",
     "cover": "assets/books/yaqub.jpg",
     "hi": "assets/shop/gallery/book-yaqub.webp"
    },
    {
     "title": "Yusuf and His Brothers",
     "cover": "assets/books/yusuf-brothers.jpg",
     "hi": "assets/shop/gallery/book-yusuf-brothers.webp"
    },
    {
     "title": "Yusuf and the King’s Dream",
     "cover": "assets/books/yusuf-kings-dream.jpg",
     "hi": "assets/shop/gallery/book-yusuf-kings-dream.webp"
    }
   ],
   "options": [
    {
     "label": null,
     "price": 10.0
    }
   ],
   "gallery": [
    "assets/shop/bundle-ibrahim.webp",
    "assets/shop/gallery/book-lot.webp",
    "assets/shop/gallery/book-ismail.webp",
    "assets/shop/gallery/book-yaqub.webp",
    "assets/shop/gallery/book-yusuf-brothers.webp",
    "assets/shop/gallery/book-yusuf-kings-dream.webp"
   ],
   "explore": "/shop/stories-from-the-quran/#bundle-ii"
  },
  {
   "id": "bundle-trials",
   "title": "Bundle III: Trials & Triumph",
   "cat": "bundles",
   "isNew": false,
   "desc": "Patience in hardship and courage before kings: Ayub, Shuaib, Musa, Dawud and Sulaiman (peace be upon them).",
   "specs": "6 illustrated storybooks · Stories from the Holy Quran",
   "cover": "assets/shop/bundle-trials.webp",
   "includes": [
    {
     "title": "Ayub’s Patience",
     "cover": "assets/books/ayub.jpg",
     "hi": "assets/shop/gallery/book-ayub.webp"
    },
    {
     "title": "Shuaib and the People of Madyan",
     "cover": "assets/books/shuaib.jpg",
     "hi": "assets/shop/gallery/book-shuaib.webp"
    },
    {
     "title": "Moses and the Evil Pharaoh",
     "cover": "assets/books/moses-pharaoh.jpg",
     "hi": "assets/shop/gallery/book-moses-pharaoh.webp"
    },
    {
     "title": "Moses and the Miser Qaroon",
     "cover": "assets/books/moses-qaroon.jpg",
     "hi": "assets/shop/gallery/book-moses-qaroon.webp"
    },
    {
     "title": "Dawud and King Talut",
     "cover": "assets/books/dawud.jpg",
     "hi": "assets/shop/gallery/book-dawud.webp"
    },
    {
     "title": "Sulaiman and the Hoopoe Bird",
     "cover": "assets/books/sulaiman.jpg",
     "hi": "assets/shop/gallery/book-sulaiman.webp"
    }
   ],
   "options": [
    {
     "label": null,
     "price": 12.0
    }
   ],
   "gallery": [
    "assets/shop/bundle-trials.webp",
    "assets/shop/gallery/book-ayub.webp",
    "assets/shop/gallery/book-shuaib.webp",
    "assets/shop/gallery/book-moses-pharaoh.webp",
    "assets/shop/gallery/book-moses-qaroon.webp",
    "assets/shop/gallery/book-dawud.webp",
    "assets/shop/gallery/book-sulaiman.webp"
   ],
   "explore": "/shop/stories-from-the-quran/#bundle-iii"
  },
  {
   "id": "bundle-light",
   "title": "Bundle IV: Light upon Light",
   "cat": "bundles",
   "isNew": false,
   "desc": "From Yunus (AS) in the whale and the Companions of the Cave to the life of the final Messenger, Muhammad ﷺ.",
   "specs": "6 illustrated storybooks · Stories from the Holy Quran",
   "cover": "assets/shop/bundle-light.webp",
   "includes": [
    {
     "title": "Yunus in the Whale’s Belly",
     "cover": "assets/books/yunus.jpg",
     "hi": "assets/shop/gallery/book-yunus.webp"
    },
    {
     "title": "Life of Hazrat Zakariyah",
     "cover": "assets/books/zakariyah.jpg",
     "hi": "assets/shop/gallery/book-zakariyah.webp"
    },
    {
     "title": "Yahya and King Herod",
     "cover": "assets/books/yahya.jpg",
     "hi": "assets/shop/gallery/book-yahya.webp"
    },
    {
     "title": "Isa’s Miraculous Life",
     "cover": "assets/books/isa.jpg",
     "hi": "assets/shop/gallery/book-isa.webp"
    },
    {
     "title": "Companions of the Cave",
     "cover": "assets/books/companions-cave.jpg",
     "hi": "assets/shop/gallery/book-companions-cave.webp"
    },
    {
     "title": "Life of Hazrat Muhammad ﷺ",
     "cover": "assets/books/muhammad.jpg",
     "hi": "assets/shop/gallery/book-muhammad.webp"
    }
   ],
   "options": [
    {
     "label": null,
     "price": 12.0
    }
   ],
   "gallery": [
    "assets/shop/bundle-light.webp",
    "assets/shop/gallery/book-yunus.webp",
    "assets/shop/gallery/book-zakariyah.webp",
    "assets/shop/gallery/book-yahya.webp",
    "assets/shop/gallery/book-isa.webp",
    "assets/shop/gallery/book-companions-cave.webp",
    "assets/shop/gallery/book-muhammad.webp"
   ],
   "explore": "/shop/stories-from-the-quran/#bundle-iv"
  },
  {
   "id": "bundle-complete",
   "title": "The Complete Set: All 4 Bundles",
   "cat": "bundles",
   "isNew": false,
   "desc": "Every story in the series, from Adam (AS) to Muhammad ﷺ: all four bundles together, 22 books in all.",
   "specs": "22 illustrated storybooks · 4 bundles",
   "cover": "assets/shop/bundle-complete.webp",
   "includes": [
    {
     "title": "Adam and Eve",
     "cover": "assets/books/adam-eve.jpg",
     "hi": "assets/shop/gallery/book-adam-eve.webp"
    },
    {
     "title": "Cain and Abel",
     "cover": "assets/books/cain-abel.jpg",
     "hi": "assets/shop/gallery/book-cain-abel.webp"
    },
    {
     "title": "Noah’s Ark",
     "cover": "assets/books/noah.jpg",
     "hi": "assets/shop/gallery/book-noah.webp"
    },
    {
     "title": "Hud and the Terrible Storm",
     "cover": "assets/books/hud.jpg",
     "hi": "assets/shop/gallery/book-hud.webp"
    },
    {
     "title": "Salih and the She-Camel",
     "cover": "assets/books/salih.jpg",
     "hi": "assets/shop/gallery/book-salih.webp"
    },
    {
     "title": "Lot and the Nation of Sodom",
     "cover": "assets/books/lot.jpg",
     "hi": "assets/shop/gallery/book-lot.webp"
    },
    {
     "title": "Ismail’s Great Sacrifice",
     "cover": "assets/books/ismail.jpg",
     "hi": "assets/shop/gallery/book-ismail.webp"
    },
    {
     "title": "Yaqub and His Sons",
     "cover": "assets/books/yaqub.jpg",
     "hi": "assets/shop/gallery/book-yaqub.webp"
    },
    {
     "title": "Yusuf and His Brothers",
     "cover": "assets/books/yusuf-brothers.jpg",
     "hi": "assets/shop/gallery/book-yusuf-brothers.webp"
    },
    {
     "title": "Yusuf and the King’s Dream",
     "cover": "assets/books/yusuf-kings-dream.jpg",
     "hi": "assets/shop/gallery/book-yusuf-kings-dream.webp"
    },
    {
     "title": "Ayub’s Patience",
     "cover": "assets/books/ayub.jpg",
     "hi": "assets/shop/gallery/book-ayub.webp"
    },
    {
     "title": "Shuaib and the People of Madyan",
     "cover": "assets/books/shuaib.jpg",
     "hi": "assets/shop/gallery/book-shuaib.webp"
    },
    {
     "title": "Moses and the Evil Pharaoh",
     "cover": "assets/books/moses-pharaoh.jpg",
     "hi": "assets/shop/gallery/book-moses-pharaoh.webp"
    },
    {
     "title": "Moses and the Miser Qaroon",
     "cover": "assets/books/moses-qaroon.jpg",
     "hi": "assets/shop/gallery/book-moses-qaroon.webp"
    },
    {
     "title": "Dawud and King Talut",
     "cover": "assets/books/dawud.jpg",
     "hi": "assets/shop/gallery/book-dawud.webp"
    },
    {
     "title": "Sulaiman and the Hoopoe Bird",
     "cover": "assets/books/sulaiman.jpg",
     "hi": "assets/shop/gallery/book-sulaiman.webp"
    },
    {
     "title": "Yunus in the Whale’s Belly",
     "cover": "assets/books/yunus.jpg",
     "hi": "assets/shop/gallery/book-yunus.webp"
    },
    {
     "title": "Life of Hazrat Zakariyah",
     "cover": "assets/books/zakariyah.jpg",
     "hi": "assets/shop/gallery/book-zakariyah.webp"
    },
    {
     "title": "Yahya and King Herod",
     "cover": "assets/books/yahya.jpg",
     "hi": "assets/shop/gallery/book-yahya.webp"
    },
    {
     "title": "Isa’s Miraculous Life",
     "cover": "assets/books/isa.jpg",
     "hi": "assets/shop/gallery/book-isa.webp"
    },
    {
     "title": "Companions of the Cave",
     "cover": "assets/books/companions-cave.jpg",
     "hi": "assets/shop/gallery/book-companions-cave.webp"
    },
    {
     "title": "Life of Hazrat Muhammad ﷺ",
     "cover": "assets/books/muhammad.jpg",
     "hi": "assets/shop/gallery/book-muhammad.webp"
    }
   ],
   "options": [
    {
     "label": null,
     "price": 44.0
    }
   ],
   "gallery": [
    "assets/shop/bundle-complete.webp",
    "assets/shop/gallery/book-adam-eve.webp",
    "assets/shop/gallery/book-cain-abel.webp",
    "assets/shop/gallery/book-noah.webp",
    "assets/shop/gallery/book-hud.webp",
    "assets/shop/gallery/book-salih.webp",
    "assets/shop/gallery/book-lot.webp",
    "assets/shop/gallery/book-ismail.webp",
    "assets/shop/gallery/book-yaqub.webp",
    "assets/shop/gallery/book-yusuf-brothers.webp",
    "assets/shop/gallery/book-yusuf-kings-dream.webp",
    "assets/shop/gallery/book-ayub.webp",
    "assets/shop/gallery/book-shuaib.webp",
    "assets/shop/gallery/book-moses-pharaoh.webp",
    "assets/shop/gallery/book-moses-qaroon.webp",
    "assets/shop/gallery/book-dawud.webp",
    "assets/shop/gallery/book-sulaiman.webp",
    "assets/shop/gallery/book-yunus.webp",
    "assets/shop/gallery/book-zakariyah.webp",
    "assets/shop/gallery/book-yahya.webp",
    "assets/shop/gallery/book-isa.webp",
    "assets/shop/gallery/book-companions-cave.webp",
    "assets/shop/gallery/book-muhammad.webp"
   ],
   "explore": "/shop/stories-from-the-quran/"
  },
  {
   "id": "quran-story-adam-eve",
   "title": "Adam and Eve",
   "cat": "bundles",
   "isNew": true,
   "desc": "How Allah created Adam (AS) and Hawwa, the angels’ bow, Iblis’s pride and the first lesson in saying sorry to Allah.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle I",
   "cover": "assets/books/adam-eve.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-adam-eve.webp"
   ],
   "group": "quran",
   "bundle": "bundle-beginning"
  },
  {
   "id": "quran-story-cain-abel",
   "title": "Cain and Abel",
   "cat": "bundles",
   "isNew": true,
   "desc": "The story of Adam’s (AS) two sons: jealousy, the first wrong on earth, and why Allah loves those who are sincere.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle I",
   "cover": "assets/books/cain-abel.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-cain-abel.webp"
   ],
   "group": "quran",
   "bundle": "bundle-beginning"
  },
  {
   "id": "quran-story-noah",
   "title": "Noah’s Ark",
   "cat": "bundles",
   "isNew": true,
   "desc": "Nuh (AS) calls his people to Allah for many years, builds the Ark, and the believers are saved from the great flood.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle I",
   "cover": "assets/books/noah.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-noah.webp"
   ],
   "group": "quran",
   "bundle": "bundle-beginning"
  },
  {
   "id": "quran-story-hud",
   "title": "Hud and the Terrible Storm",
   "cat": "bundles",
   "isNew": true,
   "desc": "Hud (AS) warns the mighty people of ‘Ad, who trust their strength instead of Allah, until the terrible storm comes.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle I",
   "cover": "assets/books/hud.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-hud.webp"
   ],
   "group": "quran",
   "bundle": "bundle-beginning"
  },
  {
   "id": "quran-story-salih",
   "title": "Salih and the She-Camel",
   "cat": "bundles",
   "isNew": true,
   "desc": "Salih (AS) and the miraculous she-camel of Thamud: a story about keeping promises and caring for Allah’s creatures.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle I",
   "cover": "assets/books/salih.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-salih.webp"
   ],
   "group": "quran",
   "bundle": "bundle-beginning"
  },
  {
   "id": "quran-story-lot",
   "title": "Lot and the Nation of Sodom",
   "cat": "bundles",
   "isNew": true,
   "desc": "Lut (AS) stays patient and faithful among a wicked people, and Allah saves him and his believing family.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle II",
   "cover": "assets/books/lot.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-lot.webp"
   ],
   "group": "quran",
   "bundle": "bundle-ibrahim"
  },
  {
   "id": "quran-story-ismail",
   "title": "Ismail’s Great Sacrifice",
   "cat": "bundles",
   "isNew": true,
   "desc": "Ibrahim (AS) and his son Ismail (AS) show perfect trust in Allah, the story behind Eid al-Adha.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle II",
   "cover": "assets/books/ismail.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-ismail.webp"
   ],
   "group": "quran",
   "bundle": "bundle-ibrahim"
  },
  {
   "id": "quran-story-yaqub",
   "title": "Yaqub and His Sons",
   "cat": "bundles",
   "isNew": true,
   "desc": "Yaqub (AS) and his twelve sons: a father’s patience, love and trust in Allah through difficult times.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle II",
   "cover": "assets/books/yaqub.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-yaqub.webp"
   ],
   "group": "quran",
   "bundle": "bundle-ibrahim"
  },
  {
   "id": "quran-story-yusuf-brothers",
   "title": "Yusuf and His Brothers",
   "cat": "bundles",
   "isNew": true,
   "desc": "Young Yusuf (AS) is thrown into the well by his jealous brothers, but Allah has a beautiful plan for him.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle II",
   "cover": "assets/books/yusuf-brothers.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-yusuf-brothers.webp"
   ],
   "group": "quran",
   "bundle": "bundle-ibrahim"
  },
  {
   "id": "quran-story-yusuf-kings-dream",
   "title": "Yusuf and the King’s Dream",
   "cat": "bundles",
   "isNew": true,
   "desc": "Yusuf (AS) explains the king’s dream, saves Egypt from famine and forgives his brothers.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle II",
   "cover": "assets/books/yusuf-kings-dream.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-yusuf-kings-dream.webp"
   ],
   "group": "quran",
   "bundle": "bundle-ibrahim"
  },
  {
   "id": "quran-story-ayub",
   "title": "Ayub’s Patience",
   "cat": "bundles",
   "isNew": true,
   "desc": "Ayub (AS) loses his health and wealth yet never stops thanking Allah: the best example of patience.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle III",
   "cover": "assets/books/ayub.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-ayub.webp"
   ],
   "group": "quran",
   "bundle": "bundle-trials"
  },
  {
   "id": "quran-story-shuaib",
   "title": "Shuaib and the People of Madyan",
   "cat": "bundles",
   "isNew": true,
   "desc": "Shuaib (AS) teaches the people of Madyan to be honest in trade and fair to everyone.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle III",
   "cover": "assets/books/shuaib.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-shuaib.webp"
   ],
   "group": "quran",
   "bundle": "bundle-trials"
  },
  {
   "id": "quran-story-moses-pharaoh",
   "title": "Moses and the Evil Pharaoh",
   "cat": "bundles",
   "isNew": true,
   "desc": "Musa (AS) stands up to the cruel Pharaoh, and Allah parts the sea to save the Children of Israel.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle III",
   "cover": "assets/books/moses-pharaoh.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-moses-pharaoh.webp"
   ],
   "group": "quran",
   "bundle": "bundle-trials"
  },
  {
   "id": "quran-story-moses-qaroon",
   "title": "Moses and the Miser Qaroon",
   "cat": "bundles",
   "isNew": true,
   "desc": "Qaroon boasts about his treasure and forgets Allah: a lesson about greed, gratitude and sharing.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle III",
   "cover": "assets/books/moses-qaroon.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-moses-qaroon.webp"
   ],
   "group": "quran",
   "bundle": "bundle-trials"
  },
  {
   "id": "quran-story-dawud",
   "title": "Dawud and King Talut",
   "cat": "bundles",
   "isNew": true,
   "desc": "Young Dawud (AS) faces the giant Jalut in King Talut’s army, trusting Allah instead of his own size.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle III",
   "cover": "assets/books/dawud.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-dawud.webp"
   ],
   "group": "quran",
   "bundle": "bundle-trials"
  },
  {
   "id": "quran-story-sulaiman",
   "title": "Sulaiman and the Hoopoe Bird",
   "cat": "bundles",
   "isNew": true,
   "desc": "Sulaiman (AS), who could speak to the birds, and the hoopoe that brought news of the Queen of Sheba.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle III",
   "cover": "assets/books/sulaiman.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-sulaiman.webp"
   ],
   "group": "quran",
   "bundle": "bundle-trials"
  },
  {
   "id": "quran-story-yunus",
   "title": "Yunus in the Whale’s Belly",
   "cat": "bundles",
   "isNew": true,
   "desc": "Yunus (AS) is swallowed by the whale and calls on Allah from the darkness with his famous dua.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle IV",
   "cover": "assets/books/yunus.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-yunus.webp"
   ],
   "group": "quran",
   "bundle": "bundle-light"
  },
  {
   "id": "quran-story-zakariyah",
   "title": "Life of Hazrat Zakariyah",
   "cat": "bundles",
   "isNew": true,
   "desc": "Zakariya (AS) makes dua for a child in his old age, and Allah answers with the gift of Yahya (AS).",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle IV",
   "cover": "assets/books/zakariyah.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-zakariyah.webp"
   ],
   "group": "quran",
   "bundle": "bundle-light"
  },
  {
   "id": "quran-story-yahya",
   "title": "Yahya and King Herod",
   "cat": "bundles",
   "isNew": true,
   "desc": "Yahya (AS), kind to his parents and brave in speaking the truth before King Herod.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle IV",
   "cover": "assets/books/yahya.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-yahya.webp"
   ],
   "group": "quran",
   "bundle": "bundle-light"
  },
  {
   "id": "quran-story-isa",
   "title": "Isa’s Miraculous Life",
   "cat": "bundles",
   "isNew": true,
   "desc": "The miraculous birth of Isa (AS) to Maryam, his miracles by Allah’s permission, and how Allah raised him up.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle IV",
   "cover": "assets/books/isa.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-isa.webp"
   ],
   "group": "quran",
   "bundle": "bundle-light"
  },
  {
   "id": "quran-story-companions-cave",
   "title": "Companions of the Cave",
   "cat": "bundles",
   "isNew": true,
   "desc": "Young believers flee to a cave to protect their faith, and Allah makes them sleep for over 300 years.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle IV",
   "cover": "assets/books/companions-cave.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-companions-cave.webp"
   ],
   "group": "quran",
   "bundle": "bundle-light"
  },
  {
   "id": "quran-story-muhammad",
   "title": "Life of Hazrat Muhammad ﷺ",
   "cat": "bundles",
   "isNew": true,
   "desc": "The life of the final Messenger ﷺ, from his birth in Makkah to the message of Islam, told simply for children.",
   "specs": "Illustrated storybook · Stories from the Holy Quran · from Bundle IV",
   "cover": "assets/books/muhammad.jpg",
   "options": [
    {
     "label": null,
     "price": 2.35
    }
   ],
   "gallery": [
    "assets/shop/gallery/book-muhammad.webp"
   ],
   "group": "quran",
   "bundle": "bundle-light"
  },
  {
   "id": "set-of-10-prophet-stories-for-children",
   "title": "Prophet Stories: Complete Set of 10",
   "cat": "bundles",
   "isNew": true,
   "desc": "All ten stories in one set, in order: Adam, Nuh, Salih, Ibrahim, Ismail, Yusuf, Musa, Sulaiman and Yunus (peace be upon them) and Muhammad ﷺ. Each illustrated book highlights a value like patience, gratitude or trust in Allah, with the prophet’s dua and fun facts.",
   "specs": "10 illustrated storybooks · Ages 4–8",
   "cover": "assets/shop/prophet-set-10.webp",
   "options": [
    {
     "label": null,
     "price": 50.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/prophet-set-10.webp",
    "assets/shop/gallery/set-of-10-prophet-stories-for-children-12.webp",
    "assets/shop/gallery/set-of-10-prophet-stories-for-children-14.webp"
   ],
   "includes": [
    {
     "title": "Prophet Adam (AS)",
     "cover": "assets/shop/prophet-adam.jpg",
     "hi": "assets/shop/gallery/prophet-adam-1.webp"
    },
    {
     "title": "Prophet Nuh (AS)",
     "cover": "assets/shop/prophet-nuh.jpg",
     "hi": "assets/shop/gallery/prophet-nuh-1.webp"
    },
    {
     "title": "Prophet Salih (AS)",
     "cover": "assets/shop/prophet-salih.jpg",
     "hi": "assets/shop/gallery/prophet-salih-1.webp"
    },
    {
     "title": "Prophet Ibrahim (AS)",
     "cover": "assets/shop/prophet-ibrahim.jpg",
     "hi": "assets/shop/gallery/prophet-ibrahim-1.webp"
    },
    {
     "title": "Prophet Ismail (AS)",
     "cover": "assets/shop/prophet-ismail.jpg",
     "hi": "assets/shop/gallery/prophet-ismail-1.webp"
    },
    {
     "title": "Prophet Yusuf (AS)",
     "cover": "assets/shop/prophet-yusuf.jpg",
     "hi": "assets/shop/gallery/prophet-yusuf-1.webp"
    },
    {
     "title": "Prophet Musa (AS)",
     "cover": "assets/shop/prophet-musa.jpg",
     "hi": "assets/shop/gallery/prophet-musa-1.webp"
    },
    {
     "title": "Prophet Sulaiman (AS)",
     "cover": "assets/shop/prophet-sulaiman.jpg",
     "hi": "assets/shop/gallery/prophet-sulaiman-1.webp"
    },
    {
     "title": "Prophet Yunus (AS)",
     "cover": "assets/shop/prophet-yunus.jpg",
     "hi": "assets/shop/gallery/prophet-yunus-1.webp"
    },
    {
     "title": "Prophet Muhammad ﷺ",
     "cover": "assets/shop/prophet-muhammad.jpg",
     "hi": "assets/shop/gallery/prophet-muhammad-1.webp"
    }
   ],
   "explore": true
  },
  {
   "id": "prophet-stories-set-1",
   "title": "Prophet Stories Set 1: Adam to Ismail",
   "cat": "bundles",
   "isNew": true,
   "desc": "The first five stories, in order: Adam, Nuh, Salih, Ibrahim and Ismail (peace be upon them). From the creation of humankind to the building of the Kaaba. Each book includes the prophet’s dua, names of Allah and fun facts.",
   "specs": "5 illustrated storybooks · Ages 4–8",
   "cover": "assets/shop/prophet-set-1.webp",
   "options": [
    {
     "label": null,
     "price": 30.0
    }
   ],
   "gallery": [
    "assets/shop/prophet-set-1.webp",
    "assets/shop/gallery/prophet-adam-1.webp",
    "assets/shop/gallery/prophet-nuh-1.webp",
    "assets/shop/gallery/prophet-salih-1.webp",
    "assets/shop/gallery/prophet-ibrahim-1.webp",
    "assets/shop/gallery/prophet-ismail-1.webp"
   ],
   "includes": [
    {
     "title": "Prophet Adam (AS)",
     "cover": "assets/shop/prophet-adam.jpg",
     "hi": "assets/shop/gallery/prophet-adam-1.webp"
    },
    {
     "title": "Prophet Nuh (AS)",
     "cover": "assets/shop/prophet-nuh.jpg",
     "hi": "assets/shop/gallery/prophet-nuh-1.webp"
    },
    {
     "title": "Prophet Salih (AS)",
     "cover": "assets/shop/prophet-salih.jpg",
     "hi": "assets/shop/gallery/prophet-salih-1.webp"
    },
    {
     "title": "Prophet Ibrahim (AS)",
     "cover": "assets/shop/prophet-ibrahim.jpg",
     "hi": "assets/shop/gallery/prophet-ibrahim-1.webp"
    },
    {
     "title": "Prophet Ismail (AS)",
     "cover": "assets/shop/prophet-ismail.jpg",
     "hi": "assets/shop/gallery/prophet-ismail-1.webp"
    }
   ],
   "explore": true
  },
  {
   "id": "prophet-stories-set-2",
   "title": "Prophet Stories Set 2: Yusuf to Muhammad ﷺ",
   "cat": "bundles",
   "isNew": true,
   "desc": "The next five stories, in order: Yusuf, Musa, Sulaiman and Yunus (peace be upon them), ending with the life of Prophet Muhammad ﷺ. Each book includes the prophet’s dua, names of Allah and fun facts.",
   "specs": "5 illustrated storybooks · Ages 4–8",
   "cover": "assets/shop/prophet-set-2.webp",
   "options": [
    {
     "label": null,
     "price": 30.0
    }
   ],
   "gallery": [
    "assets/shop/prophet-set-2.webp",
    "assets/shop/gallery/prophet-yusuf-1.webp",
    "assets/shop/gallery/prophet-musa-1.webp",
    "assets/shop/gallery/prophet-sulaiman-1.webp",
    "assets/shop/gallery/prophet-yunus-1.webp",
    "assets/shop/gallery/prophet-muhammad-1.webp"
   ],
   "includes": [
    {
     "title": "Prophet Yusuf (AS)",
     "cover": "assets/shop/prophet-yusuf.jpg",
     "hi": "assets/shop/gallery/prophet-yusuf-1.webp"
    },
    {
     "title": "Prophet Musa (AS)",
     "cover": "assets/shop/prophet-musa.jpg",
     "hi": "assets/shop/gallery/prophet-musa-1.webp"
    },
    {
     "title": "Prophet Sulaiman (AS)",
     "cover": "assets/shop/prophet-sulaiman.jpg",
     "hi": "assets/shop/gallery/prophet-sulaiman-1.webp"
    },
    {
     "title": "Prophet Yunus (AS)",
     "cover": "assets/shop/prophet-yunus.jpg",
     "hi": "assets/shop/gallery/prophet-yunus-1.webp"
    },
    {
     "title": "Prophet Muhammad ﷺ",
     "cover": "assets/shop/prophet-muhammad.jpg",
     "hi": "assets/shop/gallery/prophet-muhammad-1.webp"
    }
   ],
   "explore": true
  },
  {
   "id": "prophet-adam-story-book",
   "title": "Prophet Adam (AS)",
   "cat": "bundles",
   "isNew": true,
   "desc": "The story of Prophet Adam (AS), the first human and the first prophet: how Allah created him, taught him the names of all things and forgave him when he turned back to Him. A gentle first lesson in where we come from and how to say sorry to Allah.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-adam.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-adam-1.webp",
    "assets/shop/gallery/prophet-adam-2.webp",
    "assets/shop/gallery/prophet-adam-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "prophet-nuh-story-book",
   "title": "Prophet Nuh (AS)",
   "cat": "bundles",
   "isNew": true,
   "desc": "Prophet Nuh (AS) called his people to Allah for hundreds of years, then built the Ark when Allah commanded him. A story of patience, perseverance and trust in Allah, told simply for young readers.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-nuh.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-nuh-1.webp",
    "assets/shop/gallery/prophet-nuh-2.webp",
    "assets/shop/gallery/prophet-nuh-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "prophet-salih-story-book",
   "title": "Prophet Salih (AS)",
   "cat": "bundles",
   "isNew": true,
   "desc": "Prophet Salih (AS) was sent to the people of Thamud, who carved their homes into the mountains. Children learn about the she-camel, a sign from Allah, and why gratitude and obedience matter.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-salih.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-salih-1.webp",
    "assets/shop/gallery/prophet-salih-2.webp",
    "assets/shop/gallery/prophet-salih-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "prophet-ibrahim-story-book",
   "title": "Prophet Ibrahim (AS)",
   "cat": "bundles",
   "isNew": true,
   "desc": "Prophet Ibrahim (AS) searched for the truth, stood up to idol worship and was kept safe in the fire by Allah. A brave, beautiful story of faith and courage.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-ibrahim.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-ibrahim-1.webp",
    "assets/shop/gallery/prophet-ibrahim-2.webp",
    "assets/shop/gallery/prophet-ibrahim-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "prophet-ismail-story-book",
   "title": "Prophet Ismail (AS)",
   "cat": "bundles",
   "isNew": true,
   "desc": "Prophet Ismail (AS), the obedient son of Ibrahim (AS): the gift of Zamzam, the great test of sacrifice, and building the Kaaba with his father. A story of devotion, patience and family.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-ismail.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-ismail-1.webp",
    "assets/shop/gallery/prophet-ismail-2.webp",
    "assets/shop/gallery/prophet-ismail-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "prophet-yusuf-story-book",
   "title": "Prophet Yusuf (AS)",
   "cat": "bundles",
   "isNew": true,
   "desc": "From the bottom of a well to the palace of Egypt: the story of Prophet Yusuf (AS), his brothers and his dreams. Children learn about patience, honesty and forgiveness, and that Allah’s plan is always best.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-yusuf.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-yusuf-1.webp",
    "assets/shop/gallery/prophet-yusuf-2.webp",
    "assets/shop/gallery/prophet-yusuf-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "prophet-musa-story-book",
   "title": "Prophet Musa (AS)",
   "cat": "bundles",
   "isNew": true,
   "desc": "Protected by Allah as a baby on the river, Prophet Musa (AS) grew up to stand before Pharaoh and lead his people to freedom. A story of courage and complete trust in Allah.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-musa.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-musa-1.webp",
    "assets/shop/gallery/prophet-musa-2.webp",
    "assets/shop/gallery/prophet-musa-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "prophet-sulaiman-story-book",
   "title": "Prophet Sulaiman (AS)",
   "cat": "bundles",
   "isNew": true,
   "desc": "Prophet Sulaiman (AS) was given wisdom, a great kingdom and the gift of understanding animals, from the ants to the hoopoe bird. A story about justice and being thankful for Allah’s blessings.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-sulaiman.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-sulaiman-1.webp",
    "assets/shop/gallery/prophet-sulaiman-2.webp",
    "assets/shop/gallery/prophet-sulaiman-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "prophet-yunus-story-book",
   "title": "Prophet Yunus (AS)",
   "cat": "bundles",
   "isNew": true,
   "desc": "Prophet Yunus (AS) in the belly of the great fish, and the dua that saved him. Children learn that Allah always hears us when we turn to Him and ask for forgiveness.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-yunus.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-yunus-1.webp",
    "assets/shop/gallery/prophet-yunus-2.webp",
    "assets/shop/gallery/prophet-yunus-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "prophet-muhammad-story-book",
   "title": "Prophet Muhammad ﷺ",
   "cat": "bundles",
   "isNew": true,
   "desc": "The life of our beloved Prophet Muhammad ﷺ, the final Messenger: his kindness, honesty and love for others, from Makkah to Madinah. A first Seerah that helps children love and follow the Sunnah.",
   "specs": "Illustrated storybook · Ages 4–8 · Includes the prophet’s dua, names of Allah and fun facts",
   "cover": "assets/shop/prophet-muhammad.jpg",
   "options": [
    {
     "label": null,
     "price": 6.95
    }
   ],
   "gallery": [
    "assets/shop/gallery/prophet-muhammad-1.webp",
    "assets/shop/gallery/prophet-muhammad-2.webp",
    "assets/shop/gallery/prophet-muhammad-3.webp"
   ],
   "group": "heroes"
  },
  {
   "id": "asma-ul-husna-series",
   "title": "I Love Allah: Asma-ul-Husna Series (Set of 5)",
   "cat": "bundles",
   "isNew": false,
   "desc": "Five short storybooks, each introducing one of Allah’s beautiful names: Al-Baseer, Ar-Razzaq, Al-Musawwir, Al-Khaliq and As-Samee.",
   "specs": "5 books · 8 pages each · 7×9 in",
   "cover": "assets/shop/asma-ul-husna-series.jpg",
   "options": [
    {
     "label": null,
     "price": 18.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/asma-ul-husna-series-1.webp",
    "assets/shop/gallery/asma-ul-husna-series-3.webp",
    "assets/shop/gallery/asma-ul-husna-series-4.webp"
   ]
  },
  {
   "id": "seerat-un-nabi-for-children-urdu",
   "title": "Seerat-un-Nabi ﷺ for Children (Urdu)",
   "cat": "story",
   "isNew": true,
   "desc": "The life of Prophet Muhammad ﷺ in simple Urdu, with illustrations. 23 chapters take children from Arabia before Islam, the blessed birth and early life, through prophethood and Madinah, to the Prophet ﷺ as the best example for all humanity, his family and his Companions. By Dr. Abdur Rauf.",
   "specs": "Urdu · 216 pages · Illustrated",
   "cover": "assets/shop/seerat-un-nabi-for-children-urdu.jpg",
   "options": [
    {
     "label": null,
     "price": 12.0
    }
   ],
   "gallery": [
    "assets/shop/gallery/seerat-un-nabi-for-children-urdu-1.webp",
    "assets/shop/gallery/seerat-un-nabi-for-children-urdu-2.webp",
    "assets/shop/gallery/seerat-un-nabi-for-children-urdu-3.webp"
   ]
  },
  {
   "id": "hazrat-abu-bakr-siddiq-for-children-urdu",
   "title": "Hazrat Abu Bakr Siddiq (RA) for Children (Urdu)",
   "cat": "story",
   "isNew": true,
   "desc": "The life of the first Caliph in easy words and simple Urdu, with illustrations: his family and early life, his honour and virtues, his caliphate, his generosity, courage and simple way of living. By Zakia Jahangir.",
   "specs": "Urdu · 152 pages · Illustrated",
   "cover": "assets/shop/hazrat-abu-bakr-siddiq-for-children-urdu.jpg",
   "options": [
    {
     "label": null,
     "price": 10.0
    }
   ],
   "gallery": [
    "assets/shop/gallery/hazrat-abu-bakr-siddiq-for-children-urdu-1.webp",
    "assets/shop/gallery/hazrat-abu-bakr-siddiq-for-children-urdu-2.webp",
    "assets/shop/gallery/hazrat-abu-bakr-siddiq-for-children-urdu-3.webp"
   ]
  },
  {
   "id": "hazrat-umar-farooq-for-children-urdu",
   "title": "Hazrat Umar Farooq (RA) for Children (Urdu)",
   "cat": "story",
   "isNew": true,
   "desc": "The life of the second Caliph in easy words and simple Urdu, with illustrations: his family and youth, his caliphate, his famous justice and care for the people, his simple life and the sayings of the Prophet ﷺ about him. By Zakia Jahangir.",
   "specs": "Urdu · 175 pages · Illustrated",
   "cover": "assets/shop/hazrat-umar-farooq-for-children-urdu.jpg",
   "options": [
    {
     "label": null,
     "price": 10.0
    }
   ],
   "gallery": [
    "assets/shop/gallery/hazrat-umar-farooq-for-children-urdu-1.webp",
    "assets/shop/gallery/hazrat-umar-farooq-for-children-urdu-2.webp",
    "assets/shop/gallery/hazrat-umar-farooq-for-children-urdu-3.webp"
   ]
  },
  {
   "id": "asaan-namaz-for-children-urdu",
   "title": "Asaan Namaz: Easy Salah for Children (Urdu)",
   "cat": "story",
   "isNew": true,
   "desc": "A simple guide to learning Salah in Urdu, with pictures: the benefits of prayer, the names and times of the five prayers, adhan and iqamah, wudu and how to pray step by step. The Arabic words are given with easy Urdu translation, plus Jumu’ah, Tarawih, Eid, Tahajjud and Janazah prayers and a short glossary. By Dr. Abdur Rauf.",
   "specs": "Urdu · 66 pages · Illustrated",
   "cover": "assets/shop/asaan-namaz-for-children-urdu.jpg",
   "options": [
    {
     "label": null,
     "price": 8.0
    }
   ],
   "gallery": [
    "assets/shop/gallery/asaan-namaz-for-children-urdu-1.webp",
    "assets/shop/gallery/asaan-namaz-for-children-urdu-2.webp",
    "assets/shop/gallery/asaan-namaz-for-children-urdu-3.webp"
   ]
  },
  {
   "id": "asaan-qurani-kahaniyan-for-children-urdu",
   "title": "Asaan Qurani Kahaniyan: Quran Stories for Children (Urdu)",
   "cat": "story",
   "isNew": true,
   "desc": "Stories from the Holy Quran told as exciting tales in simple Urdu, with illustrations. 20 chapters, from the sons of Adam (AS) and the Ark of Nuh (AS) to stories from the time of Prophet Muhammad ﷺ, including the Hijrah and the Battle of Badr. A lovely way to bring Quranic teachings to life for children and adults. By Dr. Abdur Rauf.",
   "specs": "Urdu · 130 pages · Illustrated",
   "cover": "assets/shop/asaan-qurani-kahaniyan-for-children-urdu.jpg",
   "options": [
    {
     "label": null,
     "price": 10.0
    }
   ],
   "gallery": [
    "assets/shop/gallery/asaan-qurani-kahaniyan-for-children-urdu-1.webp",
    "assets/shop/gallery/asaan-qurani-kahaniyan-for-children-urdu-2.webp",
    "assets/shop/gallery/asaan-qurani-kahaniyan-for-children-urdu-3.webp"
   ]
  },
  {
   "id": "khulafa-e-rashideen-ki-kahaniyan-for-children-urdu",
   "title": "Khulafa-e-Rashideen ki Kahaniyan: Stories of the Four Caliphs (Urdu)",
   "cat": "story",
   "isNew": true,
   "desc": "Twenty true stories from the lives of the four Rightly Guided Caliphs, Abu Bakr, Umar, Uthman and Ali (may Allah be pleased with them), in simple Urdu with illustrations. From the Cave of Thawr to Ali’s (RA) famous case before the judge, each story teaches a lesson for life. By Dr. Abdur Rauf.",
   "specs": "Urdu · 122 pages · Illustrated",
   "cover": "assets/shop/khulafa-e-rashideen-ki-kahaniyan-for-children-urdu.jpg",
   "options": [
    {
     "label": null,
     "price": 10.0
    }
   ],
   "gallery": [
    "assets/shop/gallery/khulafa-e-rashideen-ki-kahaniyan-for-children-urdu-1.webp",
    "assets/shop/gallery/khulafa-e-rashideen-ki-kahaniyan-for-children-urdu-2.webp",
    "assets/shop/gallery/khulafa-e-rashideen-ki-kahaniyan-for-children-urdu-3.webp"
   ]
  },
  {
   "id": "asaan-islami-duain-urdu",
   "title": "Asaan Islami Duain: Everyday Duas (Urdu)",
   "cat": "story",
   "isNew": true,
   "desc": "A well-organised collection of short, authentic duas from the Quran and Hadith for every part of life, with an Urdu introduction to the manners and best times of dua. Duas for a good life, good character, patience, travel, parents, love of Allah and His Messenger ﷺ and much more. For children and the whole family. By Dr. Abdur Rauf.",
   "specs": "Urdu · Illustrated cover",
   "cover": "assets/shop/asaan-islami-duain-urdu.jpg",
   "options": [
    {
     "label": null,
     "price": 8.0
    }
   ],
   "gallery": [
    "assets/shop/gallery/asaan-islami-duain-urdu-1.webp",
    "assets/shop/gallery/asaan-islami-duain-urdu-2.webp",
    "assets/shop/gallery/asaan-islami-duain-urdu-3.webp"
   ]
  },
  {
   "id": "asaan-kahaniyan-moral-stories-for-children-urdu",
   "title": "Asaan Kahaniyan: Moral Stories for Children (Urdu)",
   "cat": "story",
   "isNew": true,
   "desc": "Thirteen short, fun stories in simple Urdu, adapted from Aesop’s Fables, each with a clear lesson about good and bad behaviour: the greedy dog, the two thirsty crows, the stork and the fox and more. Illustrated, and ideal for young readers. By Dr. Abdur Rauf.",
   "specs": "Urdu · Illustrated",
   "cover": "assets/shop/asaan-kahaniyan-moral-stories-for-children-urdu.jpg",
   "options": [
    {
     "label": null,
     "price": 8.0
    }
   ],
   "gallery": [
    "assets/shop/gallery/asaan-kahaniyan-moral-stories-for-children-urdu-1.webp",
    "assets/shop/gallery/asaan-kahaniyan-moral-stories-for-children-urdu-2.webp",
    "assets/shop/gallery/asaan-kahaniyan-moral-stories-for-children-urdu-3.webp"
   ]
  },
  {
   "id": "our-ummah-across-continents",
   "title": "Our Ummah Across Continents",
   "cat": "story",
   "isNew": true,
   "desc": "A pop-up journey across all seven continents. Children meet Muslim communities around the world, find famous landmarks and pieces of Islamic heritage, and see just how big and beautiful the Ummah is.",
   "specs": "Pop-up book",
   "cover": "assets/shop/our-ummah-across-continents.jpg",
   "options": [
    {
     "label": null,
     "price": 14.3,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/our-ummah-across-continents-1.webp",
    "assets/shop/gallery/our-ummah-across-continents-3.webp",
    "assets/shop/gallery/our-ummah-across-continents-5.webp"
   ]
  },
  {
   "id": "its-sadaqah-faceless-islamic-picture-book-for-kids",
   "title": "It’s Sadaqah!",
   "cat": "story",
   "isNew": true,
   "desc": "A large, faceless picture book showing children the many ways to give, from a smile to a helping hand to sharing what we have. A gentle first lesson in generosity.",
   "specs": "Large-format picture book",
   "cover": "assets/shop/its-sadaqah-faceless-islamic-picture-book-for-kids.jpg",
   "options": [
    {
     "label": null,
     "price": 11.95,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/its-sadaqah-faceless-islamic-picture-book-for-kids-1.webp",
    "assets/shop/gallery/its-sadaqah-faceless-islamic-picture-book-for-kids-2.webp",
    "assets/shop/gallery/its-sadaqah-faceless-islamic-picture-book-for-kids-3.webp"
   ]
  },
  {
   "id": "eid-on-a-giant-glider",
   "title": "Eid on a Giant Glider",
   "cat": "story",
   "isNew": true,
   "desc": "An Eid al-Adha story that takes to the skies: a colourful adventure to read together as the days of Eid draw near.",
   "specs": "28 pages · 7×9 in · Ages 7–13",
   "cover": "assets/shop/eid-on-a-giant-glider.jpg",
   "options": [
    {
     "label": null,
     "price": 10.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/eid-on-a-giant-glider-1.webp",
    "assets/shop/gallery/eid-on-a-giant-glider-2.webp",
    "assets/shop/gallery/eid-on-a-giant-glider-3.webp"
   ]
  },
  {
   "id": "i-say-bismillah-sunnah-foods",
   "title": "I Say Bismillah: Sunnah Foods",
   "cat": "baby",
   "isNew": false,
   "desc": "A soft, high-contrast crinkle cloth book showing Sunnah foods and the habit of saying Bismillah before eating. Safe for tiny hands and lovely for tummy time.",
   "specs": "Crinkle cloth book · 8 pages · 5×5 in · 0–12 months",
   "cover": "assets/shop/i-say-bismillah-sunnah-foods.jpg",
   "options": [
    {
     "label": null,
     "price": 7.8,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/i-say-bismillah-sunnah-foods-1.webp",
    "assets/shop/gallery/i-say-bismillah-sunnah-foods-3.webp",
    "assets/shop/gallery/i-say-bismillah-sunnah-foods-5.webp"
   ]
  },
  {
   "id": "the-world-around-me-from-the-quran",
   "title": "The World Around Me… from the Quran",
   "cat": "baby",
   "isNew": false,
   "desc": "A bilingual cloth book with bold black-and-white patterns and bright colour accents to hold a newborn’s attention, while introducing the world Allah created.",
   "specs": "Cloth book · 8 pages · 5×5 in · 0–1 year",
   "cover": "assets/shop/the-world-around-me-from-the-quran.jpg",
   "options": [
    {
     "label": null,
     "price": 7.8,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/the-world-around-me-from-the-quran-1.webp",
    "assets/shop/gallery/the-world-around-me-from-the-quran-2.webp",
    "assets/shop/gallery/the-world-around-me-from-the-quran-5.webp"
   ]
  },
  {
   "id": "allah-made-the-world-around-me-board-book-touch-and-feel",
   "title": "Allah Made the World Around Me",
   "cat": "baby",
   "isNew": false,
   "desc": "A bilingual Arabic and English touch-and-feel board book. Little fingers explore different textures while learning that Allah made everything around them.",
   "specs": "Touch-and-feel board book · Arabic & English",
   "cover": "assets/shop/allah-made-the-world-around-me-board-book-touch-and-feel.jpg",
   "options": [
    {
     "label": null,
     "price": 7.8,
     "stock": 2
    }
   ],
   "gallery": [
    "assets/shop/gallery/allah-made-the-world-around-me-board-book-touch-and-feel-1.webp",
    "assets/shop/gallery/allah-made-the-world-around-me-board-book-touch-and-feel-2.webp",
    "assets/shop/gallery/allah-made-the-world-around-me-board-book-touch-and-feel-3.webp"
   ]
  },
  {
   "id": "i-am-my-first-book-of-postive-affirmations-mirror-book",
   "title": "I Am: My First Book of Positive Affirmations",
   "cat": "baby",
   "isNew": false,
   "desc": "Cheerful affirmations rooted in Islamic values, such as “I am loved” and “I am kind”, with a mirror so babies and toddlers can see who the words are about.",
   "specs": "Mirror board book · 18 pages · 7.5×7.5 in",
   "cover": "assets/shop/i-am-my-first-book-of-postive-affirmations-mirror-book.jpg",
   "options": [
    {
     "label": null,
     "price": 9.6,
     "stock": 2
    }
   ],
   "gallery": [
    "assets/shop/gallery/i-am-my-first-book-of-postive-affirmations-mirror-book-1.webp",
    "assets/shop/gallery/i-am-my-first-book-of-postive-affirmations-mirror-book-2.webp",
    "assets/shop/gallery/i-am-my-first-book-of-postive-affirmations-mirror-book-3.webp"
   ]
  },
  {
   "id": "five-senses-five-blessings-board-book",
   "title": "Five Senses, Five Blessings",
   "cat": "baby",
   "isNew": false,
   "desc": "Simple rhymes and bright pictures help toddlers see their eyes, ears, nose, tongue and hands as gifts from Allah, and say thank you for each one.",
   "specs": "Board book",
   "cover": "assets/shop/five-senses-five-blessings-board-book.jpg",
   "options": [
    {
     "label": null,
     "price": 8.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/five-senses-five-blessings-board-book-1.webp",
    "assets/shop/gallery/five-senses-five-blessings-board-book-2.webp",
    "assets/shop/gallery/five-senses-five-blessings-board-book-5.webp"
   ]
  },
  {
   "id": "my-dada-and-dadi-love-me",
   "title": "My Dada and Dadi Love Me",
   "cat": "baby",
   "isNew": false,
   "desc": "A warm celebration of the special bond between children and their paternal grandparents. The book closes with a dua from the Quran.",
   "specs": "Board book · 16 pages · 6×6 in",
   "cover": "assets/shop/my-dada-and-dadi-love-me.jpg",
   "options": [
    {
     "label": null,
     "price": 8.4,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/my-dada-and-dadi-love-me-1.webp",
    "assets/shop/gallery/my-dada-and-dadi-love-me-2.webp",
    "assets/shop/gallery/my-dada-and-dadi-love-me-3.webp"
   ]
  },
  {
   "id": "my-nana-and-nani-love-me-board-book",
   "title": "My Nana and Nani Love Me",
   "cat": "baby",
   "isNew": false,
   "desc": "A warm celebration of the special bond between children and their maternal grandparents. The book closes with a dua from the Quran.",
   "specs": "Board book · 16 pages · 6×6 in",
   "cover": "assets/shop/my-nana-and-nani-love-me-board-book.jpg",
   "options": [
    {
     "label": null,
     "price": 8.4,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/my-nana-and-nani-love-me-board-book-1.webp",
    "assets/shop/gallery/my-nana-and-nani-love-me-board-book-2.webp",
    "assets/shop/gallery/my-nana-and-nani-love-me-board-book-3.webp"
   ]
  },
  {
   "id": "what-is-that-loud-noise-children-board-book",
   "title": "What Is That Loud Noise?",
   "cat": "baby",
   "isNew": false,
   "desc": "A funny board book that teaches little ones to remember Allah whenever something frightens them. One they’ll ask for again and again.",
   "specs": "Board book · 20 pages",
   "cover": "assets/shop/what-is-that-loud-noise-children-board-book.jpg",
   "options": [
    {
     "label": null,
     "price": 9.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/what-is-that-loud-noise-children-board-book-1.webp"
   ]
  },
  {
   "id": "what-is-in-the-box-islamic-board-book",
   "title": "What Is in the Box?",
   "cat": "baby",
   "isNew": false,
   "desc": "A mysterious box arrives, and with it curiosity, excitement and joy. A gentle story showing that real happiness comes from appreciating Allah’s blessings.",
   "specs": "Board book",
   "cover": "assets/shop/what-is-in-the-box-islamic-board-book.jpg",
   "options": [
    {
     "label": null,
     "price": 9.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/what-is-in-the-box-islamic-board-book-1.webp",
    "assets/shop/gallery/what-is-in-the-box-islamic-board-book-2.webp",
    "assets/shop/gallery/what-is-in-the-box-islamic-board-book-3.webp"
   ]
  },
  {
   "id": "it-is-sunnah-to-say-so",
   "title": "It’s Sunnah to Say So",
   "cat": "baby",
   "isNew": false,
   "desc": "Follow Zahra through her day and learn seven everyday Sunnah sayings. Each answer hides under a flap, so children love to guess before they peek.",
   "specs": "Lift-the-flap book",
   "cover": "assets/shop/it-is-sunnah-to-say-so.jpg",
   "options": [
    {
     "label": null,
     "price": 9.6,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/it-is-sunnah-to-say-so-1.webp",
    "assets/shop/gallery/it-is-sunnah-to-say-so-2.webp",
    "assets/shop/gallery/it-is-sunnah-to-say-so-3.webp"
   ]
  },
  {
   "id": "gift-of-salah-a-lift-the-flap-book",
   "title": "Gift of Salah",
   "cat": "baby",
   "isNew": false,
   "desc": "A lift-the-flap board book about the five daily prayers, and how Salah was given to the Prophet ﷺ as a gift on the night of Al-Mi’raj.",
   "specs": "Lift-the-flap board book",
   "cover": "assets/shop/gift-of-salah-a-lift-the-flap-book.jpg",
   "options": [
    {
     "label": null,
     "price": 9.6,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/gift-of-salah-a-lift-the-flap-book-1.webp",
    "assets/shop/gallery/gift-of-salah-a-lift-the-flap-book-4.webp",
    "assets/shop/gallery/gift-of-salah-a-lift-the-flap-book-5.webp"
   ]
  },
  {
   "id": "my-aqeedah-bilingual-board-book-english-and-arabic",
   "title": "My Aqeedah",
   "cat": "baby",
   "isNew": false,
   "desc": "Five first questions of faith, such as who is my Lord and who is my Prophet, answered in simple Arabic and English for toddlers.",
   "specs": "Bilingual board book · Arabic & English",
   "cover": "assets/shop/my-aqeedah-bilingual-board-book-english-and-arabic.jpg",
   "options": [
    {
     "label": null,
     "price": 7.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/my-aqeedah-bilingual-board-book-english-and-arabic-1.webp",
    "assets/shop/gallery/my-aqeedah-bilingual-board-book-english-and-arabic-2.webp",
    "assets/shop/gallery/my-aqeedah-bilingual-board-book-english-and-arabic-3.webp"
   ]
  },
  {
   "id": "why-are-my-cheeks-red-story-book-on-anger",
   "title": "Why Are My Cheeks Red?",
   "cat": "story",
   "isNew": false,
   "desc": "A funny story about anger, and how to cool down the Sunnah way. A favourite for reading together again and again.",
   "specs": "Paperback · 18 pages",
   "cover": "assets/shop/why-are-my-cheeks-red-story-book-on-anger.jpg",
   "options": [
    {
     "label": null,
     "price": 9.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/why-are-my-cheeks-red-story-book-on-anger-1.webp",
    "assets/shop/gallery/why-are-my-cheeks-red-story-book-on-anger-2.webp",
    "assets/shop/gallery/why-are-my-cheeks-red-story-book-on-anger-3.webp"
   ]
  },
  {
   "id": "my-emotions-connect-me-to-allah",
   "title": "My Emotions Connect Me to Allah",
   "cat": "story",
   "isNew": false,
   "desc": "Twelve everyday feelings, each paired with a name of Allah to remember. Relatable pictures help children understand their emotions and handle them well.",
   "specs": "24 pages · 8×8 in · Ages 4–8",
   "cover": "assets/shop/my-emotions-connect-me-to-allah.jpg",
   "options": [
    {
     "label": null,
     "price": 8.49,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/my-emotions-connect-me-to-allah-1.webp",
    "assets/shop/gallery/my-emotions-connect-me-to-allah-4.webp",
    "assets/shop/gallery/my-emotions-connect-me-to-allah-9.webp"
   ]
  },
  {
   "id": "what-i-say-to-feel-okay",
   "title": "What I Say to Feel Okay",
   "cat": "story",
   "isNew": false,
   "desc": "A catchy rhyme that teaches eight short duas and words of dhikr for hard moments, helping children turn to Allah and be kind to themselves when things go wrong.",
   "specs": "Ages 4–8",
   "cover": "assets/shop/what-i-say-to-feel-okay.jpg",
   "options": [
    {
     "label": null,
     "price": 6.99,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/what-i-say-to-feel-okay-1.webp",
    "assets/shop/gallery/what-i-say-to-feel-okay-2.webp",
    "assets/shop/gallery/what-i-say-to-feel-okay-5.webp"
   ]
  },
  {
   "id": "why-are-my-feelings-so-big-islamic-kids-book",
   "title": "Why Are My Feelings So Big?",
   "cat": "story",
   "isNew": false,
   "desc": "When sadness, worry, jealousy and loneliness get tangled up, two characters, Waswas and Khair, help children name what they feel and choose a better response.",
   "specs": "Picture book",
   "cover": "assets/shop/why-are-my-feelings-so-big-islamic-kids-book.jpg",
   "options": [
    {
     "label": null,
     "price": 9.6,
     "stock": 3
    }
   ],
   "gallery": [
    "assets/shop/gallery/why-are-my-feelings-so-big-islamic-kids-book-1.webp",
    "assets/shop/gallery/why-are-my-feelings-so-big-islamic-kids-book-3.webp",
    "assets/shop/gallery/why-are-my-feelings-so-big-islamic-kids-book-7.webp"
   ]
  },
  {
   "id": "did-you-know-incredible-muslim-inventions",
   "title": "Did You Know? Incredible Muslim Inventions",
   "cat": "story",
   "isNew": false,
   "desc": "A trip back to the Muslim Golden Age, showing inventions and discoveries by Muslim scholars that still shape the world today.",
   "specs": "36 pages",
   "cover": "assets/shop/did-you-know-incredible-muslim-inventions.jpg",
   "options": [
    {
     "label": null,
     "price": 9.5,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/did-you-know-incredible-muslim-inventions-1.webp",
    "assets/shop/gallery/did-you-know-incredible-muslim-inventions-2.webp",
    "assets/shop/gallery/did-you-know-incredible-muslim-inventions-4.webp"
   ]
  },
  {
   "id": "tiny-tummies-big-benefits",
   "title": "Tiny Tummies, Big Benefits",
   "cat": "story",
   "isNew": false,
   "desc": "Dates, honey and more: a fun look at Sunnah foods and the science of why they’re good for us. Written by Rimsha Irfan, illustrated by Hafsa Salam.",
   "specs": "32 pages",
   "cover": "assets/shop/tiny-tummies-big-benefits.jpg",
   "options": [
    {
     "label": null,
     "price": 9.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/tiny-tummies-big-benefits-1.webp",
    "assets/shop/gallery/tiny-tummies-big-benefits-2.webp",
    "assets/shop/gallery/tiny-tummies-big-benefits-4.webp"
   ]
  },
  {
   "id": "a-scarf-for-noor-children-storybook",
   "title": "A Scarf for Noor",
   "cat": "story",
   "isNew": false,
   "desc": "Noor loves her grandmother’s colourful scarves, and through them she discovers that wearing a scarf can be an act of love for Allah.",
   "specs": "18 pages · 8×10 in · Ages 4–7",
   "cover": "assets/shop/a-scarf-for-noor-children-storybook.jpg",
   "options": [
    {
     "label": null,
     "price": 9.6,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/a-scarf-for-noor-children-storybook-1.webp",
    "assets/shop/gallery/a-scarf-for-noor-children-storybook-2.webp",
    "assets/shop/gallery/a-scarf-for-noor-children-storybook-4.webp"
   ]
  },
  {
   "id": "fasting-or-feasting",
   "title": "Suhaib & Safiya in Ramadan: Fasting or Feasting?",
   "cat": "story",
   "isNew": false,
   "desc": "Suhaib loves Suhoor and Iftar a little too much, and overeating leaves him sleepy. With his family’s help he discovers what Ramadan is really for.",
   "specs": "24 pages · 8×10 in",
   "cover": "assets/shop/fasting-or-feasting.jpg",
   "options": [
    {
     "label": null,
     "price": 9.6,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/fasting-or-feasting-1.webp",
    "assets/shop/gallery/fasting-or-feasting-2.webp",
    "assets/shop/gallery/fasting-or-feasting-4.webp"
   ]
  },
  {
   "id": "eid-catastrophe",
   "title": "Eid Cat-astrophe",
   "cat": "story",
   "isNew": false,
   "desc": "The night before Eid, Ruqayya finally gets her kitten, but mischievous Rani nearly ruins everything. A funny story about holding on to sabr and shukr.",
   "specs": "24 pages · 8×11 in",
   "cover": "assets/shop/eid-catastrophe.jpg",
   "options": [
    {
     "label": null,
     "price": 9.49,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/eid-catastrophe-1.webp",
    "assets/shop/gallery/eid-catastrophe-2.webp",
    "assets/shop/gallery/eid-catastrophe-5.webp"
   ]
  },
  {
   "id": "manha-khan-is-not-a-troublemaker",
   "title": "Manha Khan Is Not a Troublemaker",
   "cat": "story",
   "isNew": false,
   "desc": "The first Manha Khan novella: a spirited, curious girl whose big personality lands her in funny situations, learning patience and good character along the way.",
   "specs": "Chapter book",
   "cover": "assets/shop/manha-khan-is-not-a-troublemaker.jpg",
   "options": [
    {
     "label": null,
     "price": 9.79,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/manha-khan-is-not-a-troublemaker-1.webp",
    "assets/shop/gallery/manha-khan-is-not-a-troublemaker-3.webp",
    "assets/shop/gallery/manha-khan-is-not-a-troublemaker-4.webp"
   ]
  },
  {
   "id": "manha-khan-hikes-in-the-himalayas",
   "title": "Manha Khan Hikes in the Himalayas",
   "cat": "story",
   "isNew": false,
   "desc": "Book two of the Manha Khan series. Is Manha responsible enough to care for her pet Huraira on a hike into the Himalayas? A great holiday read.",
   "specs": "Chapter book · 80 pages · 5×7.5 in",
   "cover": "assets/shop/manha-khan-hikes-in-the-himalayas.jpg",
   "options": [
    {
     "label": null,
     "price": 9.49,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/manha-khan-hikes-in-the-himalayas-1.webp",
    "assets/shop/gallery/manha-khan-hikes-in-the-himalayas-3.webp",
    "assets/shop/gallery/manha-khan-hikes-in-the-himalayas-4.webp"
   ]
  },
  {
   "id": "more-than-a-scarf",
   "title": "More Than a Scarf: A Hijab Journal",
   "cat": "story",
   "isNew": false,
   "desc": "A journal for girls that mixes story with guided reflection pages, helping them explore what hijab means beyond clothing and grow confident in who they are.",
   "specs": "Journal",
   "cover": "assets/shop/more-than-a-scarf.jpg",
   "options": [
    {
     "label": null,
     "price": 6.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/more-than-a-scarf-1.webp",
    "assets/shop/gallery/more-than-a-scarf-2.webp",
    "assets/shop/gallery/more-than-a-scarf-7.webp"
   ]
  },
  {
   "id": "my-first-islamic-wipe-and-clean-activity-book",
   "title": "My First Islamic Wipe-Clean Book",
   "cat": "activity",
   "isNew": false,
   "desc": "Trace, count and draw through the Six Articles of Faith and the Five Pillars of Islam, then wipe it clean and start again.",
   "specs": "A4 · 18 pages · Ages 3–7",
   "cover": "assets/shop/my-first-islamic-wipe-and-clean-activity-book.jpg",
   "options": [
    {
     "label": null,
     "price": 9.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/my-first-islamic-wipe-and-clean-activity-book-1.webp",
    "assets/shop/gallery/my-first-islamic-wipe-and-clean-activity-book-2.webp",
    "assets/shop/gallery/my-first-islamic-wipe-and-clean-activity-book-3.webp"
   ]
  },
  {
   "id": "50-awesome-islamic-puzzles-book-activity-book",
   "title": "50 Awesome Islamic Puzzles",
   "cat": "activity",
   "isNew": false,
   "desc": "Fifty brain-teasers that keep children busy while they learn Islamic concepts along the way.",
   "specs": "52 pages · Ages 7–13",
   "cover": "assets/shop/50-awesome-islamic-puzzles-book-activity-book.jpg",
   "options": [
    {
     "label": null,
     "price": 4.8,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/50-awesome-islamic-puzzles-book-activity-book-1.webp",
    "assets/shop/gallery/50-awesome-islamic-puzzles-book-activity-book-2.webp",
    "assets/shop/gallery/50-awesome-islamic-puzzles-book-activity-book-4.webp"
   ]
  },
  {
   "id": "dua-quest-cards",
   "title": "Dua Quest Cards",
   "cat": "activity",
   "isNew": false,
   "desc": "A card game that teaches 24 duas through 150 questions, and builds English skills too.",
   "specs": "56 cards · 8×3.5 in",
   "cover": "assets/shop/dua-quest-cards.jpg",
   "options": [
    {
     "label": null,
     "price": 9.6,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/dua-quest-cards-1.webp",
    "assets/shop/gallery/dua-quest-cards-3.webp",
    "assets/shop/gallery/dua-quest-cards-7.webp"
   ]
  },
  {
   "id": "quiz-bundle-seerah-hadith-sahabah-sahabiyat-quiz-cards",
   "title": "Quiz Cards: Seerah, Hadith, Sahabah & Sahabiyat",
   "cat": "activity",
   "isNew": false,
   "desc": "Four quiz decks about the Prophet ﷺ and the people around him. Choose a single deck or take all four together.",
   "specs": "Quiz card decks",
   "cover": "assets/shop/quiz-bundle-seerah-hadith-sahabah-sahabiyat-quiz-cards.jpg",
   "options": [
    {
     "label": "Bundle of 4",
     "price": 21.5
    },
    {
     "label": "Sahabah deck",
     "price": 6.6,
     "stock": 5
    },
    {
     "label": "Sahabiyat deck",
     "price": 6.6,
     "stock": 5
    },
    {
     "label": "Seerah deck",
     "price": 6.6,
     "stock": 5
    },
    {
     "label": "Hadith deck",
     "price": 6.6,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/quiz-bundle-seerah-hadith-sahabah-sahabiyat-quiz-cards-1.webp",
    "assets/shop/gallery/quiz-bundle-seerah-hadith-sahabah-sahabiyat-quiz-cards-2.webp",
    "assets/shop/gallery/quiz-bundle-seerah-hadith-sahabah-sahabiyat-quiz-cards-6.webp"
   ]
  },
  {
   "id": "my-wheel-of-emotions",
   "title": "My Wheel of Emotions",
   "cat": "activity",
   "isNew": false,
   "desc": "Spin to match a feeling with the right dua. A pocket-sized way to connect emotions with the remembrance of Allah.",
   "specs": "16 cm wheel",
   "cover": "assets/shop/my-wheel-of-emotions.jpg",
   "options": [
    {
     "label": null,
     "price": 3.0,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/my-wheel-of-emotions-1.webp",
    "assets/shop/gallery/my-wheel-of-emotions-2.webp",
    "assets/shop/gallery/my-wheel-of-emotions-3.webp"
   ]
  },
  {
   "id": "my-good-deeds-tracker",
   "title": "My Good Deeds Tracker",
   "cat": "activity",
   "isNew": false,
   "desc": "A reusable wipe-clean weekly chart for Salah, Quran, kindness, sadaqah and more, so children can tick off their good deeds every day.",
   "specs": "Wipe-clean chart",
   "cover": "assets/shop/my-good-deeds-tracker.jpg",
   "options": [
    {
     "label": null,
     "price": 4.2,
     "stock": 2
    }
   ],
   "gallery": [
    "assets/shop/gallery/my-good-deeds-tracker-1.webp"
   ]
  },
  {
   "id": "who-am-i-poster",
   "title": "Who Am I? Poster",
   "cat": "activity",
   "isNew": false,
   "desc": "Ten good qualities every young Muslim can grow, on a poster for a bedroom, study corner or classroom. Available for girls or boys.",
   "specs": "A3 poster",
   "cover": "assets/shop/who-am-i-poster.jpg",
   "options": [
    {
     "label": "Girls",
     "price": 6.0,
     "stock": 2
    },
    {
     "label": "Boys",
     "price": 6.0,
     "stock": 2
    }
   ],
   "gallery": [
    "assets/shop/gallery/who-am-i-poster-1.webp",
    "assets/shop/gallery/who-am-i-poster-2.webp"
   ]
  },
  {
   "id": "living-by-the-quran-surah-al-hujurat",
   "title": "The Ripple Effect: Living by the Quran Workbook",
   "cat": "activity",
   "isNew": false,
   "desc": "A conversational workbook on bullying and how our words and actions reach others, in the light of Surah Al-Hujurat (verses 11–12). Children reflect, discuss and connect Quranic wisdom with real life.",
   "specs": "A5 · 16 pages · Ages 10+",
   "cover": "assets/shop/living-by-the-quran-surah-al-hujurat.jpg",
   "options": [
    {
     "label": null,
     "price": 3.99,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/living-by-the-quran-surah-al-hujurat-1.webp",
    "assets/shop/gallery/living-by-the-quran-surah-al-hujurat-3.webp",
    "assets/shop/gallery/living-by-the-quran-surah-al-hujurat-4.webp"
   ]
  },
  {
   "id": "hadith-cards",
   "title": "My First Hadith Collection (Hadith Cards)",
   "cat": "activity",
   "isNew": false,
   "desc": "Short, simple ahadith on pocket-sized cards, so young children can learn them by heart and put them into practice.",
   "specs": "9 cards (18 sides) · 3.5×2.5 in · Ages 4–7",
   "cover": "assets/shop/hadith-cards.jpg",
   "options": [
    {
     "label": null,
     "price": 2.4,
     "stock": 5
    }
   ],
   "gallery": [
    "assets/shop/gallery/hadith-cards-1.webp",
    "assets/shop/gallery/hadith-cards-2.webp",
    "assets/shop/gallery/hadith-cards-4.webp"
   ]
  },
  {
   "id": "allah-loves-you-affirmation-cards",
   "title": "Allah Loves You: Affirmation & Memory Cards",
   "cat": "activity",
   "isNew": false,
   "desc": "Thirty affirmation cards reminding children that Allah loves them. Play them as a memory game or use them to start conversations about kindness, empathy and feelings.",
   "specs": "30 cards · Ages 4–7",
   "cover": "assets/shop/allah-loves-you-affirmation-cards.jpg",
   "options": [
    {
     "label": null,
     "price": 24.0,
     "stock": 3
    }
   ],
   "gallery": [
    "assets/shop/gallery/allah-loves-you-affirmation-cards-1.webp",
    "assets/shop/gallery/allah-loves-you-affirmation-cards-2.webp",
    "assets/shop/gallery/allah-loves-you-affirmation-cards-8.webp"
   ]
  },
  {
   "id": "the-salah-quest-board-game",
   "title": "The Salah Quest Board Game",
   "cat": "activity",
   "isNew": false,
   "desc": "A ladders-and-slides game about the five daily prayers. Climb with good Salah habits, slide back for missed prayers, and answer Salah questions to race to square 100.",
   "specs": "Board game · Ages 5+",
   "cover": "assets/shop/the-salah-quest-board-game.jpg",
   "options": [
    {
     "label": null,
     "price": 30.0,
     "stock": 3
    }
   ],
   "gallery": [
    "assets/shop/gallery/the-salah-quest-board-game-1.webp",
    "assets/shop/gallery/the-salah-quest-board-game-2.webp",
    "assets/shop/gallery/the-salah-quest-board-game-3.webp"
   ]
  },
  {
   "id": "sunnah-emotion-guide",
   "title": "My Sunnah Emotion Guide",
   "cat": "activity",
   "isNew": false,
   "desc": "A poster pairing everyday feelings with what to do and the dua to say, the Sunnah way. Lovely beside a desk or in a bedroom.",
   "specs": "A3 poster",
   "cover": "assets/shop/sunnah-emotion-guide.jpg",
   "options": [
    {
     "label": null,
     "price": 3.6,
     "stock": 2
    }
   ],
   "gallery": [
    "assets/shop/gallery/sunnah-emotion-guide-1.webp"
   ]
  },
  {
   "id": "ramadan-calendar",
   "title": "Ramadan Calendar",
   "cat": "activity",
   "isNew": false,
   "desc": "A colourful calendar poster for counting down the days of Ramadan together. Hang it up and mark each day as you go.",
   "specs": "Poster",
   "cover": "assets/shop/ramadan-calendar.jpg",
   "options": [
    {
     "label": null,
     "price": 6.0,
     "stock": 2
    }
   ],
   "gallery": [
    "assets/shop/gallery/ramadan-calendar-1.webp"
   ]
  }
 ],
 "groups": {
  "heroes": {
   "title": "Our Prophets: Our Heroes",
   "sub": "10 single prophet books",
   "price": "€6.95 each",
   "url": "/shop/our-prophets-our-heroes/",
   "cover": "assets/shop/prophet-singles.webp",
   "fi_sub": "10 profeettakirjaa yksittäin",
   "fi_price": "6,95 € / kirja"
  },
  "quran": {
   "title": "Stories from the Holy Quran",
   "sub": "22 single books",
   "price": "€2.35 each",
   "fi_sub": "22 kirjaa yksittäin",
   "fi_price": "2,35 € / kirja",
   "url": "/shop/stories-from-the-quran/",
   "cover": "assets/shop/bundle-complete.webp"
  }
 }
};
