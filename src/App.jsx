import { useEffect, useState } from "react";
import "./App.css";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedMood, setSelectedMood] = useState(null);
  const [birthdayOpen, setBirthdayOpen] = useState(false);

  const birthday = getBirthdayInfo();

  useEffect(() => {
    if (!birthday.active) return;

    const seenKey = `little-world-birthday-seen-${birthday.year}`;
    if (!localStorage.getItem(seenKey)) {
      setBirthdayOpen(true);
    }
  }, [birthday.active, birthday.year]);

  function closeBirthday() {
    localStorage.setItem(`little-world-birthday-seen-${birthday.year}`, "yes");
    setBirthdayOpen(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
     LOADING SCREEN
  ========================= */

  if (loading) {
    return (
      <div className="loading-page">
        <div className="decoration flower-1">🌸</div>
        <div className="decoration flower-2">🌷</div>
        <div className="decoration heart-1">♡</div>
        <div className="decoration heart-2">♡</div>
        <div className="decoration star-1">✦</div>
        <div className="decoration star-2">✦</div>

        <div className="loading-content">
          <div className="little-flower">🌸</div>

          <p className="small-text">welcome to</p>

          <h1>Her Little World</h1>

          <p className="subtitle">a tiny little place made just for you ♡</p>

          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <p className="preparing">Preparing your little world...</p>
        </div>
      </div>
    );
  }

  /* =========================
     MOOD CORNER PAGE
  ========================= */

  if (currentPage === "mood") {
    return (
      <MoodCorner
        goHome={() => setCurrentPage("home")}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
      />
    );
  }

  /* =========================
     MYSTERY BOX PAGE
  ========================= */

  if (currentPage === "mystery") {
    return <MysteryBox goHome={() => setCurrentPage("home")} />;
  }

  if (currentPage === "garden") {
    return <FlowerGarden goHome={() => setCurrentPage("home")} />;
  }

  if (currentPage === "mailbox") {
    return <Mailbox goHome={() => setCurrentPage("home")} />;
  }

  if (currentPage === "room") {
    return <MyRoom goHome={() => setCurrentPage("home")} />;
  }

  if (currentPage === "arcade") {
    return <HappyArcade goHome={() => setCurrentPage("home")} />;
  }

  if (currentPage === "pet") {
    return <LittlePet goHome={() => setCurrentPage("home")} />;
  }

  /* =========================
     HOME PAGE
  ========================= */

  return (
    <main
      className={`world-page ${birthday.active ? `birthday-home birthday-${birthday.theme.key}` : ""}`}
    >
      {birthday.active && (
        <>
          <div className="birthday-home-badge">
            🎂 Birthday Girl • {birthday.age}
          </div>
          <div className="birthday-float birthday-float-1">🎈</div>
          <div className="birthday-float birthday-float-2">✨</div>
          <div className="birthday-float birthday-float-3">🎀</div>
        </>
      )}

      {birthdayOpen && (
        <BirthdayCelebration birthday={birthday} onOpen={closeBirthday} />
      )}
      <div className="cloud cloud-one">☁</div>
      <div className="cloud cloud-two">☁</div>

      <div className="floating-heart fh-one">♡</div>
      <div className="floating-heart fh-two">♡</div>
      <div className="floating-heart fh-three">♡</div>

      <section className="world-container">
        <div className="world-header">
          <span className="world-label">WELCOME TO YOUR</span>

          <h2>
            Little <span>World</span> 🌷
          </h2>

          <p>
            A tiny pink place filled with happy things, little surprises, and
            lots of love.
          </p>
        </div>

        <div className="world-grid">
          <WorldCard
            emoji="🛏️"
            title="My Room"
            text="A cozy little place just for you."
            onClick={() => setCurrentPage("room")}
          />

          <WorldCard
            emoji="🌷"
            title="Flower Garden"
            text="Grow something beautiful every day."
            onClick={() => setCurrentPage("garden")}
          />

          <WorldCard
            emoji="💌"
            title="Mailbox"
            text="There might be something waiting for you."
            onClick={() => setCurrentPage("mailbox")}
          />

          <WorldCard
            emoji="🎁"
            title="Mystery Box"
            text="Open it and see today's little surprise."
            special
            onClick={() => setCurrentPage("mystery")}
          />

          <WorldCard
            emoji="☁️"
            title="Mood Corner"
            text="How are you feeling today?"
            onClick={() => setCurrentPage("mood")}
          />

          <WorldCard
            emoji="🎮"
            title="Happy Arcade"
            text="Tiny games for a little break."
            onClick={() => setCurrentPage("arcade")}
          />

          <WorldCard
            emoji="🐰"
            title="My Little Pet"
            text="Feed, play, rest, and take care of a tiny friend."
            onClick={() => setCurrentPage("pet")}
          />
        </div>

        <div className="world-footer">
          <span>🌸</span>
          made especially for you
          <span>🌸</span>
        </div>
      </section>
    </main>
  );
}

/* ========================================
   WORLD CARD
======================================== */

const BIRTHDAY_MESSAGES = {
  18: {
    title: "CHAPTER 18 IS YOURS",
    message:
      "Selamat datang di chapter 18. Semoga langkahmu tahun ini dipenuhi hal-hal baik, keberanian untuk mencoba banyak hal baru, dan hari-hari kecil yang selalu punya alasan untuk tersenyum.",
  },
  19: {
    title: "CHAPTER 19 UNLOCKED",
    message:
      "Semoga di umur 19 ini lebih banyak hari yang bikin kamu senyum, lebih banyak hal baik yang datang, dan semua yang sedang kamu perjuangkan pelan-pelan menemukan jalannya.",
  },
  20: {
    title: "HELLO, TWENTY!",
    message:
      "Dua puluh tahun dan sebuah chapter baru dimulai. Semoga tahun ini membawa pengalaman seru, kesempatan baru, kesehatan, ketenangan, dan banyak alasan kecil untuk bahagia.",
  },
  21: {
    title: "TWENTY-ONE & SHINING",
    message:
      "Semoga chapter 21 menjadi salah satu yang paling berkesan: penuh cerita baru, pencapaian baru, keberanian baru, dan orang-orang baik yang membuat perjalananmu terasa hangat.",
  },
  22: {
    title: "CHAPTER 22: BLOOM",
    message:
      "Di umur 22, semoga kamu terus tumbuh dengan caramu sendiri. Semoga yang baik bertahan, yang berat menjadi pelajaran, dan mimpi-mimpimu terasa semakin dekat.",
  },
  23: {
    title: "23 LITTLE WISHES",
    message:
      "Semoga tahun ke-23 membawa banyak kejutan baik, langkah yang lebih yakin, hati yang lebih tenang, dan momen-momen sederhana yang nantinya jadi kenangan favorit.",
  },
  24: {
    title: "A SWEET CHAPTER 24",
    message:
      "Semoga umur 24 terasa seperti rumah yang nyaman: ada ruang untuk tumbuh, beristirahat, mencoba lagi, tertawa lebih banyak, dan menikmati semua prosesmu.",
  },
  25: {
    title: "SILVER LITTLE CHAPTER",
    message:
      "Seperempat abad! Semoga chapter 25 dipenuhi keputusan yang baik, kesempatan yang menyenangkan, kesehatan, kebahagiaan, dan banyak hal yang membuatmu bangga pada perjalananmu sendiri.",
  },
  26: {
    title: "CHAPTER 26: KEEP GLOWING",
    message:
      "Semoga umur 26 membawamu ke tempat-tempat yang dulu hanya ada di daftar keinginan. Tetap bertumbuh, tetap penasaran, dan jangan lupa menikmati perjalanan di antaranya.",
  },
  27: {
    title: "LUCKY CHAPTER 27",
    message:
      "Semoga tahun ke-27 punya lebih banyak kabar baik daripada kekhawatiran, lebih banyak tawa daripada hari melelahkan, dan banyak momen yang layak disimpan.",
  },
  28: {
    title: "TWENTY-EIGHT & GREAT",
    message:
      "Semoga umur 28 memberi ruang untuk mimpi yang lebih besar sekaligus hari-hari yang lebih tenang. Semoga semua kerja kerasmu bertemu dengan hasil yang indah.",
  },
  29: {
    title: "CHAPTER 29: ALMOST MAGIC",
    message:
      "Semoga chapter 29 penuh kejutan kecil yang menyenangkan, orang-orang yang tulus, langkah yang mantap, dan alasan baru untuk bersyukur atas perjalananmu.",
  },
  30: {
    title: "THIRTY, THRIVING & BRIGHT",
    message:
      "Selamat datang di chapter 30. Semoga dekade baru ini dipenuhi kesehatan, kedamaian, pengalaman yang berharga, dan keberanian untuk terus membuat hidupmu terasa milikmu sendiri.",
  },
};

const BIRTHDAY_THEMES = [
  { key: "garden", label: "Pink Garden Party", emoji: "🌷", accent: "🎀" },
  { key: "stars", label: "Starry Birthday", emoji: "✨", accent: "🌙" },
  { key: "berry", label: "Strawberry Party", emoji: "🍓", accent: "🎂" },
  { key: "cloud", label: "Cloud Nine Party", emoji: "☁️", accent: "⭐" },
  { key: "ribbon", label: "Ribbon Celebration", emoji: "🎀", accent: "🎈" },
];

function getBirthdayInfo() {
  const now = new Date();
  const params = new URLSearchParams(window.location.search);
  const testMode = params.get("birthday") === "1";
  const active = testMode || (now.getMonth() === 0 && now.getDate() === 6);
  const age = now.getFullYear() - 2008;
  const theme = BIRTHDAY_THEMES[Math.abs(age - 18) % BIRTHDAY_THEMES.length];

  const custom = BIRTHDAY_MESSAGES[age];
  const fallback = {
    title: `CHAPTER ${age}: A NEW LITTLE ADVENTURE`,
    message: `Selamat datang di umur ${age}. Semoga tahun ini membawa kesehatan, ketenangan, banyak cerita baik, kesempatan baru, dan semakin banyak hal yang membuatmu tersenyum dan bangga pada perjalananmu.`,
  };

  return {
    active,
    age,
    year: now.getFullYear(),
    theme,
    ...(custom || fallback),
  };
}

function BirthdayCelebration({ birthday, onOpen }) {
  return (
    <div className="birthday-overlay" role="dialog" aria-modal="true">
      <div className="birthday-confetti" aria-hidden="true">
        {[
          "🎀",
          "✨",
          "🌷",
          "🎈",
          "💗",
          "⭐",
          "🎂",
          "✨",
          "🎀",
          "🌸",
          "🎈",
          "💗",
        ].map((item, index) => (
          <span key={`${item}-${index}`} style={{ "--i": index }}>
            {item}
          </span>
        ))}
      </div>

      <section className={`birthday-card birthday-card-${birthday.theme.key}`}>
        <div className="birthday-crown">👑</div>
        <p className="birthday-date">06 • JANUARY • {birthday.year}</p>

        <div className="birthday-cake">🎂</div>

        <p className="birthday-kicker">
          {birthday.theme.emoji} {birthday.theme.label} {birthday.theme.accent}
        </p>
        <h1>
          SELAMAT ULANG TAHUN
          <br />
          <span>BABYY GIRLLL!</span>
        </h1>

        <div className="birthday-age">
          <strong>{birthday.age}</strong>
          <span>YEARS OF YOU ✨</span>
        </div>

        <h2>{birthday.title}</h2>
        <p className="birthday-message">{birthday.message}</p>

        <p className="birthday-small-wish">
          Semoga hari ini punya satu alasan ekstra buat senyum. Little World
          juga ikut merayakan harimu. 🌷
        </p>

        <button
          type="button"
          className="birthday-open-button"
          onClick={() => {
            playTinySound("birthday");
            onOpen();
          }}
        >
          OPEN YOUR BIRTHDAY WORLD 🎁
        </button>

        <small>made with a little extra magic for January 6th ♡</small>
      </section>
    </div>
  );
}

function WorldCard({ emoji, title, text, special, onClick }) {
  return (
    <button
      className={`world-card ${special ? "special-card" : ""}`}
      onClick={onClick}
    >
      {special && <span className="new-badge">SURPRISE!</span>}

      <div className="card-icon">{emoji}</div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <span className="card-arrow">→</span>
    </button>
  );
}

/* ========================================
   MOOD CORNER
======================================== */

function MoodCorner({ goHome, selectedMood, setSelectedMood }) {
  const moods = [
    {
      emoji: "😭",
      name: "Terrible",
      message: "Today feels really heavy. Take it slowly, okay? 🌷",
    },

    {
      emoji: "😔",
      name: "Sad",
      message: "Sending you a tiny virtual hug and lots of pink flowers 🌸",
    },

    {
      emoji: "😐",
      name: "Meh",
      message: "Not every day has to be amazing. A little rest sounds nice ☁️",
    },

    {
      emoji: "🙂",
      name: "Good",
      message: "Yay! I hope something even nicer happens today 🌷",
    },

    {
      emoji: "🥰",
      name: "Amazing",
      message: "LOOK AT YOUUU! Keep that happy energy going ✨",
    },
  ];

  const activeMood = moods.find((mood) => mood.name === selectedMood);

  return (
    <main className="mood-page">
      <div className="mood-decoration mood-flower">🌸</div>

      <div className="mood-decoration mood-heart">♡</div>

      <section className="mood-container">
        <button className="back-button" onClick={goHome}>
          ← Back to my world
        </button>

        <div className="mood-heading">
          <div className="mood-cloud">☁️</div>

          <span>MOOD CORNER</span>

          <h2>
            How are you feeling
            <br />
            <em>today?</em>
          </h2>

          <p>
            Whatever you're feeling, you can leave a little bit of it here. ♡
          </p>
        </div>

        <div className="mood-options">
          {moods.map((mood) => (
            <button
              key={mood.name}
              className={`mood-option ${
                selectedMood === mood.name ? "active" : ""
              }`}
              onClick={() => setSelectedMood(mood.name)}
            >
              <span>{mood.emoji}</span>

              <p>{mood.name}</p>
            </button>
          ))}
        </div>

        {activeMood && (
          <div className="mood-response">
            <span className="response-small">A LITTLE NOTE FOR YOU</span>

            <div className="response-emoji">{activeMood.emoji}</div>

            <h3>{activeMood.message}</h3>

            <p>
              You don't have to do everything at once. This little world will
              still be here. 🌷
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

/* ========================================
   MYSTERY BOX
======================================== */

function MysteryBox({ goHome }) {
  const surprises = [
    {
      icon: "🌷",
      title: "A Tiny Flower",
      text: "Bunga kecil buat nemenin hari kamu. Jangan lupa senyum hari ini yaa.",
    },
    {
      icon: "☁️",
      title: "Slow Day Pass",
      text: "Hari ini kamu boleh jalan pelan-pelan. Nggak semuanya harus selesai sekaligus.",
    },
    {
      icon: "⭐",
      title: "Little Star",
      text: "Satu bintang kecil karena kamu sudah bertahan sejauh ini.",
    },
    {
      icon: "🍓",
      title: "Strawberry Award",
      text: "Congratulations! Kamu resmi mendapatkan strawberry virtual hari ini.",
    },
    {
      icon: "🧸",
      title: "Tiny Bear",
      text: "Beruang kecil ini ditugaskan khusus buat nemenin kamu hari ini.",
    },
    {
      icon: "🍰",
      title: "Cake Break",
      text: "Ini tanda kalau kamu pantas mendapatkan sesuatu yang enak hari ini.",
    },
    {
      icon: "🌸",
      title: "Pink Flower",
      text: "Satu bunga pink karena dunia butuh sedikit lebih banyak warna pink hari ini.",
    },
    {
      icon: "🐰",
      title: "Bunny Visit",
      text: "Seekor kelinci kecil mampir cuma buat bilang: semangatt!",
    },
    {
      icon: "✨",
      title: "Sparkle Boost",
      text: "Kamu mendapatkan tambahan +100 sparkle energy untuk hari ini.",
    },
    {
      icon: "🍪",
      title: "Cookie Time",
      text: "Emergency virtual cookie unlocked. Waktunya istirahat sebentar.",
    },
    {
      icon: "🎀",
      title: "Pink Ribbon",
      text: "Hadiah kecil tanpa alasan. Karena hadiah nggak selalu butuh alasan.",
    },
    {
      icon: "🌙",
      title: "Moon Message",
      text: "Kalau hari ini melelahkan, semoga malam nanti jadi tempat istirahat yang nyaman.",
    },
    {
      icon: "🍓",
      title: "Berry Good Day",
      text: "Semoga ada satu hal kecil hari ini yang bikin kamu bilang: ternyata hari ini nggak buruk-buruk amat.",
    },
    {
      icon: "🐱",
      title: "Cat Approval",
      text: "Seekor kucing virtual telah menilai harimu dan memutuskan bahwa kamu layak mendapatkan tepuk tangan.",
    },
    {
      icon: "🫧",
      title: "Bubble Break",
      text: "Tarik napas, santai sebentar, lalu lanjut lagi kalau sudah siap.",
    },
    {
      icon: "🌼",
      title: "Pocket Sunshine",
      text: "Sedikit sinar matahari virtual untuk disimpan di kantong kamu hari ini.",
    },
    {
      icon: "🍬",
      title: "Candy Drop",
      text: "Satu permen virtual jatuh dari langit. Entah kenapa, tapi sekarang itu punya kamu.",
    },
    {
      icon: "🦋",
      title: "Butterfly Visit",
      text: "Kupu-kupu kecil mampir. Katanya hari ini kamu harus lebih banyak senyum.",
    },
    {
      icon: "🌈",
      title: "Tiny Rainbow",
      text: "Semoga setelah bagian yang melelahkan hari ini, ada sesuatu yang menyenangkan menunggu.",
    },
    {
      icon: "🥐",
      title: "Croissant Emergency",
      text: "Situasi darurat: kamu membutuhkan snack. Ini croissant virtual sementara.",
    },
    {
      icon: "💗",
      title: "Happy Heart",
      text: "Satu hati kecil ditambahkan ke inventory kamu hari ini.",
    },
    {
      icon: "🧁",
      title: "Cupcake Delivery",
      text: "Special delivery! Satu cupcake virtual tanpa biaya ongkir.",
    },
    {
      icon: "🌺",
      title: "Flower Delivery",
      text: "Special delivery: satu bunga cantik untuk orang yang lagi buka Mystery Box ini.",
    },
    {
      icon: "🐣",
      title: "Tiny Chick",
      text: "Anak ayam kecil ini sekarang bertugas mengingatkan kamu supaya jangan lupa istirahat.",
    },
    {
      icon: "🍒",
      title: "Cherry Bonus",
      text: "Bonus cherry unlocked. Tidak ada fungsinya, tapi lucu.",
    },

    // RARE

    {
      icon: "👑",
      title: "Rare Princess Pass",
      text: "RARE DROP! Hari ini kamu mendapatkan izin resmi untuk diperlakukan seperti princess.",
      rare: true,
    },
    {
      icon: "💎",
      title: "Pink Diamond",
      text: "RARE DROP! Kamu menemukan Pink Diamond tersembunyi di Little World.",
      rare: true,
    },
    {
      icon: "🦄",
      title: "Unicorn Encounter",
      text: "RARE DROP! Seekor unicorn muncul. Sepertinya hari ini kamu cukup beruntung.",
      rare: true,
    },
    {
      icon: "🌟",
      title: "Golden Star",
      text: "RARE DROP! Golden Star ditemukan. Simpan keberuntungan ini untuk sisa harimu.",
      rare: true,
    },
    {
      icon: "🏆",
      title: "Today's Favorite Human",
      text: "SUPER RARE! Selamat, hari ini kamu memenangkan penghargaan manusia favorit di Little World.",
      rare: true,
    },
  ];

  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [surprise, setSurprise] = useState(null);
  const [confetti, setConfetti] = useState([]);

  // Membuat tanggal lokal YYYY-MM-DD
  function getTodayKey() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Cek apakah Mystery Box hari ini sudah pernah dibuka
  useEffect(() => {
    const savedDate = localStorage.getItem("little-world-mystery-date");

    const savedSurprise = localStorage.getItem("little-world-mystery-surprise");

    if (savedDate === getTodayKey() && savedSurprise) {
      try {
        const parsedSurprise = JSON.parse(savedSurprise);

        setSurprise(parsedSurprise);
        playTinySound("mystery");
        setOpened(true);
      } catch {
        localStorage.removeItem("little-world-mystery-date");

        localStorage.removeItem("little-world-mystery-surprise");
      }
    }
  }, []);

  function createConfetti() {
    const pieces = Array.from({ length: 45 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 0.7,
      duration: 2.5 + Math.random() * 2,
      size: 6 + Math.random() * 9,
      rotate: Math.random() * 360,
      shape: Math.random() > 0.75 ? "♡" : Math.random() > 0.5 ? "✦" : "●",
    }));

    setConfetti(pieces);

    setTimeout(() => {
      setConfetti([]);
    }, 5000);
  }

  function openBox() {
    if (opened || opening) return;

    setOpening(true);

    const normalSurprises = surprises.filter((item) => !item.rare);

    const rareSurprises = surprises.filter((item) => item.rare);

    // 15% kemungkinan rare
    const isRare = Math.random() < 0.15;

    const pool = isRare ? rareSurprises : normalSurprises;

    const randomIndex = Math.floor(Math.random() * pool.length);

    const randomSurprise = pool[randomIndex];

    // Tunggu animasi kotak terbuka
    setTimeout(() => {
      setSurprise(randomSurprise);

      localStorage.setItem("little-world-mystery-date", getTodayKey());

      localStorage.setItem(
        "little-world-mystery-surprise",
        JSON.stringify(randomSurprise),
      );

      createConfetti();

      setOpened(true);
      setOpening(false);
    }, 1100);
  }

  return (
    <main className="mystery-page">
      {/* CONFETTI */}

      <div className="confetti-container">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              fontSize: `${piece.size}px`,
              transform: `rotate(${piece.rotate}deg)`,
            }}
          >
            {piece.shape}
          </span>
        ))}
      </div>

      {/* BACKGROUND DECORATION */}

      <div className="mystery-stars star-a">✦</div>

      <div className="mystery-stars star-b">✦</div>

      <div className="mystery-stars star-c">♡</div>

      <section className="mystery-container">
        <button className="back-button" onClick={goHome}>
          ← Back to my world
        </button>

        <div className="mystery-heading">
          <span>MYSTERY BOX</span>

          <h2>
            Something little is
            <br />
            <em>waiting for you.</em>
          </h2>

          <p>Pick up your tiny surprise for today ♡</p>
        </div>

        {!opened ? (
          <div className="box-area">
            <div
              className={`gift-animation-wrapper ${opening ? "opening" : ""}`}
            >
              <div className="box-glow"></div>

              <div className="sparkle sparkle-one">✦</div>

              <div className="sparkle sparkle-two">✦</div>

              <div className="sparkle sparkle-three">♡</div>

              <button
                className="gift-box"
                onClick={openBox}
                disabled={opening}
                aria-label="Open mystery box"
              >
                <div className="gift-lid">
                  <div className="gift-bow">
                    <span></span>
                    <span></span>
                  </div>

                  <div className="lid-ribbon"></div>
                </div>

                <div className="gift-body">
                  <div className="gift-ribbon"></div>

                  <span className="gift-heart">♡</span>
                </div>
              </button>
            </div>

            <p className="tap-box">
              {opening
                ? "opening your surprise... ✨"
                : "tap the box to open it ✨"}
            </p>
          </div>
        ) : (
          <div
            className={`surprise-result ${surprise?.rare ? "rare-result" : ""}`}
          >
            {surprise?.rare && (
              <span className="rare-badge">✦ RARE SURPRISE ✦</span>
            )}

            <div className="surprise-icon">{surprise?.icon}</div>

            <span className="surprise-label">TODAY'S LITTLE SURPRISE</span>

            <h3>{surprise?.title}</h3>

            <p>{surprise?.text}</p>

            <div className="tiny-divider">♡</div>

            <span className="tomorrow-text">
              today's box has been opened ♡
              <br />
              come back tomorrow for another little surprise
            </span>
          </div>
        )}
      </section>
    </main>
  );
}

