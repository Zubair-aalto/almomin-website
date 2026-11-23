"""Text content for the SEO pages (English and Finnish). Edit here, then run: python3 tools/build-pages.py"""

ORDER = ["bundles", "baby", "story", "activity"]

DELIVERY_FI = "Toimitus koko Suomeen: Matkahuolto 6,90 €, Posti 7,90 € tai maksuton nouto Espoosta."
DELIVERY_EN = "Delivery anywhere in Finland: Matkahuolto €6.90, Posti €7.90, or free pickup in Espoo."

CATS = {
 "bundles": dict(
  en_slug="prophet-stories", fi_slug="profeettatarinat", tile="assets/shop/bundle-light.webp",
  en_nav="Prophet stories", fi_nav="Profeettatarinat", en_suffix="Prophet Stories for Kids",
  en_h1="Prophet stories for kids", fi_h1="Profeettatarinat lapsille",
  fi_tile="Koraanin tarinat sarjoina, alk. 10 €",
  en_title="Prophet Stories for Kids – Quran Story Book Bundles | Almo’min",
  en_desc="Illustrated prophet stories for kids: Quran story bundles from €10, single prophet books €6.95, sets of 5 for €30. Delivery across Finland.",
  fi_title="Profeettatarinat lapsille – Koraanin tarinat kirjasarjoina | Almo’min",
  fi_desc="Kuvitetut profeettatarinat Koraanista lapsille: 5 kirjaa 10 €, 6 kirjaa 12 €, kaikki 22 kirjaa 44 €. Toimitus koko Suomeen.",
  en_intro="""<p>The stories of the prophets are the first stories many Muslim children fall in love with. Our illustrated <b>Stories from the Holy Quran</b> follow them in order, from Adam (AS) and the Garden to the life of the final Messenger, Muhammad ﷺ, in four bundles you can collect one by one.</p>
<p>Each bundle is priced as a set: <b>5 books for €10</b> or <b>6 books for €12</b>, and the <b>complete collection of 22 books is €44</b>. Short chapters and bright pictures make them ideal bedtime stories for ages 4–10, and easy first readers for older children. We also stock a set of 10 prophet stories and a series on the beautiful names of Allah.</p>
<p>Our second series, <b>Our Prophets: Our Heroes</b>, has a square picture book for each of ten prophets, from Adam (AS) to Muhammad ﷺ, with the prophet’s dua, names of Allah and fun facts. Buy them <b>one at a time for €6.95</b>, in two <b>sets of 5 for €30</b>, or <b>all 10 for €50</b>.</p>""",
  fi_intro="""<p>Profeettojen tarinat ovat monelle muslimilapselle ensimmäiset rakkaat tarinat. Kuvitettu <b>Stories from the Holy Quran</b> -sarja kulkee järjestyksessä Aadamista (AS) viimeiseen profeettaan Muhammadiin ﷺ, neljänä kirjasarjana, jotka voi kerätä yksi kerrallaan.</p>
<p>Hinnat ovat sarjahintoja: <b>5 kirjaa 10 €</b> tai <b>6 kirjaa 12 €</b>, ja <b>koko 22 kirjan kokoelma 44 €</b>. Lyhyet luvut ja värikkäät kuvat sopivat iltasaduiksi 4–10-vuotiaille ja ensimmäisiksi omiksi lukukirjoiksi. Valikoimassa on myös sarja Allahin kauniista nimistä.</p>
<p>Toisessa sarjassamme, <b>Our Prophets: Our Heroes</b>, on oma kuvakirja kymmenelle profeetalle Aadamista (AS) Muhammadiin ﷺ, profeetan duan, Allahin nimien ja hauskojen faktojen kera. Kirjat saa <b>yksittäin 6,95 €</b>, kahtena <b>5 kirjan settinä 30 €</b> tai <b>kaikki 10 kirjaa 50 €</b>.</p>""",
  en_faq=[("What age are the prophet story books for?", "They are best for ages 4–10. Younger children enjoy them read aloud; children from about 7 can read them on their own."),
          ("In what order should we read the prophet stories?", "Start with Bundle I (Adam, Cain and Abel, Nuh, Hud, Salih) and continue to Bundle IV, which ends with the life of Muhammad ﷺ. Our <a href=\"/guides/prophet-stories-for-kids-in-order/\">reading guide</a> lists every book in order."),
          ("What language are the books in?", "The books are in English, with Islamic names and phrases explained in the text."),
          ("How fast is delivery?", "We send orders within 1–3 working days by Matkahuolto (€6.90) or Posti (€7.90), or you can collect for free in Espoo.")],
  fi_faq=[("Minkä ikäisille profeettatarinat sopivat?", "Parhaiten 4–10-vuotiaille. Pienemmille niitä luetaan ääneen, ja noin 7-vuotiaasta alkaen lapsi voi lukea niitä itse."),
          ("Ovatko kirjat suomeksi?", "Kirjat ovat englanninkielisiä. Monissa muslimiperheissä Suomessa lapset lukevat niitä englanniksi tai vanhempi kertoo tarinan omalla kielellään kuvia katsellen."),
          ("Missä järjestyksessä tarinat kannattaa lukea?", "Aloita sarjasta I (Aadam, Kain ja Aabel, Nooa, Hud, Salih) ja jatka sarjaan IV, joka päättyy profeetta Muhammadin ﷺ elämään."),
          ("Kuinka nopeasti tilaus toimitetaan?", "Lähetämme tilauksen 1–3 arkipäivässä. " + DELIVERY_FI)]),
 "baby": dict(
  en_slug="baby-toddler-books", fi_slug="vauvakirjat", tile="assets/shop/allah-made-the-world-around-me-board-book-touch-and-feel.jpg",
  en_nav="Baby books", fi_nav="Vauvakirjat", en_suffix="Islamic Baby Book",
  en_h1="Islamic baby & toddler books", fi_h1="Islamilaiset vauva- ja taaperokirjat",
  fi_tile="Kangas-, tunnustelu- ja läppäkirjat",
  en_title="Islamic Baby & Toddler Books – Board, Cloth & Lift-the-Flap | Almo’min",
  en_desc="Islamic board books, cloth books, touch-and-feel and lift-the-flap books for babies and toddlers aged 0–3. Delivery across Finland.",
  fi_title="Islamilaiset vauvakirjat ja taaperokirjat | Almo’min",
  fi_desc="Islamilaiset kartonkikirjat, kangaskirjat, tunnustelu- ja läppäkirjat 0–3-vuotiaille. Toimitus koko Suomeen, nouto Espoosta.",
  en_intro="""<p>The first words a child hears shape the heart. These sturdy <b>Islamic board books, cloth books and lift-the-flap books</b> introduce babies and toddlers to Allah, Bismillah, Salah and the Sunnah through rhyme, touch and play.</p>
<p>Choose a soft crinkle book for the first months, a bilingual Arabic and English touch-and-feel book, or a lift-the-flap book about the five daily prayers. They also make thoughtful gifts for an Aqiqah, a new baby or grandparents to read with their grandchildren.</p>""",
  fi_intro="""<p>Ensimmäiset sanat, jotka lapsi kuulee, muovaavat sydäntä. Nämä kestävät <b>islamilaiset kartonkikirjat, kangaskirjat ja läppäkirjat</b> tutustuttavat vauvat ja taaperot Allahiin, Bismillahiin, rukoukseen ja sunnaan loruin, kosketellen ja leikkien.</p>
<p>Valitse rapiseva kangaskirja ensimmäisille kuukausille, kaksikielinen arabia–englanti-tunnustelukirja tai läppäkirja viidestä päivittäisestä rukouksesta. Ne ovat myös kaunis lahja akikaan, vauvalle tai isovanhemmille luettavaksi lastenlasten kanssa.</p>""",
  en_faq=[("Which Islamic book is best for a newborn?", "A soft cloth book such as “I Say Bismillah” or “The World Around Me from the Quran”: high-contrast pictures, safe to chew and easy to wash."),
          ("Are there bilingual Arabic and English books?", "Yes: “Allah Made the World Around Me” and “My Aqeedah” are bilingual board books in Arabic and English."),
          ("Do you have gifts for an Aqiqah or new baby?", "Board books make lovely gifts. Message us on WhatsApp and we can help you choose a set.")],
  fi_faq=[("Mikä islamilainen kirja sopii vastasyntyneelle?", "Pehmeä kangaskirja, kuten “I Say Bismillah” tai “The World Around Me from the Quran”: kontrastikkaat kuvat, turvallinen pureskella ja helppo pestä."),
          ("Onko kaksikielisiä kirjoja?", "Kyllä: “Allah Made the World Around Me” ja “My Aqeedah” ovat arabia–englanti-kartonkikirjoja."),
          ("Sopivatko kirjat lahjaksi?", "Kyllä, esimerkiksi akikaan tai vauvalahjaksi. Autamme mielellämme valinnassa WhatsAppissa.")]),
 "story": dict(
  en_slug="islamic-story-books", fi_slug="tarinakirjat", tile="assets/shop/why-are-my-feelings-so-big-islamic-kids-book.jpg",
  en_nav="Story books", fi_nav="Tarinakirjat", en_suffix="Islamic Story Book",
  en_h1="Islamic story books for children", fi_h1="Islamilaiset tarinakirjat lapsille",
  fi_tile="Kuvakirjat tunteista, eidistä ja uskosta",
  en_title="Islamic Story Books for Kids – Picture Books & Chapter Books | Almo’min",
  en_desc="Islamic picture books and chapter books for children aged 4–12: feelings, manners, Ramadan, Eid, hijab and Muslim heroes. Delivery across Finland.",
  fi_title="Islamilaiset tarinakirjat ja kuvakirjat lapsille | Almo’min",
  fi_desc="Islamilaiset kuvakirjat ja lukukirjat 4–12-vuotiaille: tunteet, tavat, ramadan, eid ja muslimisankarit. Toimitus koko Suomeen.",
  en_intro="""<p>Good stories help children understand themselves and their faith. Our <b>Islamic picture books and chapter books</b> cover big feelings like anger and worry, everyday manners and Sunnah habits, Ramadan and Eid, the hijab, and the inventions of the Muslim Golden Age.</p>
<p>They are written for ages 4–12, with relatable Muslim characters, and many are perfect for reading together at bedtime and talking about afterwards.</p>""",
  fi_intro="""<p>Hyvät tarinat auttavat lasta ymmärtämään itseään ja uskoaan. <b>Islamilaiset kuvakirjat ja lukukirjat</b> käsittelevät isoja tunteita kuten vihaa ja huolta, arjen tapoja ja sunnaa, ramadania ja eidiä, huivia sekä islamin kultakauden keksintöjä.</p>
<p>Kirjat on tehty 4–12-vuotiaille, ja niissä on samaistuttavia muslimihahmoja. Monet sopivat yhdessä luettaviksi iltasaduiksi ja keskustelun avaajiksi.</p>""",
  en_faq=[("Do you have Islamic books about emotions?", "Yes: “Why Are My Feelings So Big?”, “Why Are My Cheeks Red?” (anger), “My Emotions Connect Me to Allah” and “What I Say to Feel Okay”."),
          ("Which books are good for Ramadan and Eid?", "“Fasting or Feasting?”, “Eid Catastrophe” and “Eid on a Giant Glider”. See our <a href=\"/guides/ramadan-and-eid-books-for-kids/\">Ramadan and Eid guide</a>."),
          ("Do you have books for older children?", "The Manha Khan chapter books and “Did You Know? Incredible Muslim Inventions” suit ages 8–12.")],
  fi_faq=[("Onko teillä islamilaisia kirjoja tunteista?", "Kyllä: esimerkiksi “Why Are My Feelings So Big?”, “Why Are My Cheeks Red?” (viha) ja “My Emotions Connect Me to Allah”."),
          ("Mitkä kirjat sopivat ramadaniin ja eidiin?", "“Fasting or Feasting?”, “Eid Catastrophe” ja “Eid on a Giant Glider”."),
          ("Ovatko kirjat suomeksi?", "Kirjat ovat englanninkielisiä. Kuvakirjoja voi myös kertoa omalla kielellä kuvia katsellen.")]),
 "activity": dict(
  en_slug="activities-games", fi_slug="puuhakirjat-ja-pelit", tile="assets/shop/the-salah-quest-board-game.jpg",
  en_nav="Activities", fi_nav="Puuhat & pelit", en_suffix="Islamic Activity for Kids",
  en_h1="Islamic activity books, cards & games", fi_h1="Islamilaiset puuhakirjat, kortit ja pelit",
  fi_tile="Pelit, kortit, julisteet ja ramadankalenteri",
  en_title="Islamic Activity Books, Games & Cards for Kids | Almo’min",
  en_desc="Islamic activity books, quiz cards, dua games, posters, a Salah board game and a Ramadan calendar for kids. Delivery across Finland.",
  fi_title="Islamilaiset puuhakirjat, pelit ja kortit lapsille | Almo’min",
  fi_desc="Islamilaiset puuhakirjat, tietokortit, dua-pelit, julisteet, rukouslautapeli ja ramadankalenteri lapsille. Toimitus koko Suomeen.",
  en_intro="""<p>Children learn best when they play. These <b>Islamic activity books, card games, posters and board games</b> turn duas, hadith, the Seerah and Salah into something to trace, spin, quiz and race through, at home, in the car or at weekend school.</p>
<p>Popular picks include The Salah Quest board game, Dua Quest cards, the wipe-clean activity book, a good deeds tracker and our Ramadan countdown calendar.</p>""",
  fi_intro="""<p>Lapset oppivat parhaiten leikkien. Nämä <b>islamilaiset puuhakirjat, korttipelit, julisteet ja lautapelit</b> tekevät duista, hadithista, profeetan elämäkerrasta ja rukouksesta jotain, mitä voi piirtää, pyörittää ja pelata kotona, autossa tai koraanikoulussa.</p>
<p>Suosikkeja ovat Salah Quest -lautapeli, Dua Quest -kortit, pyyhittävä puuhakirja, hyvien tekojen seurantataulu ja ramadankalenteri.</p>""",
  en_faq=[("Which activities are good for Ramadan?", "The Ramadan calendar poster, the Good Deeds Tracker and Dua Quest cards are family favourites during Ramadan."),
          ("Are the games suitable for Islamic weekend schools?", "Yes. The quiz card decks and Hadith cards work well for groups. Contact us for larger orders."),
          ("What ages are the activities for?", "Most suit ages 4–10; the puzzle book and Surah Al-Hujurat workbook are for older children.")],
  fi_faq=[("Mitkä puuhat sopivat ramadaniin?", "Ramadankalenteri, hyvien tekojen seurantataulu ja Dua Quest -kortit ovat perheiden suosikkeja."),
          ("Sopivatko pelit koraanikouluun tai ryhmille?", "Kyllä. Tietokorttipakat ja hadith-kortit toimivat hyvin ryhmissä. Ota yhteyttä isommista tilauksista."),
          ("Minkä ikäisille puuhat sopivat?", "Useimmat 4–10-vuotiaille; pulmakirja ja Al-Hujurat-tehtäväkirja sopivat vanhemmille lapsille.")]),
}

