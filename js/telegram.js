const TOKEN = '7694273056:AAFoML-z6fpo083hYnkNwyYseAVgEpk-XGA';
const CHAT_ID = '1914755558';

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nam = document.getElementById('nam').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Foydalanuvchi ma'lumotlarini birlashtirish
    const fullMessage = `Ism: ${nam}\nTelefon: ${phone}\nHabar: ${message}`;
    sendMessage(fullMessage);
});

function sendMessage(fullMessage) {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: fullMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.ok) {
            alert('Habar muvaffaqiyatli yuborildi!');
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('messageForm').reset(); // Formani tozalash
        } else {
            showError('Habar yuborishda xato! ' + (data.description || ''));
        }
    })
    .catch(error => {
        console.error('Xato:', error);
        showError('Xato yuz berdi!');
    });
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}