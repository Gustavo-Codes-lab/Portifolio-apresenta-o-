document.addEventListener("DOMContentLoaded", () => {
    console.log("Site carregado com sucesso!");

    // --- ASSINATURA NO CONSOLE ---
    console.log(
        "%cOlá, explorador(a)! 🚀\n%cSou estudante de Tech e em breve lançarei grandes projetos! 🤩😜\nFique de olho na minha evolução.",
        "color: #2563eb; font-size: 16px; font-weight: bold;",
        "color: #64748b; font-size: 12px;"
    );

    /* =========================================
       1. CARROSSEL DE CERTIFICADOS (SWIPER)
       ========================================= */
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 25, // Aumentei um pouco o espaço
        loop: true,
        grabCursor: true,
        autoHeight: true, // Importante para textos longos
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            850: { slidesPerView: 2 }, // Ajuste para tablets
            1100: { slidesPerView: 3 }, // Ajuste para desktops
        },
    });

    /* =========================================
       2. DARK MODE (Corrigido e Robusto)
       ========================================= */
    initTheme();

    function initTheme() {
        const themeToggle = document.getElementById("theme-toggle");
        const body = document.body;
        
        if (!themeToggle) {
            console.warn("Botão de tema não encontrado.");
            return;
        }

        const icon = themeToggle.querySelector("i");

        // Função para atualizar o ícone baseado no tema atual
        function updateIcon() {
            const isLight = body.classList.contains("light-mode");
            if (icon) {
                icon.className = isLight ? "fas fa-moon" : "fas fa-sun";
            }
        }

        // 1. Verificar preferência salva
        const savedTheme = localStorage.getItem("theme");
        
        // Se a preferência salva for "light", adiciona a classe. Caso contrário, mantém o padrão escuro.
        if (savedTheme === "light") {
            body.classList.add("light-mode");
        }
        
        // Atualiza o ícone inicial
        updateIcon();

        // 2. Evento de clique
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            updateIcon();
            
            // Salvar preferência
            const currentTheme = body.classList.contains("light-mode") ? "light" : "dark";
            localStorage.setItem("theme", currentTheme);
        });
    }

    /* =========================================
       3. MENU MOBILE
       ========================================= */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
            const expanded = hamburger.getAttribute("aria-expanded") === "true";
            hamburger.setAttribute("aria-expanded", !expanded);
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* =========================================
       4. FORMULÁRIO (EMAIL FEEDBACK - AJAX)
       ========================================= */
    const form = document.getElementById("contact-form");
    const feedbackMsg = document.getElementById("form-feedback");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nome = document.getElementById("nome");
            const email = document.getElementById("email");
            const mensagem = document.getElementById("mensagem");

            if (!nome.value || !email.value || !mensagem.value) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const btn = form.querySelector("button");
            const originalText = btn.innerText;
            
            // Feedback visual imediato
            btn.innerText = "Enviando...";
            btn.disabled = true;
            btn.style.opacity = "0.7";

            const formData = new FormData(form);

            fetch("https://formsubmit.co/ajax/Gustavomc8@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(response => {
                if (!response.ok) throw new Error('Erro na requisição');
                return response.json();
            })
            .then(data => {
                btn.innerText = "Enviado com Sucesso!";
                btn.style.backgroundColor = "#10b981"; // Verde sucesso
                btn.style.opacity = "1";
                
                if(feedbackMsg) {
                    feedbackMsg.textContent = "Obrigado! Sua mensagem foi enviada.";
                    feedbackMsg.style.color = "#10b981";
                }
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = "";
                    if(feedbackMsg) feedbackMsg.textContent = "";
                }, 5000);
            })
            .catch(error => {
                console.error('Erro:', error);
                btn.innerText = "Erro ao Enviar";
                btn.style.backgroundColor = "#ef4444"; // Vermelho erro
                btn.style.opacity = "1";
                
                if(feedbackMsg) {
                    feedbackMsg.textContent = "Houve um problema. Tente novamente mais tarde.";
                    feedbackMsg.style.color = "#ef4444";
                }
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = "";
                }, 5000);
            });
        });
    }

    /* =========================================
       5. EXTRAS (Ano e FadeIn)
       ========================================= */
    const yearSpan = document.getElementById("year");
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(section => observer.observe(section));

    const backToTopBtn = document.getElementById("back-to-top");
    if(backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) backToTopBtn.classList.add("show");
            else backToTopBtn.classList.remove("show");
        });
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});