import './components/scroll-animations.js';

// Mobile nav (replicated minimal logic from main.js)
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');

    if (mobileToggle) mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    if (dropdownTrigger) dropdownTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownTrigger.parentElement.classList.toggle('dropdown-open');
        }
    });
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Collapse chips+meta when controls become sticky (hero scrolled past)
    const hero = document.querySelector('.inv-hero');
    const controls = document.querySelector('.inv-controls');
    if (hero && controls) {
        const stickyObs = new IntersectionObserver(([entry]) => {
            controls.classList.toggle('is-sticky', !entry.isIntersecting);
        }, { threshold: 0 });
        stickyObs.observe(hero);
    }

    initInventario();
});

// --- Categories (display order) ---
const CATEGORIES = [
    { id: 'all', label: 'Tutti' },
    { id: 'ortopedici', label: 'Ortopedici' },
    { id: 'ausili', label: 'Ausili & Mobilità' },
    { id: 'cuscini', label: 'Cuscini & Posturali' },
    { id: 'elettromedicali', label: 'Elettromedicali' },
    { id: 'cosmetici', label: 'Cosmetica & Linee' }
];

// --- Product DB (67 items) ---
const PRODUCTS = [
    // ORTOPEDICI
    { f: 'Busto_SpinalPlus_OrthoserviceRoten.jpg', n: 'Busto SpinalPlus', b: 'Ro+ten Orthoservice', c: 'ortopedici', t: ['busto','colonna','lombare','dorsale','postura','spalla'], d: 'Busto ortopedico per stabilizzazione dorso-lombare con supporto spallacci. Indicato per ernie discali, lombalgie croniche e fasi post-operatorie della colonna.' },
    { f: 'Calze_Compressione_Bauerfeind.jpg', n: 'Calze Compressione VenoTrain', b: 'Bauerfeind', c: 'ortopedici', t: ['calze','compressione','vene','elastocompressione','circolazione','gambe'], d: 'Calze elastiche terapeutiche a compressione graduata. Indicate per insufficienza venosa, edemi e prevenzione trombosi venosa profonda.' },
    { f: 'Calze_Compressione_Medi_Bauerfeind.jpg', n: 'Calze Compressione Medi & Bauerfeind', b: 'Medi / Bauerfeind', c: 'ortopedici', t: ['calze','compressione','vene','medi','bauerfeind','gambe'], d: 'Selezione delle migliori calze elastiche dei marchi leader. Disponibili in classi I, II e III con filo certificato e design anatomico.' },
    { f: 'Ortesi_Dorsale_ModularPlus_OrthoserviceRoten.jpg', n: 'Ortesi Dorsale ModularPlus', b: 'Ro+ten Orthoservice', c: 'ortopedici', t: ['ortesi','dorsale','colonna','postura','schiena'], d: 'Ortesi dorsale modulare regolabile per il sostegno della colonna toraco-lombare. Pratica nella vestizione e adattabile a diverse conformazioni.' },
    { f: 'Ortesi_Lombari_LumboPull_OrthoserviceRoten.jpg', n: 'Ortesi Lombare LumboPull', b: 'Ro+ten Orthoservice', c: 'ortopedici', t: ['ortesi','lombare','schiena','tiraggio','postura'], d: 'Cintura lombare con sistema di tensionamento a tiraggio. Stabilizza la zona lombo-sacrale e attenua il dolore in attività quotidiane.' },
    { f: 'Ortesi_Lombari_LumboTrain_Bauerfeind.jpg', n: 'Ortesi Lombare LumboTrain', b: 'Bauerfeind', c: 'ortopedici', t: ['ortesi','lombare','schiena','bauerfeind','training'], d: 'Cintura lombare attiva a maglia tridimensionale. Combina sostegno e libertà di movimento, ideale per lombalgie croniche e fasi riabilitative.' },
    { f: 'Ortesi_Lombari_SpinLoc_Bauerfeind.jpg', n: 'Ortesi Lombare SpinLoc', b: 'Bauerfeind', c: 'ortopedici', t: ['ortesi','lombare','rigida','schiena','immobilizzazione'], d: 'Ortesi lombo-sacrale rigida per stabilizzazione marcata. Indicata per fasi acute, post-trauma o post-chirurgia della colonna lombare.' },
    { f: 'Plantari_Solette_Eumedica.jpg', n: 'Plantari & Solette Eumedica', b: 'Eumedica', c: 'ortopedici', t: ['plantari','solette','piedi','postura','calzature'], d: 'Linea completa di plantari e solette correttive Eumedica. Distribuiscono il carico plantare e correggono difetti posturali del piede.' },
    { f: 'Sandali_Ortopedici_Berkemann.jpg', n: 'Sandali Ortopedici Berkemann', b: 'Berkemann', c: 'ortopedici', t: ['scarpe','sandali','calzature','piedi','comfort'], d: 'Sandali ortopedici premium Berkemann. Plantare anatomico in sughero e cuoio, predisposti per plantari su misura.' },
    { f: 'Scarpe_Ortopediche_CliaWalk.jpg', n: 'Scarpe Ortopediche CliaWalk', b: 'CliaWalk', c: 'ortopedici', t: ['scarpe','calzature','piedi','comfort','ortopediche'], d: 'Calzature ortopediche da passeggio con tomaia elastica e plantare estraibile. Comfort prolungato per piedi sensibili e patologie articolari.' },
    { f: 'Scarpe_Sportive_Bback.jpg', n: 'Scarpe Sportive Bback', b: 'Bback', c: 'ortopedici', t: ['scarpe','sportive','postura','calzature','schiena'], d: 'Scarpe sportive posturali Bback. Tecnologia che corregge l\'allineamento del corpo durante la deambulazione, riducendo tensioni dorsali.' },
    { f: 'Slip_Ernia_Pavis.jpg', n: 'Slip Ernia Pavis', b: 'Pavis', c: 'ortopedici', t: ['slip','ernia','contenitivo','pavis','inguinale'], d: 'Indumento contenitivo Pavis per ernia inguinale. Cucitura anatomica discreta, comfort prolungato anche sotto abbigliamento quotidiano.' },
    { f: 'Stivaletti_Ortopedici_Push.jpg', n: 'Stivaletti Ortopedici Push', b: 'Push', c: 'ortopedici', t: ['stivaletto','caviglia','immobilizzazione','post-operatorio','piede'], d: 'Stivaletto walker rigido Push per immobilizzazione di caviglia e piede. Indicato per fratture, distorsioni gravi e fasi post-chirurgiche.' },
    { f: 'Tutore_Caviglia_MalleoTrain_Bauerfeind.jpg', n: 'Tutore Caviglia MalleoTrain', b: 'Bauerfeind', c: 'ortopedici', t: ['tutore','caviglia','distorsione','sport','malleotrain'], d: 'Cavigliera attiva Bauerfeind con cuscinetti malleolari in silicone. Supporto propriocettivo per distorsioni e instabilità croniche.' },
    { f: 'Tutore_Ginocchio_GenuTrain_Bauerfeind.jpg', n: 'Tutore Ginocchio GenuTrain', b: 'Bauerfeind', c: 'ortopedici', t: ['tutore','ginocchio','genutrain','sport','articolazione'], d: 'Ginocchiera attiva GenuTrain con pelotta rotulea anatomica. Stabilizza l\'articolazione e attenua dolori da sovraccarico o artrosi iniziale.' },
    { f: 'Tutore_Polso_ManuTrain_Bauerfeind.jpg', n: 'Tutore Polso ManuTrain', b: 'Bauerfeind', c: 'ortopedici', t: ['tutore','polso','manutrain','tendinite','articolazione'], d: 'Polsiera attiva ManuTrain con pelotta integrata. Indicata per tunnel carpale, tendinopatie e infiammazioni articolari del polso.' },
    { f: 'Tutore_Polso_WristSupport_Push.jpg', n: 'Tutore Polso WristSupport', b: 'Push', c: 'ortopedici', t: ['tutore','polso','push','immobilizzazione','tendinite'], d: 'Polsiera Push con stecca palmare rigida. Supporto stabile per fasi acute, tunnel carpale e recupero post-trauma.' },
    { f: 'Tutori_EpiTrain_OmoTrain_Bauerfeind.jpg', n: 'Tutori EpiTrain & OmoTrain', b: 'Bauerfeind', c: 'ortopedici', t: ['tutore','gomito','spalla','epitrain','omotrain'], d: 'Coppia di tutori attivi per gomito (EpiTrain) e spalla (OmoTrain). Supporto propriocettivo per epicondiliti e instabilità della spalla.' },
    { f: 'Tutori_Ginocchio_GenuFit_OrthoserviceRoten.jpg', n: 'Tutori Ginocchio GenuFit', b: 'Ro+ten Orthoservice', c: 'ortopedici', t: ['tutore','ginocchio','genufit','rigido','legamenti'], d: 'Linea GenuFit di ortesi rigide e semirigide per il ginocchio. Sistemi a snodi regolabili per controllo ROM in fase riabilitativa.' },
    { f: 'Tutori_Spalla_Acromion_OrthoserviceRoten.jpg', n: 'Tutori Spalla Acromion', b: 'Ro+ten Orthoservice', c: 'ortopedici', t: ['tutore','spalla','acromion','immobilizzazione','clavicola'], d: 'Tutore di immobilizzazione della spalla Acromion. Indicato per lussazioni, lesioni cuffia rotatori e fasi post-operatorie.' },

    // AUSILI
    { f: 'Accessori_Posizionamento_Orthia.jpg', n: 'Accessori Posizionamento Orthia', b: 'Orthia', c: 'ausili', t: ['accessori','posizionamento','allettato','postura','letto'], d: 'Sistema di accessori modulari per il posizionamento del paziente allettato. Cunei, rulli e supporti per prevenire decubiti e contratture.' },
    { f: 'Bastoni_Alluminio_Brio_Mopedia.jpg', n: 'Bastoni Alluminio Brio', b: 'Mopedia', c: 'ausili', t: ['bastone','alluminio','deambulazione','brio','mopedia'], d: 'Bastoni in alluminio leggero regolabili in altezza. Impugnatura ergonomica e puntale antiscivolo per camminata sicura.' },
    { f: 'Carrozzina_Pieghevole_SanitariaCroce.jpg', n: 'Carrozzina Pieghevole', b: 'Sanitaria Croce', c: 'ausili', t: ['carrozzina','pieghevole','trasporto','mobilità','sedia rotelle'], d: 'Carrozzina pieghevole compatta. Telaio leggero ripiegabile, ideale per trasporto in auto e uso quotidiano.' },
    { f: 'Carrozzina_Transito_Acciaio_SanitariaCroce.jpg', n: 'Carrozzina Transito Acciaio', b: 'Sanitaria Croce', c: 'ausili', t: ['carrozzina','transito','acciaio','robusta','sedia rotelle'], d: 'Carrozzina da transito in acciaio robusto. Portata maggiorata, ruote piene anti-foratura, manovrabilità da accompagnatore.' },
    { f: 'Carrozzina_Transito_SanitariaCroce.jpg', n: 'Carrozzina Transito Standard', b: 'Sanitaria Croce', c: 'ausili', t: ['carrozzina','transito','standard','sedia rotelle','accompagnatore'], d: 'Carrozzina da transito polivalente per uso domiciliare e ospedaliero. Spinta agevole, freni di stazionamento e poggiapiedi estraibili.' },
    { f: 'Deambulatore_Acciaio_Clik_Mopedia.jpg', n: 'Deambulatore Acciaio Clik', b: 'Mopedia', c: 'ausili', t: ['deambulatore','acciaio','clik','girello','mopedia'], d: 'Deambulatore in acciaio a doppia crociera. Apertura rapida con sistema Clik, altezza regolabile e impugnature antiscivolo.' },
    { f: 'Deambulatore_Alluminio_Clik_Mopedia.jpg', n: 'Deambulatore Alluminio Clik', b: 'Mopedia', c: 'ausili', t: ['deambulatore','alluminio','clik','leggero','girello'], d: 'Deambulatore in alluminio extra-leggero. Pieghevole con singolo gesto, ideale per anziani con forza ridotta nelle braccia.' },
    { f: 'Lettini_Trattamento_Polaris_Mopedia.jpg', n: 'Lettini Trattamento Polaris', b: 'Mopedia', c: 'ausili', t: ['lettino','trattamento','massaggio','fisioterapia','polaris'], d: 'Lettini Polaris da trattamento per fisioterapia e massaggio. Robusti, regolabili in altezza, imbottitura ad alta densità.' },
    { f: 'Pedaliera_BiBike_SanitariaCroce.jpg', n: 'Pedaliera BiBike', b: 'Sanitaria Croce', c: 'ausili', t: ['pedaliera','bike','riabilitazione','arti inferiori','superiori'], d: 'Pedaliera BiBike per riabilitazione di arti superiori e inferiori. Resistenza regolabile e display multifunzione integrato.' },
    { f: 'Pedaliera_Crossy_Mopedia.jpg', n: 'Pedaliera Crossy', b: 'Mopedia', c: 'ausili', t: ['pedaliera','crossy','riabilitazione','allenamento','mopedia'], d: 'Pedaliera Crossy compatta per allenamento domiciliare. Tensione regolabile, struttura stabile e display essenziale.' },
    { f: 'Quadripode_Bastone_BrioHD_Mopedia.jpg', n: 'Quadripode BrioHD', b: 'Mopedia', c: 'ausili', t: ['quadripode','bastone','brioHD','equilibrio','appoggio'], d: 'Bastone quadripode BrioHD a base larga. Massima stabilità di appoggio per chi ha equilibrio compromesso.' },
    { f: 'Rollator_3Ruote_Mopedia.jpg', n: 'Rollator 3 Ruote', b: 'Mopedia', c: 'ausili', t: ['rollator','3 ruote','agile','stretto','passaggi'], d: 'Rollator a 3 ruote ultra-manovrabile. Ideale per spazi stretti e passaggi domestici, freni a leva e cestino integrato.' },
    { f: 'Rollator_Alluminio_Mopedia.jpg', n: 'Rollator Alluminio', b: 'Mopedia', c: 'ausili', t: ['rollator','alluminio','4 ruote','seduta','leggero'], d: 'Rollator in alluminio leggero a 4 ruote. Seduta integrata, schienale, freni di stazionamento e cestino portaoggetti.' },
    { f: 'Rollator_Oceano_Mopedia.jpg', n: 'Rollator Oceano', b: 'Mopedia', c: 'ausili', t: ['rollator','oceano','premium','seduta','design'], d: 'Rollator Oceano dal design elegante. Telaio rinforzato, ruote ammortizzate e sistema di chiusura compatto.' },
    { f: 'Rollator_Pieghevole_Mopedia.jpg', n: 'Rollator Pieghevole', b: 'Mopedia', c: 'ausili', t: ['rollator','pieghevole','trasporto','viaggio','mopedia'], d: 'Rollator pieghevole salvaspazio. Si chiude in pochi secondi, perfetto per il trasporto in auto e i viaggi.' },
    { f: 'Sedie_Doccia_Onda_SanitariaCroce.jpg', n: 'Sedia Doccia Onda', b: 'Sanitaria Croce', c: 'ausili', t: ['sedia','doccia','bagno','onda','antiscivolo'], d: 'Sedia da doccia Onda con seduta sagomata anti-scivolo. Altezza regolabile, struttura in alluminio inossidabile.' },
    { f: 'Seduta_Vasca_Onda_SanitariaCroce.jpg', n: 'Seduta Vasca Onda', b: 'Sanitaria Croce', c: 'ausili', t: ['seduta','vasca','bagno','sicurezza','onda'], d: 'Seduta universale per vasca Onda. Si appoggia ai bordi della vasca, facilitando l\'ingresso e l\'uscita in sicurezza.' },
    { f: 'Sedute_Vasca_Mopedia.jpg', n: 'Sedute Vasca Mopedia', b: 'Mopedia', c: 'ausili', t: ['seduta','vasca','bagno','sicurezza','mopedia'], d: 'Linea di sedute per vasca da bagno Mopedia. Modelli con e senza schienale, ventose anti-scivolo certificate.' },
    { f: 'Stampelle_Scarpe_PostOperatorie_Brio.jpg', n: 'Stampelle & Scarpe Post-Operatorie', b: 'Brio', c: 'ausili', t: ['stampelle','scarpe','post-operatorio','frattura','recupero'], d: 'Set per recupero post-operatorio: stampelle ascellari/canadesi e scarpe da scarico Brio. Per fratture e interventi al piede.' },
    { f: 'Tripodi_Quadripodi_Brio_Mopedia.jpg', n: 'Tripodi & Quadripodi Brio', b: 'Mopedia', c: 'ausili', t: ['tripode','quadripode','bastone','equilibrio','brio'], d: 'Selezione di bastoni a base allargata Brio. Versioni a tre o quattro punti d\'appoggio per massima stabilità.' },

    // CUSCINI
    { f: 'Cuscini_Antidecubito_SaniConfort.jpg', n: 'Cuscini Antidecubito', b: 'SaniConfort', c: 'cuscini', t: ['cuscino','antidecubito','allettato','prevenzione','saniconfort'], d: 'Cuscini antidecubito per pazienti allettati o in carrozzina. Distribuiscono la pressione prevenendo lesioni cutanee.' },
    { f: 'Cuscini_Cervicali_Viaggio_Generica.jpg', n: 'Cuscini Cervicali da Viaggio', b: 'Linea Viaggio', c: 'cuscini', t: ['cuscino','cervicale','viaggio','collo','memory'], d: 'Cuscini cervicali da viaggio. Sostengono collo e nuca durante spostamenti in auto, treno o aereo.' },
    { f: 'Cuscini_Postura_SaniConfort.jpg', n: 'Cuscini Postura', b: 'SaniConfort', c: 'cuscini', t: ['cuscino','postura','schiena','seduta','saniconfort'], d: 'Cuscini posturali per seduta corretta a casa o in ufficio. Migliorano l\'allineamento della colonna durante posture prolungate.' },
    { f: 'Cuscino_AntiProstatite_Orthia.jpg', n: 'Cuscino Anti-Prostatite', b: 'Orthia', c: 'cuscini', t: ['cuscino','prostatite','seduta','perineo','orthia'], d: 'Cuscino sagomato anti-prostatite. Forma a ferro di cavallo che scarica completamente la zona perineale durante la seduta.' },
    { f: 'Cuscino_Coccige_Orthia.jpg', n: 'Cuscino Coccige', b: 'Orthia', c: 'cuscini', t: ['cuscino','coccige','seduta','dolore','orthia'], d: 'Cuscino con cavità centrale per scarico del coccige. Ideale dopo cadute, parto o nei dolori cronici della zona sacro-coccigea.' },
    { f: 'Cuscino_Girapaziente_Mopedia.jpg', n: 'Cuscino Girapaziente', b: 'Mopedia', c: 'cuscini', t: ['cuscino','girapaziente','allettato','rotazione','assistenza'], d: 'Cuscino girapaziente per facilitare la rotazione del paziente allettato. Riduce lo sforzo del caregiver e protegge la cute.' },
    { f: 'Cuscino_MemoryFoam_Mopedia.jpg', n: 'Cuscino Memory Foam', b: 'Mopedia', c: 'cuscini', t: ['cuscino','memory','foam','comfort','mopedia'], d: 'Cuscino in memory foam ad alta densità. Si modella sul corpo distribuendo uniformemente la pressione.' },
    { f: 'Cuscino_Ortopedico_SanitariaCroce.jpg', n: 'Cuscino Ortopedico', b: 'Sanitaria Croce', c: 'cuscini', t: ['cuscino','ortopedico','seduta','postura','generico'], d: 'Cuscino ortopedico polivalente. Supporto fermo per seduta corretta su sedie, poltrone o carrozzine.' },
    { f: 'Cuscino_Viscoelastico_Mopedia.jpg', n: 'Cuscino Viscoelastico', b: 'Mopedia', c: 'cuscini', t: ['cuscino','viscoelastico','memory','comfort','antidecubito'], d: 'Cuscino viscoelastico ad effetto memory. Adatta la forma alle pressioni del corpo per un comfort prolungato.' },
    { f: 'Guanciale_Memory_SaniConfort.jpg', n: 'Guanciale Memory', b: 'SaniConfort', c: 'cuscini', t: ['guanciale','memory','riposo','cervicale','saniconfort'], d: 'Guanciale in memory foam con sagomatura cervicale. Sostiene testa e collo durante il riposo notturno.' },
    { f: 'Schienale_Ortopedico_Opera_SanitariaCroce.jpg', n: 'Schienale Ortopedico Opera', b: 'Sanitaria Croce', c: 'cuscini', t: ['schienale','ortopedico','opera','postura','seduta'], d: 'Schienale Opera per correzione posturale in sedia o poltrona. Sostegno lombare ergonomico, cinghie regolabili.' },
    { f: 'Schienale_Ortopedico_SanitariaCroce.jpg', n: 'Schienale Ortopedico Standard', b: 'Sanitaria Croce', c: 'cuscini', t: ['schienale','ortopedico','seduta','postura','lombare'], d: 'Schienale ortopedico universale. Migliora la postura durante posture prolungate in casa, ufficio o in auto.' },

    // ELETTROMEDICALI
    { f: 'Aerosol_Portatile_Mesh_Kyara.jpg', n: 'Aerosol Portatile Mesh', b: 'Kyara', c: 'elettromedicali', t: ['aerosol','portatile','mesh','silenzioso','respirazione'], d: 'Aerosol portatile a tecnologia mesh ultrasilenzioso. Funzionamento a batteria, ideale per uso domiciliare e in viaggio.' },
    { f: 'Magnetoterapia_Magnetovit_NewAge.jpg', n: 'Magnetoterapia Magnetovit', b: 'New Age', c: 'elettromedicali', t: ['magnetoterapia','magnetovit','riabilitazione','dolore','newage'], d: 'Apparecchio per magnetoterapia Magnetovit. Trattamento domiciliare di osteoporosi, fratture e dolori articolari cronici.' },
    { f: 'Misuratori_Pressione_Nebulizzatori_Omron.jpg', n: 'Misuratori Pressione & Nebulizzatori', b: 'Omron', c: 'elettromedicali', t: ['pressione','sfigmomanometro','nebulizzatore','omron','aerosol'], d: 'Selezione Omron di sfigmomanometri digitali e nebulizzatori certificati. Misurazione precisa per il monitoraggio domiciliare.' },
    { f: 'Scaldapiedi_Termoforo_Kyara.jpg', n: 'Scaldapiedi & Termoforo', b: 'Kyara', c: 'elettromedicali', t: ['scaldapiedi','termoforo','calore','dolore','kyara'], d: 'Scaldapiedi e termoforo elettrici Kyara. Trattamenti termici per contratture, dolori articolari e rigidità muscolare.' },
    { f: 'Spazzolini_Idropulsori_Cliadent.jpg', n: 'Spazzolini & Idropulsori', b: 'Cliadent', c: 'elettromedicali', t: ['spazzolino','idropulsore','igiene','denti','cliadent'], d: 'Linea Cliadent di spazzolini elettrici e idropulsori dentali. Igiene orale professionale a domicilio.' },
    { f: 'Stetoscopi_Pulsossimetri_Logiko.jpg', n: 'Stetoscopi & Pulsossimetri', b: 'Logiko', c: 'elettromedicali', t: ['stetoscopio','pulsossimetro','diagnostica','logiko','saturazione'], d: 'Strumenti diagnostici Logiko: stetoscopi classici e pulsossimetri da dito. Misurazione affidabile di battito e saturazione.' },

    // COSMETICI
    { f: 'Brochure_Cosmetici_Cosmedical.jpg', n: 'Linea Cosmetica Cosmedical', b: 'Cosmedical', c: 'cosmetici', t: ['cosmetici','brochure','linea','cosmedical','viso'], d: 'Brochure illustrativa della linea cosmetica Cosmedical. Trattamenti viso e corpo dermatologicamente testati.' },
    { f: 'Creme_AntiAge_Cosmedical.jpg', n: 'Creme Anti-Age', b: 'Cosmedical', c: 'cosmetici', t: ['crema','antiage','viso','rughe','cosmedical'], d: 'Creme anti-età Cosmedical. Formulazioni con principi attivi clinicamente testati per il contrasto dei segni del tempo.' },
    { f: 'Display_Cosmetici_Narika.jpg', n: 'Linea Cosmetica Narika', b: 'Narika', c: 'cosmetici', t: ['cosmetici','narika','display','viso','corpo'], d: 'Linea Narika in esposizione: creme, sieri e trattamenti viso/corpo selezionati per la cura quotidiana della pelle.' },
    { f: 'Display_Creme_Cosmedical.jpg', n: 'Display Creme Cosmedical', b: 'Cosmedical', c: 'cosmetici', t: ['creme','cosmedical','display','viso','idratante'], d: 'Espositore della gamma creme Cosmedical disponibile in negozio. Idratanti, lenitive e specifiche per pelli sensibili.' },
    { f: 'Display_Prodotti_Piedi_Eumedica.jpg', n: 'Linea Piedi Eumedica', b: 'Eumedica', c: 'cosmetici', t: ['piedi','eumedica','calli','duroni','alluce'], d: 'Linea Eumedica completa per la cura del piede. Separatori, protezioni in gel, correttori per alluce valgo e creme rigeneranti.' },
    { f: 'Display_Tutori_Orthoself_OrthoserviceRoten.jpg', n: 'Linea Orthoself Tutori', b: 'Ro+ten Orthoservice', c: 'cosmetici', t: ['tutori','orthoself','display','linea','orthoservice'], d: 'Espositore Orthoself con la linea completa di tutori articolari pronti all\'uso. Soluzioni rapide per ogni distretto corporeo.' },
    { f: 'Display_Valgofix_Eumedica.jpg', n: 'Display Valgofix Eumedica', b: 'Eumedica', c: 'cosmetici', t: ['valgofix','alluce valgo','eumedica','correttore','display'], d: 'Espositore dedicato a Valgofix Eumedica. Correttore notturno per alluce valgo, supporto anatomico durante il riposo.' }
];

