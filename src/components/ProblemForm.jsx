import { useEffect, useState } from 'react'

function ProblemForm({ onAddProblem, editingProblem, onUpdateProblem }) {
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    language: 'Java',
    difficulty: 'Easy',
    topic: '',
    status: 'Pending',
  })

  const [error, setError] = useState('')

  // Load the selected problem when editing
  useEffect(() => {
    if (editingProblem) {
      setFormData({
        title: editingProblem.title,
        platform: editingProblem.platform,
        language: editingProblem.language,
        difficulty: editingProblem.difficulty,
        topic: editingProblem.topic,
        status: editingProblem.status,
      })
    }
  }, [editingProblem])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title.trim()) {
      setError('Please enter the problem name.')
      return
    }

    if (!formData.platform.trim()) {
      setError('Please enter the platform.')
      return
    }

    if (!formData.topic.trim()) {
      setError('Please enter the topic.')
      return
    }

    if (editingProblem) {
      onUpdateProblem({
        ...editingProblem,
        ...formData,
      })
    } else {
      onAddProblem({
        ...formData,
        id: Date.now(),
      })

      setFormData({
        title: '',
        platform: '',
        language: 'Java',
        difficulty: 'Easy',
        topic: '',
        status: 'Pending',
      })
    }

    setError('')
  }

  return (
    <form className="problem-form" onSubmit={handleSubmit}>

      <h2>
        {editingProblem
          ? 'Edit Coding Problem'
          : 'Add Coding Problem'}
      </h2>

      {error && (
        <p className="form-error">{error}</p>
      )}

      <div className="form-group">
        <label>Problem Name</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Example: Two Sum"
        />
      </div>

      <div className="form-group">
        <label>Platform</label>

        <input
          type="text"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          placeholder="Example: LeetCode"
        />
      </div>

      <div className="form-group">
        <label>Programming Language</label>

        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
        >
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="C">C</option>
          <option value="C++">C++</option>
          <option value="JavaScript">JavaScript</option>
        </select>
      </div>

      <div className="form-group">
        <label>Difficulty</label>

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="form-group">
        <label>Topic</label>

        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          placeholder="Example: Arrays"
        />
      </div>

      <div className="form-group">
        <label>Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="add-button"
      >
        {editingProblem
          ? 'Update Problem'
          : 'Add Problem'}
      </button>

    </form>
  )
}

export default ProblemForm