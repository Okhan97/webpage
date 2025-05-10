import { CompanyInfo } from "@/types";

export const COMPANY_INFO_LIST: CompanyInfo[] = [
  {
    name: "Facebook",
    logo: "/companies/fb_logo.jpg",
    location: "Palo Alto, California, USA",
    url: "https://about.meta.com/",
    charge: "Frontend Engineering Intern",
    description: [
      <p key="facebook-desc-1">
        Developed and optimized a key feature within Meta’s internal recruitment
        tool, addressing inefficiencies caused by redundant workflows across
        multiple platforms. Designed, updated, and adapted multiple tests to
        ensure system reliability and performance. Led the feature rollout
        through Meta’s Gatekeeper internal tool, ensuring a smooth deployment
        and minimal disruption to existing processes.
      </p>,
    ],
    date: {
      start: "Jan 2020",
      end: "Mar 2020",
    },
  },
  {
    name: "Pinflag",
    logo: "/companies/pinflag_logo.jpg",
    location: "Santiago, Chile",
    url: "https://pinflag.cl/",
    charge: "Frontend Lead Engineer",
    description: [
      <p key="pinflag-desc-1">
        As the first frontend engineer at Pinflag, I was responsible for setting
        up the entire frontend architecture, selecting technologies, and
        establishing best practices.
      </p>,
      <p key="pinflag-desc-2">
        I led the hiring and management of a 3-person team, ensuring smooth
        collaboration and development efficiency.\nI spearheaded the development
        of Pinflag’s main platform from scratch, working closely with a designer
        to iteratively refine the user experience and product vision. Later, I
        laid the foundation for the mobile app and developed an interactive
        iframe application leveraging Mapbox, which visualized over 800 points
        across Chile in an engaging and dynamic way.
      </p>,
    ],
    date: {
      start: "Sep 2021",
      end: "Mar 2022",
    },
  },
  {
    name: "Blissway",
    logo: "/companies/blissway_logo.jpg",
    location: "Denver, Colorado, USA",
    url: "https://www.blissway.com/",
    charge: "Frontend Engineer",
    description: [
      <p key="blissway-desc-1">
        Upon joining Bissway, I was tasked with rapidly developing a platform to
        visualize vehicle detections captured by our highway hardware towers.
        While most trips were accurately reconstructed using AI, around 15%
        remained unreliable, making manual verification necessary. Accessing raw
        data in an Amazon S3 bucket was not scalable, so I built a web platform
        to streamline this process.
      </p>,
      <p key="blissway-desc-2">
        Through multiple iterations, I expanded the platform’s capabilities,
        adding trip deletion, reassembly, validation, and in-app JSON
        manipulation, enabling efficient data management within the web
        interface. As the platform scaled, I encountered localStorage
        limitations and devised a data compression solution, increasing storage
        capacity 100x, ensuring smooth handling of large datasets without
        performance degradation. At the end of the test-run, our platform
        successfully demonstrated its value, leading to securing a contract with
        the Colorado Department of Transportation.
      </p>,
    ],
    date: {
      start: "Apr 2022",
      end: "Dec 2022",
    },
  },
  {
    name: "Reversso",
    logo: "/companies/reversso_logo.jpg",
    location: "Santiago, Chile",
    url: "https://www.reversso.com/",
    charge: "Frontend Engineer",
    description: [
      <p key="reversso-desc-1">
        At Reversso, I played a key role in enhancing the company’s analytics
        capabilities, developing an interactive dashboard that allowed
        businesses to visualize historical revenue data, ticket volumes, and
        client insights. I also expanded and improved the main platform’s user
        experience, creating dynamic sections like Alliances, FAQ, and
        Resources, which adapted based on each country’s specific needs. My work
        significantly improved the platform’s usability and accessibility,
        enabling better decision-making for clients.
      </p>,
    ],
    date: {
      start: "Feb 2023",
      end: "Nov 2023",
    },
  },
  {
    name: "NeuralWorks",
    logo: "/companies/neuralworks_logo.jpg",
    location: "Pucón, Chile",
    url: "https://www.neuralworks.cl/",
    charge: "Fullstack Engineer",
    description: [
      <p key="neural-desc-1">
        NeuralWorks is consulting firm that support LATAM Airlines, here I
        played a key role in enhancing and scaling the company’s AI-driven
        experimentation platform. Given my strong front-end expertise, I was
        responsible for refactoring and optimizing critical parts of the
        platform, improving performance, usability, and maintainability.
      </p>,
      <p key="neural-desc-2">
        I led the development of a <strong>custom dashboard </strong> that
        provided real-time analytics and insights into experiments,
        significantly improving the way users interacted with and interpreted
        AI-driven results. To ensure scalability, I introduced structured
        testing practices and helped implement a more reliable deployment
        process, reducing system downtime and improving developer efficiency.
      </p>,
      <p key="neural-desc-3">
        Beyond coding, I worked closely with product and leadership teams,
        aligning technical improvements with business goals. My contributions
        helped increase platform adoption and streamline experimentation
        processes, ultimately enabling more effective decision-making across
        LATAM.
      </p>,
    ],
    date: {
      start: "Apr 2024",
      end: "Present",
    },
  },
];

export const EDUCATION_INFO_LIST: CompanyInfo[] = [
  {
    name: "Colegio de La Salle",
    logo: "/companies/dls_logo.jpg",
    location: "Santiago, Chile",
    description: null,
    charge: "Student",
    url: "https://www.lasalle-lareina.cl/",
    date: {
      start: "Mar 2002",
      end: "Dic 2014",
    },
  },
  {
    name: "Pontificia Universidad Católica de Chile",
    logo: "/companies/puc_logo.jpg",
    location: "Santiago, Chile",
    description: null,
    charge: "Bachelor's in Software Engineering",
    url: "https://www.ing.uc.cl/",
    date: {
      start: "Mar 2015",
      end: "Jul 2021",
    },
  },
];
