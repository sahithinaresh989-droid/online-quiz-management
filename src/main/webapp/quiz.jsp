<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="com.quiz.model.Question" %>
<%@ page import="com.quiz.model.QuizResult" %>
<%@ page import="com.quiz.service.QuizRepository" %>
<%
    List<Question> questions = (List<Question>) session.getAttribute("quizQuestions");
    String candidateName = (String) session.getAttribute("candidateName");
    String category = (String) session.getAttribute("quizCategory");
    Integer attemptNumber = (Integer) session.getAttribute("attemptNumber");
    Integer lastScore = (Integer) session.getAttribute("lastScore");
    Integer lastTotal = (Integer) session.getAttribute("lastTotal");

    if (questions == null || questions.isEmpty()) {
        // Fallback: If session expired or accessed directly, initialize defaults
        questions = QuizRepository.getAllQuestions();
        session.setAttribute("quizQuestions", questions);
        if (candidateName == null) candidateName = "Student";
        if (category == null) category = "ALL";
        if (attemptNumber == null) attemptNumber = 1;
        session.setAttribute("candidateName", candidateName);
        session.setAttribute("quizCategory", category);
        session.setAttribute("attemptNumber", attemptNumber);
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assessment in Progress - Online Quiz Management</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script type="text/javascript">
        var currentIndex = 0;
        var totalQuestions = <%= questions.size() %>;

        function clearRadio(groupName) {
            var radios = document.getElementsByName(groupName);
            for (var i = 0; i < radios.length; i++) {
                radios[i].checked = false;
            }
        }

        function hideValidation() {
            var notice = document.getElementById("validationNotice");
            if (notice) notice.style.display = "none";
        }

        function handleNextClick() {
            var currentCard = document.getElementById("qcard_idx_" + currentIndex);
            if (!currentCard) return;

            var checkedRadio = currentCard.querySelector('input[type="radio"]:checked');
            if (!checkedRadio) {
                var notice = document.getElementById("validationNotice");
                if (notice) {
                    notice.style.display = "block";
                    notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            hideValidation();

            if (currentIndex === totalQuestions - 1) {
                document.getElementById("quizForm").submit();
            } else {
                currentCard.style.display = "none";
                currentIndex++;
                var nextCard = document.getElementById("qcard_idx_" + currentIndex);
                if (nextCard) {
                    nextCard.style.display = "block";
                }

                var currentNum = currentIndex + 1;
                var pct = Math.round((currentNum / totalQuestions) * 100);
                var bar = document.getElementById("progressBar");
                if (bar) bar.style.width = pct + "%";
                var metaProg = document.getElementById("metaProgress");
                if (metaProg) metaProg.innerText = "Question " + currentNum + " of " + totalQuestions;

                if (currentIndex === totalQuestions - 1) {
                    document.getElementById("btnNext").innerText = "Submit Assessment";
                }

                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    </script>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Online Quiz Assessment</h1>
        <p>Technical Assessment Portal - Java Full Stack & DevOps</p>
    </div>

    <div class="meta-bar">
        <div class="meta-item">Candidate: <strong><%= candidateName %></strong></div>
        <div class="meta-item">Module: <strong><%= category %></strong></div>
        <div class="meta-item">Progress: <strong id="metaProgress">Question 1 of <%= questions.size() %></strong></div>
        <div class="meta-item">Attempt: <strong>#<%= attemptNumber %></strong></div>
        <% if (lastScore != null && lastTotal != null) { %>
            <div class="meta-item" style="color: #744210;">Last Marks: <strong><%= lastScore %> / <%= lastTotal %></strong></div>
        <% } %>
    </div>

    <div class="progress-container" title="Progress: <%= Math.round(100.0 / questions.size()) %>%">
        <div id="progressBar" class="progress-bar" style="width: <%= Math.round(100.0 / questions.size()) %>%;"></div>
    </div>

    <% if (lastScore != null && lastTotal != null) { %>
        <div class="banner banner-previous">
            <strong>Retry Mode Active:</strong> You scored <strong><%= lastScore %> out of <%= lastTotal %></strong> on your previous attempt. Re-answer the questions to improve your score!
        </div>
    <% } %>

    <div id="validationNotice" class="banner banner-error" style="display: none;">
        <strong>Selection Required:</strong> Please select an answer option to proceed.
    </div>

    <form id="quizForm" action="submitQuiz.jsp" method="post">
        <%
            int qNum = 1;
            for (int qIdx = 0; qIdx < questions.size(); qIdx++) {
                Question q = questions.get(qIdx);
                String inputName = "q_" + q.getId();
                String displayStyle = (qIdx == 0) ? "display: block;" : "display: none;";
        %>
            <div class="question-card" id="qcard_idx_<%= qIdx %>" style="<%= displayStyle %>">
                <div class="question-header">
                    <span class="question-number">Question <%= qNum %> of <%= questions.size() %></span>
                    <span class="topic-badge"><%= q.getTopic() %></span>
                </div>

                <div class="question-text">
                    <%= q.getQuestionText() %>
                </div>

                <% if (q.getCodeSnippet() != null && !q.getCodeSnippet().trim().isEmpty()) { %>
                    <pre class="code-snippet"><%= q.getCodeSnippet() %></pre>
                <% } %>

                <div class="options-list">
                    <%
                        String[] opts = q.getOptions();
                        String[] letters = {"A", "B", "C", "D"};
                        for (int i = 0; i < opts.length; i++) {
                            String radioId = "q_" + q.getId() + "_opt_" + i;
                    %>
                        <label class="option-item" for="<%= radioId %>">
                            <input type="radio" id="<%= radioId %>" name="<%= inputName %>" value="<%= i %>" onchange="hideValidation()">
                            <span class="option-text">
                                <span class="option-letter"><%= letters[i] %>.</span>
                                <%= opts[i] %>
                            </span>
                        </label>
                    <% } %>
                </div>

                <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <span class="clear-link" onclick="clearRadio('<%= inputName %>')">Clear selection for this question</span>
                    <span style="font-size: 13px; color: #718096;">Please select an answer to continue</span>
                </div>
            </div>
        <%
                qNum++;
            }
        %>

        <div class="btn-group">
            <button type="button" id="btnNext" class="btn btn-primary" style="flex: 2; font-size: 15px; padding: 12px 20px;" onclick="handleNextClick()">
                <%= (questions.size() <= 1) ? "Submit Assessment" : "Submit Answer" %>
            </button>
            <a href="index.jsp" class="btn btn-outline" style="flex: 1; font-size: 15px; padding: 12px 20px;" onclick="return confirm('Exit quiz without submitting? Current progress will be lost.');">
                Cancel Assessment
            </a>
        </div>
    </form>

    <div class="footer">
        <p>Online Quiz Management System | One-Question-at-a-Time Assessment Mode</p>
    </div>
</div>

</body>
</html>
