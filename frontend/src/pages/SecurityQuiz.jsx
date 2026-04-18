import { useState, useEffect } from "react";
import { PageHeader } from "../components/UI";

// ─────────────────────────────────────────────────────────────
// 150 QUESTIONS — 6 categories, 25 each
// ─────────────────────────────────────────────────────────────
const ALL_QUESTIONS = [

  // ── OTP & PASSWORD SAFETY (25) ──────────────────────────
  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "What should you do if someone calls claiming to be a bank officer and asks for your OTP?",
    options: ["Share it immediately", "Ignore and report to bank", "Send it via SMS", "Post it online"],
    answer: "Ignore and report to bank" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "OTP stands for?",
    options: ["One Time Password", "Online Transfer Protocol", "Official Transfer Pin", "One Time Payment"],
    answer: "One Time Password" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "How long is a typical OTP valid?",
    options: ["24 hours", "1 week", "A few minutes", "1 month"],
    answer: "A few minutes" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "Which of these is the strongest password?",
    options: ["password123", "John1990", "P@ssw0rd!#92xZ", "12345678"],
    answer: "P@ssw0rd!#92xZ" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "How often should you change your banking password?",
    options: ["Never", "Every 3-6 months", "Only when hacked", "Every 5 years"],
    answer: "Every 3-6 months" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "Is it safe to use the same password for your bank and social media?",
    options: ["Yes, easier to remember", "No, always use unique passwords", "Only if it is strong", "Yes if you change it yearly"],
    answer: "No, always use unique passwords" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "Your bank will NEVER ask for your OTP via?",
    options: ["ATM machine", "Phone call or SMS", "Bank branch visit", "Official app"],
    answer: "Phone call or SMS" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "What is Two-Factor Authentication (2FA)?",
    options: ["Two passwords for one account", "Password + OTP for login", "Two bank accounts", "Two ATM cards"],
    answer: "Password + OTP for login" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "If you accidentally shared your OTP, what should you do first?",
    options: ["Wait and see", "Contact your bank immediately", "Change your email", "Delete your account"],
    answer: "Contact your bank immediately" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "Which is the safest way to store your banking password?",
    options: ["Write it on paper near your desk", "Save in phone notes", "Use a trusted password manager", "Share with a trusted friend"],
    answer: "Use a trusted password manager" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "A screen sharing app is asking permission while you are doing net banking. What do you do?",
    options: ["Allow it for help", "Deny and close immediately", "Allow only for 5 minutes", "It is always safe"],
    answer: "Deny and close immediately" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "What should you do after using net banking on a shared computer?",
    options: ["Leave it open", "Log out and clear browser history", "Just close the tab", "Nothing needed"],
    answer: "Log out and clear browser history" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "Which detail should NEVER be shared with anyone including bank employees?",
    options: ["Account number", "Bank branch name", "CVV and OTP", "Account holder name"],
    answer: "CVV and OTP" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "What is CVV on a debit card?",
    options: ["Card Verification Value", "Card Virtual Value", "Customer Verification Value", "Card Validity Version"],
    answer: "Card Verification Value" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "Is it safe to enable auto-fill passwords in your browser for banking sites?",
    options: ["Yes always", "Only on personal devices", "No, avoid for banking", "Only on Chrome"],
    answer: "No, avoid for banking" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "What does a bank do if it suspects unauthorized access?",
    options: ["Asks for your OTP via call", "Temporarily blocks the account", "Emails you to reset password immediately", "Nothing"],
    answer: "Temporarily blocks the account" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "You receive an OTP you did not request. What does this likely mean?",
    options: ["Bank sent it automatically", "Someone tried to access your account", "It is a test message", "System error only"],
    answer: "Someone tried to access your account" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "Which of these is safe to share with a payment app customer support?",
    options: ["OTP", "Your registered mobile number only", "Full card number", "Net banking password"],
    answer: "Your registered mobile number only" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "What is a passphrase?",
    options: ["A short PIN", "A long phrase used as a password", "Your mother's maiden name", "A security question answer"],
    answer: "A long phrase used as a password" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "A friend asks for your UPI PIN to transfer money to you. Should you share it?",
    options: ["Yes with close friends", "No, UPI PIN is never needed to receive money", "Only if they are trusted", "Yes via WhatsApp"],
    answer: "No, UPI PIN is never needed to receive money" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "What should you do if your mobile number linked to bank is lost or stolen?",
    options: ["Wait for it to be found", "Visit bank immediately to update number", "Use another number for OTP", "Nothing until you get it back"],
    answer: "Visit bank immediately to update number" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "Is it safe to use public WiFi for banking transactions?",
    options: ["Yes if the site starts with HTTPS", "No, always use mobile data or trusted network", "Yes if you are careful", "Only for checking balance"],
    answer: "No, always use mobile data or trusted network" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "What is credential stuffing?",
    options: ["Adding extra text to passwords", "Using leaked usernames and passwords to break into accounts", "Storing passwords in a file", "Hacking using brute force only"],
    answer: "Using leaked usernames and passwords to break into accounts" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "Which app feature helps protect your banking app even if your phone is stolen?",
    options: ["Themes", "App lock with biometric or PIN", "Auto brightness", "Battery saver"],
    answer: "App lock with biometric or PIN" },

  { category: "OTP & Password Safety", categoryColor: "#6366f1",
    question: "How should you react to an SMS saying your account is locked and asking you to call a number?",
    options: ["Call the number immediately", "Ignore and verify by calling official bank helpline", "Reply to the SMS", "Share OTP if asked"],
    answer: "Ignore and verify by calling official bank helpline" },

  // ── PHISHING & FAKE LINKS (25) ──────────────────────────
  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "What is phishing?",
    options: ["Fishing in a river", "Fraudulent attempt to steal sensitive information online", "A banking service", "An app feature"],
    answer: "Fraudulent attempt to steal sensitive information online" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "Which URL is most likely a phishing site?",
    options: ["https://www.sbi.co.in", "http://sbi-kyc-update.net/login", "https://onlinesbi.sbi", "https://sbi.co.in/login"],
    answer: "http://sbi-kyc-update.net/login" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "What does HTTPS mean in a website URL?",
    options: ["The site is government owned", "The site has a secure encrypted connection", "The site is 100% safe from fraud", "The site is fast"],
    answer: "The site has a secure encrypted connection" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "You get an email saying you won a lottery. What should you do?",
    options: ["Claim the prize immediately", "Ignore, it is almost certainly a scam", "Share your bank details", "Forward to friends"],
    answer: "Ignore, it is almost certainly a scam" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "What is smishing?",
    options: ["Phishing via SMS messages", "Phishing via email", "Phishing via voice calls", "A type of malware"],
    answer: "Phishing via SMS messages" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "What is vishing?",
    options: ["Phishing via video call", "Phishing via voice or phone calls", "Phishing via SMS", "Phishing via WhatsApp"],
    answer: "Phishing via voice or phone calls" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "A link in an email looks like www.hdfc-bank-india.com. Is this the real HDFC site?",
    options: ["Yes, HDFC is in the name", "No, the real domain is hdfcbank.com", "Only if it has HTTPS", "Yes if sent from a bank email"],
    answer: "No, the real domain is hdfcbank.com" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "What is typosquatting?",
    options: ["Typing fast", "Registering misspelled versions of popular websites to trick users", "Squatting on social media handles", "A type of spyware"],
    answer: "Registering misspelled versions of popular websites to trick users" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "You receive an email with urgent language saying your account will be closed. What is this a sign of?",
    options: ["Legitimate bank alert", "Phishing attempt using urgency as a tactic", "System maintenance notice", "Routine bank communication"],
    answer: "Phishing attempt using urgency as a tactic" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "Before clicking a link in a message, you should?",
    options: ["Click quickly before it expires", "Hover over it to check the real URL or verify with the official site", "Always trust links from contacts", "Check if it has HTTPS only"],
    answer: "Hover over it to check the real URL or verify with the official site" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "A website asks for your Aadhaar number and bank account to verify identity. You should?",
    options: ["Provide it, verification is important", "Refuse and report the site", "Provide only Aadhaar", "Provide only bank account"],
    answer: "Refuse and report the site" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "Which of the following is a red flag in an email?",
    options: ["Personalized greeting with your name", "Generic greeting like Dear Customer plus urgent language", "Official bank logo", "Bank branch address mentioned"],
    answer: "Generic greeting like Dear Customer plus urgent language" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "You get a WhatsApp message with a link to claim a cashback reward. The safest action is?",
    options: ["Click and claim immediately", "Forward to family first", "Ignore or verify from the official app", "Share your UPI ID to receive cashback"],
    answer: "Ignore or verify from the official app" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "What is clone phishing?",
    options: ["Making a copy of your phone", "Creating a fake duplicate of a legitimate email previously received", "Hacking by guessing passwords", "Cloning ATM cards"],
    answer: "Creating a fake duplicate of a legitimate email previously received" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "A shortened URL like bit.ly/xQ3k2 in a bank message is?",
    options: ["Always safe as banks use shorteners", "Suspicious as you cannot see the real destination", "Safe if the message looks official", "Standard practice"],
    answer: "Suspicious as you cannot see the real destination" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "What should you check before entering card details on a website?",
    options: ["The website color scheme", "Padlock icon and HTTPS in the URL", "Number of products available", "Page loading speed"],
    answer: "Padlock icon and HTTPS in the URL" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "Which of these email senders is most suspicious for a bank email?",
    options: ["alerts@hdfcbank.com", "support@hdfc-bank-helpdesk.xyz", "noreply@icicibank.com", "service@sbi.co.in"],
    answer: "support@hdfc-bank-helpdesk.xyz" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "If you think you clicked a phishing link, what should you do?",
    options: ["Continue using the site", "Close the page, run antivirus, change passwords, alert bank", "Wait to see if money is lost", "Only change your email password"],
    answer: "Close the page, run antivirus, change passwords, alert bank" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "A fake website that looks identical to your bank is called?",
    options: ["Mirror site", "Spoofed site", "Backup site", "Redirect site"],
    answer: "Spoofed site" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "What does a padlock icon in the browser address bar indicate?",
    options: ["The site is government verified", "The connection is encrypted using SSL/TLS", "The site has no ads", "The site is mobile friendly"],
    answer: "The connection is encrypted using SSL/TLS" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "You get a call saying you have been selected for a bank reward and need to verify your card number. This is?",
    options: ["A genuine bank offer", "A vishing scam", "An RBI promotion", "A cashback offer"],
    answer: "A vishing scam" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "Phishing emails often try to create a sense of?",
    options: ["Calm and patience", "Urgency and fear to make you act without thinking", "Happiness and rewards", "Curiosity about bank products"],
    answer: "Urgency and fear to make you act without thinking" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "Which government website can you report phishing and cyber fraud in India?",
    options: ["cybercrime.gov.in", "rbi.org.in", "india.gov.in", "niti.gov.in"],
    answer: "cybercrime.gov.in" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "A QR code received from an unknown source can be used to?",
    options: ["Only make payments safely", "Redirect you to a phishing site or initiate a payment", "Only share contact info", "Check your bank balance"],
    answer: "Redirect you to a phishing site or initiate a payment" },

  { category: "Phishing & Fake Links", categoryColor: "#ef4444",
    question: "What is pharming?",
    options: ["Farming-related banking scheme", "Redirecting users to a fake website even when they type the correct URL", "Sending fake SMS messages", "Calling pretending to be bank staff"],
    answer: "Redirecting users to a fake website even when they type the correct URL" },

  // ── UPI & DIGITAL PAYMENTS (25) ─────────────────────────
  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "UPI stands for?",
    options: ["Universal Payment Interface", "Unified Payments Interface", "United Payment Integration", "Unified PIN Interface"],
    answer: "Unified Payments Interface" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Which detail do you need to RECEIVE money via UPI?",
    options: ["UPI PIN", "Your UPI ID or mobile number", "Your bank account password", "CVV number"],
    answer: "Your UPI ID or mobile number" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "A stranger sends you Re.1 via UPI and then asks you to approve a collect request. You should?",
    options: ["Approve it to be polite", "Decline immediately, this is a common scam", "Accept only if amount is small", "Check your balance first"],
    answer: "Decline immediately, this is a common scam" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Your UPI PIN is entered when you want to?",
    options: ["Receive money", "Check your balance only", "Send money or make a payment", "Register on UPI app"],
    answer: "Send money or make a payment" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "What is a collect request in UPI?",
    options: ["A request to collect your bank statement", "A request where someone asks you to approve sending them money", "A request to collect cashback", "A bank notification"],
    answer: "A request where someone asks you to approve sending them money" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Is it safe to scan a QR code to receive money?",
    options: ["Yes always", "No, you only need to scan QR codes to pay, not to receive", "Only from known shops", "Yes if the QR looks official"],
    answer: "No, you only need to scan QR codes to pay, not to receive" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Which of the following is a legitimate UPI ID format?",
    options: ["john@upi", "john@okaxis", "john.upi.india", "john#bank"],
    answer: "john@okaxis" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Someone offers to buy your item online and sends a payment link via WhatsApp. This could be?",
    options: ["A genuine payment", "A phishing link designed to steal your money", "A Google Pay feature", "A normal bank transfer"],
    answer: "A phishing link designed to steal your money" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "What is the daily UPI transaction limit set by NPCI?",
    options: ["Rs. 50,000", "Rs. 1,00,000", "Rs. 10,00,000", "No limit"],
    answer: "Rs. 1,00,000" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "NPCI stands for?",
    options: ["National Payments Corporation of India", "National Private Credit Institute", "New Payment Card Infrastructure", "National Public Currency Institute"],
    answer: "National Payments Corporation of India" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "If you receive a message saying your UPI is blocked and to call a number, you should?",
    options: ["Call immediately", "Verify only through your bank's official app or number", "Share your UPI PIN to unblock", "Forward to friends for advice"],
    answer: "Verify only through your bank's official app or number" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "What is the safest way to pay a new contact via UPI?",
    options: ["Send full amount immediately", "Send Re.1 first to verify the receiver name before full payment", "Ask them for their PIN", "Use cash instead"],
    answer: "Send Re.1 first to verify the receiver name before full payment" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "A person pretending to be from Google Pay support asks for your UPI PIN to fix an issue. You should?",
    options: ["Share it for support", "Refuse as no legitimate support asks for UPI PIN", "Share only last 2 digits", "Reset your PIN and then share"],
    answer: "Refuse as no legitimate support asks for UPI PIN" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Which payment method gives you buyer protection in India?",
    options: ["UPI", "Credit card with chargeback facility", "Cash", "Cryptocurrency"],
    answer: "Credit card with chargeback facility" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "What should you do if an unknown UPI collect request arrives?",
    options: ["Approve if amount is small", "Decline immediately without approving", "Ask the sender who they are and then approve", "Contact your bank first"],
    answer: "Decline immediately without approving" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Screen sharing apps like AnyDesk used during a fake support call can?",
    options: ["Only help you chat with support", "Allow fraudsters to see your screen and steal your OTP or PIN", "Speed up your transactions", "Improve internet security"],
    answer: "Allow fraudsters to see your screen and steal your OTP or PIN" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "A fraudster sends Rs. 5000 to your account by mistake and asks you to return it. You should?",
    options: ["Return it via UPI immediately", "Contact your bank before transferring back anything", "Transfer back through same UPI app", "Ignore the request"],
    answer: "Contact your bank before transferring back anything" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "What is IMPS used for in banking?",
    options: ["Instant Mobile Payment Service for real-time fund transfer", "Internet Mobile Protection System", "Integrated Monthly Payment Schedule", "Internal Money Processing System"],
    answer: "Instant Mobile Payment Service for real-time fund transfer" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Is RTGS available 24x7 in India?",
    options: ["No, only on working days", "Yes, 24x7 since December 2020", "Only on weekdays 9am-5pm", "Only through mobile banking"],
    answer: "Yes, 24x7 since December 2020" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "What happens if you enter wrong UPI PIN 3 times?",
    options: ["Account is permanently closed", "UPI is temporarily blocked for security", "Money is automatically transferred", "Nothing happens"],
    answer: "UPI is temporarily blocked for security" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Which of these is an official UPI app in India?",
    options: ["PayFake", "BHIM app by NPCI", "MoneyFast", "BankPay Pro"],
    answer: "BHIM app by NPCI" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "A job offer says salary will come only if you first make a UPI payment to register. This is?",
    options: ["Standard job registration process", "An advance fee fraud scam", "A government job requirement", "A legitimate HR process"],
    answer: "An advance fee fraud scam" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "Can two UPI IDs be linked to the same bank account?",
    options: ["No, only one allowed", "Yes, multiple UPI IDs can be linked to the same account", "Only with RBI permission", "Only for business accounts"],
    answer: "Yes, multiple UPI IDs can be linked to the same account" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "What is the UPI transaction reference number used for?",
    options: ["It is your UPI PIN", "Tracking and dispute resolution for a transaction", "It is your UPI ID", "Identifying your bank"],
    answer: "Tracking and dispute resolution for a transaction" },

  { category: "UPI & Digital Payments", categoryColor: "#10b981",
    question: "If you make a wrong UPI payment to an incorrect number, what should you do?",
    options: ["Nothing, UPI payments are non-refundable", "Contact your bank and file a dispute immediately", "Ask the receiver politely", "Contact police directly"],
    answer: "Contact your bank and file a dispute immediately" },

  // ── KYC & IDENTITY FRAUD (25) ───────────────────────────
  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "KYC stands for?",
    options: ["Know Your Customer", "Keep Your Credentials", "Know Your Card", "Keep Your Cash"],
    answer: "Know Your Customer" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "A message says your account will be blocked if you do not update KYC by clicking a link. What is this?",
    options: ["Genuine bank alert", "KYC scam designed to steal your credentials", "Mandatory RBI update", "Normal account maintenance"],
    answer: "KYC scam designed to steal your credentials" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What documents are typically required for KYC in India?",
    options: ["Only PAN card", "Aadhaar and PAN are most common", "Voter ID and driving licence only", "Passport only"],
    answer: "Aadhaar and PAN are most common" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What is identity theft?",
    options: ["Stealing someone's physical wallet", "Using someone else's personal information to commit fraud", "Hacking someone's email", "Copying someone's signature"],
    answer: "Using someone else's personal information to commit fraud" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "Should you share a photo of your Aadhaar card on WhatsApp with an unknown person?",
    options: ["Yes for verification", "No, never share Aadhaar digitally with unknown parties", "Only if they ask politely", "Yes if they say they are from a bank"],
    answer: "No, never share Aadhaar digitally with unknown parties" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What is a masked Aadhaar card?",
    options: ["An Aadhaar with photo removed", "An Aadhaar showing only last 4 digits for safer sharing", "An expired Aadhaar card", "A temporary Aadhaar"],
    answer: "An Aadhaar showing only last 4 digits for safer sharing" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What can fraudsters do with your stolen Aadhaar number?",
    options: ["Nothing, it is just an ID number", "Open fake bank accounts, take loans, or commit identity fraud", "Only view your address", "Only verify your age"],
    answer: "Open fake bank accounts, take loans, or commit identity fraud" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "A telecom company agent visits home asking for Aadhaar to activate SIM. They complete biometric on a device. This is?",
    options: ["Always safe and legitimate", "Potentially a SIM swap fraud attempt", "Mandatory by TRAI", "Only safe if you get a receipt"],
    answer: "Potentially a SIM swap fraud attempt" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What is SIM swap fraud?",
    options: ["Swapping your phone SIM to a new phone", "Fraudster transferring your mobile number to their SIM to receive your OTPs", "Changing your mobile plan", "Getting a duplicate SIM from your carrier"],
    answer: "Fraudster transferring your mobile number to their SIM to receive your OTPs" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "How will you know if a SIM swap attack has happened to you?",
    options: ["Bank sends an alert email", "Your mobile loses network signal unexpectedly", "You receive extra OTPs", "Your phone reboots automatically"],
    answer: "Your mobile loses network signal unexpectedly" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "If you lose your mobile number linked to bank, what is the immediate risk?",
    options: ["No risk as OTP is not required", "Fraudsters can receive your OTPs and access your account", "Only email access is at risk", "Risk of spam calls only"],
    answer: "Fraudsters can receive your OTPs and access your account" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "Banks are required to do KYC as per regulations from?",
    options: ["SEBI", "RBI under Prevention of Money Laundering Act", "Finance Ministry directly", "Income Tax Department"],
    answer: "RBI under Prevention of Money Laundering Act" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What is Video KYC?",
    options: ["Sharing a video of your documents on WhatsApp", "A live video call with bank representative for digital account opening", "Recording yourself saying your ID number", "Sending video to a bank branch"],
    answer: "A live video call with bank representative for digital account opening" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "A person claiming to be an RBI official calls asking you to transfer funds for KYC verification. You should?",
    options: ["Transfer funds as RBI is trustworthy", "Refuse as RBI never asks individuals to transfer money", "Ask for their ID first and then transfer", "Transfer a small amount as test"],
    answer: "Refuse as RBI never asks individuals to transfer money" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What is e-KYC in India?",
    options: ["Electronic KYC using Aadhaar authentication via UIDAI", "KYC done via email", "KYC form filled online only", "KYC using a scanned photocopy"],
    answer: "Electronic KYC using Aadhaar authentication via UIDAI" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "Your PAN card details should NOT be shared with?",
    options: ["Your bank for account opening", "Unknown websites or cold callers", "IT department for tax filing", "Employer for form 16"],
    answer: "Unknown websites or cold callers" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What should you do with physical documents containing sensitive information before disposing?",
    options: ["Throw in regular dustbin", "Shred or burn them to prevent misuse", "Tear into two pieces", "Give them to a recycling shop"],
    answer: "Shred or burn them to prevent misuse" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "Is it safe to do KYC through a third-party app that is not from your bank?",
    options: ["Yes if they have good reviews", "No, always use only your official bank app or branch", "Yes if the app is on Google Play", "Only if they ask for Aadhaar not PAN"],
    answer: "No, always use only your official bank app or branch" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What is account takeover fraud?",
    options: ["Bank closing your account", "Fraudster gaining control of your bank account using stolen credentials", "Changing your account to a different bank", "Joint account creation without consent"],
    answer: "Fraudster gaining control of your bank account using stolen credentials" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "A form online asks for your Aadhaar, PAN, and bank account number together. This is?",
    options: ["Normal verification", "Highly suspicious as no legitimate service needs all three together", "Required for GST registration", "Normal for job applications"],
    answer: "Highly suspicious as no legitimate service needs all three together" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What is the UIDAI helpline number for Aadhaar-related fraud?",
    options: ["1800-11-5526", "1800-180-1234", "1947", "112"],
    answer: "1947" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "If your Aadhaar is misused, which authority should you report to?",
    options: ["Local police only", "UIDAI and cybercrime portal", "Income Tax Department", "SEBI"],
    answer: "UIDAI and cybercrime portal" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What does locking your Aadhaar biometric do?",
    options: ["Prevents Aadhaar from being used anywhere", "Prevents unauthorized biometric authentication of your Aadhaar", "Deactivates your Aadhaar permanently", "Locks your bank account"],
    answer: "Prevents unauthorized biometric authentication of your Aadhaar" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "How can you check if your Aadhaar has been used somewhere without your knowledge?",
    options: ["You cannot check this", "Check authentication history on UIDAI website or mAadhaar app", "Call your bank", "Check your email inbox"],
    answer: "Check authentication history on UIDAI website or mAadhaar app" },

  { category: "KYC & Identity Fraud", categoryColor: "#f59e0b",
    question: "What is a mule account?",
    options: ["A bank account for animals", "A bank account used by fraudsters to move stolen money", "A dormant bank account", "A joint account between two people"],
    answer: "A bank account used by fraudsters to move stolen money" },

  // ── INVESTMENT & LOAN FRAUD (25) ────────────────────────
  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "A WhatsApp group promises 40% monthly returns on investment. This is most likely?",
    options: ["A genuine investment opportunity", "A Ponzi or pyramid scheme scam", "A government saving scheme", "A bank fixed deposit"],
    answer: "A Ponzi or pyramid scheme scam" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What is a Ponzi scheme?",
    options: ["A legitimate investment strategy", "A fraud where returns to old investors are paid using new investors money", "A government investment plan", "A stock market strategy"],
    answer: "A fraud where returns to old investors are paid using new investors money" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "Before investing, you should verify if the company is registered with?",
    options: ["Google", "SEBI for investments and RBI for banking products", "Ministry of Finance website", "Your local bank branch"],
    answer: "SEBI for investments and RBI for banking products" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "A loan app offers instant loan without any documentation. This is?",
    options: ["A government scheme", "Likely a predatory or fraudulent loan app", "RBI approved fast loan", "A bank overdraft facility"],
    answer: "Likely a predatory or fraudulent loan app" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What is the first thing you should verify before taking a personal loan online?",
    options: ["Interest rate only", "Whether the lender is RBI registered and NBFC licensed", "Loan amount offered", "Repayment duration"],
    answer: "Whether the lender is RBI registered and NBFC licensed" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "A loan app demands access to your contacts, gallery, and messages. This is?",
    options: ["Normal for loan processing", "A major red flag indicating a predatory app", "Required by RBI", "Standard for all finance apps"],
    answer: "A major red flag indicating a predatory app" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What is a pyramid scheme?",
    options: ["A legitimate network marketing business", "A fraud where participants earn by recruiting others rather than selling real products", "An Egyptian investment strategy", "A bank savings pyramid plan"],
    answer: "A fraud where participants earn by recruiting others rather than selling real products" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "Someone asks you to pay a processing fee to get a loan approved. This is?",
    options: ["Normal bank procedure", "Advance fee fraud - legitimate lenders do not charge upfront fees", "An RBI requirement", "A refundable security deposit"],
    answer: "Advance fee fraud - legitimate lenders do not charge upfront fees" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What is a good credit score range in India?",
    options: ["300-500", "500-600", "750-900", "100-200"],
    answer: "750-900" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "SEBI stands for?",
    options: ["Securities and Exchange Board of India", "State Economic Bureau of India", "Securities and Exchange Bank of India", "Stock Exchange Board of India"],
    answer: "Securities and Exchange Board of India" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "An investment promising guaranteed returns of 30% per year with no risk is?",
    options: ["An excellent opportunity", "Almost certainly a fraud as high returns always come with high risk", "A government bond scheme", "A fixed deposit variant"],
    answer: "Almost certainly a fraud as high returns always come with high risk" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What is churning in investment fraud?",
    options: ["Reinvesting profits", "A broker excessively buying and selling in your account to earn commissions", "Mixing legal and illegal funds", "A cryptocurrency technique"],
    answer: "A broker excessively buying and selling in your account to earn commissions" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "A celebrity on social media is promoting a new cryptocurrency investment. You should?",
    options: ["Invest immediately before it fills up", "Research thoroughly as celebrity endorsements are often part of scams", "Trust it as celebrities are verified", "Invest a small amount to test"],
    answer: "Research thoroughly as celebrity endorsements are often part of scams" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What is a pump and dump scheme?",
    options: ["A water pump business fraud", "Artificially inflating an asset price then selling before the price crashes", "A loan repayment trick", "A bank deposit scam"],
    answer: "Artificially inflating an asset price then selling before the price crashes" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "Illegal loan apps that harass borrowers can be reported to?",
    options: ["Google only", "RBI sachet portal and cybercrime.gov.in", "SEBI only", "Income Tax Department"],
    answer: "RBI sachet portal and cybercrime.gov.in" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What does NBFC stand for?",
    options: ["National Banking Finance Corporation", "Non-Banking Financial Company", "New Banking Finance Committee", "National Bureau of Financial Control"],
    answer: "Non-Banking Financial Company" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "A stock tip group on Telegram promises 10x returns. What is this likely?",
    options: ["A legitimate investment advisory", "A stock market manipulation scam", "A SEBI approved advisory", "A free brokerage service"],
    answer: "A stock market manipulation scam" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What is the minimum documentation a legitimate lender must provide before a loan?",
    options: ["Nothing, loans are given verbally", "Key Fact Statement with interest rate, fees, and terms clearly mentioned", "Just an SMS confirmation", "Only loan amount details"],
    answer: "Key Fact Statement with interest rate, fees, and terms clearly mentioned" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "An app lent you money and is now threatening you with morphed photos. What should you do?",
    options: ["Pay immediately to stop harassment", "File a police complaint and report on cybercrime.gov.in immediately", "Ignore the threats", "Pay half the amount"],
    answer: "File a police complaint and report on cybercrime.gov.in immediately" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What is a Chit Fund?",
    options: ["An illegal investment always", "A savings and credit scheme where members contribute periodically", "A government scheme for farmers", "A type of bank fixed deposit"],
    answer: "A savings and credit scheme where members contribute periodically" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "Which app can you use to verify if a stockbroker is registered in India?",
    options: ["SEBI SCORES app", "Zerodha app", "MoneyControl app", "Income Tax e-filing app"],
    answer: "SEBI SCORES app" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "Multi-level marketing becomes fraudulent when?",
    options: ["Products are sold to customers", "Income depends primarily on recruiting new members rather than product sales", "The company is registered", "Products have high prices"],
    answer: "Income depends primarily on recruiting new members rather than product sales" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "What is the RBI helpline number for banking related complaints?",
    options: ["1800-11-0001", "14448", "1800-425-1945", "1947"],
    answer: "14448" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "A company claims to double your money in 30 days. Under Indian law this is?",
    options: ["Legal if SEBI registered", "A violation of the Prize Chits and Money Circulation Schemes Act", "Legal if RBI approved", "Legal for amounts below Rs. 50,000"],
    answer: "A violation of the Prize Chits and Money Circulation Schemes Act" },

  { category: "Investment & Loan Fraud", categoryColor: "#8b5cf6",
    question: "EMI stands for?",
    options: ["Equal Monthly Income", "Equated Monthly Installment", "Extended Money Interest", "Electronic Money Interface"],
    answer: "Equated Monthly Installment" },

  // ── CYBER SECURITY BASICS (25) ──────────────────────────
  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is malware?",
    options: ["Male software developer", "Malicious software designed to damage or gain unauthorized access to systems", "A slow internet connection", "A type of antivirus"],
    answer: "Malicious software designed to damage or gain unauthorized access to systems" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is ransomware?",
    options: ["A software for ransom tracking", "Malware that encrypts your files and demands payment for decryption", "A type of banking software", "An antivirus program"],
    answer: "Malware that encrypts your files and demands payment for decryption" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "Why should you keep your phone OS updated?",
    options: ["To get new features only", "Updates patch security vulnerabilities that fraudsters exploit", "To improve phone speed only", "Updates are optional and cosmetic"],
    answer: "Updates patch security vulnerabilities that fraudsters exploit" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is a VPN used for?",
    options: ["Increasing internet speed", "Creating an encrypted tunnel for secure internet browsing", "Hacking into websites", "Downloading faster"],
    answer: "Creating an encrypted tunnel for secure internet browsing" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is social engineering in cybersecurity?",
    options: ["Building social media platforms", "Manipulating people psychologically to reveal confidential information", "Engineering degree in social work", "A networking technique"],
    answer: "Manipulating people psychologically to reveal confidential information" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is a firewall?",
    options: ["A physical wall in a server room", "A security system that monitors and controls network traffic", "An antivirus software", "A password manager"],
    answer: "A security system that monitors and controls network traffic" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "You receive an email attachment from an unknown sender. What should you do?",
    options: ["Open it to see what it is", "Do not open it, it may contain malware", "Open only if it is a PDF", "Forward it to your bank"],
    answer: "Do not open it, it may contain malware" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is a data breach?",
    options: ["Breaking into a server room physically", "Unauthorized access to or release of sensitive data", "A broken internet connection", "Data being deleted accidentally"],
    answer: "Unauthorized access to or release of sensitive data" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "Which of these is NOT a type of malware?",
    options: ["Virus", "Trojan horse", "Firewall", "Spyware"],
    answer: "Firewall" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is spyware?",
    options: ["A spy movie streaming app", "Software that secretly monitors and collects user information", "A government surveillance system", "A secure browser"],
    answer: "Software that secretly monitors and collects user information" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What should you do before installing an app from a third-party website?",
    options: ["Install immediately if it looks official", "Avoid it as third-party apps are higher risk and use official app stores", "Check if the file size is small", "Share the link with friends first"],
    answer: "Avoid it as third-party apps are higher risk and use official app stores" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is a trojan horse in cybersecurity?",
    options: ["A wooden horse attack in history", "Malware disguised as legitimate software to trick users into installing it", "A strong password technique", "A type of encryption"],
    answer: "Malware disguised as legitimate software to trick users into installing it" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What does end-to-end encryption mean in messaging apps?",
    options: ["Messages are stored on the server forever", "Only the sender and receiver can read messages, no third party including the app company", "Messages are encrypted only on one end", "Encryption that starts and ends automatically"],
    answer: "Only the sender and receiver can read messages, no third party including the app company" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is a keylogger?",
    options: ["A software that logs keyboard shortcuts", "Malware that records every keystroke to steal passwords and sensitive info", "A typing speed tester", "A password strength checker"],
    answer: "Malware that records every keystroke to steal passwords and sensitive info" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "Why is it dangerous to use the same password everywhere?",
    options: ["It is not dangerous at all", "If one site is breached, all your accounts become vulnerable", "It only risks social media accounts", "It slows down your devices"],
    answer: "If one site is breached, all your accounts become vulnerable" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is a DDoS attack?",
    options: ["Deleting data from a server", "Overwhelming a server with traffic to make it unavailable to users", "A phishing email campaign", "Installing malware on a device"],
    answer: "Overwhelming a server with traffic to make it unavailable to users" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is the safest browser behavior for banking?",
    options: ["Use any browser with extensions", "Use official bank app or a dedicated secure browser with no extensions", "Use browser with ad blocker only", "Use incognito mode only"],
    answer: "Use official bank app or a dedicated secure browser with no extensions" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is multi-factor authentication?",
    options: ["Using multiple browsers to log in", "Using two or more verification methods like password plus OTP plus biometric", "Logging in from multiple devices", "Having multiple email addresses"],
    answer: "Using two or more verification methods like password plus OTP plus biometric" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is a botnet?",
    options: ["A network of robots", "A network of infected computers controlled by a hacker to perform attacks", "A secure corporate network", "A type of antivirus"],
    answer: "A network of infected computers controlled by a hacker to perform attacks" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What should you do if your antivirus detects malware on your phone?",
    options: ["Ignore if the phone works fine", "Follow antivirus instructions to remove it and change all passwords", "Delete the antivirus app", "Restart the phone once"],
    answer: "Follow antivirus instructions to remove it and change all passwords" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "Which of the following is a sign that your device may be infected?",
    options: ["Phone charges faster than usual", "Phone suddenly becomes very slow, battery drains fast, or unknown apps appear", "Phone displays time correctly", "WiFi works faster than usual"],
    answer: "Phone suddenly becomes very slow, battery drains fast, or unknown apps appear" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is the purpose of CERT-In in India?",
    options: ["Certifying bank employees", "India's national agency for cybersecurity incident response", "Certifying internet speed", "Controlling telecom spectrum"],
    answer: "India's national agency for cybersecurity incident response" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "A permission request from a calculator app asks to access your contacts and camera. You should?",
    options: ["Grant all permissions for better performance", "Deny suspicious permissions that the app does not genuinely need", "Grant only camera access", "Uninstall and reinstall"],
    answer: "Deny suspicious permissions that the app does not genuinely need" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "What is zero-day vulnerability?",
    options: ["A bug found on day zero of software release", "A software flaw unknown to the vendor that hackers exploit before a fix is available", "A virus that activates at midnight", "A phone that runs out of battery"],
    answer: "A software flaw unknown to the vendor that hackers exploit before a fix is available" },

  { category: "Cyber Security Basics", categoryColor: "#06b6d4",
    question: "India's national cybercrime reporting portal is?",
    options: ["cyberpolice.gov.in", "cybercrime.gov.in", "indiancyber.in", "digitalindia.gov.in"],
    answer: "cybercrime.gov.in" },
];

