![Louder Banner](https://via.placeholder.com/1200x200/007bff/ffffff?text=Louder+-+AI+Powered+Event+Planner)

# Louder

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/nitindogra7/assignment/actions)
[![Coverage Status](https://img.shields.io/badge/coverage-N%2FA-lightgrey)](https://github.com/nitindogra7/assignment/actions)
[![npm version](https://img.shields.io/badge/version-0.0.0-blue)](https://www.npmjs.com/package/louder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered event planning assistant that generates structured venue recommendations based on natural language prompts.

## 🚀 Overview

Louder is a full-stack application designed to revolutionize event planning by leveraging the power of Artificial Intelligence. Users can describe their event requirements in natural language, and Louder, powered by Google Gemini, will generate comprehensive, structured JSON recommendations for suitable venues, complete with details like cost, amenities, and image suggestions. This project aims to simplify the initial venue scouting phase, providing quick and tailored suggestions for various event types, with a focus on realistic Indian locations and pricing.

**Key Value Proposition:**
*   **Instant Venue Suggestions:** Get detailed event venue recommendations in seconds.
*   **Structured Data:** Receive AI output in a clean, parseable JSON format.
*   **Localized Recommendations:** Focus on realistic Indian locations and INR pricing.
*   **Streamlined Planning:** Reduce the manual effort in finding suitable event locations.

**Target Audience:** Event organizers, wedding planners, corporate event managers, or anyone looking to plan an event efficiently.

**Current Status:** This project is currently in an early development phase (v0.0.0), demonstrating core AI integration and basic client-server functionality.

## ✨ Features

*   **AI-Powered Event Generation:** Utilizes Google Gemini's `gemini-3-flash-preview` model to interpret user prompts and generate event venue details.
*   **Structured JSON Output:** AI responses are strictly formatted into a JSON object containing:
    *   `name`: Venue name
    *   `location`: City, State
    *   `cost`: Total estimated cost (number)
    *   `perPerson`: Cost per person (number)
    *   `days`: Number of days for the event (number)
    *   `amenities`: Array of strings (e.g., "WiFi", "Pool")
    *   `images`: Exactly two Unsplash-style image URLs
    *   `description`: Detailed description of why the venue fits the requirements (minimum 500 words).
*   **Input Validation:** Basic server-side validation ensures prompts are descriptive enough for the AI.
*   **Client-Side Interface:** A modern, responsive user interface built with React and TailwindCSS for seamless interaction.
*   **Robust Error Handling:** Includes mechanisms to catch and report errors from the AI model or invalid responses.

## 🛠️ Tech Stack

### Client-Side
*   **React 19:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool that provides an instant development server and bundles your code.
*   **TailwindCSS 4:** A utility-first CSS framework for rapidly building custom designs.
*   **Lucide React:** A beautiful, customizable icon library for React.
*   **ESLint:** For maintaining code quality and consistency.

### Server-Side
*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **Mongoose:** MongoDB object data modeling (ODM) for Node.js (intended for database interaction).
*   **Google Generative AI SDK (`@google/generative-ai`):** Official library for interacting with Google's Gemini models.
*   **Dotenv:** For loading environment variables from a `.env` file.
*   **CORS:** Middleware for enabling Cross-Origin Resource Sharing.
*   **Body-parser:** Node.js body parsing middleware.
*   **Nodemon:** A tool that helps develop Node.js based applications by automatically restarting the node application when file changes are detected.

### Database
*   **MongoDB:** A NoSQL, document-oriented database.

## 🏗️ Architecture

Louder follows a client-server architecture with a clear separation of concerns.

### High-Level System Design
The frontend (React) communicates with the backend (Node.js/Express) via RESTful API calls. The backend then interacts with the Google Gemini API to process user requests and generate event recommendations. While a MongoDB database is configured, the current AI generation logic directly returns the AI output to the client.

```
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|  Client (React)   |<----->|  Server (Express) |<----->| Google Gemini API |
|                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+
                                     |
                                     | (Mongoose - intended for persistence)
                                     v
                           +-------------------+
                           |                   |
                           |    MongoDB        |
                           |                   |
                           +-------------------+
```

### Directory Structure

```
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   │   ├── components/     # Reusable React components
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point for React app
│   └── package.json        # Client dependencies and scripts
└── server/                 # Backend Node.js application
    ├── config/             # Configuration files
    │   └── db.js           # Database connection setup
    ├── controllers/        # Request handling logic
    │   └── event.controllers.js # Handles event-related API requests
    ├── model/              # Database models (Mongoose schemas)
    │   └── event.module.js # Event schema definition
    ├── routes/             # API route definitions
    │   └── event.routes.js # Defines event-related API endpoints
    ├── services/           # Business logic and external API integrations
    │   └── event.services.js # Contains Google Gemini integration logic
    ├── server.js           # Main server entry point
    └── package.json        # Server dependencies and scripts
```

### Key Components & Data Flow

1.  **Client (React):**
    *   User inputs an event prompt into the UI.
    *   The prompt is sent as a `POST` request to the backend API.
    *   The client displays the AI-generated event recommendation.

2.  **Server (Node.js/Express):**
    *   `server.js`: Initializes the Express application, connects to MongoDB (via `config/db.js`), and registers API routes.
    *   `routes/event.routes.js`: Defines the `/api/event/generate` endpoint.
    *   `controllers/event.controllers.js`: Receives the user prompt from the client, performs basic validation, and calls `event.services.js`.
    *   `services/event.services.js`:
        *   Constructs a detailed prompt for the Google Gemini API, including strict formatting rules for the desired JSON output.
        *   Sends the prompt to the `gemini-3-flash-preview` model.
        *   Parses the AI's text response into a JSON object.
        *   Performs basic validation on the AI's JSON output.
        *   Returns the structured event data or an error.
    *   `model/event.module.js`: Defines the Mongoose schema for events, though not actively used for persistence in the current AI generation flow.

## 🏁 Getting Started

Follow these instructions to set up and run Louder on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: v18.x or higher (LTS recommended)
*   **npm** or **Yarn**: Package manager (npm comes with Node.js)
*   **MongoDB**: A running instance of MongoDB, either locally or a cloud service like MongoDB Atlas.
*   **Google Gemini API Key**: Obtain a key from the [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**

    bash
    git clone https://github.com/nitindogra7/assignment.git
    cd assignment
    

2.  **Install Server Dependencies:**

    bash
    cd server
    npm install
    

3.  **Install Client Dependencies:**

    bash
    cd ../client
    npm install
    

### Configuration

1.  **Create `.env` file for the server:**
    Navigate to the `server/` directory and create a file named `.env`.

    bash
    cd ../server
    touch .env
    

2.  **Add environment variables:**
    Populate the `.env` file with your configuration details:

    env
    # Server Port
    PORT=5000

    # MongoDB Connection URI
    # Example for local MongoDB: mongodb://localhost:27017/louderdb
    # Example for MongoDB Atlas: mongodb+srv://<user>:<password>@<cluster-url>/louderdb?retryWrites=true&w=majority
    MONGO_URI=your_mongodb_connection_string

    # Google Gemini API Key
    GEMINI_KEY=your_google_gemini_api_key
    
    Replace `your_mongodb_connection_string` and `your_google_gemini_api_key` with your actual values.

## 🚀 Usage

### Starting the Application

1.  **Start the Server:**
    From the `server/` directory:

    bash
    npm run dev
    # Or if you don't have nodemon installed globally:
    # npx nodemon server.js
    
    The server will start on the port specified in your `.env` file (default: `5000`).

2.  **Start the Client:**
    From the `client/` directory:

    bash
    npm run dev
    
    The client application will open in your browser, typically at `http://localhost:5173`.

### Interacting with the UI

1.  Open your web browser and navigate to the client URL (e.g., `http://localhost:5173`).
2.  You will see an input field where you can describe your event.
3.  Enter a detailed prompt, including budget, number of people, desired location, and event duration.
    *   **Example Prompt:** "I want to plan a 3-day corporate retreat for 100 employees in Bangalore with a budget of 3 lakhs. We need a conference hall, good food, and recreational activities like a pool."
4.  Submit the prompt. The AI-generated event venue recommendation will be displayed on the screen.

## 🧑‍💻 Development

### Setting up Development Environment

*   Ensure all dependencies are installed for both client and server.
*   Use `npm run dev` in both `client/` and `server/` directories for hot-reloading during development.

### Running Tests

Currently, there are no dedicated test suites implemented for this project. Contributions for adding unit and integration tests are welcome!

### Code Style Guidelines

*   **Client (React):** Uses ESLint for code linting. Ensure your code adheres to the configured rules. You can run `npm run lint` in the `client/` directory to check for issues.
*   **Server (Node.js):** Follows standard JavaScript best practices.

### Debugging Tips

*   **Client:** Use your browser's developer tools (Console, Network, Components tab for React).
*   **Server:** Use `console.log()` statements for quick debugging. For more advanced debugging, consider Node.js's built-in debugger or tools like VS Code's debugger.

## ☁️ Deployment

To deploy Louder to a production environment:

1.  **Build the Client:**
    In the `client/` directory:

    bash
    npm run build
    

    This will create a `dist/` directory containing the optimized production build of your React app.

2.  **Configure Vercel (for client):**
    If deploying the client to Vercel, ensure the `client/vercel.json` file is present. This file configures Vercel to correctly handle client-side routing by redirecting all non-API requests to `index.html` and to proxy API requests (e.g., `/api/*`) to your backend.

3.  **Serve Static Files:**
    Configure your Node.js server (or a web server like Nginx/Apache) to serve the static files from the `client/dist` directory. You might need to add middleware to your Express server to serve static assets.

4.  **Run the Server in Production Mode:**
    Ensure your `.env` variables are correctly set for the production environment.
    In the `server/` directory:

    bash
    node server.js
    

    For continuous operation, consider using process managers like PM2 or deploying to cloud platforms like Heroku, Vercel (for client), or AWS/GCP/Azure (for server and database).

## 📞 API Documentation

The backend exposes a single primary API endpoint for event generation.

### `POST /api/event/generate`

Generates an event venue recommendation based on a user prompt.

*   **URL:** `/api/event/generate`
*   **Method:** `POST`
*   **Request Body:**
    
    
    {
      "prompt": "I need a venue for a 2-day wedding reception for 200 guests in Delhi, budget around 5 lakhs, with catering and decor included."
    }
    
    
*   **Response (Success - 200 OK):**
    
    
    {
      "name": "The Grand Imperial",
      "location": "Delhi, India",
      "cost": 500000,
      "perPerson": 2500,
      "days": 2,
      "amenities": ["Catering", "Decor", "Ballroom", "Parking", "Accommodation"],
      "images": [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
      ],
      "description": "The Grand Imperial in Delhi is an exquisite choice for your 2-day wedding reception, perfectly accommodating 200 guests within your 5 lakh budget. This opulent venue boasts a magnificent ballroom, ideal for grand celebrations, alongside ample parking facilities for all your attendees. The package includes comprehensive catering services, offering a diverse menu that can be customized to suit your preferences and cultural requirements. Furthermore, the venue provides elegant decor services, ensuring a breathtaking ambiance that aligns with your wedding theme. For guests traveling from afar, comfortable accommodation options are available, making it a convenient and luxurious choice for a memorable event. The location in Delhi offers excellent connectivity, making it easily accessible for local and out-of-town guests. The dedicated event management team at The Grand Imperial will work closely with you to ensure every detail is meticulously planned and executed, from the seating arrangements to the lighting and floral decorations. Their expertise guarantees a seamless and stress-free experience, allowing you to fully enjoy your special day. The venue's reputation for exceptional service and its ability to host large-scale events with grace and efficiency make it a top contender for your wedding reception. The spacious interiors and sophisticated design provide a perfect backdrop for wedding photography, capturing every precious moment. Choosing The Grand Imperial ensures a truly grand and unforgettable start to your married life."
    }
    
    
*   **Response (Error - 400 Bad Request):**
    
    
    {
      "error": "Please write more than 40 characters and include budget, days, location and people"
    }
    
    
*   **Response (Error - 500 Internal Server Error):**
    
    
    {
      "error": "Failed to generate event"
    }
    
## 🤝 Contributing

We welcome contributions to Louder! If you're interested in improving the project, please follow these guidelines:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/issue-description`.
3.  **Make your changes.**
4.  **Commit your changes** with a clear and concise message: `git commit -m "feat: Add new AI prompt validation"`
5.  **Push your branch** to your forked repository: `git push origin feature/your-feature-name`.
6.  **Open a Pull Request** to the `main` branch of the original repository.

### Development Workflow

*   Ensure your code passes ESLint checks for the client.
*   Provide clear documentation for any new features or changes.
*   If adding new features, consider adding corresponding tests.

## ⁉️ Troubleshooting

*   **`GEMINI_KEY` or `MONGO_URI` not found:** Double-check your `server/.env` file. Ensure variable names are correct and values are provided.
*   **"Failed to generate event" error:** This usually indicates an issue with the Google Gemini API call.
    *   Verify your `GEMINI_KEY` is valid and has access to the `gemini-3-flash-preview` model.
    *   Check your internet connection.
    *   Review the server console for more specific Gemini API errors.
*   **Client not connecting to server:**
    *   Ensure both client and server are running.
    *   Check the server's port in `server/.env` and ensure the client is configured to call the correct backend URL (usually `http://localhost:5000`).
*   **MongoDB connection issues:**
    *   Ensure your MongoDB instance is running.
    *   Verify your `MONGO_URI` in `server/.env` is correct, especially for cloud-based instances (e.g., Atlas connection string).

If you encounter persistent issues, please open an issue on the [GitHub Issues page](https://github.com/nitindogra7/assignment/issues).

## 🗺️ Roadmap

*   **User Authentication:** Implement user registration and login.
*   **Save & Manage Events:** Allow users to save generated event plans and manage them.
*   **Advanced AI Customization:** Provide more options for users to fine-tune AI generation parameters.
*   **Database Integration:** Persist generated event data in MongoDB.
*   **Enhanced UI/UX:** Improve the user interface with more interactive elements and visual feedback.
*   **Multi-language Support:** Extend AI capabilities to support prompts and generate responses in multiple languages.

## 📄 License & Credits

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contributors

*   [nitindogra7](https://github.com/nitindogra7) - Initial work

### Acknowledgments

*   **Google Gemini API:** For providing the powerful AI capabilities.
*   **React:** For the excellent frontend framework.
*   **Express.js:** For the robust backend framework.
*   **MongoDB:** For the flexible NoSQL database.
*   **TailwindCSS:** For simplifying styling and design.
*   **Vite:** For the fast development experience.
*   **Lucide React:** For the beautiful icon set.