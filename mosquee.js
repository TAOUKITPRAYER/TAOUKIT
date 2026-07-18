/* ═══════════════════════════════════════════════════════════════════════════
   MOSQUEE.JS — Shim multi-mosquée (ne plus éditer pour changer de config)
   ─────────────────────────────────────────────────────────────────────────
   Ce fichier est désormais un SÉLECTEUR, pas une config statique.
   Toutes les configs mosquée sont dans spec/mosques-registry.js.

   Fonctionnement :
     1. Lit l'ID de la mosquée choisie dans localStorage (clé UC_MOSQUE_ID)
     2. Pointe window.MOSQUE_CONFIG vers l'entrée correspondante du registry
     3. Si aucun ID : pose un sentinel → le sélecteur UI s'affichera au démarrage

   Pour déployer une nouvelle mosquée :
     1. Ajouter une entrée dans spec/mosques-registry.js
     2. Incrémenter VERSION de cette entrée
     3. Un seul APK suffit pour toutes les mosquées
   ═══════════════════════════════════════════════════════════════════════════ */

(function _mosqueeShim() {
    var _id = null;
    try { _id = localStorage.getItem('UC_MOSQUE_ID'); } catch(e) {}

    if (_id && window.MOSQUES_REGISTRY && window.MOSQUES_REGISTRY[_id]) {
        window.MOSQUE_CONFIG = window.MOSQUES_REGISTRY[_id];
        console.log('[MOSQUE] Config chargee : ' + _id
                    + ' (' + window.MOSQUE_CONFIG.MOSQUE_NAME + ')');

        // Mosquee "anonyme" (modele generique) : si l'utilisateur a choisi une
        // localite via le mini-selecteur pays/ville de la modale d'avertissement
        // (cf. _installMosqueSelector, custom.js), on l'applique ICI, AVANT que
        // _applyMosqueConfig() (custom.js) ne lise MOSQUE_CONFIG.LOCATION_CODE —
        // remplace la ville generique par defaut du modele par le choix reel de
        // l'utilisateur, sans jamais modifier mosques-registry.js. Clone (pas de
        // mutation directe de l'entree du registry, partagee/reutilisable).
        if (window.MOSQUE_CONFIG._UC_ANONYMOUS) {
            var _anonLoc = null;
            try { _anonLoc = localStorage.getItem('UC_ANON_LOCATION_CODE'); } catch(e) {}
            if (_anonLoc) {
                var _cfg = {};
                for (var _k in window.MOSQUE_CONFIG) { _cfg[_k] = window.MOSQUE_CONFIG[_k]; }
                _cfg.LOCATION_CODE = _anonLoc;
                window.MOSQUE_CONFIG = _cfg;
                console.log('[MOSQUE] Localite anonyme surchargee : ' + _anonLoc);
            }
        }
    } else {
        // Aucune mosquée choisie : sentinel → _applyMosqueConfig() fera un skip
        // et _installMosqueSelector() (dans custom.js) affichera le sélecteur
        window.MOSQUE_CONFIG = { _NO_MOSQUE_SELECTED: true, VERSION: '__PENDING__' };
        console.log('[MOSQUE] Aucune mosquee selectionnee — affichage du selecteur UI');
    }
})();
