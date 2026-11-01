# CityPass Parking

**CityPass Parking** is an Angular web application for creating, validating, and visualizing car parking tickets. It combines traditional form entry with an AI-powered assistant (built with **Firebase AI** and **Gemini**) that parses natural-language descriptions into structured parking tickets and plots parked vehicles on an interactive **Google Map**.

## Features

- **Ticket Management (`/tickets`)**: Submit parking tickets manually with a vehicle's license plate number, arrival date/time, and coordinates.
- **AI Ticket Creator**: Describe parking details in plain language (e.g., plate number, relative arrival times, and street addresses or landmarks). The integrated Gemini model (`gemini-3.8-flash`) automatically converts date phrases into ISO timestamps, geocodes locations into latitude/longitude coordinates, and invokes function calling (`addTicket`) to register the ticket.
- **Interactive Car Map (`/cars`)**: View all active parking tickets as advanced markers on a Google Map (centered around Athens, Greece by default). Clicking a marker opens an info window displaying the vehicle's arrival time.
- **Real-time Notifications**: Instant UI feedback via NG-ZORRO notification toasts whenever a ticket is added.

## Tech Stack

- **Framework**: [Angular](https://angular.dev/) (v22) with standalone components, Signals, and lazy-loaded routes
- **UI Component Library**: [NG-ZORRO](https://ng.ant.design/) (Ant Design for Angular)
- **AI & Backend Services**: [Firebase](https://firebase.google.com/) (`firebase/ai` with Gemini function calling & `firebase/app-check`)
- **Maps**: [`@angular/google-maps`](https://github.com/angular/components/tree/main/src/google-maps) with Google Maps JavaScript API
- **Testing**: [Vitest](https://vitest.dev/)

## Project Structure

```text
src/
├── app/
│   ├── pages/
│   │   ├── welcome/       # Home page overview (/welcome)
│   │   ├── tickets/       # Manual & AI-assisted ticket creation (/tickets)
│   │   └── cars/          # Google Maps view of parked cars (/cars)
│   ├── app.config.ts      # Application providers, Firebase & App Check setup
│   ├── app.routes.ts      # Top-level lazy-loaded route definitions
│   ├── parking.ts         # Core service for tickets state & Gemini AI
│   └── ticket.ts          # Ticket data model (plateNo, arrival, location)
└── index.html             # App shell & Google Maps JS API bootstrap loader
```

## Configuration

Before running the application with live AI and Maps functionality, configure the following credentials:

1. **Firebase & App Check (`src/app/app.config.ts`)**:
   - Replace `'Your API key'` in `firebaseConfig` with your Firebase Web API key.
   - Replace `'Your debug token'` in `FIREBASE_APPCHECK_DEBUG_TOKEN` with your Firebase App Check debug token (or configure a production reCAPTCHA v3 site key).
2. **Google Maps API (`src/index.html`)**:
   - Provide a valid Google Maps JavaScript API key (`key: "YOUR_API_KEY"`) in the inline loader script parameters if required by your environment.

## Getting Started

### Prerequisites

- **Node.js** (v20+ recommended)
- **npm** (v11+)

### Installation

```bash
npm install
```

### Development Server

To start a local development server, run:

```bash
npm start
# or
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To compile the project for production, run:

```bash
npm run build
```

Build artifacts are output to the `dist/` directory.

### Running Unit Tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use:

```bash
npm test
```
