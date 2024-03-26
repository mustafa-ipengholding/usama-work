# Employee CRUD Project Documentation

## Overview
The Employee CRUD project is a web application developed to perform CRUD (Create, Read, Update, Delete) operations on employee records. It is built using Node.js with Express for the backend, MongoDB for data storage, and React.js with React-Bootstrap for the frontend. Redux is employed for state management in the React frontend to efficiently manage API responses.

## Features
- **Create**: Add new employee records with details such as first name, last name, department, email, address, phone, and image.
- **Read**: View a single employee's details or retrieve a list of all employees.
- **Update**: Modify existing employee records with updated information.
- **Delete**: Remove employee records from the system.
- **Pagination**: Employed pagination for efficiently managing large datasets on the frontend listing page.

## Backend
The backend of the project comprises RESTful APIs built with Node.js and Express. These APIs are responsible for handling CRUD operations on employee data stored in MongoDB. The backend follows a structured approach to ensure maintainability and scalability.

### API Endpoints
- **GET /api/employees**: Retrieve a list of all employees.
- **GET /api/employees/:id**: Retrieve details of a single employee by ID.
- **POST /api/employees**: Create a new employee record.
- **PUT /api/employees/:id**: Update details of an existing employee by ID.
- **DELETE /api/employees/:id**: Delete an employee record by ID.

## Frontend
The frontend of the project is developed using React.js with React-Bootstrap for UI components. Redux is utilized for state management, ensuring a predictable state container for managing API responses efficiently.

### Components
- **Employee Form**: Component to create and update employee records.
- **Employee List**: Component to display a paginated list of employees.
- **Pagination**: Component for navigating through pages of employee records.

## Data Model
The employee data model consists of the following fields:
- **firstName**: First name of the employee.
- **lastName**: Last name of the employee.
- **department**: Department in which the employee works.
- **email**: Email address of the employee.
- **address**: Address of the employee.
- **phone**: Contact phone number of the employee.
- **image**: Profile image of the employee.

## Installation and Setup
To run the Employee CRUD project locally, follow these steps:

1. Clone the repository from [GitHub Repository URL](#).
2. Navigate to the backend directory and install dependencies using `npm install`.
3. Set up a MongoDB database and configure the connection string in the backend `.env` file.
4. Start the backend server using `npm start`.
5. Navigate to the frontend directory and install dependencies using `npm install`.
6. Start the frontend server using `npm start`.
7. Access the application in your browser at `http://localhost:3000`.

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, React-Bootstrap, Redux
- **State Management**: Redux
- **Other Tools**: Git, npm

