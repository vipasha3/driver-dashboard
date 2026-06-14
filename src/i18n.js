import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: { 
      translation: { 
        welcome: "Driver Dashboard",
        driver_dashboard: "Driver Dashboard",
        home: "Home",
        earnings: "Earnings",
        "payment": "Payment",
        "cash": "Cash",
        "online": "Online",
        new: "New",
        schedule: "Schedule",
        new_orders: "New Orders",
        profile: "Profile", 
        order: "Order", 
        location: "Location", 
        accept: "Accept",
        accepted_orders: "Active Orders",
        view_details: "View Details",
        item: "Item Name",
        status: "Status",
        back_to_dashboard: "Back to Dashboard",
        no_orders: "No orders in this section.",
        view_earnings: "View My Earnings",
        earnings_title: "My Earnings",
        total_earnings: "Total Earned",
        completed_orders: "Completed Orders",
        Pending: "Pending",
        "Picked Up": "Picked Up",
        "Out for Delivery": "Out for Delivery",
        Delivered: "Delivered",
        out_for_delivery: "Out for Delivery",
        delivered: "Delivered",
        item1: "Vegetables", loc1: "Jamalpur",
        item2: "Grocery", loc2: "Maninagar",
        item3: "Milk Packet", loc3: "Satellite"
      } 
    },
    fr: { 
      translation: { 
        welcome: "Tableau de bord", 
        driver_dashboard: "Tableau de bord du conducteur",
        home: "Accueil",
        earnings: "Gains",
        new: "Nouveau",
        schedule: "Programme",
        profile: "Profil",
        order: "Commande", 
        location: "Lieu", 
        accept: "Accepter",
        "payment": "Paiement",
        "cash": "Espèces",
        "online": "En ligne",
        view_details: "Voir les détails",
        item: "Article",
        status: "Statut",
        back_to_dashboard: "Retour au tableau de bord",
        new_orders: "Nouvelles commandes",
        accepted_orders: "Commandes actives",
        no_orders: "Aucune commande dans cette section.",
        view_earnings: "Voir mes gains",
        earnings_title: "Mes Gains",
        total_earnings: "Total gagné",
        completed_orders: "Commandes terminées",
        Pending: "En attente",
        "Picked Up": "Récupéré",
        "Out for Delivery": "En cours de livraison",
        Delivered: "Livré",
        out_for_delivery: "En cours de livraison",
        delivered: "Livré",
        item1: "Légumes", loc1: "Jamalpur",
        item2: "Épicerie", loc2: "Maninagar",
        item3: "Paquet de lait", loc3: "Satellite"
      } 
    }
  },
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;