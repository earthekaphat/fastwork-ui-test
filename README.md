# 🚀 Fastwork UI Automation Test

This project is an **end-to-end UI automation test suite** built using
**Playwright** to validate core user flows on the Fastwork platform.

## 📌 Project Overview

-   Validate key user journeys
-   Ensure UI functionality works as expected
-   Reduce manual testing effort
-   Demonstrate Page Object Model (POM)

## 🧪 Test Scenarios

### 🔍 Search

-   Search with keyword
-   Search with Enter
-   Validate results
-   No-result case

### 🛒 Product Flow

-   Select product
-   Open new tab
-   Validate detail page

### 💬 Chat Flow

-   Click chat
-   Redirect to login
-   Validate auth

## 🏗️ Structure

    tests/
    pages/
    locators/
    utils/

## ⚙️ Tech Stack

-   Playwright
-   TypeScript
-   POM

## 🚀 Run

npm install npx playwright install npx playwright test

## ⚠️ Known Issue

Problem: CAPTCHA / Google popup blocks UI\
Solution: Disable FedCm, block Google requests, use clean context

## 👤 Author

Earth (Ekaphat Seamthong)
