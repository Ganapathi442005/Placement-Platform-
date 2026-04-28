const productPreparationData = {

  Google: {
    websites: [
      "https://careers.google.com",
      "https://leetcode.com",
      "https://geeksforgeeks.org",
      "https://interviewbit.com",
      "https://systemdesignprimer.com"
    ],
    companySite: "https://www.google.com",
    topics: {
      resume: [
        "Algorithm-heavy projects",
        "Open source contributions",
        "Research or scalable systems projects"
      ],
      onlineAssessment: [
        "Arrays, Strings",
        "Trees, Graphs",
        "Dynamic Programming",
        "Bit Manipulation"
      ],
      technicalInterview: [
        "Advanced DSA",
        "System Design",
        "Distributed Systems",
        "Concurrency",
        "Operating Systems"
      ],
      hrInterview: [
        "Googleyness",
        "Team collaboration",
        "Failure & learning experiences"
      ]
    },
    extraFocus: [
      "Scalability",
      "Low-latency systems"
    ]
  },

  Amazon: {
    websites: [
      "https://amazon.jobs",
      "https://leetcode.com",
      "https://geeksforgeeks.org",
      "https://interviewbit.com",
      "https://educative.io"
    ],
    companySite: "https://www.amazon.com",
    topics: {
      resume: [
        "AWS-based backend projects",
        "Microservices architecture",
        "High-load system experience"
      ],
      onlineAssessment: [
        "Arrays, Strings",
        "Graphs",
        "Sliding Window",
        "Basic SQL"
      ],
      technicalInterview: [
        "DSA",
        "Object Oriented Design",
        "System Design",
        "Networking fundamentals"
      ],
      hrInterview: [
        "Leadership Principles (STAR)",
        "Ownership examples",
        "Customer obsession"
      ]
    },
    extraFocus: [
      "Leadership Principles",
      "Scalable backend design"
    ]
  },

  Microsoft: {
    websites: [
      "https://careers.microsoft.com",
      "https://leetcode.com",
      "https://geeksforgeeks.org",
      "https://interviewbit.com",
      "https://learn.microsoft.com"
    ],
    companySite: "https://www.microsoft.com",
    topics: {
      resume: [
        "Enterprise software projects",
        "Cloud or .NET based applications",
        "Internship experience"
      ],
      onlineAssessment: [
        "Arrays",
        "Trees",
        "Dynamic Programming"
      ],
      technicalInterview: [
        "DSA",
        "OOPS",
        "System Design",
        "Operating Systems"
      ],
      hrInterview: [
        "Growth mindset",
        "Team collaboration",
        "Why Microsoft?"
      ]
    },
    extraFocus: [
      "Cloud computing",
      "Software architecture"
    ]
  },

  Apple: {
    websites: [
      "https://jobs.apple.com",
      "https://leetcode.com",
      "https://geeksforgeeks.org",
      "https://developer.apple.com",
      "https://interviewbit.com"
    ],
    companySite: "https://www.apple.com",
    topics: {
      resume: [
        "Low-level system projects",
        "Performance optimized code",
        "Mobile / OS related work"
      ],
      onlineAssessment: [
        "Arrays",
        "Pointers",
        "Recursion"
      ],
      technicalInterview: [
        "C / C++",
        "Operating Systems",
        "Memory Management",
        "Data Structures"
      ],
      hrInterview: [
        "Product passion",
        "Attention to detail",
        "Cultural fit"
      ]
    },
    extraFocus: [
      "Operating system internals",
      "Low-level programming"
    ]
  },

  Meta: {
    websites: [
      "https://www.metacareers.com",
      "https://leetcode.com",
      "https://geeksforgeeks.org",
      "https://interviewbit.com",
      "https://systemdesignprimer.com"
    ],
    companySite: "https://about.meta.com",
    topics: {
      resume: [
        "Full-stack scalable applications",
        "High traffic systems",
        "Open source projects"
      ],
      onlineAssessment: [
        "Graphs",
        "Trees",
        "Dynamic Programming"
      ],
      technicalInterview: [
        "Advanced DSA",
        "System Design",
        "Distributed Systems"
      ],
      hrInterview: [
        "Impact driven stories",
        "Collaboration examples"
      ]
    },
    extraFocus: [
      "Large-scale data systems",
      "Distributed architectures"
    ]
  },

  Netflix: {
    websites: [
      "https://jobs.netflix.com",
      "https://leetcode.com",
      "https://geeksforgeeks.org",
      "https://interviewbit.com",
      "https://systemdesignprimer.com"
    ],
    companySite: "https://www.netflix.com",
    topics: {
      resume: [
        "High performance backend systems",
        "Streaming related projects",
        "Scalable microservices"
      ],
      onlineAssessment: [
        "Arrays",
        "Graphs",
        "Concurrency basics"
      ],
      technicalInterview: [
        "System Design",
        "Distributed Systems",
        "Performance optimization"
      ],
      hrInterview: [
        "Freedom & responsibility culture",
        "Ownership mindset"
      ]
    },
    extraFocus: [
      "Performance engineering",
      "Cloud scalability"
    ]
  },

  Adobe: {
    websites: [
      "https://careers.adobe.com",
      "https://leetcode.com",
      "https://geeksforgeeks.org",
      "https://interviewbit.com",
      "https://developer.adobe.com"
    ],
    companySite: "https://www.adobe.com",
    topics: {
      resume: [
        "UI/UX driven applications",
        "Creative software projects",
        "Frontend or backend systems"
      ],
      onlineAssessment: [
        "Arrays",
        "Strings",
        "Basic algorithms"
      ],
      technicalInterview: [
        "DSA",
        "OOPS",
        "System Design basics"
      ],
      hrInterview: [
        "Creative thinking",
        "Product awareness"
      ]
    },
    extraFocus: [
      "UI engineering",
      "Product design sense"
    ]
  },

  Oracle: {
    websites: [
      "https://www.oracle.com/careers",
      "https://leetcode.com",
      "https://geeksforgeeks.org",
      "https://interviewbit.com",
      "https://docs.oracle.com"
    ],
    companySite: "https://www.oracle.com",
    topics: {
      resume: [
        "Database related projects",
        "Enterprise applications"
      ],
      onlineAssessment: [
        "SQL",
        "Arrays",
        "Basic algorithms"
      ],
      technicalInterview: [
        "DBMS",
        "OOPS",
        "System Design"
      ],
      hrInterview: [
        "Enterprise mindset",
        "Long term goals"
      ]
    },
    extraFocus: [
      "Database optimization",
      "Enterprise systems"
    ]
  },

  Salesforce: {
    websites: [
      "https://careers.salesforce.com",
      "https://leetcode.com",
      "https://geeksforgeeks.org",
      "https://interviewbit.com",
      "https://trailhead.salesforce.com"
    ],
    companySite: "https://www.salesforce.com",
    topics: {
      resume: [
        "CRM based projects",
        "Cloud platform experience"
      ],
      onlineAssessment: [
        "Arrays",
        "Strings",
        "Basic SQL"
      ],
      technicalInterview: [
        "OOPS",
        "Cloud architecture",
        "System Design"
      ],
      hrInterview: [
        "Customer success mindset",
        "Company values"
      ]
    },
    extraFocus: [
      "Cloud CRM platforms",
      "Multi-tenant systems"
    ]
  },

  Zoho: {
    websites: [
      "https://www.zoho.com/careers",
      "https://geeksforgeeks.org",
      "https://hackerrank.com",
      "https://prepinsta.com",
      "https://w3schools.com"
    ],
    companySite: "https://www.zoho.com",
    topics: {
      resume: [
        "C/Java projects",
        "Database driven applications"
      ],
      onlineAssessment: [
        "Aptitude (Time & Distance, Ratio)",
        "Logical reasoning",
        "C / Java basics"
      ],
      technicalInterview: [
        "C Programming",
        "DBMS",
        "Operating Systems"
      ],
      hrInterview: [
        "Why Zoho?",
        "Long term commitment"
      ]
    },
    extraFocus: [
      "C programming mastery",
      "Backend development"
    ]
  }

};

export default productPreparationData;
