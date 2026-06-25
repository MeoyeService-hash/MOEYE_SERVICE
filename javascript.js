// ==========================================================================
// GESTION DU MENU DYNAMIQUE (DÉPASSEMENT DE L'IMAGE D'ACCUEIL)
// ==========================================================================
const mainHeader = document.getElementById('mainHeader');
const heroSection = document.querySelector('.monheaderImage');

if (mainHeader && heroSection) {
    window.addEventListener('scroll', () => {
        // On récupère la hauteur exacte en pixels de votre grande image d'accueil
        const heroHeight = heroSection.offsetHeight;
        
        // Si le défilement dépasse la hauteur de l'image (moins la taille du menu)
        if (window.scrollY >= (heroHeight - 500)) {
            mainHeader.classList.add('scrolled'); // Le fond sombre apparaît
        } else {
            mainHeader.classList.remove('scrolled'); // Devient 100% transparent
        }
    });
}

// ==========================================================================
// DESCENTE DU MENU MOBILE ET ANIMATION DES TROIS TRAITS (TOGGLE)
// ==========================================================================
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');
const individualLinks = document.querySelectorAll('#navLinks a');

if (menuToggle && navLinksContainer) {
    // 1. Déclenchement de l'ouverture / fermeture au clic sur les traits
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('toggle-active');    // Active la croix (✕)
        navLinksContainer.classList.toggle('open-menu'); // Fait descendre le rideau mobile
    });

    // 2. Sécurité UX : Ferme automatiquement le rideau quand le client sélectionne une page
    individualLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('toggle-active');
            navLinksContainer.classList.remove('open-menu');
        });
    });
}












// ==========================================================================
// LOGIQUE DU BOUTON COMPACT : APPARITION MAÎTRISÉE À L'ARRÊT DU DÉFILEMENT
// ==========================================================================
const backToTopBtn = document.getElementById('backToTop');
let isScrollingTimer = null;

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        // 1. PENDANT LE MOUVEMENT : On cache immédiatement le bouton
        backToTopBtn.classList.remove('show-btn');

        // Nettoie le minuteur précédent tant que l'utilisateur continue de défiler
        clearTimeout(isScrollingTimer);

        // 2. À L'ARRÊT DU MOUVEMENT : On lance un calcul après 400ms de pause
        isScrollingTimer = setTimeout(() => {
            // Sécurité : On affiche le bouton uniquement si on a quitté le haut du site (bannière)
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show-btn'); // Le bouton orange surgit
            }
        }, 400); // 400 millisecondes d'immobilité requises
    }, { passive: true });

    // 3. CLIC INTERACTIF : Retour au menu avec glissade fluide
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}




document.addEventListener('DOMContentLoaded', () => {
    
    // ---- MODULE 1 : FILTRAGE DES IMAGES ----
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.projet-gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Change le bouton actif vert
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetFilter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (targetFilter === 'all' || itemCategory === targetFilter) {
                    // Affiche l'image avec un léger effet fluide
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    // Masque l'image de l'écran
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // ---- MODULE 2 : ZOOM PLEIN ÉCRAN (LIGHTBOX) ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox && lightboxImg && lightboxClose) {
        // Au clic sur une image de la galerie
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSource = item.querySelector('img').getAttribute('src');
                const imgAlt = item.querySelector('img').getAttribute('alt');
                const projectTitle = item.querySelector('h3').innerText;

                // On injecte les données dans la boîte noire cachée
                lightboxImg.setAttribute('src', imgSource);
                lightboxImg.setAttribute('alt', imgAlt);
                lightboxCaption.innerText = projectTitle;

                // Fait apparaître le plein écran
                lightbox.classList.add('active-lightbox');
                lightbox.setAttribute('aria-hidden', 'false');
            });
        });

        // Fermeture au clic sur le bouton (✕)
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active-lightbox');
            lightbox.setAttribute('aria-hidden', 'true');
        });

        // Fermeture de sécurité au clic n'importe où à côté de la photo
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active-lightbox');
                lightbox.setAttribute('aria-hidden', 'true');
            }
        });
    }
});





// ==========================================================================
// SCROLL VERTICAL ACCÉLÉRÉ ET DYNAMIQUE (100% RESPONSIVE)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const animatedBg = document.getElementById('heroBgJs');

    if (animatedBg) {
        let positionY = 0;
        let direction = 1; // 1 = descend, -1 = remonte
        
        // CORRECTION DE LA VITESSE : Augmentée à 0.3 et 0.4 pour un mouvement plus rapide et visible
        const vitesse = window.innerWidth <= 768 ? 0.3 : 0.4; 
        
        // CORRECTION DE L'AMPLITUDE : Augmentée à 65px pour que l'image bouge franchement de haut en bas
        const limiteMax = 65; 

        function animerTravellingVertical() {
            positionY += vitesse * direction;

            if (positionY >= limiteMax) {
                direction = -1; // Arrivé en bas, remonte
            } else if (positionY <= 0) {
                direction = 1; // Arrivé en haut, descend
            }

            // Application physique fluide du mouvement accéléré
            animatedBg.style.transform = `translateY(${positionY}px) scale(1.15)`;

            requestAnimationFrame(animerTravellingVertical);
        }

        window.addEventListener('load', () => {
            requestAnimationFrame(animerTravellingVertical);
        });
    }
});











