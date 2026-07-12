/* ─────────────────────────────────────────────
 * content.ts — Single source of truth for all copy
 * ───────────────────────────────────────────── */

// ── Site-wide config ──────────────────────────
export const siteConfig = {
  name: "Ankit Premi",
  nickname: "a4kit",
  tagline: "data nerd by day, model trainer by night",
  location: "Delhi, India",
  instagram: "https://www.instagram.com/_a4kit",
  instagramHandle: "_a4kit",
  linkedin: "https://www.linkedin.com/in/ankit-premi-a37b37255/",
  email: "ankitpremiji@gmail.com",
  roleProgression: [
    { prefix: "started as", role: "a curious student" },
    { prefix: "figured out", role: "data & AI actually excite me" },
    { prefix: "currently", role: "building AI/ML systems that solve real problems" },
  ],
  heroAnnotation: "codes by day, trains models by midnight",
};

// ── Nav items ─────────────────────────────────
export const navItems = [
  { label: "Best Work", href: "/#best-work" },
  { label: "Contact", href: "/#contact" },
];

// ── Section IDs for scroll-spy ────────────────
export const sections = [
  { id: "hero", label: "Hello" },
  { id: "about", label: "About Me", note: "the origin story, in ~60 words" },
  { id: "projects", label: "Experience", note: "what i've built so far" },
  { id: "best-work", label: "Best Work", note: "the flagship case studies" },
  { id: "certifications", label: "Certifications", note: "what i've learned & earned" },
  { id: "beyond-models", label: "Beyond Models", note: "when i'm not coding" },
  { id: "insomniac", label: "Insomniac Work", note: "side projects, just for fun" },
  { id: "cv-cloud", label: "My CV in ~40 Words", note: "the tl;dr version" },
  { id: "contact", label: "Contact", note: "let's talk" },
];

// ── About Me ──────────────────────────────────
export const aboutContent = {
  pullQuote: "i didn't plan to end up in AI — i just kept following the interesting problems.",
  paragraphs: [
    "it started with curiosity. i picked up Python, fell into data, and realized i could make machines learn patterns that humans miss. that felt like a superpower.",
    "since then, i've built RAG systems that replace hours of document searching, churn prediction pipelines that save businesses real money, and NLP models that catch hate speech before it spreads.",
    "i'm a fresher from Delhi, hunting for data analyst, business analyst, or AI/ML engineer roles. i bring real projects, not just certificates. every project here solved a real problem — or at least tried to.",
  ],
  stats: [
    { value: "4+", label: "end-to-end projects" },
    { value: "94.8%", label: "best model accuracy" },
    { value: "5+", label: "ML algorithms mastered" },
  ],
};

// ── Projects & Experience ─────────────────────
export interface Experience {
  number: number;
  company: string;
  oneLiner: string;
  role: string;
  achievements: string[];
  stats: { value: string; label: string }[];
  variant: "navy" | "cream" | "blue";
}

export const experiences: Experience[] = [
  {
    number: 1,
    company: "Rancho Labs",
    oneLiner: "IIT Delhi Startup · APR 2026 – PRESENT",
    role: "AI Associate",
    achievements: [
      "Developing Generative AI features for AI-powered applications using Large Language Models.",
      "Designing, testing, and refining prompt workflows to improve AI responses.",
      "Integrating AI capabilities with backend REST APIs and automating internal workflows using Python."
    ],
    stats: [
      { value: "Python", label: "LangChain" },
      { value: "GenAI", label: "REST APIs" },
    ],
    variant: "navy",
  },
  {
    number: 2,
    company: "VOIS",
    oneLiner: "Vodafone Intelligent Solutions · Remote · SEP – OCT 2025",
    role: "Data Analyst Intern",
    achievements: [
      "Built an LLM-powered reporting assistant to automate report generation.",
      "Implemented Retrieval-Augmented Generation (RAG) for document-aware question answering.",
      "Integrated the solution with Slack and backend services for streamlined report delivery.",
      "Improved response quality through prompt engineering and document chunk optimization."
    ],
    stats: [
      { value: "Python", label: "LangChain" },
      { value: "RAG", label: "OpenAI APIs" },
    ],
    variant: "cream",
  },
  {
    number: 3,
    company: "C-DOT",
    oneLiner: "Centre for Development of Telematics · New Delhi · JUL – AUG 2025",
    role: "Research & Development Intern",
    achievements: [
      "Developed a supervised machine learning model for phishing URL detection.",
      "Engineered lexical and structural URL features for phishing classification.",
      "Trained and evaluated Random Forest and XGBoost models for performance comparison.",
      "Built a reusable machine learning pipeline for preprocessing, training, and evaluation."
    ],
    stats: [
      { value: "XGBoost", label: "Scikit-Learn" },
      { value: "Pandas", label: "Features" },
    ],
    variant: "blue",
  },
  {
    number: 4,
    company: "MAIT",
    oneLiner: "Maharaja Agrasen Institute of Technology · Delhi · 2022 – 2026",
    role: "B.Tech — Artificial Intelligence & Data Science",
    achievements: [
      "Studied Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, MLOps, Cloud Computing, and Data Structures & Algorithms.",
      "Built hands-on AI and machine learning projects through coursework and internships."
    ],
    stats: [
      { value: "ML", label: "Deep Learning" },
      { value: "NLP", label: "Computer Vision" },
    ],
    variant: "navy",
  },
];

