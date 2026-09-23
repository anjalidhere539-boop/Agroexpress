# 🌾 AgroExpress - Smart Agricultural E-Commerce Web App

**AgroExpress** is a modern, mobile-first agricultural e-commerce application designed to help farmers easily browse and purchase genuine agricultural supplies—such as certified seeds, fertilizers, pesticides, and farm tools—directly from nearby rural agricultural retail shops and Mandis with fast local delivery.

---

## 🌟 Key Features

1. **Mobile-First UI & Device Preview**:
   - Designed ground-up for smartphone screens with bottom navigation, category pills, swipeable carousels, and bottom action sheets.
   - Includes a desktop switch toggle (`📱 Phone View` / `🖥️ Fullscreen View`) for seamless desktop testing and responsive demonstration.

2. **Rich Agricultural Catalog**:
   - **Fertilizers**: Govt. subsidized Neem Coated Urea, DAP (Di-Ammonium Phosphate), NPK 19:19:19 soluble, Vermicompost, MOP Potash.
   - **Seeds**: PBW-550 Certified Wheat, Pusa Basmati 1121 Paddy, Kranti Hybrid Mustard, Hybrid Tomato, Sweet Corn.
   - **Crop Protection**: Neem Gold Bio-Pesticide, UPL Saaf Fungicide, Chlorpyrifos, Bayer Confidor.
   - **Tools & Equipment**: 16L Battery Sprayer, Digital Soil pH/Moisture meter, Micro Drip Irrigation kit, Pruning Shears.

3. **Nearby Shop Connectivity**:
   - Live distance indicators (e.g. `1.2 km away`, `2.8 km away`).
   - Delivery time estimates (`30-45 mins`).
   - Verified Govt. Dealer badges.
   - 1-Tap phone dialer to call shopkeeper directly (`tel:`).
   - Shop storefront filter to browse all inventory at that specific retail shop.

4. **Farmer-Centric Utilities**:
   - **Crop Dosage & Acreage Calculator**: Computes exact bags of Urea, DAP, and seed requirements based on field acreage for Wheat, Paddy, Mustard, Cotton, and Potato.
   - **Voice Search Simulation**: Farmers can tap the microphone to simulate voice search in Hindi/vernacular.
   - **Bilingual Interface**: Quick toggle between English and हिन्दी.
   - **Kisan Call Centre Helpline**: Direct 1-tap call to the official toll-free farmer helpline (`1800-180-1551`).

5. **Express Cart & Checkout Flow**:
   - Quantity steppers with real-time bill breakdown.
   - Free delivery threshold calculation (Free delivery above ₹1,000).
   - Express Checkout with Village address, Farmer phone, Cash on Delivery (COD), and UPI on Delivery.
   - Interactive Live Order Tracking simulation with tractor dispatch stages.
   - Persistent `localStorage` so cart and orders survive page reloads.

---

## 🚀 How to Run Locally

Because AgroExpress is built with zero runtime dependencies (pure HTML5, CSS3, and modern JavaScript), you can run it in seconds with any local server.

### Option 1: Python Built-In HTTP Server (Recommended)
Open PowerShell or Terminal in `d:\Agroexpress` and run:

```bash
python -m http.server 8080
```
Then open your browser at:
```
http://localhost:8080
```

### Option 2: Direct File Open
Simply double-click `index.html` in your file explorer to open it directly in Chrome, Edge, or Firefox.

---

## 🌐 Ready-To-Deploy Guide

### 1. Deploying to GitHub Pages (100% Free)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AgroExpress"
   ```
2. Create a repository on GitHub (e.g., `agroexpress`) and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/agroexpress.git
   git branch -M main
   git push -u origin main
   ```
3. Go to repository **Settings** > **Pages** > Select `main` branch and `/root` folder > Click **Save**.
4. Your website is live at `https://YOUR_USERNAME.github.io/agroexpress/`!

### 2. Deploying to Netlify (Drag & Drop in 10 Seconds)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `d:\Agroexpress` folder onto the page.
3. Your web app is instantly deployed with a custom live URL and HTTPS!

### 3. Deploying to Vercel
Run with Vercel CLI:
```bash
npx vercel
```
Or import the GitHub repository into your Vercel dashboard. Zero configuration required.

### 4. Deploying to Cloudflare Pages or Firebase Hosting
Upload the static directory (`d:\Agroexpress`) as the build output directory (no build command needed).

---

## 📱 Mobile PWA Installation
AgroExpress includes a `manifest.json` configured for full Progressive Web App support:
- On **Android (Chrome)**: Tap the browser menu `⋮` and select **"Add to Home screen"** or **"Install app"**.
- On **iOS (Safari)**: Tap the **Share** button and select **"Add to Home Screen"**.

---

## 📂 Project Structure
```
Agroexpress/
├── index.html          # Main application structure, modals & bottom sheets
├── manifest.json       # PWA configuration
├── README.md           # Documentation & deployment instructions
├── css/
│   └── styles.css      # Mobile-first design system, emerald theme & animations
└── js/
    ├── data.js         # Comprehensive sample catalog & shop datasets
    └── app.js          # Reactive cart, search, dosage calculator, checkout
```
