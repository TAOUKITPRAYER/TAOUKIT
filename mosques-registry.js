/* ═══════════════════════════════════════════════════════════════════════════
   MOSQUES-REGISTRY.JS — Gabarit hors-ligne "mosquée anonyme" uniquement
   ─────────────────────────────────────────────────────────────────
   Chargé AVANT spec/mosquee.js dans index.html.
   Ce fichier ne contient PLUS de vraies mosquées : toute config de mosquée
   réelle (y compris celles anciennement embarquées ici) vit exclusivement
   dans Supabase, table unique `mosques` (colonnes structurées + backup_json
   pour le blob complet), gérée via l'app mosque-admin. Ne JAMAIS réintroduire ici une entrée pour une vraie
   mosquée : ça recrée le risque de désync deja rencontré (cf. incident
   tn.monastir.hidaya, iqama Maghreb 8 vs 10, aout 2026).

   La seule entrée restante, 'anonymous.generic', n'est pas une mosquée mais
   le filet de secours du tout premier lancement hors-ligne : elle doit
   rester disponible de façon synchrone, sans reseau (cf. mosquee.js et
   _ucFirstRunFallbackAnonymous dans custom.js). Elle ne peut pas vivre dans
   Supabase puisque Supabase necessite le reseau par definition.

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
    // Affichée en tête de liste du sélecteur. La sélection déclenche un
    // avertissement (repéré via _UC_ANONYMOUS) rappelant qu'aucune
    // notification/mise à jour auto n'est fournie pour ce modèle tant que la
    // mosquée n'est pas prise en charge officiellement par TAWKIT
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

};
// fin MOSQUES_REGISTRY
