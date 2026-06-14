import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWallet, faUser, faMapMarkerAlt, faCalendarAlt, faBox } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Leaflet Marker Icon Fix
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// ૧. Login Page
function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  return (
    <div className="order-card" style={{ textAlign: 'center', marginTop: '100px', padding: '30px' }}>
      <h3>Driver Login</h3>
      <input type="text" placeholder="Driver Name" onChange={(e) => setName(e.target.value)} style={{ padding: '12px', width: '90%', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
      <input type="password" placeholder="4-Digit PIN" maxLength="4" onChange={(e) => setPin(e.target.value)} style={{ padding: '12px', width: '90%', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc' }} />
      <button className="view-btn" onClick={() => (name.length > 2 && pin === "1234") ? onLogin(name) : alert("Invalid Name or PIN!")} style={{ width: '90%', padding: '12px', borderRadius: '8px' }}>Login</button>
    </div>
  );
}

// ૨. Dashboard (Clean UI)
function Dashboard({ orders, t, updateStatus }) {
  const [activeTab, setActiveTab] = useState('new');
  const filteredOrders = orders.filter(o => activeTab === 'new' ? o.status === 'Pending' : o.status !== 'Pending');

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ height: "200px", width: "100%", marginTop: "20px", borderRadius: "15px", overflow: "hidden", border: "1px solid #ccc" }}>
        <MapContainer center={[9.509, -13.712]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[9.509, -13.712]}><Popup>Driver Location</Popup></Marker>
        </MapContainer>
      </div>

      <div className="tabs">
        <button className={activeTab === 'new' ? 'active' : ''} onClick={() => setActiveTab('new')}>{t('new_orders')}</button>
        <button className={activeTab === 'accepted' ? 'active' : ''} onClick={() => setActiveTab('accepted')}>{t('accepted_orders')}</button>
      </div>

      {filteredOrders.map(o => (
        <div key={o.id} className="order-card">
          <h3 className="dark-title"><FontAwesomeIcon icon={faBox} /> {t('order')} #{o.id}: {o.item}</h3>
          <p className="detail-text"><FontAwesomeIcon icon={faMapMarkerAlt} /> {t('address')}: <strong>{o.address}</strong></p>
          <p className="detail-text">{t('payment')}: <strong>{t(o.paymentType === 'Cash' ? 'cash' : 'online')}</strong></p>
          <p className="detail-text">{t('status')}: <strong>{t(o.status)}</strong></p>
          
          {o.status === 'Pending' && <button className="accept-btn" onClick={() => updateStatus(o.id, 'Picked Up', o.price)}>{t('accept')}</button>}
          {o.status === 'Picked Up' && <button className="status-btn" onClick={() => updateStatus(o.id, 'Out for Delivery', 0)}>{t('out_for_delivery')}</button>}
          {o.status === 'Out for Delivery' && <button className="accept-btn" onClick={() => updateStatus(o.id, 'Delivered', o.price)}>{t('delivered')}</button>}
        </div>
      ))}
    </div>
  );
}

// ૩. Main App
function App() {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [earnings, setEarnings] = useState(0);
  const [history, setHistory] = useState([]);
  const [orders, setOrders] = useState([
    { id: 1, item: "Vegetables", status: "Pending", price: 15000, address: "Dixinn, Conakry", paymentType: "Cash" },
    { id: 2, item: "Grocery", status: "Pending", price: 25000, address: "Kaloum, Conakry", paymentType: "Online" }
  ]);

  const updateStatus = (id, newStatus, price) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (newStatus === 'Delivered') {
      setEarnings(prev => prev + price);
      const completedOrder = orders.find(o => o.id === id);
      setHistory([...history, { ...completedOrder }]);
    }
  };

  if (!isLoggedIn) return <div className="app-container"><Login onLogin={(n) => { setDriverName(n); setIsLoggedIn(true); }} /></div>;

  return (
    <Router>
      <div className="app-container">
        <div className="header">
          <h1>{t('driver_dashboard')}</h1>
          <div className="lang-box">
            <button onClick={() => i18n.changeLanguage('en')}>EN</button>
            <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
          </div>
        </div>
        
        <Routes>
          <Route path="/" element={<Dashboard orders={orders} t={t} updateStatus={updateStatus} />} />
          <Route path="/profile" element={<div className="profile-card"><h3>{t('profile')}: {driverName}</h3><button className="sos-btn" onClick={() => setIsLoggedIn(false)}>Logout</button></div>} />
          <Route path="/earnings" element={
            <div className="order-card"><h3>{t('earnings_title')}: {earnings} GNF</h3>
              {history.map((h, i) => (<p key={i}>{h.item} - {h.price} GNF</p>))}
            </div>
          } />
        </Routes>

        <nav className="bottom-nav">
          <Link to="/" className="nav-item"><FontAwesomeIcon icon={faHome} /><span>{t('home')}</span></Link>
          <Link to="/earnings" className="nav-item"><FontAwesomeIcon icon={faWallet} /><span>{t('earnings')}</span></Link>
          <Link to="/profile" className="nav-item"><FontAwesomeIcon icon={faUser} /><span>{t('profile')}</span></Link>
        </nav>
      </div>
    </Router>
  );
}
export default App;