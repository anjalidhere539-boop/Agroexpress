/**
 * AgroExpress - Core Application Logic
 * Mobile UI Controller, Reactive State, Cart & Checkout Engine
 * Supports Multi-Language: English (en), Hindi (hi), Marathi (mr)
 */

(function() {
  'use strict';

  // --- STATE ---
  const state = {
    currentTab: 'home',
    selectedCategory: 'all',
    searchQuery: '',
    shopFilterId: null,
    language: localStorage.getItem('agro_lang') || 'en', // 'en', 'hi', 'mr'
    pendingLanguage: localStorage.getItem('agro_lang') || 'en',
    cart: JSON.parse(localStorage.getItem('agro_cart') || '[]'),
    orders: JSON.parse(localStorage.getItem('agro_orders') || '[]'),
    activeLocation: {
      title: 'Kisan Nagar Mandi Hub',
      sub: 'Within 5 km radius • PIN 452001',
      pincode: '452001'
    },
    isDesktopExpanded: false
  };

  // --- COMPREHENSIVE I18N DICTIONARY ---
  const i18n = {
    en: {
      langBadge: '🌐 English',
      tagline: 'Smart Local Mandi Delivery',
      locChange: 'Change ▾',
      searchPlaceholder: 'Search seeds, urea, pesticides, tools...',
      tagAll: '🌾 All Items',
      tagUrea: '🧪 Neem Urea',
      tagDAP: '🧪 IFFCO DAP',
      tagWheat: '🌱 Wheat Seeds',
      tagBasmati: '🌱 Basmati Paddy',
      tagPest: '🛡️ Bio-Pesticide',
      tagSprayer: '🚜 Sprayer Pump',
      dosageCardTitle: 'Crop Dosage Calculator',
      dosageCardSub: 'Know exact Bags of Urea, DAP & Seed for your field',
      calcBtnMini: 'Calculate →',
      nearbyShopsTitle: 'Nearby Agri Retailers',
      viewAllShops: 'View All',
      productsTitle: 'Certified Farm Products',
      reset: 'Reset',
      floatingCartSub: 'Free Mandi Delivery above ₹1000',
      viewCartBtn: 'View Cart 🛒 →',
      navHome: 'Home',
      navShops: 'Shops',
      navDosage: 'Dosage',
      navCart: 'Cart',
      navOrders: 'Orders',
      addToCart: 'Add to Cart',
      inCart: 'in Cart',
      cartTitle: '🛒 Your Farm Cart',
      cartEmptyTitle: 'Your farm cart is empty',
      cartEmptySub: 'Add certified seeds, fertilizers, or tools from local shops to proceed.',
      exploreBtn: 'Explore Agricultural Products',
      itemsTotalLabel: 'Items Total:',
      deliveryLabel: 'Local Mandi Delivery:',
      freeDeliveryText: 'FREE (Above ₹1000)',
      payableLabel: 'Payable Amount:',
      qualityAssurance: 'Govt. Subsidized & 100% Genuine Certified Quality Assurance',
      proceedCheckout: 'Proceed to Express Checkout',
      checkoutTitle: '⚡ Express Delivery Checkout',
      farmerNameLabel: 'Farmer / Buyer Full Name *',
      farmerPhoneLabel: 'Mobile Number (For Delivery OTP) *',
      villageAddressLabel: 'Village / Farm Location / House Address *',
      choosePaymentLabel: 'Choose Payment Method *',
      codTitle: '💵 Cash on Delivery (COD)',
      codSub: 'Pay cash upon delivery at your farm gate',
      upiTitle: '📱 UPI / QR Code on Delivery',
      upiSub: 'Google Pay, PhonePe, Paytm upon inspection',
      placeOrderBtn: 'Place Order',
      orderConfirmed: 'Order Confirmed! Delivering shortly.',
      ordersModalTitle: '📦 Farm Orders & Tracking',
      noOrdersTitle: 'No orders placed yet',
      noOrdersSub: 'Your past seed, fertilizer, and farm equipment orders will show here.',
      trackDeliveryBtn: 'Track Delivery 🚜',
      dosageModalTitle: '📐 Crop Dosage & Requirement',
      selectCropLabel: 'Select Your Crop (फसल चुनें):',
      farmAreaLabel: 'Total Farm Area in Acres (एकड़ दर्ज करें):',
      recForArea: 'Recommended Requirement for',
      ureaBagLabel: 'Urea (45 Kg Bags)',
      dapBagLabel: 'DAP (50 Kg Bags)',
      mopBagLabel: 'MOP Potash (50 Kg)',
      seedKgLabel: 'Certified Seeds',
      agronomistTipLabel: 'Agronomist Advisory:',
      orderFertilizersBtn: 'Order Required Fertilizers Now →',
      locationModalTitle: '📍 Select Your Mandi / Location',
      locationModalDesc: 'Select your local tehsil or Mandi market to find nearby agricultural shops within 5-10 km.',
      mandiInputLabel: 'Town / Mandi / Village Name:',
      pincodeInputLabel: 'Pincode:',
      saveLocationBtn: 'Save Location & Find Shops',
      langModalTitle: '🌐 Select Language / भाषा निवडा',
      langModalDesc: 'Choose your preferred language for farming products, prices, and crop guidance:',
      applyLangBtn: 'Apply Language / भाषा लागू करा',
      voicePrompt: '🎙️ Speak to search (e.g. "Urea", "Wheat Seeds")...',
      voiceSuccess: 'Searched for:',
      toastLangSet: 'Language updated to English'
    },
    hi: {
      langBadge: '🇮🇳 हिन्दी',
      tagline: 'स्मार्ट स्थानीय मंडी डिलीवरी',
      locChange: 'बदलें ▾',
      searchPlaceholder: 'बीज, खाद, कीटनाशक, स्प्रेयर खोजें...',
      tagAll: '🌾 सभी उत्पाद',
      tagUrea: '🧪 नीम यूरिया',
      tagDAP: '🧪 इफको डीएपी',
      tagWheat: '🌱 गेहूं बीज',
      tagBasmati: '🌱 बासमती धान',
      tagPest: '🛡️ कीटनाशक',
      tagSprayer: '🚜 स्प्रेयर पंप',
      dosageCardTitle: 'खाद एवं बीज मात्रा कैलकुलेटर',
      dosageCardSub: 'अपने खेत के एकड़ अनुसार सही मात्रा व बोरियां जानें',
      calcBtnMini: 'हिसाब करें →',
      nearbyShopsTitle: 'नजदीकी कृषि दुकानें',
      viewAllShops: 'सभी देखें',
      productsTitle: 'प्रमाणित कृषि उत्पाद',
      reset: 'रीसेट',
      floatingCartSub: '₹1000 से अधिक पर फ्री मंडी डिलीवरी',
      viewCartBtn: 'टोकरी देखें 🛒 →',
      navHome: 'होम',
      navShops: 'दुकानें',
      navDosage: 'मात्रा',
      navCart: 'टोकरी',
      navOrders: 'आर्डर',
      addToCart: 'खरीदें',
      inCart: 'टोकरी में',
      cartTitle: '🛒 आपकी किसान टोकरी',
      cartEmptyTitle: 'आपकी टोकरी खाली है',
      cartEmptySub: 'नजदीकी मंडी से प्रमाणित बीज, खाद या उपकरण जोड़ें।',
      exploreBtn: 'कृषि उत्पाद देखें',
      itemsTotalLabel: 'उत्पादों का कुल मूल्य:',
      deliveryLabel: 'स्थानीय मंडी डिलीवरी:',
      freeDeliveryText: 'निःशुल्क (₹1000 से अधिक)',
      payableLabel: 'कुल देय राशि:',
      qualityAssurance: 'सरकारी सब्सिडी एवं 100% शुद्ध प्रमाणित गुणवत्ता की गारंटी',
      proceedCheckout: 'त्वरित चेकआउट करें',
      checkoutTitle: '⚡ त्वरित डिलीवरी चेकआउट',
      farmerNameLabel: 'किसान / खरीदार का पूरा नाम *',
      farmerPhoneLabel: 'मोबाइल नंबर (डिलीवरी ओटीपी हेतु) *',
      villageAddressLabel: 'गांव / खेत का पता / मकान नंबर *',
      choosePaymentLabel: 'भुगतान का तरीका चुनें *',
      codTitle: '💵 कैश ऑन डिलीवरी (खेत पर नकद दें)',
      codSub: 'माल आपके खेत/घर पहुंचने पर नकद भुगतान करें',
      upiTitle: '📱 यूपीआई / क्यूआर कोड डिलीवरी',
      upiSub: 'PhonePe, Google Pay, Paytm द्वारा भुगतान',
      placeOrderBtn: 'आर्डर पक्का करें',
      orderConfirmed: 'आर्डर सफल! दुकान से डिलीवरी रवाना होगी।',
      ordersModalTitle: '📦 मेरे आर्डर एवं ट्रैकिंग',
      noOrdersTitle: 'अभी तक कोई आर्डर नहीं दिया गया',
      noOrdersSub: 'आपके पिछले बीज, खाद एवं कृषि यंत्रों के आर्डर यहां दिखेंगे।',
      trackDeliveryBtn: 'डिलीवरी ट्रैक करें 🚜',
      dosageModalTitle: '📐 फसल अनुसार खाद व बीज मात्रा',
      selectCropLabel: 'अपनी फसल चुनें:',
      farmAreaLabel: 'खेत का कुल क्षेत्रफल एकड़ में:',
      recForArea: 'के लिए आवश्यक मात्रा',
      ureaBagLabel: 'यूरिया (45 किलो बोरी)',
      dapBagLabel: 'डीएपी (50 किलो बोरी)',
      mopBagLabel: 'पोटाश (50 किलो बोरी)',
      seedKgLabel: 'प्रमाणित बीज (किग्रा)',
      agronomistTipLabel: 'कृषि वैज्ञानिक सलाह:',
      orderFertilizersBtn: 'आवश्यक खाद तुरंत आर्डर करें →',
      locationModalTitle: '📍 अपनी मंडी / स्थान चुनें',
      locationModalDesc: '5-10 किमी के भीतर कृषि दुकानों को देखने के लिए अपनी तहसील या मंडी चुनें।',
      mandiInputLabel: 'शहर / मंडी / गांव का नाम:',
      pincodeInputLabel: 'पिनकोड:',
      saveLocationBtn: 'स्थान सुरक्षित करें और दुकानें देखें',
      langModalTitle: '🌐 भाषा चुनें (Select Language)',
      langModalDesc: 'कृषि उत्पाद, मूल्य एवं सलाह अपनी पसंद की भाषा में देखें:',
      applyLangBtn: 'भाषा लागू करें',
      voicePrompt: '🎙️ बोल कर खोजें (जैसे: यूरिया, गेहूं बीज, स्प्रेयर)...',
      voiceSuccess: 'खोजा गया:',
      toastLangSet: 'भाषा हिन्दी में बदली गई'
    },
    mr: {
      langBadge: '🚩 मराठी',
      tagline: 'स्मार्ट स्थानिक कृषी बाजार थेट शेतापर्यंत',
      locChange: 'बदला ▾',
      searchPlaceholder: 'बियाणे, युरिया खते, कीटकनाशके, फवारणी पंप शोधा...',
      tagAll: '🌾 सर्व उत्पादने',
      tagUrea: '🧪 नीम युरिया',
      tagDAP: '🧪 इफको डीएपी',
      tagWheat: '🌱 गहू बियाणे',
      tagBasmati: '🌱 बासमती भात',
      tagPest: '🛡️ कीटकनाशक',
      tagSprayer: '🚜 फवारणी पंप',
      dosageCardTitle: 'खत व बियाणे मात्रा कॅल्क्युलेटर',
      dosageCardSub: 'शेताच्या एकरानुसार युरिया, डीएपी व बियाण्यांचे अचूक प्रमाण जाणून घ्या',
      calcBtnMini: 'हिशोब करा →',
      nearbyShopsTitle: 'नजीकची कृषी सेवा केंद्रे',
      viewAllShops: 'सर्व पहा',
      productsTitle: 'प्रमाणित कृषी उत्पादने',
      reset: 'रीसेट',
      floatingCartSub: '₹1000 वरील खरेदीवर मोफत कृषी डिलिव्हरी',
      viewCartBtn: 'खरेदी टोपली पहा 🛒 →',
      navHome: 'मुख्य',
      navShops: 'दुकान',
      navDosage: 'मात्रा',
      navCart: 'टोपली',
      navOrders: 'ऑर्डर्स',
      addToCart: 'खरेदी करा',
      inCart: 'टोपलीत',
      cartTitle: '🛒 तुमची शेतकरी खरेदी टोपली',
      cartEmptyTitle: 'तुमची खरेदी टोपली रिकामी आहे',
      cartEmptySub: 'स्थानिक कृषी केंद्रातून प्रमाणित बियाणे, खते किंवा अवजारे जोडा.',
      exploreBtn: 'कृषी उत्पादने पहा',
      itemsTotalLabel: 'उत्पादनांची एकूण रक्कम:',
      deliveryLabel: 'स्थानिक कृषी केंद्र डिलिव्हरी:',
      freeDeliveryText: 'मोफत (₹1000 च्या पुढे)',
      payableLabel: 'एकूण देय रक्कम:',
      qualityAssurance: 'शासकीय अनुदानित व 100% अस्सल प्रमाणित दर्जा हमी',
      proceedCheckout: 'जलद डिलिव्हरी चेकआउटकडे जा',
      checkoutTitle: '⚡ जलद शेत डिलिव्हरी चेकआउट',
      farmerNameLabel: 'शेतकरी / ग्राहकाचे संपूर्ण नाव *',
      farmerPhoneLabel: 'मोबाईल क्रमांक (डिलिव्हरी ओटीपीसाठी) *',
      villageAddressLabel: 'गाव / शेताचा पत्ता / घराचा पत्ता *',
      choosePaymentLabel: 'पैसे देण्याची पद्धत निवडा *',
      codTitle: '💵 कॅश ऑन डिलिव्हरी (शेतात रोख द्या)',
      codSub: 'माल शेतात पोहोचल्यावर रोख पैसे द्या',
      upiTitle: '📱 यूपीआय / क्यूआर कोड डिलिव्हरी',
      upiSub: 'PhonePe, Google Pay, Paytm द्वारे पैसे द्या',
      placeOrderBtn: 'ऑर्डर नोंदवा',
      orderConfirmed: 'ऑर्डर यशस्वी झाली! दुकान माल रवाना करत आहे.',
      ordersModalTitle: '📦 शेतकरी ऑर्डर्स व ट्रॅकिंग',
      noOrdersTitle: 'अजून कोणतीही ऑर्डर दिलेली नाही',
      noOrdersSub: 'तुमच्या बियाणे, खते आणि अवजारांच्या सर्व नोंदी येथे दिसतील.',
      trackDeliveryBtn: 'डिलिव्हरी ट्रॅक करा 🚜',
      dosageModalTitle: '📐 पीकनिहाय खत व बियाणे मात्रा',
      selectCropLabel: 'तुमचे पीक निवडा:',
      farmAreaLabel: 'शेताचे एकूण क्षेत्र एकरामध्ये:',
      recForArea: 'साठी शिफारस केलेले प्रमाण',
      ureaBagLabel: 'युरिया (45 किलो गोणी)',
      dapBagLabel: 'डीएपी (50 किलो गोणी)',
      mopBagLabel: 'पोटॅश (50 किलो गोणी)',
      seedKgLabel: 'प्रमाणित बियाणे (किलो)',
      agronomistTipLabel: 'कृषी तज्ज्ञांचा सल्ला:',
      orderFertilizersBtn: 'आवश्यक खते आत्ताच मागवा →',
      locationModalTitle: '📍 तुमचा कृषी बाजार / गाव निवडा',
      locationModalDesc: '5-10 किमी मधील कृषी दुकाने शोधण्यासाठी तुमचा तालुका किंवा गाव निवडा.',
      mandiInputLabel: 'शहर / कृषी बाजार / गावाचे नाव:',
      pincodeInputLabel: 'पिनकोड:',
      saveLocationBtn: 'स्थान जतन करा आणि दुकाने शोधा',
      langModalTitle: '🌐 भाषा निवडा (Select Language)',
      langModalDesc: 'कृषी उत्पादने, दर आणि सल्ला तुमच्या आवडत्या भाषेत मिळवा:',
      applyLangBtn: 'भाषा लागू करा',
      voicePrompt: '🎙️ बोला (युरिया, गहू बियाणे, कीटकनाशक ऐकण्यासाठी तयार)...',
      voiceSuccess: 'शोधलेले:',
      toastLangSet: 'मराठी भाषा निवडली गेली'
    }
  };

  // --- HELPER TO GET LOCALIZED TEXT FROM DATA OBJECT ---
  function getLocalizedText(obj, fieldName) {
    if (!obj) return '';
    if (state.language === 'mr') {
      return obj[fieldName + 'Mr'] || obj.marathiName || obj[fieldName + 'Hi'] || obj.hindiName || obj[fieldName] || '';
    } else if (state.language === 'hi') {
      return obj[fieldName + 'Hi'] || obj.hindiName || obj[fieldName] || '';
    }
    return obj[fieldName] || '';
  }

  // --- DOM REFERENCES ---
  const dom = {
    deviceEnv: document.getElementById('deviceEnv'),
    mobileFrame: document.getElementById('mobileFrame'),
    viewToggleBtn: document.getElementById('viewToggleBtn'),
    langToggleBtn: document.getElementById('langToggleBtn'),
    currentLangTag: document.getElementById('currentLangTag'),
    appTagline: document.getElementById('appTagline'),
    locationSelectorBar: document.getElementById('locationSelectorBar'),
    locText: document.getElementById('locText'),
    locSub: document.getElementById('locSub'),
    locChangeBtn: document.getElementById('locChangeBtn'),
    searchInput: document.getElementById('searchInput'),
    micBtn: document.getElementById('micBtn'),
    quickTagsScroller: document.getElementById('quickTagsScroller'),
    tagAll: document.getElementById('tagAll'),
    tagUrea: document.getElementById('tagUrea'),
    tagDAP: document.getElementById('tagDAP'),
    tagWheat: document.getElementById('tagWheat'),
    tagBasmati: document.getElementById('tagBasmati'),
    tagPest: document.getElementById('tagPest'),
    tagSprayer: document.getElementById('tagSprayer'),
    bannerCarousel: document.getElementById('bannerCarousel'),
    categoriesPills: document.getElementById('categoriesPills'),
    dosageCardTitle: document.getElementById('dosageCardTitle'),
    dosageCardSub: document.getElementById('dosageCardSub'),
    calcBtnMini: document.getElementById('calcBtnMini'),
    nearbyShopsTitle: document.getElementById('nearbyShopsTitle'),
    viewAllShopsLink: document.getElementById('viewAllShopsLink'),
    shopsScroller: document.getElementById('shopsScroller'),
    productsTitle: document.getElementById('productsTitle'),
    resetProductsLink: document.getElementById('resetProductsLink'),
    productsGrid: document.getElementById('productsGrid'),
    floatingCartBar: document.getElementById('floatingCartBar'),
    floatingCartCount: document.getElementById('floatingCartCount'),
    floatingCartPrice: document.getElementById('floatingCartPrice'),
    floatingCartSub: document.getElementById('floatingCartSub'),
    floatingCartBtn: document.getElementById('floatingCartBtn'),
    cartBadgeNav: document.getElementById('cartBadgeNav'),
    bottomNav: document.getElementById('bottomNav'),
    navHomeText: document.getElementById('navHomeText'),
    navShopsText: document.getElementById('navShopsText'),
    navDosageText: document.getElementById('navDosageText'),
    navCartText: document.getElementById('navCartText'),
    navOrdersText: document.getElementById('navOrdersText'),
    toastBox: document.getElementById('toastBox'),

    // Modals
    modalProduct: document.getElementById('modalProduct'),
    productDetailContent: document.getElementById('productDetailContent'),
    
    modalShop: document.getElementById('modalShop'),
    shopDetailContent: document.getElementById('shopDetailContent'),
    
    modalCart: document.getElementById('modalCart'),
    cartSheetBody: document.getElementById('cartSheetBody'),
    cartSheetFooter: document.getElementById('cartSheetFooter'),

    modalCheckout: document.getElementById('modalCheckout'),
    checkoutItemsSummary: document.getElementById('checkoutItemsSummary'),
    checkoutTotalAmount: document.getElementById('checkoutTotalAmount'),
    checkoutForm: document.getElementById('checkoutForm'),

    modalOrders: document.getElementById('modalOrders'),
    ordersListBody: document.getElementById('ordersListBody'),

    modalDosage: document.getElementById('modalDosage'),
    dosageCropSelect: document.getElementById('dosageCropSelect'),
    dosageAcresInput: document.getElementById('dosageAcresInput'),
    dosageResultContainer: document.getElementById('dosageResultContainer'),

    modalLocation: document.getElementById('modalLocation'),
    locationInput: document.getElementById('locationInput'),
    pincodeInput: document.getElementById('pincodeInput'),

    modalLanguage: document.getElementById('modalLanguage'),
    langOptionsGrid: document.getElementById('langOptionsGrid'),
    confirmLangBtn: document.getElementById('confirmLangBtn')
  };

  // --- INITIALIZATION ---
  function init() {
    setupEventListeners();
    applyLanguage(state.language, false);
    renderBanners();
    renderCategories();
    renderShops();
    renderProducts();
    updateCartUI();
    calculateDosage();
  }

  // --- APPLY LANGUAGE GLOBALLY ---
  function applyLanguage(langCode, showFeedback = true) {
    if (!['en', 'hi', 'mr'].includes(langCode)) langCode = 'en';
    state.language = langCode;
    state.pendingLanguage = langCode;
    localStorage.setItem('agro_lang', langCode);

    const t = i18n[langCode];

    // Header & Tagline
    if (dom.currentLangTag) dom.currentLangTag.textContent = t.langBadge;
    if (dom.appTagline) dom.appTagline.textContent = t.tagline;
    if (dom.locChangeBtn) dom.locChangeBtn.textContent = t.locChange;
    if (dom.searchInput) dom.searchInput.placeholder = t.searchPlaceholder;

    // Quick Tags
    if (dom.tagAll) dom.tagAll.textContent = t.tagAll;
    if (dom.tagUrea) dom.tagUrea.textContent = t.tagUrea;
    if (dom.tagDAP) dom.tagDAP.textContent = t.tagDAP;
    if (dom.tagWheat) dom.tagWheat.textContent = t.tagWheat;
    if (dom.tagBasmati) dom.tagBasmati.textContent = t.tagBasmati;
    if (dom.tagPest) dom.tagPest.textContent = t.tagPest;
    if (dom.tagSprayer) dom.tagSprayer.textContent = t.tagSprayer;

    // Dosage Card & Titles
    if (dom.dosageCardTitle) dom.dosageCardTitle.textContent = t.dosageCardTitle;
    if (dom.dosageCardSub) dom.dosageCardSub.textContent = t.dosageCardSub;
    if (dom.calcBtnMini) dom.calcBtnMini.textContent = t.calcBtnMini;
    if (dom.nearbyShopsTitle) dom.nearbyShopsTitle.textContent = t.nearbyShopsTitle;
    if (dom.viewAllShopsLink) dom.viewAllShopsLink.textContent = t.viewAllShops;
    if (dom.productsTitle) dom.productsTitle.textContent = t.productsTitle;
    if (dom.resetProductsLink) dom.resetProductsLink.textContent = t.reset;

    // Bottom Navigation
    if (dom.navHomeText) dom.navHomeText.textContent = t.navHome;
    if (dom.navShopsText) dom.navShopsText.textContent = t.navShops;
    if (dom.navDosageText) dom.navDosageText.textContent = t.navDosage;
    if (dom.navCartText) dom.navCartText.textContent = t.navCart;
    if (dom.navOrdersText) dom.navOrdersText.textContent = t.navOrders;

    // Floating Cart Bar
    if (dom.floatingCartSub) dom.floatingCartSub.textContent = t.floatingCartSub;
    if (dom.floatingCartBtn) dom.floatingCartBtn.textContent = t.viewCartBtn;

    // Update Language Modal Options selection state
    updateLanguageCardsUI();

    // Re-render Dynamic Content
    renderBanners();
    renderCategories();
    renderShops();
    renderProducts();
    calculateDosage();

    // If Cart or Orders modal is open, re-render
    if (dom.modalCart.classList.contains('active')) renderCartSheetContent();
    if (dom.modalOrders.classList.contains('active')) renderOrdersList();

    if (showFeedback) {
      showToast(t.toastLangSet);
    }
  }

  function updateLanguageCardsUI() {
    if (!dom.langOptionsGrid) return;
    dom.langOptionsGrid.querySelectorAll('.lang-card').forEach(card => {
      const code = card.getAttribute('data-lang');
      if (code === state.pendingLanguage) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Desktop View Toggle
    if (dom.viewToggleBtn) {
      dom.viewToggleBtn.addEventListener('click', () => {
        state.isDesktopExpanded = !state.isDesktopExpanded;
        if (state.isDesktopExpanded) {
          dom.deviceEnv.classList.add('fullscreen-mode');
          dom.viewToggleBtn.textContent = '📱 Phone View';
        } else {
          dom.deviceEnv.classList.remove('fullscreen-mode');
          dom.viewToggleBtn.textContent = '🖥️ Fullscreen View';
        }
      });
    }

    // Language Modal Trigger Button
    dom.langToggleBtn.addEventListener('click', () => {
      state.pendingLanguage = state.language;
      updateLanguageCardsUI();
      openModal(dom.modalLanguage);
    });

    // Language Card Click
    if (dom.langOptionsGrid) {
      dom.langOptionsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.lang-card');
        if (!card) return;
        state.pendingLanguage = card.getAttribute('data-lang');
        updateLanguageCardsUI();
      });
    }

    // Language Confirm Button
    if (dom.confirmLangBtn) {
      dom.confirmLangBtn.addEventListener('click', () => {
        applyLanguage(state.pendingLanguage, true);
        closeAllModals();
      });
    }

    // Location bar trigger
    dom.locationSelectorBar.addEventListener('click', () => {
      openModal(dom.modalLocation);
    });

    // Location Save
    document.getElementById('saveLocationBtn').addEventListener('click', () => {
      const locVal = dom.locationInput.value.trim();
      const pinVal = dom.pincodeInput.value.trim();
      if (locVal) {
        state.activeLocation.title = locVal;
        state.activeLocation.sub = `Within 5 km • PIN ${pinVal || '452001'}`;
        dom.locText.textContent = state.activeLocation.title;
        dom.locSub.textContent = state.activeLocation.sub;
        closeAllModals();
        showToast('📍 Delivery location updated');
      }
    });

    // Search Input
    dom.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });

    // Voice Search Simulator
    dom.micBtn.addEventListener('click', () => {
      const t = i18n[state.language];
      dom.micBtn.classList.add('listening');
      showToast(t.voicePrompt);
      
      let sampleQueries = ['Urea', 'Wheat Seeds', 'Pesticide', 'Sprayer Pump', 'DAP'];
      if (state.language === 'mr') {
        sampleQueries = ['युरिया', 'गहू बियाणे', 'कीटकनाशक', 'फवारणी पंप', 'डीएपी'];
      } else if (state.language === 'hi') {
        sampleQueries = ['यूरिया', 'गेहूं बीज', 'कीटनाशक', 'स्प्रेयर पंप', 'डीएपी'];
      }

      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      
      setTimeout(() => {
        dom.micBtn.classList.remove('listening');
        dom.searchInput.value = randomQuery;
        state.searchQuery = randomQuery.toLowerCase();
        renderProducts();
        showToast(`✅ ${t.voiceSuccess} "${randomQuery}"`);
      }, 1500);
    });

    // Quick Search Tags
    dom.quickTagsScroller.addEventListener('click', (e) => {
      const tag = e.target.closest('.quick-tag');
      if (!tag) return;
      const query = tag.getAttribute('data-query');
      dom.searchInput.value = query === 'all' ? '' : query;
      state.searchQuery = query === 'all' ? '' : query.toLowerCase();
      renderProducts();
    });

    // Bottom Navigation Bar
    dom.bottomNav.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-tab');
      if (!btn) return;
      const tab = btn.getAttribute('data-tab');
      handleNavTab(tab);
    });

    // Floating Cart Bar
    dom.floatingCartBar.addEventListener('click', () => {
      openCartSheet();
    });

    // Dosage Calculator Inputs
    if (dom.dosageCropSelect && dom.dosageAcresInput) {
      dom.dosageCropSelect.addEventListener('change', calculateDosage);
      dom.dosageAcresInput.addEventListener('input', calculateDosage);
    }

    // Modal Close buttons & overlay click
    document.querySelectorAll('.btn-close-sheet, .modal-overlay').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el || e.target.closest('.btn-close-sheet')) {
          closeAllModals();
        }
      });
    });

    // Prevent modal content clicks from bubbling to overlay
    document.querySelectorAll('.bottom-sheet').forEach(sheet => {
      sheet.addEventListener('click', (e) => e.stopPropagation());
    });

    // Checkout Form Submit
    if (dom.checkoutForm) {
      dom.checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handlePlaceOrder();
      });
    }
  }

  // --- NAVIGATION TAB HANDLER ---
  function handleNavTab(tab) {
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    const targetBtn = document.querySelector(`.nav-tab[data-tab="${tab}"]`);
    if (targetBtn) targetBtn.classList.add('active');

    state.currentTab = tab;

    if (tab === 'home') {
      state.shopFilterId = null;
      state.selectedCategory = 'all';
      renderCategories();
      renderProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'shops') {
      const shopsSection = document.getElementById('shopsSection');
      if (shopsSection) shopsSection.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'dosage') {
      openModal(dom.modalDosage);
    } else if (tab === 'cart') {
      openCartSheet();
    } else if (tab === 'orders') {
      openOrdersModal();
    }
  }

  // --- RENDER BANNERS ---
  function renderBanners() {
    if (!dom.bannerCarousel) return;
    dom.bannerCarousel.innerHTML = AGRO_DATA.banners.map(b => {
      const title = getLocalizedText(b, 'title');
      const subtitle = getLocalizedText(b, 'subtitle');
      const badge = getLocalizedText(b, 'badge');
      const btnText = getLocalizedText(b, 'btnText');

      return `
        <div class="banner-card" style="background: ${b.color}">
          <div>
            <span class="banner-pill">${badge}</span>
            <h3 class="banner-title">${title}</h3>
            <p class="banner-sub">${subtitle}</p>
          </div>
          <div class="banner-cta-row">
            <button class="banner-btn" onclick="AgroApp.filterByCategory('${b.filterCategory}')">
              ${btnText} →
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- RENDER CATEGORIES ---
  function renderCategories() {
    if (!dom.categoriesPills) return;
    dom.categoriesPills.innerHTML = AGRO_DATA.categories.map(cat => {
      const isActive = state.selectedCategory === cat.id;
      const catName = getLocalizedText(cat, 'name');

      return `
        <button class="cat-pill ${isActive ? 'active' : ''}" onclick="AgroApp.filterByCategory('${cat.id}')">
          <span>${cat.icon}</span>
          <span>${catName}</span>
          <span class="cat-count">${cat.count}</span>
        </button>
      `;
    }).join('');
  }

  // --- RENDER NEARBY SHOPS ---
  function renderShops() {
    if (!dom.shopsScroller) return;
    dom.shopsScroller.innerHTML = AGRO_DATA.shops.map(shop => {
      const shopName = getLocalizedText(shop, 'name');
      const specialty = getLocalizedText(shop, 'specialty');
      const badge = getLocalizedText(shop, 'badge');
      const viewItemsText = state.language === 'mr' ? 'वस्तू पहा' : (state.language === 'hi' ? 'सामान देखें' : 'View Items');

      return `
        <div class="shop-card" onclick="AgroApp.openShopModal('${shop.id}')">
          <div class="shop-image-container">
            <img class="shop-image" src="${shop.image}" alt="${shop.name}" loading="lazy" />
            <span class="shop-badge-overlay">${badge}</span>
            <span class="shop-distance-pill">⚡ ${shop.distanceText}</span>
          </div>
          <div class="shop-info">
            <div class="shop-title-row">
              <h4 class="shop-name">${shopName}</h4>
              ${shop.isVerified ? '<span class="verified-icon" title="Verified Govt. Dealer">✓</span>' : ''}
            </div>
            <p class="shop-specialty">${specialty}</p>
            <div class="shop-stats">
              <span class="rating-badge">★ ${shop.rating}</span>
              <span class="delivery-time">🕒 ${shop.deliveryTime}</span>
            </div>
            <div class="shop-cta-row">
              <button class="btn-view-shop" onclick="event.stopPropagation(); AgroApp.filterByShop('${shop.id}')">
                ${viewItemsText}
              </button>
              <a href="tel:${shop.phone}" class="btn-call-shop" onclick="event.stopPropagation();" title="Call Shop">
                📞
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- RENDER PRODUCTS GRID ---
  function renderProducts() {
    if (!dom.productsGrid) return;
    const t = i18n[state.language];

    let items = AGRO_DATA.products;

    // Filter by category
    if (state.selectedCategory !== 'all') {
      items = items.filter(p => p.category === state.selectedCategory);
    }

    // Filter by shop
    if (state.shopFilterId) {
      items = items.filter(p => p.shopId === state.shopFilterId);
    }

    // Filter by search query
    if (state.searchQuery) {
      items = items.filter(p => 
        p.name.toLowerCase().includes(state.searchQuery) ||
        (p.hindiName && p.hindiName.toLowerCase().includes(state.searchQuery)) ||
        (p.marathiName && p.marathiName.toLowerCase().includes(state.searchQuery)) ||
        p.description.toLowerCase().includes(state.searchQuery) ||
        p.shopName.toLowerCase().includes(state.searchQuery)
      );
    }

    if (items.length === 0) {
      dom.productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; background: #fff; border-radius: 14px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 38px; margin-bottom: 8px;">🌾</div>
          <h4 style="font-size: 15px; color: #0f172a; margin-bottom: 4px;">
            ${state.language === 'mr' ? 'कोणतीही कृषी उत्पादने सापडली नाहीत' : (state.language === 'hi' ? 'कोई कृषि उत्पाद नहीं मिला' : 'No agricultural products found')}
          </h4>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">
            ${state.language === 'mr' ? 'गहू बियाणे, युरिया किंवा कीटकनाशक शोधून पहा.' : (state.language === 'hi' ? 'गेहूं बीज, यूरिया, कीटनाशक खोज कर देखें।' : 'Try searching for Wheat seeds, Urea, Pesticide, or reset filters.')}
          </p>
          <button class="btn-view-shop" style="max-width: 140px; margin: 0 auto; display: block;" onclick="AgroApp.filterByCategory('all')">
            ${state.language === 'mr' ? 'सर्व उत्पादने पहा' : (state.language === 'hi' ? 'सभी सामान देखें' : 'View All Items')}
          </button>
        </div>
      `;
      return;
    }

    dom.productsGrid.innerHTML = items.map(p => {
      const cartItem = state.cart.find(c => c.productId === p.id);
      const inCartQty = cartItem ? cartItem.qty : 0;
      const displayName = getLocalizedText(p, 'name');
      const shopDisplayName = getLocalizedText(AGRO_DATA.shops.find(s => s.id === p.shopId), 'name') || p.shopName;

      return `
        <div class="product-card">
          <div class="product-img-wrapper" onclick="AgroApp.openProductModal('${p.id}')">
            <img class="product-img" src="${p.image}" alt="${p.name}" loading="lazy" />
            <span class="product-discount-pill">${p.discount}</span>
            <span class="product-shop-pill">📍 ${shopDisplayName}</span>
          </div>
          <div class="product-details">
            <span class="product-pack-size">${p.packageSize}</span>
            <h4 class="product-name" onclick="AgroApp.openProductModal('${p.id}')" title="${displayName}">
              ${displayName}
            </h4>
            <div class="product-rating-row">
              <span class="stars">★ ${p.rating}</span>
              <span class="rating-count">(${p.reviews})</span>
            </div>
            <div class="price-row">
              <span class="current-price">₹${p.price}</span>
              ${p.originalPrice ? `<span class="original-price">₹${p.originalPrice}</span>` : ''}
            </div>
            <div class="card-actions">
              ${inCartQty > 0 ? `
                <div class="qty-stepper">
                  <button onclick="AgroApp.updateCartQty('${p.id}', -1)">-</button>
                  <span>${inCartQty}</span>
                  <button onclick="AgroApp.updateCartQty('${p.id}', 1)">+</button>
                </div>
              ` : `
                <button class="btn-add-cart" onclick="AgroApp.addToCart('${p.id}')">
                  🛒 ${t.addToCart}
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- CART CONTROLLERS ---
  function addToCart(productId) {
    const product = AGRO_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(c => c.productId === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push({ productId, qty: 1 });
    }

    saveCart();
    updateCartUI();
    renderProducts();

    const name = getLocalizedText(product, 'name').split('(')[0];
    const t = i18n[state.language];
    showToast(`🛒 ${name} ${state.language === 'mr' ? 'टोपलीत जोडले' : (state.language === 'hi' ? 'टोकरी में जोड़ा गया' : 'added to cart')}`);
  }

  function updateCartQty(productId, change) {
    const existingIndex = state.cart.findIndex(c => c.productId === productId);
    if (existingIndex === -1) return;

    state.cart[existingIndex].qty += change;

    if (state.cart[existingIndex].qty <= 0) {
      state.cart.splice(existingIndex, 1);
    }

    saveCart();
    updateCartUI();
    renderProducts();

    if (dom.modalCart.classList.contains('active')) {
      renderCartSheetContent();
    }
  }

  function saveCart() {
    localStorage.setItem('agro_cart', JSON.stringify(state.cart));
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = state.cart.reduce((sum, item) => {
      const p = AGRO_DATA.products.find(prod => prod.id === item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);

    const t = i18n[state.language];

    // Nav Badge
    if (dom.cartBadgeNav) {
      if (totalCount > 0) {
        dom.cartBadgeNav.textContent = totalCount;
        dom.cartBadgeNav.style.display = 'flex';
      } else {
        dom.cartBadgeNav.style.display = 'none';
      }
    }

    // Floating Cart Bar
    if (dom.floatingCartBar) {
      if (totalCount > 0) {
        dom.floatingCartCount.textContent = `${totalCount} ${totalCount === 1 ? t.item : t.items}`;
        dom.floatingCartPrice.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
        dom.floatingCartBar.style.display = 'flex';
      } else {
        dom.floatingCartBar.style.display = 'none';
      }
    }
  }

  // --- OPEN CART SHEET ---
  function openCartSheet() {
    renderCartSheetContent();
    openModal(dom.modalCart);
  }

  function renderCartSheetContent() {
    const t = i18n[state.language];

    if (state.cart.length === 0) {
      dom.cartSheetBody.innerHTML = `
        <div style="text-align: center; padding: 40px 10px;">
          <div style="font-size: 48px; margin-bottom: 8px;">🛒</div>
          <h4 style="font-size: 16px; color: #0f172a; margin-bottom: 4px;">${t.cartEmptyTitle}</h4>
          <p style="font-size: 12.5px; color: #64748b; margin-bottom: 16px;">${t.cartEmptySub}</p>
          <button class="btn-primary-action" onclick="AgroApp.closeAllModals()">
            ${t.exploreBtn}
          </button>
        </div>
      `;
      dom.cartSheetFooter.style.display = 'none';
      return;
    }

    dom.cartSheetFooter.style.display = 'block';

    let subtotal = 0;
    const itemsHtml = state.cart.map(item => {
      const product = AGRO_DATA.products.find(p => p.id === item.productId);
      if (!product) return '';
      const lineTotal = product.price * item.qty;
      subtotal += lineTotal;
      const displayName = getLocalizedText(product, 'name');
      const shopDisplayName = getLocalizedText(AGRO_DATA.shops.find(s => s.id === product.shopId), 'name') || product.shopName;

      return `
        <div class="cart-item-row">
          <img class="cart-item-thumb" src="${product.image}" alt="${product.name}" />
          <div class="cart-item-info">
            <h5 class="cart-item-name">${displayName}</h5>
            <span class="cart-item-pack">${product.packageSize} • ${shopDisplayName}</span>
            <div class="cart-item-price">₹${product.price} × ${item.qty} = ₹${lineTotal}</div>
          </div>
          <div class="qty-stepper" style="height: 30px;">
            <button onclick="AgroApp.updateCartQty('${product.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="AgroApp.updateCartQty('${product.id}', 1)">+</button>
          </div>
        </div>
      `;
    }).join('');

    const deliveryFee = subtotal >= 1000 ? 0 : 35;
    const finalTotal = subtotal + deliveryFee;

    dom.cartSheetBody.innerHTML = `
      <div class="cart-items-list">
        ${itemsHtml}
      </div>

      <div class="cart-summary-box">
        <div class="summary-row">
          <span>${t.itemsTotalLabel}</span>
          <span>₹${subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div class="summary-row">
          <span>${t.deliveryLabel}</span>
          <span>${deliveryFee === 0 ? `<strong style="color:#15803d">${t.freeDeliveryText}</strong>` : '₹' + deliveryFee}</span>
        </div>
        <div class="summary-row total-row">
          <span>${t.payableLabel}</span>
          <span>₹${finalTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 8px 12px; margin-top: 12px; font-size: 11.5px; color: #166534; display: flex; align-items: center; gap: 8px;">
        <span>🛡️</span>
        <span>${t.qualityAssurance}</span>
      </div>
    `;

    dom.cartSheetFooter.innerHTML = `
      <button class="btn-primary-action" onclick="AgroApp.openCheckoutModal()">
        ${t.proceedCheckout} (₹${finalTotal.toLocaleString('en-IN')}) →
      </button>
    `;
  }

  // --- PRODUCT DETAIL MODAL ---
  function openProductModal(productId) {
    const product = AGRO_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = state.cart.find(c => c.productId === product.id);
    const inCartQty = cartItem ? cartItem.qty : 0;
    const displayName = getLocalizedText(product, 'name');
    const shopDisplayName = getLocalizedText(AGRO_DATA.shops.find(s => s.id === product.shopId), 'name') || product.shopName;
    const t = i18n[state.language];

    const specsRows = Object.entries(product.specs || {}).map(([key, val]) => `
      <tr>
        <td class="spec-name">${key}</td>
        <td class="spec-val">${val}</td>
      </tr>
    `).join('');

    const descHeading = state.language === 'mr' ? 'वर्णन व पीक फायदे:' : (state.language === 'hi' ? 'विवरण एवं फसल लाभ:' : 'Description & Crop Benefits:');
    const techHeading = state.language === 'mr' ? 'तांत्रिक माहिती (Technical Specs):' : (state.language === 'hi' ? 'तकनीकी जानकारी:' : 'Technical Specifications:');

    dom.productDetailContent.innerHTML = `
      <div class="product-detail-hero">
        <img src="${product.image}" alt="${product.name}" />
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
        <span class="product-discount-pill">${product.discount}</span>
        <span style="font-size: 11.5px; color: #0284c7; font-weight: 700; background: #e0f2fe; padding: 2px 8px; border-radius: 4px;">
          📍 ${shopDisplayName}
        </span>
      </div>

      <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; line-height: 1.35; margin-bottom: 4px;">
        ${displayName}
      </h3>

      <div class="product-rating-row" style="margin-bottom: 12px;">
        <span class="stars">★ ${product.rating}</span>
        <span class="rating-count">(${product.reviews} reviews)</span>
        <span style="color: #cbd5e1; margin: 0 4px;">•</span>
        <span style="color: #15803d; font-weight: 700; font-size: 11px;">
          ${state.language === 'mr' ? 'शिल्लक आहे' : (state.language === 'hi' ? 'स्टॉक उपलब्ध है' : 'In Stock')} (${product.stockCount})
        </span>
      </div>

      <div class="price-row" style="margin-bottom: 14px;">
        <span class="current-price" style="font-size: 22px;">₹${product.price}</span>
        ${product.originalPrice ? `<span class="original-price" style="font-size: 14px;">₹${product.originalPrice}</span>` : ''}
        <span style="font-size: 11.5px; color: #64748b;">(Incl. all taxes)</span>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
        <h5 style="font-size: 12.5px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">${descHeading}</h5>
        <p style="font-size: 12px; color: #475569; line-height: 1.5;">${product.description}</p>
      </div>

      <h5 style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">${techHeading}</h5>
      <table class="detail-specs-table">
        ${specsRows}
      </table>

      <div style="margin-top: 20px;">
        ${inCartQty > 0 ? `
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="qty-stepper" style="flex: 1; height: 44px;">
              <button onclick="AgroApp.updateCartQty('${product.id}', -1); AgroApp.openProductModal('${product.id}');">-</button>
              <span style="font-size: 16px;">${inCartQty} ${t.inCart}</span>
              <button onclick="AgroApp.updateCartQty('${product.id}', 1); AgroApp.openProductModal('${product.id}');">+</button>
            </div>
            <button class="btn-primary-action" style="flex: 1; padding: 12px;" onclick="AgroApp.openCartSheet()">
              ${t.viewCartBtn}
            </button>
          </div>
        ` : `
          <button class="btn-primary-action" onclick="AgroApp.addToCart('${product.id}'); AgroApp.openProductModal('${product.id}');">
            🛒 ${t.addToCart} (₹${product.price})
          </button>
        `}
      </div>
    `;

    openModal(dom.modalProduct);
  }

  // --- SHOP DETAIL MODAL ---
  function openShopModal(shopId) {
    const shop = AGRO_DATA.shops.find(s => s.id === shopId);
    if (!shop) return;

    const shopItems = AGRO_DATA.products.filter(p => p.shopId === shopId);
    const shopName = getLocalizedText(shop, 'name');
    const address = getLocalizedText(shop, 'address');
    const badge = getLocalizedText(shop, 'badge');
    const t = i18n[state.language];

    const availTitle = state.language === 'mr' 
      ? `या कृषी केंद्रातील उपलब्ध उत्पादने (${shopItems.length}):`
      : (state.language === 'hi' ? `इस दुकान पर उपलब्ध सामान (${shopItems.length}):` : `Products Available at this Retailer (${shopItems.length}):`);

    dom.shopDetailContent.innerHTML = `
      <div style="position: relative; height: 140px; border-radius: 14px; overflow: hidden; margin-bottom: 12px;">
        <img src="${shop.image}" style="width:100%; height:100%; object-fit: cover;" alt="${shop.name}" />
        <span class="shop-badge-overlay">${badge}</span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
        <div>
          <h3 style="font-size: 17px; font-weight: 800; color: #0f172a;">${shopName}</h3>
          <p style="font-size: 12px; color: #64748b;">${address}</p>
        </div>
        <span class="rating-badge" style="font-size: 13px; padding: 3px 8px;">★ ${shop.rating}</span>
      </div>

      <div style="display: flex; gap: 8px; margin: 10px 0 14px; font-size: 11.5px;">
        <span style="background: #dcfce7; color: #166534; font-weight: 700; padding: 3px 8px; border-radius: 4px;">
          ⚡ ${shop.distanceText}
        </span>
        <span style="background: #f1f5f9; color: #334155; font-weight: 600; padding: 3px 8px; border-radius: 4px;">
          🕒 Delivery in ${shop.deliveryTime}
        </span>
        <a href="tel:${shop.phone}" style="margin-left: auto; text-decoration: none; color: #15803d; font-weight: 700; display: flex; align-items: center; gap: 4px;">
          📞 ${state.language === 'mr' ? 'दुकानदाराला कॉल करा' : (state.language === 'hi' ? 'दुकानदार को कॉल करें' : 'Call Shop')}
        </a>
      </div>

      <h5 style="font-size: 13.5px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">
        ${availTitle}
      </h5>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${shopItems.map(p => `
          <div style="display: flex; align-items: center; gap: 10px; padding: 8px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <img src="${p.image}" style="width: 48px; height: 48px; border-radius: 6px; object-fit: cover;" />
            <div style="flex: 1;">
              <h6 style="font-size: 12.5px; font-weight: 700; color: #0f172a;">${getLocalizedText(p, 'name')}</h6>
              <span style="font-size: 11px; color: #64748b;">${p.packageSize} • ₹${p.price}</span>
            </div>
            <button class="btn-view-shop" style="width: auto; padding: 6px 12px;" onclick="AgroApp.addToCart('${p.id}')">
              + ${t.addToCart}
            </button>
          </div>
        `).join('')}
      </div>
    `;

    openModal(dom.modalShop);
  }

  // --- CHECKOUT MODAL ---
  function openCheckoutModal() {
    closeAllModals();
    const t = i18n[state.language];

    const subtotal = state.cart.reduce((sum, item) => {
      const p = AGRO_DATA.products.find(prod => prod.id === item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    const deliveryFee = subtotal >= 1000 ? 0 : 35;
    const finalTotal = subtotal + deliveryFee;

    dom.checkoutItemsSummary.innerHTML = `
      <div style="font-size: 12px; color: #475569; display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span>${t.cartTitle}: ${state.cart.reduce((s, i) => s + i.qty, 0)} ${t.items}</span>
        <span>₹${subtotal}</span>
      </div>
      <div style="font-size: 12px; color: #475569; display: flex; justify-content: space-between;">
        <span>${t.deliveryLabel}</span>
        <span>${deliveryFee === 0 ? t.freeDeliveryText : '₹' + deliveryFee}</span>
      </div>
    `;

    dom.checkoutTotalAmount.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
    openModal(dom.modalCheckout);
  }

  function handlePlaceOrder() {
    const farmerName = document.getElementById('farmerName').value.trim();
    const farmerPhone = document.getElementById('farmerPhone').value.trim();
    const villageAddress = document.getElementById('villageAddress').value.trim();
    const paymentMethod = document.querySelector('input[name="payMethod"]:checked').value;
    const t = i18n[state.language];

    const subtotal = state.cart.reduce((sum, item) => {
      const p = AGRO_DATA.products.find(prod => prod.id === item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    const deliveryFee = subtotal >= 1000 ? 0 : 35;

    const newOrder = {
      id: 'AGRO-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      farmerName,
      farmerPhone,
      villageAddress,
      paymentMethod,
      items: state.cart.map(c => {
        const p = AGRO_DATA.products.find(prod => prod.id === c.productId);
        return {
          name: p ? getLocalizedText(p, 'name') : 'Agri Product',
          qty: c.qty,
          price: p ? p.price : 0,
          shopName: p ? p.shopName : 'Local Kendra'
        };
      }),
      totalAmount: subtotal + deliveryFee,
      status: state.language === 'mr' ? 'दुकानदाराने स्वीकारले' : (state.language === 'hi' ? 'दुकानदार द्वारा स्वीकृत' : 'Shop Confirmed'),
      currentStep: 1
    };

    state.orders.unshift(newOrder);
    localStorage.setItem('agro_orders', JSON.stringify(state.orders));
    state.cart = [];
    saveCart();
    updateCartUI();
    renderProducts();

    closeAllModals();
    showToast('🎉 ' + t.orderConfirmed);
    openOrderTracker(newOrder.id);
  }

  // --- ORDER TRACKER / ORDERS LIST ---
  function openOrdersModal() {
    renderOrdersList();
    openModal(dom.modalOrders);
  }

  function renderOrdersList() {
    const t = i18n[state.language];

    if (state.orders.length === 0) {
      dom.ordersListBody.innerHTML = `
        <div style="text-align: center; padding: 40px 10px;">
          <div style="font-size: 42px; margin-bottom: 8px;">📦</div>
          <h4 style="font-size: 15px; color: #0f172a; margin-bottom: 4px;">${t.noOrdersTitle}</h4>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 14px;">${t.noOrdersSub}</p>
        </div>
      `;
      return;
    }

    dom.ordersListBody.innerHTML = state.orders.map(order => `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div>
            <strong style="font-size: 13.5px; color: #15803d;">#${order.id}</strong>
            <div style="font-size: 11px; color: #64748b;">${order.date}</div>
          </div>
          <span style="background: #dcfce7; color: #166534; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px;">
            ${order.status}
          </span>
        </div>

        <div style="font-size: 12px; color: #334155; margin-bottom: 8px;">
          ${order.items.map(it => `• ${it.name} (×${it.qty})`).join('<br/>')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; padding-top: 8px; font-size: 12.5px;">
          <span>Total: <strong>₹${order.totalAmount.toLocaleString('en-IN')}</strong> (${order.paymentMethod})</span>
          <button class="btn-view-shop" style="width: auto; padding: 4px 10px; font-size: 11px;" onclick="AgroApp.openOrderTracker('${order.id}')">
            ${t.trackDeliveryBtn}
          </button>
        </div>
      </div>
    `).join('');
  }

  function openOrderTracker(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    const t = i18n[state.language];

    dom.ordersListBody.innerHTML = `
      <div class="order-success-banner">
        <div class="success-check-icon">✓</div>
        <h3 style="font-size: 17px; font-weight: 800; color: #0f172a;">Order #${order.id} ${t.orderConfirmedTitle}</h3>
        <p style="font-size: 12px; color: #64748b;">${t.orderConfirmedSub}</p>
      </div>

      <div class="order-timeline">
        <div class="timeline-step completed">
          <div class="timeline-node"></div>
          <div class="step-details">
            <h5>${t.step1Title}</h5>
            <p>${order.date} • ${t.step1Sub}</p>
          </div>
        </div>

        <div class="timeline-step completed">
          <div class="timeline-node"></div>
          <div class="step-details">
            <h5>${t.step2Title}</h5>
            <p>${t.step2Sub}</p>
          </div>
        </div>

        <div class="timeline-step current">
          <div class="timeline-node"></div>
          <div class="step-details">
            <h5>${t.step3Title}</h5>
            <p>${t.step3Sub} (${order.villageAddress})</p>
          </div>
        </div>

        <div class="timeline-step">
          <div class="timeline-node"></div>
          <div class="step-details">
            <h5>${t.step4Title}</h5>
            <p>${t.step4Sub}</p>
          </div>
        </div>
      </div>

      <div style="background: #f1f5f9; border-radius: 10px; padding: 12px; font-size: 12px; margin-top: 14px;">
        <strong>${t.farmerNameLabel.replace('*', '')}:</strong><br/>
        ${order.farmerName} (${order.farmerPhone})<br/>
        ${order.villageAddress}
      </div>

      <div style="margin-top: 16px;">
        <button class="btn-primary-action" onclick="AgroApp.renderOrdersList()">
          ${t.viewAllOrdersBtn}
        </button>
      </div>
    `;

    openModal(dom.modalOrders);
  }

  // --- DOSAGE CALCULATOR ---
  function calculateDosage() {
    if (!dom.dosageCropSelect || !dom.dosageAcresInput || !dom.dosageResultContainer) return;

    const cropKey = dom.dosageCropSelect.value;
    const acres = parseFloat(dom.dosageAcresInput.value) || 1;
    const guide = AGRO_DATA.dosageGuides[cropKey];
    if (!guide) return;

    const t = i18n[state.language];

    const ureaNeeded = (guide.ureaBags * acres).toFixed(1);
    const dapNeeded = (guide.dapBags * acres).toFixed(1);
    const mopNeeded = (guide.mopBags * acres).toFixed(1);
    const seedNeeded = (guide.seedKg * acres).toFixed(1);

    const cropDisplayName = getLocalizedText(guide, 'cropName');
    const tipText = getLocalizedText(guide, 'tip');

    dom.dosageResultContainer.innerHTML = `
      <div class="calc-result-title">
        <span>🌱 ${acres} ${state.language === 'mr' ? 'एकर' : (state.language === 'hi' ? 'एकड़' : 'Acre(s)')} ${cropDisplayName} ${t.recForArea}:</span>
      </div>

      <div class="calc-metrics-grid">
        <div class="metric-pill">
          <div class="metric-label">${t.ureaBagLabel}</div>
          <div class="metric-value">${ureaNeeded} ${state.language === 'mr' ? 'गोणी' : (state.language === 'hi' ? 'बोरी' : 'Bags')}</div>
        </div>
        <div class="metric-pill">
          <div class="metric-label">${t.dapBagLabel}</div>
          <div class="metric-value">${dapNeeded} ${state.language === 'mr' ? 'गोणी' : (state.language === 'hi' ? 'बोरी' : 'Bags')}</div>
        </div>
        <div class="metric-pill">
          <div class="metric-label">${t.mopBagLabel}</div>
          <div class="metric-value">${mopNeeded} ${state.language === 'mr' ? 'गोणी' : (state.language === 'hi' ? 'बोरी' : 'Bags')}</div>
        </div>
        <div class="metric-pill">
          <div class="metric-label">${t.seedKgLabel}</div>
          <div class="metric-value">${seedNeeded} ${state.language === 'mr' ? 'किलो' : (state.language === 'hi' ? 'किग्रा' : 'Kg')}</div>
        </div>
      </div>

      <div class="calc-expert-tip">
        <strong>${t.agronomistTipLabel}</strong> ${tipText}
      </div>

      <button class="btn-primary-action" style="margin-top: 14px; padding: 10px; font-size: 12.5px;" onclick="AgroApp.filterByCategory('fertilizers'); AgroApp.closeAllModals();">
        ${t.orderFertilizersBtn}
      </button>
    `;
  }

  // --- MODAL UTILS ---
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }

  // --- TOAST UTILS ---
  let toastTimer = null;
  function showToast(msg) {
    if (!dom.toastBox) return;
    dom.toastBox.textContent = msg;
    dom.toastBox.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toastBox.classList.remove('show');
    }, 2800);
  }

  // --- FILTER ACTIONS ---
  function filterByCategory(categoryId) {
    state.selectedCategory = categoryId;
    state.shopFilterId = null;
    renderCategories();
    renderProducts();

    const prodSection = document.getElementById('productsSection');
    if (prodSection) prodSection.scrollIntoView({ behavior: 'smooth' });
  }

  function filterByShop(shopId) {
    state.shopFilterId = shopId;
    state.selectedCategory = 'all';
    renderCategories();
    renderProducts();

    const prodSection = document.getElementById('productsSection');
    if (prodSection) prodSection.scrollIntoView({ behavior: 'smooth' });
    closeAllModals();
  }

  // --- EXPOSE GLOBAL CONTROLLER ---
  window.AgroApp = {
    filterByCategory,
    filterByShop,
    addToCart,
    updateCartQty,
    openProductModal,
    openShopModal,
    openCartSheet,
    openCheckoutModal,
    openOrderTracker,
    renderOrdersList,
    closeAllModals,
    calculateDosage,
    applyLanguage
  };

  // Launch on DOM ready
  document.addEventListener('DOMContentLoaded', init);

})();