/* ========================================
   FLOWER GARDEN
======================================== */

function FlowerGarden({ goHome }) {
  const flowers = [
    {
      id: "tulip",
      emoji: "🌷",
      name: "Tulip",
      message: "A little tulip for a lovely day.",
    },
    {
      id: "sakura",
      emoji: "🌸",
      name: "Sakura",
      message: "A tiny pink blossom just for today.",
    },
    {
      id: "daisy",
      emoji: "🌼",
      name: "Daisy",
      message: "A little sunshine for the garden.",
    },
    {
      id: "hibiscus",
      emoji: "🌺",
      name: "Hibiscus",
      message: "Something colorful just appeared.",
    },
    {
      id: "rose",
      emoji: "🌹",
      name: "Rose",
      message: "A tiny rose has joined your garden.",
    },
  ];

  const [garden, setGarden] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [selectedGardenFlower, setSelectedGardenFlower] = useState(null);
  const [plantedToday, setPlantedToday] = useState(false);
  const [newFlower, setNewFlower] = useState(null);

  function getTodayKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const savedGarden = localStorage.getItem("little-world-garden");
    const lastPlantDate = localStorage.getItem("little-world-garden-date");

    if (savedGarden) {
      try {
        const parsedGarden = JSON.parse(savedGarden);

        if (Array.isArray(parsedGarden)) {
          setGarden(parsedGarden);
        }
      } catch {
        localStorage.removeItem("little-world-garden");
      }
    }

    if (lastPlantDate === getTodayKey()) {
      setPlantedToday(true);
    }
  }, []);

  function plantFlower() {
    if (!selectedFlower || plantedToday) return;

    const flower = flowers.find((item) => item.id === selectedFlower);

    if (!flower) return;

    const plantedFlower = {
      ...flower,
      uniqueId: `${Date.now()}-${Math.random()}`,
      plantedDate: getTodayKey(),
      left: 7 + Math.random() * 82,
      size: 42 + Math.random() * 28,
      tilt: -12 + Math.random() * 24,
    };

    const updatedGarden = [...garden, plantedFlower];

    setGarden(updatedGarden);
    setNewFlower(plantedFlower);
    setPlantedToday(true);
    setSelectedFlower(null);
    setSelectedGardenFlower(null);

    localStorage.setItem("little-world-garden", JSON.stringify(updatedGarden));

    localStorage.setItem("little-world-garden-date", getTodayKey());

    setTimeout(() => {
      setNewFlower(null);
    }, 4500);
  }

  function selectGardenFlower(flower) {
    if (selectedGardenFlower?.uniqueId === flower.uniqueId) {
      setSelectedGardenFlower(null);
      return;
    }

    setSelectedGardenFlower(flower);
  }

  function removeFlower() {
    if (!selectedGardenFlower) return;

    const updatedGarden = garden.filter(
      (flower) => flower.uniqueId !== selectedGardenFlower.uniqueId,
    );

    setGarden(updatedGarden);
    setSelectedGardenFlower(null);

    localStorage.setItem("little-world-garden", JSON.stringify(updatedGarden));
  }

  return (
    <main className="garden-page">
      {/* BACKGROUND DECORATION */}
      <div className="garden-sun">☀️</div>
      <div className="garden-cloud garden-cloud-one">☁️</div>
      <div className="garden-cloud garden-cloud-two">☁️</div>

      <section className="garden-container">
        <button className="back-button" onClick={goHome}>
          ← Back to my world
        </button>

        <div className="garden-heading">
          <span>FLOWER GARDEN</span>

          <h2>
            Grow your little
            <br />
            <em>pink garden.</em>
          </h2>

          <p>
            You can plant one tiny flower every day. Come back and watch your
            garden grow. 🌷
          </p>
        </div>

        <div className="garden-scene">
          <div className="garden-sky">
            <div className="garden-butterfly butterfly-one">🦋</div>
            <div className="garden-butterfly butterfly-two">🦋</div>
          </div>

          <div className="garden-ground">
            {garden.length === 0 && (
              <div className="empty-garden">
                <span>🌱</span>
                <p>Your garden is waiting for its first flower...</p>
              </div>
            )}

            {garden.map((flower) => (
              <button
                type="button"
                key={flower.uniqueId}
                className={`planted-flower ${
                  selectedGardenFlower?.uniqueId === flower.uniqueId
                    ? "flower-selected"
                    : ""
                }`}
                title={`Klik ${flower.name}`}
                onClick={() => selectGardenFlower(flower)}
                style={{
                  left: `${flower.left}%`,
                  fontSize: `${flower.size}px`,
                  "--flower-tilt": `${flower.tilt}deg`,
                }}
              >
                {flower.emoji}
              </button>
            ))}
          </div>
        </div>

        {selectedGardenFlower && (
          <div className="selected-flower-panel">
            <div className="selected-flower-info">
              <span className="selected-flower-icon">
                {selectedGardenFlower.emoji}
              </span>

              <div>
                <small>SELECTED FLOWER</small>
                <h3>{selectedGardenFlower.name}</h3>
                <p>Planted on {selectedGardenFlower.plantedDate}</p>
              </div>
            </div>

            <button
              type="button"
              className="remove-flower-button"
              onClick={removeFlower}
            >
              🌱 Copot bunga
            </button>
          </div>
        )}

        {!plantedToday ? (
          <div className="flower-shop">
            <span className="flower-shop-label">CHOOSE TODAY'S FLOWER</span>
            <h3>Which one should we plant?</h3>

            <div className="flower-choices">
              {flowers.map((flower) => (
                <button
                  key={flower.id}
                  className={`flower-choice ${
                    selectedFlower === flower.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFlower(flower.id)}
                >
                  <span>{flower.emoji}</span>
                  <p>{flower.name}</p>
                </button>
              ))}
            </div>

            <button
              className="plant-button"
              disabled={!selectedFlower}
              onClick={plantFlower}
            >
              Plant this flower 🌱
            </button>
          </div>
        ) : (
          <div className="planted-message">
            <span>🌷</span>

            <div>
              <small>TODAY'S FLOWER</small>
              <h3>Your flower has been planted!</h3>
              <p>Come back tomorrow and grow your garden a little more ♡</p>
            </div>
          </div>
        )}

        {newFlower && (
          <div className="garden-toast">
            <span>{newFlower.emoji}</span>

            <div>
              <strong>{newFlower.name} planted!</strong>
              <p>{newFlower.message}</p>
            </div>
          </div>
        )}

        <div className="garden-counter">
          <span>🌸</span>

          <p>
            Your garden has
            <strong> {garden.length} </strong>
            {garden.length === 1 ? "flower" : "flowers"}
          </p>
        </div>
      </section>
    </main>
  );
}

/* ========================================
   MAILBOX
======================================== */

function Mailbox({ goHome }) {
  const letters = [
    {
      id: "letter-1",
      icon: "🌷",
      category: "Little Reminder",
      title: "Little Reminder #01",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Pelan-pelan juga tetap maju. Nggak semua hal harus selesai sekaligus hari ini.",
    },
    {
      id: "letter-2",
      icon: "💧",
      category: "Little Reminder",
      title: "Little Reminder #02",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Tiny reminder: jangan lupa minum air dan kasih tubuhmu waktu buat istirahat.",
    },
    {
      id: "letter-3",
      icon: "🍚",
      category: "Little Reminder",
      title: "Little Reminder #03",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Kalau belum makan, ini pengingat kecil buat isi energi dulu sebelum lanjut aktivitas.",
    },
    {
      id: "letter-4",
      icon: "🌸",
      category: "Little Reminder",
      title: "Little Reminder #04",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Hari yang biasa saja tetap boleh dinikmati. Nggak harus selalu ada sesuatu yang besar.",
    },
    {
      id: "letter-5",
      icon: "🫧",
      category: "Little Reminder",
      title: "Little Reminder #05",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Kalau pikiran mulai penuh, coba bereskan satu hal kecil dulu. Satu saja sudah cukup.",
    },
    {
      id: "letter-6",
      icon: "🎀",
      category: "Little Reminder",
      title: "Little Reminder #06",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Jangan lupa simpan sedikit waktu hari ini buat sesuatu yang kamu suka.",
    },
    {
      id: "letter-7",
      icon: "☀️",
      category: "Little Reminder",
      title: "Little Reminder #07",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Coba lihat keluar sebentar. Mungkin ada langit, angin, atau cahaya yang lumayan bagus hari ini.",
    },
    {
      id: "letter-8",
      icon: "🧁",
      category: "Little Reminder",
      title: "Little Reminder #08",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Hadiah kecil buat diri sendiri sesekali boleh kok. Bahkan kalau cuma camilan favorit.",
    },
    {
      id: "letter-9",
      icon: "🌱",
      category: "Little Reminder",
      title: "Little Reminder #09",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Progress kecil tetap progress. Nggak perlu dibandingkan dengan punya orang lain.",
    },
    {
      id: "letter-10",
      icon: "🧸",
      category: "Little Reminder",
      title: "Little Reminder #10",
      preview: "A tiny reminder is waiting inside...",
      message:
        "Kalau capek, istirahat bukan berarti menyerah. Itu cuma isi ulang energi.",
    },
    {
      id: "letter-11",
      icon: "☁️",
      category: "Tiring Day",
      title: "For A Tiring Day #01",
      preview: "Open this when today feels a little tiring...",
      message:
        "Kalau hari ini terasa berat, nggak apa-apa untuk berjalan lebih pelan dari biasanya.",
    },
    {
      id: "letter-12",
      icon: "🌧️",
      category: "Tiring Day",
      title: "For A Tiring Day #02",
      preview: "Open this when today feels a little tiring...",
      message:
        "Hari yang kurang menyenangkan tetap akan selesai. Untuk sekarang, cukup lewati satu bagian demi satu.",
    },
    {
      id: "letter-13",
      icon: "🛏️",
      category: "Tiring Day",
      title: "For A Tiring Day #03",
      preview: "Open this when today feels a little tiring...",
      message:
        "Kalau badan dan pikiran minta istirahat, mungkin memang waktunya rebahan sebentar.",
    },
    {
      id: "letter-14",
      icon: "🫖",
      category: "Tiring Day",
      title: "For A Tiring Day #04",
      preview: "Open this when today feels a little tiring...",
      message:
        "Ambil minum hangat atau dingin yang kamu suka, lalu kasih dirimu beberapa menit tanpa buru-buru.",
    },
    {
      id: "letter-15",
      icon: "🌙",
      category: "Tiring Day",
      title: "For A Tiring Day #05",
      preview: "Open this when today feels a little tiring...",
      message:
        "Nggak semua masalah harus punya jawaban malam ini. Sebagian boleh dilanjutkan besok.",
    },
    {
      id: "letter-16",
      icon: "🍃",
      category: "Tiring Day",
      title: "For A Tiring Day #06",
      preview: "Open this when today feels a little tiring...",
      message:
        "Tarik napas biasa, lihat sekitar, dan fokus ke satu hal yang bisa kamu kerjakan sekarang.",
    },
    {
      id: "letter-17",
      icon: "🧸",
      category: "Tiring Day",
      title: "For A Tiring Day #07",
      preview: "Open this when today feels a little tiring...",
      message:
        "Virtual teddy sedang bertugas menjaga sudut kecil ini sampai harimu terasa lebih ringan.",
    },
    {
      id: "letter-18",
      icon: "🪴",
      category: "Tiring Day",
      title: "For A Tiring Day #08",
      preview: "Open this when today feels a little tiring...",
      message:
        "Kadang kita cuma perlu diam sebentar seperti tanaman di jendela. Nggak melakukan apa-apa juga boleh.",
    },
    {
      id: "letter-19",
      icon: "🧦",
      category: "Tiring Day",
      title: "For A Tiring Day #09",
      preview: "Open this when today feels a little tiring...",
      message:
        "Mode nyaman disarankan: pakaian paling enak, posisi paling santai, dan istirahat sebentar.",
    },
    {
      id: "letter-20",
      icon: "🌂",
      category: "Tiring Day",
      title: "For A Tiring Day #10",
      preview: "Open this when today feels a little tiring...",
      message:
        "Kalau hari ini seperti hujan, anggap surat ini payung kecil. Nggak menghentikan hujan, tapi menemani lewat.",
    },
    {
      id: "letter-21",
      icon: "✨",
      category: "Cheer Up",
      title: "Cheer Up #01",
      preview: "A small boost of energy is waiting...",
      message:
        "Semangat buat apa pun yang lagi kamu kerjakan. Nggak harus sempurna untuk bisa disebut bagus.",
    },
    {
      id: "letter-22",
      icon: "🚀",
      category: "Cheer Up",
      title: "Cheer Up #02",
      preview: "A small boost of energy is waiting...",
      message:
        "Satu langkah lagi! Bahkan langkah kecil tetap membuatmu lebih dekat daripada kemarin.",
    },
    {
      id: "letter-23",
      icon: "⭐",
      category: "Cheer Up",
      title: "Cheer Up #03",
      preview: "A small boost of energy is waiting...",
      message:
        "Ada banyak hal yang sudah berhasil kamu lewati sampai hari ini. Yang satu ini juga bisa dikerjakan pelan-pelan.",
    },
    {
      id: "letter-24",
      icon: "🎯",
      category: "Cheer Up",
      title: "Cheer Up #04",
      preview: "A small boost of energy is waiting...",
      message:
        "Fokus ke target terdekat dulu. Setelah selesai, baru lihat target berikutnya.",
    },
    {
      id: "letter-25",
      icon: "🌈",
      category: "Cheer Up",
      title: "Cheer Up #05",
      preview: "A small boost of energy is waiting...",
      message:
        "Semoga ada satu kejadian kecil hari ini yang bikin kamu senyum tanpa direncanakan.",
    },
    {
      id: "letter-26",
      icon: "🏁",
      category: "Cheer Up",
      title: "Cheer Up #06",
      preview: "A small boost of energy is waiting...",
      message:
        "Nggak perlu jadi yang paling cepat. Yang penting kamu tetap bergerak dengan ritmemu sendiri.",
    },
    {
      id: "letter-27",
      icon: "🎉",
      category: "Cheer Up",
      title: "Cheer Up #07",
      preview: "A small boost of energy is waiting...",
      message:
        "Tiny celebration! Kalau hari ini kamu menyelesaikan satu hal saja, itu tetap layak diapresiasi.",
    },
    {
      id: "letter-28",
      icon: "💫",
      category: "Cheer Up",
      title: "Cheer Up #08",
      preview: "A small boost of energy is waiting...",
      message:
        "Sedikit energi virtual dikirim ke sini. Gunakan seperlunya, sisanya simpan buat nanti.",
    },
    {
      id: "letter-29",
      icon: "🌻",
      category: "Cheer Up",
      title: "Cheer Up #09",
      preview: "A small boost of energy is waiting...",
      message:
        "Semoga mood hari ini bisa menghadap ke hal-hal baik seperti bunga menghadap cahaya.",
    },
    {
      id: "letter-30",
      icon: "🦋",
      category: "Cheer Up",
      title: "Cheer Up #10",
      preview: "A small boost of energy is waiting...",
      message:
        "Perubahan kecil kadang baru kelihatan setelah beberapa waktu. Tetap lanjutkan prosesnya.",
    },
    {
      id: "letter-31",
      icon: "🍓",
      category: "Random Cute",
      title: "Random Cute Note #01",
      preview: "No serious reason. Just open it...",
      message:
        "Breaking news: satu strawberry virtual ditemukan dan sekarang resmi menjadi milik halaman ini.",
    },
    {
      id: "letter-32",
      icon: "🐰",
      category: "Random Cute",
      title: "Random Cute Note #02",
      preview: "No serious reason. Just open it...",
      message:
        "Seekor kelinci virtual mampir. Dia nggak punya pesan penting, cuma ingin bilang halo.",
    },
    {
      id: "letter-33",
      icon: "🍪",
      category: "Random Cute",
      title: "Random Cute Note #03",
      preview: "No serious reason. Just open it...",
      message:
        "Cookie digital ini punya 0 kalori dan 100% tidak bisa dimakan. Tetap diterima ya.",
    },
    {
      id: "letter-34",
      icon: "🐣",
      category: "Random Cute",
      title: "Random Cute Note #04",
      preview: "No serious reason. Just open it...",
      message:
        "Peep peep! Surat ini dikirim oleh kurir paling kecil di Little World.",
    },
    {
      id: "letter-35",
      icon: "🎈",
      category: "Random Cute",
      title: "Random Cute Note #05",
      preview: "No serious reason. Just open it...",
      message:
        "Kalau surat ini punya suara, mungkin bunyinya seperti balon kecil yang mantul-mantul.",
    },
    {
      id: "letter-36",
      icon: "🍰",
      category: "Random Cute",
      title: "Random Cute Note #06",
      preview: "No serious reason. Just open it...",
      message:
        "Emergency cake delivery! Tidak ada ulang tahun pun tetap boleh ada kue virtual.",
    },
    {
      id: "letter-37",
      icon: "🐱",
      category: "Random Cute",
      title: "Random Cute Note #07",
      preview: "No serious reason. Just open it...",
      message:
        "Seekor kucing mengambil alih surat ini. Isi pesannya: meow. Sangat informatif.",
    },
    {
      id: "letter-38",
      icon: "🌼",
      category: "Random Cute",
      title: "Random Cute Note #08",
      preview: "No serious reason. Just open it...",
      message:
        "Bunga kecil muncul di mailbox. Sepertinya dia nyasar dari Flower Garden.",
    },
    {
      id: "letter-39",
      icon: "🫐",
      category: "Random Cute",
      title: "Random Cute Note #09",
      preview: "No serious reason. Just open it...",
      message:
        "Blueberry kecil ikut masuk walaupun tema website-nya pink. Kita izinkan sekali ini.",
    },
    {
      id: "letter-40",
      icon: "🎮",
      category: "Random Cute",
      title: "Random Cute Note #10",
      preview: "No serious reason. Just open it...",
      message:
        "Achievement unlocked: membuka surat random yang sebenarnya tidak punya tujuan penting.",
    },
    {
      id: "letter-41",
      icon: "🌙",
      category: "Night Letter",
      title: "Night Letter #01",
      preview: "A quiet note for the end of the day...",
      message:
        "Semoga setelah semua aktivitas hari ini, kamu bisa punya waktu istirahat yang tenang.",
    },
    {
      id: "letter-42",
      icon: "⭐",
      category: "Night Letter",
      title: "Night Letter #02",
      preview: "A quiet note for the end of the day...",
      message:
        "Kalau hari ini belum sesuai rencana, besok masih punya halaman kosong untuk dicoba lagi.",
    },
    {
      id: "letter-43",
      icon: "🛌",
      category: "Night Letter",
      title: "Night Letter #03",
      preview: "A quiet note for the end of the day...",
      message:
        "Saatnya mengurangi urusan dunia sebentar. Beberapa hal bisa menunggu sampai besok.",
    },
    {
      id: "letter-44",
      icon: "☕",
      category: "Night Letter",
      title: "Night Letter #04",
      preview: "A quiet note for the end of the day...",
      message:
        "Simpan pekerjaan yang masih bisa disimpan, rapikan sedikit, lalu kasih kepala waktu untuk istirahat.",
    },
    {
      id: "letter-45",
      icon: "🌌",
      category: "Night Letter",
      title: "Night Letter #05",
      preview: "A quiet note for the end of the day...",
      message:
        "Langit malam selalu datang tanpa terburu-buru. Mungkin malam ini juga bisa dijalani seperti itu.",
    },
    {
      id: "letter-46",
      icon: "🕯️",
      category: "Night Letter",
      title: "Night Letter #06",
      preview: "A quiet note for the end of the day...",
      message:
        "Mode malam: lampu lebih redup, suasana lebih tenang, dan sedikit waktu tanpa banyak pikiran.",
    },
    {
      id: "letter-47",
      icon: "💤",
      category: "Night Letter",
      title: "Night Letter #07",
      preview: "A quiet note for the end of the day...",
      message:
        "Kalau sudah mengantuk, surat ini secara resmi menyarankan berhenti scrolling dan mulai istirahat.",
    },
    {
      id: "letter-48",
      icon: "🌠",
      category: "Night Letter",
      title: "Night Letter #08",
      preview: "A quiet note for the end of the day...",
      message:
        "Semoga besok membawa setidaknya satu hal kecil yang menyenangkan dan tidak terduga.",
    },
    {
      id: "letter-49",
      icon: "🐑",
      category: "Night Letter",
      title: "Night Letter #09",
      preview: "A quiet note for the end of the day...",
      message:
        "Domba virtual nomor satu sudah lewat. Nggak perlu dihitung sampai seratus kok.",
    },
    {
      id: "letter-50",
      icon: "🌃",
      category: "Night Letter",
      title: "Night Letter #10",
      preview: "A quiet note for the end of the day...",
      message:
        "Good job for getting through today. Sekarang waktunya tutup hari ini dengan lebih tenang.",
    },
  ];

  const categories = [
    "All",
    "Little Reminder",
    "Tiring Day",
    "Cheer Up",
    "Random Cute",
    "Night Letter",
  ];

  const [readLetters, setReadLetters] = useState([]);
  const [activeLetter, setActiveLetter] = useState(null);
  const [openingLetter, setOpeningLetter] = useState(null);
  const [filter, setFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("little-world-mailbox-read");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) setReadLetters(parsed);
    } catch {
      localStorage.removeItem("little-world-mailbox-read");
    }
  }, []);

  function openLetter(letter) {
    if (openingLetter) return;
    setOpeningLetter(letter.id);

    setTimeout(() => {
      playTinySound("letter");
      setActiveLetter(letter);
      setOpeningLetter(null);

      if (!readLetters.includes(letter.id)) {
        const updated = [...readLetters, letter.id];
        setReadLetters(updated);
        localStorage.setItem(
          "little-world-mailbox-read",
          JSON.stringify(updated),
        );
      }
    }, 420);
  }

  const filteredLetters = letters.filter((letter) => {
    const categoryMatch = filter === "All" || letter.category === filter;
    const isRead = readLetters.includes(letter.id);
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Unread" && !isRead) ||
      (statusFilter === "Opened" && isRead);

    return categoryMatch && statusMatch;
  });

  const openedCount = letters.filter((letter) =>
    readLetters.includes(letter.id),
  ).length;

  return (
    <main className="mailbox-page">
      <div className="mailbox-cloud mailbox-cloud-one">☁️</div>
      <div className="mailbox-cloud mailbox-cloud-two">☁️</div>
      <div className="mailbox-heart mailbox-heart-one">♡</div>
      <div className="mailbox-heart mailbox-heart-two">♡</div>

      <section className="mailbox-container">
        <button className="back-button" onClick={goHome}>
          ← Back to my world
        </button>

        <div className="mailbox-heading">
          <div className="mailbox-main-icon">💌</div>
          <span>YOUR LITTLE MAILBOX</span>
          <h2>
            Fifty tiny notes
            <br />
            <em>are waiting.</em>
          </h2>
          <p>
            Pick a category, open an envelope, and keep your favorites here
            whenever you want to read them again.
          </p>

          <div className="mailbox-progress">
            <div className="mailbox-progress-top">
              <span>LETTER COLLECTION</span>
              <strong>{openedCount} / 50 opened</strong>
            </div>
            <div className="mailbox-progress-track">
              <span style={{ width: `${(openedCount / 50) * 100}%` }}></span>
            </div>
          </div>
        </div>

        <div className="mailbox-filter-panel">
          <div className="mailbox-status-filters">
            {["All", "Unread", "Opened"].map((item) => (
              <button
                type="button"
                key={item}
                className={statusFilter === item ? "active" : ""}
                onClick={() => setStatusFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mailbox-category-filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={filter === category ? "active" : ""}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mailbox-shell">
          <div className="mailbox-flag">
            <span></span>
          </div>
          <div className="mailbox-slot"></div>

          <div className="mailbox-results-line">
            <span>💌</span>
            Showing <strong>{filteredLetters.length}</strong> letters
          </div>

          <div className="mailbox-letter-grid">
            {filteredLetters.map((letter) => {
              const isRead = readLetters.includes(letter.id);
              const isOpening = openingLetter === letter.id;

              return (
                <button
                  type="button"
                  key={letter.id}
                  className={`mail-envelope ${isRead ? "read" : "unread"} ${isOpening ? "opening" : ""}`}
                  onClick={() => openLetter(letter)}
                  disabled={Boolean(openingLetter)}
                >
                  {!isRead && <span className="unread-dot"></span>}

                  <div className="envelope-stamp">
                    <span>{letter.icon}</span>
                    <small>
                      {letter.id.replace("letter-", "").padStart(2, "0")}
                    </small>
                  </div>

                  <div className="envelope-flap"></div>

                  <div className="envelope-content">
                    <small>{letter.category.toUpperCase()}</small>
                    <h3>{letter.title}</h3>
                    <p>{letter.preview}</p>
                  </div>

                  <span className="envelope-open-text">
                    {isOpening
                      ? "opening..."
                      : isRead
                        ? "read again →"
                        : "open →"}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredLetters.length === 0 && (
            <div className="mailbox-empty">
              <span>📭</span>
              <h3>No letters here yet.</h3>
              <p>Try another filter and your letters will appear again.</p>
            </div>
          )}
        </div>

        <div className="mailbox-footer-note">
          <span>🌸</span>
          opened letters stay in your collection
          <span>🌸</span>
        </div>
      </section>

      {activeLetter && (
        <div
          className="letter-modal-backdrop"
          onClick={() => setActiveLetter(null)}
        >
          <article
            className="opened-letter"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="letter-close"
              onClick={() => setActiveLetter(null)}
              aria-label="Close letter"
            >
              ×
            </button>

            <div className="opened-letter-stamp">{activeLetter.icon}</div>
            <span className="opened-letter-label">{activeLetter.category}</span>
            <h3>{activeLetter.title}</h3>
            <div className="letter-divider">♡</div>
            <p>{activeLetter.message}</p>

            <button
              type="button"
              className="keep-letter-button"
              onClick={() => setActiveLetter(null)}
            >
              Keep this letter 💌
            </button>
          </article>
        </div>
      )}
    </main>
  );
}
/* ========================================
   MY ROOM
======================================== */

function MyRoom({ goHome }) {
  const defaults = {
    lampOn: true,
    curtainsOpen: true,
    fairyLightsOn: true,
    plushie: "bunny",
    picture: "flower",
  };

  const [room, setRoom] = useState(defaults);
  const [message, setMessage] = useState(
    "Tap the room objects or use the controls below ✨",
  );

  useEffect(() => {
    const savedRoom = localStorage.getItem("little-world-room");

    if (!savedRoom) return;

    try {
      const parsedRoom = JSON.parse(savedRoom);
      setRoom({ ...defaults, ...parsedRoom });
    } catch {
      localStorage.removeItem("little-world-room");
    }
  }, []);

  function saveRoom(updatedRoom, text) {
    setRoom(updatedRoom);
    setMessage(text);
    localStorage.setItem("little-world-room", JSON.stringify(updatedRoom));
  }

  function toggleLamp() {
    saveRoom(
      { ...room, lampOn: !room.lampOn },
      room.lampOn
        ? "Lamp off. Cozy night mode activated 🌙"
        : "The bedside lamp is glowing again ✨",
    );
  }

  function toggleCurtains() {
    saveRoom(
      { ...room, curtainsOpen: !room.curtainsOpen },
      room.curtainsOpen
        ? "Curtains closed. Extra cozy mode ☁️"
        : "Curtains opened. Hello, pink sky! 🌤️",
    );
  }

  function toggleFairyLights() {
    saveRoom(
      { ...room, fairyLightsOn: !room.fairyLightsOn },
      room.fairyLightsOn
        ? "Fairy lights are resting for a while."
        : "Tiny fairy lights are sparkling again ✨",
    );
  }

  function changePlushie() {
    const plushies = ["bunny", "bear", "cat"];
    const current = plushies.indexOf(room.plushie);
    const next = plushies[(current + 1) % plushies.length];

    saveRoom(
      { ...room, plushie: next },
      "A different little friend is sitting on the bed 🧸",
    );
  }

  function changePicture() {
    const pictures = ["flower", "cloud", "strawberry"];
    const current = pictures.indexOf(room.picture);
    const next = pictures[(current + 1) % pictures.length];

    saveRoom({ ...room, picture: next }, "The wall picture has a new look 🎀");
  }

  const plushieEmoji = {
    bunny: "🐰",
    bear: "🧸",
    cat: "🐱",
  };

  const pictureEmoji = {
    flower: "🌷",
    cloud: "☁️",
    strawberry: "🍓",
  };

  return (
    <main
      className={`room-page ${
        room.lampOn ? "room-light-mode" : "room-night-mode"
      }`}
    >
      <div className="room-background-heart room-heart-one">♡</div>
      <div className="room-background-heart room-heart-two">♡</div>

      <section className="room-container">
        <button className="back-button" onClick={goHome}>
          ← Back to my world
        </button>

        <div className="room-heading">
          <span>MY ROOM</span>

          <h2>
            Welcome to your
            <br />
            <em>cozy little room.</em>
          </h2>

          <p>
            Turn on the lights, move the curtains, change the plushie, and make
            this tiny room feel just right.
          </p>
        </div>

        <div className="bedroom">
          <div className="room-wall-pattern"></div>

          <div
            className={`room-window ${
              room.curtainsOpen ? "curtains-open" : "curtains-closed"
            }`}
          >
            <div className="window-view">
              <span className="window-moon">☾</span>
              <span className="window-cloud">☁️</span>
              <span className="window-sparkle window-sparkle-one">✦</span>
              <span className="window-sparkle window-sparkle-two">✧</span>
            </div>

            <button
              type="button"
              className="room-curtain room-curtain-left"
              onClick={toggleCurtains}
              aria-label="Toggle curtains"
            ></button>

            <button
              type="button"
              className="room-curtain room-curtain-right"
              onClick={toggleCurtains}
              aria-label="Toggle curtains"
            ></button>
          </div>

          <button
            type="button"
            className="room-picture"
            onClick={changePicture}
            aria-label="Change wall picture"
          >
            <span>{pictureEmoji[room.picture]}</span>
          </button>

          <div
            className={`room-fairy-lights ${
              room.fairyLightsOn ? "lights-on" : "lights-off"
            }`}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index}></span>
            ))}
          </div>

          <button
            type="button"
            className="fairy-light-button"
            onClick={toggleFairyLights}
            aria-label="Toggle fairy lights"
          >
            ✨
          </button>

          <div className="room-floor"></div>
          <div className="room-rug"></div>

          <div className="room-bed">
            <div className="bed-headboard"></div>

            <div className="bed-frame">
              <div className="bed-pillow"></div>
              <div className="bed-blanket"></div>

              <button
                type="button"
                className="room-plushie"
                onClick={changePlushie}
                aria-label="Change plushie"
              >
                {plushieEmoji[room.plushie]}
              </button>
            </div>

            <span className="bed-leg bed-leg-left"></span>
            <span className="bed-leg bed-leg-right"></span>
          </div>

          <div className="room-side-table">
            <div className="side-table-drawer">
              <span></span>
            </div>

            <button
              type="button"
              className={`room-lamp ${room.lampOn ? "lamp-on" : "lamp-off"}`}
              onClick={toggleLamp}
              aria-label="Toggle lamp"
            >
              <span className="room-lamp-glow"></span>
              <span className="room-lamp-shade"></span>
              <span className="room-lamp-neck"></span>
              <span className="room-lamp-base"></span>
            </button>
          </div>

          <div className="room-books">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="room-plant">
            <span className="room-leaf room-leaf-one"></span>
            <span className="room-leaf room-leaf-two"></span>
            <span className="room-leaf room-leaf-three"></span>
            <span className="room-plant-pot"></span>
          </div>
        </div>

        <div className="room-message">
          <span>✨</span>
          <p>{message}</p>
        </div>

        <div className="room-controls">
          <button type="button" onClick={toggleLamp}>
            <span>💡</span>
            <div>
              <small>LAMP</small>
              <strong>{room.lampOn ? "Turn off" : "Turn on"}</strong>
            </div>
          </button>

          <button type="button" onClick={toggleCurtains}>
            <span>🪟</span>
            <div>
              <small>CURTAINS</small>
              <strong>{room.curtainsOpen ? "Close" : "Open"}</strong>
            </div>
          </button>

          <button type="button" onClick={toggleFairyLights}>
            <span>✨</span>
            <div>
              <small>FAIRY LIGHTS</small>
              <strong>{room.fairyLightsOn ? "Turn off" : "Turn on"}</strong>
            </div>
          </button>

          <button type="button" onClick={changePlushie}>
            <span>{plushieEmoji[room.plushie]}</span>
            <div>
              <small>PLUSHIE</small>
              <strong>Change friend</strong>
            </div>
          </button>

          <button type="button" onClick={changePicture}>
            <span>{pictureEmoji[room.picture]}</span>
            <div>
              <small>WALL ART</small>
              <strong>Change picture</strong>
            </div>
          </button>
        </div>

        <div className="room-save-note">
          <span>♡</span>
          Your room remembers how you left it
          <span>♡</span>
        </div>
      </section>
    </main>
  );
}

/* ========================================
   HAPPY ARCADE
======================================== */

function HappyArcade({ goHome }) {
  const [game, setGame] = useState("menu");

  // GAME 01 — CATCH THE HEARTS
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [playing, setPlaying] = useState(false);
  const [heart, setHeart] = useState({ left: 50, top: 50, emoji: "💗" });
  const [pop, setPop] = useState(false);

  // GAME 02 — MEMORY MATCH
  const memoryIcons = ["🌷", "🍓", "🐰", "☁️", "🎀", "🧸"];
  const [memoryCards, setMemoryCards] = useState([]);
  const [memoryOpen, setMemoryOpen] = useState([]);
  const [memoryMatched, setMemoryMatched] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryBest, setMemoryBest] = useState(0);
  const [memoryLocked, setMemoryLocked] = useState(false);

  // GAME 03 — PINK HOOP
  const [hoopPlaying, setHoopPlaying] = useState(false);
  const [hoopScore, setHoopScore] = useState(0);
  const [hoopBest, setHoopBest] = useState(0);
  const [hoopTime, setHoopTime] = useState(30);
  const [hoopCombo, setHoopCombo] = useState(0);
  const [hoopX, setHoopX] = useState(50);
  const [ballX, setBallX] = useState(50);
  const [ballY, setBallY] = useState(84);
  const [ballFlying, setBallFlying] = useState(false);
  const [shotResult, setShotResult] = useState("");
  const [aimX, setAimX] = useState(50);
  const [dragStart, setDragStart] = useState(null);

  const heartEmojis = ["💗", "💖", "💕", "💓", "🌷", "⭐"];

  useEffect(() => {
    setHighScore(
      Number(localStorage.getItem("little-world-arcade-heart-highscore") || 0),
    );
    setMemoryBest(
      Number(localStorage.getItem("little-world-memory-best") || 0),
    );
    setHoopBest(
      Number(localStorage.getItem("little-world-pink-hoop-best") || 0),
    );
  }, []);

  useEffect(() => {
    if (!playing || game !== "catch") return;

    if (timeLeft <= 0) {
      setPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(
          "little-world-arcade-heart-highscore",
          String(score),
        );
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [playing, timeLeft, score, highScore, game]);

  useEffect(() => {
    if (!hoopPlaying || game !== "hoop") return;

    if (hoopTime <= 0) {
      setHoopPlaying(false);
      setBallFlying(false);
      return;
    }

    const timer = setTimeout(() => {
      setHoopTime((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [hoopPlaying, hoopTime, game]);

  function moveHeart() {
    setHeart({
      left: 8 + Math.random() * 82,
      top: 10 + Math.random() * 75,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    });
  }

  function startCatch() {
    setScore(0);
    setTimeLeft(20);
    setPlaying(true);
    setPop(false);
    moveHeart();
  }

  function catchHeart() {
    if (!playing) return;
    const nextScore = score + 1;
    setScore(nextScore);
    setPop(true);

    if (nextScore > highScore) {
      setHighScore(nextScore);
      localStorage.setItem(
        "little-world-arcade-heart-highscore",
        String(nextScore),
      );
    }

    setTimeout(() => setPop(false), 130);
    moveHeart();
  }

  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function startMemory() {
    const deck = shuffle(
      [...memoryIcons, ...memoryIcons].map((icon, index) => ({
        id: `${Date.now()}-${index}-${Math.random()}`,
        icon,
      })),
    );

    setMemoryCards(deck);
    setMemoryOpen([]);
    setMemoryMatched([]);
    setMemoryMoves(0);
    setMemoryLocked(false);
  }

  function flipMemory(card) {
    if (
      memoryLocked ||
      memoryOpen.includes(card.id) ||
      memoryMatched.includes(card.id)
    )
      return;

    const nextOpen = [...memoryOpen, card.id];
    setMemoryOpen(nextOpen);

    if (nextOpen.length === 2) {
      setMemoryMoves((current) => current + 1);
      setMemoryLocked(true);

      const first = memoryCards.find((item) => item.id === nextOpen[0]);
      const second = memoryCards.find((item) => item.id === nextOpen[1]);

      if (first?.icon === second?.icon) {
        const nextMatched = [...memoryMatched, first.id, second.id];

        setTimeout(() => {
          setMemoryMatched(nextMatched);
          setMemoryOpen([]);
          setMemoryLocked(false);

          if (nextMatched.length === memoryCards.length) {
            const finalMoves = memoryMoves + 1;
            if (memoryBest === 0 || finalMoves < memoryBest) {
              setMemoryBest(finalMoves);
              localStorage.setItem(
                "little-world-memory-best",
                String(finalMoves),
              );
            }
          }
        }, 450);
      } else {
        setTimeout(() => {
          setMemoryOpen([]);
          setMemoryLocked(false);
        }, 850);
      }
    }
  }

  function openMemoryGame() {
    setGame("memory");
    startMemory();
  }

  function startHoop() {
    setHoopScore(0);
    setHoopTime(30);
    setHoopCombo(0);
    setHoopX(50);
    setAimX(50);
    setBallX(50);
    setBallY(84);
    setBallFlying(false);
    setShotResult("");
    setDragStart(null);
    setHoopPlaying(true);
  }

  function resetBall() {
    setBallX(50);
    setBallY(84);
    setBallFlying(false);
    setAimX(50);
  }

  function shootHoop(targetX = aimX, power = 1) {
    if (!hoopPlaying || ballFlying || hoopTime <= 0) return;

    const clampedTarget = Math.max(10, Math.min(90, targetX));
    const accuracyWindow = Math.max(5.5, 10 - hoopScore * 0.12);
    const distance = Math.abs(clampedTarget - hoopX);
    const powerGood = power >= 0.55;
    const made = distance <= accuracyWindow && powerGood;

    setBallFlying(true);
    setBallX(clampedTarget);
    setBallY(25);
    setShotResult("");

    setTimeout(() => {
      if (made) {
        const nextCombo = hoopCombo + 1;
        const points = nextCombo >= 3 ? 2 : 1;
        const nextScore = hoopScore + points;

        setHoopCombo(nextCombo);
        setHoopScore(nextScore);
        setShotResult(nextCombo >= 3 ? `SWISH! +${points} 🔥` : "SWISH! ✨");

        if (nextScore > hoopBest) {
          setHoopBest(nextScore);
          localStorage.setItem(
            "little-world-pink-hoop-best",
            String(nextScore),
          );
        }

        if (nextScore >= 3) {
          setHoopX(18 + Math.random() * 64);
        }
      } else {
        setHoopCombo(0);
        setShotResult("SO CLOSE! 🏀");
      }

      setBallY(made ? 38 : 48);

      setTimeout(() => {
        resetBall();
        setShotResult("");
      }, 600);
    }, 520);
  }

  function handleCourtPointerMove(event) {
    if (!hoopPlaying || ballFlying) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    setAimX(Math.max(8, Math.min(92, x)));
  }

  function handleBallPointerDown(event) {
    if (!hoopPlaying || ballFlying) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDragStart({
      x: event.clientX,
      y: event.clientY,
    });
  }

  function handleBallPointerUp(event) {
    if (!dragStart || !hoopPlaying || ballFlying) return;

    const dx = event.clientX - dragStart.x;
    const dy = dragStart.y - event.clientY;
    const court = event.currentTarget.closest(".hoop-court");
    const width = court?.getBoundingClientRect().width || 400;

    const swipeTarget = 50 + (dx / width) * 100;
    const power = Math.max(0, Math.min(1.3, dy / 100));

    setDragStart(null);

    if (dy > 25) {
      setAimX(Math.max(8, Math.min(92, swipeTarget)));
      shootHoop(swipeTarget, power);
    }
  }

  function backToArcade() {
    setPlaying(false);
    setHoopPlaying(false);
    setGame("menu");
    setScore(0);
    setTimeLeft(20);
  }

  if (game === "catch") {
    return (
      <main className="arcade-page">
        <section className="arcade-container">
          <button className="back-button" onClick={backToArcade}>
            ← Back to arcade
          </button>

          <div className="arcade-heading catch-heading">
            <span>HAPPY ARCADE · GAME 01</span>
            <h2>
              Catch the
              <br />
              <em>tiny hearts!</em>
            </h2>
            <p>
              Catch as many hearts as you can before the timer reaches zero.
            </p>
          </div>

          <div className="catch-stats">
            <div>
              <small>SCORE</small>
              <strong>{score}</strong>
            </div>
            <div className={timeLeft <= 5 && playing ? "timer-warning" : ""}>
              <small>TIME</small>
              <strong>{timeLeft}s</strong>
            </div>
            <div>
              <small>BEST</small>
              <strong>{highScore}</strong>
            </div>
          </div>

          <div className="catch-game">
            <div className="catch-cloud catch-cloud-one">☁️</div>
            <div className="catch-cloud catch-cloud-two">☁️</div>
            <div className="catch-flower catch-flower-one">🌷</div>
            <div className="catch-flower catch-flower-two">🌸</div>

            {!playing && timeLeft === 20 && (
              <div className="catch-overlay">
                <span className="catch-big-icon">💗</span>
                <h3>Ready to catch?</h3>
                <p>You have 20 seconds. Tap every heart you see!</p>
                <button type="button" onClick={startCatch}>
                  Start game 🎮
                </button>
              </div>
            )}

            {!playing && timeLeft === 0 && (
              <div className="catch-overlay">
                <span className="catch-big-icon">🏆</span>
                <small>TIME'S UP!</small>
                <h3>You caught {score} hearts!</h3>
                <p>
                  Best score: <strong>{highScore}</strong>
                </p>
                <button type="button" onClick={startCatch}>
                  Play again ↻
                </button>
              </div>
            )}

            {playing && (
              <button
                type="button"
                className={`catch-target ${pop ? "caught-pop" : ""}`}
                style={{ left: `${heart.left}%`, top: `${heart.top}%` }}
                onClick={catchHeart}
              >
                {heart.emoji}
              </button>
            )}
          </div>

          <div className="catch-tip">
            ✨ Your best score is saved automatically!
          </div>
        </section>
      </main>
    );
  }

  if (game === "memory") {
    const completed =
      memoryCards.length > 0 && memoryMatched.length === memoryCards.length;

    return (
      <main className="arcade-page">
        <section className="arcade-container">
          <button className="back-button" onClick={backToArcade}>
            ← Back to arcade
          </button>

          <div className="arcade-heading catch-heading">
            <span>HAPPY ARCADE · GAME 02</span>
            <h2>
              Memory
              <br />
              <em>Match.</em>
            </h2>
            <p>Flip the cards and find all six matching pairs.</p>
          </div>

          <div className="memory-stats">
            <div>
              <small>MOVES</small>
              <strong>{memoryMoves}</strong>
            </div>
            <div>
              <small>PAIRS</small>
              <strong>{memoryMatched.length / 2} / 6</strong>
            </div>
            <div>
              <small>BEST</small>
              <strong>{memoryBest || "—"}</strong>
            </div>
          </div>

          <div className="memory-board">
            {memoryCards.map((card) => {
              const visible =
                memoryOpen.includes(card.id) || memoryMatched.includes(card.id);

              return (
                <button
                  type="button"
                  key={card.id}
                  className={`memory-card ${visible ? "flipped" : ""} ${
                    memoryMatched.includes(card.id) ? "matched" : ""
                  }`}
                  onClick={() => flipMemory(card)}
                >
                  <span className="memory-card-inner">
                    <span className="memory-card-back">♡</span>
                    <span className="memory-card-front">{card.icon}</span>
                  </span>
                </button>
              );
            })}

            {completed && (
              <div className="memory-complete">
                <span>🎉</span>
                <small>ALL MATCHED!</small>
                <h3>{memoryMoves} moves</h3>
                <p>
                  {memoryBest === memoryMoves
                    ? "New best score! ✨"
                    : `Best score: ${memoryBest} moves`}
                </p>
                <button type="button" onClick={startMemory}>
                  Play again ↻
                </button>
              </div>
            )}
          </div>

          <button className="memory-reset" type="button" onClick={startMemory}>
            Shuffle & restart
          </button>
        </section>
      </main>
    );
  }

  if (game === "hoop") {
    return (
      <main className="arcade-page">
        <section className="arcade-container">
          <button className="back-button" onClick={backToArcade}>
            ← Back to arcade
          </button>

          <div className="arcade-heading hoop-heading">
            <span>HAPPY ARCADE · GAME 03</span>
            <h2>
              Pink
              <br />
              <em>Hoop.</em>
            </h2>
            <p>
              Aim for the basket and score as many shots as you can in 30
              seconds.
            </p>
          </div>

          <div className="hoop-stats">
            <div>
              <small>SCORE</small>
              <strong>{hoopScore}</strong>
            </div>
            <div
              className={hoopTime <= 5 && hoopPlaying ? "timer-warning" : ""}
            >
              <small>TIME</small>
              <strong>{hoopTime}s</strong>
            </div>
            <div>
              <small>COMBO</small>
              <strong>{hoopCombo}🔥</strong>
            </div>
            <div>
              <small>BEST</small>
              <strong>{hoopBest}</strong>
            </div>
          </div>

          <div className="hoop-court" onPointerMove={handleCourtPointerMove}>
            <div className="court-light court-light-one"></div>
            <div className="court-light court-light-two"></div>
            <div className="court-title">LITTLE WORLD COURT</div>

            <div className="basketball-hoop" style={{ left: `${hoopX}%` }}>
              <div className="hoop-board">
                <span className="board-square"></span>
              </div>
              <div className="hoop-rim"></div>
              <div className="hoop-net">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="hoop-pole"></div>
            </div>

            {hoopPlaying && !ballFlying && (
              <div
                className="aim-guide"
                style={{
                  left: `${aimX}%`,
                  "--guide-x": `${hoopX - aimX}%`,
                }}
              >
                <span>⌃</span>
                <small>AIM</small>
              </div>
            )}

            <button
              type="button"
              className={`basketball-ball ${ballFlying ? "flying" : ""}`}
              style={{
                left: `${ballX}%`,
                top: `${ballY}%`,
              }}
              onPointerDown={handleBallPointerDown}
              onPointerUp={handleBallPointerUp}
              disabled={!hoopPlaying || ballFlying}
              aria-label="Basketball. Swipe upward to shoot."
            >
              🏀
            </button>

            {shotResult && (
              <div
                className={`shot-result ${shotResult.includes("SWISH") ? "made" : "missed"}`}
              >
                {shotResult}
              </div>
            )}

            {!hoopPlaying && hoopTime === 30 && hoopScore === 0 && (
              <div className="hoop-overlay">
                <span className="hoop-big-icon">🏀</span>
                <h3>Ready to shoot?</h3>
                <p>
                  <strong>HP:</strong> swipe the ball upward toward the ring.
                  <br />
                  <strong>Laptop:</strong> move the mouse to aim, then click
                  SHOOT.
                </p>
                <button type="button" onClick={startHoop}>
                  Start challenge 🏀
                </button>
              </div>
            )}

            {!hoopPlaying && hoopTime === 0 && (
              <div className="hoop-overlay">
                <span className="hoop-big-icon">🏆</span>
                <small>BUZZER!</small>
                <h3>{hoopScore} points!</h3>
                <p>
                  Best score: <strong>{hoopBest}</strong>
                </p>
                <button type="button" onClick={startHoop}>
                  Play again ↻
                </button>
              </div>
            )}

            <div className="court-floor">
              <span className="court-circle"></span>
              <span className="court-line"></span>
            </div>
          </div>

          <div className="hoop-controls">
            <div className="hoop-control-copy">
              <span>🏀</span>
              <div>
                <strong>HP: swipe up</strong>
                <small>Laptop: arahkan mouse lalu tekan shoot</small>
              </div>
            </div>

            <button
              type="button"
              className="hoop-shoot-button"
              onClick={() => shootHoop(aimX, 1)}
              disabled={!hoopPlaying || ballFlying}
            >
              SHOOT 🏀
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="arcade-page">
      <div className="arcade-bg-icon arcade-bg-one">✦</div>
      <div className="arcade-bg-icon arcade-bg-two">♡</div>
      <div className="arcade-bg-icon arcade-bg-three">✧</div>

      <section className="arcade-container">
        <button className="back-button" onClick={goHome}>
          ← Back to my world
        </button>

        <div className="arcade-heading">
          <div className="arcade-main-icon">🎮</div>
          <span>HAPPY ARCADE</span>
          <h2>
            Tiny games for
            <br />
            <em>a little break.</em>
          </h2>
          <p>Three different tiny games. Pick one and have a little fun.</p>
        </div>

        <div className="arcade-games">
          <button
            type="button"
            className="arcade-game-card playable"
            onClick={() => setGame("catch")}
          >
            <div className="game-card-top">
              <span className="game-number">GAME 01</span>
              <span className="game-status ready">PLAY NOW</span>
            </div>
            <div className="game-icon">💗</div>
            <h3>Catch the Hearts</h3>
            <p>
              Catch as many tiny hearts as possible before the timer runs out.
            </p>
            <div className="game-best">
              🏆 Best score: <strong>{highScore}</strong>
            </div>
            <span className="game-play-button">Play game →</span>
          </button>

          <button
            type="button"
            className="arcade-game-card playable"
            onClick={openMemoryGame}
          >
            <div className="game-card-top">
              <span className="game-number">GAME 02</span>
              <span className="game-status ready">PLAY NOW</span>
            </div>
            <div className="game-icon">🧠</div>
            <h3>Memory Match</h3>
            <p>Flip cute cards and find all six matching pairs.</p>
            <div className="game-best">
              🏆 Best moves: <strong>{memoryBest || "—"}</strong>
            </div>
            <span className="game-play-button">Play game →</span>
          </button>

          <button
            type="button"
            className="arcade-game-card playable hoop-card"
            onClick={() => setGame("hoop")}
          >
            <div className="game-card-top">
              <span className="game-number">GAME 03</span>
              <span className="game-status ready">PLAY NOW</span>
            </div>
            <div className="game-icon">🏀</div>
            <h3>Pink Hoop</h3>
            <p>Aim, shoot, build your combo, and beat the 30-second buzzer.</p>
            <div className="game-best">
              🏆 Best score: <strong>{hoopBest}</strong>
            </div>
            <span className="game-play-button">Play game →</span>
          </button>
        </div>

        <div className="arcade-footer-note">
          <span>🌷</span>
          speed · memory · basketball
          <span>🌷</span>
        </div>
      </section>
    </main>
  );
}
/* ========================================
   MY LITTLE PET
======================================== */

function LittlePet({ goHome }) {
  const PET_KEY = "little-world-pet";

  const pets = {
    bunny: {
      name: "Bunny",
      emoji: "🐰",
      sleep: "😴",
      favorite: "🥕",
    },
    kitty: {
      name: "Kitty",
      emoji: "🐱",
      sleep: "😴",
      favorite: "🐟",
    },
    bear: {
      name: "Bear",
      emoji: "🐻",
      sleep: "😴",
      favorite: "🍯",
    },
  };

  const defaultPet = {
    chosen: false,
    type: "bunny",
    name: "",
    hunger: 78,
    happiness: 82,
    energy: 76,
    sleeping: false,
    lastUpdated: Date.now(),
    treats: 0,
  };

  const [pet, setPet] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PET_KEY));
      return saved ? { ...defaultPet, ...saved, sleeping: false } : defaultPet;
    } catch {
      return defaultPet;
    }
  });

  const [message, setMessage] = useState(
    "Your tiny friend is waiting for you ♡",
  );
  const [action, setAction] = useState("");
  const [nameDraft, setNameDraft] = useState("");
  const [selectedType, setSelectedType] = useState("bunny");

  useEffect(() => {
    if (!pet.chosen) return;

    const now = Date.now();
    const previous = Number(pet.lastUpdated || now);
    const hoursAway = Math.min(24, Math.max(0, (now - previous) / 3600000));

    if (hoursAway >= 0.08) {
      setPet((current) => ({
        ...current,
        hunger: Math.max(12, Math.round(current.hunger - hoursAway * 3)),
        happiness: Math.max(
          15,
          Math.round(current.happiness - hoursAway * 1.7),
        ),
        energy: Math.max(12, Math.round(current.energy - hoursAway * 2.2)),
        lastUpdated: now,
      }));
    }
    // Run once to account for time away.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pet.chosen) return;
    localStorage.setItem(
      PET_KEY,
      JSON.stringify({ ...pet, lastUpdated: Date.now(), sleeping: false }),
    );
  }, [pet]);

  function clamp(value) {
    return Math.max(0, Math.min(100, value));
  }

  function choosePet() {
    const cleanName = nameDraft.trim().slice(0, 14);
    setPet({
      ...defaultPet,
      chosen: true,
      type: selectedType,
      name: cleanName || pets[selectedType].name,
      lastUpdated: Date.now(),
    });
    setMessage("Yay! Your tiny friend has moved into Little World ✨");
    setAction("hello");
    setTimeout(() => setAction(""), 700);
  }

  function doAction(kind) {
    if (pet.sleeping && kind !== "sleep") {
      setMessage(`${pet.name} is sleeping right now... shhh 💤`);
      return;
    }

    if (kind === "feed") {
      if (pet.hunger >= 96) {
        setMessage(`${pet.name} is already full 🍓`);
        return;
      }

      setPet((current) => ({
        ...current,
        hunger: clamp(current.hunger + 20),
        happiness: clamp(current.happiness + 3),
      }));
      setMessage(`${pet.name} enjoyed the snack! nom nom ♡`);
      setAction("eat");
    }

    if (kind === "play") {
      if (pet.energy < 18) {
        setMessage(`${pet.name} is too sleepy to play. Maybe a nap first? 💤`);
        return;
      }

      setPet((current) => ({
        ...current,
        happiness: clamp(current.happiness + 18),
        energy: clamp(current.energy - 10),
        hunger: clamp(current.hunger - 5),
      }));
      setMessage(`${pet.name} had so much fun! ✨`);
      setAction("play");
    }

    if (kind === "sleep") {
      if (!pet.sleeping && pet.energy >= 95) {
        setMessage(`${pet.name} isn't sleepy yet ☀️`);
        return;
      }

      if (pet.sleeping) {
        setPet((current) => ({
          ...current,
          sleeping: false,
          energy: clamp(current.energy + 28),
        }));
        setMessage(`${pet.name} woke up feeling refreshed! ☀️`);
        setAction("wake");
      } else {
        setPet((current) => ({ ...current, sleeping: true }));
        setMessage(`${pet.name} is taking a cozy little nap 💤`);
        setAction("sleep");
      }
    }

    if (kind === "pet") {
      setPet((current) => ({
        ...current,
        happiness: clamp(current.happiness + 7),
      }));
      setMessage(`${pet.name} looks extra happy now ♡`);
      setAction("pet");
    }

    setTimeout(() => setAction(""), 650);
  }

  function giveTreat() {
    if (pet.sleeping) {
      setMessage(`${pet.name} is dreaming right now 💤`);
      return;
    }

    setPet((current) => ({
      ...current,
      hunger: clamp(current.hunger + 10),
      happiness: clamp(current.happiness + 10),
      treats: current.treats + 1,
    }));
    setMessage(`Bonus treat for ${pet.name}! ${pets[pet.type].favorite} ✨`);
    setAction("treat");
    setTimeout(() => setAction(""), 650);
  }

  function statusText() {
    if (pet.sleeping) return "sleeping peacefully";
    if (pet.hunger < 30) return "a little hungry";
    if (pet.energy < 30) return "getting sleepy";
    if (pet.happiness < 35) return "needs some playtime";
    if (pet.happiness > 85 && pet.hunger > 65) return "super happy today!";
    return "feeling cozy";
  }

  function barClass(value) {
    if (value < 30) return "low";
    if (value < 60) return "medium";
    return "good";
  }

  if (!pet.chosen) {
    return (
      <main className="pet-page">
        <section className="pet-container">
          <button className="back-button" onClick={goHome}>
            ← Back to my world
          </button>

          <div className="pet-intro">
            <span>MY LITTLE PET</span>
            <h2>
              Pick a tiny
              <br />
              <em>new friend.</em>
            </h2>
            <p>
              Choose a pet, give them a name, and they'll stay here in Little
              World.
            </p>
          </div>

          <div className="pet-picker">
            <div className="pet-choice-grid">
              {Object.entries(pets).map(([key, info]) => (
                <button
                  type="button"
                  key={key}
                  className={`pet-choice ${
                    selectedType === key ? "selected" : ""
                  }`}
                  onClick={() => setSelectedType(key)}
                >
                  <span>{info.emoji}</span>
                  <strong>{info.name}</strong>
                  <small>favorite snack {info.favorite}</small>
                </button>
              ))}
            </div>

            <div className="pet-name-box">
              <label htmlFor="little-pet-name">Give your pet a name</label>
              <input
                id="little-pet-name"
                value={nameDraft}
                maxLength={14}
                onChange={(event) => setNameDraft(event.target.value)}
                placeholder={`Maybe "${pets[selectedType].name}"?`}
              />
              <button type="button" onClick={choosePet}>
                Welcome {pets[selectedType].emoji}
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const info = pets[pet.type];

  return (
    <main className={`pet-page ${pet.sleeping ? "pet-night" : ""}`}>
      <section className="pet-container">
        <button className="back-button" onClick={goHome}>
          ← Back to my world
        </button>

        <div className="pet-top">
          <div>
            <span>MY LITTLE PET</span>
            <h2>{pet.name}'s corner.</h2>
            <p>
              {pet.name} is <strong>{statusText()}</strong>
            </p>
          </div>

          <div className="pet-treat-counter">
            <span>{info.favorite}</span>
            <div>
              <small>TREATS</small>
              <strong>{pet.treats}</strong>
            </div>
          </div>
        </div>

        <div className="pet-dashboard">
          <div className="pet-room-card">
            <div className="pet-room-window">
              <span>{pet.sleeping ? "🌙" : "☀️"}</span>
              <div className="pet-window-cloud cloud-a">☁️</div>
              <div className="pet-window-cloud cloud-b">☁️</div>
            </div>

            <div className="pet-room-star star-one">✦</div>
            <div className="pet-room-star star-two">♡</div>

            <button
              type="button"
              className={`pet-character ${action ? `pet-${action}` : ""}`}
              onClick={() => doAction("pet")}
              aria-label={`Pet ${pet.name}`}
            >
              <span className="pet-character-face">
                {pet.sleeping ? info.sleep : info.emoji}
              </span>
              {pet.sleeping && <span className="pet-zzz">z Z z</span>}
            </button>

            <div className="pet-rug"></div>
            <div className="pet-toy">🧸</div>
            <div className="pet-bowl">{info.favorite}</div>

            <div className="pet-message-bubble">
              <span>♡</span>
              {message}
            </div>
          </div>

          <aside className="pet-panel">
            <div className="pet-status-title">
              <span>DAILY STATUS</span>
              <strong>
                {info.emoji} {pet.name}
              </strong>
            </div>

            <PetStatus
              icon="🍓"
              label="Hunger"
              value={pet.hunger}
              className={barClass(pet.hunger)}
            />
            <PetStatus
              icon="🎀"
              label="Happiness"
              value={pet.happiness}
              className={barClass(pet.happiness)}
            />
            <PetStatus
              icon="⚡"
              label="Energy"
              value={pet.energy}
              className={barClass(pet.energy)}
            />

            <div className="pet-actions">
              <button type="button" onClick={() => doAction("feed")}>
                <span>🍓</span>
                <strong>Feed</strong>
                <small>+ hunger</small>
              </button>

              <button type="button" onClick={() => doAction("play")}>
                <span>🧸</span>
                <strong>Play</strong>
                <small>+ happiness</small>
              </button>

              <button type="button" onClick={() => doAction("sleep")}>
                <span>{pet.sleeping ? "☀️" : "💤"}</span>
                <strong>{pet.sleeping ? "Wake up" : "Sleep"}</strong>
                <small>+ energy</small>
              </button>

              <button type="button" onClick={giveTreat}>
                <span>{info.favorite}</span>
                <strong>Treat</strong>
                <small>tiny bonus</small>
              </button>
            </div>

            <p className="pet-tip">
              ♡ You can also tap {pet.name} to give them a little pat.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function PetStatus({ icon, label, value, className }) {
  return (
    <div className="pet-status-row">
      <div className="pet-status-copy">
        <span>{icon}</span>
        <strong>{label}</strong>
        <small>{Math.round(value)}%</small>
      </div>
      <div className="pet-status-track">
        <span
          className={className}
          style={{ width: `${Math.max(4, value)}%` }}
        ></span>
      </div>
    </div>
  );
}

/* ========================================
   GLOBAL MUSIC + CUTE SOUND SYSTEM
======================================== */

function GlobalAudio() {
  const MUSIC_KEY = "little-world-music-settings";

  const [audio] = useState(() => {
    const element = new Audio("/music/background.mp3");
    element.loop = true;
    element.preload = "auto";
    element.volume = 0.22;
    element.setAttribute("playsinline", "");
    element.setAttribute("webkit-playsinline", "");
    return element;
  });

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(22);
  const [open, setOpen] = useState(false);
  const [needsMusic, setNeedsMusic] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(MUSIC_KEY));
      if (saved) {
        const nextVolume = Math.min(
          55,
          Math.max(0, Number(saved.volume ?? 22)),
        );
        const nextMuted = Boolean(saved.muted);
        setVolume(nextVolume);
        setMuted(nextMuted);
        audio.volume = nextVolume / 100;
        audio.muted = nextMuted;
      }
    } catch {
      // Keep defaults if saved settings cannot be read.
    }

    const syncPlaying = () => {
      setPlaying(!audio.paused && !audio.ended);
    };

    const handleError = () => {
      setPlaying(false);
      setNeedsMusic(true);
    };

    audio.addEventListener("play", syncPlaying);
    audio.addEventListener("pause", syncPlaying);
    audio.addEventListener("ended", syncPlaying);
    audio.addEventListener("error", handleError);

    // Mobile Safari / installed PWA requires audio.play() to happen directly
    // from a real user gesture. Try several mobile-friendly gesture events and
    // remove them only after playback really starts.
    const unlockAudio = async () => {
      try {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          const context =
            window.__littleWorldAudioContext || new AudioContextClass();
          window.__littleWorldAudioContext = context;
          if (context.state === "suspended") {
            await context.resume().catch(() => {});
          }
        }

        await audio.play();
        setPlaying(true);
        setNeedsMusic(false);
        removeUnlockListeners();
      } catch {
        // The browser may still require the user to press the visible Play
        // button. Keep the listeners so the next gesture can try again.
        setNeedsMusic(true);
      }
    };

    const removeUnlockListeners = () => {
      window.removeEventListener("pointerup", unlockAudio);
      window.removeEventListener("touchend", unlockAudio);
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("pointerup", unlockAudio, { passive: true });
    window.addEventListener("touchend", unlockAudio, { passive: true });
    window.addEventListener("click", unlockAudio);

    return () => {
      removeUnlockListeners();
      audio.removeEventListener("play", syncPlaying);
      audio.removeEventListener("pause", syncPlaying);
      audio.removeEventListener("ended", syncPlaying);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, [audio]);

  useEffect(() => {
    audio.volume = volume / 100;
    audio.muted = muted;
    window.__littleWorldSoundMuted = muted;

    try {
      localStorage.setItem(MUSIC_KEY, JSON.stringify({ volume, muted }));
    } catch {
      // Ignore storage errors (for example private browsing restrictions).
    }
  }, [audio, volume, muted]);

  useEffect(() => {
    function cuteClick(event) {
      const button = event.target.closest?.("button");
      if (!button || button.closest(".music-player")) return;
      playTinySound(featureSoundFromButton(button), muted);
    }

    document.addEventListener("click", cuteClick);
    return () => document.removeEventListener("click", cuteClick);
  }, [muted]);

  async function togglePlay() {
    if (audio.paused) {
      try {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          const context =
            window.__littleWorldAudioContext || new AudioContextClass();
          window.__littleWorldAudioContext = context;
          if (context.state === "suspended") {
            await context.resume().catch(() => {});
          }
        }

        await audio.play();
        setPlaying(true);
        setNeedsMusic(false);
        playTinySound("sparkle", muted);
      } catch (error) {
        console.error("Background music could not start:", error);
        setPlaying(false);
        setNeedsMusic(true);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    setMuted((current) => !current);
  }

  return (
    <div className={`music-player ${open ? "open" : ""}`}>
      <button
        type="button"
        className={`music-bubble ${playing && !muted ? "music-playing" : ""}`}
        onClick={() => setOpen((current) => !current)}
        aria-label="Open music player"
      >
        <span className="music-disc">♫</span>
        <span className="music-waves">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </button>

      {open && (
        <div className="music-panel">
          <div className="music-panel-top">
            <div className="music-cover">🌷</div>
            <div>
              <small>NOW PLAYING</small>
              <strong>Little World Radio</strong>
              <span>
                {needsMusic
                  ? "tap ▶ to start music"
                  : playing
                    ? "playing softly ♫"
                    : "paused"}
              </span>
            </div>
          </div>

          <div className="music-buttons">
            <button type="button" onClick={togglePlay}>
              {playing ? "❚❚" : "▶"}
            </button>
            <button type="button" onClick={toggleMute}>
              {muted ? "🔇" : "🔊"}
            </button>

            <input
              type="range"
              min="0"
              max="55"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Music volume"
            />
          </div>

          <p>
            {needsMusic
              ? "Your phone may block autoplay. Tap the play button once to unlock the music."
              : "Background music stays on while you explore the whole Little World."}
          </p>
        </div>
      )}
    </div>
  );
}

function playTinySound(type = "click", muted = false) {
  if (muted || window.__littleWorldSoundMuted) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const context = window.__littleWorldAudioContext || new AudioContextClass();
  window.__littleWorldAudioContext = context;

  if (context.state === "suspended") context.resume().catch(() => {});

  const master = 0.16;

  function tone(
    freq,
    delay = 0,
    duration = 0.08,
    volume = 1,
    wave = "sine",
    endFreq = null,
  ) {
    const at = context.currentTime + delay;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = wave;
    osc.frequency.setValueAtTime(freq, at);
    if (endFreq)
      osc.frequency.exponentialRampToValueAtTime(endFreq, at + duration);

    gain.gain.setValueAtTime(master * volume, at);
    gain.gain.exponentialRampToValueAtTime(0.001, at + duration);

    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(at);
    osc.stop(at + duration + 0.025);
  }

  const sound = {
    click: () => {
      tone(510, 0, 0.055, 0.45, "sine", 720);
    },

    sparkle: () => {
      tone(720, 0, 0.1, 0.7);
      tone(980, 0.07, 0.12, 0.65);
      tone(1320, 0.14, 0.16, 0.55);
    },

    plant: () => {
      tone(170, 0, 0.09, 0.8, "triangle", 115);
      tone(520, 0.07, 0.1, 0.7);
      tone(820, 0.14, 0.15, 0.65);
    },

    letter: () => {
      tone(320, 0, 0.055, 0.7, "triangle", 480);
      tone(620, 0.06, 0.09, 0.75);
      tone(920, 0.14, 0.14, 0.65);
    },

    mystery: () => {
      tone(330, 0, 0.12, 0.8);
      tone(500, 0.09, 0.12, 0.8);
      tone(760, 0.18, 0.14, 0.8);
      tone(1120, 0.29, 0.2, 0.7);
    },

    heart: () => {
      tone(700, 0, 0.06, 0.85, "sine", 980);
      tone(1080, 0.055, 0.08, 0.65);
    },

    flip: () => {
      tone(280, 0, 0.045, 0.65, "square", 410);
    },

    match: () => {
      tone(510, 0, 0.07, 0.8);
      tone(760, 0.06, 0.09, 0.8);
      tone(1040, 0.13, 0.13, 0.7);
    },

    win: () => {
      tone(520, 0, 0.09, 0.8);
      tone(660, 0.08, 0.09, 0.8);
      tone(820, 0.16, 0.1, 0.85);
      tone(1100, 0.25, 0.19, 0.85);
    },

    bounce: () => {
      tone(150, 0, 0.075, 1, "sine", 90);
    },

    swish: () => {
      tone(1050, 0, 0.055, 0.7, "triangle", 580);
      tone(1350, 0.045, 0.09, 0.7, "sine", 720);
      tone(650, 0.12, 0.13, 0.55);
    },

    miss: () => {
      tone(270, 0, 0.11, 0.7, "triangle", 145);
    },

    feed: () => {
      tone(220, 0, 0.05, 0.9, "square", 165);
      tone(190, 0.065, 0.05, 0.85, "square", 145);
      tone(520, 0.14, 0.09, 0.55);
    },

    pet: () => {
      tone(470, 0, 0.08, 0.7);
      tone(690, 0.075, 0.12, 0.75);
    },

    play: () => {
      tone(530, 0, 0.065, 0.8);
      tone(760, 0.065, 0.07, 0.8);
      tone(1010, 0.13, 0.11, 0.7);
    },

    sleep: () => {
      tone(520, 0, 0.15, 0.5);
      tone(390, 0.13, 0.18, 0.45);
      tone(280, 0.28, 0.22, 0.4);
    },

    treat: () => {
      tone(650, 0, 0.065, 0.8);
      tone(920, 0.06, 0.08, 0.85);
      tone(1230, 0.13, 0.13, 0.75);
    },

    switch: () => {
      tone(210, 0, 0.04, 0.9, "square", 165);
      tone(610, 0.045, 0.065, 0.6);
    },

    birthday: () => {
      tone(520, 0, 0.1, 0.8);
      tone(660, 0.09, 0.1, 0.8);
      tone(780, 0.18, 0.1, 0.85);
      tone(1040, 0.27, 0.12, 0.9);
      tone(1320, 0.39, 0.2, 0.75);
    },
  };

  (sound[type] || sound.click)();
}

function featureSoundFromButton(button) {
  const text = (button?.textContent || "").toLowerCase();
  const page = button?.closest?.(
    ".garden-page, .mailbox-page, .mystery-page, .arcade-page, .pet-page, .room-page, .birthday-overlay",
  );

  if (button?.closest?.(".birthday-overlay")) return "birthday";

  if (page?.classList?.contains("mailbox-page") || text.includes("letter"))
    return "letter";
  if (
    page?.classList?.contains("garden-page") &&
    (text.includes("plant") || text.includes("tanam"))
  )
    return "plant";
  if (
    page?.classList?.contains("mystery-page") &&
    (text.includes("open") || text.includes("buka"))
  )
    return "mystery";

  if (page?.classList?.contains("pet-page")) {
    if (text.includes("feed")) return "feed";
    if (text.includes("treat")) return "treat";
    if (text.includes("sleep") || text.includes("wake")) return "sleep";
    if (text.includes("play")) return "play";
  }

  if (page?.classList?.contains("room-page")) return "switch";

  if (page?.classList?.contains("arcade-page")) {
    if (text.includes("shoot")) return "bounce";
    if (text.includes("play again") || text.includes("restart"))
      return "sparkle";
  }

  return "click";
}

function App() {
  return (
    <>
      <GlobalAudio />
      <AppContent />
    </>
  );
}

export default App;
