# Travel Planner 🌍

A Travel Planner web application built using React, Tailwind CSS, and the Amadeus API.

## Project Description

This application allows users to search for destinations worldwide. It integrates the Amadeus API to fetch real-time location data and displays city information dynamically.

## Features

- Destination search by city name
- Real-time API integration with Amadeus
- Responsive UI with Tailwind CSS
- Routing with React Router
- Destination details page

## Tech Stack

- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Amadeus API

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/travel-planner.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root folder and add:
   ```
   VITE_AMADEUS_KEY=your_api_key
   VITE_AMADEUS_SECRET=your_api_secret
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Known Limitations

- Currently uses Amadeus test environment
- Flight and hotel integration in progress
- No user authentication yet

## Future Improvements

- Flight offers integration
- Hotel booking integration
- Itinerary planner feature
- Deployment to Vercel