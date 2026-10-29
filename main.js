/**
 * main.js - Core Logic, UI Interactions, Filters & Animations
 * Engineered for Ayushree's Portfolio
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. THEME SWITCHER (DARK / LIGHT)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  function initTheme() {
    const savedTheme = localStorage.getItem('ayushree-portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    } else {
      document.body.classList.remove('light-theme');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const isLight = document.body.classList.toggle('light-theme');
      if (isLight) {
        localStorage.setItem('ayushree-portfolio-theme', 'light');
        if (themeIcon) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        }
        showToast('Light mode activated ☀️');
      } else {
        localStorage.setItem('ayushree-portfolio-theme', 'dark');
        if (themeIcon) {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
        showToast('Cyber dark mode activated 🌙');
      }
    });
  }

  initTheme();

  // -------------------------------------------------------------------------
  // 2. SCROLL PROGRESS & NAVBAR SCROLL STATE
  // -------------------------------------------------------------------------
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }

    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section Tracking
    let currentSectionId = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------------------------------------------------------------------------
  // 3. MOBILE MENU TOGGLE
  // -------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. ANIMATED TYPING EFFECT (HERO SECTION)
  // -------------------------------------------------------------------------
  const typingTextElem = document.getElementById('typing-roles');
  if (typingTextElem) {
    const roles = [
      'B.Tech CSE (AI & ML) Engineer',
      'Global & National Hackathons Winner 🏆',
      'High-Performance C++ & Systems Builder',
      'Deep Learning & PyTorch Specialist',
      'Enterprise Java & Cloud Developer'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeLoop() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typingTextElem.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 40;
      } else {
        typingTextElem.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400; // Pause before typing new word
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  // -------------------------------------------------------------------------
  // 5. ANIMATED NUMERICAL COUNTERS (STATS BANNER)
  // -------------------------------------------------------------------------
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function runCounters() {
    if (countersAnimated) return;

    const statsSection = document.querySelector('.stats-banner');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      countersAnimated = true;
      counters.forEach(function (counter) {
        const target = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeProgress * target;

          counter.textContent = (isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }
  }

  window.addEventListener('scroll', runCounters);
  runCounters();

  // -------------------------------------------------------------------------
  // 6. SKILLS FILTERING
  // -------------------------------------------------------------------------
  const skillFilters = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      skillFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-filter');

      skillCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 7. PROJECTS FILTERING
  // -------------------------------------------------------------------------
  const projectFilters = document.querySelectorAll('[data-proj-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      projectFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-proj-filter');

      projectCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 8. HACKATHONS FILTERING
  // -------------------------------------------------------------------------
  const hackathonFilters = document.querySelectorAll('[data-hack-filter]');
  const hackathonCards = document.querySelectorAll('.hackathon-card');

  hackathonFilters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      hackathonFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-hack-filter');

      hackathonCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 9. PROJECT CASE STUDY & ARCHITECTURE MODAL
  // -------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-trigger');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  const PROJECT_DETAILS = {
    neurovision: {
      title: 'NeuroVision AI: Multi-Modal Medical Diagnostics',
      badge: 'AI & Healthcare • 99.2% Accuracy',
      content: `
        <h4>Project Architecture & Engineering</h4>
        <p>NeuroVision AI is a high-precision multi-modal diagnostic pipeline trained on deep convolutional backbones and Vision Transformers (ViT) to detect anomalies in radiology and histopathology scans in under 15ms.</p>
        
        <h5 style="margin-top: 16px; color: var(--cyan);">Key Engineering Innovations:</h5>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-muted);">
          <li><strong>PyTorch ViT Backbone:</strong> Customized patch embeddings fine-tuned on NIH ChestX-ray 14 with Grad-CAM visualization for radiologist explainability.</li>
          <li><strong>FastAPI Async Inference Server:</strong> Deployed with ONNX Runtime & TensorRT engine for sub-15ms edge inference.</li>
          <li><strong>Docker & Kubernetes:</strong> Zero-downtime microservice containerization with continuous model weight tracking.</li>
          <li><strong>Benchmarked Accuracy:</strong> Achieved 99.2% AUC-ROC score across 14 radiological pathology categories.</li>
        </ul>
      `
    },
    chronos: {
      title: 'Chronos: High-Frequency Limit Order Book & Engine',
      badge: 'Modern C++20 • Sub-microsecond Latency',
      content: `
        <h4>Low-Latency Systems Architecture</h4>
        <p>Chronos is an ultra-low latency deterministic order-matching engine built from scratch in C++20, utilizing lock-free circular ring buffers and cache-line aligned structures to achieve p99 latency below 650 nanoseconds.</p>
        
        <h5 style="margin-top: 16px; color: var(--cyan);">Technical Highlights:</h5>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-muted);">
          <li><strong>Zero Dynamic Allocation:</strong> Eliminates heap allocations during order matching; memory is pre-allocated in cache-friendly static memory pools.</li>
          <li><strong>Lock-free Concurrency:</strong> Implements atomic compare-and-swap (CAS) ring buffers for seamless producer-consumer thread handoffs.</li>
          <li><strong>Linux Kernel Optimization:</strong> Optimized using epoll event polling, CPU core affinity pinning, and SIMD AVX vector instructions.</li>
          <li><strong>Throughput:</strong> Handles 4.8 Million limit & market orders per second under simulated burst conditions.</li>
        </ul>
      `
    },
    omniagent: {
      title: 'OmniAgent: Autonomous Multi-Agent Software Auditor',
      badge: 'Generative AI • LangGraph & LLMs',
      content: `
        <h4>Autonomous Agentic Framework</h4>
        <p>OmniAgent utilizes collaborative agent swarms (Syntax Auditor, Security Auditor, Test Generator, and Performance Profiler) to autonomously discover code vulnerabilities and generate automated pull-request fixes.</p>
        
        <h5 style="margin-top: 16px; color: var(--cyan);">Core Capabilities:</h5>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-muted);">
          <li><strong>LangGraph Directed Acyclic Graphs (DAG):</strong> Structured multi-agent deliberation where agents challenge and peer-review each other's security findings.</li>
          <li><strong>Hybrid Vector Retrieval (RAG):</strong> Integrated with ChromaDB and AST syntax parsers to retain semantic code comprehension across 50k+ lines of code repositories.</li>
          <li><strong>Autonomous Test Verification:</strong> Dynamically generates PyTest unit suites to execute and verify proposed code fixes before committing.</li>
        </ul>
      `
    },
    medsecure: {
      title: 'MedSecure: Enterprise Microservices Health Cloud',
      badge: 'Java 21 • Spring Boot & Kafka',
      content: `
        <h4>Enterprise Distributed Architecture</h4>
        <p>MedSecure is a HIPAA-compliant enterprise distributed health record platform engineered using Java 21, Spring Boot 3, and Apache Kafka for asynchronous audit trails.</p>
        
        <h5 style="margin-top: 16px; color: var(--cyan);">Key Architectural Features:</h5>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-muted);">
          <li><strong>Virtual Threads (Project Loom):</strong> High-concurrency I/O throughput serving 30,000+ concurrent health practitioner sessions.</li>
          <li><strong>Distributed Transactions:</strong> Implements the Saga Pattern over Kafka event streams for robust consistency across billing and patient services.</li>
          <li><strong>Zero-Trust Security:</strong> End-to-end AES-256 field-level database encryption, Spring Security JWT, and role-based access control (RBAC).</li>
        </ul>
      `
    },
    aerosense: {
      title: 'AeroSense: Edge AI Drone Autonomy & Navigation',
      badge: 'Edge C++ / Python • Jetson Orin',
      content: `
        <h4>Autonomous Robotics & Computer Vision</h4>
        <p>AeroSense powers autonomous aerial navigation in GPS-denied environments through embedded C++ and real-time obstacle avoidance models deployed on NVIDIA Jetson Orin Nano hardware.</p>
        
        <h5 style="margin-top: 16px; color: var(--cyan);">Robotics Features:</h5>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-muted);">
          <li><strong>Real-Time Depth Inference:</strong> Runs TensorRT-quantized YOLOv8 and depth estimation at a blistering 64 FPS on edge hardware.</li>
          <li><strong>Trajectory Vector Calculations:</strong> C++ trajectory re-planning algorithms that calculate alternative collision-free waypoints in under 8.4 milliseconds.</li>
          <li><strong>ROS2 Integration:</strong> Modular publish-subscribe communication connecting IMU telemetry, LIDAR arrays, and stereoscopic cameras.</li>
        </ul>
      `
    },
    ecoroute: {
      title: 'SmartCity AI: Deep RL Traffic Orchestrator',
      badge: 'National SIH Grand Winner • Reinforcement Learning',
      content: `
        <h4>National Award-Winning Smart Cities AI</h4>
        <p>Developed for the Smart India Hackathon Grand Finale, SmartCity AI replaces static traffic timers with deep Q-networks (DQN) and multi-agent reinforcement learning to prioritize emergency vehicles and minimize metropolitan emissions.</p>
        
        <h5 style="margin-top: 16px; color: var(--cyan);">Impact Metrics:</h5>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-muted);">
          <li><strong>Dynamic 'Green Wave' Clearance:</strong> Automatically calculates and clears routes for ambulances and fire trucks, cutting transit delay by 41.6%.</li>
          <li><strong>Urban Simulation:</strong> Validated on SUMO (Simulation of Urban MObility) with real sensor data feeds.</li>
          <li><strong>Emissions Reduction:</strong> Reduced vehicle idle wait times by 32%, saving approximately 28.4% in junction greenhouse emissions.</li>
        </ul>
      `
    }
  };

  document.querySelectorAll('[data-open-proj]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const projKey = btn.getAttribute('data-open-proj');
      const data = PROJECT_DETAILS[projKey];
      if (data && projectModal) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
          <div style="margin-bottom: 16px;">
            <span class="tech-tag" style="background: rgba(0, 245, 212, 0.15); border-color: var(--cyan); color: var(--cyan);">${data.badge}</span>
          </div>
          ${data.content}
        `;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // -------------------------------------------------------------------------
  // 10. RESUME MODAL VIEWER
  // -------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');

  openResumeBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modals
  modalCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
      document.body.style.overflow = 'auto';
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(function (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // -------------------------------------------------------------------------
  // 11. CONTACT FORM HANDLER WITH VALIDATION & TOAST
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please complete all required fields!', 'warning');
        return;
      }

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('Message transmitted successfully! Ayushree will reply shortly. 🚀');
      }, 900);
    });
  }

  // -------------------------------------------------------------------------
  // 12. 1-CLICK COPY EMAIL BUTTON
  // -------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function () {
      const email = 'ayushree.cse@gmail.com';
      navigator.clipboard.writeText(email).then(function () {
        showToast('Email copied to clipboard: ' + email);
      }).catch(function () {
        showToast('Email: ' + email);
      });
    });
  }

  // -------------------------------------------------------------------------
  // 13. TOAST NOTIFICATION HELPER
  // -------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    const iconClass = type === 'warning' ? 'fa-exclamation-circle' : 'fa-check-circle';
    toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('show');
    }, 20);

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () {
        toast.remove();
      }, 400);
    }, 4000);
  }

  window.showToast = showToast;
});

