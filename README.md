# YouTube with Distraction-Free Mode

This project is a YouTube clone. It features a "Distraction-Free Mode" that allows users to toggle the visibility of home page videos and related videos for a more focused viewing experience.

## Features

- **Distraction-Free Mode**: When enabled, the home page videos and related videos of a playing video are hidden. When disabled, the full YouTube experience is available.
- **Search and Play Videos**: Search for videos using the YouTube API and play them directly within the app.
- **Responsive Design**: The application is fully responsive and works seamlessly on various screen sizes.

## Getting Started

Follow the instructions below to clone and run the project on your local machine.

### Prerequisites

- **Node.js** and **pnpm** should be installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/msaadi3/youtube2.0
   ```

2. Navigate to the project directory:

   ```bash
   cd youtube2.0
   ```

3. Install dependencies using pnpm:

   ```bash
   pnpm i
   ```

4. API KEY:

- Visit [RapidAPI](https://rapidapi.com/).
- Create an account or sign in if you already have one.
- Subscribe to the Youtube v3 API

5. Set Up API Key:

- Copy the API key provided by RapidAPI after subscribing.
- Create a `.env` file in the root directory of your project.
- Paste the API key into the `.env` file using the following format.

```
VITE_RAPID_API_KEY = your_api_key_here
```

- **Note:** Make sure to replace `your_api_key_here` with the actual API key you copied from RapidAPI.

6. Start the development server:

   ```bash
   pnpm dev
   ```

7. Open your browser and go to http://localhost:port to view the app.

## Usage

- **Toggle Distraction-Free Mode:** Use the toggle button in the navigation bar to switch between distraction-free mode and the full YouTube experience.
- **Search for Videos:** Use the search bar to find and watch videos.
- **Scroll for More:** When distraction-free mode is disabled, scroll down to load more videos on the home page or view related videos while watching.
