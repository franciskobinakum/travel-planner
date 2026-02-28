Travel Planner App

A modern, responsive Travel Planner web application built with React, Tailwind CSS, and real-world API integrations.

This application allows users to search destinations, preview travel routes, explore flights and hotels, and manage trip planning — all with dark mode support and animated UI transitions.

 Project Overview

The Travel Planner App helps users:

Search destinations

View route previews on interactive maps

Explore flights and hotel options

Manage travel plans

Toggle dark/light mode

Experience smooth animated transitions

This project demonstrates:

API integration

State management

Protected routes

UI/UX design

Dark mode implementation

Responsive design

Map integration

 Features
Destination Search

Search destinations using Wikipedia API

View destination details

Dynamic route preview

Route Preview

Interactive map powered by Leaflet

Displays route between departure city and destination

Real-time coordinate fetching using OpenStreetMap

Flights &  Hotels

Integrated mock + real API-ready structure

Displays flight prices

Displays hotel pricing

Structured for Amadeus API integration

Authentication

Login & Register system

Protected routes

Local storage session handling

Dark Mode

Global dark/light toggle

Persistent theme preference

Tailwind CSS class-based implementation

Responsive Design

Mobile-first layout

Grid-based UI

Smooth animations using Framer Motion

Tech Stack

React (Vite)

React Router

Tailwind CSS

Framer Motion

Leaflet (Map Integration)

Axios

OpenStreetMap API

Wikipedia API

Project Structure
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── AnimatedPage.jsx
│   ├── RouteMap.jsx
│
├── context/
│   ├── ThemeContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── DestinationDetails.jsx
│   ├── Explore.jsx
│   ├── MyTrip.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│
├── App.jsx
├── main.jsx

⚙ Installation & Setup
1. Clone Repository
git clone https://github.com/franciskobinakum/travel-planner.git
cd travel-planner
2. Install Dependencies
npm install
3. Run Development Server
npm run dev


Dark Mode Implementation

Tailwind configured with:

darkMode: "class"

Theme stored in localStorage

Global ThemeContext manages toggle

Navbar includes theme switch button

 Protected Routes

Home

Destination

Explore

My Trip

Users must login before accessing main pages.

Future Improvements

Real Amadeus API production integration

Budget tracking with charts

AI trip recommendations

Weather integration

PDF itinerary export

Booking confirmation modal

Admin dashboard




