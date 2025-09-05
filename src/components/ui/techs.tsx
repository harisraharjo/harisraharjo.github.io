const techs = {
  programmingLanguages: {
    title: 'Programming Languages',
    icon: '💻',
    skills: [
      { name: 'Python', level: 85, category: 'backend' },
      { name: 'Rust', level: 80, category: 'systems' },
      { name: 'JavaScript', level: 90, category: 'frontend' },
      { name: 'TypeScript', level: 85, category: 'frontend' },
      { name: 'PHP', level: 75, category: 'backend' },
    ],
  },
  databases: {
    title: 'Databases',
    icon: '🗄️',
    skills: [
      { name: 'MySQL', level: 85, category: 'backend' },
      { name: 'PostgreSQL', level: 80, category: 'backend' },
      { name: 'SQLite', level: 75, category: 'backend' },
      { name: 'Firestore', level: 80, category: 'backend' },
      { name: 'Redis', level: 75, category: 'backend' },
    ],
  },
  webDevelopment: {
    title: 'Web Development',
    icon: '🌐',
    skills: [
      { name: 'React JS', level: 90, category: 'frontend' },
      { name: 'Next.js', level: 85, category: 'frontend' },
      { name: 'Vue', level: 80, category: 'frontend' },
      { name: 'Node.js', level: 85, category: 'backend' },
      { name: 'Laravel', level: 80, category: 'backend' },
      { name: 'Django', level: 75, category: 'backend' },
      { name: 'Flask', level: 80, category: 'backend' },
    ],
  },
  tools: {
    title: 'Tools & Technologies',
    icon: '🛠️',
    skills: [
      { name: 'Docker', level: 80, category: 'devops' },
      { name: 'AWS', level: 75, category: 'cloud' },
      { name: 'WebAssembly', level: 70, category: 'systems' },
      { name: 'Tauri', level: 75, category: 'desktop' },
      { name: 'WebSocket', level: 85, category: 'backend' },
    ],
  },
}

export const TechSkillsSection = () => {
  // Get current category from URL
  const getCurrentCategory = () => {
    if (typeof window === 'undefined') return 'all'

    const path = window.location.pathname
    if (path === '/tech') return 'all'

    const categoryMatch = path.match(/\/tech\/(.+)/)
    return categoryMatch ? categoryMatch[1] : 'all'
  }

  const currentCategory = getCurrentCategory()

  const getSkillColor = (level) => {
    if (level >= 85) return 'bg-green-500'
    if (level >= 75) return 'bg-blue-500'
    if (level >= 65) return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  const getSkillTextColor = (level) => {
    if (level >= 85) return 'text-green-400'
    if (level >= 75) return 'text-blue-400'
    if (level >= 65) return 'text-yellow-400'
    return 'text-gray-400'
  }

  const getAllSkills = () => {
    const allSkills = []
    Object.values(techs).forEach((section) => {
      allSkills.push(...section.skills)
    })
    return allSkills
  }

  const getFilteredSkills = () => {
    if (currentCategory === 'all') {
      return getAllSkills()
    }
    return getAllSkills().filter((skill) => skill.category === currentCategory)
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Skills Grid */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getFilteredSkills().map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="transform rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {skill.name}
              </h3>
              <span
                className={`text-sm font-medium ${getSkillTextColor(skill.level)}`}
              >
                {skill.level}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${getSkillColor(skill.level)}`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills by Category - Only show on 'all' page */}

      {/* Back to All Skills - Show on category pages */}
      {currentCategory !== 'all' && (
        <div className="mt-8 text-center">
          <a
            href="/tech"
            className="inline-flex items-center rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors duration-300 hover:bg-blue-600"
          >
            ← Back to All Skills
          </a>
        </div>
      )}
    </div>
  )
}
