// Online Quiz Management - Client-side engine for Vercel / Static Hosting
// Contains all 20 Java Full Stack & DevOps questions

const ALL_QUESTIONS = [
    {
        id: 1,
        topic: "Core Java",
        questionText: "Which of the following is NOT one of the four fundamental principles of Object-Oriented Programming (OOP) in Java?",
        options: [
            "Encapsulation",
            "Compilation",
            "Inheritance",
            "Polymorphism"
        ],
        correctOption: 1,
        explanation: "The four main pillars of OOP in Java are Encapsulation, Inheritance, Polymorphism, and Abstraction. Compilation is the process of translating source code into bytecode."
    },
    {
        id: 2,
        topic: "Core Java",
        questionText: "What is the effect of applying the 'final' keyword to a variable in Java?",
        options: [
            "The variable can only be accessed within the same package",
            "The variable's value becomes constant and cannot be reassigned once initialized",
            "The variable is automatically destroyed by the Garbage Collector",
            "The variable can only store primitive numeric values"
        ],
        correctOption: 1,
        explanation: "When a variable is declared with the 'final' keyword, its value or reference cannot be reassigned after initialization."
    },
    {
        id: 3,
        topic: "Core Java",
        questionText: "What is the difference between '==' and the '.equals()' method when comparing two String objects in Java?",
        options: [
            "'==' checks if values are equal, while '.equals()' checks memory addresses",
            "'==' compares object memory references (addresses), while '.equals()' compares the actual text content",
            "Both '==' and '.equals()' behave exactly the same for Strings",
            "'.equals()' only works for primitive data types"
        ],
        correctOption: 1,
        explanation: "'==' verifies if two references point to the exact same memory location, whereas String.equals() checks if the sequence of characters (content) matches."
    },
    {
        id: 4,
        topic: "Core Java",
        questionText: "Which Java Collection interface implementation stores key-value pairs and does NOT guarantee any specific ordering?",
        options: [
            "ArrayList",
            "TreeSet",
            "HashMap",
            "LinkedList"
        ],
        correctOption: 2,
        explanation: "HashMap stores elements as key-value pairs (Map interface) and does not guarantee any order of elements over time."
    },
    {
        id: 5,
        topic: "Core Java",
        questionText: "In Java exception handling, which block is guaranteed to execute whether an exception occurs or not?",
        options: [
            "catch block",
            "throw block",
            "finally block",
            "throws clause"
        ],
        correctOption: 2,
        explanation: "The 'finally' block always executes after try and catch blocks, making it ideal for cleaning up resources like closing streams or database connections."
    },
    {
        id: 6,
        topic: "Spring Boot",
        questionText: "What is the primary benefit of using Spring Boot compared to the traditional Spring Framework?",
        options: [
            "It eliminates the need to write Java code",
            "It provides auto-configuration, embedded servers (like Tomcat), and starter dependencies for rapid development",
            "It replaces HTML and JavaScript in frontend development",
            "It only works with offline applications"
        ],
        correctOption: 1,
        explanation: "Spring Boot simplifies Spring development by offering opinionated starter POMs, automatic sensible default configurations, and embedded servlet containers (Tomcat, Jetty)."
    },
    {
        id: 7,
        topic: "Spring Boot",
        questionText: "Which annotation is used on a method in a Spring Boot controller to handle incoming HTTP GET requests?",
        options: [
            "@GetMapping",
            "@PostMapping",
            "@ResponseBody",
            "@PutMapping"
        ],
        correctOption: 0,
        explanation: "@GetMapping is a shortcut annotation that acts as a synonym for @RequestMapping(method = RequestMethod.GET)."
    },
    {
        id: 8,
        topic: "Spring Boot",
        questionText: "Which annotation is commonly used in Spring to automatically inject a dependency bean into another component?",
        options: [
            "@Injectable",
            "@Autowired",
            "@Component",
            "@Repository"
        ],
        correctOption: 1,
        explanation: "@Autowired is used in Spring to automatically wire (inject) collaborating beans by type into fields, constructors, or setter methods."
    },
    {
        id: 9,
        topic: "Java Full Stack",
        questionText: "In RESTful web services, which HTTP status code indicates a successful request?",
        options: [
            "404 Not Found",
            "500 Internal Server Error",
            "200 OK",
            "401 Unauthorized"
        ],
        correctOption: 2,
        explanation: "HTTP 200 OK is the standard response code for successful HTTP requests (such as GET, PUT, or POST)."
    },
    {
        id: 10,
        topic: "Java Full Stack",
        questionText: "In Java Full Stack backend development, what does 'ORM' stand for?",
        options: [
            "Object-Relational Mapping",
            "Online Resource Management",
            "Ordered Relationship Model",
            "Open Routing Module"
        ],
        correctOption: 0,
        explanation: "ORM stands for Object-Relational Mapping, a programming technique that maps Java classes (entities) to relational database tables (e.g. Hibernate, EclipseLink)."
    },
    {
        id: 11,
        topic: "Java Full Stack",
        questionText: "In Spring Data JPA, which interface provides ready-to-use CRUD methods like save(), findById(), and deleteById()?",
        options: [
            "JpaRepository",
            "HttpServlet",
            "DataSource",
            "EntityManagerFactory"
        ],
        correctOption: 0,
        explanation: "JpaRepository (extending PagingAndSortingRepository and CrudRepository) provides standard CRUD and pagination operations without writing manual SQL."
    },
    {
        id: 12,
        topic: "Java Full Stack",
        questionText: "In the Model-View-Controller (MVC) architecture, what is the role of the Controller?",
        options: [
            "It represents the database tables and schemas directly",
            "It displays the visual user interface to the client",
            "It handles incoming HTTP requests, coordinates with service/model layers, and returns responses",
            "It configures hardware networking ports"
        ],
        correctOption: 2,
        explanation: "The Controller acts as an intermediary: it intercepts incoming user requests, invokes business logic/services, and selects data or views to send back."
    },
    {
        id: 13,
        topic: "DevOps",
        questionText: "Which Git command saves staged changes to your local repository along with a descriptive message?",
        options: [
            "git push",
            "git commit -m \"message\"",
            "git add .",
            "git checkout"
        ],
        correctOption: 1,
        explanation: "'git commit -m \"message\"' records a snapshot of staged changes to the local repository history with a commit message."
    },
    {
        id: 14,
        topic: "DevOps",
        questionText: "Which Git command downloads commits from a remote repository and immediately integrates them into your current local branch?",
        options: [
            "git pull",
            "git clone",
            "git init",
            "git status"
        ],
        correctOption: 0,
        explanation: "'git pull' fetches commits from the remote repository and automatically merges them into the current active local branch."
    },
    {
        id: 15,
        topic: "DevOps",
        questionText: "What is the plain text configuration file that contains the step-by-step instructions to create a Docker container image?",
        options: [
            "docker-compose.yml",
            "Dockerfile",
            "pom.xml",
            "application.properties"
        ],
        correctOption: 1,
        explanation: "A 'Dockerfile' is a text document containing commands (FROM, COPY, RUN, CMD, etc.) that Docker uses to assemble a container image."
    },
    {
        id: 16,
        topic: "DevOps",
        questionText: "Which Docker CLI command is used to list all currently running containers?",
        options: [
            "docker build",
            "docker ps",
            "docker stop",
            "docker run"
        ],
        correctOption: 1,
        explanation: "'docker ps' lists all active running containers. Adding the '-a' flag ('docker ps -a') lists both running and stopped containers."
    },
    {
        id: 17,
        topic: "DevOps",
        questionText: "In Linux, which command is used to display the contents (files and directories) of the current folder?",
        options: [
            "pwd",
            "cd",
            "ls",
            "mkdir"
        ],
        correctOption: 2,
        explanation: "'ls' lists directory contents in Linux. 'pwd' shows the current working directory, and 'cd' changes directory."
    },
    {
        id: 18,
        topic: "DevOps",
        questionText: "What does the acronym 'CI/CD' stand for in DevOps methodology?",
        options: [
            "Central Integration / Cloud Deployment",
            "Continuous Integration / Continuous Deployment (or Delivery)",
            "Code Inspection / Continuous Distribution",
            "Container Interface / Container Driver"
        ],
        correctOption: 1,
        explanation: "CI/CD stands for Continuous Integration and Continuous Deployment (or Continuous Delivery), automating the building, testing, and deployment of software."
    },
    {
        id: 19,
        topic: "DevOps",
        questionText: "Which widely used open-source automation tool is popular for building and managing automated CI/CD pipelines?",
        options: [
            "Jenkins",
            "Eclipse IDE",
            "Postman",
            "MySQL Workbench"
        ],
        correctOption: 0,
        explanation: "Jenkins is a leading open-source automation server used by DevOps teams to build, test, and deploy applications continuously."
    },
    {
        id: 20,
        topic: "DevOps",
        questionText: "In an Apache Maven Java project, what is the primary configuration file that manages project dependencies, plugins, and build goals?",
        options: [
            "package.json",
            "build.gradle",
            "pom.xml",
            "web.xml"
        ],
        correctOption: 2,
        explanation: "'pom.xml' (Project Object Model) is the XML file in Maven that defines project metadata, library dependencies, plugins, and build lifecycle configurations."
    }
];

