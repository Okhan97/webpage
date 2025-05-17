"use client";
import CompanyBox from "@/components/CompanyBox";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { COMPANY_INFO_LIST, EDUCATION_INFO_LIST } from "./constants";

const words = ["Frontend", "Fullstack", "Software"];
const maxLength = Math.max(...words.map((word) => word.length));

const Home = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const paddedWord = currentWord.padEnd(maxLength, " ");

    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(paddedWord.substring(0, displayedText.length + 1));
        if (displayedText === paddedWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(paddedWord.substring(0, displayedText.length - 1));
        if (displayedText.trim() === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex]);

  const phrase = (
    <>
      <p>
        The question is never{" "}
        <span className="block lg:inline font-semibold text-primary">
          ”can it be done?”
        </span>
      </p>
      <p>
        The question is{" "}
        <span className="block lg:inline font-semibold text-primary">
          ”is it worth the time?”
        </span>
      </p>
    </>
  );

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const overlay = document.getElementById("light-overlay");
    if (overlay) {
      overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 70%)`;
    }
  });

  return (
    <div className="px-12 lg:px-32 py-8 md:py-12">
      <div id="light-overlay"></div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row justify-evenly gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl lg:text-5xl font-bold">
                Ignacio Peñafiel{" "}
                <Tooltip title="Mom would be mad if I didn't put her lastname">
                  <span className="font-thin">
                    Urzúa<span className="text-lg align-super ml-1">*</span>
                  </span>
                </Tooltip>
              </h1>
              <h2 className=" text-2xl lg:text-3xl">
                <span className="text-primary">{displayedText}</span> Engineer
              </h2>
            </div>
            <p className="lg:text-lg">
              I&apos;m a senior software engineer from{" "}
              <Tooltip title="The best country in Chile">
                <span>Chile 🇨🇱</span>
              </Tooltip>
              <br />
              Passionate about all things frontend and specialized in web
              development. <br />
              Always eager to learn, adapt and improve as a professional. <br />
              This is my personal webpage where I share a bit about myself!
            </p>
            <div className="italic text-lg hidden lg:visible lg:text-xl text-gray-300 justify-center lg:flex flex-col items-center m-auto">
              {phrase}
            </div>
          </div>
          <div className="relative flex flex-col gap-4">
            <Image
              src="/main-photo.jpg"
              alt="profile photo"
              className="rounded-lg object-cover"
              width={500}
              height={0}
            />
            <div className="italic text-lg lg:hidden text-gray-300 justify-center flex flex-col items-center m-auto">
              {phrase}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl lg:text-2xl">Work Experience</h1>
          <hr />
          {COMPANY_INFO_LIST.toReversed().map((company) => (
            <CompanyBox key={company.name} {...company} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl lg:text-2xl">Education</h1>
          <hr />
          {EDUCATION_INFO_LIST.toReversed().map((company) => (
            <CompanyBox key={company.name} {...company} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
