document.body.classList.add('page-transition');

const links = document.querySelectorAll('a[href$=".html"]');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.href;
        document.body.classList.remove('page-transition');
        document.body.classList.add('page-fade-out');
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 400);
    });
});

const greetingElement = document.getElementById('greeting');
if (greetingElement) {
    const hour = new Date().getHours();
    let greetingText = 'Selamat Malam';
    if (hour >= 5 && hour < 12) greetingText = 'Selamat Pagi';
    else if (hour >= 12 && hour < 15) greetingText = 'Selamat Siang';
    else if (hour >= 15 && hour < 18) greetingText = 'Selamat Sore';
    greetingElement.textContent = greetingText + ', Berkah Dalem.';
}

const searchInput = document.getElementById('searchInput');
const stasiContainer = document.getElementById('stasiContainer');
if (searchInput && stasiContainer) {
    const noResultMsg = document.createElement('p');
    noResultMsg.textContent = 'Stasi tidak ditemukan.';
    noResultMsg.className = 'text-center text-gray-500 font-semibold w-full col-span-full hidden mt-4';
    stasiContainer.appendChild(noResultMsg);

    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        const items = document.querySelectorAll('.stasi-item');
        let hasResult = false;
        
        items.forEach(function(item) {
            const text = item.querySelector('h3').textContent.toLowerCase();
            if (text.includes(filter)) {
                item.style.display = 'flex';
                item.classList.add('animate-fade-in');
                hasResult = true;
            } else {
                item.style.display = 'none';
                item.classList.remove('animate-fade-in');
            }
        });
        
        if (hasResult) {
            noResultMsg.classList.add('hidden');
        } else {
            noResultMsg.classList.remove('hidden');
        }
    });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgColor = type === 'error' ? 'bg-red-600' : 'bg-green-600';
    
    toast.className = `fixed bottom-6 right-6 px-6 py-4 rounded-xl text-white font-bold shadow-2xl transform transition-all duration-300 translate-y-20 opacity-0 z-50 flex items-center ${bgColor}`;
    toast.innerHTML = `<span>${message}</span>`;
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const subject = document.getElementById('subject');
        const message = document.getElementById('message').value.trim();
        
        let subjectValue = '';
        if(subject) subjectValue = subject.value;

        if (name === '' || message === '' || subjectValue === '') {
            showToast('Mohon lengkapi nama, subjek, dan pesan Anda!', 'error');
        } else {
            showToast('Terima kasih ' + name + '! Pesan berhasil terkirim.', 'success');
            contactForm.reset();
        }
    });
}

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'fixed bottom-6 left-6 bg-blue-800 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-2xl font-bold opacity-0 transition-opacity duration-300 pointer-events-none z-50 hover:bg-blue-700';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
        scrollTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});