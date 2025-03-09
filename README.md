# Expense Tracker Frontend

This is the frontend for the **Expense Tracker Application**, built using React, Material UI, and Redux. It helps users track their income and expenses efficiently.

🌐 **Live Full-Stack Application:**  
👉 [Expense Tracker (Deployed)](https://expense-tracker-frontend-2gwb.onrender.com)  

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies  
Open your terminal and run the following commands:

```sh
cd expense-tracker-frontend
npm i
npm run dev
```

---

## 🔑 Login Credentials  

Use the following credentials to log in:

- **Email:** `m@gmail.com`  
- **Password:** `123`

---

## 🔥 Features

### ✅ **1. Redux Token Storage**  
Once logged in, Redux will store your **authentication token**.

### ✅ **2. Update Income**  
Click on the **Income** card to update your income.

### ✅ **3. Add Expenses**  
Navigate to the **Expense** tab to add your expenses.

### ✅ **4. Search & Sort Expenses**  
Use the search and sorting options to find specific expenses.

### ✅ **5. Full CRUD Operations**  
- **Create** new expenses  
- **Read** all expenses  
- **Update** existing expenses  
- **Delete** unwanted expenses  

### ✅ **6. Graphical Representation (Bar Chart 📊)**  
- View your **Income vs. Expenses** in an interactive **bar chart**.  
- Helps analyze spending patterns visually.  

### ✅ **7. Generate Reports**  
- Go to the **Report** tab to view a summary.  
- Download the report for further analysis.

### ✅ **8. Logout & Login as Another User**  
Log out whenever you need to log in with another account.

### ✅ **9. Sign Up as a New User**  
- Go to the **Sign Up** page and register.  
- **(Email ID must be unique).**  
- Log in using the new credentials.

---

## ⚠️ Backend Issue & Workaround

There is a **known issue in the backend** at **`server.js` (Lines 38-40)**:  
- The condition `if (!income)` throws an error if `amount === 0`, preventing updates.

### 🔧 **Workaround: Use Swagger API**  
1. **Authorize yourself** using the token from Redux.  
2. Open the backend Swagger API:  
   👉 [Expense Tracker API Docs](https://expense-tracker-backend-1e0i.onrender.com/api-docs/)  
3. **Manually post income** using Swagger.  
4. Once done, go back to the frontend and continue exploring.

---

## 🎯 Keep Exploring!  
Now that your setup is ready, start using the **Expense Tracker** and manage your finances effectively. 🚀
