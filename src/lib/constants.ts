import type { Page } from './types'

export const loaderAnimation = [
  '.loader',
  { opacity: [1, 0], pointerEvents: 'none' },
  { easing: 'ease-out' },
]

export const ME = {
  domicile: "Jakarta, Indonesia",
  mail: 'haris.r.putro@gmail.com',
}

export const LINKS = {
  github: 'https://github.com/harisraharjo',
  linkedin: 'https://www.linkedin.com/in/harisrp/',
  email: 'mailto:haris.workspace@gmail.com',
  tel: "tel:+6282122001254"
}

// Techs Page
export const TECH: Page = {
  TITLE: 'Technologies',
  DESCRIPTION: 'Technologies I have used.',
}

// Work Page
export const WORK: Page = {
  TITLE: 'Experience',
  DESCRIPTION: 'Places I have worked.',
}

// Blog Page
export const BLOG: Page = {
  TITLE: 'Blog',
  DESCRIPTION: 'Writing on topics I am passionate about.',
}

// Projects Page
export const PROJECTS: Page = {
  TITLE: 'Projects',
  DESCRIPTION: 'Recent projects I have worked on.',
}

// Search Page
export const SEARCH: Page = {
  TITLE: 'Search',
  DESCRIPTION: 'Search all posts and projects by keyword.',
}

// Study Page
export const STUDIES = [
  {
    title: 'Computer Science',
    institution: 'Universitas Surabaya',
    link: 'https://www.ubaya.ac.id/',
    date: '2016 - 2023',
  },
  {
    title: '...',
    institution: 'Udemy',
    link: 'https://www.udemy.com/',
    date: '2018 - 2022',
  },
  {
    title: '...',
    institution: 'CppCon',
    link: 'https://www.youtube.com/@midulive',
    date: '2018 - 2022',
  },
]

export const techs = {
  main: ['Python',
    'Rust',
    'Javascript',
    'Typescript','MySQL',
      'Express JS', 'FastAPI', 'Django'],
  all: [
    {
      name: "Programming Languages",
      members: [
      'Python',
      'Rust',
      'Javascript',
      'Typescript',
      'PHP'
      ]
    },
    {
      name: "Databases"
      , members: [
          'MySQL',
          'PostgreSQL',
          'SQLite','Firestore',
          'Redis'
        ]
    },
    {
      name: "Web Frameworks",
      members: [
        'FastAPI',
    'Flask',
    'Fastify',
    'Express JS',
    'Django',
    'Laravel',
    'NextJS',
    'Home Assistant',
      ]

  },
  {
    name: "frontends",
    members: [
      'React JS',
      'Vue',
      "Astro",
      "Svelte"
    ]

  },
  {
    name: "Cross Platforms",
    members: [
      "Tauri"
    ]

  },
  {
    name: "Virtualization & Containers",
    members: [
    'Docker',
    'WASM'
    ]
  },
  {
    name: "Clouds",
    members: [
      'Amazon Web Services'
    ]

  },
  ]
  // languages: [
  //   {
  //     language: 'English',
  //     proficiency: 'Professional'
  //   },
  //   {
  //     language: 'Indonesia',
  //     proficiency: 'Native'
  //   }
  // ]
};

export const EXPERIENCE = [
  {
    company: 'Evo Smartlife',
    location: 'Indonesia',
    position: 'Fullstack Software Engineer',
    start: '2023',
    link: 'https://straico.com/',
    end: '2024',
    tasks: [
      'Proactively determined and analyzed the negative impacts caused by existing tools and led the creation of a new frontend on top of existing tools',
      'Identified, fixed the database which then results in a better clustering and an increase query performance and better database paging',
      'Built a couple desktop applications with a low memory footprint to fit in user hardware specification for monitoring and automation',
      'Maintain & develop a backend with real time system capability'
    ]
  },
  {
    company: 'Merpati Maintenance Facility',
    location: 'Indonesia',
    position: 'Freelance Backend Developer',
    start: '2019',
    link: '',
    end: '2019',
    tasks: [
      'Developed REST API in Laravel for warehouses management system'
    ]
  },
  {
    company: 'Geo Medika Clinic',
    location: 'Indonesia',
    position: 'Freelance Android Developer',
    start: '2019',
    link: '',
    end: '2019',
    tasks: [
      'Develop an android application for doctor appointment using a NoSQL document based as the database'
    ]
  }
];