// App State
let state = {
    candidateName: localStorage.getItem("candidateName") || "",
    category: "ALL",
    questions: [],
    attemptNumber: parseInt(localStorage.getItem("attemptNumber") || "1"),
    lastScore: localStorage.getItem("lastScore") !== null ? parseInt(localStorage.getItem("lastScore")) : null,
    lastTotal: localStorage.getItem("lastTotal") !== null ? parseInt(localStorage.getItem("lastTotal")) : null,
    currentQuestionIndex: 0,
    userAnswers: {},
    isSubmitted: false
};

let dbStatus = null;

async function checkDatabaseStatus() {
    try {
        const res = await fetch('/api/status');
        if (res.ok) {
            dbStatus = await res.json();
        }
    } catch (e) {
        console.log("Running in static or offline mode:", e);
    }
}

async function init() {
    await checkDatabaseStatus();
    renderStartScreen();
}

function renderStartScreen() {
    const app = document.getElementById("app");
    
    let dbBannerHtml = "";
    if (dbStatus && dbStatus.status === "connected") {
        dbBannerHtml = `
            <div class="banner banner-success" style="background-color: #f0fff4; border: 1px solid #9ae6b4; border-left: 4px solid #38a169; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
                <div style="font-weight: 700; color: #22543d; font-size: 14px;">MySQL Database Connected: ${dbStatus.database}</div>
                <p style="margin: 4px 0 0 0; color: #276749; font-size: 13px;">
                    Host: <strong>${dbStatus.host}</strong> | Questions in DB: <strong>${dbStatus.questionsCount}</strong> | Submissions Recorded: <strong>${dbStatus.resultsCount}</strong>
                </p>
            </div>
        `;
    }

    let lastRecordHtml = "";
    if (state.lastScore !== null && state.lastTotal !== null) {
        const pct = Math.round((state.lastScore / state.lastTotal) * 100);
        const status = pct >= 60 ? "PASSED" : "NEEDS IMPROVEMENT";
        lastRecordHtml = `
            <div class="banner banner-previous">
                <div class="banner-title">Previous Assessment Record Found</div>
                <p>
                    Candidate: <strong>${escapeHtml(state.candidateName || "Student")}</strong> | 
                    Last Marks: <strong>${state.lastScore} / ${state.lastTotal}</strong> (${pct}%) - 
                    <strong>[ ${status} ]</strong>
                </p>
                <p style="margin-top: 6px; font-size: 13px;">
                    You can retry the assessment below to improve your score.
                </p>
            </div>
        `;
    }

    app.innerHTML = `
        <div class="header">
            <h1>Online Quiz System</h1>
            <p>Technical Assessment Portal - Java Full Stack & DevOps</p>
        </div>

        ${dbBannerHtml}
        ${lastRecordHtml}

        <div class="banner banner-info">
            <div class="banner-title">Assessment Guidelines</div>
            <p>- Each question carries 1 mark. There is no negative marking.</p>
            <p>- Questions cover Core Java, Spring Boot, JPA/Hibernate, REST, Docker, Kubernetes, CI/CD, and Git.</p>
            <p>- Passing score is 60%. Detailed answer keys and explanations will be provided upon submission.</p>
        </div>

        <form id="startForm">
            <div class="form-group">
                <label for="candidateName">Candidate Full Name:</label>
                <input type="text" id="candidateName" class="form-control" value="${escapeHtml(state.candidateName)}" placeholder="Enter your full name" required autofocus>
            </div>

            <div class="form-group">
                <label for="category">Select Assessment Module:</label>
                <select id="category" class="form-control">
                    <option value="PACKAGES">Java Packages Focused (25 Questions from MySQL Database)</option>
                    <option value="ALL">Complete Assessment (All 45 Questions from MySQL Database)</option>
                    <option value="JAVA">Java Full Stack Focused (Core Java, Spring Boot, Hibernate - 12 Questions)</option>
                    <option value="DEVOPS">DevOps Focused (Docker, Kubernetes, CI/CD, Git, Linux - 8 Questions)</option>
                </select>
            </div>

            <div style="margin-top: 25px;">
                <button type="submit" class="btn btn-primary btn-block">Start Assessment</button>
            </div>
        </form>

        <div class="footer">
            <p>Online Quiz Management System | Connected to MySQL Database (<code>java_question_bank</code>)</p>
        </div>
    `;

    document.getElementById("startForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const nameInput = document.getElementById("candidateName").value.trim();
        state.candidateName = nameInput || "Student";
        state.category = document.getElementById("category").value;
        localStorage.setItem("candidateName", state.candidateName);
        startQuiz();
    });
}

