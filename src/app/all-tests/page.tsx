import Link from "next/link";
import { readdirSync } from "fs";
import { join } from "path";

const getTestPages = () => {
  try {
    const appDir = join(process.cwd(), "src", "app");
    const entries = readdirSync(appDir, { withFileTypes: true });
    
    const testPages = entries
      .filter((entry) => entry.isDirectory() && entry.name.startsWith("test"))
      .map((entry) => entry.name)
      .sort((a, b) => {
        const numA = parseInt(a.replace("test", ""));
        const numB = parseInt(b.replace("test", ""));
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
      <h1 className="text-4xl font-bold mb-8 text-center">Test Pages</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {testPages.map((testPage) => (
          <Link
            key={testPage}
            href={`/${testPage}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-200 text-center"
          >
            {testPage.charAt(0).toUpperCase() + testPage.slice(1)}
          </Link>
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
