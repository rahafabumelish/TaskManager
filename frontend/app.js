// ============================================================
// TASKFLOW — TASK MANAGER
// Frontend connected to ASP.NET Core Web API
// ============================================================


// ============================================================
// API
// ============================================================

const API_BASE =
    "http://localhost:5037/api/Tasks";


// ============================================================
// ELEMENTS
// ============================================================

const taskList =
    document.querySelector("#task-list");

const addForm =
    document.querySelector("#add-form");

const titleInput =
    document.querySelector("#title");

const priorityInput =
    document.querySelector("#priority");

const statusEl =
    document.querySelector("#status");

const totalCount =
    document.querySelector("#total-count");

const activeCount =
    document.querySelector("#active-count");

const doneCount =
    document.querySelector("#done-count");

const filterButtons =
    document.querySelectorAll(".filter-button");


// ============================================================
// APPLICATION STATE
// ============================================================

let tasks = [];

let currentFilter = "all";


// ============================================================
// API — GET ALL TASKS
// ============================================================

async function getTasks() {

    const response =
        await fetch(API_BASE);


    if (!response.ok) {

        throw new Error(
            `GET failed: ${response.status}`
        );

    }


    return await response.json();

}


// ============================================================
// API — GET SINGLE TASK
// ============================================================

async function getTask(id) {

    const response =
        await fetch(
            `${API_BASE}/${id}`
        );


    if (!response.ok) {

        throw new Error(
            `GET single task failed: ${response.status}`
        );

    }


    return await response.json();

}


// ============================================================
// API — CREATE TASK
// ============================================================

async function createTask(task) {

    const response =
        await fetch(
            API_BASE,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(task)

            }
        );


    if (!response.ok) {

        throw new Error(
            `POST failed: ${response.status}`
        );

    }


    return await response.json();

}


// ============================================================
// API — UPDATE TASK
// ============================================================

async function updateTask(task) {

    const response =
        await fetch(
            `${API_BASE}/${task.id}`,
            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify({

                        title:
                            task.title,

                        priority:
                            task.priority,

                        isDone:
                            task.isDone

                    })

            }
        );


    if (!response.ok) {

        throw new Error(
            `PUT failed: ${response.status}`
        );

    }

}


// ============================================================
// API — DELETE TASK
// ============================================================

async function deleteTask(id) {

    const response =
        await fetch(
            `${API_BASE}/${id}`,
            {

                method: "DELETE"

            }
        );


    if (!response.ok) {

        throw new Error(
            `DELETE failed: ${response.status}`
        );

    }

}


// ============================================================
// LOAD TASKS
// ============================================================

async function loadTasks() {

    try {

        statusEl.textContent =
            "Loading tasks...";

        statusEl.className =
            "status";


        tasks =
            await getTasks();


        updateStats();

        renderTasks();


        statusEl.textContent =
            `Connected to API • ${tasks.length} task(s)`;


    } catch (error) {

        console.error(error);


        statusEl.textContent =
            "Can't connect to the API. Make sure the backend is running.";

        statusEl.className =
            "status status-error";

    }

}


// ============================================================
// UPDATE STATISTICS
// ============================================================

function updateStats() {

    const total =
        tasks.length;


    const done =
        tasks.filter(
            task => task.isDone
        ).length;


    const active =
        total - done;


    if (totalCount) {

        totalCount.textContent =
            total;

    }


    if (activeCount) {

        activeCount.textContent =
            active;

    }


    if (doneCount) {

        doneCount.textContent =
            done;

    }

}


// ============================================================
// FILTER TASKS
// ============================================================

function getFilteredTasks() {

    if (currentFilter === "active") {

        return tasks.filter(
            task => !task.isDone
        );

    }


    if (currentFilter === "completed") {

        return tasks.filter(
            task => task.isDone
        );

    }


    return tasks;

}


// ============================================================
// RENDER TASKS
// ============================================================