// ── Certifications & Achievements ─────────────
export const certifications = [
  { issuer: "Anthropic", title: "Claude 101" },
  { issuer: "Microsoft", title: "Career Essentials in Generative AI" },
  { issuer: "DeepLearning.AI", title: "Supervised Machine Learning: Regression and Classification" },
  { issuer: "Google Cloud Skills Boost", title: "Explore Generative AI with Vertex AI Gemini API" },
  { issuer: "Google Cloud Skills Boost", title: "Enhance Gemini Model Capabilities" },
  { issuer: "Google Cloud Skills Boost", title: "Create ML Models with BigQuery ML" },
  { issuer: "Google Cloud Skills Boost", title: "Perform Predictive Data Analysis in BigQuery" },
  { issuer: "Google Cloud Skills Boost", title: "Build Infrastructure with Terraform on Google Cloud" },
  { issuer: "Deloitte", title: "Deloitte Data Analytics" },
  { issuer: "Stanford Online", title: "Statistics" },
  { issuer: "Google", title: "Python" },
];

export const achievements = [
  { issuer: "Indian Institute of Technology Delhi", title: "National Space Hackathon 2025" },
  { issuer: "Indian Institute of Management Ahmedabad", title: "Associate in Management (AIM)" },
  { issuer: "Fluxus – IIT Indore", title: "Face Recognition System" },
  { issuer: "HackerRank", title: "Software Engineer" },
];

// ── Beyond Models ─────────────────────────────
export const beyondModelsContent = {
  intro: "Technology is an important part of my life, but so are the simple moments that help me slow down, stay grounded, and enjoy the world around me.",
  hobbies: [
    {
      emoji: "🏓",
      title: "Table Tennis",
      description: "Table tennis is more than just a hobby for me. Whenever I step onto the table, I completely disconnect from everything else. It helps me clear my mind, stay present, and simply enjoy the game.",
    },
    {
      emoji: "🐾",
      title: "Animal Welfare",
      description: "I genuinely love animals. Whenever I see them, whether they're pets or stray animals, they instantly brighten my day. I enjoy spending time with them, playing with them, and believe every animal deserves kindness and care.",
    },
    {
      emoji: "🌿",
      title: "Nature & Travel",
      description: "I love visiting places surrounded by nature. There's something about mountains, forests, and open landscapes that makes me feel relaxed, refreshed, and at peace. Traveling to natural places is my favorite way to unwind and appreciate life's simple beauty.",
    }
  ]
};

// ── Case Study Type ───────────────────────────
export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  duration?: string;
  tags: string[];
  impactStats: { value: string; label: string }[];
  problem: { headline: string; body: string };
  solution: { steps: { number: string; title: string; description: string }[] };
  dataWalkthrough?: { steps: { title: string; before: string; after: string }[] };
  comparisonTable?: { headers: string[]; rows: string[][] };
  deployment?: { title: string; body: string };
  eda?: { points: string[] };
  businessValue: { headline: string; body: string };
  techStack: string[];
}

