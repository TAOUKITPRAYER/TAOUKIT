/* ═══════════════════════════════════════════════════════════════════════════
   MOSQUES-REGISTRY.JS — Registre centralisé de toutes les mosquées
   ─────────────────────────────────────────────────────────────────
   Chargé AVANT spec/mosquee.js dans index.html.
   Source de vérité : spec/mosquee/mosquee_<slug>.js
   Pour ajouter une mosquée : ajouter une entrée + incrémenter VERSION.

   QR_URL_32 : lien téléchargement APK 32-bit (QR blanc/noir)
   QR_URL_64 : lien téléchargement APK 64-bit (QR rouge clair/noir)

   ADDRESS : adresse affichée dans l'onglet "Information" de la modale
             ouverte depuis mosqueNameDisplayVertical (texte en arabe).
   IMAGE   : nom du fichier image (dans spec/images/) affiché en haut de
             l'onglet "Information" de cette même modale.
   ═══════════════════════════════════════════════════════════════════════════ */

window.MOSQUES_REGISTRY = {

    // =========================================================================
    // MOSQUÉE ANONYME — modèle générique (voir _installMosqueSelector, custom.js)
    // Copie exacte de 'tn.monastir.nadour' : seul MOSQUE_NAME diffère (placeholder
    // générique "إسم المسجد"). Affichée en tête de liste du sélecteur. La
    // sélection déclenche un avertissement (repéré via _UC_ANONYMOUS) rappelant
    // qu'aucune notification/mise à jour auto n'est fournie pour ce modèle tant
    // que la mosquée n'est pas prise en charge officiellement par TAWKIT
    // (tawkit.net@gmail.com).
    // =========================================================================

    'anonymous.generic': {
        _UC_ANONYMOUS: true,
        VERSION:       '1.7',
        LABEL:         'مسجد بدون اسم  | Mosquée anonyme',
        MOSQUE_NAME:   'إسم المسجد',
        ADDRESS:       '',
        IMAGE:         'generique.webp',
        MOSQUE_COORDS: { latitude: 35.68329910412201, longitude: 10.846790981120296 },
        LOCATION_CODE: 'tn.tunis',
        IQAMA_DELAYS: { FAJR: 30, DHUHR: 10, ASR: 10, MAGHREB: 10, ISHA: 15 },
        IQAMA_FIXED:  { FAJR: '', DHUHR: '', ASR: '', ISHA: '' },
        DOHR_XMIN_ASR: 0,
        WEATHER_COORDS: { latitude: 35.685869143315436, longitude: 10.846734637739171 },
        JUMUA_ENABLED: 1,
        JUMUA_TIME:    '12:30',
        QR_URL_32:     'https://drive.google.com/uc?export=download&id=1UxzxDxoMgZL6ON2qMsA3_7jC6ZMdNXH3',
        QR_URL_64:     'https://drive.google.com/uc?export=download&id=1S6R6hfL5jaAqOIf87NcoH9J9CuVE_DKR',
        QURAN_SERVER_ENABLED: 0,
        DISPLAY_OPTIONS: {
            PS_FLAG: 1, QR_FLAG: 0,
            USE_24H: 1, ADD_ZERO_AMPM: 1, FULL_CLOCK: 1, ARABIC_DIGITS: 0,
            SHOW_NIGHT_PRAYERS: 1, DIM_PAST_PRAYERS: 0, HR_NAMES_IN_MIDDLE: 4,
            FIVE_BOXES_ONLY: 1, FULL_IQAMA_TIMES: 0, DATE_UP_RIGHT_HR: 0,
            HIDE_IQAMAT: 0, VR_NAMES_IN_MIDDLE: 0,
            IQAMA_COUNTER: 1, FULL_SCREEN_COUNTER: 1, LAST_MINUTE_COUNTER: 1,
            COUNTER_COLOR_ALERT: 1, BIG_NEXT_PRAY_COUNTER: 0,
            SHOW_AZAN_WINDOW: 1, SHOW_IQAMA_SCREEN: 1, IQAMA_HADITH: 1,
            TIMES_BG_SHADOWS: 1, SEMI_TRANSPARENT_BGS: 0,
            VERIFY_INTERNET: 1, ALERT_LAST_MINUTE: 1,
            NO_MOBILE_REMINDER: 0,
            CLOSE_MOBILE_TEXT: 'من فضلك أغلق الهاتف',
        },
    },

    // =========================================================================
    // MONASTIR — KSIBET AL-MÉDIOUNI
    // =========================================================================

    'tn.monastir.aboubakr': {
        // LOCATION_CODE corrige une 2e fois (14/08/2026, rapport telephone
        // Isha 20:41 au lieu de 20:42) : 'tn.ksibet-el-mediouni' (sans "_")
        // ajoute lors de la 1ere correction etait un doublon invente par
        // erreur (copie horaires Monastir) -- data/TN/tn.js contenait DEJA
        // une entree officielle 'tn.ksibet-el-mediouni_' (donnees reelles
        // calculees pour cette ville, distinctes de Monastir a la minute
        // pres). Le doublon + son fichier wtimes ont ete supprimes ; c'est
        // desormais ce code "_" reel qui est utilise.
        VERSION:       '1.6',
        LABEL:         'Mosquée Abou Bakr Al-Siddîq — Ksibet Al-Médiouni',
        MOSQUE_NAME:   'جامع أبوبكر الصِّدِّيق',
        ADDRESS:       'Ksibet Al-Médiouni, en face Sancella, Tunisie',
        IMAGE:         'bakrKsibet.webp',
        MOSQUE_COORDS: { latitude: 35.694723042195214, longitude: 10.832041514241665 },
        LOCATION_CODE: 'tn.ksibet-el-mediouni_',
        IQAMA_DELAYS: { FAJR: 30, DHUHR: 10, ASR: 12, MAGHREB: 10, ISHA: 15 },
        IQAMA_FIXED:  { FAJR: '', DHUHR: '13:15', ASR: '', ISHA: '' },
        DOHR_XMIN_ASR: 0,
        WEATHER_COORDS: { latitude: 35.685869143315436, longitude: 10.846734637739171 },
        JUMUA_ENABLED: 1,
        JUMUA_TIME:    '13:15',
        QR_URL_32:     'https://drive.google.com/uc?export=download&id=1UxzxDxoMgZL6ON2qMsA3_7jC6ZMdNXH3',
        QR_URL_64:     'https://drive.google.com/uc?export=download&id=1S6R6hfL5jaAqOIf87NcoH9J9CuVE_DKR',
        QURAN_SERVER_ENABLED: 0,
        DISPLAY_OPTIONS: {
            PS_FLAG: 1, QR_FLAG: 0,
            USE_24H: 1, ADD_ZERO_AMPM: 1, FULL_CLOCK: 1, ARABIC_DIGITS: 0,
            SHOW_NIGHT_PRAYERS: 1, DIM_PAST_PRAYERS: 0, HR_NAMES_IN_MIDDLE: 4,
            FIVE_BOXES_ONLY: 1, FULL_IQAMA_TIMES: 0, DATE_UP_RIGHT_HR: 0,
            HIDE_IQAMAT: 0, VR_NAMES_IN_MIDDLE: 0,
            IQAMA_COUNTER: 1, FULL_SCREEN_COUNTER: 1, LAST_MINUTE_COUNTER: 1,
            COUNTER_COLOR_ALERT: 1, BIG_NEXT_PRAY_COUNTER: 0,
            SHOW_AZAN_WINDOW: 1, SHOW_IQAMA_SCREEN: 1, IQAMA_HADITH: 1,
            TIMES_BG_SHADOWS: 1, SEMI_TRANSPARENT_BGS: 0,
            VERIFY_INTERNET: 1, ALERT_LAST_MINUTE: 1,
            NO_MOBILE_REMINDER: 0,
            CLOSE_MOBILE_TEXT: 'من فضلك أغلق الهاتف',
        },
    },

    'tn.monastir.hidaya': {
        // LOCATION_CODE corrige une 2e fois (14/08/2026) : cf. commentaire
        // identique sur tn.monastir.aboubakr ci-dessus.
        VERSION:       '1.6',
        LABEL:         'Mosquée Al-Hidâya — Ksibet Al-Médiouni',
        MOSQUE_NAME:   'مسجد الهداية',
        ADDRESS:       'مسجد الهداية بقصيبة المديوني',
        IMAGE:         'hidaya.webp',
        MOSQUE_COORDS: { latitude: 35.68034700055071, longitude: 10.853256445606775 },
        LOCATION_CODE: 'tn.ksibet-el-mediouni_',
        IQAMA_DELAYS: { FAJR: 30, DHUHR: 10, ASR: 10, MAGHREB: 8, ISHA: 15 },
        IQAMA_FIXED:  { FAJR: '', DHUHR: '12:50', ASR: '', ISHA: '' },
        DOHR_XMIN_ASR: 0,
        WEATHER_COORDS: { latitude: 35.685869143315436, longitude: 10.846734637739171 },
        JUMUA_ENABLED: 0,
        JUMUA_TIME:    'AUTO',
        QR_URL_32:     'https://drive.google.com/uc?export=download&id=1UxzxDxoMgZL6ON2qMsA3_7jC6ZMdNXH3',
        QR_URL_64:     'https://drive.google.com/uc?export=download&id=1S6R6hfL5jaAqOIf87NcoH9J9CuVE_DKR',
        QURAN_SERVER_ENABLED: 0,
        DISPLAY_OPTIONS: {
            PS_FLAG: 1, QR_FLAG: 0,
            USE_24H: 1, ADD_ZERO_AMPM: 1, FULL_CLOCK: 1, ARABIC_DIGITS: 0,
            SHOW_NIGHT_PRAYERS: 1, DIM_PAST_PRAYERS: 0, HR_NAMES_IN_MIDDLE: 4,
            FIVE_BOXES_ONLY: 1, FULL_IQAMA_TIMES: 0, DATE_UP_RIGHT_HR: 0,
            HIDE_IQAMAT: 0, VR_NAMES_IN_MIDDLE: 0,
            IQAMA_COUNTER: 1, FULL_SCREEN_COUNTER: 1, LAST_MINUTE_COUNTER: 1,
            COUNTER_COLOR_ALERT: 1, BIG_NEXT_PRAY_COUNTER: 0,
            SHOW_AZAN_WINDOW: 1, SHOW_IQAMA_SCREEN: 1, IQAMA_HADITH: 1,
            TIMES_BG_SHADOWS: 1, SEMI_TRANSPARENT_BGS: 0,
            VERIFY_INTERNET: 1, ALERT_LAST_MINUTE: 1,
            NO_MOBILE_REMINDER: 0,
            CLOSE_MOBILE_TEXT: 'من فضلك أغلق الهاتف',
        },
    },

    'tn.monastir.mediouni': {
        // LOCATION_CODE corrige une 2e fois (14/08/2026) : cf. commentaire
        // identique sur tn.monastir.aboubakr plus haut.
        VERSION:       '1.9',
        LABEL:         'Mosquée Al-Médiouni — Qasabat Al-Médiouni',
        MOSQUE_NAME:   'جامع المديوني بقصيبة المديوني',
        ADDRESS:       'Ksibet Al-Médiouni, Monastir, Tunisie',
        IMAGE:         'MEDIOUNIKSIBET.webp',
        MOSQUE_COORDS: { latitude: 35.68866925589379, longitude: 10.842769008939253 },
        LOCATION_CODE: 'tn.ksibet-el-mediouni_',
        IQAMA_DELAYS: { FAJR: 30, DHUHR: 10, ASR: 10, MAGHREB: 10, ISHA: 15 },
        IQAMA_FIXED:  { FAJR: '', DHUHR: '13:00', ASR: '', ISHA: '' },
        DOHR_XMIN_ASR: 0,
        WEATHER_COORDS: { latitude: 35.685869143315436, longitude: 10.846734637739171 },
        JUMUA_ENABLED: 1,
        JUMUA_TIME:    '15:00',
        QR_URL_32:     'https://drive.google.com/uc?export=download&id=1UxzxDxoMgZL6ON2qMsA3_7jC6ZMdNXH3',
        QR_URL_64:     'https://drive.google.com/uc?export=download&id=1S6R6hfL5jaAqOIf87NcoH9J9CuVE_DKR',

        QURAN_SERVER_ENABLED: 0,
        DISPLAY_OPTIONS: {
            PS_FLAG: 1, QR_FLAG: 0,
            USE_24H: 1, ADD_ZERO_AMPM: 1, FULL_CLOCK: 1, ARABIC_DIGITS: 0,
            SHOW_NIGHT_PRAYERS: 1, DIM_PAST_PRAYERS: 0, HR_NAMES_IN_MIDDLE: 4,
            FIVE_BOXES_ONLY: 1, FULL_IQAMA_TIMES: 0, DATE_UP_RIGHT_HR: 0,
            HIDE_IQAMAT: 0, VR_NAMES_IN_MIDDLE: 0,
            IQAMA_COUNTER: 1, FULL_SCREEN_COUNTER: 1, LAST_MINUTE_COUNTER: 1,
            COUNTER_COLOR_ALERT: 1, BIG_NEXT_PRAY_COUNTER: 0,
            SHOW_AZAN_WINDOW: 1, SHOW_IQAMA_SCREEN: 1, IQAMA_HADITH: 1,
            TIMES_BG_SHADOWS: 1, SEMI_TRANSPARENT_BGS: 0,
            VERIFY_INTERNET: 1, ALERT_LAST_MINUTE: 1,
            NO_MOBILE_REMINDER: 0,
            CLOSE_MOBILE_TEXT: 'من فضلك أغلق الهاتف',
        },
    },

    'tn.monastir.nadour': {
        // LOCATION_CODE corrige une 2e fois (14/08/2026) : cf. commentaire
        // identique sur tn.monastir.aboubakr plus haut.
        VERSION:       '1.9',
        LABEL:         'Mosquée Al-Nûr — Qasabat Al-Médiouni',
        MOSQUE_NAME:   'جامع النّور بقصيبة المديوني',
        ADDRESS:       'Ksibet Al-Médiouni, Monastir, Tunisie',
        IMAGE:         'nourKsibet.webp',
        MOSQUE_COORDS: { latitude: 35.68329910412201, longitude: 10.846790981120296 },
        LOCATION_CODE: 'tn.ksibet-el-mediouni_',
        IQAMA_DELAYS: { FAJR: 30, DHUHR: 10, ASR: 10, MAGHREB: 10, ISHA: 15 },
        IQAMA_FIXED:  { FAJR: '', DHUHR: '12:45', ASR: '', ISHA: '' },
        DOHR_XMIN_ASR: 0,
        WEATHER_COORDS: { latitude: 35.685869143315436, longitude: 10.846734637739171 },
        JUMUA_ENABLED: 1,
        JUMUA_TIME:    '12:30',
        QR_URL_32:     'https://drive.google.com/uc?export=download&id=1UxzxDxoMgZL6ON2qMsA3_7jC6ZMdNXH3',
        QR_URL_64:     'https://drive.google.com/uc?export=download&id=1S6R6hfL5jaAqOIf87NcoH9J9CuVE_DKR',

        QURAN_SERVER_ENABLED: 0,
        DISPLAY_OPTIONS: {
            PS_FLAG: 1, QR_FLAG: 0,
            USE_24H: 1, ADD_ZERO_AMPM: 1, FULL_CLOCK: 1, ARABIC_DIGITS: 0,
            SHOW_NIGHT_PRAYERS: 1, DIM_PAST_PRAYERS: 0, HR_NAMES_IN_MIDDLE: 4,
            FIVE_BOXES_ONLY: 1, FULL_IQAMA_TIMES: 0, DATE_UP_RIGHT_HR: 0,
            HIDE_IQAMAT: 0, VR_NAMES_IN_MIDDLE: 0,
            IQAMA_COUNTER: 1, FULL_SCREEN_COUNTER: 1, LAST_MINUTE_COUNTER: 1,
            COUNTER_COLOR_ALERT: 1, BIG_NEXT_PRAY_COUNTER: 0,
            SHOW_AZAN_WINDOW: 1, SHOW_IQAMA_SCREEN: 1, IQAMA_HADITH: 1,
            TIMES_BG_SHADOWS: 1, SEMI_TRANSPARENT_BGS: 0,
            VERIFY_INTERNET: 1, ALERT_LAST_MINUTE: 1,
            NO_MOBILE_REMINDER: 0,
            CLOSE_MOBILE_TEXT: 'من فضلك أغلق الهاتف',
        },
    },

    'tn.monastir.youssef': {
        // LOCATION_CODE corrige une 2e fois (14/08/2026) : cf. commentaire
        // identique sur tn.monastir.aboubakr plus haut.
        VERSION:       '2.0',
        LABEL:         'Mosquée Youssef — Ksibet Al-Médiouni',
        MOSQUE_NAME:   'مسجد يوسف',
        ADDRESS:       'Ksibet Al-Médiouni, Monastir, Tunisie',
        IMAGE:         'youssefKsibet.webp',
        MOSQUE_COORDS: { latitude: 35.68731858236977, longitude: 10.84486381417694 },
        LOCATION_CODE: 'tn.ksibet-el-mediouni_',
        IQAMA_DELAYS: { FAJR: 25, DHUHR: 30, ASR: 8, MAGHREB: 8, ISHA: 10 },
        IQAMA_FIXED:  { FAJR: '', DHUHR: '', ASR: '', ISHA: '' },
        DOHR_XMIN_ASR: 60,
        WEATHER_COORDS: { latitude: 35.685869143315436, longitude: 10.846734637739171 },
        JUMUA_ENABLED: 0,
        JUMUA_TIME:    'AUTO',
        QR_URL_32:     'https://drive.google.com/uc?export=download&id=1UxzxDxoMgZL6ON2qMsA3_7jC6ZMdNXH3',
        QR_URL_64:     'https://drive.google.com/uc?export=download&id=1S6R6hfL5jaAqOIf87NcoH9J9CuVE_DKR',

        QURAN_SERVER_ENABLED: 0,
        DISPLAY_OPTIONS: {
            PS_FLAG: 1, QR_FLAG: 0,
            USE_24H: 1, ADD_ZERO_AMPM: 1, FULL_CLOCK: 1, ARABIC_DIGITS: 0,
            SHOW_NIGHT_PRAYERS: 1, DIM_PAST_PRAYERS: 0, HR_NAMES_IN_MIDDLE: 4,
            FIVE_BOXES_ONLY: 1, FULL_IQAMA_TIMES: 0, DATE_UP_RIGHT_HR: 0,
            HIDE_IQAMAT: 0, VR_NAMES_IN_MIDDLE: 0,
            IQAMA_COUNTER: 1, FULL_SCREEN_COUNTER: 1, LAST_MINUTE_COUNTER: 1,
            COUNTER_COLOR_ALERT: 1, BIG_NEXT_PRAY_COUNTER: 0,
            SHOW_AZAN_WINDOW: 1, SHOW_IQAMA_SCREEN: 1, IQAMA_HADITH: 1,
            TIMES_BG_SHADOWS: 1, SEMI_TRANSPARENT_BGS: 0,
            VERIFY_INTERNET: 1, ALERT_LAST_MINUTE: 1,
            NO_MOBILE_REMINDER: 0,
            CLOSE_MOBILE_TEXT: 'من فضلك أغلق الهاتف',
        },
    },

    // =========================================================================
    // MONASTIR — VILLE
    // =========================================================================

    'tn.monastir.salah': {
        // LOCATION_CODE corrige (14/08/2026, demande explicite) : meme
        // situation que le doublon Ksibet Al-Mediouni corrige plus haut --
        // data/TN/tn.js contient 'tn.monastir' (ancien jeu de donnees, sans
        // en-tete TAWKIT.NET, Isha 20:41) ET 'tn.monastir_' (jeu de donnees
        // officiel actuel, Isha 20:42, memes valeurs que tn.ksibet-el-
        // mediouni_ -- localites geographiquement adjacentes). On utilise
        // desormais le code "_" a jour.
        VERSION:       '1.4',
        LABEL:         'Mosquée Al-Salâh — Monastir',
        MOSQUE_NAME:   'جامع الصّلاح بالمنستير',
        ADDRESS:       'Skanes Monastir, Tunisie',
        IMAGE:         'SALAHMONASTIR.jpeg',
        MOSQUE_COORDS: { latitude: 35.769327501088405, longitude: 10.793826967770375 },
        LOCATION_CODE: 'tn.monastir_',
        IQAMA_DELAYS: { FAJR: 30, DHUHR: 10, ASR: 10, MAGHREB: 10, ISHA: 15 },
        IQAMA_FIXED:  { FAJR: '', DHUHR: '13:00', ASR: '', ISHA: '' },
        DOHR_XMIN_ASR: 0,
        WEATHER_COORDS: { latitude: 35.685869143315436, longitude: 10.846734637739171 },
        JUMUA_ENABLED: 1,
        JUMUA_TIME:    '13:15',
        QR_URL_32:     'https://drive.google.com/uc?export=download&id=1UxzxDxoMgZL6ON2qMsA3_7jC6ZMdNXH3',
        QR_URL_64:     'https://drive.google.com/uc?export=download&id=1S6R6hfL5jaAqOIf87NcoH9J9CuVE_DKR',

        QURAN_SERVER_ENABLED: 0,
        DISPLAY_OPTIONS: {
            PS_FLAG: 1, QR_FLAG: 0,
            USE_24H: 1, ADD_ZERO_AMPM: 1, FULL_CLOCK: 1, ARABIC_DIGITS: 0,
            SHOW_NIGHT_PRAYERS: 1, DIM_PAST_PRAYERS: 0, HR_NAMES_IN_MIDDLE: 4,
            FIVE_BOXES_ONLY: 1, FULL_IQAMA_TIMES: 0, DATE_UP_RIGHT_HR: 0,
            HIDE_IQAMAT: 0, VR_NAMES_IN_MIDDLE: 0,
            IQAMA_COUNTER: 1, FULL_SCREEN_COUNTER: 1, LAST_MINUTE_COUNTER: 1,
            COUNTER_COLOR_ALERT: 1, BIG_NEXT_PRAY_COUNTER: 0,
            SHOW_AZAN_WINDOW: 1, SHOW_IQAMA_SCREEN: 1, IQAMA_HADITH: 1,
            TIMES_BG_SHADOWS: 1, SEMI_TRANSPARENT_BGS: 0,
            VERIFY_INTERNET: 1, ALERT_LAST_MINUTE: 1,
            NO_MOBILE_REMINDER: 0,
            CLOSE_MOBILE_TEXT: 'من فضلك أغلق الهاتف',
        },
    },

    // =========================================================================
    // BEN NAN
    // =========================================================================

    'tn.monastir.ghofran': {
        // LOCATION_CODE corrige (demande explicite du 14/08/2026) : cette
        // mosquee est a Bennane, pas Monastir-ville. data/TN/wtimes-
        // tn.bennane.js contient les horaires -- corrige le 15/08/2026 :
        // c'est desormais une copie de tn.ksibet-el-mediouni_ (localite
        // adjacente, calcul officiel a jour), et non plus de l'ancien jeu
        // de donnees tn.monastir.
        VERSION:       '1.5',
        LABEL:         'Mosquée Al-Ghofran — Ben Nân',
        MOSQUE_NAME:   'جامع الغفران ببنّان',
        ADDRESS:       'Bennan, Monastir, Tunisie',
        IMAGE:         'gofranBennan.webp',
        MOSQUE_COORDS: { latitude: 35.68013566498266, longitude: 10.835710775914372 },
        LOCATION_CODE: 'tn.bennane',
        IQAMA_DELAYS: { FAJR: 30, DHUHR: 10, ASR: 10, MAGHREB: 10, ISHA: 15 },
        IQAMA_FIXED:  { FAJR: '', DHUHR: '13:00', ASR: '', ISHA: '' },
        DOHR_XMIN_ASR: 0,
        WEATHER_COORDS: { latitude: 35.685869143315436, longitude: 10.846734637739171 },
        JUMUA_ENABLED: 1,
        JUMUA_TIME:    '12:30',
        QR_URL_32:     'https://drive.google.com/uc?export=download&id=1UxzxDxoMgZL6ON2qMsA3_7jC6ZMdNXH3',
        QR_URL_64:     'https://drive.google.com/uc?export=download&id=1S6R6hfL5jaAqOIf87NcoH9J9CuVE_DKR',

        QURAN_SERVER_ENABLED: 0,
        DISPLAY_OPTIONS: {
            PS_FLAG: 1, QR_FLAG: 0,
            USE_24H: 1, ADD_ZERO_AMPM: 1, FULL_CLOCK: 1, ARABIC_DIGITS: 0,
            SHOW_NIGHT_PRAYERS: 1, DIM_PAST_PRAYERS: 0, HR_NAMES_IN_MIDDLE: 4,
            FIVE_BOXES_ONLY: 1, FULL_IQAMA_TIMES: 0, DATE_UP_RIGHT_HR: 0,
            HIDE_IQAMAT: 0, VR_NAMES_IN_MIDDLE: 0,
            IQAMA_COUNTER: 1, FULL_SCREEN_COUNTER: 1, LAST_MINUTE_COUNTER: 1,
            COUNTER_COLOR_ALERT: 1, BIG_NEXT_PRAY_COUNTER: 0,
            SHOW_AZAN_WINDOW: 1, SHOW_IQAMA_SCREEN: 1, IQAMA_HADITH: 1,
            TIMES_BG_SHADOWS: 1, SEMI_TRANSPARENT_BGS: 0,
            VERIFY_INTERNET: 1, ALERT_LAST_MINUTE: 1,
            NO_MOBILE_REMINDER: 0,
            CLOSE_MOBILE_TEXT: 'من فضلك أغلق الهاتف',
        },
    },

    // =========================================================================
    // TUNIS — CITÉ CHAKER (RAOUED)
    // =========================================================================

    // Clé alignée sur le mosque_id Supabase (tn.tunis.nour-chaker, cf. migration
    // du 24/07/2026 : le mosque_id disait à tort "monastir" alors que la
    // mosquée est à Raoued/Tunis, comme LOCATION_CODE ci-dessous le confirmait
    // déjà). Avant cet alignement, cette entrée du registre local (id
    // tn.monastir.nour-chaker) et la ligne Supabase renommée (tn.tunis.nour-chaker)
    // désignaient la même mosquée sous deux id différents -> _renderList
    // (sélecteur de mosquée) les affichait toutes les deux pour la ville
    // "tunis" (déduplication par id, pas par nom).
    'tn.tunis.nour-chaker': {
        VERSION:       '1.4',
        LABEL:         'Mosquée Al-Nûr — Cité Chaker, Raoued',
        MOSQUE_NAME:   'جامع النُّور بحي شاكر',
        ADDRESS:       'Cité Chaker, Raoued, Tunis, Tunisie',
        IMAGE:         'nourchaker.jpeg',
        MOSQUE_COORDS: { latitude: 36.94450154159308, longitude: 10.173568985600673 },
        LOCATION_CODE: 'tn.tunis',
        IQAMA_DELAYS: { FAJR: 30, DHUHR: 10, ASR: 12, MAGHREB: 10, ISHA: 15 },
        IQAMA_FIXED:  { FAJR: '', DHUHR: '13:00', ASR: '', ISHA: '' },
        DOHR_XMIN_ASR: 0,
        WEATHER_COORDS: { latitude: 36.9530, longitude: 10.1930 },
        JUMUA_ENABLED: 1,
        JUMUA_TIME:    '12:50',
        QR_URL_32:     'https://drive.google.com/uc?export=download&id=1UxzxDxoMgZL6ON2qMsA3_7jC6ZMdNXH3',
        QR_URL_64:     'https://drive.google.com/uc?export=download&id=1S6R6hfL5jaAqOIf87NcoH9J9CuVE_DKR',

        QURAN_SERVER_ENABLED: 0,
        DISPLAY_OPTIONS: {
            PS_FLAG: 1, QR_FLAG: 0,
            USE_24H: 1, ADD_ZERO_AMPM: 1, FULL_CLOCK: 1, ARABIC_DIGITS: 0,
            SHOW_NIGHT_PRAYERS: 1, DIM_PAST_PRAYERS: 0, HR_NAMES_IN_MIDDLE: 4,
            FIVE_BOXES_ONLY: 1, FULL_IQAMA_TIMES: 0, DATE_UP_RIGHT_HR: 0,
            HIDE_IQAMAT: 0, VR_NAMES_IN_MIDDLE: 0,
            IQAMA_COUNTER: 1, FULL_SCREEN_COUNTER: 1, LAST_MINUTE_COUNTER: 1,
            COUNTER_COLOR_ALERT: 1, BIG_NEXT_PRAY_COUNTER: 0,
            SHOW_AZAN_WINDOW: 1, SHOW_IQAMA_SCREEN: 1, IQAMA_HADITH: 1,
            TIMES_BG_SHADOWS: 1, SEMI_TRANSPARENT_BGS: 0,
            VERIFY_INTERNET: 1, ALERT_LAST_MINUTE: 1,
            NO_MOBILE_REMINDER: 0,
            CLOSE_MOBILE_TEXT: 'من فضلك أغلق الهاتف',
        },
    },

};
// fin MOSQUES_REGISTRY