// ==========================================================================
// MOAYE SERVICE — PILOTAGE INTERACTIF ET DYNAMIQUE GLOBAL
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. EFFET MACHINE À ÉCRIRE SUR LE PARAGRAPHE DE DESCRIPTION
    // ----------------------------------------------------------------------
    const descriptions = [
        // CORRECTION CRITIQUE : Monsieur Ya passe en première position (Index 0) pour démarrer l'effet
        "Monsieur Ya Esse Siméon est un expert ivoirien, zootechnicien et nutritionniste, spécialisé dans l'agropastoral qui vous accompagnera pour la réalisation de vos projets.",
        "Acteur majeur dans l'accompagnement, le conseil technique, l'aménagement de fermes modernes et la réalisation d'infrastructures durables en Côte d'Ivoire.",
        "Votre partenaire de confiance pour la gestion de vos élevages de volailles, la production d'aliments et le suivi sanitaire complet de votre ferme.",
        "Expert en ingénierie aquacole : installation de bacs hors-sol professionnels, gestion de l'eau et optimisation des rendements de votre pisciculture.",
        "Rigueur constructive appliquée au bâtiment, au génie civil, au terrassement lourd et à l'aménagement complet de vos structures rurales et urbaines."
    ];

    const targetDesc = document.getElementById('typewriterDesc');
    
    if (targetDesc) {
        let descIndex = 0;
        
        // CORRECTION VISUELLE : Démarre à 0 pour écrire directement la première phrase sur Monsieur Ya
        let charIndex = 0; 
        let isDeleting = false; 
        
        const typingSpeed = 35;   // Écriture fluide et rythmée
        const deletingSpeed = 15;  // Effacement très rapide pour garder l'attention
        const readDelay = 4500;    // Temps de lecture confortable de 4,5 secondes avant changement

        function handleDescTypewriter() {
            const currentFullDesc = descriptions[descIndex];

            if (isDeleting) {
                // ÉTAPE D'EFFACEMENT PAS À PAS
                targetDesc.textContent = currentFullDesc.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // ÉTAPE d'ÉCRITURE LETTRE PAR LETTRE
                targetDesc.textContent = currentFullDesc.substring(0, charIndex + 1);
                charIndex++;
            }

            let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

            // Si la phrase est entièrement rédigée à l'écran, on fait la pause de lecture
            if (!isDeleting && charIndex === currentFullDesc.length) {
                currentSpeed = readDelay;
                isDeleting = true;
            } 
            // Si la phrase est entièrement nettoyée, on passe proprement à la suivante
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                descIndex = (descIndex + 1) % descriptions.length;
                currentSpeed = 300; // Courte pause respiratoire avant de réécrire la suite
            }

            setTimeout(handleDescTypewriter, currentSpeed);
        }

        // Lancement immédiat de la première écriture après 1 seconde d'installation du site
        setTimeout(handleDescTypewriter, 1000);
    }
});

    // ----------------------------------------------------------------------
    // 2. SCROLL VERTICAL AUTOMATIQUE ET ACCÉLÉRÉ DE L'IMAGE DE FOND
    // ----------------------------------------------------------------------
    const animatedBg = document.getElementById('heroBgJs');

    if (animatedBg) {
        let positionY = 0;
        let direction = 1; // 1 = descend, -1 = remonte
        
        // Vitesse dynamique calculée selon l'appareil (plus rapide sur PC)
        const vitesse = window.innerWidth <= 768 ? 0.3 : 0.4; 
        const limiteMax = 65; // Amplitude franche du mouvement de haut en bas

        function animerTravellingVertical() {
            positionY += vitesse * direction;

            if (positionY >= limiteMax) {
                direction = -1; // Arrivé en bas, l'image remonte
            } else if (positionY <= 0) {
                direction = 1; // Arrivé en haut, l'image descend
            }

            // Injection du mouvement sur l'axe Y combiné au zoom de sécurité
            animatedBg.style.transform = `translateY(${positionY}px) scale(1.15)`;

            requestAnimationFrame(animerTravellingVertical);
        }

        // Lance le mouvement dès que l'image est totalement chargée par le navigateur
        window.addEventListener('load', () => {
            requestAnimationFrame(animerTravellingVertical);
        });
    }











// ==========================================================================
// OBSERVATEUR AUTOMATIQUE : APPARITION EN DESCENDANT, FIXE EN REMONTANT
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const sectionsToAnimate = document.querySelectorAll('main > section, .expertises-grid > div, .partenaires-container > div, .contact-wrapper');
    
    let lastScrollTop = 0;

    // Ajout automatique de la classe de préparation invisible au démarrage
    sectionsToAnimate.forEach(element => {
        element.classList.add('js-reveal');
    });

    const globalObserverOptions = {
        root: null,
        rootMargin: '-30px',
        threshold: 0.1
    };

    const globalRevealObserver = new IntersectionObserver((entries) => {
        // Détection instantanée du sens du défilement (Haut ou Bas)
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        let isMovingDown = currentScroll > lastScrollTop;
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si on descend, la section apparaît progressivement
                entry.target.classList.add('reveal-active');
            } else {
                // CORRECTION : On masque UNIQUEMENT si l'utilisateur est en train de remonter
                // et que l'élément sort par le bas de l'écran (prêt à être ré-affiché plus tard)
                if (!isMovingDown && entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('reveal-active');
                }
            }
        });
    }, globalObserverOptions);

    sectionsToAnimate.forEach(element => {
        globalRevealObserver.observe(element);
    });
});

