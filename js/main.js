(function() {
    'use strict';

    // ============================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ============================================
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // ============================================
    // 2. ACCORDION COMPONENT (for opening hours)
    // ============================================
    var accordionBtn = document.getElementById('hoursToggle');
    var accordionContent = document.getElementById('hoursContent');

    if (accordionBtn && accordionContent) {
        accordionBtn.addEventListener('click', function() {
            var isOpen = accordionContent.style.display === 'block';
            accordionContent.style.display = isOpen ? 'none' : 'block';
            accordionBtn.textContent = isOpen ? 'View Opening Hours ▼' : 'Hide Opening Hours ▲';
        });
        accordionContent.style.display = 'none';
    }

    // ============================================
    // 3. LIGHTBOX GALLERY
    // ============================================
    function initLightbox() {
        var galleryItems = document.querySelectorAll('.gallery-item img');
        if (galleryItems.length === 0) return;

        var lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;justify-content:center;align-items:center;cursor:pointer;';

        var lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = 'max-width:90%;max-height:90%;object-fit:contain;border-radius:8px;';
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        galleryItems.forEach(function(img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                var src = img.getAttribute('data-full') || img.src;
                lightboxImg.src = src;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        lightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // 4. DYNAMIC TEAM (about.html)
    // ============================================
    function loadTeam() {
        var container = document.getElementById('team-container');
        if (!container) return;

        var team = [
            {
                name: 'Thabo M.',
                role: 'Master Barber',
                image: 'talkingToClient.jpg',
                description: '10+ years experience. Specializes in skin fades and modern styles.'
            },
            {
                name: 'Lerato K.',
                role: 'Senior Barber',
                image: 'friendlyStaff.jpg',
                description: '8 years crafting precision cuts. Expert in textured crops and beard shaping.'
            },
            {
                name: 'Sipho N.',
                role: 'Barber & Stylist',
                image: 'talking.webp',
                description: '5 years experience. Passionate about creative line designs and student styles.'
            }
        ];

        container.innerHTML = team.map(function(t) {
            return '<div class="card text-center"><img src="' + t.image + '" alt="' + t.name + ' - ' + t.role + ' at 1080p Cuts" class="image-square" style="border-radius:var(--radius-full);width:150px;height:150px;object-fit:cover;margin:0 auto var(--space-md) auto;"><h3>' + t.name + '</h3><p><strong>' + t.role + '</strong></p><p>' + t.description + '</p></div>';
        }).join('');
    }

    // ============================================
    // 5. DYNAMIC SERVICES WITH SEARCH & FILTER
    // ============================================
    function loadServices() {
        var container = document.getElementById('services-container');
        if (!container) return;

        var services = [
            { id: 1, name: 'Standard Haircut', price: 'R140', studentPrice: 'R120', duration: '35 min', category: 'haircut', image: 'fade.jpg', desc: 'Classic cut, taper fade, or scissor trim. Consultation included.' },
            { id: 2, name: 'Skin Fade', price: 'R160', studentPrice: 'R140', duration: '40 min', category: 'haircut', image: 'bold.webp', desc: 'High, mid, or low — crispy blend into skin.' },
            { id: 3, name: 'Textured Crop', price: 'R160', studentPrice: 'R140', duration: '45 min', category: 'haircut', image: 'stylish.jpg', desc: 'Perfect for young professionals. On-trend styles with movement.' },
            { id: 4, name: 'Beard Shape & Trim', price: 'R70', studentPrice: 'R70', duration: '15 min', category: 'grooming', image: 'beardTrim.jpg', desc: 'Line up, clean neckline, and trim to your desired length.' },
            { id: 5, name: 'Line Design', price: 'R40', studentPrice: 'R40', duration: '10 min', category: 'details', image: 'fade2.webp', desc: 'One or two sharp lines, zig-zags, or simple patterns.' },
            { id: 6, name: 'Eyebrow Tidy', price: 'R30', studentPrice: 'R30', duration: '10 min', category: 'details', image: 'eyebrowws.jpg', desc: 'Threading or waxing for clean, natural brows.' },
            { id: 7, name: 'Hot Towel Refresh', price: 'R50', studentPrice: 'R50', duration: '10 min', category: 'grooming', image: 'hotTowel.webp', desc: 'Steamed towel + light face moisturizer (add-on to any service).' },
            { id: 8, name: 'Student Special Combo', price: 'R220', studentPrice: 'R220', duration: '60 min', category: 'grooming', image: 'linedFade.jpg', desc: 'Skin fade + beard trim + line design. Saves you R50.' }
        ];

        function renderServices(data) {
            container.innerHTML = data.map(function(s) {
                return '<div class="card service-card" data-category="' + s.category + '"><img src="' + s.image + '" alt="' + s.name + '" class="service-img"><h3>' + s.name + '</h3><p>' + s.desc + '</p><div class="price">' + s.price + '</div><div class="price" style="font-size:0.9rem;color:#2e7d64;">Students: ' + s.studentPrice + '</div><div class="duration">⏱ ' + s.duration + '</div></div>';
            }).join('');
        }

        renderServices(services);

        var searchInput = document.getElementById('serviceSearch');
        var filterSelect = document.getElementById('serviceFilter');
        var resultCount = document.getElementById('resultCount');

        if (searchInput) {
            searchInput.addEventListener('input', function() {
                filterServices(services, searchInput.value, filterSelect ? filterSelect.value : 'all');
            });
        }

        if (filterSelect) {
            filterSelect.addEventListener('change', function() {
                filterServices(services, searchInput ? searchInput.value : '', filterSelect.value);
            });
        }

        function filterServices(data, searchTerm, category) {
            var filtered = data.filter(function(s) {
                var matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.desc.toLowerCase().includes(searchTerm.toLowerCase());
                var matchCategory = category === 'all' || s.category === category;
                return matchSearch && matchCategory;
            });
            renderServices(filtered);
            if (resultCount) {
                resultCount.textContent = 'Showing ' + filtered.length + ' of ' + data.length + ' services';
            }
        }
    }

    // ============================================
    // 6. FORM VALIDATION - ENQUIRY FORM
    // ============================================
    function initEnquiryForm() {
        var form = document.getElementById('enquiryForm');
        if (!form) return;

        var fullname = document.getElementById('fullname');
        var email = document.getElementById('email');
        var phone = document.getElementById('phone');
        var enquiryType = document.getElementById('enquiry-type');
        var message = document.getElementById('message');

        if (message) {
            var charCount = document.getElementById('charCount');
            message.addEventListener('input', function() {
                var count = this.value.length;
                if (charCount) {
                    charCount.textContent = count + ' / 500 characters';
                    if (count > 450) charCount.style.color = '#c73a2b';
                    else charCount.style.color = '#6b6b76';
                }
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var isValid = true;

            if (!fullname.value.trim() || fullname.value.trim().length < 2) {
                showError('fullnameError', 'Please enter your full name (minimum 2 characters).');
                isValid = false;
            } else {
                clearError('fullnameError');
            }

            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value)) {
                showError('emailError', 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError('emailError');
            }

            if (phone.value.trim()) {
                var phonePattern = /^[\+\d\s\-\(\)]{10,15}$/;
                if (!phonePattern.test(phone.value.trim())) {
                    showError('phoneError', 'Please enter a valid phone number (10-15 digits).');
                    isValid = false;
                } else {
                    clearError('phoneError');
                }
            }

            if (!enquiryType.value) {
                showError('enquiryTypeError', 'Please select an enquiry type.');
                isValid = false;
            } else {
                clearError('enquiryTypeError');
            }

            if (!message.value.trim() || message.value.trim().length < 10) {
                showError('messageError', 'Please enter a message (minimum 10 characters).');
                isValid = false;
            } else {
                clearError('messageError');
            }

            if (isValid) {
                var response = document.getElementById('formResponse');
                if (response) {
                    var enquiryTypeLabel = enquiryType.options[enquiryType.selectedIndex].text;
                    response.innerHTML = '<div style="background:#2e7d64;color:white;padding:1rem;border-radius:8px;"><strong>✅ Enquiry Sent Successfully!</strong><br>Thank you, ' + fullname.value.trim() + '! We\'ve received your ' + enquiryTypeLabel.toLowerCase() + ' enquiry. We\'ll get back to you within 24 hours at ' + email.value.trim() + '.</div>';
                    form.reset();
                    if (charCount) charCount.textContent = '0 / 500 characters';
                }
            }
        });

        function showError(id, message) {
            var el = document.getElementById(id);
            if (el) {
                el.textContent = message;
                el.style.color = '#c73a2b';
                el.style.display = 'block';
            }
        }

        function clearError(id) {
            var el = document.getElementById(id);
            if (el) {
                el.textContent = '';
                el.style.display = 'none';
            }
        }
    }

    // ============================================
    // 7. FORM VALIDATION - BOOKING FORM
    // ============================================
    function initBookingForm() {
        var form = document.getElementById('bookingForm');
        if (!form) return;

        var name = document.getElementById('booking-name');
        var email = document.getElementById('booking-email');
        var phone = document.getElementById('booking-phone');
        var service = document.getElementById('service');
        var date = document.getElementById('booking-date');
        var time = document.getElementById('booking-time');

        if (date) {
            var today = new Date().toISOString().split('T')[0];
            date.setAttribute('min', today);
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var isValid = true;

            if (!name.value.trim() || name.value.trim().length < 2) {
                showError('bookingNameError', 'Please enter your full name.');
                isValid = false;
            } else {
                clearError('bookingNameError');
            }

            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value)) {
                showError('bookingEmailError', 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError('bookingEmailError');
            }

            if (!phone.value.trim()) {
                showError('bookingPhoneError', 'Please enter your phone number.');
                isValid = false;
            } else {
                var phonePattern = /^[\+\d\s\-\(\)]{10,15}$/;
                if (!phonePattern.test(phone.value.trim())) {
                    showError('bookingPhoneError', 'Please enter a valid phone number (10-15 digits).');
                    isValid = false;
                } else {
                    clearError('bookingPhoneError');
                }
            }

            if (!service.value) {
                showError('serviceError', 'Please select a service.');
                isValid = false;
            } else {
                clearError('serviceError');
            }

            if (!date.value) {
                showError('dateError', 'Please select a preferred date.');
                isValid = false;
            } else {
                clearError('dateError');
            }

            if (!time.value) {
                showError('timeError', 'Please select a preferred time.');
                isValid = false;
            } else {
                clearError('timeError');
            }

            if (isValid) {
                var response = document.getElementById('bookingResponse');
                if (response) {
                    var serviceLabel = service.options[service.selectedIndex].text;
                    response.innerHTML = '<div style="background:#2e7d64;color:white;padding:1rem;border-radius:8px;"><strong>✅ Booking Request Sent!</strong><br>Thanks, ' + name.value.trim() + '! Your ' + serviceLabel + ' booking for ' + date.value + ' at ' + time.value + ' has been received. We\'ll confirm your slot within 2 hours via ' + email.value.trim() + '.</div>';
                    form.reset();
                }
            }
        });

        function showError(id, message) {
            var el = document.getElementById(id);
            if (el) {
                el.textContent = message;
                el.style.color = '#c73a2b';
                el.style.display = 'block';
            }
        }

        function clearError(id) {
            var el = document.getElementById(id);
            if (el) {
                el.textContent = '';
                el.style.display = 'none';
            }
        }
    }

    // ============================================
    // 8. INITIALIZE ALL FUNCTIONS
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        loadTeam();
        loadServices();
        initLightbox();
        initEnquiryForm();
        initBookingForm();

        if (document.getElementById('map')) {
            var mapContainer = document.getElementById('map');
            mapContainer.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100%;background:#f5f0e8;border-radius:8px;padding:20px;"><p style="text-align:center;color:#6b6b76;"><strong>📍 452 Nicolson Street, Brooklyn, Pretoria</strong><br><a href="https://maps.google.com/maps?q=452+Nicolson+Street+Pretoria" target="_blank" style="color:#e2b87a;">Open in Google Maps →</a></p></div>';
        }
    });

})();