export type CompanyInfo = {
  logo: string;
  name: string;
  location: string;
  description: React.ReactNode[] | null;
  charge: string;
  url: string;
  date: {
    start: string;
    end: string;
  };
};

export type Circle = {
  x: number;
  y: number;
  r: number;
};
