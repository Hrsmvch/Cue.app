# Cue.app Project

Cue.app is a modern web application built with React and Vite, designed to deliver a fast, responsive, and dynamic user experience. This project leverages powerful libraries and tools like Redux Toolkit, Formik, and Chart.js to streamline state management, form handling, and data visualization. This README will help you understand the project structure, how to set it up, and how to get started.
 
## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Updating Package Versions](#updating-package-versions) 

## Getting Started

### Node.js Version

This project requires Node.js version 16.4.5. Make sure you have Node.js installed, preferably using the LTS (Long Term Support) version. You can download Node.js from [the official website](https://nodejs.org/).

#### Changing Node.js Version

If you need to change the Node.js version for this project, you can use a version manager like [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm).

1. If you don't have nvm installed, follow the instructions in the [nvm repository](https://github.com/nvm-sh/nvm#install--update-script) to install it.

   Once installed, you can install and use Node.js version 16.4.5 with the following commands:

   ```bash
   nvm install 16.4.5
   nvm use 16.4.5

Ensure that you have the appropriate permissions to install global packages and switch Node.js versions on your system.

### First Setup

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Install dependencies:

   ```bash
   cd project-directory
   npm install

3. Run the development server:

   ```bash
   npm run dev

Open [http://localhost:5173](http://localhost:5173) to view the project in your browser.

###


## Project Structure

The project structure is organized as follows:

cue.app/
├── src/          # Application source code
│   ├── assets/   # Static assets like images and fonts
│   ├── components/ # Reusable components
│   ├── data/     # Constants and data
│   ├── features/ # Feature-specific code
│   ├── hooks/    # Custom React hooks
│   ├── layouts/  # Layout components
│   ├── pages/    # Page components for routing
│   ├── services/ # API slices and service logic
│   ├── utils/    # Utility functions
├── public/       # Static assets
├── package.json  # Project dependencies and scripts
├── vite.config.js # Vite configuration

## Available Scripts

In the project directory, you can run the following scripts:

`npm run dev`: Runs the development server.

`npm run build`: Builds the production application.

`npm start`: Starts the production server. 

`npm run lint`: Runs ESLint to check for linting errors. 

## Deployment

Deploys are automatically trigged on merges to main and during the pull request and review process. Merges to the main branch will be automatically deployed to the production environment. (in progress..)

## Updating Package Versions

As a developer, it's essential to keep package versions up-to-date to ensure compatibility and security. To update package versions:

1. Review the package.json file to identify outdated packages and their current versions.

2. Use the following command to check for outdated packages:

   ```bash
   npm outdated

3. To update a specific package to its latest version, use the following command:

   ```bash
   npm update <package-name>

Replace <package-name> with the name of the package you want to update.

4. After updating packages, ensure that the application still runs correctly by testing it locally.
