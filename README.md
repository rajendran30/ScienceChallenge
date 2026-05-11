# Biology Science Challenge Quiz

An interactive Next.js web application for biology quizzes, designed to engage students with drag-and-drop answers, timers, and randomized questions.

## Features

- **Interactive Quiz**: 10 randomly selected questions from a pool of biology topics.
- **Drag-and-Drop Interface**: Drag answers onto image circles for a unique interaction.
- **Timer**: 10-minute countdown (1 minute per question) with auto-end on timeout.
- **Scoring and Feedback**: Percentage-based scoring with explanations and hyperlinks to resources.
- **Responsive Design**: Works on desktop screens with a clean, green-themed UI.
- **Randomization**: New set of questions on each restart to maintain engagement.

## Prerequisites

- **Node.js**: Version 18 or higher (check with `node -v`)
- **npm**: Comes with Node.js (check with `npm -v`)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd science-challenge-quiz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

- Click "Start Quiz" to begin the timer and quiz.
- Drag answer options onto the image circle.
- Navigate using Previous/Next buttons.
- View results at the end with explanations and links to Wikipedia for further reading.
- Restart for a new random set of questions.

## Building for Production

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/`: Next.js app directory with pages and styles.
- `data/questions.json`: JSON file containing the question pool.
- `public/images/`: SVG images for questions.
- `requirements.md`: Detailed project requirements.

## Technologies Used

- **Next.js**: React framework for web apps.
- **React**: UI library with hooks for state management.
- **TypeScript**: For type safety.
- **CSS**: Custom styles for responsive design.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit changes.
4. Push and create a pull request.

## License

This project is private and for educational purposes.