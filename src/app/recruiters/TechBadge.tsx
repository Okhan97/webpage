import styles from "./TechBadge.module.css";

interface TechBadgeProps {
  color: "blue" | "green" | "purple";
  text: string;
  isShiny?: boolean;
}

const TechBadge = ({ color, text, isShiny = false }: TechBadgeProps) => {
  const getColorClasses = (color: TechBadgeProps["color"]) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      case "green":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "purple":
        return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200";
    }
  };

  const baseClasses =
    "px-3 py-1 rounded-full text-sm transition-all duration-200";
  const colorClasses = getColorClasses(color);
  const shinyClasses = isShiny
    ? `border border-yellow-400/30 shadow-[0_0_8px_rgba(255,215,0,0.4)] ${styles.shiny}`
    : "";

  return (
    <span className={`${baseClasses} ${colorClasses} ${shinyClasses}`}>
      {text}
    </span>
  );
};

export default TechBadge;
