/**
 * ═══════════════════════════════════════════════════════════════════════
 *  ucSim — Simulation accélérée  (coller dans la console du navigateur)
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  USAGE RAPIDE
 *  ────────────
 *  ucSim()        → simulation auto ×20  (1 s réelle = 20 s simulées)
 *  ucSim(30)      → simulation auto ×30
 *  ucSim(10)      → simulation auto ×10  (plus lente, plus lisible)
 *
 *  COMMANDES PAS-À-PAS (débogage)
 *  ───────────────────────────────
 *  ucSim.azan()            affiche la page d'azan
 *  ucSim.closeAzan()       ferme la page d'azan
 *  ucSim.counter(70)
 *  ucSim.azan()
 *         démarre le compteur depuis n secondes  (ex: 60)
 *  ucSim.jump(n)           saute directement à n secondes restantes
 *  ucSim.hadith()          affiche l'overlay hadith iqama
 *  ucSim.fadeHadith()      déclenche le fondu sortie du hadith
 *  ucSim.blackScreen()     active l'écran noir
 *  ucSim.end()             réinitialise tout (écran normal)
 *
 *  SÉQUENCE COMPLÈTE simulée par ucSim() :
 *  ────────────────────────────────────────
 *   ① Popup azan (2 s réelles pour le voir)
 *   ② Fermeture popup azan
 *   ③ Compteur iqama démarre à 60 s
 *   ④ Décompte rapide 60 → 33 s
 *   ⑤ Pause à 33 s  → overlay hadith
 *   ⑥ Décompte rapide 33 → 20 s
 *   ⑦ Pause à 20 s  → fondu sortie du hadith
 *   ⑧ Décompte rapide 20 → 0 s
 *   ⑨ Iqama + écran noir (2 s réelles)
 *   ⑩ Fin → retour écran normal
 * ═══════════════════════════════════════════════════════════════════════
 */
