import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav_home: "Home",
      nav_tracker: "Live Tracker",
      nav_book: "Book Ticket",
      nav_fleet: "Fleet",
      nav_admin: "Admin Console",
      nav_my_tickets: "My Tickets",
      hero_badge: "Autonomous Transit Telemetry 2.0",
      hero_title_1: "Track Active Bus Fleets",
      hero_title_2: "Live in Real-Time",
      hero_sub: "Next-generation WebSocket satellite tracking, Haversine ETA prediction, interactive seat selection, and Stripe-encrypted booking.",
      btn_launch_map: "Launch Live Satellite Map",
      btn_book_now: "Book Seats Now",
      lang_english: "English",
      lang_sinhala: "සිංහල",
      lang_tamil: "தமிழ்",
    },
  },
  si: {
    translation: {
      nav_home: "මුල් පිටුව",
      nav_tracker: "සජීවී බස් රථ ලුහුබැඳීම",
      nav_book: "ටිකට්පත් වෙන්කිරීම",
      nav_fleet: "බස් රථ සමූහය",
      nav_admin: "පරිපාලන පුවරුව",
      nav_my_tickets: "මගේ ටිකට්පත්",
      hero_badge: "ස්වයංක්‍රීය ගමනාගමන පද්ධතිය 2.0",
      hero_title_1: "සක්‍රීය බස් රථ සජීවීව",
      hero_title_2: "තථ්‍ය කාලීනව නිරීක්ෂණය කරන්න",
      hero_sub: "වෙබ්සොකට් චන්ද්‍රිකා ලුහුබැඳීම, මගී අසුන් වෙන්කිරීම සහ සුරක්ෂිත ගෙවීම් පද්ධතිය.",
      btn_launch_map: "සජීවී සිතියම බලන්න",
      btn_book_now: "අසුන් වෙන්කරන්න",
      lang_english: "English",
      lang_sinhala: "සිංහල",
      lang_tamil: "தமிழ்",
    },
  },
  ta: {
    translation: {
      nav_home: "முகப்பு",
      nav_tracker: "நேரலை கண்காணிப்பு",
      nav_book: "முன்பதிவு செய்ய",
      nav_fleet: "பேருந்துகள்",
      nav_admin: "நிர்வாகி",
      nav_my_tickets: "என் டிக்கெட்டுகள்",
      hero_badge: "தனிப்பயன் போக்குவரத்து அமைப்பு 2.0",
      hero_title_1: "பேருந்துகளை நேரலையாக",
      hero_title_2: "கண்காணிக்கவும்",
      hero_sub: "வெப்சாக்கெட் செயற்கைக்கோள் கண்காணிப்பு, இருக்கை தேர்வு மற்றும் பாதுகாப்பான கட்டண முறை.",
      btn_launch_map: "வரைபடத்தை திறக்கவும்",
      btn_book_now: "இப்போதே முன்பதிவு செய்க",
      lang_english: "English",
      lang_sinhala: "සිංහල",
      lang_tamil: "தமிழ்",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