FI_HOME = dict(
 title="Islamilaiset lastenkirjat – profeettatarinat ja vauvakirjat | Almo’min",
 desc="Almo’min on islamilaisten lastenkirjojen verkkokauppa Espoosta: profeettatarinat, Koraanin tarinat, vauvakirjat, puuhakirjat ja pelit. Toimitus koko Suomeen.",
 h1="Islamilaiset lastenkirjat, <em>kauniisti kuvitettuina.</em>",
 lede="Profeettatarinoita, Koraanin tarinoita, vauvakirjoja, tunnekirjoja ja puuhia nuorille uskoville. Toimitus koko Suomeen, maksuton nouto Espoosta.",
 featured=["bundle-complete", "bundle-beginning", "set-of-10-prophet-stories-for-children", "gift-of-salah-a-lift-the-flap-book",
           "allah-made-the-world-around-me-board-book-touch-and-feel", "why-are-my-feelings-so-big-islamic-kids-book", "the-salah-quest-board-game", "ramadan-calendar"],
 body="""<div><h2 class="pg__h2">Näin tilaat</h2><ol class="pg__steps"><li><b>Valitse kirjat</b> ja lisää ne ostoskoriin.</li><li><b>Maksa turvallisesti</b> kortilla, MobilePaylla, Apple Paylla tai Google Paylla.</li><li><b>Lähetämme 1–3 arkipäivässä</b> Matkahuollolla (6,90 €) tai Postilla (7,90 €). Nouto Espoosta on maksuton.</li></ol></div>
<div><h2 class="pg__h2">Miksi Almo’min?</h2><p>Olemme muslimivanhempia Espoosta. Valitsemme jokaisen kirjan huolella, jotta perheet Suomessa löytävät luotettavia, kauniisti kuvitettuja kirjoja, jotka auttavat lapsia rakastamaan Allahia, Koraania ja profeettoja.</p><p>Kirjat ovat englanninkielisiä, osa kaksikielisiä arabiaksi ja englanniksi. Kysy rohkeasti <a href="https://wa.me/358417225258">WhatsAppissa</a>: autamme valitsemaan oikean kirjan lapsen iän mukaan.</p></div>""",
 faq=[("Toimitatteko koko Suomeen?", "Kyllä. " + DELIVERY_FI + " Lähetämme tilaukset 1–3 arkipäivässä."),
      ("Miten voin maksaa?", "Kortilla, MobilePaylla, Apple Paylla tai Google Paylla turvallisella Stripe-maksusivulla. Noudettaessa Espoosta voit sopia myös käteismaksusta."),
      ("Ovatko kirjat suomenkielisiä?", "Kirjat ovat englanninkielisiä, ja osa on kaksikielisiä (arabia–englanti)."),
      ("Voinko palauttaa tuotteen?", "Kyllä, sinulla on 14 päivän peruutusoikeus. Asiakas maksaa palautuksen postikulut. Lue lisää <a href=\"/terms.html\">toimitusehdoista</a>."),
      ("Minkä ikäisille kirjat sopivat?", "Valikoimassa on kirjoja vauvoista noin 12-vuotiaisiin: kangas- ja kartonkikirjoja 0–3-vuotiaille, profeettatarinoita ja kuvakirjoja 4–10-vuotiaille sekä lukukirjoja ja puuhia isommille.")])

