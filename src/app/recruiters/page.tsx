import {
  FRONTEND_TECHNOLOGIES,
  BACKEND_TECHNOLOGIES,
  TOOLS_AND_DEVOPS,
} from "./constants";
import TechBadge from "./TechBadge";
import Link from "next/link";

const ForRecruiters = () => {
  return (
    <div className="flex flex-1 flex-col p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Link
          href="/"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center min-w-[160px]"
        >
          Home
        </Link>
        <Link
          href="/about-me"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center min-w-[160px]"
        >
          About Me
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center">For Recruiters</h1>

      <div className="space-y-8">
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border-l-4 border-blue-500">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            My motto is simple: be useful 🎯. I adapt to do whatever&apos;s
            needed, what I care about most is making an impact. I want to grow
            in all directions and take on challenges that make me uncomfortable,
            because that&apos;s where the real learning happens 🚀.
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
                {FRONTEND_TECHNOLOGIES.map((tech) => (
                  <TechBadge
                    key={tech.name}
                    color="blue"
                    text={tech.name}
                    isShiny={tech.isShiny}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {BACKEND_TECHNOLOGIES.map((tech) => (
                  <TechBadge
                    key={tech.name}
                    color="green"
                    text={tech.name}
                    isShiny={tech.isShiny}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Tools & DevOps
              </h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS_AND_DEVOPS.map((tech) => (
                  <TechBadge
                    key={tech.name}
                    color="purple"
                    text={tech.name}
                    isShiny={tech.isShiny}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-emerald-600 dark:text-emerald-400">
            📈 Personal Projects & Initiatives
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
                Cryptocurrency Mining Operation (2017)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                ETH Mining & Chilean Crypto Pioneer
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Co-founded one of the first cryptocurrency mining operations in
                Chile with friends back in 2017. Built and configured a mining
                rig with 6 Radeon RX 580 GPUs to mine Ethereum at a
                semi-sustainable pace. We were among the first people in Chile
                to join the mining pool for &quot;Chaucha,&quot; the
                country&apos;s first national cryptocurrency. The project taught
                me hardware optimization, resource management, and early
                blockchain technology adoption. We eventually had to stop due to
                electrical constraints - running the rig alongside household
                appliances would trip the main breaker.
              </p>
            </div>

            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
                Free University Prep Classes - Pucón
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Community Education Initiative
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Currently teaching free &quot;pre universitario&quot; classes in
                Pucón to help students prepare for the PAES (Chilean university
                entrance exam). This is my own initiative, backed by 10 years of
                experience providing private math tutoring. I believe quality
                education should be accessible to everyone, regardless of
                economic background. The program focuses on mathematics and
                problem-solving strategies to give local students the best
                chance at university admission.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForRecruiters;