// ─────────────────────────────────────────────────────────────
// SHUFFLE UTILITY
// ─────────────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const QUESTIONS_PER_SESSION = 10;

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
function SecurityQuiz() {
  const [questions, setQuestions]   = useState([]);
  const [current,   setCurrent]     = useState(0);
  const [selected,  setSelected]    = useState(null);
  const [result,    setResult]      = useState(null);
  const [score,     setScore]       = useState(0);
  const [history,   setHistory]     = useState([]);
  const [sessions,  setSessions]    = useState(0);
  const [bestScore, setBestScore]   = useState(0);
  const [weakIds,   setWeakIds]     = useState([]);

  // ── Load session data + build question set ────────────────
  useEffect(() => {
    const savedSessions  = parseInt(localStorage.getItem("quiz_sessions")  || "0");
    const savedBest      = parseInt(localStorage.getItem("quiz_best_score")|| "0");
    const savedWeak      = JSON.parse(localStorage.getItem("quiz_weak_ids") || "[]");
    setSessions(savedSessions);
    setBestScore(savedBest);
    setWeakIds(savedWeak);
    buildQuestionSet(savedWeak);
  }, []);

  const buildQuestionSet = (weak) => {
    // Pull weak questions (ones user got wrong before) first
    const weakQs  = ALL_QUESTIONS.filter((_, i) => weak.includes(i));
    const otherQs = ALL_QUESTIONS.filter((_, i) => !weak.includes(i));

    // Shuffle each group separately
    const shuffledWeak  = shuffle(weakQs);
    const shuffledOther = shuffle(otherQs);

    // Take up to 3 weak questions, rest from other pool
    const weakSlice  = shuffledWeak.slice(0, 3);
    const otherSlice = shuffledOther.slice(0, QUESTIONS_PER_SESSION - weakSlice.length);

    // Combine and shuffle the final set
    const finalSet = shuffle([...weakSlice, ...otherSlice]).map((q) => ({
      ...q,
      // also shuffle the answer options so correct answer isn't always in same spot
      options: shuffle(q.options),
    }));

    setQuestions(finalSet);
  };

  // ── Submit answer ─────────────────────────────────────────
  const handleSubmit = () => {
    if (selected === null) return;
    const q         = questions[current];
    const isCorrect = selected === q.answer;

    setResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(s => s + 1);

    // Track wrong answers by index in ALL_QUESTIONS
    if (!isCorrect) {
      const globalIdx = ALL_QUESTIONS.findIndex(
        aq => aq.question === q.question
      );
      if (globalIdx !== -1) {
        setWeakIds(prev => {
          const updated = [...new Set([...prev, globalIdx])];
          localStorage.setItem("quiz_weak_ids", JSON.stringify(updated));
          return updated;
        });
      }
    } else {
      // Remove from weak list if now answered correctly
      const globalIdx = ALL_QUESTIONS.findIndex(
        aq => aq.question === q.question
      );
      if (globalIdx !== -1) {
        setWeakIds(prev => {
          const updated = prev.filter(id => id !== globalIdx);
          localStorage.setItem("quiz_weak_ids", JSON.stringify(updated));
          return updated;
        });
      }
    }

    setHistory(h => [...h, {
      q: q.question,
      category: q.category,
      categoryColor: q.categoryColor,
      selected,
      correct: q.answer,
      isCorrect,
    }]);
  };

  const nextQuestion = () => {
    setCurrent(c => c + 1);
    setSelected(null);
    setResult(null);
  };

  // ── Restart with a fresh shuffle ──────────────────────────
  const handleRestart = () => {
    buildQuestionSet(weakIds);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setResult(null);
    setHistory([]);
  };

  // ── Quiz finished ─────────────────────────────────────────
  if (questions.length > 0 && current >= questions.length) {
    const pct      = Math.round((score / questions.length) * 100);
    const newBest  = Math.max(score, bestScore);
    const newSess  = sessions + 1;

    // Save stats
    localStorage.setItem("quiz_sessions",   newSess);
    localStorage.setItem("quiz_best_score", newBest);

    const verdict =
      pct >= 80 ? "🏆 Security Expert!"    :
      pct >= 60 ? "✓ Good Awareness"       :
      pct >= 40 ? "📚 Keep Learning"        :
                  "⚠ Needs Improvement";

    return (
      <div>
        <PageHeader
          icon="⟡" title="Security Quiz"
          subtitle="Session Complete!" badge="AWARENESS TRAINING"
          gradient="linear-gradient(135deg, #ef4444, #dc2626)"
        />

        {/* Session mini stats */}
        <div className="session-row">
          {[
            { label: "Session",    value: `#${newSess}`,           color: "var(--accent)"  },
            { label: "This Score", value: `${score}/${questions.length}`, color: pct >= 60 ? "var(--success)" : "var(--danger)" },
            { label: "Best Score", value: `${newBest}/${questions.length}`, color: "var(--warning)" },
            { label: "Weak Areas", value: `${weakIds.length} topics`, color: "var(--purple)" },
          ].map((s, i) => (
            <div className="session-stat" key={i}>
              <div className="session-stat__val" style={{ color: s.color }}>{s.value}</div>
              <div className="session-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="score-card">
          {/* Ring */}
          <div className="score-ring">
            <svg viewBox="0 0 120 120" width="150" height="150">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="8"/>
              <circle cx="60" cy="60" r="52" fill="none"
                stroke={pct>=70?"var(--success)":pct>=40?"var(--warning)":"var(--danger)"}
                strokeWidth="8"
                strokeDasharray={`${(pct/100)*327} 327`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{transition:"stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)"}}
              />
            </svg>
            <div className="score-center">
              <div className="score-pct" style={{color:pct>=70?"var(--success)":pct>=40?"var(--warning)":"var(--danger)"}}>
                {pct}%
              </div>
              <div className="score-fraction">{score}/{questions.length}</div>
            </div>
          </div>

          <div className="score-verdict">{verdict}</div>

          {weakIds.length > 0 && (
            <div className="weak-notice">
              <span>🎯</span>
              <span>Next session will include {Math.min(3, weakIds.length)} questions from your weak areas</span>
            </div>
          )}

          {/* Review */}
          <div className="review-list">
            <div className="review-title">Answer Review</div>
            {history.map((h, i) => (
              <div key={i} className={`review-item ${h.isCorrect ? "review-item--ok" : "review-item--bad"}`}>
                <span className="review-icon">{h.isCorrect ? "✓" : "✕"}</span>
                <div style={{flex:1}}>
                  <div className="review-cat" style={{color: h.categoryColor}}>{h.category}</div>
                  <div className="review-q">{h.q}</div>
                  {!h.isCorrect && <div className="review-correct">✓ Correct: {h.correct}</div>}
                </div>
              </div>
            ))}
          </div>

          <button className="restart-btn" onClick={handleRestart}>
            🔀 New Shuffle — Play Again
          </button>
        </div>

        <style>{quizStyles}</style>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────
  if (questions.length === 0) {
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"60vh",flexDirection:"column",gap:"12px"}}>
        <div style={{width:"40px",height:"40px",border:"3px solid var(--border)",borderTopColor:"var(--accent)",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
        <span style={{color:"var(--text-muted)",fontSize:"13px"}}>Preparing your quiz...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Active quiz ───────────────────────────────────────────
  const q        = questions[current];
  const progress = ((current) / questions.length) * 100;
  const isWeak   = weakIds.includes(ALL_QUESTIONS.findIndex(aq => aq.question === q.question));

  return (
    <div>
      <PageHeader
        icon="⟡" title="Security Quiz"
        subtitle={`${ALL_QUESTIONS.length} questions · shuffled every session · tracks weak areas`}
        badge="AWARENESS TRAINING"
        gradient="linear-gradient(135deg, #ef4444, #dc2626)"
      />

      {/* Top meta row */}
      <div className="quiz-meta">
        <div className="quiz-meta__pool">
          <span>🎲</span>
          <span>Session #{sessions + 1} · {questions.length} random questions from pool of {ALL_QUESTIONS.length}</span>
        </div>
        {sessions > 0 && (
          <div className="quiz-meta__best">
            🏆 Best: {bestScore}/{questions.length}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="quiz-progress">
        <div className="quiz-progress__labels">
          <span>Question {current + 1} of {questions.length}</span>
          <span style={{color:"var(--success)",fontWeight:700}}>{score} correct</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{width:`${progress}%`}}/>
        </div>
      </div>

      {/* Question card */}
      <div className="question-card" key={current}>
        <div className="q-top-row">
          <div className="q-category" style={{background:`${q.categoryColor}18`,color:q.categoryColor,border:`1px solid ${q.categoryColor}40`}}>
            {q.category}
          </div>
          {isWeak && (
            <div className="q-weak-tag">🎯 Weak Area — Review carefully</div>
          )}
        </div>

        <div className="q-number">Q{current + 1} / {questions.length}</div>
        <div className="q-text">{q.question}</div>

        <div className="options-grid">
          {q.options.map((option, i) => {
            let state = "";
            if (result) {
              if (option === q.answer)                            state = "correct";
              else if (option === selected && selected !== q.answer) state = "wrong";
            } else if (selected === option) {
              state = "selected";
            }
            return (
              <button
                key={i}
                className={`option-btn option-btn--${state || "default"}`}
                onClick={() => !result && setSelected(option)}
                disabled={!!result}
              >
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="option-text">{option}</span>
                {state === "correct" && <span className="option-badge">✓</span>}
                {state === "wrong"   && <span className="option-badge">✕</span>}
              </button>
            );
          })}
        </div>

        <div className="quiz-actions">
          {!result && (
            <button className="submit-btn" disabled={!selected} onClick={handleSubmit}>
              Submit Answer
            </button>
          )}
          {result && (
            <div className="result-feedback">
              <span className={`feedback-tag ${result==="correct"?"feedback-tag--ok":"feedback-tag--bad"}`}>
                {result === "correct" ? "✓ Correct!" : "✕ Incorrect"}
              </span>
              {result === "wrong" && (
                <span className="correct-hint">✓ {q.answer}</span>
              )}
              <button className="next-btn" onClick={nextQuestion}>
                {current < questions.length - 1 ? "Next →" : "See Results →"}
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{quizStyles}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────
const quizStyles = `
  .quiz-meta {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px; margin-bottom: 16px;
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 10px; font-size: 12px; color: var(--text-secondary);
    box-shadow: var(--shadow-card);
  }
  .quiz-meta__pool { display: flex; align-items: center; gap: 6px; }
  .quiz-meta__best { font-weight: 700; color: var(--warning); }

  .quiz-progress { margin-bottom: 20px; animation: fadeUp 0.4s ease forwards; }
  .quiz-progress__labels {
    display: flex; justify-content: space-between;
    font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;
  }
  .progress-track { height: 5px; background: var(--bg-input); border-radius: 10px; overflow: hidden; }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #ef4444);
    border-radius: 10px; transition: width 0.5s ease;
  }

  .question-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 16px; padding: 28px;
    animation: fadeUp 0.3s ease forwards;
    box-shadow: var(--shadow-card);
  }
  .q-top-row {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;
  }
  .q-category {
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
    padding: 4px 12px; border-radius: 20px;
  }
  .q-weak-tag {
    font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
    padding: 4px 12px; border-radius: 20px;
    background: rgba(245,158,11,0.12); color: var(--warning);
    border: 1px solid rgba(245,158,11,0.3);
  }
  .q-number {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
    color: var(--text-muted); margin-bottom: 8px;
  }
  .q-text {
    font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700;
    color: var(--text-primary); line-height: 1.45; margin-bottom: 22px;
  }

  .options-grid { display: flex; flex-direction: column; gap: 10px; }
  .option-btn {
    display: flex; align-items: center; gap: 14px; padding: 13px 18px;
    background: var(--bg-input); border: 1.5px solid var(--border);
    border-radius: 10px; cursor: pointer; transition: all var(--transition);
    text-align: left; font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: var(--text-secondary); width: 100%;
  }
  .option-btn--default:hover { border-color: var(--accent); color: var(--text-primary); background: var(--accent-dim); }
  .option-btn--selected { border-color: var(--accent); background: var(--accent-dim); color: var(--text-primary); }
  .option-btn--correct { border-color: var(--success); background: var(--success-dim); color: var(--success); font-weight: 600; }
  .option-btn--wrong   { border-color: var(--danger);  background: var(--danger-dim);  color: var(--danger);  }
  .option-btn:disabled { cursor: default; }
  .option-letter {
    width: 28px; height: 28px; border-radius: 6px;
    border: 1.5px solid currentColor;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; flex-shrink: 0; opacity: 0.8;
  }
  .option-text { flex: 1; line-height: 1.4; }
  .option-badge { font-weight: 700; flex-shrink: 0; font-size: 16px; }

  .quiz-actions { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border); }
  .submit-btn {
    padding: 12px 28px;
    background: linear-gradient(135deg, var(--accent), #8b5cf6);
    border: none; border-radius: 10px; color: #fff;
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all var(--transition);
  }
  .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px var(--accent-glow); }

  .result-feedback { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .feedback-tag { font-size: 13px; font-weight: 700; padding: 6px 14px; border-radius: 8px; }
  .feedback-tag--ok  { background: var(--success-dim); color: var(--success); }
  .feedback-tag--bad { background: var(--danger-dim);  color: var(--danger);  }
  .correct-hint { font-size: 12px; color: var(--text-secondary); background: var(--success-dim); padding: 6px 12px; border-radius: 8px; flex: 1; }
  .next-btn {
    margin-left: auto; padding: 10px 22px;
    background: var(--grad-accent);
    border: none; border-radius: 10px; color: #fff;
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all var(--transition);
  }
  .next-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 14px var(--accent-glow); }

  /* Results screen */
  .session-row {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 12px; margin-bottom: 20px;
  }
  .session-stat {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px 16px; text-align: center;
    box-shadow: var(--shadow-card);
  }
  .session-stat__val { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; margin-bottom: 4px; }
  .session-stat__label { font-size: 11px; color: var(--text-muted); font-weight: 600; }

  .score-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 16px; padding: 36px; text-align: center;
    animation: fadeUp 0.4s ease forwards; box-shadow: var(--shadow-card);
  }
  .score-ring { position: relative; display: inline-block; margin-bottom: 14px; }
  .score-center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .score-pct { font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 800; }
  .score-fraction { font-size: 12px; color: var(--text-muted); }
  .score-verdict {
    font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700;
    color: var(--text-primary); margin-bottom: 16px;
  }

  .weak-notice {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 16px; margin-bottom: 20px;
    background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25);
    border-radius: 10px; font-size: 13px; color: var(--warning);
    font-weight: 500; text-align: left;
  }

  .review-list { text-align: left; margin-bottom: 24px; max-height: 400px; overflow-y: auto; }
  .review-title {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
    color: var(--text-muted); text-transform: uppercase; margin-bottom: 10px;
  }
  .review-item {
    display: flex; gap: 12px; padding: 12px 14px;
    border-radius: 10px; margin-bottom: 8px; font-size: 13px;
  }
  .review-item--ok  { background: var(--success-dim); }
  .review-item--bad { background: var(--danger-dim);  }
  .review-icon { font-weight: 700; flex-shrink: 0; margin-top: 2px; font-size: 15px; }
  .review-item--ok  .review-icon { color: var(--success); }
  .review-item--bad .review-icon { color: var(--danger);  }
  .review-cat { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; margin-bottom: 3px; opacity: 0.85; }
  .review-q { color: var(--text-primary); font-weight: 500; margin-bottom: 3px; line-height: 1.4; }
  .review-correct { font-size: 12px; color: var(--success); font-weight: 600; }

  .restart-btn {
    padding: 13px 32px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border: none; border-radius: 10px; color: #fff;
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all var(--transition);
    box-shadow: 0 4px 16px rgba(99,102,241,0.35);
  }
  .restart-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.45); }

  @media (max-width: 700px) {
    .session-row { grid-template-columns: repeat(2,1fr); }
  }
`;

export default SecurityQuiz;