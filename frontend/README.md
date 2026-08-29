# TaskFlow — Frontend

## Overview

TaskFlow is a modern and responsive task management frontend built using **HTML5, CSS3, and JavaScript**.

The frontend communicates with an **ASP.NET Core Web API** through REST API requests. The backend is built with **C#**, **Entity Framework Core**, and **SQLite**.

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* DOM Manipulation
* Responsive Design

### Backend Integration

* ASP.NET Core Web API
* C#
* REST API
* Entity Framework Core
* SQLite

---

## Project Structure

```text
Frontend/
│
├── index.html
├── styles.css
├── app.js
└── README.md
```

---

# Features

## Dashboard

The dashboard displays:

* Total Tasks
* Active Tasks
* Completed Tasks

The statistics are loaded dynamically from the backend API.

---

## Add Tasks

Users can create a new task by entering:

* Task title
* Priority

Available priorities:

* Low
* Medium
* High

The task is sent to the backend using a `POST` request and stored in the SQLite database.

---

## View Tasks

The application retrieves tasks from the backend using:

```http
GET /api/Tasks
```

Tasks are dynamically displayed in the task list.

---

## Update Tasks

The frontend communicates with the backend using the `PUT` endpoint to update task information.

```http
PUT /api/Tasks/{id}
```

The update functionality allows task data to remain synchronized with the backend database.

---

## Complete / Uncomplete Tasks

Users can click the checkbox to:

* Mark an active task as completed
* Return a completed task to active status

This functionality uses the `PUT` API endpoint.

---

## Delete Tasks

Users can delete tasks from the task list.

Before deletion, a custom confirmation toast is displayed.

After confirmation, the frontend sends:

```http
DELETE /api/Tasks/{id}
```

---

## Task Filters

Users can filter tasks by:

* All
* Active
* Completed

Filtering is handled on the frontend using JavaScript.

---

## Drag and Drop

Tasks can be dragged and reordered within the task list.

The interface provides a visual drag handle and drag-and-drop interaction.

---

# Toast Notifications

TaskFlow includes a custom toast notification system.

Toast messages are used for:

* Successful task creation
* Successful task completion
* Returning a task to active status
* Successful task update
* Successful task deletion
* Failed operations
* Delete confirmation

The toast notifications provide immediate feedback to the user without using browser alert dialogs.

---

# Responsive Design

The interface is responsive and adapts to:

* Desktop
* Tablet
* Mobile
* Small mobile screens

CSS media queries are used to adjust the layout according to the screen size.

---

# API Integration

The frontend communicates with the ASP.NET Core Web API using JavaScript `fetch()`.

The API base URL is:

```javascript
const API_BASE = "http://localhost:5037/api/Tasks";
```

---

# API Operations

The frontend uses the following REST API operations:

| Operation | HTTP Method | Purpose                 |
| --------- | ----------- | ----------------------- |
| Create    | POST        | Add a new task          |
| Read      | GET         | Load all tasks          |
| Update    | PUT         | Update task information |
| Delete    | DELETE      | Remove a task           |

---

## GET — Load Tasks

The frontend requests all tasks using:

```http
GET /api/Tasks
```

The returned data is stored in the frontend state and rendered dynamically.

---

## POST — Create Task

When the user submits the Add Task form, the frontend creates an object:

```javascript
const newTask = {
    title: title,
    priority: priority,
    isDone: false
};
```

The request is sent using:

```http
POST /api/Tasks
```

---

## PUT — Update Task

The frontend uses the update endpoint to modify an existing task:

```javascript
const updatedTask = {
    id: task.id,
    title: task.title,
    priority: priority,
    isDone: !task.isDone
};
```

The request is sent using:

```http
PUT /api/Tasks/{id}
```

---

## DELETE — Delete Task

After the user confirms deletion, the frontend sends:

```http
DELETE /api/Tasks/{id}
```

The task is then removed from the backend database.

---

# Frontend and Backend Architecture

```text
                         TaskFlow
                            │
             ┌──────────────┴──────────────┐
             │                             │
         Frontend                       Backend
             │                             │
     HTML + CSS + JS                ASP.NET Core
             │                         C# Web API
             │                             │
             │                        REST API
             │                             │
             └──────── HTTP ───────────────┘
                                           │
                                   Entity Framework Core
                                           │
                                           ▼
                                         SQLite
```

---

# Data Flow

```text
User
 │
 ▼
TaskFlow UI
 │
 ▼
JavaScript
 │
 ▼
Fetch API
 │
 ▼
ASP.NET Core Web API
 │
 ▼
TasksController
 │
 ▼
Entity Framework Core
 │
 ▼
SQLite Database
```

---

# Frontend Files

## `index.html`

Contains the structure of the TaskFlow interface, including:

* Sidebar
* Dashboard
* Statistics
* Task list
* Task filters
* Add Task form
* Footer

---

## `styles.css`

Contains the complete visual design, including:

* Colors
* Layout
* Sidebar
* Dashboard cards
* Task cards
* Buttons
* Priority badges
* Toast notifications
* Footer
* Responsive layouts

---

## `app.js`

Contains the main application logic, including:

* API communication
* GET requests
* POST requests
* PUT requests
* DELETE requests
* Task rendering
* Task filtering
* Dashboard statistics
* Add Task functionality
* Update functionality
* Complete / uncomplete functionality
* Delete confirmation
* Toast notifications
* Drag and drop
* HTML escaping

---

# Security

Task titles are escaped before being inserted into the HTML.

The frontend uses:

```javascript
escapeHtml()
```

to help prevent user-provided task titles from being interpreted as HTML.

---

# Running the Frontend

## 1. Start the Backend

Open the Backend project and run:

```bash
dotnet run
```

The API should be available at:

```text
http://localhost:5037
```

---

## 2. Start the Frontend

Open the `Frontend` folder using a local development server.

For example, using **VS Code Live Server**, open:

```text
index.html
```

The frontend communicates with:

```text
http://localhost:5037/api/Tasks
```

---

# Full-Stack Architecture

```text
Frontend
│
├── HTML5
├── CSS3
└── JavaScript
        │
        │ REST API
        ▼
Backend
│
├── ASP.NET Core Web API
└── C#
        │
        ▼
Entity Framework Core
        │
        ▼
SQLite
```

---

# Project Purpose

TaskFlow was developed as a full-stack web application to demonstrate:

* Frontend development
* Responsive UI design
* JavaScript programming
* DOM manipulation
* REST API integration
* CRUD operations
* Task management
* Toast notifications
* ASP.NET Core Web API
* C#
* Entity Framework Core
* SQLite
* Frontend and backend communication
* API testing
* Error handling

---

## Built With

**Frontend:** HTML5, CSS3 & JavaScript
**Backend:** ASP.NET Core & C#
**API:** REST API
**Database:** SQLite
**ORM:** Entity Framework Core