// --- State ---
const state = {
    query: '',
    category: 'all'
};

// --- Init ---
function initInventario() {
    renderChips();
    renderGrid();
    bindSearch();
    bindModal();
}

// --- Chips ---
function renderChips() {
    const wrap = document.getElementById('inv-chips');
    wrap.innerHTML = CATEGORIES.map(cat => {
        const count = cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.c === cat.id).length;
        return `<button class="inv-chip ${state.category === cat.id ? 'is-active' : ''}" data-cat="${cat.id}">
            <span>${cat.label}</span><em>${count}</em>
        </button>`;
    }).join('');
    wrap.querySelectorAll('.inv-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            state.category = btn.dataset.cat;
            renderChips();
            renderGrid();
        });
    });
}

// --- Smart filter ---
function filterProducts() {
    const q = state.query.trim().toLowerCase();
    return PRODUCTS.filter(p => {
        if (state.category !== 'all' && p.c !== state.category) return false;
        if (!q) return true;
        const tokens = q.split(/\s+/).filter(Boolean);
        const haystack = `${p.n} ${p.b} ${p.c} ${p.t.join(' ')} ${p.d}`.toLowerCase();
        return tokens.every(tok => haystack.includes(tok));
    });
}

// --- Grid render (group by category when no search) ---
function renderGrid() {
    const root = document.getElementById('inv-grid-root');
    const meta = document.getElementById('inv-meta');
    const items = filterProducts();

    meta.textContent = items.length === PRODUCTS.length
        ? `${items.length} prodotti disponibili`
        : `${items.length} ${items.length === 1 ? 'risultato' : 'risultati'}`;

    if (!items.length) {
        root.innerHTML = `<div class="inv-empty">
            <p class="inv-empty-title">Nessun risultato</p>
            <p class="inv-empty-hint">Prova con una parola chiave più generica o cambia categoria.</p>
        </div>`;
        return;
    }

    const showSearchView = state.query.trim().length > 0;
    if (showSearchView) {
        root.innerHTML = `<section class="inv-section">
            <div class="inv-section-head">
                <h2 class="inv-section-title">Risultati ricerca</h2>
                <span class="inv-section-count">${items.length}</span>
            </div>
            <div class="inv-grid">${items.map(cardTpl).join('')}</div>
        </section>`;
    } else {
        const cats = state.category === 'all' ? CATEGORIES.filter(c => c.id !== 'all') : CATEGORIES.filter(c => c.id === state.category);
        root.innerHTML = cats.map(cat => {
            const list = items.filter(p => p.c === cat.id);
            if (!list.length) return '';
            return `<section class="inv-section" id="cat-${cat.id}">
                <div class="inv-section-head">
                    <h2 class="inv-section-title">${cat.label}</h2>
                    <span class="inv-section-count">${list.length}</span>
                </div>
                <div class="inv-grid">${list.map(cardTpl).join('')}</div>
            </section>`;
        }).join('');
    }
    bindCardClicks();
}

