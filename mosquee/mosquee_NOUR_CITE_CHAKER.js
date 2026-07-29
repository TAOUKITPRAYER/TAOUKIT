/* ═══════════════════════════════════════════════════════════════════════════
   MOSQUEE.JS — Configuration spécifique à la mosquée
   ───────────────────────────────────────────────────
   Ce fichier est le SEUL à modifier pour adapter l'application à une nouvelle
   mosquée. Il est chargé AVANT custom.js et expose window.MOSQUE_CONFIG.

   Procédure de mise à jour :
     1. Modifier les valeurs ci-dessous
     2. Incrémenter VERSION (force la ré-application même si l'app a déjà tourné)
     3. Déployer / régénérer l'APK
   ═══════════════════════════════════════════════════════════════════════════ */

window.MOSQUE_CONFIG = {

    VERSION:       '1.2',                    // incrementer a chaque modification
    MOSQUE_ID:     'tn.tunis.nour-chaker',   // aligne sur le mosque_id Supabase (migration 24/07/2026 : la mosquee est a Raoued/Tunis, pas Monastir)

    // ── Identité de la mosquée ────────────────────────────────────────────────
    MOSQUE_NAME:   'جامع النُّور بحي شاكر',           // Nom affiché dans l'application
    LOCATION_CODE: 'tn.tunis',              // Code ville (toujours en minuscules)
                                             // Liste : Paramètres > Ville de calcul

    // ── Délais iqama en minutes ───────────────────────────────────────────────
    // Utilisé seulement si IQAMA_FIXED correspondant est vide ('')
    IQAMA_DELAYS: {
        FAJR:    30,                         // minutes après l'azan
        DHUHR:   10,
        ASR:     10,
        MAGHREB: 10,                         // MAGHREB n'a pas d'heure fixe
        ISHA:    15,
    },

    // ── Heure fixe d'iqama (prioritaire sur IQAMA_DELAYS) ────────────────────
    // Format 'HH:mm'  ex: '13:00'  — mettre '' pour désactiver
    // Note : MAGHREB ne supporte pas d'heure fixe, utiliser IQAMA_DELAYS.MAGHREB
    IQAMA_FIXED: {
        FAJR:    '',                         // ex: '05:30'
        DHUHR:   '13:00',                   // ex: '13:00'
        ASR:     '',                         // ex: '16:30'
        ISHA:    '',                         // ex: '20:00'
    },

    // ── Dohr calculé X minutes avant l'Asr ───────────────────────────────────
    // Met l'heure du Dohr (et du Jumu'ah si AUTO) à N minutes avant l'Asr.
    // 0 = désactivé (utiliser le calcul standard du Dohr)
    // Ex : 30 → Dohr affiché 30 min avant l'Asr
    // Ignoré si ucWcsvIsActive = 1 (horaires CSV importés)
    DOHR_XMIN_ASR: 0,

    // ── Coordonnées météo ─────────────────────────────────────────────────────
    // (peut différer des coordonnées de calcul des prières)
    WEATHER_COORDS: {
        latitude:  35.685869143315436,
        longitude: 10.846734637739171,
    },

    // ── Jumu'ah ───────────────────────────────────────────────────────────────
    JUMUA_ENABLED: 1,                       // 0 = non affiché, 1 = affiché
    JUMUA_TIME:    '13:00',                  // 'AUTO' ou heure fixe ex: '13:15'

    // ── QR Code ───────────────────────────────────────────────────────────────
    // QR_URL : URL encodée dans le QR code (affiché quand qrFlagCheckbox est coché)
    // Si défini et non vide : le QR est généré automatiquement côté client.
    // Laisser '' pour utiliser spec/images/qrmosquee.png (pré-généré via genqr.ps1)
    QR_FLAG:       0,                        // 1 = QR affiché au démarrage
    QR_URL:        'https://drive.google.com/open?id=1HyFayYLs0tPLXkgivotO57oTF7SG8V8b',  // URL encodée dans le QR
    //QR_URL_64:      'https://drive.google.com/open?id=1vBbup8eg0UrdSxWXasrI8ntZnvAKnsqz',  // URL64 encodée dans le QR
    // ── Serveur Coran (lecture automatique avant l'azan) ─────────────────────
    // 1 = serveur local activé (http://127.0.0.1:8080), 0 = désactivé
    QURAN_SERVER_ENABLED: 0,
    // ── Options d'affichage ───────────────────────────────────────────────────
    DISPLAY_OPTIONS: {

        // Drapeaux & format horloge
        PS_FLAG:                1,   // علم فلسطين
        USE_24H:                1,   // format 24h (13:00) au lieu de 12h (1:00 pm)
        ADD_ZERO_AMPM:          1,   // ex: 01:30 au lieu de 1:30
        FULL_CLOCK:             1,   // horloge "00:00:00" (avec secondes)
        ARABIC_DIGITS:          0,   // ٠١٢٣٤٥٦٧٨٩ au lieu de 0123456789

        // Tableau des prières
        SHOW_NIGHT_PRAYERS:     1,   // afficher les prières de nuit (Qiyam)
        DIM_PAST_PRAYERS:       0,   // atténuer les prières passées
        HR_NAMES_IN_MIDDLE:     1,   // noms des prières centrés (vue horizontale)
        FIVE_BOXES_ONLY:        1,   // 5 colonnes uniquement (sans Doha)
        FULL_IQAMA_TIMES:       0,   // afficher l'heure complète de l'iqama
        DATE_UP_RIGHT_HR:       0,   // date en haut à droite (vue horizontale)
        HIDE_IQAMAT:            0,   // mode maison (cacher les iqamas)
        VR_NAMES_IN_MIDDLE:     0,   // noms centrés (vue verticale)

        // Compteur iqama
        IQAMA_COUNTER:          1,   // activer le compte à rebours iqama
        FULL_SCREEN_COUNTER:    1,   // compteur plein écran
        LAST_MINUTE_COUNTER:    1,   // compteur dernière minute
        COUNTER_COLOR_ALERT:    1,   // couleur d'alerte à 90 secondes
        BIG_NEXT_PRAY_COUNTER:  0,   // grand compteur prochaine prière

        // Fenêtres / écrans
        SHOW_AZAN_WINDOW:       1,   // afficher la fenêtre azan
        SHOW_IQAMA_SCREEN:      1,   // afficher l'écran iqama
        IQAMA_HADITH:           1,   // overlay hadith avant iqama (33s→20s et 15s→5s)

        // Fond & ombres
        TIMES_BG_SHADOWS:       1,   // ombres derrière les horaires
        SEMI_TRANSPARENT_BGS:   0,   // fonds semi-transparents

        // Alertes & réseau
        VERIFY_INTERNET:        1,   // vérifier la connexion internet
        ALERT_LAST_MINUTE:      1,   // alerte sonore 1 min avant azan
        NO_MOBILE_REMINDER:    0,   // rappel de fermer le téléphone
        CLOSE_MOBILE_TEXT:      'من فضلك أغلق الهاتف',  // texte du rappel
    },
};
