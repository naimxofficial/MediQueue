# 🎓 MediQueue

> **Find, book, and learn with expert tutors — all in one place.**

MediQueue is a full-stack tutor booking platform where students can discover verified tutors, filter by name or availability, book sessions, and manage everything from a personal dashboard. Built with Next.js App Router, Better Auth, and MongoDB.

🌐 **Live Site:** [https://mediqueue-puce.vercel.app/](https://mediqueue-puce.vercel.app/)

---

## ✨ Features

| Feature | Details |
|--------|---------|
| 🎠 **Hero Carousel** | 3-slide auto-advancing carousel with dot indicators and prev/next controls |
| 🔍 **Tutor Search** | Real-time search by name + date range filter with active filter badges |
| 👤 **Tutor Detail Page** | Full tutor profile with direct session booking |
| 📅 **My Booked Sessions** | Dashboard to view all active sessions in a data table |
| ❌ **Cancel Session** | Cancel any session via confirmation dialog with instant status update |
| ➕ **Add Tutor** | Authenticated users can add their own tutor listing |
| 🗂️ **My Tutors** | Manage your own tutor listings in one place |
| 🔐 **Email Auth** | Register & login with validated email & password via Better Auth |
| 🔑 **Google OAuth** | One-click sign-in with Google |
| 👤 **User Dropdown** | Avatar, name & email in a dropdown menu with logout |
| 🌗 **Dark / Light Mode** | Theme toggle with system preference sync via next-themes |
| 🔔 **Toast Notifications** | Real-time feedback on bookings, cancellations & auth errors |
| 📱 **Fully Responsive** | Sticky blur navbar, mobile hamburger menu, and responsive grids |
| 🚫 **Custom 404 Page** | Clean error page with a "Return to Safety" redirect |

---

## 📄 Pages & Routes

| Route | Page | Auth |
|-------|------|:----:|
| `/` | Home — Carousel, Featured Tutors, Stats, Testimonials, CTA | ✗ |
| `/tutors` | Tutor directory with search & date filters | ✗ |
| `/tutors/:id` | Tutor detail & booking | ✗ |
| `/my-booked-sessions` | View & cancel active sessions | ✓ |
| `/add-tutors` | Add a new tutor listing | ✓ |
| `/my-tutors` | Manage your tutor listings | ✓ |
| `/login` | Sign in | ✗ |
| `/register` | Create account | ✗ |
| `*` | Custom 404 | ✗ |

---

## 🛠️ Built With

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5-5A0EF8?style=flat&logo=daisyui&logoColor=white)
![HeroUI](https://img.shields.io/badge/HeroUI-3-000000?style=flat&logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better--Auth-gray?style=flat)
![React Icons](https://img.shields.io/badge/React--Icons-E91E63?style=flat&logo=react&logoColor=white)
![React Toastify](https://img.shields.io/badge/React--Toastify-FFCD00?style=flat&logo=react&logoColor=black)
![next-themes](https://img.shields.io/badge/next--themes-000000?style=flat&logo=nextdotjs&logoColor=white)
