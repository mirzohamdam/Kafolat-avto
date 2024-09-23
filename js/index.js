// Modal oynani ochish funksiyasi
function openModal() {
    document.getElementById('myModal').style.display = 'flex';
}

// Modal oynani yopish funksiyasi
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Qidiruv funksiyasi
function search() {
    const searchTerm = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('#item-list li');
    let found = false;

    // Modaldagi natijalarni tozalash
    const modalResults = document.getElementById('modalResults');
    modalResults.innerHTML = '';

    // Har bir elementni qidiruv so'zi bilan solishtirish
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
            // Agar topilgan bo'lsa, natijani modalda chiqarish
            const resultItem = document.createElement('div');
            resultItem.textContent = item.textContent;
            modalResults.appendChild(resultItem);
            found = true;
        }
    });

    // Agar hech narsa topilmasa, xabar chiqarish
    if (!found) {
        modalResults.innerHTML = 'Hech qanday natija topilmadi.';
    }

    // Modal oynani ko'rsatish
    openModal();
}
let slideIndex = 0;
const totalSlides = 10; // Umumiy slaydlar soni
const visibleSlides = 3; // Bir vaqtning o'zida ko'rinadigan slaydlar soni
const slideWidth = 100 / visibleSlides; // Bir slaydning kengligi
const slides = document.querySelector('.slides');

// Slaydni o'tkazish
function moveSlides(n) {
    slideIndex += n;

    // Chegaralarni boshqarish
    if (slideIndex > totalSlides - visibleSlides) {
        slideIndex = totalSlides - visibleSlides; // Chegaradan oshmaslik
    } else if (slideIndex < 0) {
        slideIndex = 0; // Eng boshiga qaytmaslik
    }

    // Slaydlarni siljitish
    slides.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
}
// Select all cards
const cards = document.querySelectorAll('.card');

// Select all modals
const modals = document.querySelectorAll('.modal');

// Select all close buttons
const closeButtons = document.querySelectorAll('.close');

// Function to open modal
cards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
    });
});

// Function to close modal
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-close');
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
    });
});

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

$(document).ready(function() {
    // Popupni ochish
    $("#open-popup-btn").click(function(event) {
        event.stopPropagation(); // Event Bubbling-ni to‘xtatish
        $("#search-popup").fadeIn();
        $("#popup-search-input").focus();
    });

    // Popupni yopish
    $("#close-popup").click(function(event) {
        event.stopPropagation(); // Event Bubbling-ni to‘xtatish
        $("#search-popup").fadeOut();
        $("#search-results").empty();
        $("#popup-search-input").val('');
    });

    // Popup oynasidan tashqariga bosganda yopish
    $(document).click(function(event) {
        var $target = $(event.target);
        if (!$target.closest(".popup-content").length && !$target.is("#open-popup-btn")) {
            $("#search-popup").fadeOut();
            $("#search-results").empty();
            $("#popup-search-input").val('');
        }
    });

    // Kitoblar ro'yxati va ularga havolalar
    var books = [
        { title: "moy", link: "/pages/molygen.html"},
        { title: "Suv Boyicha Qamoq - Chingiz Aytmatov", link: "https://uz.wikipedia.org/wiki/Suv_Boyicha_Qamoq" },
        { title: "Armon - Abdulla Oripov", link: "https://uz.wikipedia.org/wiki/Armon" },
        { title: "Buyuk Umidlar - Charles Dickens", link: "https://en.wikipedia.org/wiki/Great_Expectations" },
        { title: "Alkimyogar - Paulo Coelho", link: "https://en.wikipedia.org/wiki/The_Alchemist_(novel)" },
        { title: "Sokin Sadoqat - To'xtam Xudoyberdiyev", link: "#" },
        { title: "Don Kixot - Miguel de Cervantes", link: "https://en.wikipedia.org/wiki/Don_Quixote" },
        { title: "Jangchi - Aleksandr Soljenitsin", link: "https://en.wikipedia.org/wiki/The_General_and_the_Fantastic_Book" },
        { title: "Sherlar - Allama Muhammad Sodik Muhammad Yusuf", link: "#" },
        { title: "Hamlet - William Shakespeare", link: "https://en.wikipedia.org/wiki/Hamlet" },
        { title: "Yurakning Sirli Ishlari - Nikolay Gogol", link: "https://en.wikipedia.org/wiki/The_Mirror_of_Gogol" },
        { title: "Qiyomat Qal'asi - Aleksandr Puşkin", link: "https://en.wikipedia.org/wiki/Eugene_Onegin" },
        { title: "Anna Karenina - Lev Tolstoy", link: "https://en.wikipedia.org/wiki/Anna_Karenina" },
        { title: "Kichkina Prens - Antoine de Saint-Exupéry", link: "https://en.wikipedia.org/wiki/The_Little_Prince" },
        { title: "1984 - George Orwell", link: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four" },
        { title: "Fahrenheit 451 - Ray Bradbury", link: "https://en.wikipedia.org/wiki/Fahrenheit_451" },
        { title: "Brave New World - Aldous Huxley", link: "https://en.wikipedia.org/wiki/Brave_New_World" },
        { title: "The Great Gatsby - F. Scott Fitzgerald", link: "https://en.wikipedia.org/wiki/The_Great_Gatsby" },
        { title: "To Kill a Mockingbird - Harper Lee", link: "https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird" },
        { title: "Moby Dick - Herman Melville", link: "https://en.wikipedia.org/wiki/Moby-Dick" }
    ];

    // Autocomplete funksiyasi uchun faqat kitob nomlarini olish
    var bookTitles = books.map(function(book) {
        return book.title;
    });

    // Autocomplete funksiyasi
    $("#popup-search-input").autocomplete({
        source: bookTitles,
        minLength: 2,
        select: function(event, ui) {
            $("#popup-search-input").val(ui.item.value);
            performSearch(ui.item.value);
        }
    });

    // Qidiruv tugmasi bosilganda qidiruvni amalga oshirish
    $("#popup-search-button").click(function(event) {
        event.stopPropagation(); // Event Bubbling-ni to‘xtatish
        var query = $("#popup-search-input").val().trim().toLowerCase();
        performSearch(query);
    });

    // Enter tugmasi bosilganda qidiruvni amalga oshirish
    $("#popup-search-input").keypress(function(event) {
        if (event.which == 13) { // Enter tugmasi
            event.preventDefault(); // Form yuborilishini oldini olish
            var query = $(this).val().trim().toLowerCase();
            performSearch(query);
        }
    });
    
    // Qidiruv funksiyasi
    function performSearch(query) {
        if (query.length === 0) {
            $("#search-results").html("<strong>Iltimos, qidiruv so'zini kiriting.</strong>");
            return;
        }

        var found = books.filter(function(book) {
            return book.title.toLowerCase().includes(query);
        });

        if (found.length > 0) {
            var resultHtml = "<strong>Topilgan Kitoblar:</strong><ul>";
            found.forEach(function(book) {
                resultHtml += "<li><a href='" + book.link + "' target='_blank'>" + book.title + "</a></li>";
            });
            resultHtml += "</ul>";
            $("#search-results").html(resultHtml);
        } else {
            $("#search-results").html("<strong>Hech qanday kitob topilmadi.</strong>");
        }
    }
});
            // Sahifaning yangilanishini oldini olish
            event.preventDefault();

            const qidiruvSozi = document.getElementById('qidiruv-sozi').value;
