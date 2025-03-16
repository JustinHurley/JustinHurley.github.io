import { BriefcaseIcon } from '@heroicons/react/24/outline'

interface Experience {
  company: string
  location: string
  title: string
  date: string
  description: string[]
}

const experiences: Experience[] = [
  {
    company: 'Mastercard',
    location: 'O\'Fallon, MO',
    title: 'Software Engineer',
    date: 'July 2021 - Present',
    description: [
      'Developed and maintained high-performance payment processing systems',
      'Led migration of legacy systems to modern cloud architecture',
      'Implemented automated testing and deployment pipelines',
      'Collaborated with cross-functional teams to deliver critical features'
    ]
  }
]

const skills = [
  'Problem Solving',
  'System Design',
  'Technical Leadership',
  'Agile Development',
  'Team Collaboration'
]

const technologies = [
  'Java',
  'Spring Boot',
  'Python',
  'React',
  'TypeScript',
  'AWS',
  'Docker',
  'Kubernetes'
]

export default function Experience() {
  return (
    <div className="space-y-12">
      {/* Work Experience */}
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <div key={index} className="relative">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <BriefcaseIcon className="h-5 w-5" />
              <span className="font-medium text-gray-900 dark:text-white">{experience.company}</span>
              <span>•</span>
              <span>{experience.location}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {experience.title}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{experience.date}</span>
            </div>
            <div className="mt-4">
              <ul className="list-disc list-outside ml-4 space-y-1">
                {experience.description.map((item, idx) => (
                  <li key={idx} className="text-base text-gray-600 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 