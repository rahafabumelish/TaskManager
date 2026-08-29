using System.ComponentModel.DataAnnotations;

namespace TaskManagerApi.Dtos;

public class TaskDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Priority { get; set; } = "Medium";

    public bool IsDone { get; set; } = false;
}