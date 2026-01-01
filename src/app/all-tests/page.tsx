import Link from "next/link";
import { readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import TestLink from "./TestLink";

const loadTestPageSettings = (folderName: string, settingsPath: string) => {
  let displayName = folderName.charAt(0).toUpperCase() + folderName.slice(1);
  let description: string | undefined = undefined;
  let mobileFocused = false;

  if (existsSync(settingsPath)) {
    try {
      const settingsContent = readFileSync(settingsPath, "utf-8");
      const settings = JSON.parse(settingsContent);
      if (settings.PAGE_NAME) displayName = settings.PAGE_NAME;
      if (settings.PAGE_DESCRIPTION) description = settings.PAGE_DESCRIPTION;
      if (settings.MOBILE_FOCUSED !== undefined)
        mobileFocused = settings.MOBILE_FOCUSED;
    } catch (error) {
      console.error(`Error reading settings for ${folderName}:`, error);
    }
  }

  return { folder: folderName, displayName, description, mobileFocused };
};

const getTestPages = () => {
  try {
    const appDir = join(process.cwd(), "src", "app");
    const entries = readdirSync(appDir, { withFileTypes: true });

    // TODO: I don't like the way the code is structured here, refactor later
    const testPages = entries
      .filter((entry) => entry.isDirectory() && entry.name.startsWith("test"))
      .map((entry) => {
        const folderName = entry.name;
        const settingsPath = join(appDir, folderName, "settings.json");
        return loadTestPageSettings(folderName, settingsPath);
      })
      .sort((a, b) => {
        const numA = parseInt(a.folder.replace("test", ""));
        const numB = parseInt(b.folder.replace("test", ""));
        return numA - numB;
      });

    return testPages;
  } catch (error) {
    console.error("Error reading test pages:", error);
    return [];
  }
};

const TestsPage = () => {
  const testPages = getTestPages();

  return (
    <div className="flex flex-1 flex-col p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Test Laboratory 🧪</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          A collection of random experiments and proof-of-concepts I&apos;ve
          built while exploring different technologies and ideas. Some work,
          some don&apos;t, all are fun! 🚀
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          🏠 Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {testPages.map((testPage) => (
          <TestLink key={testPage.folder} page={testPage} />
        ))}
      </div>

      {testPages.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No test pages found
        </p>
      )}
    </div>
  );
};

export default TestsPage;