GUIDES_EN = [
 dict(slug="best-islamic-books-for-babies-and-toddlers", short="Islamic books for babies",
  title="Best Islamic Books for Babies & Toddlers (0–3) | Almo’min",
  h1="The best Islamic books for babies and toddlers (0–3)",
  desc="How to choose Islamic books for babies and toddlers, by age: cloth books, touch-and-feel, lift-the-flap and first books about Allah, Salah and duas.",
  lede="It’s never too early to read with your child. Here’s how to choose Islamic books that match each stage from birth to age three, and the titles parents in Finland love most.",
  body="""<h2>0–6 months: high contrast and soft pages</h2>
<p>Newborns see bold black-and-white shapes best, and they explore everything with their mouths. Choose <b>soft cloth books</b> with high-contrast pictures and crinkly pages. Read the words softly, say Bismillah together, and let your baby touch and hold the book.</p>
[[products:i-say-bismillah-sunnah-foods,the-world-around-me-from-the-quran]]
<h2>6–18 months: touch, mirrors and first words</h2>
<p>Babies now love textures, faces and repetition. <b>Touch-and-feel and mirror board books</b> keep little hands busy while you introduce simple ideas: Allah made the sea, the sun and me; I am loved; I am kind. Short, rhythmic lines that you repeat every day build both language and faith.</p>
[[products:allah-made-the-world-around-me-board-book-touch-and-feel,i-am-my-first-book-of-postive-affirmations-mirror-book,five-senses-five-blessings-board-book]]
<h2>18 months–3 years: flaps, routines and family</h2>
<p>Toddlers love lifting flaps and finding surprises, and they learn through routines. This is a lovely age for books about <b>Salah, everyday Sunnah sayings and family</b>. Read them at the same time each day, for example after Maghrib or before bed, and let your child “find” the answers.</p>
[[products:gift-of-salah-a-lift-the-flap-book,it-is-sunnah-to-say-so,my-aqeedah-bilingual-board-book-english-and-arabic,my-nana-and-nani-love-me-board-book]]
<h2>Tips for reading with little ones</h2>
<ul><li><b>Little and often.</b> Two minutes a few times a day beats one long session.</li>
<li><b>Use your own language.</b> If you speak Urdu, Arabic, Somali or Finnish at home, tell the story in that language while pointing at the pictures.</li>
<li><b>Make dua together.</b> Turn each book into a moment of remembrance: “Who made the trees? Allah!”</li>
<li><b>Keep books within reach.</b> A low basket of board books invites toddlers to read on their own.</li></ul>
<p>Looking for a gift? Board books make a beautiful present for a new baby or an Aqiqah. Browse all <a href="/shop/baby-toddler-books/">Islamic baby and toddler books</a>, or message us on <a href="https://wa.me/358417225258">WhatsApp</a> for help choosing.</p>"""),
 dict(slug="prophet-stories-for-kids-in-order", short="Prophet stories in order",
  title="Prophet Stories for Kids in Order: A Reading Guide | Almo’min",
  h1="Prophet stories for kids, in order: a reading guide",
  desc="A parent’s guide to reading the stories of the prophets with children in order, from Adam (AS) to Muhammad ﷺ, with ages, tips and book bundles.",
  lede="Reading the stories of the prophets in order helps children see one long story: Allah sending guidance to humanity, again and again, until the final Messenger ﷺ. Here’s a simple path through all 22 stories.",
  body="""<h2>Why read them in order?</h2>
<p>When children meet the prophets one by one, in sequence, they start to connect them: Ibrahim (AS) is the father of Ismail (AS) and Ishaq (AS); Yaqub (AS) is the father of Yusuf (AS); Musa (AS) and Harun (AS) are brothers. The order also mirrors how the Quran keeps returning to the same lessons: patience, trust in Allah and gratitude.</p>
<h2>Bundle I: In the Beginning (5 books)</h2>
<p>Adam and Eve, Cain and Abel, Noah’s Ark, Hud and the Terrible Storm, and Salih and the She-Camel. These stories introduce creation, right and wrong, and the first nations who were warned. A gentle start for ages 4 and up.</p>
<h2>Bundle II: The House of Ibrahim (5 books)</h2>
<p>Lot and the Nation of Sodom, Ismail’s Great Sacrifice, Yaqub and His Sons, Yusuf and His Brothers, and Yusuf and the King’s Dream. A family story across generations, full of faith, jealousy, forgiveness and dreams.</p>
<h2>Bundle III: Trials &amp; Triumph (6 books)</h2>
<p>Ayub’s Patience, Shuaib and the People of Madyan, Moses and the Evil Pharaoh, Moses and the Miser Qaroon, Dawud and King Talut, and Sulaiman and the Hoopoe Bird. Stories of patience, honesty and courage in front of kings.</p>
<h2>Bundle IV: Light upon Light (6 books)</h2>
<p>Yunus in the Whale’s Belly, the Life of Zakariyah, Yahya and King Herod, Isa’s Miraculous Life, the Companions of the Cave, and the Life of Muhammad ﷺ. The series ends with the final Messenger.</p>
[[products:bundle-beginning,bundle-ibrahim,bundle-trials,bundle-light]]
<h2>How to read them with your child</h2>
<ul><li><b>One story a week.</b> Read it a few times, then ask: “What did the prophet do when things were hard?”</li>
<li><b>Find the dua.</b> Many stories include a prophet’s dua, like Yunus (AS) in the whale. Learn it together.</li>
<li><b>Act it out.</b> Younger children love building an ark or a whale out of pillows.</li>
<li><b>Connect to the Quran.</b> Older children can find the story’s surah and listen to the recitation.</li></ul>
<h2>Prices</h2>
<p>Bundles I and II are <b>5 books for €10</b>, Bundles III and IV are <b>6 books for €12</b>, and the <b>complete collection of all 22 books is €44</b>. We deliver across Finland, and pickup in Espoo is free.</p>
[[products:bundle-complete,set-of-10-prophet-stories-for-children,prophet-stories-set-1,prophet-stories-set-2]]
<p>See all <a href="/shop/prophet-stories/">prophet story books</a>.</p>"""),
 dict(slug="ramadan-and-eid-books-for-kids", short="Ramadan & Eid for kids",
  title="Ramadan & Eid Books and Activities for Kids | Almo’min",
  h1="Ramadan and Eid books and activities for kids",
  desc="Make Ramadan and Eid special for children: story books, a Ramadan countdown calendar, good deeds tracker, dua games and Eid gift ideas, delivered in Finland.",
  lede="Ramadan is the month children remember most, when the house smells of iftar and the evenings feel different. A few well-chosen books and activities help them understand why we fast and make the month their own.",
  body="""<h2>Before Ramadan: build excitement</h2>
<p>Put up a <b>Ramadan countdown calendar</b> a week or two before the month starts, and read a story about fasting together. Talk about what your child would like to do this Ramadan: a good deed every day, learning a new dua, or helping with iftar.</p>
[[products:ramadan-calendar,fasting-or-feasting]]
<h2>During Ramadan: small daily habits</h2>
<p>Children don’t need to fast to take part. A <b>good deeds tracker</b> on the fridge, a daily dua card at suhoor or iftar, and a short story after Taraweeh turn the month into a routine they look forward to.</p>
[[products:my-good-deeds-tracker,dua-quest-cards,what-i-say-to-feel-okay,the-salah-quest-board-game]]
<h2>Eid: gifts that last</h2>
<p>Books are gifts children keep for years. For Eid al-Fitr or Eid al-Adha, a story about Eid, a board game for the whole family or a bundle of prophet stories makes a meaningful present.</p>
[[products:eid-catastrophe,eid-on-a-giant-glider,bundle-light,quiz-bundle-seerah-hadith-sahabah-sahabiyat-quiz-cards]]
<h2>Order early</h2>
<p>Ramadan 2027 is expected to begin around 8 February (depending on the moon sighting). We send orders within 1–3 working days across Finland, so order a week or two ahead to have everything ready. Pickup in Espoo is free.</p>
<p>Browse all <a href="/shop/activities-games/">Islamic activities and games</a> and <a href="/shop/islamic-story-books/">story books</a>.</p>"""),
]

