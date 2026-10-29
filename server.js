const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Load local .env if present
try {
    const fs = require('fs');
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split(/\r?\n/).forEach(line => {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                const key = match[1];
                let value = (match[2] || '').trim();
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                process.env[key] = value;
            }
        });
    }
} catch (e) {}

// MySQL Database Connection Pool
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'java_question_bank',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;
try {
    pool = mysql.createPool(dbConfig);
    console.log('[MySQL] Connection pool initialized for database: java_question_bank');
} catch (err) {
    console.error('[MySQL] Initialization error:', err.message);
}

// Check database status
app.get('/api/status', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) AS count FROM mcq_questions');
        const [resRows] = await pool.query('SELECT COUNT(*) AS count FROM quiz_results');
        res.json({
            status: 'connected',
            database: 'java_question_bank',
            host: 'localhost:3306',
            questionsCount: rows[0].count,
            resultsCount: resRows[0].count
        });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

// Fetch questions from MySQL
app.get('/api/questions', async (req, res) => {
    const category = (req.query.category || 'ALL').toUpperCase();
    try {
        let query = 'SELECT id, question, option_a, option_b, option_c, option_d, correct_answer, topic FROM mcq_questions';
        const params = [];

        if (category === 'PACKAGES') {
            query += ' WHERE topic = ?';
            params.push('Java Packages');
        } else if (category === 'JAVA') {
            query += ' WHERE topic IN (?, ?, ?)';
            params.push('Core Java', 'Spring Boot', 'Java Full Stack');
        } else if (category === 'DEVOPS') {
            query += ' WHERE topic = ?';
            params.push('DevOps');
        }
        query += ' ORDER BY id ASC';

        const [rows] = await pool.query(query, params);

        const letterToIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };

        const questions = rows.map(r => ({
            id: r.id,
            topic: r.topic || 'General Java',
            questionText: r.question,
            options: [r.option_a, r.option_b, r.option_c, r.option_d],
            correctOption: letterToIdx[r.correct_answer ? r.correct_answer.toUpperCase() : 'A'] ?? 0,
            explanation: `Correct option is ${r.correct_answer ? r.correct_answer.toUpperCase() : 'A'}.`
        }));

        res.json({ success: true, count: questions.length, questions });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Submit quiz result to MySQL
app.post('/api/submit', async (req, res) => {
    const { candidateName, category, score, totalQuestions, percentage, status, attemptNumber } = req.body;
    try {
        const query = `
            INSERT INTO quiz_results 
            (candidate_name, category, score, total_questions, percentage, status, attempt_number) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [
            candidateName || 'Student',
            category || 'ALL',
            score || 0,
            totalQuestions || 0,
            percentage || 0,
            status || 'NEEDS IMPROVEMENT',
            attemptNumber || 1
        ]);

        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get previous result for candidate
app.get('/api/last-result', async (req, res) => {
    const candidateName = req.query.candidateName;
    if (!candidateName) {
        return res.json({ success: false, result: null });
    }
    try {
        const [rows] = await pool.query(
            'SELECT * FROM quiz_results WHERE candidate_name = ? ORDER BY id DESC LIMIT 1',
            [candidateName]
        );
        res.json({ success: true, result: rows[0] || null });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get all quiz results history
app.get('/api/results', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM quiz_results ORDER BY id DESC LIMIT 50');
        res.json({ success: true, results: rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` Online Quiz Management System is running!`);
    console.log(` Web Portal:   http://localhost:${PORT}`);
    console.log(` Database:     MySQL 8.0 (localhost:3306/java_question_bank)`);
    console.log(` API Endpoints: http://localhost:${PORT}/api/status`);
    console.log(`=======================================================`);
});
