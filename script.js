// Inizializzazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza il menu mobile
    initMobileMenu();
    
    // Inizializza animazioni scroll
    initScrollAnimations();
    
    // Inizializza form contatti
    initContactForm();
    
    // Inizializza smooth scroll per i bottoni
    initSmoothScroll();
    
    // Inizializza animazione testo dinamico
    initDynamicText();
});

// Smooth scroll per i link di navigazione
function initSmoothScroll() {
    // Seleziona tutti i link che puntano ad ancore
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcola offset per header fisso
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Smooth scroll con animazione personalizzata
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Aggiungi un piccolo effetto di highlighting alla sezione target
                targetSection.style.transform = 'scale(1.02)';
                targetSection.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    targetSection.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
}

// Helper functions per rilevamento capacità dispositivo
function isWebGLSupported() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    } catch (e) {
        return false;
    }
}

function isLowPerformanceDevice() {
    // Rilevamento dispositivi con performance limitata
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isOldDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    
    return isMobile || isOldDevice || hasLimitedMemory;
}

function showFallbackContent(canvas) {
    canvas.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    canvas.style.position = 'relative';
    canvas.innerHTML = `
        <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            text-align: center;
            font-family: 'Roboto', sans-serif;
        ">
            <div style="font-size: 3rem; margin-bottom: 1rem;">💻</div>
            <div style="font-size: 1.2rem; font-weight: 500;">Computer 3D SONI</div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">Tecnologia Innovativa</div>
        </div>
    `;
}

// Funzione per inizializzare la scena 3D con ottimizzazioni avanzate
function init3DScene() {
    const canvas = document.getElementById('house-canvas');
    if (!canvas) return;

    // Controllo supporto WebGL e device capabilities
    if (!isWebGLSupported() || isLowPerformanceDevice()) {
        showFallbackContent(canvas);
        return;
    }

    // Mostra loading iniziale
    canvas.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    // Configurazione scena ultra-ottimizzata
    scene = new THREE.Scene();
    scene.matrixAutoUpdate = false; // Disabilita aggiornamento automatico matrici

    // Configurazione camera ultra-ottimizzata e centrata per computer ingrandito
    const aspect = canvas.clientWidth / canvas.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 2, 60); // FOV aumentato per vista migliore
    camera.position.set(0, 8, 12); // Camera più vicina per computer più grande
    camera.lookAt(0, 6.5, 0); // Guarda direttamente il computer
    camera.updateProjectionMatrix();
    camera.matrixAutoUpdate = false; // Disabilita aggiornamento automatico

    // Configurazione renderer ultra-ottimizzata per eliminare lag
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: false, // Disabilitato per massime performance
        alpha: true,
        powerPreference: "high-performance",
        precision: "lowp", // Precisione ridotta per performance
        depth: false, // Disabilita depth buffer se non necessario
        stencil: false // Disabilita stencil buffer
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); // Ridotto a 1 per eliminare lag
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap; // Tipo più veloce
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0x000000, 0);
    
    // Ottimizzazioni specifiche per eliminare lag
    renderer.sortObjects = false;
    renderer.info.autoReset = false;
    renderer.gammaFactor = 2.2;
    
    // Disabilita funzionalità non necessarie per performance
    renderer.physicallyCorrectLights = false;

    // Illuminazione ultra-ottimizzata
    setupUltraOptimizedLighting();
    
    // Crea il computer ultra-ottimizzato
    createUltraOptimizedComputer();
    
    // Avvia l'animazione ottimizzata
    animate();
    
    // Gestisci il resize
    window.addEventListener('resize', onWindowResize);
}

