import Image from "next/image";
import Link from "next/link";

const AboutMe = () => {
  return (
    <div className="flex flex-1 flex-col p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Link
          href="/"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center min-w-[160px]"
        >
          Home
        </Link>
        <Link
          href="/recruiters"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center min-w-[160px]"
        >
          For Recruiters
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>

      <div className="space-y-8">
        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-amber-600 dark:text-amber-400">
            🎵 Music
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            I actually started with bass when I was 10 🎸 - yeah, I was that kid
            with the huge instrument! Then in 2021 I finally got my first
            electric guitar, and honestly, it&apos;s become my go-to when I get
            stuck on a coding problem 💻. There&apos;s something about switching
            from debugging to jamming that just clears my head and helps me
            think differently 🎶🔥.
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
              My take on the solo of Dean Town - Vulfpeck:
            </h3>
            <div className="aspect-video w-full max-w-2xl mx-auto">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/T8q-QHB6ULI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">
            🏐 Sports
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            My sports journey has been all over the place! Started with
            basketball 🏀, then got really into running (even did a 10k! 🏃‍♂️).
            The gym became my constant companion through the years 🏋️‍♂️, and at
            one point I was obsessed with parkour - jumping off everything I
            could find 🤸‍♂️. Then came my calisthenics phase 💪, volleyball became
            a big passion 🏐, and lately I&apos;ve been super into climbing...
            like literally every other software engineer 🧗‍♂️😅. Guess we all need
            something to balance out the screen time!
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
              My first ever backflip on floor :
            </h3>
            <div className="w-full max-w-2xl mx-auto">
              <div className="aspect-[9/16] sm:aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/-PmikfIZ0E0"
                  title="First backflip on floor"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            📚 Teaching
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Teaching math is honestly one of the most rewarding things I do
            📐✨. Yeah, I know - not everyone&apos;s favorite subject! 😬 But
            there&apos;s this incredible moment when a student finally gets it,
            when that lightbulb goes off and suddenly calculus or algebra makes
            sense 💡🤯. I&apos;ve learned that patience goes a long way, and
            sometimes you just need to explain the same concept five different
            ways until you find the one that clicks 🎯.
          </p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-rose-600 dark:text-rose-400">
            🐕 Dog Dad
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Meet Vodka - my son since 2015! 🥰 He&apos;s a rescue mutt that
                I got from the dog shelter, and honestly, best decision I ever
                made. This guy has been through everything with me, and we
                always joke that he&apos;s literally the best dog in Chile 🇨🇱.
                No competition, it&apos;s just a fact! He&apos;s got this
                personality that somehow makes even my worst coding days better
                just by existing 🐾❤️.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Image
                src="/vodka1.jpg"
                alt="Vodka, the best dog in Chile"
                width={320}
                height={320}
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
              <Image
                src="/vodka2.jpg"
                alt="Vodka being adorable"
                width={320}
                height={320}
                className="rounded-lg shadow-md w-full h-auto object-cover my-auto"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default AboutMe;
