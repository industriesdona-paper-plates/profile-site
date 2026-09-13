/* =====================================================
   DONA INDUSTRIES
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PRELOADER
    ========================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("loaded");
        }, 500);

    });


    /* =========================
       HEADER SCROLL
    ========================== */

    const header = document.getElementById("header");

    function handleHeader() {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =========================
       MOBILE MENU
    ========================== */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("open");

        });

    });


    /* =========================
       SCROLL REVEAL
    ========================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    const sections =
        document.querySelectorAll("section[id]");

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId =
                            entry.target.getAttribute("id");

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            const href =
                                link.getAttribute("href");

                            if (href === `#${currentId}`) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                threshold: 0.25
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =========================
       ANIMATED COUNTERS
    ========================== */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;


    function startCounters() {

        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(counter => {

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const duration = 1500;

            const startTime = performance.now();


            function updateCounter(currentTime) {

                const progress =
                    Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                current =
                    Math.floor(
                        easedProgress * target
                    );

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(
                updateCounter
            );

        });

    }


    const statsSection =
        document.querySelector(".stats-section");


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            startCounters();

                            statsObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );

        statsObserver.observe(statsSection);

    }


    /* =========================
       BACK TO TOP
    ========================== */

    const backToTop =
        document.getElementById("backToTop");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================
       CURRENT YEAR
    ========================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =========================
       SMOOTH ANCHOR LINKS
    ========================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header.offsetHeight;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });


    /* =========================
       MOUSE PARALLAX
    ========================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        heroVisual &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5);


                heroVisual.style.transform =
                    `translateY(-50%)
                     translate(${x * 12}px,
                               ${y * 12}px)`;

            }
        );

    }


    /* =========================
       PRODUCT CARD TILT
    ========================== */

    const productCards =
        document.querySelectorAll(".product-card");


    if (
        window.matchMedia("(pointer:fine)").matches
    ) {

        productCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -3;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;


                    card.style.transform =
                        `perspective(700px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }

});