// Illuminazione ultra-ottimizzata per computer realistico
function setupUltraOptimizedLighting() {
    // Luce ambientale per illuminazione generale
    const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
    scene.add(ambientLight);

    // Luce principale ottimizzata per computer
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(10, 15, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 512;
    mainLight.shadow.mapSize.height = 512;
    mainLight.shadow.camera.near = 1;
    mainLight.shadow.camera.far = 30;
    mainLight.shadow.camera.left = -8;
    mainLight.shadow.camera.right = 8;
    mainLight.shadow.camera.top = 8;
    mainLight.shadow.camera.bottom = -8;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    // Luce aggiuntiva per schermo del computer
    const screenLight = new THREE.PointLight(0x60a5fa, 0.5, 10);
    screenLight.position.set(0, 1.2, 2);
    scene.add(screenLight);
}

// Creazione del computer 3D ultra-realistico con design moderno
function createUltraOptimizedComputer() {
    computerGroup = new THREE.Group();

    // Materiali condivisi e ultra-ottimizzati per computer realistico
    const sharedMaterials = {
        screenBlack: new THREE.MeshLambertMaterial({ color: 0x0a0a0a }),
        computerSilver: new THREE.MeshLambertMaterial({ color: 0xe8e8e8 }),
        keyboardDark: new THREE.MeshLambertMaterial({ color: 0x1a1a1a }),
        screenBlue: new THREE.MeshLambertMaterial({ 
            color: 0x1e3a8a, 
            transparent: true, 
            opacity: 0.9 
        }),
        metalGray: new THREE.MeshLambertMaterial({ color: 0x6b7280 }),
        base: new THREE.MeshLambertMaterial({ color: 0x374151 }),
        white: new THREE.MeshLambertMaterial({ color: 0xffffff }),
        screenGlow: new THREE.MeshLambertMaterial({ 
            color: 0x60a5fa, 
            transparent: true, 
            opacity: 0.7 
        })
    };

    // === MONITOR REALISTICO ===
    
    // Schermo principale più sottile e realistico
    const screenGeometry = new THREE.BoxGeometry(7, 4.5, 0.15);
    const screen = new THREE.Mesh(screenGeometry, sharedMaterials.screenBlue);
    screen.position.set(0, 1.2, 0);
    screen.castShadow = true;
    computerGroup.add(screen);

    // Effetto glow dello schermo
    const glowGeometry = new THREE.BoxGeometry(6.8, 4.3, 0.1);
    const screenGlow = new THREE.Mesh(glowGeometry, sharedMaterials.screenGlow);
    screenGlow.position.set(0, 1.2, 0.08);
    computerGroup.add(screenGlow);

    // Cornice monitor più sottile
    const frameGeometry = new THREE.BoxGeometry(7.5, 5, 0.5);
    const frame = new THREE.Mesh(frameGeometry, sharedMaterials.screenBlack);
    frame.position.set(0, 1.2, -0.15);
    frame.castShadow = true;
    computerGroup.add(frame);

    // Base monitor più elegante
    const standGeometry = new THREE.BoxGeometry(1.5, 0.4, 2);
    const stand = new THREE.Mesh(standGeometry, sharedMaterials.metalGray);
    stand.position.set(0, -1.8, 0);
    stand.castShadow = true;
    computerGroup.add(stand);

    // Supporto monitor più realistico
    const supportGeometry = new THREE.BoxGeometry(0.4, 2, 0.4);
    const support = new THREE.Mesh(supportGeometry, sharedMaterials.metalGray);
    support.position.set(0, -0.6, 0);
    support.castShadow = true;
    computerGroup.add(support);

    // Snodo di rotazione
    const jointGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const joint = new THREE.Mesh(jointGeometry, sharedMaterials.metalGray);
    joint.position.set(0, 0.5, 0);
    computerGroup.add(joint);

    // === TASTIERA DETTAGLIATA ===
    
    const keyboardGeometry = new THREE.BoxGeometry(5, 0.4, 2);
    const keyboard = new THREE.Mesh(keyboardGeometry, sharedMaterials.keyboardDark);
    keyboard.position.set(0, -2.2, 2.5);
    keyboard.castShadow = true;
    computerGroup.add(keyboard);

    // Tasti più realistici con layout QWERTY
    const keyGeometry = new THREE.BoxGeometry(0.18, 0.08, 0.18);
    const rows = [
        { keys: 10, width: 0.18, startX: -1.8 },
        { keys: 9, width: 0.18, startX: -1.6 },
        { keys: 8, width: 0.18, startX: -1.4 },
        { keys: 7, width: 0.18, startX: -1.2 }
    ];

    rows.forEach((row, rowIndex) => {
        for (let i = 0; i < row.keys; i++) {
            const key = new THREE.Mesh(keyGeometry, sharedMaterials.white);
            key.position.set(
                row.startX + i * 0.24,
                -2.1,
                1.8 + rowIndex * 0.25
            );
            computerGroup.add(key);
        }
    });

    // Spacebar
    const spacebarGeometry = new THREE.BoxGeometry(2, 0.08, 0.18);
    const spacebar = new THREE.Mesh(spacebarGeometry, sharedMaterials.white);
    spacebar.position.set(0, -2.1, 2.8);
    computerGroup.add(spacebar);

    // === MOUSE DETTAGLIATO ===
    
    const mouseGeometry = new THREE.BoxGeometry(0.8, 0.25, 1.2);
    const mouse = new THREE.Mesh(mouseGeometry, sharedMaterials.computerSilver);
    mouse.position.set(3.2, -2.1, 2.8);
    mouse.castShadow = true;
    computerGroup.add(mouse);

    // Rotellina mouse
    const wheelGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.3);
    const wheel = new THREE.Mesh(wheelGeometry, sharedMaterials.keyboardDark);
    wheel.position.set(3.2, -2.05, 2.8);
    computerGroup.add(wheel);

    // === DETTAGLI MODERNI E REALISTICI ===
    
    // Logo schermo più piccolo e realistico
    const logoGeometry = new THREE.BoxGeometry(0.6, 0.15, 0.02);
    const logo = new THREE.Mesh(logoGeometry, sharedMaterials.white);
    logo.position.set(0, -1.4, 0.26);
    computerGroup.add(logo);

    // Cavi realistici
    const cableGeometry = new THREE.BoxGeometry(0.08, 0.08, 3);
    const cable1 = new THREE.Mesh(cableGeometry, sharedMaterials.screenBlack);
    cable1.position.set(-3, -2.4, 1.5);
    cable1.rotation.z = Math.PI / 8;
    computerGroup.add(cable1);

    const cable2 = new THREE.Mesh(cableGeometry, sharedMaterials.screenBlack);
    cable2.position.set(3, -2.4, 1.8);
    cable2.rotation.z = -Math.PI / 8;
    computerGroup.add(cable2);

    // Pulsante di accensione
    const powerButtonGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 8);
    const powerButton = new THREE.Mesh(powerButtonGeometry, sharedMaterials.metalGray);
    powerButton.position.set(3, -1.2, 0.26);
    powerButton.rotation.x = Math.PI / 2;
    computerGroup.add(powerButton);

    // Ventilazione (dettagli estetici)
    for (let i = 0; i < 5; i++) {
        const ventGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.02);
        const vent = new THREE.Mesh(ventGeometry, sharedMaterials.screenBlack);
        vent.position.set(-3.2 + i * 0.1, 0, 0.26);
        computerGroup.add(vent);
    }

    // Posiziona il computer perfettamente centrato e nella posizione più alta ottimale
    computerGroup.position.set(0, 6.5, 0);
    
    // Scala dinamica basata sulla larghezza dello schermo
    const screenWidth = window.innerWidth;
    let scale = 1.5; // Base per mobile/tablet
    
    if (screenWidth > 1200) {
        scale = 2.0; // Molto più grande su desktop grandi
    } else if (screenWidth > 768) {
        scale = 1.7; // Più grande su desktop normali
    }
    
    computerGroup.scale.set(scale, scale, scale);
    computerGroup.rotation.set(0, 0, 0);
    scene.add(computerGroup);
}

