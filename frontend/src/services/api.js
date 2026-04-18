const API_BASE = "http://127.0.0.1:8000";

export const detectSMS = async (message) => {
  const response = await fetch(`${API_BASE}/detect-sms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return response.json();
};

export const detectURL = async (url) => {
  const response = await fetch(`${API_BASE}/detect-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  return response.json();
};

export const detectImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${API_BASE}/detect-image`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const checkLoan = async (data) => {
  const response = await fetch(`${API_BASE}/loan-eligibility`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getQuiz = async () => {
  const response = await fetch(`${API_BASE}/quiz`);
  return response.json();
};

export const chatbot = async (message) => {
  const response = await fetch(`${API_BASE}/chatbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return response.json();
};

export const addReminder = async (data) => {
  const response = await fetch(`${API_BASE}/add-reminder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getReminders = async () => {
  const response = await fetch(`${API_BASE}/reminders`);
  return response.json();
};