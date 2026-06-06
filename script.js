// ══════════════════════════════════════
//  TYPING EFFECT  (hero h3)
// ══════════════════════════════════════

const typingEl = document.querySelector('#hero h3');
if (typingEl) {
    const fullText = typingEl.textContent.trim();
    typingEl.textContent = '';
    let i = 0;

    function type() {
        if (i < fullText.length) {
            typingEl.textContent += fullText[i];
            i++;
            setTimeout(type, 60);
        }
    }
    setTimeout(type, 500);
}


// ══════════════════════════════════════
//  SCROLL REVEAL
// ══════════════════════════════════════

const revealTargets = [
    '#Ame', '#ski', '#pro', '#con',
    '.abt_content', '#edu-content', '#edu','#experience','#exp-card',
    '#lang', '#web-tech', '#tools',
    '#db', '#soft-skills',
    '#cpp', '#sql', '#kotlin', '#n8n',
    '#forms'
];

revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
        el.classList.add('reveal');
    });
});

// inject reveal CSS
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px) scale(0.96);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;
document.head.appendChild(style);

// stagger delay for cards
const skillCards = document.querySelectorAll('#lang, #web-tech, #tools, #db, #soft-skills');
skillCards.forEach((card, i) => {
    card.style.transitionDelay = (i * 0.1) + 's';
});

const projectCards = document.querySelectorAll('#cpp, #sql, #kotlin, #n8n');
projectCards.forEach((card, i) => {
    card.style.transitionDelay = (i * 0.1) + 's';
});

// observe
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ══════════════════════════════════════
//  ACTIVE NAV LINK ON SCROLL
// ══════════════════════════════════════

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        link.style.borderBottom = '';
        link.style.paddingBottom = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#7DB5B8';
            link.style.borderBottom = '2px solid #7DB5B8';
            link.style.paddingBottom = '3px';
        }
    });
});


// ══════════════════════════════════════
//  CONTACT FORM VALIDATION
// ══════════════════════════════════════

const submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const name    = document.querySelector('#forms input[type="text"]').value.trim();
        const email   = document.querySelector('#forms input[type="email"]').value.trim();
        const message = document.querySelector('#forms textarea').value.trim();

        const old = document.getElementById('form-feedback');
        if (old) old.remove();

        const msg = document.createElement('p');
        msg.id = 'form-feedback';
        msg.style.fontFamily = 'Arial, sans-serif';
        msg.style.fontSize = '0.85rem';
        msg.style.marginTop = '8px';

        if (!name || !email || !message) {
            msg.style.color = '#ff6b6b';
            msg.textContent = '⚠ Please fill in all fields.';
            submitBtn.after(msg);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            msg.style.color = '#ff6b6b';
            msg.textContent = '⚠ Please enter a valid email.';
            submitBtn.after(msg);
            return;
        }

        msg.style.color = '#7DB5B8';
        msg.textContent = '✔ Message sent successfully!';
        submitBtn.after(msg);
        submitBtn.textContent = 'Sent ✔';
        submitBtn.style.backgroundColor = '#1e5f6e';

        document.querySelector('#forms input[type="text"]').value  = '';
        document.querySelector('#forms input[type="email"]').value = '';
        document.querySelector('#forms textarea').value            = '';

        setTimeout(() => {
            submitBtn.textContent = 'Send';
            submitBtn.style.backgroundColor = '';
            msg.remove();
        }, 3000);
    });
}


// ══════════════════════════════════════
//  SMOOTH SCROLL
// ══════════════════════════════════════

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
