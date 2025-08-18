// src/components/Feedback.jsx
import React, { useState } from "react";
import { Mail, MessageSquare } from "lucide-react";

export default function Feedback() {
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ideally send feedback to your backend here
        setSubmitted(true);
        setEmail("");
        setMessage("");
    };

    return (
        <section className="feedback-section">
            <h2>Say hello and give suggestions!</h2>
            {submitted ? (
                <p>Thank you for your feedback!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        <Mail /> Email
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <MessageSquare /> Message
                        <textarea
                            placeholder="Describe your thoughts"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            )}
            <footer>
                © 2022 Brand, Inc. • Privacy • Terms • Sitemap
            </footer>
        </section>
    );
}