function cardTpl(p) {
    return `<article class="inv-card" data-id="${p.f}" tabindex="0">
        <div class="inv-card-image">
            <img src="/assets/gallery/${p.f}" alt="${p.n}" loading="lazy">
        </div>
        <div class="inv-card-body">
            <span class="inv-card-brand">${p.b}</span>
            <h3 class="inv-card-name">${p.n}</h3>
            <div class="inv-card-tags">${p.t.slice(0, 3).map(t => `<span>${t}</span>`).join('')}</div>
        </div>
    </article>`;
}

// --- Search bind ---
function bindSearch() {
    const input = document.getElementById('inv-search');
    const clear = document.getElementById('inv-search-clear');
    let debounce;
    input.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            state.query = input.value;
            document.body.classList.toggle('inv-has-query', !!state.query.trim());
            renderGrid();
        }, 120);
    });
    clear.addEventListener('click', () => {
        input.value = '';
        state.query = '';
        document.body.classList.remove('inv-has-query');
        renderGrid();
        input.focus();
    });
}

// --- Modal ---
function bindCardClicks() {
    document.querySelectorAll('.inv-card').forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.id));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card.dataset.id);
            }
        });
    });
}

function bindModal() {
    const modal = document.getElementById('inv-modal');
    modal.querySelectorAll('[data-close]').forEach(el => {
        el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(id) {
    const p = PRODUCTS.find(x => x.f === id);
    if (!p) return;
    const modal = document.getElementById('inv-modal');
    document.getElementById('inv-modal-image').src = `/assets/gallery/${p.f}`;
    document.getElementById('inv-modal-image').alt = p.n;
    document.getElementById('inv-modal-cat').textContent = (CATEGORIES.find(c => c.id === p.c) || {}).label || '';
    document.getElementById('inv-modal-title').textContent = p.n;
    document.getElementById('inv-modal-brand').textContent = p.b;
    document.getElementById('inv-modal-desc').textContent = p.d;
    document.getElementById('inv-modal-tags').innerHTML = p.t.map(t => `<span>${t}</span>`).join('');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('inv-modal');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
