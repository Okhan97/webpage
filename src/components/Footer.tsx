"use client";
import { Tooltip } from "@mui/material";
import { usePathname } from "next/navigation";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  const hideFooter = pathname.includes("test");

  if (hideFooter) return null;

  return (
    <div className="flex gap-6 px-8 py-6 justify-end">
      <Tooltip title="ignacio.penafiel.u@gmail.com">
        <FaEnvelope size={30} />
      </Tooltip>
      <a href="https://github.com/Okhan97">
        <FaGithub size={30} />
      </a>
      <a href="https://www.linkedin.com/in/ignaciopenafiel/" target="_blank">
        <FaLinkedin size={30} />
      </a>
    </div>
  );
};

export default Footer;
