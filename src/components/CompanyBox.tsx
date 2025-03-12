"use client";

import { CompanyInfo } from "@/types";
import Image from "next/image";

const CompanyBox: React.FC<CompanyInfo> = ({
  logo,
  name,
  location,
  description,
  charge,
  url,
  date,
}) => {
  return (
    <div className="py-2 lg:p-4 flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 flex-shrink-0">
          <a href={url}>
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
          {/* <p className="text-sm line-clamp-2">{description}</p> */}
        </div>
      </div>
      {description}
    </div>
  );
};

export default CompanyBox;
