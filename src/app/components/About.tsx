import { CodeBracketIcon, CommandLineIcon, CpuChipIcon } from '@heroicons/react/24/outline'

const skills = [
  {
    name: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces',
    icon: CodeBracketIcon,
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    name: 'Backend Development',
    description: 'Designing and implementing server-side solutions',
    icon: CommandLineIcon,
    technologies: ['Node.js', 'Python', 'SQL', 'REST APIs'],
  },
  {
    name: 'DevOps & Tools',
    description: 'Managing deployment and development workflows',
    icon: CpuChipIcon,
    technologies: ['Git', 'Docker', 'AWS', 'CI/CD'],
  },
]

export default function About() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-lg leading-8 text-gray-600">
            I'm a software engineer passionate about building innovative solutions to complex problems. 
            With a strong foundation in both frontend and backend development, I create efficient, 
            scalable, and user-friendly applications.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <skill.icon className="h-5 w-5 flex-none text-gray-600" aria-hidden="true" />
                  {skill.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{skill.description}</p>
                  <p className="mt-4">
                    <span className="font-semibold text-gray-900">Technologies: </span>
                    {skill.technologies.join(', ')}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 