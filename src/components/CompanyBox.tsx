"use client";

import { CompanyInfo } from "@/types";
import Image from "next/image";
import { useState } from "react";

const CompanyBox: React.FC<CompanyInfo> = ({
  logo,
  name,
  location,
  description,
  charge,
  url,
  date,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="py-2 lg:p-4 flex flex-col gap-2 transition-transform duration-300 ease-in-out hover:-translate-y-1 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="py-2 lg:p-4 flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 flex-shrink-0">
            <a href={url} target="_blank">
              <Image
                src={logo}
                alt={`${name} logo`}
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
            </a>
          </div>

          <div className="flex flex-col flex-grow">
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="text-primary font-semibold">{charge}</span>
            <p className="text-sm">
              {date.start} - {date.end}
            </p>
            <p className="text-sm">{location}</p>
          </div>
        </div>
        {description != null && (
          <div
            className={`flex gap-4 overflow-hidden transition-all duration-300 ${
              open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="flex border-foreground border-l-2" />
            <div className="text-sm flex flex-col gap-1 max-w-[50rem]">
              {description.map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyBox;
