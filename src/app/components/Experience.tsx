import { BriefcaseIcon } from '@heroicons/react/24/outline'

const experiences = [
  {
    title: 'Software Engineer - People Engine',
    company: 'Amazon',
    location: 'Arlington, VA',
    date: 'Aug 2021 - Oct 2023',
    description: [
      'Developed Amazon\'s onboarding and employee-management services utilizing TypeScript, Java, and Python.',
      'Deployed, maintained, and monitored AWS services, using the AWS CDK to programmatically create cloud infrastructure.',
      'Managed ticket queues, led code releases, resolved production issues, and maintained software pipelines as primary contact during on-call rotations.',
      'Designed, implemented, and released a React address field feature to the Amazon onboarding service, that allowed for custom field display based on the user\'s location. The feature resulted in higher form completion rates, and decreased manual data entry time.',
      'Orchestrated effort to bring outage notification API service to production, allowing specific populations of users to be informed when there is an outage affecting them. The service used React in the front-end, and an AWS and TypeScript back-end. Implemented Cypress integration tests.'
    ],
    technologies: ['TypeScript', 'Java', 'Python', 'React', 'AWS CDK', 'Cypress']
  },
  {
    title: 'Software Engineering Intern - Institutional Securities',
    company: 'Morgan Stanley',
    location: 'New York, NY (Remote)',
    date: 'Jun 2020 - Aug 2020',
    description: [
      'Developed document categorization application that identified misclassified documents, and then correctly reclassified them using an n-gram hash map along with other identifying characteristics.',
      'Classification system was 98% accurate on test sets, and was able to classify over 4,000 previously unusable documents.',
      'Wrote JUnit tests to ensure code correctness and to improve maintainability.'
    ],
    technologies: ['Java', 'Spring', 'MySQL', 'JUnit']
  },
  {
    title: 'Teaching Assistant',
    company: 'Washington University in St. Louis',
    location: 'St. Louis, MO',
    date: 'Aug 2019 - Dec 2020',
    description: [
      'Served a teaching assistant for three computer science classes: Programming Languages, Parallel and Concurrent Programming, and Intro to Computer Science.',
      'Conducted office hours, graded assignments and exams, mentored students in studio sessions, and answered forum questions related to class content.'
    ],
    technologies: ['Java', 'C++', 'Concurrent Programming']
  },
  {
    title: 'Web Development Intern',
    company: 'CUNY Graduate School of Public Health and Health Policy',
    location: 'New York, NY',
    date: 'May 2019 - Aug 2019',
    description: [
      'Developed a dashboard using data from the NY Department of Health that allows users to view pertinent HIV/AIDS data, stratifying by demographic/risk factor, and visualize relevant epidemiological trends using D3.js.'
    ],
    technologies: ['D3.js', 'JavaScript', 'HTML', 'CSS']
  },
  {
    title: 'Research Assistant',
    company: 'CUNY Graduate School of Public Health and Health Policy',
    location: 'New York, NY',
    date: 'Jun 2015 - Sep 2018 (Summers)',
    description: [
      'Collaborated with content management team to assist in launching www.etedashboardny.org, a website dedicated to disseminating HIV/AIDS epidemiological data to relevant stakeholders.',
      'Organized and updated data sets, created charts and graphs for new data displays.'
    ],
    technologies: ['Microsoft Office Suite']
  }
]

export default function Experience() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-lg leading-8 text-gray-600">
            My professional journey in software development!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mt-20">
          <div className="relative ml-4">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 w-0.5 h-full bg-gray-200" />

            {/* Experience items */}
            {experiences.map((experience) => (
              <div
                key={`${experience.company}-${experience.title}`}
                className="relative mb-16 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute -left-2 mt-1.5">
                  <div className="w-4 h-4 rounded-full bg-gray-200 border-4 border-white" />
                </div>

                <div className="ml-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <BriefcaseIcon className="h-5 w-5" />
                    <span className="font-medium text-gray-900">{experience.company}</span>
                    <span>•</span>
                    <span>{experience.location}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {experience.title}
                    </h3>
                    <span className="text-sm text-gray-500">{experience.date}</span>
                  </div>
                  <div className="mt-3">
                    <ul className="list-disc list-outside ml-4 space-y-2">
                      {experience.description.map((item, index) => (
                        <li key={index} className="text-base text-gray-600">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-wrap gap-2">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 