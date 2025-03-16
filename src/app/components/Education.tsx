import { AcademicCapIcon } from '@heroicons/react/24/outline'

const education = {
  school: 'Washington University in St. Louis',
  location: 'St. Louis, MO',
  degree: 'Bachelor of Science in Computer Science',
  minors: ['Mathematics', 'Bioinformatics'],
  date: 'Aug 2017 - May 2021',
  achievements: [
    'GPA: 3.71, Major GPA: 3.92',
    'Cum Laude',
    'UAA All-Academic Recognition (2019-2021)',
    "Dean's List (2017-2021)"
  ]
}

export default function Education() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="relative">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <AcademicCapIcon className="h-5 w-5" />
              <span className="font-medium text-gray-900 dark:text-white">{education.school}</span>
              <span>•</span>
              <span>{education.location}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {education.degree}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  Minors in {education.minors.join(' and ')}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{education.date}</span>
            </div>
            <div className="mt-4">
              <ul className="list-disc list-outside ml-4 space-y-1">
                {education.achievements.map((achievement, index) => (
                  <li key={index} className="text-base text-gray-600 dark:text-gray-300">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 