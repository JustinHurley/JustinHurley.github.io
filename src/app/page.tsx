import Header from './components/Header'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-900 transition-colors pt-16">
      <Header />
      
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Software Engineer
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Building innovative solutions with modern technologies. Passionate about creating efficient,
              scalable, and user-friendly applications.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#contact"
                className="rounded-md bg-gray-900 dark:bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-700 dark:hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Get in touch
              </a>
              <a href="#experience" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                View experience <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-12">About Me</h2>
          <About />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-12">Experience</h2>
          <Experience />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-12">Education</h2>
          <Education />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Contact</h2>
          {/* Add your contact content here */}
        </div>
      </section>
    </main>
  )
}
