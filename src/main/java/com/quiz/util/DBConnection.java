package com.quiz.util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBConnection {
    private static String url = "jdbc:mysql://localhost:3306/java_question_bank?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
    private static String user = "root";
    private static String password = "";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL JDBC Driver not found: " + e.getMessage());
        }

        String envUrl = System.getenv("DB_URL");
        if (envUrl != null && !envUrl.trim().isEmpty()) url = envUrl;
        String envUser = System.getenv("DB_USER");
        if (envUser != null && !envUser.trim().isEmpty()) user = envUser;
        String envPass = System.getenv("DB_PASSWORD");
        if (envPass != null) password = envPass;

        try (InputStream in = DBConnection.class.getClassLoader().getResourceAsStream("local.properties")) {
            if (in != null) {
                Properties props = new Properties();
                props.load(in);
                if (props.getProperty("DB_URL") != null) url = props.getProperty("DB_URL");
                if (props.getProperty("DB_USER") != null) user = props.getProperty("DB_USER");
                if (props.getProperty("DB_PASSWORD") != null) password = props.getProperty("DB_PASSWORD");
            }
        } catch (Exception ignored) {}
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }
}