(function () {

    /* ── Styles console ─────────────────────────────────────────────────── */
    var C = {
        step : 'color:#00ffaa;font-weight:bold;font-size:12px',
        info : 'color:#aaddff',
        ok   : 'color:#00ff88;font-weight:bold;font-size:13px',
        warn : 'color:#ffaa00'
    };
    function log(step, msg, style) {
        console.log('%c[SIM ' + step + '] ' + msg, style || C.step);
    }

    /* ── Helpers overlay hadith ─────────────────────────────────────────── */
    function _overlayEl() { return document.getElementById('ucIqamaHadithOverlay'); }

    function _overlayShow() {
        var el = _overlayEl();
        if (!el) return;
        el.classList.remove('ucIH-fading');
        el.classList.add('ucIH-visible');
    }
    function _overlayFade() {
        var el = _overlayEl();
        if (!el) return;
        el.classList.remove('ucIH-visible');
        el.classList.add('ucIH-fading');
    }
    function _overlayHide() {
        var el = _overlayEl();
        if (!el) return;
        el.classList.remove('ucIH-visible', 'ucIH-fading');
    }

    /* ── Décompte rapide de `from` jusqu'à ≤ `until` ───────────────────── */
    /*    Appelle onDone() quand la limite est atteinte.                     */
    /*    Chaque tick : cur-- puis remainingSeconds = cur.                   */
    function _fastDecrement(from, until, tickMs, onDone) {
        var cur = from;
        function tick() {
            if (cur <= until) { onDone(); return; }
            cur--;
            remainingSeconds = cur;
            setTimeout(tick, tickMs);
        }
        tick();
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  ucSim(vitesse)  —  simulation auto complète
     * ═══════════════════════════════════════════════════════════════════════ */
    window.ucSim = function (vitesse) {
        vitesse = vitesse || 20;

        /* ms par seconde simulée */
        var ms = function (simSec) { return Math.round(simSec * 1000 / vitesse); };

        log('▶', 'Simulation ×' + vitesse +
            '  |  1 s réelle ≈ ' + vitesse + ' s simulées', C.ok);

        /* ① AZAN ─────────────────────────────────────────────────────────── */
        log('①', 'Popup azan affiché');
        showAzanPopup(false);

        /* ② FERMETURE AZAN (après 2 s réelles) ────────────────────────────── */
        setTimeout(function () {
            log('②', 'Fermeture popup azan');
            hideAzanPopupFunction();
            _overlayHide();

            /* ③ DÉMARRAGE COMPTEUR ──────────────────────────────────────────── */
            setTimeout(function () {
                log('③', 'Compteur iqama → 60 s');
                startIqamaCounterFunction(1, 15, 0);

                setTimeout(function () {
                    remainingSeconds = 60;

                    /* ④ DÉCOMPTE 60 → 33 ─────────────────────────────────────── */
                    log('④', 'Décompte rapide 60 → 33 s …', C.info);
                    _fastDecrement(60, 33, ms(1), function () {

                        /* ⑤ SEUIL 33 s — hadith overlay ─────────────────────── */
                        remainingSeconds = 33;
                        log('⑤', '33 s  → overlay hadith iqama');
                        if (JS_DATA.ucIqamaHadith == 1) {
                            _overlayShow();
                        } else {
                            log('⑤', '(ucIqamaHadith désactivé — overlay non affiché)', C.warn);
                        }

                        /* pause 700 ms pour que le poller COUNTDOWN_TICK capte 33 */
                        setTimeout(function () {

                            /* ⑥ DÉCOMPTE 33 → 20 ─────────────────────────────── */
                            log('⑥', 'Décompte rapide 33 → 20 s …', C.info);
                            _fastDecrement(33, 20, ms(1), function () {

                                /* ⑦ SEUIL 20 s — fondu sortie ───────────────────── */
                                remainingSeconds = 20;
                                log('⑦', '20 s  → fondu sortie du hadith');
                                if (JS_DATA.ucIqamaHadith == 1) _overlayFade();

                                /* pause 700 ms (poller + transition CSS démarrée) */
                                setTimeout(function () {

                                    /* ⑧ DÉCOMPTE 20 → 0 ──────────────────────────── */
                                    log('⑧', 'Décompte rapide 20 → 0 s …', C.info);
                                    _fastDecrement(20, 0, ms(1), function () {

                                        /* ⑨ IQAMA + ÉCRAN NOIR ───────────────────────── */
                                        remainingSeconds = 0;
                                        isIqamaCounterActive = false;  /* stoppe le tick normal */
                                        log('⑨', 'Iqama → écran noir dans 1.5 s (réelles)');

                                        setTimeout(function () {
                                            activateBlackScreenFunction();
                                            log('⑨', 'Écran noir activé');

                                            /* ⑩ FIN ──────────────────────────────────── */
                                            setTimeout(function () {
                                                deactivateBlackScreen();
                                                _overlayHide();
                                                log('⑩', '✅  Simulation terminée — écran normal', C.ok);
                                            }, 3000);

                                        }, 1500);
                                    });

                                }, 700);
                            });

                        }, 700);
                    });

                }, 200);   /* petite attente pour que startIqamaCounterFunction initialise */
            }, 400);
        }, 2000);          /* 2 s réelles pour voir le popup azan */
    };


    /* ═══════════════════════════════════════════════════════════════════════
     *  Commandes individuelles (mode pas-à-pas)
     * ═══════════════════════════════════════════════════════════════════════ */

    /** Affiche la page azan */
    window.ucSim.azan = function () {
        showAzanPopup(false);
        log('◀ azan()', 'Popup azan affiché');
    };

    /** Ferme la page azan */
    window.ucSim.closeAzan = function () {
        hideAzanPopupFunction();
        log('◀ closeAzan()', 'Popup azan fermé');
    };

    /** Démarre le compteur iqama depuis n secondes (défaut : 60) */
    window.ucSim.counter = function (n) {
        n = (typeof n === 'number') ? n : 60;
        startIqamaCounterFunction(1, 15, 0);
        setTimeout(function () {
            remainingSeconds = n;
            showIqamaCounter();   // affiche l'élément visuel du compteur
        }, 200);
        log('◀ counter(' + n + ')', 'Compteur iqama démarré à ' + n + ' s');
    };

    /** Saute directement à n secondes restantes */
    window.ucSim.jump = function (n) {
        remainingSeconds = n;
        log('◀ jump(' + n + ')', 'remainingSeconds = ' + n);
    };

    /** Affiche l'overlay hadith (force, indépendant du réglage) */
    window.ucSim.hadith = function () {
        _overlayShow();
        log('◀ hadith()', 'Overlay hadith affiché');
    };

    /** Déclenche le fondu sortie de l'overlay hadith */
    window.ucSim.fadeHadith = function () {
        _overlayFade();
        log('◀ fadeHadith()', 'Fondu sortie déclenché');
    };

    /** Active l'écran noir */
    window.ucSim.blackScreen = function () {
        activateBlackScreenFunction();
        log('◀ blackScreen()', 'Écran noir activé');
    };

    /** Réinitialise tout */
    window.ucSim.end = function () {
        deactivateBlackScreen();
        _overlayHide();
        isIqamaCounterActive = false;
        log('◀ end()', 'Tout réinitialisé');
    };


    /* ── Message d'installation ─────────────────────────────────────────── */
    console.log('%c ucSim installé ✅', C.ok);
    console.log('%c Simulation auto :  ucSim()  ou  ucSim(30)', C.step);
    console.log('%c Commandes :  ucSim.azan()  ucSim.counter(60)  ucSim.jump(33)  ucSim.hadith()  ucSim.fadeHadith()  ucSim.blackScreen()  ucSim.end()', C.info);

})();