function renderTasks() {

    const filteredTasks =
        getFilteredTasks();


    taskList.innerHTML =
        "";


    if (filteredTasks.length === 0) {

        taskList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ✓
                </div>

                <h3>
                    No tasks here
                </h3>

                <p>
                    There are no tasks matching this filter.
                </p>

                <a
                    href="#add"
                    class="empty-button">

                    Add a task

                </a>

            </div>

        `;

        return;

    }


    filteredTasks.forEach(
        task => {

            const card =
                createTaskCard(task);

            taskList.appendChild(card);

        }
    );

}


// ============================================================
// CREATE TASK CARD
// ============================================================

function createTaskCard(task) {

    const card =
        document.createElement("div");


    card.className =
        "task-card";


    if (task.isDone) {

        card.classList.add(
            "completed"
        );

    }


    // Drag & Drop

    card.draggable =
        true;


    card.dataset.id =
        task.id;


    const priority =
        task.priority || "Medium";


    const priorityClass =
        `priority-${priority.toLowerCase()}`;


    card.innerHTML = `

        <!-- Drag Handle -->

        <div class="drag-handle">
            ⋮⋮
        </div>


        <!-- Complete Button -->

        <button
            class="task-check"
            type="button"
            title="Mark task as complete">

            <span>
                ✓
            </span>

        </button>


        <!-- Task Information -->

        <div class="task-info">

            <div class="task-title">

                ${escapeHtml(task.title)}

            </div>


            <div class="task-state">

                ${
                    task.isDone
                        ? "Completed"
                        : "In progress"
                }

            </div>

        </div>


        <!-- Priority -->

        <span
            class="priority-badge ${priorityClass}">

            ${escapeHtml(priority)}

        </span>


        <!-- Edit -->

        <button
            class="btn-edit"
            type="button"
            title="Edit task">

            ✎

        </button>


        <!-- Delete -->

        <button
            class="btn-delete"
            type="button"
            title="Delete task">

            ✕

        </button>

    `;


    // ========================================================
    // COMPLETE / UNCOMPLETE
    // ========================================================

    const checkButton =
        card.querySelector(
            ".task-check"
        );


    checkButton.addEventListener(
        "click",
        async () => {

            const updatedTask = {

                id:
                    task.id,

                title:
                    task.title,

                priority:
                    priority,

                isDone:
                    !task.isDone

            };


            try {

                await updateTask(
                    updatedTask
                );


                showToast(

                    task.isDone
                        ? "Task marked as active."
                        : "Task completed successfully.",

                    "success"

                );


                await loadTasks();


            } catch (error) {

                console.error(error);


                showToast(
                    "Unable to update the task.",
                    "error"
                );

            }

        }
    );


    // ========================================================
    // EDIT
    // ========================================================

    const editButton =
        card.querySelector(
            ".btn-edit"
        );


    editButton.addEventListener(
        "click",
        () => {

            showEditModal(task);

        }
    );


    // ========================================================
    // DELETE
    // ========================================================

    const deleteButton =
        card.querySelector(
            ".btn-delete"
        );


    deleteButton.addEventListener(
        "click",
        () => {

            showDeleteConfirmation(
                task
            );

        }
    );


    // ========================================================
    // DRAG START
    // ========================================================

    card.addEventListener(
        "dragstart",
        () => {

            card.classList.add(
                "dragging"
            );

        }
    );


    // ========================================================
    // DRAG END
    // ========================================================

    card.addEventListener(
        "dragend",
        () => {

            card.classList.remove(
                "dragging"
            );

        }
    );


    // ========================================================
    // DRAG OVER
    // ========================================================

    card.addEventListener(
        "dragover",
        event => {

            event.preventDefault();


            const draggingCard =
                document.querySelector(
                    ".dragging"
                );


            if (
                !draggingCard ||
                draggingCard === card
            ) {

                return;

            }


            const rect =
                card.getBoundingClientRect();


            const middle =
                rect.top +
                rect.height / 2;


            if (
                event.clientY <
                middle
            ) {

                taskList.insertBefore(
                    draggingCard,
                    card
                );

            } else {

                taskList.insertBefore(
                    draggingCard,
                    card.nextSibling
                );

            }

        }
    );


    return card;

}


// ============================================================
// ADD TASK
// ============================================================

addForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const title =
            titleInput.value.trim();


        const priority =
            priorityInput.value;


        if (title === "") {

            showToast(
                "Please enter a task title.",
                "error"
            );

            return;

        }


        const newTask = {

            title:
                title,

            priority:
                priority,

            isDone:
                false

        };


        try {

            await createTask(
                newTask
            );


            addForm.reset();


            showToast(
                "Task added successfully.",
                "success"
            );


            await loadTasks();


            document
                .querySelector("#tasks")
                ?.scrollIntoView({

                    behavior:
                        "smooth"

                });


        } catch (error) {

            console.error(error);


            showToast(
                "Unable to create the task.",
                "error"
            );

        }

    }
);


// ============================================================
// FILTER BUTTONS
// ============================================================

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {


                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                renderTasks();

            }
        );

    }
);


// ============================================================
// EDIT MODAL
// ============================================================

function showEditModal(task) {

    removeExistingToast();


    const overlay =
        document.createElement("div");


    overlay.className =
        "edit-modal-overlay";


    overlay.innerHTML = `

        <div
            class="edit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-modal-title">


            <div class="edit-modal-header">

                <h3 id="edit-modal-title">
                    Edit Task
                </h3>


                <button
                    class="edit-modal-close"
                    type="button"
                    aria-label="Close">

                    ×

                </button>

            </div>


            <form class="edit-form">


                <div class="form-row">

                    <label for="edit-title">
                        Task title
                    </label>


                    <input
                        type="text"
                        id="edit-title"
                        maxlength="100"
                        value="${escapeHtml(task.title)}"
                        required>

                </div>


                <div class="form-row">

                    <label for="edit-priority">
                        Priority
                    </label>


                    <select
                        id="edit-priority"
                        required>

                        <option
                            value="Low"
                            ${
                                task.priority === "Low"
                                    ? "selected"
                                    : ""
                            }>

                            Low

                        </option>


                        <option
                            value="Medium"
                            ${
                                task.priority === "Medium"
                                    ? "selected"
                                    : ""
                            }>

                            Medium

                        </option>


                        <option
                            value="High"
                            ${
                                task.priority === "High"
                                    ? "selected"
                                    : ""
                            }>

                            High

                        </option>

                    </select>

                </div>


                <div class="edit-actions">


                    <button
                        type="button"
                        class="edit-cancel">

                        Cancel

                    </button>


                    <button
                        type="submit"
                        class="edit-save">

                        Save Changes

                    </button>


                </div>


            </form>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    requestAnimationFrame(
        () => {

            overlay.classList.add(
                "show"
            );

        }
    );


    const modal =
        overlay.querySelector(
            ".edit-modal"
        );


    const closeButton =
        overlay.querySelector(
            ".edit-modal-close"
        );


    const cancelButton =
        overlay.querySelector(
            ".edit-cancel"
        );


    const form =
        overlay.querySelector(
            ".edit-form"
        );


    const editTitle =
        overlay.querySelector(
            "#edit-title"
        );


    const editPriority =
        overlay.querySelector(
            "#edit-priority"
        );


    // ========================================================
    // CLOSE MODAL
    // ========================================================

    function closeModal() {

        overlay.classList.remove(
            "show"
        );


        setTimeout(
            () => {

                if (
                    overlay.parentElement
                ) {

                    overlay.remove();

                }

            },
            250
        );

    }


    closeButton.addEventListener(
        "click",
        closeModal
    );


    cancelButton.addEventListener(
        "click",
        closeModal
    );


    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function escapeHandler(event) {

            if (
                event.key === "Escape"
            ) {

                closeModal();

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }

        }
    );


    // ========================================================
    // SAVE UPDATED TASK
    // ========================================================

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const newTitle =
                editTitle.value.trim();


            const newPriority =
                editPriority.value;


            if (newTitle === "") {

                showToast(
                    "Please enter a task title.",
                    "error"
                );

                return;

            }


            const updatedTask = {

                id:
                    task.id,

                title:
                    newTitle,

                priority:
                    newPriority,

                isDone:
                    task.isDone

            };


            const saveButton =
                form.querySelector(
                    ".edit-save"
                );


            saveButton.disabled =
                true;


            saveButton.textContent =
                "Saving...";


            try {

                await updateTask(
                    updatedTask
                );


                closeModal();


                showToast(
                    "Task updated successfully.",
                    "success"
                );


                await loadTasks();


            } catch (error) {

                console.error(error);


                saveButton.disabled =
                    false;


                saveButton.textContent =
                    "Save Changes";


                showToast(
                    "Unable to update the task.",
                    "error"
                );

            }

        }
    );


    editTitle.focus();

}