// ── Best Work (Case Studies) ──────────────────
export const bestWork: CaseStudy[] = [
  {
    slug: "sld-threat-classifier",
    title: "Enhanced SLD Threat Classifier",
    subtitle: "Typosquat & Homoglyph Detection",
    tags: ["Machine Learning", "Cybersecurity", "XGBoost", "Feature Engineering", "Python"],
    impactStats: [
      { value: "XGBoost", label: "Model" },
      { value: "Unicode", label: "Homoglyphs" },
      { value: "Lexical", label: "Features" },
      { value: "ML", label: "Detection" }
    ],
    problem: {
      headline: "traditional blacklists fail to detect newly created malicious domains",
      body: "Cyber attackers often create malicious domain names that closely resemble legitimate websites to trick users into revealing sensitive information or downloading malware. They commonly use typosquatting (e.g., gooogle.com) and homoglyph attacks (using visually similar Unicode characters). Traditional blacklist-based systems often fail to detect newly created domains. The goal was to develop an intelligent threat classifier capable of identifying suspicious second-level domains (SLDs) by combining machine learning with typosquat and homoglyph detection.",
    },
    solution: {
      steps: [
        {
          number: "01",
          title: "Feature Engineering",
          description: "Machine learning models cannot directly interpret domain names, so each domain is transformed into numerical features including domain length, number of digits, special characters, hyphens, entropy score, unique character count, and suspicious keywords.",
        },
        {
          number: "02",
          title: "Typosquat & Homoglyph Analysis",
          description: "The system compares suspicious domains with legitimate brand names using string similarity techniques. It also identifies visually deceptive substitutions through Unicode normalization and character comparison techniques before passing features into the classifier.",
        },
        {
          number: "03",
          title: "Machine Learning Pipeline",
          description: "Multiple supervised learning models (Random Forest, XGBoost) evaluate the characteristics of a domain. The model learns patterns from both legitimate and malicious domains to classify new inputs as legitimate or potentially malicious.",
        },
      ],
    },
    eda: {
      points: [
        "Class distribution",
        "Feature importance",
        "Confusion matrix",
        "ROC curve",
        "Domain length distribution",
        "Character frequency analysis"
      ]
    },
    businessValue: {
      headline: "stopping domain spoofing before users get tricked",
      body: "This system demonstrates how machine learning can strengthen cybersecurity by automatically detecting suspicious domains before users interact with them. By combining lexical feature engineering with typosquatting and homoglyph detection, it provides an additional layer of defense against phishing and domain spoofing attacks.",
    },
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "Random Forest", "Matplotlib", "Seaborn"],
  },
  {
    slug: "churnsense",
    title: "ChurnSense",
    subtitle: "Customer Churn Prediction Platform",
    tags: ["Machine Learning", "XGBoost", "FastAPI", "Docker", "Explainable AI"],
    impactStats: [
      { value: "XGBoost", label: "Prediction Engine" },
      { value: "FastAPI", label: "REST APIs" },
      { value: "Docker", label: "Deployment" },
      { value: "XAI", label: "Explainability" }
    ],
    problem: {
      headline: "acquiring a new customer is often more expensive than retaining an existing one",
      body: "Customer retention is one of the biggest challenges for subscription-based businesses. However, businesses usually don't know which customers are likely to leave until after they have already churned. The objective was to build a machine learning system that predicts customer churn using customer behavior and subscription information.",
    },
    solution: {
      steps: [
        {
          number: "01",
          title: "Data Processing",
          description: "Trained using customer-related information collected from subscription and behavioral data. Handled missing values, encoded categorical variables, and performed feature selection.",
        },
        {
          number: "02",
          title: "XGBoost Prediction Engine",
          description: "Used XGBoost to capture complex feature interactions and handle nonlinear relationships effectively. The trained model predicts whether a customer is likely to stay or churn along with a confidence score.",
        },
        {
          number: "03",
          title: "Explainability Layer",
          description: "Implemented a lightweight explainability layer that generates plain-language explanations highlighting the key factors influencing each prediction (e.g., short subscription tenure, high monthly charges).",
        },
      ],
    },
    deployment: {
      title: "FastAPI & Docker Deployment",
      body: "Exposed prediction services through FastAPI, allowing real-time and batch predictions. The complete application was containerized using Docker to ensure consistent execution across dev and production environments.",
    },
    businessValue: {
      headline: "predicting churn before it happens",
      body: "The platform enables organizations to identify customers at risk of leaving before churn occurs. By combining accurate ML predictions with easy-to-understand explanations and deployable APIs, the system supports proactive customer retention strategies.",
    },
    techStack: ["Python", "XGBoost", "Scikit-learn", "FastAPI", "Docker", "Pandas", "NumPy"],
  },
  {
    slug: "spreadsim",
    title: "SpreadSim",
    subtitle: "Disease Spread Simulation",
    tags: ["Graph Algorithms", "BFS", "DFS", "Dijkstra", "Simulation", "NumPy"],
    impactStats: [
      { value: "BFS", label: "Level Spread" },
      { value: "DFS", label: "Chain Analysis" },
      { value: "Dijkstra", label: "Shortest Path" },
      { value: "NumPy", label: "Optimization" }
    ],
    problem: {
      headline: "observing real-world outbreaks is expensive and often impractical",
      body: "Understanding how infectious diseases spread through a population is essential for public health planning and epidemic response. The goal was to build a simulation modeling how diseases propagate through a population network, allowing users to analyze transmission patterns.",
    },
    solution: {
      steps: [
        {
          number: "01",
          title: "Network Representation",
          description: "Developed a graph-based disease spread simulator where individuals are represented as nodes and their interactions as edges within a synthetic population network.",
        },
        {
          number: "02",
          title: "Graph Traversal Algorithms",
          description: "Implemented Breadth-First Search (BFS) for simultaneous level-by-level spread, Depth-First Search (DFS) for analyzing long chains of infection, and Dijkstra's Algorithm for calculating shortest transmission paths.",
        },
        {
          number: "03",
          title: "NumPy Optimization & Visuals",
          description: "Used NumPy vectorization instead of Python loops to reduce execution time and allow larger population simulations. Built visualizations using Matplotlib to show infection spread over time.",
        },
      ],
    },
    businessValue: {
      headline: "modeling transmission across connected populations",
      body: "SpreadSim demonstrates how graph algorithms can model disease transmission across connected populations. Such simulations can support epidemiological research and public health planning by helping users evaluate transmission scenarios safely.",
    },
    techStack: ["Python", "NumPy", "Matplotlib", "BFS", "DFS", "Dijkstra"],
  },
  {
    slug: "twitter-sentiment",
    title: "Twitter Sentiment Analysis",
    subtitle: "Hate Speech Detection System",
    tags: ["NLP", "Logistic Regression", "Word2Vec", "Streamlit", "Text Classification"],
    impactStats: [
      { value: "94.8%", label: "Accuracy" },
      { value: "0.552", label: "F1-Score" },
      { value: "5", label: "Models Compared" },
      { value: "31k+", label: "Tweets Analyzed" },
    ],
    problem: {
      headline: "millions of tweets. 7% are hate speech. finding them manually? impossible.",
      body: "Social media platforms receive millions of posts every day. Manually reviewing tweets to identify hate speech is slow, expensive, and inconsistent. Harmful content spreads before moderators detect it. The goal was to build an automated system classifying tweets as Normal (0) or Hate Speech (1).",
    },
    solution: {
      steps: [
        {
          number: "01",
          title: "NLP Preprocessing Pipeline",
          description: "Cleaned raw tweets with regex (removing emojis, URLs, mentions), lowercasing, tokenization, stopword removal, and Porter stemming — turning noisy social media text into clean, model-ready input.",
        },
        {
          number: "02",
          title: "Feature Engineering",
          description: "Converted cleaned text to numerical vectors using Bag of Words (CountVectorizer) + StandardScaler. Also experimented with Word2Vec and Doc2Vec semantic embeddings for contextual similarity.",
        },
        {
          number: "03",
          title: "Model Training & Selection",
          description: "Trained 5 classifiers: Logistic Regression, Random Forest, Decision Tree, SVM, XGBoost. Used F1-score (not accuracy) for evaluation because the dataset was highly imbalanced (93% normal, 7% hate). Logistic Regression won with best F1.",
        },
      ],
    },
    dataWalkthrough: {
      steps: [
        {
          title: "Raw Tweet",
          before: "\"I HATE you!!! 😡😡 100% #toxic @user123\"",
          after: "\"hate toxic\" (cleaned, stemmed, stopwords removed)",
        },
        {
          title: "Vectorization",
          before: "\"hate toxic\"",
          after: "[0, 1, 0, 0, 1, 0, ...] (BoW sparse vector)",
        },
        {
          title: "Prediction",
          before: "Feature vector → Logistic Regression",
          after: "Label: 1 (Hate Speech), Confidence: 0.89",
        },
      ],
    },
    comparisonTable: {
      headers: ["Model", "Accuracy", "F1 Score"],
      rows: [
        ["Logistic Regression", "94.8%", "0.552"],
        ["Random Forest", "94.6%", "0.528"],
        ["XGBoost", "94.7%", "0.518"],
        ["Decision Tree", "93.1%", "0.495"],
        ["SVM", "94.6%", "0.491"],
      ],
    },
    deployment: {
      title: "Streamlit Web App",
      body: "Deployed the trained model using Streamlit for an interactive web application. Users can enter custom tweets, select ML models, view predicted classes with confidence scores, and visualize each NLP preprocessing step in real-time.",
    },
    eda: {
      points: [
        "Class distribution visualization (93% normal vs 7% hate speech)",
        "Tweet length analysis across categories",
        "Word clouds for normal and hate-speech tweets",
        "Top hashtags analysis",
        "Confusion matrices for each model",
        "Model comparison dashboard with accuracy vs F1-score",
      ],
    },
    businessValue: {
      headline: "automated hate speech detection at scale",
      body: "The system demonstrates how NLP and machine learning can automate detection of harmful content, reducing manual moderation effort and enabling faster identification of hate speech. It provides an end-to-end workflow supporting content moderation teams in prioritizing flagged posts.",
    },
    techStack: ["Python", "Scikit-learn", "NLTK", "Gensim", "Streamlit", "Word2Vec"],
  },
];

