"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const dataSets = [
  {
    title: "User Demographics",
    data: [
      { name: "Adult Female (40%)", value: 40 },
      { name: "Adult Male (35%)", value: 35 },
      { name: "Children (<18) (15%)", value: 15 },
      { name: "Elderly (60+) (10%)", value: 10 },
    ],
    colors: ["#E91E63", "#4A90E2", "#FFA726", "#757575"],
  },
  {
    title: "Language Distribution",
    data: [
      { name: "Odia (71%)", value: 71 },
      { name: "English (15%)", value: 15 },
      { name: "Hindi (9%)", value: 9 },
      { name: "Other (5%)", value: 5 },
    ],
    colors: ["#26A69A", "#42A5F5", "#FFCA28", "#B0BEC5"],
  },
  {
    title: "Platform Usage",
    data: [
      { name: "WhatsApp (85%)", value: 85 },
      { name: "SMS (15%)", value: 15 },
    ],
    colors: ["#AB47BC", "#455A64"],
  },
  {
    title: "Feedback Sentiment",
    data: [
      { name: "Positive (75%)", value: 75 },
      { name: "Neutral (15%)", value: 15 },
      { name: "Negative (10%)", value: 10 },
    ],
    colors: ["#66BB6A", "#FFCA28", "#EF5350"],
  },
];

const newGrowthData = [
  { month: "Apr", users: 4.5, color: "#AB47BC" },
  { month: "May", users: 6.2, color: "#4A5568" },
  { month: "Jun", users: 7.8, color: "#22C55E" },
  { month: "Jul", users: 9.1, color: "#3B82F6" },
  { month: "Aug", users: 11.5, color: "#14B8A6" },
  { month: "Sep", users: 13.7, color: "#F59E0B" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="container mx-auto p-6">
        <section className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl p-10 shadow-md text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">ArogyaConnect - Live Impact Dashboard</h1>
          <p className="text-lg">Real-time performance, reach, and citizen engagement of the AI Public Health Chatbot.</p>
          <p className="mt-2">Last Updated: 13 September 2025, 01:27 PM IST</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Citizens Reached", value: "52,830", icon: "👥", color: "bg-blue-500" },
            { label: "Health Queries Answered", value: "211,320", icon: "💬", color: "bg-green-500" },
            { label: "Query Accuracy Rate", value: "84.7%", icon: "✔️", color: "bg-yellow-500" },
            { label: "Active Outbreak Alerts", value: "3", icon: "⚠️", color: "bg-red-500" },
          ].map((kpi, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-xl ${kpi.color} mb-4`}>
                {kpi.icon}
              </div>
              <div className="text-gray-500">{kpi.label}</div>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </div>
          ))}
        </section>

        <div className="bg-gray-50 min-h-screen p-8">
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">Data Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dataSets.map((set, index) => (
                <div key={index} className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition">
                  <h3 className="text-lg font-medium text-gray-800 text-center mb-4">{set.title}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={set.data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {set.data.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={set.colors[idx % set.colors.length]} />
                        ))}
                      </Pie>
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        wrapperStyle={{ fontSize: "0.85rem", color: "#333" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Most Frequent Health Topics</h3>
            {[
              { topic: "Vaccination Schedules", count: "45.2k", percent: "100%" },
              { topic: "Fever & Cold Symptoms", count: "31.5k", percent: "70%" },
              { topic: "Maternal & Prenatal Care", count: "28.1k", percent: "62%" },
              { topic: "Diarrhea & Dehydration", count: "22k", percent: "48%" },
            ].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-gray-700 mb-1">
                  <span>{item.topic}</span>
                  <span>{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-green-500 h-2 rounded" style={{ width: item.percent }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">New User Growth (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={256}>
              <BarChart data={newGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Users (in thousands)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}k Users`} />
                <Bar dataKey="users" fill="#8884d8">
                  {newGrowthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Geographical Reach & Impact</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">District</th>
                <th className="p-3 text-left">Active Users</th>
                <th className="p-3 text-left">Queries Answered</th>
                <th className="p-3 text-left">Last Outbreak Alert</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Khordha", "12,500", "51,000", "Dengue (Aug 2025)"],
                ["Cuttack", "8,900", "38,200", "None"],
                ["Ganjam", "7,100", "31,500", "Cholera (Sep 2025)"],
                ["Sundargarh", "5,500", "24,000", "None"],
                ["Mayurbhaj", "4,200", "19,800", "Malaria (Jul 2025)"],
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="p-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-semibold text-center mb-6">Citizen Reviews & Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { rating: "★★★★★", quote: "My child's vaccination schedule was so confusing. This chatbot gave me clear reminders in Odia. ArogyaConnect is a blessing for mothers like me!", author: "Sunita M., Angul" },
              { rating: "★★★★★", quote: "I received an alert about a Dengue outbreak in my area. I was able to take precautions for my family immediately. Thank you ArogyaConnect for this timely information.", author: "Ramesh P., Bhubaneswar" },
              { rating: "★★★★☆", quote: "Very easy to use, even for old people. I asked about my blood pressure symptoms and got a clear, simple answer on SMS. The information is very accurate. Great work.", author: "Gopal C., Puri" },
            ].map((feedback, index) => (
              <div key={index} className="border-l-4 border-green-500 p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-yellow-400 text-xl mb-2">{feedback.rating}</div>
                <blockquote className="italic text-gray-700 mb-4">"{feedback.quote}"</blockquote>
                <div className="font-semibold text-gray-800">{feedback.author}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center p-6 bg-gray-800 text-white mt-10">
        &copy; 2025 Developed by <a href="#" className="text-emerald-400" target="_blank">ArogyaCoders</a> for Electronics & IT Department, Government of Odisha. All Rights Reserved.
      </footer>
    </div>
  );
}