// ============================================================
// DELETE CONFIRMATION
// ============================================================

function showDeleteConfirmation(task) {

    removeExistingToast();


    const toast =
        document.createElement("div");


    toast.className =
        "toast toast-confirm";


    toast.innerHTML = `

        <div class="toast-icon toast-warning-icon">
            !
        </div>


        <div class="toast-content">

            <strong>
                Delete task?
            </strong>


            <p>
                ${escapeHtml(task.title)}
            </p>

        </div>


        <div class="toast-actions">


            <button
                class="toast-cancel"
                type="button">

                Cancel

            </button>


            <button
                class="toast-delete"
                type="button">

                Delete

            </button>


        </div>

    `;


    document.body.appendChild(
        toast
    );


    requestAnimationFrame(
        () => {

            toast.classList.add(
                "show"
            );

        }
    );


    const cancelButton =
        toast.querySelector(
            ".toast-cancel"
        );


    const deleteButton =
        toast.querySelector(
            ".toast-delete"
        );


    cancelButton.addEventListener(
        "click",
        () => {

            removeToast(
                toast
            );

        }
    );


    deleteButton.addEventListener(
        "click",
        async () => {


            deleteButton.disabled =
                true;


            deleteButton.textContent =
                "Deleting...";


            try {

                await deleteTask(
                    task.id
                );


                removeToast(
                    toast
                );


                showToast(
                    `"${task.title}" deleted successfully.`,
                    "success"
                );


                await loadTasks();


            } catch (error) {

                console.error(error);


                removeToast(
                    toast
                );


                showToast(
                    "Unable to delete the task.",
                    "error"
                );

            }

        }
    );

}


