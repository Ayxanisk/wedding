document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.getElementById('content-area');
    const loadContent = (page) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${page}.html`, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = xhr.responseText;
                const header = tempDiv.querySelector('header');
                if (header) {
                    header.remove();
                }
                const footer = tempDiv.querySelector('footer');
                if (footer) {
                    footer.remove();
                }
                const loader = tempDiv.querySelector('.loader');
                if (loader) {
                    loader.remove();
                }

                contentArea.innerHTML = tempDiv.innerHTML;

            } else {
                contentArea.innerHTML = '<p>Ошибка при загрузке контента.</p>';
            }
        };

        xhr.onerror = function () {
            contentArea.innerHTML = '<p>Ошибка при подключении.</p>';
        };

        xhr.send();
    };

    navLinks.forEach(link => {
        link.addEventListener('mouseover', (e) => {
            const page = e.target.getAttribute('data-page');
            loadContent(page);
        });
    });
});

const scrollToTop = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});
scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function openFullscreen(img) {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');

    fullscreenImage.src = img.src;

    fullscreenContainer.style.display = 'flex';
}

function closeFullscreen() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.style.display = 'none';
}

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/translations.json')
        .then(response => response.json())
        .then((translations) => {
            function changeLanguage(language) {
                const elements = document.querySelectorAll('[data-id]');
                elements.forEach((element) => {
                    const key = element.getAttribute('data-id');
                    if (translations[language][key]) {
                        element.textContent = translations[language][key];
                    }
                });
            }

            const languageSelector = document.getElementById('languageSelector');


            languageSelector.addEventListener('change', (event) => {
                const selectedLanguage = event.target.value;
                changeLanguage(selectedLanguage);
            });

            const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
            document.querySelector(".change-lang").value = savedLanguage;

            document.querySelector(".change-lang").addEventListener("change", (event) => {
                const selectedLanguage = event.target.value;
                localStorage.setItem("selectedLanguage", selectedLanguage);
                applyLanguage(selectedLanguage);
            });

            function applyLanguage(language) {
                document.querySelectorAll("[data-translate]").forEach((element) => {
                    const key = element.getAttribute("data-translate");
                    if (translations[language][key]) {
                        element.innerHTML = translations[language][key];
                    }
                });
            }

            applyLanguage(savedLanguage);
            changeLanguage(savedLanguage);
        })
        .catch(error => console.error('Error loading translations:', error));
});
const button = document.getElementById("send");
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
const progress = document.querySelector(".progress");

let timer1, timer2;

button.addEventListener("click", () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    toast.classList.add("active");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
        toast.classList.remove("active");
    }, 5000);

    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 5300);
});

closeIcon.addEventListener("click", () => {
    toast.classList.remove("active");

    setTimeout(() => {
        progress.classList.remove("active");
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
});
