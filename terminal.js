/**
 * terminal.js - Interactive Developer CLI for Ayushree's Portfolio
 */

(function () {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  if (!terminalBody || !terminalInput) return;

  const history = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: `Available commands:
  <span class="t-cmd">whoami</span>       - Learn about Ayushree
  <span class="t-cmd">skills</span>       - Explore technical proficiencies (C, C++, Python, Java, AI/ML)
  <span class="t-cmd">projects</span>     - Browse featured systems & AI projects
  <span class="t-cmd">hackathons</span>   - View National & Global hackathon championships
  <span class="t-cmd">experience</span>   - Display internships and technical leadership
  <span class="t-cmd">contact</span>      - Get in touch & social links
  <span class="t-cmd">hire</span>         - Check availability and collaboration status
  <span class="t-cmd">matrix</span>       - Toggle cyber digital rain
  <span class="t-cmd">clear</span>        - Clear terminal screen`,

    whoami: `<span class="t-highlight">Ayushree</span> — B.Tech Computer Science Engineering (AI & ML Specialization)
• National & Global Hackathon Champion
• High-performance systems enthusiast (C, C++, Java)
• Deep Learning & Generative AI builder (Python, PyTorch, Transformers)
• Driven by high-velocity prototyping, algorithmic excellence, and real-world impact.`,

    skills: `<span class="t-cyan">=== Technical Skills Matrix ===</span>
<span class="t-yellow">Languages:</span>      C, C++20, Python 3, Java 21, SQL, JavaScript
<span class="t-green">AI & ML:</span>        PyTorch, TensorFlow, OpenCV, HuggingFace, Scikit-Learn, Deep RL
<span class="t-blue">Systems & Backend:</span> FastAPI, Spring Boot, Microservices, Kafka, PostgreSQL, Redis
<span class="t-magenta">DevOps & Cloud:</span>   Docker, Kubernetes, Git, Linux (Debian/Arch), AWS, TensorRT
<span class="t-yellow">Problem Solving:</span>  DSA in C++ & Java, 500+ LeetCode problems, Algorithmic Trading`,

    projects: `<span class="t-cyan">=== Featured Projects ===</span>
1. <span class="t-highlight">NeuroVision AI</span>: Multi-modal medical diagnostic pipeline (PyTorch, ViT, 99.2% Acc)
2. <span class="t-highlight">Chronos Order Book</span>: Low-latency C++20 limit order matching engine (<650ns)
3. <span class="t-highlight">OmniAgent</span>: Autonomous multi-agent software auditing framework (LangGraph, Llama-3)
4. <span class="t-highlight">MedSecure Cloud</span>: HIPAA-compliant Java Spring Boot microservice cloud
5. <span class="t-highlight">AeroSense Edge AI</span>: Autonomous drone obstacle avoidance (C++, Jetson, TensorRT)
<span class="t-muted">Tip: Scroll down to the Projects section to test live demos and view architecture!</span>`,

    hackathons: `<span class="t-yellow">=== Hackathon Hall of Fame 🏆 ===</span>
🥇 <span class="t-highlight">Global AI & Quantum Innovation Hackathon 2025</span> — 1st Place Champion (4,500+ global teams)
🥇 <span class="t-highlight">Smart India Hackathon (SIH) National Grand Finale</span> — 1st Place National Winner
🌟 <span class="t-highlight">Google Cloud GenAI Global Hackathon</span> — Best Generative AI Agent Architecture
🥇 <span class="t-highlight">ACM National Student Hackfest</span> — 1st Place Systems Track (C++ Order Engine)
🥈 <span class="t-highlight">Global Open Source ML Sprint</span> — Runner Up & Top Community Contributor`,

    experience: `<span class="t-cyan">=== Professional & Leadership Experience ===</span>
• <span class="t-highlight">AI/ML Research Intern</span> @ Tech Innovation Labs (Computer Vision & LLM alignment)
• <span class="t-highlight">Hackathon Captain & Technical Lead</span> @ University Innovation Council
• <span class="t-highlight">Open-Source Contributor</span> @ PyTorch & Edge AI Ecosystems
• <span class="t-highlight">Peer Mentor</span> @ Data Structures & Algorithms in C++ / Java Bootcamps`,

    contact: `<span class="t-cyan">=== Direct Communication Channels ===</span>
• Email:    <a href="mailto:ayushree.cse@gmail.com" class="t-link">ayushree.cse@gmail.com</a>
• LinkedIn: <a href="https://linkedin.com" target="_blank" class="t-link">linkedin.com/in/ayushree-cse</a>
• GitHub:   <a href="https://github.com" target="_blank" class="t-link">github.com/ayushree-dev</a>
• Location: India (Open to Worldwide Relocation & Remote Roles)`,

    hire: `<span class="t-green">STATUS: [AVAILABLE]</span>
Looking for AI/ML Engineering roles, Full-Stack/Systems internships, and high-stakes Hackathon collaborations!
Send an inquiry to: <span class="t-highlight">ayushree.cse@gmail.com</span> or use the contact form below.`,

    sudo: `<span class="t-yellow">Permission denied:</span> You do not need root access to collaborate with Ayushree! Just send an email. 😉`,

    matrix: `Initializing neural digital rain... [Running simulation: type 'clear' to reset]`,

    clear: `CLEAR`
  };

  function printOutput(html, isInput = false) {
    const line = document.createElement('div');
    line.className = isInput ? 'terminal-line input-echo' : 'terminal-line output-echo';
    line.innerHTML = html;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    printOutput(`<span class="prompt-symbol">ayushree@ai-box:~$</span> <span class="cmd-text">${escapeHtml(cmdRaw)}</span>`, true);

    if (!cmd) return;

    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    if (COMMANDS[cmd]) {
      printOutput(COMMANDS[cmd]);
    } else {
      printOutput(`<span class="t-red">zsh: command not found: ${escapeHtml(cmd)}</span>. Type <span class="t-cmd">'help'</span> to see valid commands.`);
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      if (val.trim()) {
        history.push(val);
        historyIndex = history.length;
      }
      handleCommand(val);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    }
  });

  // Keep terminal focused when clicking anywhere inside terminal box
  const terminalContainer = document.querySelector('.terminal-window');
  if (terminalContainer) {
    terminalContainer.addEventListener('click', function () {
      terminalInput.focus();
    });
  }
})();