// ── Insomniac Work (side projects) ────────────
export interface InsomniacItem {
  title: string;
  description: string;
  rotation: number;
  zIndex: number;
  color: string;
}

export const insomniacWork: InsomniacItem[] = [
  {
    title: "3am data cleaning scripts",
    description: "automated the boring stuff with Python at ungodly hours",
    rotation: -3,
    zIndex: 3,
    color: "#F0EDE4",
  },
  {
    title: "sentiment analysis experiments",
    description: "tried every embedding under the sun — Word2Vec, Doc2Vec, TF-IDF combos",
    rotation: 2,
    zIndex: 5,
    color: "#D8F24E",
  },
  {
    title: "SQL optimization rabbit holes",
    description: "rewriting queries until they ran 10x faster, just because",
    rotation: -1,
    zIndex: 2,
    color: "#F0EDE4",
  },
  {
    title: "matplotlib art",
    description: "turning boring charts into actually beautiful visualizations",
    rotation: 4,
    zIndex: 4,
    color: "#F0EDE4",
  },
  {
    title: "kaggle midnight sessions",
    description: "competing, learning, and mostly getting humbled by the leaderboard",
    rotation: -2,
    zIndex: 1,
    color: "#D8F24E",
  },
  {
    title: "model comparison marathons",
    description: "logistic regression vs XGBoost vs random forest — who wins at 2am?",
    rotation: 3,
    zIndex: 6,
    color: "#F0EDE4",
  },
];

