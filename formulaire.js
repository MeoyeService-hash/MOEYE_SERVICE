// CONFIGURATION DE LA RÉCEPTION DES FICHE DE PROJET
const WHATSAPP_PROJECT_NUMBER = "2250565640805"; 

const projectForm = document.getElementById('projectForm');

if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Bloque le rafraîchissement d'écran

        let hasError = false;

        // 1. Capture des données textuelles de base
        const name = document.getElementById('proj-name').value.trim();
        const city = document.getElementById('proj-city').value.trim();
        const phone = document.getElementById('proj-phone').value.trim();
        const email = document.getElementById('proj-email').value.trim();
        const size = document.getElementById('proj-size').value.trim();
        const budget = document.getElementById('proj-budget').value.trim();

        // 2. Traitement des Secteurs (Checkboxes multiples)
        const sectorBoxes = document.querySelectorAll('.proj-sector-check:checked');
        let selectedSectors = [];
        sectorBoxes.forEach(box => selectedSectors.push(box.value));
        const sectorAutreText = document.getElementById('proj-sector-autre-text').value.trim();
        if (selectedSectors.includes("Autre") && sectorAutreText) {
            selectedSectors = selectedSectors.map(s => s === "Autre" ? `Autre (${sectorAutreText})` : s);
        }

        // 3. Traitement des Boutons Radios (Service, Terrain, Délai)
        const serviceRadio = document.querySelector('input[name="proj-service"]:checked');
        const selectedService = serviceRadio ? serviceRadio.value : "";

        const landRadio = document.querySelector('input[name="proj-hasLand"]:checked');
        const hasLand = landRadio ? landRadio.value : "";

        const delayRadio = document.querySelector('input[name="proj-delay"]:checked');
        const selectedDelay = delayRadio ? delayRadio.value : "";


        // --- PROCÉDURE DE CORRECTION ET VÉRIFICATION VISUELLE ---
        
        const bName = document.getElementById('block-proj-name');
        if (!name) { bName.classList.add('field-error'); hasError = true; } else { bName.classList.remove('field-error'); }

        const bCity = document.getElementById('block-proj-city');
        if (!city) { bCity.classList.add('field-error'); hasError = true; } else { bCity.classList.remove('field-error'); }

        const bPhone = document.getElementById('block-proj-phone');
        if (!phone) { bPhone.classList.add('field-error'); hasError = true; } else { bPhone.classList.remove('field-error'); }

        const bEmail = document.getElementById('block-proj-email');
        if (!email || !email.includes('@')) { bEmail.classList.add('field-error'); hasError = true; } else { bEmail.classList.remove('field-error'); }

        const bSectors = document.getElementById('block-proj-sectors');
        if (selectedSectors.length === 0) { bSectors.classList.add('field-error'); hasError = true; } else { bSectors.classList.remove('field-error'); }

        const bService = document.getElementById('block-proj-service');
        if (!selectedService) { bService.classList.add('field-error'); hasError = true; } else { bService.classList.remove('field-error'); }

        const bSize = document.getElementById('block-proj-size');
        if (!size) { bSize.classList.add('field-error'); hasError = true; } else { bSize.classList.remove('field-error'); }

        const bLand = document.getElementById('block-proj-hasLand');
        if (!hasLand) { bLand.classList.add('field-error'); hasError = true; } else { bLand.classList.remove('field-error'); }

        const bBudget = document.getElementById('block-proj-budget');
        if (!budget) { bBudget.classList.add('field-error'); hasError = true; } else { bBudget.classList.remove('field-error'); }

        const bDelay = document.getElementById('block-proj-delay');
        if (!selectedDelay) { bDelay.classList.add('field-error'); hasError = true; } else { bDelay.classList.remove('field-error'); }


        // --- COMPILATION ET ENVOI SUR WHATSAPP ---
        if (!hasError) {
            let projectReport = `*FICHE DE PROJET AGRO-PASTORAL — MOAYE SERVICE*\n\n`;
            projectReport += `*1. INFORMATIONS GÉNÉRALES :*\n`;
            projectReport += `👤 Porteur : ${name}\n`;
            projectReport += `📍 Localisation : ${city}\n`;
            projectReport += `📞 WhatsApp : ${phone}\n`;
            projectReport += `✉️ E-mail : ${email}\n\n`;

            projectReport += `*2. SECTEURS COMPILÉS :*\n`;
            selectedSectors.forEach(sector => projectReport += `  - ${sector}\n`);
            projectReport += `\n`;

            projectReport += `*3. DETAILS TECHNIQUES :*\n`;
            projectReport += `🛠️ Service requis : ${selectedService}\n`;
            projectReport += `📐 Envergure prévue : ${size}\n`;
            projectReport += `🏠 Terrain disponible : ${hasLand}\n\n`;

            projectReport += `*4. LOGISTIQUE & BUDGET :*\n`;
            projectReport += `💰 Enveloppe estimée : ${budget}\n`;
            projectReport += `⏱️ Lancement souhaité : ${selectedDelay}\n\n`;
            projectReport += `_Fiche de projet validée par le pôle ingénierie._`;

            // Redirection API WhatsApp officielle
            const finalLink = `https://wa.me{WHATSAPP_PROJECT_NUMBER}?text=${encodeURIComponent(projectReport)}`;
            window.open(finalLink, '_blank');
        }
    });
}

// ==========================================================================
// EXPÉDITION DYNAMIQUE DE LA DEMANDE DE DEVIS COMPLET SUR WHATSAPP
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const devisForm = document.getElementById('whatsappDevisForm');

    if (devisForm) {
        devisForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Section 1 : Informations Personnelles
            const name = document.getElementById('clientName').value.trim();
            const email = document.getElementById('clientEmail').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const location = document.getElementById('clientLocation').value.trim();

            // Section 2 : Le Projet
            const type = document.getElementById('prestationType').value;
            const description = document.getElementById('projectDesc').value.trim();

            // Section 3 : Échéances et Budget
            const rawDate = document.getElementById('startDate').value;
            const budget = document.getElementById('budgetEst').value;

            // Formater proprement la date au format lisible (JJ/MM/AAAA) s'il y en a une
            let formattedDate = rawDate;
            if (rawDate) {
                const dateParts = rawDate.split('-');
                if (dateParts.length === 3) {
                    formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                }
            }

            // Votre numéro officiel configuré de manière stricte (sans espaces ni le +)
            const numeroDestinataire = "2250709732358";

            // Mise en forme du message final structuré pour WhatsApp
            const texteComplet = `*NOUVELLE DEMANDE DE DEVIS — MOAYE SERVICE*\n\n` +
                                 `*1. INFORMATIONS CLIENT*\n` +
                                 `• *Nom/Raison Sociale :* ${name}\n` +
                                 `• *Email :* ${email}\n` +
                                 `• *Téléphone :* ${phone}\n` +
                                 `• *Localisation :* ${location}\n\n` +
                                 `*2. DÉTAILS DU PROJET*\n` +
                                 `• *Prestation :* ${type}\n` +
                                 `• *Description :* ${description}\n\n` +
                                 `*3. ÉCHÉANCE & BUDGET*\n` +
                                 `• *Date de début :* ${formattedDate}\n` +
                                 `• *Budget estimé :* ${budget} FCFA`;

            // Encodage strict au format URL
            const messageCode = encodeURIComponent(texteComplet);

            // Génération de la passerelle de discussion directe
            const redirectionUrl = `https://wa.me{numeroDestinataire}?text=${messageCode}`;

            // Ouverture instantanée dans un nouvel onglet
            window.open(redirectionUrl, '_blank');
        });
    }
});
