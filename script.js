// Create ambient particles
        function createAmbientParticles() {
            const isLowPower = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const particleCount = isLowPower ? 6 : 12;
            const container = document.querySelector('.container');
            for (let i = 0; i < particleCount; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.classList.add('ambient-particle');
                    
                    const size = Math.random() * 5 + 3;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    const xPos = Math.random() * 100;
                    const yPos = Math.random() * 100;
                    particle.style.left = `${xPos}%`;
                    particle.style.top = `${yPos}%`;
                    
                    if (!isLowPower) {
                        particle.style.animation = `float ${Math.random() * 3 + 4}s ease-in-out infinite`;
                        particle.style.animationDelay = `${Math.random() * 2}s`;
                    }
                    
                    container.appendChild(particle);
                    setTimeout(() => {
                        particle.style.opacity = 0.2 + (Math.random() * 0.3);
                    }, 100);
                }, i * 200);
            }
        }

        // Create celebration particles
        function createCompletionParticles(x, y) {
            const container = document.querySelector('.container');
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.classList.add('completion-particle');
                
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    particle.style.opacity = '1';
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 60 + 20;
                    const duration = Math.random() * 0.8 + 0.6;
                    
                    particle.style.transition = `all ${duration}s cubic-bezier(0.165, 0.84, 0.44, 1)`;
                    particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                    
                    setTimeout(() => {
                        particle.style.opacity = '0';
                        setTimeout(() => particle.remove(), 500);
                    }, duration * 800);
                }, i * 50);
            }
        }

        // Mouse/touch trail particles
        function initTrailParticles() {
            const container = document.querySelector('.container');
            const isLowPower = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const particles = [];
            const maxParticles = isLowPower ? 12 : 25;
            let mouseX = 0, mouseY = 0;
            let isPointerActive = false;
            
            function createTrailParticle(x, y) {
                const particle = document.createElement('div');
                particle.classList.add('trail-particle');
                
                const size = Math.random() * 12 + 4;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                particle.style.opacity = '0.7';
                
                container.appendChild(particle);
                particles.push(particle);
                
                if (particles.length > maxParticles) {
                    const oldParticle = particles.shift();
                    oldParticle.style.opacity = '0';
                    setTimeout(() => oldParticle.remove(), 300);
                }
                
                setTimeout(() => {
                    particle.style.opacity = '0';
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.remove();
                        }
                    }, 500);
                }, 500);
            }
            
            function handlePointerMove(e) {
                const isTouch = e.type.startsWith('touch');
                mouseX = isTouch ? e.touches[0].clientX : e.clientX;
                mouseY = isTouch ? e.touches[0].clientY : e.clientY;
                
                if (isPointerActive) {
                    createTrailParticle(mouseX, mouseY);
                }
            }
            
            function startPointerActivity(e) {
                isPointerActive = true;
                const isTouch = e.type.startsWith('touch');
                mouseX = isTouch ? e.touches[0].clientX : e.clientX;
                mouseY = isTouch ? e.touches[0].clientY : e.clientY;
                createTrailParticle(mouseX, mouseY);
            }
            
            function endPointerActivity() {
                isPointerActive = false;
            }
            
            // Mouse events
            document.addEventListener('mousemove', handlePointerMove);
            document.addEventListener('mousedown', startPointerActivity);
            document.addEventListener('mouseup', endPointerActivity);
            document.addEventListener('mouseleave', endPointerActivity);
            
            // Touch events
            document.addEventListener('touchmove', handlePointerMove, { passive: true });
            document.addEventListener('touchstart', startPointerActivity, { passive: true });
            document.addEventListener('touchend', endPointerActivity);
        }

        // Enhance SVG with interactive elements
        function enhanceSvg(svgElement) {
            svgElement.setAttribute('role', 'img');
            svgElement.setAttribute('aria-labelledby', 'title desc');
            
            if (!svgElement.querySelector('title')) {
                const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                title.id = 'title';
                title.textContent = 'Apple-Style Handwritten Hello Ritika';
                svgElement.appendChild(title);
            }
            
            if (!svgElement.querySelector('desc')) {
                const desc = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
                desc.id = 'desc';
                desc.textContent = 'A smooth, Apple-inspired handwritten animation of the text "Hello Ritika" with a premium iOS-style appearance';
                svgElement.appendChild(desc);
            }
            
            const defs = svgElement.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            
            if (!svgElement.querySelector('defs')) {
                svgElement.appendChild(defs);
            }
            
            defs.innerHTML = `
                <linearGradient id="apple-gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#ff5e62">
                        <animate attributeName="stop-color" values="#ff5e62; #ff9966; #2cd9c5; #ff5e62" dur="10s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="50%" stop-color="#ff9966">
                        <animate attributeName="stop-color" values="#ff9966; #2cd9c5; #ff5e62; #ff9966" dur="10s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stop-color="#2cd9c5">
                        <animate attributeName="stop-color" values="#2cd9c5; #ff5e62; #ff9966; #2cd9c5" dur="10s" repeatCount="indefinite" />
                    </stop>
                </linearGradient>
                
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feFlood flood-color="#ffffff" result="glow-color" />
                    <feComposite operator="in" in="glow-color" in2="blur" result="glow-blur" />
                    <feMerge>
                        <feMergeNode in="glow-blur" />
                        <feMergeNode in="glow-blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                
                <filter id="subtle-blur" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            `;
            
            const penTip = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            penTip.setAttribute('id', 'pen-tip');
            penTip.setAttribute('r', '3');
            
            const paths = svgElement.querySelectorAll('path');
            if (paths.length > 0) {
                const firstPath = paths[0];
                const firstPoint = firstPath.getPointAtLength(0);
                penTip.setAttribute('cx', firstPoint.x);
                penTip.setAttribute('cy', firstPoint.y);
            } else {
                penTip.setAttribute('cx', '50');
                penTip.setAttribute('cy', '50');
            }
            
            svgElement.appendChild(penTip);
            
            // Add interactive hover effects to SVG elements
            paths.forEach(path => {
                path.addEventListener('mouseover', () => {
                    // Apply random subtle transform on hover
                    const translateY = (Math.random() * 4 - 2).toFixed(2);
                    const rotate = (Math.random() * 1 - 0.5).toFixed(2);
                    const scale = (1 + Math.random() * 0.04).toFixed(2);
                    
                    path.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    path.style.transform = `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`;
                    path.style.filter = 'url(#glow)';
                });
                
                path.addEventListener('mouseout', () => {
                    path.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.5s ease';
                    path.style.transform = 'translateY(0) rotate(0) scale(1)';
                    path.style.filter = 'url(#subtle-blur)';
                });
            });
            
            return svgElement;
        }

        // Initialize SVG animation
        function initSvgAnimation() {
            const status = document.getElementById('animation-status');
            status.textContent = 'Animation started: Drawing "Hello Ritika"';
            
            const svg = document.querySelector('.svg-wrapper svg');
            const penTip = document.getElementById('pen-tip');
            const paths = svg.querySelectorAll('path');
            
            paths.forEach(path => {
                path.classList.add('hello-ritika-path');
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', 'url(#apple-gradient)');
                path.setAttribute('stroke-width', '5');
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');
                path.setAttribute('filter', 'url(#subtle-blur)');
                
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                
                // Add animation
                path.style.animation = `draw 2s forwards cubic-bezier(0.165, 0.84, 0.44, 1)`;
                path.style.animationDelay = '0.5s';
            });
            
            // Animate pen tip along path
            if (paths.length > 0) {
                const firstPath = paths[0];
                const pathLength = firstPath.getTotalLength();
                let progress = 0;
                const duration = 2000; // 2 seconds, same as the path animation
                const startTime = performance.now() + 500; // 500ms delay, same as path animation
                
                function animatePen(currentTime) {
                    if (currentTime >= startTime) {
                        progress = Math.min((currentTime - startTime) / duration, 1);
                        const point = firstPath.getPointAtLength(progress * pathLength);
                        penTip.setAttribute('cx', point.x);
                        penTip.setAttribute('cy', point.y);
                        
                        if (progress === 1) {
                            createCompletionParticles(point.x, point.y);
                            status.textContent = 'Animation completed: "Hello Ritika" is fully drawn';
                        } else {
                            requestAnimationFrame(animatePen);
                        }
                    } else {
                        requestAnimationFrame(animatePen);
                    }
                }
                
                requestAnimationFrame(animatePen);
            }
        }

        // Load SVG and initialize application
        function loadSVGAndInit() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'hello.svg', true);
            
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const svgWrapper = document.querySelector('.svg-wrapper');
                    svgWrapper.innerHTML = xhr.responseText;
                    
                    const svg = svgWrapper.querySelector('svg');
                    if (svg) {
                        enhanceSvg(svg);
                        
                        // Hide loading, show content
                        document.getElementById('loading').style.opacity = '0';
                        setTimeout(() => {
                            document.getElementById('loading').style.display = 'none';
                            document.getElementById('svg-container').style.display = 'flex';
                            initSvgAnimation();
                        }, 500);
                    } else {
                        console.error('Could not find SVG element in the response');
                    }
                } else {
                    console.error('Failed to load SVG file');
                }
            };
            
            xhr.onerror = function() {
                console.error('Network error while loading SVG');
            };
            
            xhr.send();
        }

        // Audio control functions
        function initAudioControls() {
            const audio = document.getElementById('bg-music');
            const playBtn = document.getElementById('play-music');
            const pauseBtn = document.getElementById('pause-music');
            
            playBtn.addEventListener('click', () => {
                audio.play();
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'flex';
            });
            
            pauseBtn.addEventListener('click', () => {
                audio.pause();
                pauseBtn.style.display = 'none';
                playBtn.style.display = 'flex';
            });
            
            // Handle initial state
            if (audio.paused) {
                pauseBtn.style.display = 'none';
                playBtn.style.display = 'flex';
            } else {
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'flex';
            }
            
            // Autoplay policy handling
            audio.addEventListener('play', () => {
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'flex';
            });
            
            audio.addEventListener('pause', () => {
                pauseBtn.style.display = 'none';
                playBtn.style.display = 'flex';
            });
        }

        // Initialize star map modal
        function initStarMap() {
            const modal = document.getElementById('starmap-modal');
            const button = document.getElementById('starmap-button');
            const closeBtn = document.getElementById('starmap-close');
            
            button.addEventListener('click', () => {
                modal.classList.add('active');
            });
            
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
            
            // Close on click outside content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                }
            });
        }

        // Star Map Modal Functionality
        const starMapButton = document.getElementById('starmap-button');
        const starMapModal = document.getElementById('starmap-modal');
        const starMapClose = document.getElementById('starmap-close');

        starMapButton.addEventListener('click', () => {
            starMapModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });

        starMapClose.addEventListener('click', () => {
            starMapModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        // Close modal when clicking outside the content
        starMapModal.addEventListener('click', (e) => {
            if (e.target === starMapModal) {
                starMapModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });        // Handle responsive layout adjustments
        function handleResponsiveLayout() {
            const svgContainer = document.getElementById('svg-container');
            const svgWrapper = document.querySelector('.svg-wrapper');
            
            function adjustLayout() {
                if (window.innerWidth <= 480) {
                    svgWrapper.style.height = 'auto';
                    const svg = svgWrapper.querySelector('svg');
                    if (svg) {
                        svg.style.height = 'auto';
                        svg.style.maxHeight = '70vh';
                    }
                }
            }
            
            // Initial adjustment
            adjustLayout();
            
            // Listen for window resize
            window.addEventListener('resize', adjustLayout);
        }

        // Day counter update function
        function updateDayCounter() {
            const counter = document.getElementById('day-counter');
            const startDate = new Date(2025, 4, 1); // May 1, 2025
            const currentDate = new Date();
            
            // Calculate difference in days
            const diffTime = Math.abs(currentDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            counter.innerHTML = `🌙 It's been ${diffDays} days since I met you`;
        }

        // Initialize everything when document is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize ambient particles
            createAmbientParticles();
            
            // Initialize trail particles
            initTrailParticles();
            
            // Load SVG and initialize animation
            loadSVGAndInit();
            
            // Initialize audio controls
            initAudioControls();
            
            // Initialize star map modal
            initStarMap();
              // Handle responsive layout
            handleResponsiveLayout();
            
            // Update day counter
            updateDayCounter();
        });