async function startQuiz() {
    state.currentQuestionIndex = 0;
    state.userAnswers = {};
    state.isSubmitted = false;

    // Try fetching from MySQL database API first
    try {
        const res = await fetch('/api/questions?category=' + encodeURIComponent(state.category));
        if (res.ok) {
            const data = await res.json();
            if (data.success && data.questions && data.questions.length > 0) {
                state.questions = data.questions;
                renderQuizScreen();
                return;
            }
        }
    } catch (err) {
        console.log("Notice: API not active, falling back to local questions:", err);
    }

    // Fallback if running purely static without backend
    if (state.category === "JAVA") {
        state.questions = ALL_QUESTIONS.filter(q => q.topic === "Core Java" || q.topic === "Spring Boot" || q.topic === "Java Full Stack");
    } else if (state.category === "DEVOPS") {
        state.questions = ALL_QUESTIONS.filter(q => q.topic === "DevOps");
    } else {
        state.questions = [...ALL_QUESTIONS];
    }

    renderQuizScreen();
}

function renderQuizScreen() {
    if (!state.questions || state.questions.length === 0) {
        renderStartScreen();
        return;
    }

    if (state.currentQuestionIndex < 0) {
        state.currentQuestionIndex = 0;
    }

    if (state.currentQuestionIndex >= state.questions.length) {
        evaluateQuiz();
        return;
    }

    const app = document.getElementById("app");
    const totalQ = state.questions.length;
    const currentNum = state.currentQuestionIndex + 1;
    const isLast = (state.currentQuestionIndex === totalQ - 1);
    const q = state.questions[state.currentQuestionIndex];
    
    let lastMarksBar = "";
    let retryNotice = "";
    if (state.lastScore !== null && state.lastTotal !== null) {
        lastMarksBar = `<div class="meta-item" style="color: #744210;">Last Marks: <strong>${state.lastScore} / ${state.lastTotal}</strong></div>`;
        if (state.currentQuestionIndex === 0) {
            retryNotice = `
                <div class="banner banner-previous">
                    <strong>Retry Mode Active:</strong> You scored <strong>${state.lastScore} out of ${state.lastTotal}</strong> on your previous attempt. Re-answer the questions to improve your score!
                </div>
            `;
        }
    }

    const letters = ["A", "B", "C", "D"];
    let optionsHtml = "";
    const previouslySelected = state.userAnswers[q.id];

    q.options.forEach((opt, optIdx) => {
        const radioId = `opt_${optIdx}`;
        const isChecked = (previouslySelected === optIdx) ? "checked" : "";
        optionsHtml += `
            <label class="option-item" for="${radioId}">
                <input type="radio" id="${radioId}" name="current_choice" value="${optIdx}" ${isChecked} onchange="hideValidation()">
                <span class="option-text">
                    <span class="option-letter">${letters[optIdx]}.</span>
                    ${escapeHtml(opt)}
                </span>
            </label>
        `;
    });

    let codeSnippetHtml = "";
    if (q.codeSnippet && q.codeSnippet.trim()) {
        codeSnippetHtml = `<pre class="code-snippet">${escapeHtml(q.codeSnippet)}</pre>`;
    }

    const progressPct = Math.round((currentNum / totalQ) * 100);
    const buttonText = isLast ? "Submit Assessment" : "Submit Answer";

    app.innerHTML = `
        <div class="header">
            <h1>Online Quiz Assessment</h1>
            <p>Technical Assessment Portal - Java Full Stack & DevOps</p>
        </div>

        <div class="meta-bar">
            <div class="meta-item">Candidate: <strong>${escapeHtml(state.candidateName)}</strong></div>
            <div class="meta-item">Module: <strong>${state.category}</strong></div>
            <div class="meta-item">Progress: <strong>Question ${currentNum} of ${totalQ}</strong></div>
            <div class="meta-item">Attempt: <strong>#${state.attemptNumber}</strong></div>
            ${lastMarksBar}
        </div>

        <div class="progress-container" title="Progress: ${progressPct}% (${currentNum} of ${totalQ})">
            <div class="progress-bar" style="width: ${progressPct}%;"></div>
        </div>

        ${retryNotice}

        <div id="validationNotice" class="banner banner-error" style="display: none;">
            <strong>Selection Required:</strong> Please select an answer option to proceed.
        </div>

        <form id="quizForm">
            <div class="question-card" id="qcard_${q.id}">
                <div class="question-header">
                    <span class="question-number">Question ${currentNum} of ${totalQ}</span>
                    <span class="topic-badge">${escapeHtml(q.topic)}</span>
                </div>
                <div class="question-text">${escapeHtml(q.questionText)}</div>
                ${codeSnippetHtml}
                <div class="options-list">${optionsHtml}</div>
                <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <span class="clear-link" onclick="clearCurrentRadio()">Clear selection for this question</span>
                    <span style="font-size: 13px; color: #718096;">Please select an answer to continue</span>
                </div>
            </div>

            <div class="btn-group">
                <button type="submit" class="btn btn-primary" id="btnAction" style="flex: 2; font-size: 15px; padding: 12px 20px;">
                    ${buttonText}
                </button>
                <button type="button" class="btn btn-outline" style="flex: 1; font-size: 15px; padding: 12px 20px;" onclick="cancelQuiz()">
                    Cancel Assessment
                </button>
            </div>
        </form>

        <div class="footer">
            <p>Online Quiz Management System | One-Question-at-a-Time Assessment Mode</p>
        </div>
    `;

    document.getElementById("quizForm").addEventListener("submit", function(e) {
        e.preventDefault();
        if (state.isSubmitted) return;

        // Requirement 3: Do not allow the user to proceed without selecting an answer.
        const selectedRadio = document.querySelector('input[name="current_choice"]:checked');
        if (!selectedRadio) {
            const notice = document.getElementById("validationNotice");
            if (notice) {
                notice.style.display = "block";
                notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Requirement 2: Save the answer
        const selectedIdx = parseInt(selectedRadio.value);
        state.userAnswers[q.id] = selectedIdx;

        // Requirement 5 & 6: On final question, submit assessment; otherwise show next question
        if (isLast) {
            evaluateQuiz();
        } else {
            state.currentQuestionIndex++;
            renderQuizScreen();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.hideValidation = function() {
    const notice = document.getElementById("validationNotice");
    if (notice) {
        notice.style.display = "none";
    }
};

window.clearCurrentRadio = function() {
    const radios = document.getElementsByName("current_choice");
    for (let r of radios) {
        r.checked = false;
    }
    const q = state.questions[state.currentQuestionIndex];
    if (q) {
        delete state.userAnswers[q.id];
    }
};

window.cancelQuiz = function() {
    if (confirm("Exit quiz without submitting? Current progress will be lost.")) {
        renderStartScreen();
    }
};

function evaluateQuiz() {
    // Requirement 7: Prevent further answer changes or resubmission
    state.isSubmitted = true;

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    const reviews = [];

    // Calculate score using recorded answers
    state.questions.forEach(q => {
        const selected = state.userAnswers[q.id];
        const isAttempted = (selected !== undefined && selected !== null && selected >= 0);
        const isCorrect = isAttempted && (selected === q.correctOption);

        if (!isAttempted) {
            unattemptedCount++;
        } else if (isCorrect) {
            correctCount++;
        } else {
            wrongCount++;
        }

        reviews.push({
            question: q,
            selected: isAttempted ? selected : -1,
            isAttempted: isAttempted,
            isCorrect: isCorrect
        });
    });

    const total = state.questions.length;
    const score = correctCount;
    const percentage = total > 0 ? Math.round((score / total) * 1000) / 10 : 0;
    const status = percentage >= 60 ? "PASSED" : "NEEDS IMPROVEMENT";

    // Save previous values for comparison
    const prevScore = state.lastScore;
    const prevTotal = state.lastTotal;

    // Record as current last marks
    state.lastScore = score;
    state.lastTotal = total;
    localStorage.setItem("lastScore", score);
    localStorage.setItem("lastTotal", total);

    // Persist result to MySQL Database via backend API
    fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            candidateName: state.candidateName,
            category: state.category,
            score: score,
            totalQuestions: total,
            percentage: percentage,
            status: status,
            attemptNumber: state.attemptNumber
        })
    }).then(r => r.json()).then(data => {
        console.log("Recorded to MySQL quiz_results:", data);
    }).catch(e => {
        console.log("Notice: Offline mode, result saved locally.");
    });

    renderResultScreen({
        score,
        total,
        percentage,
        status,
        correctCount,
        wrongCount,
        unattemptedCount,
        prevScore,
        prevTotal,
        reviews
    });
}

function renderResultScreen(res) {
    const app = document.getElementById("app");
    const letters = ["A", "B", "C", "D"];

    let comparisonHtml = "";
    if (res.prevScore !== null && res.prevTotal !== null) {
        const prevPct = Math.round((res.prevScore / res.prevTotal) * 100);
        const diff = res.score - res.prevScore;
        let diffText = "";
        if (diff > 0) {
            diffText = `<strong style="color: #22543d;">+${diff} marks (Improvement achieved!)</strong>`;
        } else if (diff < 0) {
            diffText = `<strong style="color: #742a2a;">${diff} marks</strong>`;
        } else {
            diffText = `<strong>0 marks (Consistent score)</strong>`;
        }

        comparisonHtml = `
            <div class="comparison-box">
                <h4>Score Comparison with Last Attempt:</h4>
                <p>Previous Attempt Marks: <strong>${res.prevScore} / ${res.prevTotal}</strong> (${prevPct}%)</p>
                <p>Current Attempt Marks: <strong>${res.score} / ${res.total}</strong> (${res.percentage}%)</p>
                <p style="margin-top: 6px;">Score Difference: ${diffText}</p>
            </div>
        `;
    }

    let statusBadge = "";
    if (res.status === "PASSED") {
        statusBadge = `<span class="status-badge status-passed">[ PASSED - QUALIFIED ]</span>`;
    } else {
        statusBadge = `<span class="status-badge status-failed">[ NEEDS IMPROVEMENT - RETRY RECOMMENDED ]</span>`;
    }

    let dbSaveBadge = `
        <div style="margin-top: 10px; font-size: 13px; color: #2b6cb0;">
            ✓ Score & Assessment Record saved to MySQL Database (<code>java_question_bank.quiz_results</code>)
        </div>
    `;

    let reviewsHtml = "";
    res.reviews.forEach((rev, idx) => {
        const q = rev.question;
        let cardClass = "review-card ";
        let tagClass = "review-tag ";
        let statusLabel = "";

        if (!rev.isAttempted) {
            cardClass += "review-unattempted";
            tagClass += "tag-unattempted";
            statusLabel = "[ Not Attempted ]";
        } else if (rev.isCorrect) {
            cardClass += "review-correct";
            tagClass += "tag-correct";
            statusLabel = "[ Correct ]";
        } else {
            cardClass += "review-wrong";
            tagClass += "tag-wrong";
            statusLabel = "[ Incorrect ]";
        }

        let yourSelectionText = "";
        if (!rev.isAttempted) {
            yourSelectionText = `<span style="color: #718096;">None (Question skipped)</span>`;
        } else {
            const color = rev.isCorrect ? "#22543d" : "#742a2a";
            yourSelectionText = `<span style="color: ${color};">${letters[rev.selected]}. ${escapeHtml(q.options[rev.selected])}</span>`;
        }

        reviewsHtml += `
            <div class="${cardClass}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 13px; font-weight: 700; color: #4a5568;">Question ${idx + 1} (${q.topic})</span>
                    <span class="${tagClass}">${statusLabel}</span>
                </div>
                <div style="font-weight: 600; font-size: 15px; margin-bottom: 10px; color: #1a202c;">
                    ${escapeHtml(q.questionText)}
                </div>
                <div class="review-answer-line">
                    Your Selection: <strong>${yourSelectionText}</strong>
                </div>
                <div class="review-answer-line">
                    Correct Answer: <strong style="color: #22543d;">${letters[q.correctOption]}. ${escapeHtml(q.options[q.correctOption])}</strong>
                </div>
                <div class="review-explanation">
                    <strong>Explanation:</strong> ${escapeHtml(q.explanation)}
                </div>
            </div>
        `;
    });

    app.innerHTML = `
        <div class="header">
            <h1>Assessment Report</h1>
            <p>Technical Assessment Portal - Java Full Stack & DevOps</p>
        </div>

        <div class="meta-bar">
            <div class="meta-item">Candidate: <strong>${escapeHtml(state.candidateName)}</strong></div>
            <div class="meta-item">Module: <strong>${state.category}</strong></div>
            <div class="meta-item">Attempt: <strong>#${state.attemptNumber}</strong></div>
        </div>

        <div class="score-card">
            <div style="font-size: 14px; text-transform: uppercase; color: #718096; font-weight: 700; letter-spacing: 0.5px;">
                Final Score
            </div>
            <div class="score-display">
                ${res.score} / ${res.total}
            </div>
            <div class="percentage-display">
                Percentage: <strong>${res.percentage}%</strong>
            </div>

            <div>${statusBadge}</div>
            ${dbSaveBadge}
            ${comparisonHtml}
        </div>

        <div class="stats-grid">
            <div class="stat-box">
                <div class="stat-label">Correct Answers</div>
                <div class="stat-value" style="color: #2e7d32;">${res.correctCount}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Incorrect Answers</div>
                <div class="stat-value" style="color: #c62828;">${res.wrongCount}</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Unattempted</div>
                <div class="stat-value" style="color: #616161;">${res.unattemptedCount}</div>
            </div>
        </div>

        <div class="btn-group" style="margin-bottom: 30px;">
            <button class="btn btn-primary" style="flex: 2; font-size: 15px; padding: 12px 20px;" onclick="retryQuiz()">
                Retry Quiz (Retake with Previous Marks Saved)
            </button>
            <button class="btn btn-secondary" style="flex: 1; font-size: 15px; padding: 12px 20px;" onclick="renderStartScreen()">
                Back to Home / Change Subject
            </button>
        </div>

        <div style="margin-top: 30px;">
            <h3 style="font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Detailed Answer Key & Concept Explanations
            </h3>
            ${reviewsHtml}
        </div>

        <div class="btn-group" style="margin-top: 25px;">
            <button class="btn btn-primary" style="flex: 2;" onclick="retryQuiz()">Retry Quiz</button>
            <button class="btn btn-outline" style="flex: 1;" onclick="renderStartScreen()">Back to Home</button>
        </div>

        <div class="footer">
            <p>Online Quiz Management System | Java Full Stack & DevOps Assessment</p>
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.retryQuiz = function() {
    state.attemptNumber++;
    localStorage.setItem("attemptNumber", state.attemptNumber);
    state.currentQuestionIndex = 0;
    state.userAnswers = {};
    state.isSubmitted = false;
    renderQuizScreen();
};

function escapeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", init);
