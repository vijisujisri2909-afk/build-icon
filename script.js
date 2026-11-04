const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
}

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// counters
const counters = document.querySelectorAll('.counter');
const animateCounters = () => {
    counters.forEach(c => {
        const target = +c.dataset.target;
        let n = 0;
        const step = target / 60;
        const tick = () => { n += step; if (n < target) { c.textContent = Math.floor(n); requestAnimationFrame(tick); } else { c.textContent = target + (target === 98 ? '%' : '+'); } };
        tick();
    });
};
if (counters.length) {
    const obs = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); } });
    obs.observe(counters[0]);
}

// testimonials auto slide
const slides = document.querySelectorAll('.testimonial');
if (slides.length) {
    let i = 0;
    setInterval(() => { slides[i].classList.remove('active'); i = (i + 1) % slides.length; slides[i].classList.add('active'); }, 4000);
}

// filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.svc-card, .gal-item').forEach(el => {
            const cat = el.dataset.cat || '';
            el.style.display = (f === 'all' || cat.includes(f)) ? '' : 'none';
        });
    });
});

// contact form
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const msg = document.getElementById('formMsg');
        if (msg) msg.textContent = 'Thank you! We will contact you soon.';
        form.reset();
    });
}

// offline chatbot
const chatMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('chatbot-input');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotSend = document.getElementById('chatbot-send');

if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => chatbotContainer.classList.toggle('open'));
}

function getReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) return "👋 Hi! Welcome to BuildCon! Ask about services, price, contact, interior, renovation.";
    if (msg.includes('contact') || msg.includes('number') || msg.includes('phone')) return "📞 BuildCon: +91 98765 43210 | buildcon@gmail.com | Chennai. 9AM-6PM. Free site visit!";
    if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('sqft') || msg.includes('budget')) return "💰 Rate: Standard ₹1800/sqft, Premium ₹2200/sqft, Luxury ₹2500/sqft. 1000 sqft = ₹18-25 Lakhs. Free estimation!";
    if (msg.includes('service') || msg.includes('what do you do')) return "🏗️ Services: 1) Home Construction 2) Renovation 3) Interior Design 4) Commercial Buildings 5) 3D Design & Estimation";
    if (msg.includes('interior') || msg.includes('kitchen') || msg.includes('wardrobe')) return "🎨 Interior: Modular Kitchen, Wardrobes, False Ceiling, Lighting. Starting ₹2.5 Lakhs. 3D design free!";
    if (msg.includes('renovation') || msg.includes('repair')) return "🔨 Renovation: Full house, Kitchen, Bathroom, Painting, Flooring. Fast work with warranty!";
    if (msg.includes('time') || msg.includes('how long') || msg.includes('duration')) return "⏱️ Time: 1000 sqft house takes 4-5 months. Fast and quality delivery!";
    if (msg.includes('house') || msg.includes('villa') || msg.includes('2bhk') || msg.includes('3bhk')) return "🏠 We build Individual Houses, Villas, Duplex, 2BHK/3BHK. Foundation to finishing. 5 years warranty!";
    if (msg.includes('where') || msg.includes('office') || msg.includes('location') || msg.includes('chennai')) return "📍 Office: Chennai, Tamil Nadu. Service all over Chennai & nearby. Free site visit!";
    if (msg.includes('emi') || msg.includes('loan') || msg.includes('finance')) return "💳 EMI & Loan support available! Bank loan documentation help. Flexible payment!";
    return "🏗️ BuildCon - Your dream house builder! Ask: 'price', 'services', 'contact', 'interior', 'renovation', 'time'.";
}

async function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;
    const userDiv = document.createElement('div');
    userDiv.className = 'msg-user';
    userDiv.textContent = msg;
    chatMessages.appendChild(userDiv);
    userInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'msg-ai';
    loadingDiv.id = 'loading-' + Date.now();
    loadingDiv.textContent = 'Typing...';
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    await new Promise(r => setTimeout(r, 500));
    const reply = getReply(msg);

    loadingDiv.remove();
    const botDiv = document.createElement('div');
    botDiv.className = 'msg-ai';
    botDiv.textContent = reply;
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
}

if (chatMessages) {
    const init = document.createElement('div');
    init.className = 'msg-ai';
    init.textContent = 'Hello! How can I help you with your construction project?';
    chatMessages.appendChild(init);
}