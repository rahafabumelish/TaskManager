using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerApi.Data;
using TaskManagerApi.Dtos;

namespace TaskManagerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskManagerApi.Models.Task>>> GetTasks()
    {
        try
        {
            return await _context.Tasks.ToListAsync();
        }
        catch (InvalidOperationException)
        {
            return StatusCode(500, "A database operation was invalid.");
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while retrieving tasks.");
        }
    }

    // GET: api/Tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskManagerApi.Models.Task>> GetTask(int id)
    {
        try
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }
        catch (InvalidOperationException)
        {
            return StatusCode(500, "A database operation was invalid.");
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while retrieving the task.");
        }
    }

    // POST: api/Tasks
    [HttpPost]
    public async Task<ActionResult<TaskManagerApi.Models.Task>> CreateTask(
        [FromBody] TaskDto dto)
    {
        try
        {
            var task = new TaskManagerApi.Models.Task
            {
                Title = dto.Title,
                Priority = dto.Priority,
                IsDone = dto.IsDone
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTask),
                new { id = task.Id },
                task);
        }
        catch (DbUpdateException)
        {
            return StatusCode(
                500,
                "A database error occurred while creating the task.");
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An error occurred while creating the task.");
        }
    }

    // PUT: api/Tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(
        int id,
        [FromBody] TaskDto dto)
    {
        try
        {
            var existingTask = await _context.Tasks.FindAsync(id);

            if (existingTask == null)
            {
                return NotFound();
            }

            existingTask.Title = dto.Title;
            existingTask.Priority = dto.Priority;
            existingTask.IsDone = dto.IsDone;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (DbUpdateException)
        {
            return StatusCode(
                500,
                "A database error occurred while updating the task.");
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An error occurred while updating the task.");
        }
    }

    // DELETE: api/Tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        try
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (DbUpdateException)
        {
            return StatusCode(
                500,
                "A database error occurred while deleting the task.");
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                "An error occurred while deleting the task.");
        }
    }
}