// ── CV Word Cloud ─────────────────────────────
export interface CVWord {
  word: string;
  size: "xl" | "lg" | "md" | "sm";
  weight: "bold" | "semibold" | "normal";
}

export const cvWords: CVWord[] = [
  { word: "Python", size: "xl", weight: "bold" },
  { word: "Machine Learning", size: "xl", weight: "bold" },
  { word: "NLP", size: "lg", weight: "bold" },
  { word: "RAG", size: "lg", weight: "bold" },
  { word: "Data Analysis", size: "lg", weight: "semibold" },
  { word: "XGBoost", size: "md", weight: "semibold" },
  { word: "LangChain", size: "md", weight: "semibold" },
  { word: "FAISS", size: "md", weight: "semibold" },
  { word: "SQL", size: "lg", weight: "bold" },
  { word: "Pandas", size: "md", weight: "normal" },
  { word: "NumPy", size: "md", weight: "normal" },
  { word: "Scikit-learn", size: "md", weight: "semibold" },
  { word: "FastAPI", size: "md", weight: "semibold" },
  { word: "Docker", size: "md", weight: "normal" },
  { word: "Streamlit", size: "md", weight: "normal" },
  { word: "AWS", size: "md", weight: "semibold" },
  { word: "NLTK", size: "sm", weight: "normal" },
  { word: "Matplotlib", size: "sm", weight: "normal" },
  { word: "Word2Vec", size: "sm", weight: "normal" },
  { word: "Deep Learning", size: "md", weight: "semibold" },
  { word: "EDA", size: "sm", weight: "normal" },
  { word: "Feature Engineering", size: "md", weight: "normal" },
  { word: "Git", size: "sm", weight: "normal" },
  { word: "Graph Algorithms", size: "sm", weight: "normal" },
  { word: "Gensim", size: "sm", weight: "normal" },
  { word: "Computer Vision", size: "sm", weight: "normal" },
  { word: "Problem Solving", size: "md", weight: "semibold" },
  { word: "Statistics", size: "sm", weight: "normal" },
  { word: "Power BI", size: "sm", weight: "normal" },
  { word: "Excel", size: "sm", weight: "normal" },
];

// ── Contact links ─────────────────────────────
export const contactLinks = [
  { label: "Instagram", href: "https://www.instagram.com/_a4kit", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ankit-premi-a37b37255/", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/ankitpremi12", icon: "github" },
  { label: "Mail", href: "mailto:ankitpremiji@gmail.com", icon: "mail" },
];
