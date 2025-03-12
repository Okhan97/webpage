export type CompanyInfo = {
  logo: string;
  name: string;
  location: string;
  description: React.ReactNode;
  charge: string;
  url: string;
  date: {
    start: string;
    end: string;
  };
};