// ============================================================
// TOAST MESSAGE
// ============================================================

function showToast(
    message,
    type = "success"
) {


    removeExistingToast();


    const toast =
        document.createElement("div");


    toast.className =
        `toast toast-${type}`;


    const icon =
        type === "success"
            ? "✓"
            : "✕";


    toast.innerHTML = `

        <div class="toast-icon">

            ${icon}

        </div>


        <div class="toast-message">

            ${escapeHtml(message)}

        </div>


        <button
            class="toast-close"
            type="button">

            ×

        </button>

    `;


    document.body.appendChild(
        toast
    );


    requestAnimationFrame(
        () => {

            toast.classList.add(
                "show"
            );

        }
    );


    const closeButton =
        toast.querySelector(
            ".toast-close"
        );


    closeButton.addEventListener(
        "click",
        () => {

            removeToast(
                toast
            );

        }
    );


    setTimeout(
        () => {

            removeToast(
                toast
            );

        },
        3000
    );

}


// ============================================================
// REMOVE EXISTING TOAST
// ============================================================

function removeExistingToast() {

    const existingToast =
        document.querySelector(
            ".toast"
        );


    if (existingToast) {

        existingToast.remove();

    }

}


// ============================================================
// REMOVE TOAST
// ============================================================

function removeToast(toast) {

    if (!toast) {

        return;

    }


    toast.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            if (
                toast.parentElement
            ) {

                toast.remove();

            }

        },
        300
    );

}


// ============================================================
// HTML SAFETY
// ============================================================

function escapeHtml(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


// ============================================================
// START APPLICATION
// ============================================================

loadTasks();