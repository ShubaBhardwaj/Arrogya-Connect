"use client";
import { useState } from "react";
import axios from "axios";
export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! I am Arogya, your AI health assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState("");

    const API_URL = "https://your-fastapi-app.huggingface.app/predict"; // Replace with your actual API endpoint
    const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === "") return;

        const userMessage = { sender: "user", text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput("");

        try {
            const response = await axios.post(
                API_URL,
                { query: input },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`,
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error("Network response was not ok");
            }

            const botMessage = { sender: "bot", text: response.data.response }; 
            setMessages(prevMessages => [...prevMessages, botMessage]);

        } catch (error) {
            console.error("Failed to fetch from API:", error);
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: "bot", text: "Sorry, I am unable to connect to the assistant at the moment. Please try again later." }
            ]);
        }
    };

    return (
        <div className="bg-gray-50 text-gray-800 font-inter">
            <main>
                {/* Hero Section */}
                <div className="hero-section py-20 md:py-32 bg-[#f0fdf4]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2 text-center md:text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                                Chat with a Health Assistant,<br />No Login Required.
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                                Get instant, anonymous health advice and answers to your queries. Connect with us via SMS, WhatsApp, or right here on our website.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                            >
                                Chat Now
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <img src="https://placehold.co/600x400/10b981/ffffff?text=Connect+with+Chatbot" alt="Illustration of connecting with the chatbot" className="rounded-3xl shadow-2xl w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
                {/* Features Section */}
                <div id="features" className="features-section py-20 md:py-32 bg-[#f0f9ff]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2">
                            <img src="https://placehold.co/600x400/22c55e/ffffff?text=Personalized+Health" alt="Illustration of personalized health features" className="rounded-3xl shadow-2xl w-full h-auto object-cover" />
                        </div>
                        <div className="md:w-1/2 text-center md:text-left">
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                                Unlock Your Personalized Health Journey.
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                                Create an account to receive personalized health recommendations and never miss a dose with timely medicine reminders and notifications.
                            </p>
                            <a href="/register" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50">
                                Sign Up Now
                            </a>
                        </div>
                    </div>
                </div>
                {/* How it Works Section */}
                <section className="bg-white py-20 md:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-16">
                            How Personalized Health Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
                            {[
                                { icon: "⌚️", title: "Connect Your Data", description: "Securely link your health apps and fitness wearables to sync your data in real-time." },
                                { icon: "🧠", title: "AI-Powered Insights", description: "Our intelligent engine analyzes your data to identify patterns and generate personalized health recommendations." },
                                { icon: "🔔", title: "Actionable Guidance", description: "Receive timely notifications and manage your medications with a simple 'Taken,' 'Skipped,' or 'Delayed' status." },
                            ].map((step, index) => (
                                <div key={index} className="flex flex-col items-center feature-card transition-all duration-300">
                                    <div className="flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 text-4xl mb-6">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Impact Section */}
                <section id="impact" className="bg-gray-100 py-20 md:py-32 text-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
                      Making an Impact, One Conversation at a Time
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                      Our AI Health Assistant is already making a difference in thousands of lives across the state. Discover the real-time impact, user growth, and citizen engagement on our public dashboard.
                    </p>
                    <a
                      href="/publicdashboard"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                    >
                      View Live Dashboard
                    </a>
                  </div>
                </section>

                {/* Key Features Section */}
                <section className="features-section py-20 md:py-32 bg-[#f0f9ff]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-16">
                            Key Features of Arogya Connect
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Unified Health Profile", description: "Merge all your health information into one comprehensive, easy-to-understand profile." },
                                { title: "Predictive Wellness", description: "Our AI identifies potential health risks early, providing insights to guide preventative actions." },
                                { title: "Proactive Alerts", description: "Receive smart notifications for crucial health trends, helping you make informed decisions." },
                            ].map((feature, index) => (
                                <div key={index} className="bg-white p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* FAQ Section */}
                <section className="bg-gray-100 py-20 md:py-32">
                  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-12">
                      Frequently Asked Questions
                    </h2>
                  <div className="space-y-6">
                    {[
                        { question: "What data can I connect to Arogya Connect?", answer: "You can connect data from popular fitness trackers and smartwatches (e.g., Apple Watch, Fitbit, etc.) and upload your existing health records and documents, such as lab reports and prescriptions." },
                        { question: "How is my data kept secure?", answer: "We use industry-standard encryption and security protocols to protect your personal health information. Your data is anonymized and never shared with third parties without your explicit consent." },
                        { question: "How does the AI provide insights?", answer: "Our AI engine analyzes the trends and patterns across your diverse health data, such as heart rate variability, sleep quality, and blood pressure readings from your documents, to provide a holistic view and identify potential health risks or areas for improvement." },
                        { question: "Is this a replacement for a doctor?", answer: "No, Arogya Connect is a wellness and health management tool, not a medical device. The insights provided are for informational purposes and should not be considered a substitute for professional medical advice. Always consult with a qualified healthcare provider for any health concerns." },
                        { question: "What kind of insights will I get?", answer: "You will receive personalized insights such as trends in your heart rate and sleep patterns, alerts for potential health issues based on your data, and reminders to take medication or perform health-related tasks. Our goal is to give you a clearer picture of your overall wellness." },
                        { question: "Can I share my data with my healthcare provider?", answer: "Yes, our platform allows you to securely export and share your unified health profile with your doctor or healthcare provider. This can help them make more informed decisions about your care during appointments." },
                        { question: "Is Arogya Connect free to use?", answer: "We offer a free version with core features to get you started. For more advanced insights, predictive alerts, and personalized wellness plans, we have a premium subscription available. You can find more details on our pricing page." },
                    ].map((faq, index) => (
                        <details key={index} className="group border rounded-xl bg-white p-6 shadow hover:shadow-lg transition-shadow duration-300">
                            <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800 list-none">
                                {faq.question}
                              <span className="transition-transform duration-300 group-open:rotate-45 text-2xl text-gray-500">+</span>
                            </summary>
                            <div className="mt-4 text-gray-600 leading-relaxed">
                                {faq.answer}
                            </div>
                        </details>
                              ))}
                    </div>
                  </div>
                </section>
            </main>
            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-6 text-center">
                <p className="text-sm">&copy; 2025 Arogya. All rights reserved.</p>
            </footer>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden">
                        {/* Chat Header */}
                        <div className="flex justify-between items-center p-4 bg-emerald-500 text-white rounded-t-xl">
                            <h3 className="text-xl font-bold">Arogya Bot</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`rounded-xl p-3 max-w-xs ${
                                            msg.sender === 'user'
                                                ? 'bg-emerald-500 text-white rounded-br-none'
                                                : 'bg-gray-300 text-gray-800 rounded-bl-none'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your health query..."
                                    className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
