import { useEffect, useState } from 'react'
import ProblemForm from './components/ProblemForm'
import ProblemCard from './components/ProblemCard'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [problems, setProblems] = useState(() => {
  const savedProblems = localStorage.getItem('codingProblems')

  return savedProblems ? JSON.parse(savedProblems) : []
})
useEffect(() => {
  localStorage.setItem(
    'codingProblems',
    JSON.stringify(problems)
  )
}, [problems])
  const [editingProblem, setEditingProblem] = useState(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [languageFilter, setLanguageFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // ================= ADD PROBLEM =================

  const addProblem = (problem) => {
    setProblems([...problems, problem])
  }

  // ================= EDIT PROBLEM =================

  const editProblem = (problem) => {
    setEditingProblem(problem)
  }

  // ================= UPDATE PROBLEM =================

  const updateProblem = (updatedProblem) => {
    setProblems(
      problems.map((problem) =>
        problem.id === updatedProblem.id
          ? updatedProblem
          : problem
      )
    )

    setEditingProblem(null)
  }

  // ================= DELETE PROBLEM =================

  const deleteProblem = (id) => {
    setProblems(
      problems.filter((problem) => problem.id !== id)
    )

    if (editingProblem?.id === id) {
      setEditingProblem(null)
    }
  }

  // ================= TOGGLE STATUS =================

  const toggleStatus = (id) => {
    setProblems(
      problems.map((problem) =>
        problem.id === id
          ? {
              ...problem,
              status:
                problem.status === 'Completed'
                  ? 'Pending'
                  : 'Completed',
            }
          : problem
      )
    )
  }

  // ================= STATISTICS =================

  const completedProblems = problems.filter(
    (problem) => problem.status === 'Completed'
  ).length

  const pendingProblems = problems.filter(
    (problem) => problem.status === 'Pending'
  ).length

  const completionPercentage =
    problems.length === 0
      ? 0
      : Math.round(
          (completedProblems / problems.length) * 100
        )

  // ================= SEARCH + FILTER =================

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesDifficulty =
      difficultyFilter === 'All' ||
      problem.difficulty === difficultyFilter

    const matchesLanguage =
      languageFilter === 'All' ||
      problem.language === languageFilter

    const matchesStatus =
      statusFilter === 'All' ||
      problem.status === statusFilter

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesLanguage &&
      matchesStatus
    )
  })

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <h2 className="logo">CodeTrack</h2>

        <div className="nav-links">

          <button
            className={
              activePage === 'dashboard'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActivePage('dashboard')
              setEditingProblem(null)
            }}
          >
            Dashboard
          </button>

          <button
            className={
              activePage === 'problems'
                ? 'active'
                : ''
            }
            onClick={() => setActivePage('problems')}
          >
            Problems
          </button>

          <button
            className={
              activePage === 'progress'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActivePage('progress')
              setEditingProblem(null)
            }}
          >
            Progress
          </button>

        </div>

      </nav>

      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">

        {/* =================================================
            DASHBOARD
        ================================================= */}

        {activePage === 'dashboard' && (
          <section>

            <h1>Coding Practice Tracker</h1>

            <p className="subtitle">
              Track your coding problems and monitor your
              progress.
            </p>

            <div className="stats-grid">

              <div className="stat-card">
                <h3>Total Problems</h3>
                <p>{problems.length}</p>
              </div>

              <div className="stat-card">
                <h3>Completed</h3>
                <p>{completedProblems}</p>
              </div>

              <div className="stat-card">
                <h3>Pending</h3>
                <p>{pendingProblems}</p>
              </div>

              <div className="stat-card">
                <h3>Completion</h3>
                <p>{completionPercentage}%</p>
              </div>

            </div>

          </section>
        )}

        {/* =================================================
            PROBLEMS
        ================================================= */}

        {activePage === 'problems' && (
          <section>

            <h1>Problems</h1>

            <p className="subtitle">
              Add and manage your coding problems.
            </p>

            {/* ADD / EDIT FORM */}

            <ProblemForm
              onAddProblem={addProblem}
              editingProblem={editingProblem}
              onUpdateProblem={updateProblem}
            />

            {/* SEARCH + FILTERS */}

            <div className="filter-container">

              {/* Search */}

              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              {/* Difficulty */}

              <select
                value={difficultyFilter}
                onChange={(event) =>
                  setDifficultyFilter(event.target.value)
                }
              >
                <option value="All">
                  All Difficulties
                </option>

                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>
              </select>

              {/* Language */}

              <select
                value={languageFilter}
                onChange={(event) =>
                  setLanguageFilter(event.target.value)
                }
              >
                <option value="All">
                  All Languages
                </option>

                <option value="Java">
                  Java
                </option>

                <option value="Python">
                  Python
                </option>

                <option value="C">
                  C
                </option>

                <option value="C++">
                  C++
                </option>

                <option value="JavaScript">
                  JavaScript
                </option>
              </select>

              {/* Status */}

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Pending">
                  Pending
                </option>
              </select>

            </div>

            {/* PROBLEM LIST */}

            {problems.length === 0 ? (

              <div className="empty-state">

                <h2>No problems added yet</h2>

                <p>
                  Add your first coding problem to start
                  tracking your practice.
                </p>

              </div>

            ) : filteredProblems.length === 0 ? (

              <div className="empty-state">

                <h2>No matching problems</h2>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              <div className="problem-list">

                {filteredProblems.map((problem) => (

                  <ProblemCard
                    key={problem.id}
                    problem={problem}
                    onDelete={deleteProblem}
                    onToggleStatus={toggleStatus}
                    onEdit={editProblem}
                  />

                ))}

              </div>

            )}

          </section>
        )}

        {/* =================================================
            PROGRESS
        ================================================= */}

        {activePage === 'progress' && (
          <section>

            <h1>Progress</h1>

            <p className="subtitle">
              Monitor your coding practice progress.
            </p>

            <div className="progress-card">

              <h2>Overall Progress</h2>

              <p>
                You have completed{' '}
                <strong>{completedProblems}</strong>{' '}
                out of{' '}
                <strong>{problems.length}</strong>{' '}
                problems.
              </p>

              {/* Progress Bar */}

              <div className="progress-bar-container">

                <div
                  className="progress-bar"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                ></div>

              </div>

              <p className="progress-percentage">
                {completionPercentage}% Completed
              </p>

            </div>

          </section>
        )}

      </main>

    </div>
  )
}

export default App