GUIDES_FI = [
 dict(slug="islamilaiset-lastenkirjat", short="Islamilaiset lastenkirjat – opas",
  title="Islamilaiset lastenkirjat – opas vanhemmille | Almo’min",
  h1="Islamilaiset lastenkirjat: opas vanhemmille",
  desc="Miten valita islamilaisia lastenkirjoja Suomessa? Vinkit iän mukaan: vauvakirjat, profeettatarinat, tunnekirjat sekä ramadan- ja eid-puuhat.",
  lede="Moni muslimiperhe Suomessa etsii kirjoja, jotka vahvistavat lapsen uskoa ja identiteettiä. Tässä oppaassa kerromme, millaisia islamilaisia lastenkirjoja kannattaa valita kunkin ikäiselle.",
  body="""<h2>Vauvat ja taaperot (0–3 vuotta)</h2>
<p>Pienimmille sopivat <b>pehmeät kangaskirjat</b> ja <b>kestävät kartonkikirjat</b>. Kontrastikkaat kuvat, tunnusteltavat pinnat ja nostettavat läpät pitävät pienet kädet kiireisinä, kun opettelette yhdessä sanomaan Bismillah ja tutustutte rukoukseen.</p>
[[products:i-say-bismillah-sunnah-foods,allah-made-the-world-around-me-board-book-touch-and-feel,gift-of-salah-a-lift-the-flap-book]]
<h2>Leikki-ikäiset ja koululaiset (4–10 vuotta)</h2>
<p>Tässä iässä lapset rakastavat tarinoita. <b>Profeettojen tarinat</b> Koraanista opettavat kärsivällisyyttä, rehellisyyttä ja luottamusta Allahiin. Lukekaa ne järjestyksessä Aadamista (AS) profeetta Muhammadiin ﷺ, niin lapsi näkee yhden suuren kokonaisuuden.</p>
[[products:bundle-beginning,bundle-complete]]
<p><b>Tunnekirjat</b> auttavat lasta käsittelemään vihaa, huolta ja surua islamilaisesta näkökulmasta, esimerkiksi muistamalla Allahia ja sanomalla duan.</p>
[[products:why-are-my-feelings-so-big-islamic-kids-book,my-emotions-connect-me-to-allah]]
<h2>Ramadan ja eid</h2>
<p>Ramadankalenteri, hyvien tekojen seurantataulu ja tarinat paastosta tekevät kuukaudesta lapselle merkityksellisen. Eid-lahjaksi kirja on lahja, joka säilyy vuosia.</p>
[[products:ramadan-calendar,my-good-deeds-tracker,the-salah-quest-board-game]]
<h2>Kirjojen kieli</h2>
<p>Valikoimamme kirjat ovat <b>englanninkielisiä</b>, ja osa on kaksikielisiä arabiaksi ja englanniksi. Monessa perheessä lapset lukevat englanniksi koulun ja harrastusten ansiosta. Pienten kanssa voit myös kertoa tarinan omalla kielelläsi – suomeksi, urduksi, arabiaksi tai somaliksi – kuvia katsellen.</p>
<h2>Tilaaminen</h2>
<p>Toimitamme koko Suomeen: Matkahuolto 6,90 €, Posti 7,90 € tai maksuton nouto Espoosta. Maksu kortilla tai MobilePaylla. Katso kaikki <a href="/fi/profeettatarinat/">profeettatarinat</a>, <a href="/fi/vauvakirjat/">vauvakirjat</a>, <a href="/fi/tarinakirjat/">tarinakirjat</a> ja <a href="/fi/puuhakirjat-ja-pelit/">puuhat ja pelit</a>.</p>"""),
]

HEROES = dict(
 sets=["prophet-stories-set-1", "prophet-stories-set-2", "set-of-10-prophet-stories-for-children"],
 title="Our Prophets: Our Heroes – 10 Prophet Story Books for Kids | Almo’min",
 desc="Ten square picture books on the prophets, from Adam (AS) to Muhammad ﷺ: €6.95 each, two sets of 5 for €30, or all 10 for €50. Delivery across Finland.",
 h1="Our Prophets: Our Heroes",
 intro="""<p>Ten bright, square picture books, one for each prophet: <b>Adam, Nuh, Salih, Ibrahim, Ismail, Yusuf, Musa, Sulaiman and Yunus (peace be upon them) and Muhammad ﷺ</b>. Each story is told simply for ages 4–8 and includes the prophet’s dua, names of Allah and fun facts.</p>
<p>Choose the prophets your child loves at <b>€6.95 each</b>, or save with <b>a set of 5 for €30</b> or <b>all 10 for €50</b>.</p>""",
 singles_note="Listed in order, from the first prophet to the final Messenger ﷺ.")
