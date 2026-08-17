/* ============================================================
   XLERATOR RESEARCH
   app.js
   Navigation • Animations • UX
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       MOBILE NAVIGATION
    ======================================================== */

/* ========================================================
   MOBILE NAVIGATION
======================================================== */

const nav = document.querySelector("nav");
const headerContainer = document.querySelector("header .container");

if (nav && headerContainer) {

    const menuButton = document.createElement("button");

    menuButton.className = "menu-toggle";

    menuButton.type = "button";

    menuButton.setAttribute(
        "aria-label",
        "Toggle navigation"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    headerContainer.appendChild(menuButton);


    /* Open / close menu */

    menuButton.addEventListener("click", () => {

        const open =
            nav.classList.toggle("active");

        menuButton.classList.toggle(
            "active",
            open
        );

        menuButton.setAttribute(
            "aria-expanded",
            open ? "true" : "false"
        );

    });


    /* Close after clicking a link */

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Close when clicking outside */

    document.addEventListener("click", event => {

        if (
            !nav.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            nav.classList.remove("active");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* Close with Escape */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            nav.classList.remove("active");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


    /* ========================================================
       ACTIVE NAVIGATION LINK
    ======================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    const navigationLinks =
        document.querySelectorAll("nav a");

    navigationLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        /*
         * Ignore external links.
         */

        if (
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("#")
        ) {

            return;

        }

        const linkPage =
            href.split("/").pop();

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });


    /* ========================================================
       SCROLL REVEAL
    ======================================================== */

    const revealElements =
        document.querySelectorAll(
            ".card, .sector, .quotes div, " +
            ".contact-card, .research-card, " +
            ".stat, .timeline-item"
        );

    /*
     * If IntersectionObserver isn't available,
     * simply show everything.
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    } else {

        /*
         * Add reveal class.
         */

        revealElements.forEach(element => {

            element.classList.add("reveal");

        });

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold:0.12,
                    rootMargin:"0px 0px -50px 0px"
                }
            );

        revealElements.forEach(element => {

            observer.observe(element);

        });

    }


    /* ========================================================
       SMOOTH SCROLL FOR INTERNAL ANCHORS
    ======================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }

            const target =
                document.querySelector(targetId);

            if (!target) {

                return;

            }

            event.preventDefault();

            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

        });

    });


    /* ========================================================
       HEADER SCROLL EFFECT
    ======================================================== */

    const header =
        document.querySelector("header");

    if (header) {

        const updateHeader =
            () => {

                if (
                    window.scrollY > 30
                ) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            };

        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive:true
            }
        );

        updateHeader();

    }


    /* ========================================================
       EXTERNAL LINKS
    ======================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http://"], a[href^="https://"]'
        );

    externalLinks.forEach(link => {

        /*
         * Only modify links that point outside
         * the current website.
         */

        try {

            const url =
                new URL(
                    link.href,
                    window.location.href
                );

            if (
                url.hostname !==
                window.location.hostname
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        } catch (error) {

            /*
             * Ignore malformed URLs.
             */

        }

    });


    /* ========================================================
       CURRENT YEAR
    ======================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* ========================================================
       COPY CODE BUTTONS
    ======================================================== */

    const codeBlocks =
        document.querySelectorAll(
            "pre"
        );

    codeBlocks.forEach(block => {

        /*
         * Avoid adding multiple buttons.
         */

        if (
            block.querySelector(
                ".copy-code"
            )
        ) {

            return;

        }

        const button =
            document.createElement("button");

        button.className =
            "copy-code";

        button.type =
            "button";

        button.textContent =
            "Copy";

        /*
         * Positioning is handled below so
         * the feature works even without
         * additional CSS.
         */

        block.style.position =
            "relative";

        button.style.position =
            "absolute";

        button.style.top =
            "12px";

        button.style.right =
            "12px";

        button.style.padding =
            "6px 12px";

        button.style.borderRadius =
            "7px";

        button.style.border =
            "1px solid rgba(255,255,255,.1)";

        button.style.background =
            "rgba(255,255,255,.06)";

        button.style.color =
            "#cbd5e1";

        button.style.cursor =
            "pointer";

        button.addEventListener(
            "click",
            async () => {

                const code =
                    block.querySelector(
                        "code"
                    );

                const text =
                    code
                        ? code.innerText
                        : block.innerText;

                try {

                    await navigator.clipboard.writeText(
                        text
                    );

                    button.textContent =
                        "Copied";

                    setTimeout(() => {

                        button.textContent =
                            "Copy";

                    }, 1500);

                } catch (error) {

                    button.textContent =
                        "Failed";

                    setTimeout(() => {

                        button.textContent =
                            "Copy";

                    }, 1500);

                }

            }
        );

        block.appendChild(button);

    });


    /* ========================================================
       IMAGE LAZY LOADING
    ======================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );

    images.forEach(image => {

        /*
         * Don't override an explicit loading
         * attribute.
         */

        if (
            !image.hasAttribute(
                "loading"
            )
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* ========================================================
       EXTERNAL IMAGE ERROR HANDLING
    ======================================================== */

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

            }
        );

    });


    /* ========================================================
       KEYBOARD ESCAPE
       Close mobile menu.
    ======================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }

            const activeNav =
                document.querySelector(
                    "nav.active"
                );

            const activeButton =
                document.querySelector(
                    ".menu-toggle.active"
                );

            if (activeNav) {

                activeNav.classList.remove(
                    "active"
                );

            }

            if (activeButton) {

                activeButton.classList.remove(
                    "active"
                );

                activeButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* ========================================================
       LOG
       Useful during development.
    ======================================================== */

    console.log(
        "Xlerator Research website initialized."
    );

});
