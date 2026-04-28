const hiringProcess = {

  /* ================= PRODUCT BASED ================= */

  Zoho: {
    campus: [
      { round: "Aptitude Test", mode: "Offline (Pen & Paper)" },
      { round: "Technical Round", mode: "Offline" },
      { round: "Advanced Technical", mode: "Offline" },
      { round: "HR Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Aptitude Test", mode: "Online" },
      { round: "Technical Assessment", mode: "Online" },
      { round: "Technical Interview", mode: "Online / Offline" },
      { round: "HR Interview", mode: "Online" }
    ]
  },

  Google: {
    campus: [
      { round: "Online Assessment", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline / Online" },
      { round: "HR Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Shortlisting", mode: "Online" },
      { round: "Online Coding Test", mode: "Online" },
      { round: "Technical Interviews (2–4)", mode: "Online / Onsite" },
      { round: "Hiring Committee Review", mode: "Internal" }
    ]
  },

  Amazon: {
    campus: [
      { round: "Online Assessment", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline / Online" },
      { round: "HR Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Online Assessment", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" },
      { round: "HR Interview", mode: "Online" }
    ]
  },

  Microsoft: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline / Online" },
      { round: "HR Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Shortlisting", mode: "Online" },
      { round: "Online Coding Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" }
    ]
  },

  Apple: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Shortlisting", mode: "Online" },
      { round: "Technical Interviews (Multiple)", mode: "Online / Onsite" }
    ]
  },

  Meta: {
    campus: [
      { round: "Online Coding Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline / Online" }
    ],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Online Coding Assessment", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" }
    ]
  },

  Netflix: {
    campus: [],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" }
    ]
  },

  Adobe: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline" },
      { round: "HR Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Online Coding Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" }
    ]
  },

  Oracle: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Technical Interviews", mode: "Online" }
    ]
  },

  Salesforce: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" }
    ]
  },

  /* ================= SERVICE BASED ================= */

  TCS: {
    campus: [
      { round: "Aptitude Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" },
      { round: "HR Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Test (NQT)", mode: "Online" },
      { round: "Technical Interview", mode: "Online" },
      { round: "HR Interview", mode: "Online" }
    ]
  },

Cognizant: {
  campus: [
    { round: "Online Aptitude Test", mode: "Online" },
    { round: "Technical Interview", mode: "Offline" },
    { round: "HR Interview", mode: "Offline" }
  ],
  offcampus: [
    { round: "Online Assessment", mode: "Online" },
    { round: "Technical Interview", mode: "Online" },
    { round: "HR Interview", mode: "Online" }
  ]
},

  Infosys: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" },
      { round: "HR Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Assessment", mode: "Online" },
      { round: "Technical Interview", mode: "Online" },
      { round: "HR Interview", mode: "Online" }
    ]
  },

  Wipro: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Assessment", mode: "Online" },
      { round: "Technical Interview", mode: "Online" }
    ]
  },

  HCL: {
    campus: [
      { round: "Aptitude Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Online" }
    ]
  },

  "LTI Mindtree": {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Assessment", mode: "Online" },
      { round: "Technical Interview", mode: "Online" }
    ]
  },

  Accenture: {
    campus: [
      { round: "Cognitive Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" },
      { round: "HR Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Assessment", mode: "Online" },
      { round: "Technical Interview", mode: "Online" },
      { round: "HR Interview", mode: "Online" }
    ]
  },

  Capgemini: {
    campus: [
      { round: "Game-Based Assessment", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Assessment", mode: "Online" },
      { round: "Technical Interview", mode: "Online" }
    ]
  },

  IBM: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Online" }
    ]
  },

  Deloitte: {
  campus: [
    { round: "Online Aptitude Test", mode: "Online" },
    { round: "Technical Assessment", mode: "Online" },
    { round: "Technical Interview", mode: "Offline" },
    { round: "Managerial Interview", mode: "Offline" },
    { round: "HR Interview", mode: "Offline" }
  ],
  offcampus: [
    { round: "Resume Screening", mode: "Online" },
    { round: "Online Aptitude + Technical Test", mode: "Online" },
    { round: "Technical Interview", mode: "Online" },
    { round: "Managerial Interview", mode: "Online" },
    { round: "HR Interview", mode: "Online" }
  ]
},


  /* ================= CORE COMPANIES ================= */

  Qualcomm: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" }
    ]
  },

  Intel: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" }
    ]
  },

  NVIDIA: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" }
    ]
  },

  TexasInstruments: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interviews", mode: "Offline" }
    ],
    offcampus: [
      { round: "Resume Screening", mode: "Online" },
      { round: "Technical Interviews", mode: "Online / Onsite" }
    ]
  },

  Bosch: {
    campus: [
      { round: "Aptitude + Technical Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Online" }
    ]
  },

  Siemens: {
    campus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Offline" }
    ],
    offcampus: [
      { round: "Online Test", mode: "Online" },
      { round: "Technical Interview", mode: "Online" }
    ]
  },

  SamsungSemiconductor: {
  campus: [
    { round: "Online Aptitude Test", mode: "Online" },
    { round: "Technical Written Test", mode: "Online" },
    { round: "Technical Interviews", mode: "Offline" },
    { round: "HR Interview", mode: "Offline" }
  ],
  offcampus: [
    { round: "Resume Screening", mode: "Online" },
    { round: "Online Technical Test", mode: "Online" },
    { round: "Technical Interviews", mode: "Online / Onsite" },
    { round: "HR Interview", mode: "Online" }
  ]
},

AppliedMaterials: {
  campus: [
    { round: "Online Technical Test", mode: "Online" },
    { round: "Core Technical Interview", mode: "Offline" },
    { round: "Managerial Interview", mode: "Offline" },
    { round: "HR Interview", mode: "Offline" }
  ],
  offcampus: [
    { round: "Resume Screening", mode: "Online" },
    { round: "Technical Interview (Core)", mode: "Online" },
    { round: "Managerial Interview", mode: "Online" },
    { round: "HR Interview", mode: "Online" }
  ]
},

ASML: {
  campus: [
    { round: "Online Aptitude + Technical Test", mode: "Online" },
    { round: "Core Technical Interview", mode: "Offline" },
    { round: "System / Domain Interview", mode: "Offline" },
    { round: "HR Interview", mode: "Offline" }
  ],
  offcampus: [
    { round: "Resume Screening", mode: "Online" },
    { round: "Technical Interview (Core)", mode: "Online" },
    { round: "System Design / Domain Round", mode: "Online" },
    { round: "HR Interview", mode: "Online" }
  ]
},

Micron: {
  campus: [
    { round: "Online Aptitude Test", mode: "Online" },
    { round: "Technical Test (Core + Programming)", mode: "Online" },
    { round: "Technical Interviews", mode: "Offline" },
    { round: "HR Interview", mode: "Offline" }
  ],
  offcampus: [
    { round: "Resume Screening", mode: "Online" },
    { round: "Online Technical Assessment", mode: "Online" },
    { round: "Technical Interviews", mode: "Online / Onsite" },
    { round: "HR Interview", mode: "Online" }
  ]
}





};

export default hiringProcess;
