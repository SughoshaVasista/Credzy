export const mockJobs = [
  {
    id: "j1",
    title: "Frontend Developer Intern",
    company: "Acme Corp",
    recruiterId: "r1",
    stipend: "$3,000/mo",
    location: "San Francisco, CA (Remote)",
    tags: ["Remote", "Internship"],
    description: "Join our core product team to build scalable frontend applications using React and Tailwind CSS. You will be working directly with senior engineers and product managers to deliver high-quality, secure user interfaces.",
    skillsRequired: ["React", "JavaScript", "TailwindCSS"],
    recruiter: {
      id: "r1",
      name: "Sarah Jenkins",
      company: "Acme Corp",
      trustLevel: "verified",
      riskSignals: [],
      avatar: "https://i.pravatar.cc/150?u=sarahj"
    }
  },
  {
    id: "j2",
    title: "Machine Learning Intern",
    company: "TechNova AI",
    recruiterId: "r2",
    stipend: "$4,500/mo",
    location: "New York, NY",
    tags: ["Hybrid", "Internship"],
    description: "Looking for an enthusiastic data science intern to help analyze large unstructured datasets and build predictive LLM models. Focus on AI safety and alignment.",
    skillsRequired: ["Python", "PyTorch", "TensorFlow"],
    recruiter: {
      id: "r2",
      name: "David Chen",
      company: "TechNova AI",
      trustLevel: "suspicious",
      riskSignals: ["New recruiter profile", "Limited hiring history"],
      avatar: "https://i.pravatar.cc/150?u=davidc"
    }
  },
  {
    id: "j3",
    title: "Junior Backend Security Engineer",
    company: "Global Innovate",
    recruiterId: "r3",
    stipend: "$8,000/mo",
    location: "Austin, TX",
    tags: ["On-site", "Full-time"],
    description: "Build robust APIs and microservices with a strict focus on zero-trust architecture. Entry-level position for recent graduates.",
    skillsRequired: ["Node.js", "PostgreSQL", "Cybersecurity"],
    recruiter: {
      id: "r3",
      name: "Global Innovate HR",
      company: "Global Innovate",
      trustLevel: "high_risk",
      riskSignals: ["Domain mismatch", "Reported previously for bait-and-switch"],
      avatar: "https://i.pravatar.cc/150?u=global"
    }
  },
  {
    id: "j4",
    title: "Product Design (UI/UX) Intern",
    company: "Nexus Dynamics",
    recruiterId: "r4",
    stipend: "$2,800/mo",
    location: "London, UK (Remote)",
    tags: ["Remote", "Internship"],
    description: "Design pixel-perfect, accessible user interfaces. You will collaborate with engineering and product teams to translate complex requirements into intuitive user flows.",
    skillsRequired: ["Figma", "UI/UX", "Wireframing"],
    recruiter: {
      id: "r4",
      name: "Elena Rodriguez",
      company: "Nexus Dynamics",
      trustLevel: "verified",
      riskSignals: [],
      avatar: "https://i.pravatar.cc/150?u=elena"
    }
  },
  {
    id: "j5",
    title: "Cloud Infrastructure Associate",
    company: "CloudScale Systems",
    recruiterId: "r5",
    stipend: "$5,500/mo",
    location: "Seattle, WA",
    tags: ["Hybrid", "Full-time"],
    description: "Help automate and manage our rapidly growing AWS infrastructure. Implement CI/CD pipelines and infrastructure as code using Terraform.",
    skillsRequired: ["AWS", "Docker", "Terraform"],
    recruiter: {
      id: "r5",
      name: "Marcus Thorne",
      company: "CloudScale Systems",
      trustLevel: "verified",
      riskSignals: [],
      avatar: "https://i.pravatar.cc/150?u=marcus"
    }
  }
];

export const mockAppliedJobs = [
  {
    id: "app1",
    job: mockJobs[0],
    status: "Under Review",
    appliedDate: "2026-02-21",
    flags: []
  },
  {
    id: "app2",
    job: mockJobs[1],
    status: "Trust Review Pending",
    appliedDate: "2026-02-22",
    flags: ["Identity Consistency Check Active"]
  },
  {
    id: "app3",
    job: mockJobs[3],
    status: "Shortlisted",
    appliedDate: "2026-02-18",
    flags: []
  }
];
