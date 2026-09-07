const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const printBtn = document.getElementById('print-btn');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');
const statusText = document.getElementById('status');
const dateSpan = document.getElementById('current-date');
const savedSignaturesContainer = document.getElementById('saved-signatures');

// Postavi današnji datum
dateSpan.textContent = new Date().toLocaleDateString('hr-HR');

// Učitaj spremljene potpise pri učitavanju stranice
loadSignatures();

let isDrawing = false;

// Funkcije za crtanje
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
    checkSignatureCoverage(); // Provjeri popunjenost nakon svakog poteza
}

function draw(e) {
    if (!isDrawing) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    // Pozicioniranje ovisno o mišu ili dodiru
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.moveTo(x, y);
}

// Algoritam za provjeru 2% popunjenosti
function checkSignatureCoverage() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let nonBlankPixels = 0;

    // Prolazimo kroz pixele (svaki pixel ima 4 vrijednosti: R, G, B, A)
    // Gledamo Alpha kanal (indeks + 3)
    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 0) {
            nonBlankPixels++;
        }
    }

    const totalPixels = canvas.width * canvas.height;
    const percentage = (nonBlankPixels / totalPixels) * 100;

    statusText.textContent = `Potpisano: ${percentage.toFixed(1)}%`;

    // Ako je potpisano više od 2%, prikaži gumb
    if (percentage >= 2) {
        printBtn.style.display = 'inline-block';
        statusText.style.color = '#27ae60';
    } else {
        printBtn.style.display = 'none';
        statusText.style.color = '#7f8c8d';
    }
}

// Event listeneri
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
window.addEventListener('mouseup', stopDrawing);

// Podrška za mobitele (Touch)
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
canvas.addEventListener('touchend', stopDrawing);

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkSignatureCoverage();
});

printBtn.addEventListener('click', () => {
    window.print();
});

// Spremi potpis u localStorage
saveBtn.addEventListener('click', () => {
    // Provjeri je li canvas prazan
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let hasContent = false;
    
    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 0) {
            hasContent = true;
            break;
        }
    }
    
    if (!hasContent) {
        alert('Molimo prvo potpišite prije spremanja!');
        return;
    }
    
    // Pretvori canvas u sliku (base64)
    const signatureImage = canvas.toDataURL('image/png');
    
    // Dohvati postojeće potpise iz localStorage
    let signatures = JSON.parse(localStorage.getItem('signatures')) || [];
    
    // Dodaj novi potpis s datumom i vremenom
    const newSignature = {
        id: Date.now(),
        image: signatureImage,
        date: new Date().toLocaleString('hr-HR')
    };
    
    signatures.push(newSignature);
    
    // Spremi natrag u localStorage
    localStorage.setItem('signatures', JSON.stringify(signatures));
    
    // Osvježi prikaz
    loadSignatures();
    
    // Očisti canvas nakon spremanja
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkSignatureCoverage();
    
    alert('Potpis uspješno spremljen!');
});

// Učitaj i prikaži spremljene potpise
function loadSignatures() {
    const signatures = JSON.parse(localStorage.getItem('signatures')) || [];
    
    if (signatures.length === 0) {
        savedSignaturesContainer.innerHTML = '<p class="no-signatures">Nema spremljenih potpisa</p>';
        return;
    }
    
    savedSignaturesContainer.innerHTML = '';
    
    // Prikaži potpise od najnovijeg prema najstarijem
    signatures.reverse().forEach(signature => {
        const signatureItem = document.createElement('div');
        signatureItem.className = 'signature-item';
        
        signatureItem.innerHTML = `
            <button class="delete-btn" onclick="deleteSignature(${signature.id})">Obriši</button>
            <img src="${signature.image}" alt="Potpis">
            <p class="signature-date">${signature.date}</p>
        `;
        
        savedSignaturesContainer.appendChild(signatureItem);
    });
}

// Obriši potpis
function deleteSignature(id) {
    if (!confirm('Jeste li sigurni da želite obrisati ovaj potpis?')) {
        return;
    }
    
    let signatures = JSON.parse(localStorage.getItem('signatures')) || [];
    signatures = signatures.filter(sig => sig.id !== id);
    localStorage.setItem('signatures', JSON.stringify(signatures));
    loadSignatures();
}
