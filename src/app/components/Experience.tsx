import { BriefcaseIcon } from '@heroicons/react/24/outline'

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Example Tech',
    date: '2022 - Present',
    description: 'Led development of microservices architecture, improving system scalability by 300%. Mentored junior developers and implemented best practices.',
    technologies: ['React', 'Node.js', 'AWS', 'Kubernetes'],
  },
  {
    title: 'Software Engineer',
    company: 'Tech Solutions Inc',
    date: '2020 - 2022',
    description: 'Developed and maintained full-stack applications. Reduced API response time by 40% through optimization.',
    technologies: ['TypeScript', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Co',
    date: '2018 - 2020',
    description: 'Built responsive web applications and contributed to core product features. Implemented automated testing.',
    technologies: ['JavaScript', 'React', 'Express.js', 'MongoDB'],
  },
]

export default function Experience() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-lg leading-8 text-gray-600">
            My professional journey in software development.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mt-20">
          <div className="relative ml-4">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 w-0.5 h-full bg-gray-200" />

            {/* Experience items */}
            {experiences.map((experience) => (
              <div
                key={experience.date}
                className="relative mb-16 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute -left-2 mt-1.5">
                  <div className="w-4 h-4 rounded-full bg-gray-200 border-4 border-white" />
                </div>

                <div className="ml-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <BriefcaseIcon className="h-5 w-5" />
                    <span>{experience.company}</span>
                    <span>•</span>
                    <span>{experience.date}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    {experience.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-600">
                    {experience.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 