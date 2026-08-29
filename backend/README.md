# TaskFlow — Backend

TaskFlow is a simple Task Management application built with **ASP.NET Core Web API**, **C#**, and **SQLite**.

The backend provides a RESTful API for creating, retrieving, updating, and deleting tasks.

---

## Technologies Used

* C#
* ASP.NET Core Web API
* Entity Framework Core
* SQLite
* REST API
* Swagger / OpenAPI
* CORS

---

## Project Structure

```text
Backend/
│
├── Controllers/
│   └── TasksController.cs
│
├── Data/
│   └── AppDbContext.cs
│
├── Dtos/
│   └── TaskDto.cs
│
├── Models/
│   └── Task.cs
│
├── Migrations/
│
├── Properties/
│
├── appsettings.json
├── Program.cs
├── requests.http
└── TaskManagerApi.csproj
```

---

## Features

The API supports full CRUD operations:

* Get all tasks
* Get a single task
* Create a task
* Update a task
* Delete a task
* Mark a task as completed or active
* Store tasks in a SQLite database
* CORS support for the frontend
* Swagger API documentation
* Global exception handling

---

## Task Model

Each task contains:

```text
Id
Title
Priority
IsDone
```

Example:

```json
{
  "id": 1,
  "title": "Complete TaskFlow project",
  "priority": "High",
  "isDone": false
}
```

---

# API Endpoints

## GET — Get All Tasks

```http
GET /api/Tasks
```

Returns all tasks.

---

## GET — Get Task By ID

```http
GET /api/Tasks/{id}
```

Example:

```http
GET /api/Tasks/1
```

Returns a specific task by its ID.

---

## POST — Create Task

```http
POST /api/Tasks
```

Request body:

```json
{
  "title": "Learn ASP.NET Core",
  "priority": "High",
  "isDone": false
}
```

Creates a new task and stores it in the SQLite database.

---

## PUT — Update Task

```http
PUT /api/Tasks/{id}
```

Example:

```http
PUT /api/Tasks/1
```

Request body:

```json
{
  "title": "Learn ASP.NET Core",
  "priority": "High",
  "isDone": true
}
```

This endpoint is used to update an existing task, including changing its completion status.

---

## DELETE — Delete Task

```http
DELETE /api/Tasks/{id}
```

Example:

```http
DELETE /api/Tasks/1
```

Deletes the specified task from the database.

---

# Database

The application uses **SQLite** with **Entity Framework Core**.

The database stores all task data and is accessed through:

```text
AppDbContext
```

The database connection string is configured in:

```text
appsettings.json
```

---

# CORS

The backend allows requests from the frontend using the CORS policy:

```text
AllowFrontend
```

The policy allows:

* Any origin
* Any HTTP method
* Any HTTP header

This allows the HTML, CSS, and JavaScript frontend to communicate with the ASP.NET Core API.

---

# Swagger / OpenAPI

Swagger is enabled during development to test and document the API.

After running the backend, open:

```text
http://localhost:5037/swagger
```

Swagger can be used to test all CRUD endpoints.

---

# Running the Backend

Navigate to the Backend folder and run:

```bash
dotnet restore
```

Then:

```bash
dotnet run
```

The API will run on:

```text
http://localhost:5037
```

Swagger will be available at:

```text
http://localhost:5037/swagger
```

---

# Frontend Connection

The frontend communicates with the API using:

```javascript
const API_BASE = "http://localhost:5037/api/Tasks";
```

The frontend uses the following operations:

```text
GET     → Load tasks
POST    → Add task
PUT     → Update task
DELETE  → Delete task
```

---

# Error Handling

The backend includes:

* Database error handling
* Invalid operation handling
* General exception handling
* Global exception handling

The API uses HTTP status codes such as:

```text
200 OK
201 Created
204 No Content
404 Not Found
500 Internal Server Error
```

---

# API Testing

API requests can also be tested using the included:

```text
requests.http
```

This file contains sample requests for the TaskFlow API, including:

* GET all tasks
* GET task by ID
* POST task
* PUT task
* DELETE task

---

# Backend Architecture

```text
Client / Frontend
       │
       │ HTTP Requests
       ▼
ASP.NET Core Web API
       │
       ▼
TasksController
       │
       ▼
AppDbContext
       │
       ▼
Entity Framework Core
       │
       ▼
SQLite Database
```

---

# Project Purpose

The TaskFlow backend was developed to demonstrate:

* ASP.NET Core Web API development
* C# programming
* RESTful API design
* CRUD operations
* Entity Framework Core
* SQLite database integration
* DTO usage
* CORS configuration
* Error handling
* Swagger / OpenAPI
* Frontend and backend integration

---

## Built With

**Language:** C#
**Framework:** ASP.NET Core Web API
**ORM:** Entity Framework Core
**Database:** SQLite
**API:** REST API
**Documentation:** Swagger / OpenAPI
