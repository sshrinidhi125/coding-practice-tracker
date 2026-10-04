function ProblemCard({
  problem,
  onDelete,
  onToggleStatus,
  onEdit,
}) {
  return (
    <div className="problem-card">

      <div>
        <h2>{problem.title}</h2>

        <p>
          <strong>Platform:</strong> {problem.platform}
        </p>

        <p>
          <strong>Language:</strong> {problem.language}
        </p>

        <p>
          <strong>Topic:</strong> {problem.topic}
        </p>
      </div>

      <div className="problem-details">

        <span className="difficulty">
          {problem.difficulty}
        </span>

        <span className="status">
          {problem.status}
        </span>

        <div className="problem-actions">

          <button
            className="status-button"
            onClick={() => onToggleStatus(problem.id)}
          >
            {problem.status === 'Completed'
              ? 'Mark Pending'
              : 'Mark Completed'}
          </button>

          <button
            className="edit-button"
            onClick={() => onEdit(problem)}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => onDelete(problem.id)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}

export default ProblemCard