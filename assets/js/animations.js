/**
 * GSAP Animations + Chart.js Configuration
 * For Liberin Reveal.js Investor Pitch Deck
 */

(function () {
  'use strict';

  const animatedSlides = new Set();
  const chartsCreated = new Set();

  // ── CountUp Helper ──────────────────────────────────────────────────

  function countUp(element, target, duration, prefix, suffix) {
    const hasDecimals = target % 1 !== 0;
    const proxy = { value: 0 };

    gsap.to(proxy, {
      value: target,
      duration: duration || 1.5,
      ease: 'power2.out',
      onUpdate: function () {
        const formatted = hasDecimals
          ? proxy.value.toFixed(1)
          : Math.round(proxy.value).toLocaleString();
        element.textContent = (prefix || '') + formatted + (suffix || '');
      },
    });
  }

  function runCountUps(slideEl) {
    const counters = slideEl.querySelectorAll('.count-up');
    counters.forEach(function (el) {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      countUp(el, target, 1.5, prefix, suffix);
    });
  }

  // ── Slide Animation Definitions ─────────────────────────────────────

  function animateSlide0(slide) {
    const tl = gsap.timeline();

    tl.to(slide.querySelector('.logo, [data-animate="logo"]'), {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });

    tl.to(
      slide.querySelector('h1'),
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.3
    );

    tl.to(
      slide.querySelector('.subtitle, [data-animate="subtitle"]'),
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.6
    );

    const pills = slide.querySelectorAll('.product-pill, [data-animate="pill"]');
    if (pills.length) {
      tl.to(
        pills,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
        },
        0.9
      );
    }
  }

  function animateSlide1(slide) {
    const tl = gsap.timeline();

    tl.to(slide.querySelector('h2'), {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });

    const cards = slide.querySelectorAll('.pain-card, [data-animate="pain-card"]');
    if (cards.length) {
      tl.to(
        cards,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
        },
        0.3
      );
    }

    runCountUps(slide);
  }

  function animateSlide2(slide) {
    const tl = gsap.timeline();

    tl.to(slide.querySelector('h2'), {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });

    const items = slide.querySelectorAll('.stack-item, [data-animate="stack-item"]');
    if (items.length) {
      tl.to(
        items,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.25,
          ease: 'power2.out',
        },
        0.3
      );
    }
  }

  function animateSlide3(slide) {
    const tl = gsap.timeline();

    tl.to(slide.querySelector('h2'), {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });

    const badges = slide.querySelectorAll('.cagr-badge, [data-animate="cagr-badge"]');
    if (badges.length) {
      tl.to(
        badges,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
        },
        0.3
      );
    }

    // Market bar chart
    const canvas = slide.querySelector('canvas#marketChart');
    if (canvas && !chartsCreated.has('marketChart')) {
      chartsCreated.add('marketChart');

      new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: [
            'Septa (Enterprise GenAI)',
            'Boliye (Conversational AI)',
            'PiiVacy (Privacy)',
          ],
          datasets: [
            {
              label: '2024',
              data: [2.9, 14.29, 5.07],
              backgroundColor: '#93C5FD',
              borderRadius: 4,
            },
            {
              label: '2030',
              data: [19.8, 41.39, 14.6],
              backgroundColor: '#145492',
              borderRadius: 4,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeOutQuart',
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#334155',
                font: { size: 12 },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ': $' + context.raw + 'B';
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Market Size ($B)',
                color: '#64748B',
              },
              ticks: { color: '#64748B' },
              grid: { color: 'rgba(0,0,0,0.05)' },
            },
            y: {
              ticks: { color: '#334155', font: { size: 11 } },
              grid: { display: false },
            },
          },
        },
      });
    }

    // TAM/SAM/SOM circles
    const circles = slide.querySelectorAll('.tam-circle, .sam-circle, .som-circle, [data-animate="market-circle"]');
    if (circles.length) {
      tl.to(
        circles,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.3,
          ease: 'back.out(1.4)',
        },
        0.8
      );
    }

    // Market callout
    const callout = slide.querySelector('.market-callout, [data-animate="market-callout"]');
    if (callout) {
      tl.to(
        callout,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        1.5
      );
    }

    runCountUps(slide);
  }

  function animateSlide4(slide) {
    const tl = gsap.timeline();

    const maps = slide.querySelectorAll('.map-container, [data-animate="map"]');
    if (maps.length) {
      tl.to(maps, {
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out',
      });
    }

    // Pulse dots – continuous animation
    const dots = slide.querySelectorAll('.pulse-dot');
    dots.forEach(function (dot) {
      gsap.to(dot, {
        scale: 1.4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    const stats = slide.querySelectorAll('.map-stat, [data-animate="map-stat"]');
    if (stats.length) {
      tl.to(
        stats,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
        },
        0.5
      );
    }

    runCountUps(slide);
  }

  function animateSlide5(slide) {
    const tl = gsap.timeline();

    const cards = slide.querySelectorAll('.product-card, [data-animate="product-card"]');
    if (cards.length) {
      tl.to(cards, {
        rotationY: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }

    runCountUps(slide);

    const footer = slide.querySelector('.product-footer, [data-animate="product-footer"]');
    if (footer) {
      tl.to(
        footer,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        1.0
      );
    }
  }

  function animateSlide6(slide) {
    const tl = gsap.timeline();

    const cards = slide.querySelectorAll('.enterprise-card, [data-animate="enterprise-card"]');
    if (cards.length) {
      tl.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }

    const stages = slide.querySelectorAll('.funnel-stage, [data-animate="funnel-stage"]');
    if (stages.length) {
      tl.to(
        stages,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          transformOrigin: 'left center',
        },
        0.5
      );
    }

    runCountUps(slide);
  }

  function animateSlide7(slide) {
    const tl = gsap.timeline();

    const blocks = slide.querySelectorAll('.revenue-block, [data-animate="revenue-block"]');
    if (blocks.length) {
      tl.to(blocks, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }

    // Revenue line chart
    const canvas = slide.querySelector('canvas#revenueChart');
    if (canvas && !chartsCreated.has('revenueChart')) {
      chartsCreated.add('revenueChart');

      var ctx = canvas.getContext('2d');
      var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height || 300);
      gradient.addColorStop(0, 'rgba(20,84,146,0.1)');
      gradient.addColorStop(1, 'transparent');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2026', '2027', '2028', '2029', '2030'],
          datasets: [
            {
              label: 'Revenue (₹ Cr)',
              data: [8, 15, 30, 60, 100],
              borderColor: '#145492',
              backgroundColor: gradient,
              fill: true,
              pointRadius: 6,
              pointBackgroundColor: '#145492',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 2000,
            easing: 'easeOutQuart',
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return '₹' + context.raw + ' Cr';
                },
              },
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Revenue (₹ Cr)',
                color: '#64748B',
              },
              ticks: { color: '#64748B' },
              grid: { color: 'rgba(0,0,0,0.05)' },
              beginAtZero: true,
            },
            x: {
              ticks: { color: '#334155' },
              grid: { display: false },
            },
          },
        },
      });
    }

    const valuationItems = slide.querySelectorAll('.valuation-item, [data-animate="valuation-item"]');
    if (valuationItems.length) {
      tl.to(
        valuationItems,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
        },
        1.0
      );
    }

    runCountUps(slide);
  }

  function animateSlide8(slide) {
    const tl = gsap.timeline();

    const askAmount = slide.querySelector('.ask-amount, [data-animate="ask-amount"]');
    if (askAmount) {
      tl.to(askAmount, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    // Funds doughnut chart
    const canvas = slide.querySelector('canvas#fundsChart');
    if (canvas && !chartsCreated.has('fundsChart')) {
      chartsCreated.add('fundsChart');

      new Chart(canvas.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['AI Talent', 'Go-to-Market', 'Product R&D'],
          datasets: [
            {
              data: [40, 35, 25],
              backgroundColor: ['#145492', '#1E6FBF', '#F5A623'],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '55%',
          animation: {
            animateRotate: true,
            duration: 1500,
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#334155',
                font: { size: 12 },
                padding: 16,
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.label + ': ' + context.raw + '%';
                },
              },
            },
          },
        },
      });
    }

    const pills = slide.querySelectorAll('.fund-pill, [data-animate="fund-pill"]');
    if (pills.length) {
      tl.to(
        pills,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
        },
        0.8
      );
    }

    const roiBox = slide.querySelector('.roi-box, [data-animate="roi-box"]');
    if (roiBox) {
      tl.to(
        roiBox,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        1.2
      );
    }

    runCountUps(slide);
  }

  function animateSlide9(slide) {
    const tl = gsap.timeline();

    tl.to(slide.querySelector('h1'), {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });

    const subtitle = slide.querySelector('.subtitle, [data-animate="subtitle"]');
    if (subtitle) {
      tl.to(
        subtitle,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.3
      );
    }

    // Flywheel continuous rotation
    const flywheel = slide.querySelector('.flywheel-group');
    if (flywheel) {
      gsap.to(flywheel, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }

    const cta = slide.querySelector('.cta-contact, [data-animate="cta"]');
    if (cta) {
      tl.to(
        cta,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        0.8
      );
    }
  }

  // ── Slide Dispatcher ────────────────────────────────────────────────

  var slideAnimators = [
    animateSlide0,
    animateSlide1,
    animateSlide2,
    animateSlide3,
    animateSlide4,
    animateSlide5,
    animateSlide6,
    animateSlide7,
    animateSlide8,
    animateSlide9,
  ];

  function triggerSlideAnimation(index, slideEl) {
    if (animatedSlides.has(index)) {
      return;
    }
    animatedSlides.add(index);

    var animator = slideAnimators[index];
    if (animator) {
      animator(slideEl);
    }
  }

  // ── Initial States ──────────────────────────────────────────────────

  function setInitialStates() {
    var selectors = [
      'h1',
      'h2',
      '.subtitle',
      '[data-animate="subtitle"]',
      '.product-pill',
      '[data-animate="pill"]',
      '.pain-card',
      '[data-animate="pain-card"]',
      '.stack-item',
      '[data-animate="stack-item"]',
      '.cagr-badge',
      '[data-animate="cagr-badge"]',
      '.market-callout',
      '[data-animate="market-callout"]',
      '.map-stat',
      '[data-animate="map-stat"]',
      '.product-footer',
      '[data-animate="product-footer"]',
      '.enterprise-card',
      '[data-animate="enterprise-card"]',
      '.revenue-block',
      '[data-animate="revenue-block"]',
      '.valuation-item',
      '[data-animate="valuation-item"]',
      '.ask-amount',
      '[data-animate="ask-amount"]',
      '.fund-pill',
      '[data-animate="fund-pill"]',
      '.roi-box',
      '[data-animate="roi-box"]',
      '.cta-contact',
      '[data-animate="cta"]',
    ];

    var slides = document.querySelectorAll('.reveal .slides section');
    slides.forEach(function (slide) {
      selectors.forEach(function (sel) {
        var els = slide.querySelectorAll(sel);
        els.forEach(function (el) {
          gsap.set(el, { opacity: 0, y: 30 });
        });
      });

      // Logo starts offset upward
      var logo = slide.querySelector('.logo, [data-animate="logo"]');
      if (logo) {
        gsap.set(logo, { opacity: 0, y: -20 });
      }

      // Map containers start transparent
      var maps = slide.querySelectorAll('.map-container, [data-animate="map"]');
      maps.forEach(function (m) {
        gsap.set(m, { opacity: 0 });
      });

      // Product cards start rotated
      var productCards = slide.querySelectorAll('.product-card, [data-animate="product-card"]');
      productCards.forEach(function (card) {
        gsap.set(card, { opacity: 0, rotationY: 90 });
      });

      // Funnel stages start collapsed
      var stages = slide.querySelectorAll('.funnel-stage, [data-animate="funnel-stage"]');
      stages.forEach(function (stage) {
        gsap.set(stage, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });
      });

      // Market circles start at scale 0
      var circles = slide.querySelectorAll(
        '.tam-circle, .sam-circle, .som-circle, [data-animate="market-circle"]'
      );
      circles.forEach(function (circle) {
        gsap.set(circle, { opacity: 0, scale: 0 });
      });

      // Ask amount starts offset upward
      var askAmount = slide.querySelector('.ask-amount, [data-animate="ask-amount"]');
      if (askAmount) {
        gsap.set(askAmount, { opacity: 0, y: -40 });
      }
    });
  }

  // ── Initialization ──────────────────────────────────────────────────

  // Expose init function to be called after Reveal.initialize()
  window.initLiberinAnimations = function () {
    lucide.createIcons();
    setInitialStates();

    Reveal.on('ready', function (event) {
      triggerSlideAnimation(event.indexh, event.currentSlide);
    });

    Reveal.on('slidechanged', function (event) {
      triggerSlideAnimation(event.indexh, event.currentSlide);
    });
  };
})();
