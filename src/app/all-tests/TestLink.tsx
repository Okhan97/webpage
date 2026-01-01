import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";

interface TestLinkProps {
  page: {
    folder: string;
    displayName: string;
    description?: string;
    mobileFocused: boolean;
  };
}

const TestLink = ({ page }: TestLinkProps) => {
  return (
    <Tooltip key={page.folder} title={page.description || ""} arrow>
      <Link
        href={`/${page.folder}`}
        className={`${
          page.mobileFocused
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-200 text-center`}
      >
        {page.displayName}
      </Link>
    </Tooltip>
  );
};

export default TestLink;
