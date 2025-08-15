const ForRecruiters = () => {
  return (
    <div className="flex flex-1 flex-col p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">For Recruiters</h1>

      <div className="space-y-8">
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border-l-4 border-blue-500">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            My motto is simple: be useful 🎯. I adapt to do whatever&apos;s
            needed and I&apos;m not interested in being stuck in just one box -
            especially this early in my career. I want to grow in all directions
            and take on challenges that make me uncomfortable, because
            that&apos;s where the real learning happens 🚀.
          </p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-600 dark:text-cyan-400">
            💻 Technologies & Technical Tools
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  Tailwind CSS
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                  Python
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                  PostgreSQL
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                  MongoDB
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Tools & DevOps
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                  Git
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                  Docker
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                  AWS
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                  Vercel
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-emerald-600 dark:text-emerald-400">
            📈 Business-Focused Projects
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
                Project Name
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                E-commerce Platform Optimization
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Led the development of a customer analytics dashboard that
                helped identify user behavior patterns, resulting in improved
                conversion rates and better user experience.
              </p>
            </div>

            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
                Another Project
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Fintech Application
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Built a financial tracking application that automated expense
                categorization, saving users an average of 3 hours per week on
                financial management.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-orange-600 dark:text-orange-400">
            🎯 Impact & Achievements
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Performance Improvement
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Optimized application load times by 40% through code splitting
                  and lazy loading
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  User Engagement
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Increased user retention by 25% through improved UX design and
                  feature implementation
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Cost Reduction
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Reduced infrastructure costs by 30% through efficient database
                  queries and caching strategies
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Team Collaboration
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Implemented CI/CD pipeline that reduced deployment time from
                  hours to minutes
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-red-600 dark:text-red-400">
            🔧 Challenges & How I Tackled Them
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Challenge: Scaling Issues with High Traffic 📊
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>Situation:</strong> Application was crashing during peak
                hours with 10x normal traffic.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>Solution:</strong> Implemented Redis caching, database
                indexing, and load balancing. Also added monitoring with alerts
                to catch issues early.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Result:</strong> Application now handles 20x traffic
                without performance degradation.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Challenge: Complex State Management 🧩
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>Situation:</strong> Frontend state was becoming
                unmanageable with prop drilling and inconsistent data.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>Solution:</strong> Refactored to use Context API with
                custom hooks and implemented proper data normalization.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Result:</strong> Reduced bugs by 60% and improved
                development velocity significantly.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-violet-600 dark:text-violet-400">
            🚀 Personal Projects for Professional Growth
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                AI-Powered Code Review Tool
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Learning: Machine Learning, Python, NLP
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Built to understand AI integration in development workflows and
                improve code quality processes.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Microservices Architecture
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Learning: Docker, Kubernetes, Event-driven architecture
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Experimenting with scalable architectures to understand
                enterprise-level system design.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Mobile App Development
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Learning: React Native, Mobile UX, App Store deployment
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Expanding beyond web development to understand mobile-first
                approaches and cross-platform development.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Open Source Contributions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Learning: Community collaboration, Code review, Documentation
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Contributing to popular libraries to understand large codebases
                and collaborative development practices.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect! 🤝</h2>
          <p className="text-blue-100 mb-6 text-lg">
            I&apos;m always open to discussing new opportunities and challenges
            that push me to grow as a developer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:your.email@example.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              📧 Email Me
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              💼 LinkedIn
            </a>
            <a
              href="https://github.com/yourusername"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              💻 GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForRecruiters;
