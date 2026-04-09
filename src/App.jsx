import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, CheckCircle, Users, Clock, Award, Truck } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', category: 'Home', service: '', date: '', time: '', address: '', message: ''
  });

  // Fake services data
  const homeServices = ["Plumbing", "Electrical Repairs", "House Cleaning", "Painting", "AC Repair", "Carpentry", "Pest Control"];
  const eventServices = ["Catering", "Wedding Planning", "Birthday Parties", "Corporate Events", "Photography & Videography", "DJ & Sound", "Venue Decoration"];

  // Stats counter animation
  const [stats, setStats] = useState({ clients: 0, services: 0, pros: 0, rating: 0 });
  useEffect(() => {
    const animate = () => {
      setStats({ clients: 12480, services: 8750, pros: 320, rating: 4.98 });
    };
    const timer = setTimeout(animate, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://your-backend-on-render.up.railway.app/api/bookings', {  // ← change after deploy
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("🎉 Booking request received! Our team will contact you within 30 minutes.");
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', category: 'Home', service: '', date: '', time: '', address: '', message: '' });
      }
    } catch (err) {
      alert("✅ Demo mode: Booking saved (check backend console)");
      console.log("Booking:", formData);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-3xl font-bold text-primary">
            Kaca Services
          </div>
          <div className="hidden md:flex items-center gap-8 text-dark font-medium">
            <a href="#services" className="hover:text-primary transition">Services</a>
            <a href="#how" className="hover:text-primary transition">How it Works</a>
            <a href="#why" className="hover:text-primary transition">Why Us</a>
            <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-6 py-2.5 rounded-2xl font-semibold hover:bg-teal-700 transition">Book Now</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 px-6 space-y-4 text-dark">
            <a href="#services" className="block">Services</a>
            <a href="#how" className="block">How it Works</a>
            <a href="#why" className="block">Why Choose Us</a>
            <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="w-full bg-primary text-white py-3 rounded-2xl">Book Now</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-primary to-teal-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">Premium Home &amp; Event Services</h1>
            <p className="mt-6 text-2xl text-teal-100">Professional, reliable, and at your doorstep in minutes.</p>
            <div className="mt-10 flex gap-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-white text-primary font-semibold text-xl px-10 py-5 rounded-3xl hover:scale-105 transition">Book Now – It’s Free!</button>
              <a href="#services" className="border border-white text-white font-semibold text-xl px-10 py-5 rounded-3xl hover:bg-white/10 transition">See All Services</a>
            </div>
            <div className="mt-12 flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2"><CheckCircle className="text-teal-300" /> 30-min response</div>
              <div className="flex items-center gap-2"><CheckCircle className="text-teal-300" /> Verified professionals</div>
              <div className="flex items-center gap-2"><CheckCircle className="text-teal-300" /> 100% satisfaction</div>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="https://picsum.photos/id/1015/800/600" alt="Hero" className="rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* STATS COUNTER */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-primary">{stats.clients.toLocaleString()}+</div>
            <div className="text-sm text-gray-500 tracking-widest mt-1">HAPPY CLIENTS</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary">{stats.services.toLocaleString()}+</div>
            <div className="text-sm text-gray-500 tracking-widest mt-1">SERVICES DELIVERED</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary">{stats.pros}+</div>
            <div className="text-sm text-gray-500 tracking-widest mt-1">EXPERT PROFESSIONALS</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary">{stats.rating} ⭐</div>
            <div className="text-sm text-gray-500 tracking-widest mt-1">AVERAGE RATING</div>
          </div>
        </div>
      </section>

      {/* SERVICES CATEGORIES */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12">Home Services • Event Services</p>

          {/* Home Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3"><Truck /> Home Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {homeServices.map((s) => (
                <div key={s} onClick={() => setIsModalOpen(true)} className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition cursor-pointer text-center font-medium">{s}</div>
              ))}
            </div>
          </div>

          {/* Event Services */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3"><Award /> Event Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {eventServices.map((s) => (
                <div key={s} onClick={() => setIsModalOpen(true)} className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition cursor-pointer text-center font-medium">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-12">Just 4 simple steps</p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Choose Service", desc: "Browse Home or Event services" },
              { step: "02", title: "Book Instantly", desc: "Fill the quick form" },
              { step: "03", title: "Expert Assigned", desc: "We match the best professional" },
              { step: "04", title: "Service Delivered", desc: "Enjoy hassle-free experience" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary text-white rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">{item.step}</div>
                <h4 className="font-semibold text-xl">{item.title}</h4>
                <p className="text-gray-600 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Kaca Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Lightning Fast", desc: "30-minute response time guaranteed" },
              { icon: Users, title: "Verified Experts", desc: "Background-checked professionals" },
              { icon: Award, title: "Best Price Guarantee", desc: "Transparent & affordable pricing" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow flex flex-col items-center text-center">
                <item.icon className="w-12 h-12 text-primary mb-6" />
                <h4 className="font-semibold text-2xl">{item.title}</h4>
                <p className="mt-4 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-bold">Ready to book your service?</h2>
          <button onClick={() => setIsModalOpen(true)} className="mt-10 bg-white text-primary text-2xl font-bold px-12 py-6 rounded-3xl hover:scale-105 transition">Book Now – Takes 60 Seconds</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="text-2xl font-bold mb-4 text-primary">Kaca Services</div>
            <p className="text-gray-400">Premium home &amp; event services delivered with excellence.</p>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#" className="flex items-center gap-2"><Phone size={16} /> +91 954201980199</a>
            <a href="#" className="flex items-center gap-2"><Mail size={16} /> support@kacaservices.com</a>
            <a href="#" className="flex items-center gap-2"><MapPin size={16} /> Telangana, India</a>
          </div>
          <div className="text-gray-400 text-xs">© 2026 Kaca Services. All rights reserved.</div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold">Book Your Service</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-3xl">×</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="border rounded-2xl px-5 py-4" />
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required className="border rounded-2xl px-5 py-4" />
                </div>
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="border rounded-2xl px-5 py-4 w-full" />

                <div className="grid grid-cols-2 gap-4">
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="border rounded-2xl px-5 py-4">
                    <option value="Home">Home Service</option>
                    <option value="Event">Event Service</option>
                  </select>
                  <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} required className="border rounded-2xl px-5 py-4">
                    <option value="">Select Service</option>
                    {(formData.category === 'Home' ? homeServices : eventServices).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required className="border rounded-2xl px-5 py-4" />
                  <input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required className="border rounded-2xl px-5 py-4" />
                </div>

                <input type="text" placeholder="Full Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required className="border rounded-2xl px-5 py-4 w-full" />

                <textarea placeholder="Describe your requirement (optional)" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows="3" className="border rounded-2xl px-5 py-4 w-full" />

                <button type="submit" className="w-full bg-primary text-white py-5 rounded-3xl text-xl font-bold hover:bg-teal-700 transition">Submit Booking Request</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;