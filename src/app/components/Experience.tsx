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
    title: 'Software Engineer - People Engine',
    company: 'Amazon',
    location: 'Arlington, VA',
    date: 'Aug 2021 - Oct 2023',
    description: [
      'Developed Amazon\'s onboarding and employee-management services utilizing TypeScript, Java, and Python',
      'Deployed, maintained, and monitored AWS services, using the AWS CDK to programmatically create cloud infrastructure',
      'Managed ticket queues, led code releases, resolved production issues, and maintained software pipelines as primary contact during on-call rotations',
      'Designed, implemented, and released a React address field feature to the Amazon onboarding service, that allowed for custom field display based on the user\'s location',
      'Orchestrated effort to bring outage notification API service to production, allowing specific populations of users to be informed when there is an outage affecting them'
    ]
  },
  {
    title: 'Software Engineering Intern - Institutional Securities',
    company: 'Morgan Stanley',
    location: 'New York, NY (Remote)',
    date: 'Jun 2020 - Aug 2020',
    description: [
      'Developed document categorization application that identified misclassified documents, and then correctly reclassified them using an n-gram hash map along with other identifying characteristics',
      'Classification system was 98% accurate on test sets, and was able to classify over 4,000 previously unusable documents',
      'Wrote JUnit tests to ensure code correctness and to improve maintainability'
    ]
  },
  {
    title: 'Teaching Assistant',
    company: 'Washington University in St. Louis',
    location: 'St. Louis, MO',
    date: 'Aug 2019 - Dec 2020',
    description: [
      'Served as teaching assistant for three computer science classes: Programming Languages, Parallel and Concurrent Programming, and Intro to Computer Science',
      'Conducted office hours, graded assignments and exams, mentored students in studio sessions, and answered forum questions related to class content'
    ]
  },
  {
    title: 'Web Development Intern',
    company: 'CUNY Graduate School of Public Health and Health Policy',
    location: 'New York, NY',
    date: 'May 2019 - Aug 2019',
    description: [
      'Developed a dashboard using data from the NY Department of Health that allows users to view pertinent HIV/AIDS data, stratifying by demographic/risk factor, and visualize relevant epidemiological trends using D3.js'
    ]
  },
  {
    title: 'Research Assistant',
    company: 'CUNY Graduate School of Public Health and Health Policy',
    location: 'New York, NY',
    date: 'Jun 2015 - Sep 2018 (Summers)',
    description: [
      'Collaborated with content management team to assist in launching www.etedashboardny.org, a website dedicated to disseminating HIV/AIDS epidemiological data to relevant stakeholders',
      'Organized and updated data sets, created charts and graphs for new data displays'
    ]
  }
]

const skills = [
  'Problem Solving',
  'System Design',
  'Technical Leadership',
  'Agile Development',
  'Team Collaboration',
  'Software Architecture',
  'Cloud Computing',
  'Test-Driven Development',
  'CI/CD',
  'Data Analysis'
]

const technologies = [
  'TypeScript',
  'Java',
  'Python',
  'React',
  'AWS CDK',
  'AWS Services',
  'Spring',
  'Node.js',
  'Docker',
  'Git',
  'D3.js',
  'MySQL'
]

export default function Experience() {
  return (
    <div className="space-y-12">
      {/* Work Experience */}
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <div key={index} className="relative bg-white dark:bg-gray-900 rounded-lg p-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <BriefcaseIcon className="h-5 w-5" />
              <span className="font-medium text-gray-900 dark:text-white">{experience.company}</span>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span>{experience.location}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {experience.title}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{experience.date}</span>
            </div>
            <div className="mt-4">
              <ul className="list-disc list-outside ml-4 space-y-2">
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
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 