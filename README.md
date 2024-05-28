# Star Wars People and Vehicles App

## Overview

This is a single-page application (SPA) built with React.js that displays a list of people from the Star Wars universe and details about their vehicles. The data is fetched from the Star Wars API (SWAPI).

## Features

- **People List**: Displays a list of users with information including name, height, mass, gender, and edited date.
- **Vehicle Dialog**: A popup displaying detailed information about a user's vehicles.
- **Filtering**: Server-side filtering of users by name.
- **Unit Testing**: Jest is used for unit testing to ensure code quality and functionality.
- **Linting and Formatting**: ESLint and Prettier are used to maintain code quality and formatting.

## Technologies Used

- **JavaScript ES6**
- **React.js**
- **Redux Toolkit**
- **Material-UI (MUI)**
- **ESLint**
- **Prettier**
- **Jest**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/brainstormbuddy/swapi-vehicles.git
   cd swapi-vehicles
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Application

To start the development server, run:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

To build the app for production, run:

```bash
npm run build
```

The build folder will contain the production-ready files.

## Testing

To run the tests, use:

```bash
npm test
```

## Linting and Formatting

To check for linting errors, run:

```bash
npm run lint
```

To format the code using Prettier, run:

```bash
npm run format
```

## API Endpoints

- **People API**: `https://swapi.dev/api/people`
- **Vehicle API**: `http://swapi.co/api/vehicles/{vehicleId}/`

## Application Structure

- **Components**:
  - `PeopleList`: Displays a list of people with the required information and a button to show vehicles.
  - `VehiclesDialog`: Displays detailed information about a user's vehicles in a popup.
- **Redux**:
  - `peopleSlice`: Manages the state of the user list and handles server-side filtering.
  - `vehiclesSlice`: Manages the state of the vehicle details.
- **Utilities**:
  - API utility functions for fetching data from the SWAPI.

## License

This project is licensed under the MIT License.

---

Feel free to reach out if you have any questions or need further assistance. Enjoy exploring the Star Wars universe with this app!