// Animazione ottimizzata con controllo frame rate fluido per computer
function animate() {
    requestAnimationFrame(animate);
    
    const currentTime = performance.now();
    
    // Frame rate più fluido per movimento migliore
    if (currentTime - lastFrameTime < frameInterval) {
        return;
    }
    
    lastFrameTime = currentTime;
    frameCount++;
    
    const time = clock.getElapsedTime();

    // Rotazione continua fluida del computer
    if (computerGroup) {
        computerGroup.rotation.y += rotationSpeed;
        
        // Oscillazione verticale più fluida ogni 5 frame
        if (frameCount % 5 === 0) {
            computerGroup.position.y = 6.5 + Math.sin(time * 0.4) * 0.05;
        }
        
        // Leggera oscillazione orizzontale per dinamismo
        if (frameCount % 8 === 0) {
            computerGroup.rotation.x = Math.sin(time * 0.2) * 0.02;
        }
        
        // Aggiorna matrici per fluidità
        computerGroup.updateMatrix();
    }

    // Render con controllo di qualità ottimizzato
    renderer.render(scene, camera);
    
    // Reset counter ogni 2000 frame per performance
    if (frameCount >= 2000) {
        frameCount = 0;
        renderer.info.reset();
    }
}

// Gestione resize finestra con aggiornamento scala computer
function onWindowResize() {
    const canvas = document.getElementById('house-canvas');
    if (!canvas) return;

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    // Aggiorna scala computer in base alla nuova dimensione schermo
    if (computerGroup) {
        const screenWidth = window.innerWidth;
        let scale = 1.5; // Base per mobile/tablet
        
        if (screenWidth > 1200) {
            scale = 2.0; // Molto più grande su desktop grandi
        } else if (screenWidth > 768) {
            scale = 1.7; // Più grande su desktop normali
        }
        
        computerGroup.scale.set(scale, scale, scale);
    }
}

// Menu mobile migliorato
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Chiudi il menu quando si clicca su un link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Chiudi il menu quando si clicca fuori
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Animazioni scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementi da animare
    const animatedElements = document.querySelectorAll('.project-card, .stat, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form contatti
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulazione invio
            const button = form.querySelector('.btn-primary');
            const originalText = button.textContent;
            
            button.textContent = 'Invio in corso...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Messaggio Inviato!';
                button.style.background = '#27ae60';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '#3498db';
                    button.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Scroll smooth per i link interni
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Considera l'header fisso
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Effetto parallax per l'hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Prevenzione errori Three.js su mobile
window.addEventListener('error', function(e) {
    if (e.message.includes('WebGL')) {
        console.warn('WebGL non supportato, usando fallback');
        const canvas = document.getElementById('house-canvas');
        if (canvas) {
            canvas.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            canvas.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.2rem;">Casa 3D - WebGL non supportato</div>';
        }
    }
});

// Helper functions per rilevamento capacità dispositivo
function isWebGLSupported() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    } catch (e) {
        return false;
    }
}

function isLowPerformanceDevice() {
    // Rilevamento dispositivi con performance limitata
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isOldDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    
    return isMobile || isOldDevice || hasLimitedMemory;
}

function showFallbackContent(canvas) {
    canvas.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    canvas.style.position = 'relative';
    canvas.innerHTML = `
        <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            text-align: center;
            font-family: 'Roboto', sans-serif;
        ">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🏠</div>
            <div style="font-size: 1.2rem; font-weight: 500;">Casa 3D SONIK</div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">Design Architettonico Moderno</div>
        </div>
    `;
}

// Inizializza il testo dinamico nell'hero
function initDynamicText() {
    const heroText = document.querySelector('.hero-text');
    if (!heroText) return;

    const text = 'Benvenuti in Casa 3D SONIK';
    const letters = text.split('');
    heroText.innerHTML = '';

    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 50}ms`;
        heroText.appendChild(span);
    });

    // Rivelazione graduale del testo
    setTimeout(() => {
        const spans = heroText.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }, 100);
}

// Animazione testo dinamico
function initDynamicText() {
    const dynamicTextElement = document.getElementById('dynamic-text');
    if (!dynamicTextElement) return;
    
    const words = ['Creative', 'Intuitive', 'Interior'];
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentWord = words[currentWordIndex];
        
        if (!isDeleting) {
            // Scrivendo
            dynamicTextElement.textContent = currentWord.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentWord.length) {
                // Pausa quando la parola è completa
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, 2000);
                return;
            }
        } else {
            // Cancellando
            dynamicTextElement.textContent = currentWord.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % words.length;
                
                // Pausa breve prima di iniziare la parola successiva
                setTimeout(typeWriter, 500);
                return;
            }
        }
        
        // Velocità di scrittura/cancellazione
        const speed = isDeleting ? 100 : 150;
        setTimeout(typeWriter, speed);
    }
    
    // Inizia l'animazione dopo un delay iniziale
    setTimeout(typeWriter, 1000);
}