export type ProjectCategory =
  | "all"
  | "agentic-ai"
  | "ml-cv"
  | "software-engineering"
  | "cloud-devops";

export interface Project {
  id: string;
  name: string;
  title: string;
  category: ProjectCategory[];
  categoryLabel: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  placeholder: string; // placeholder gradient / label for thumbnail
  tech: string[];
  features: { heading: string; points: string[] }[];
  overview: string;
  problem: string;
  solution: string;
  contributions: string[];
  architecture: string;
}

export const FILTER_LABELS: Record<ProjectCategory, string> = {
  all: "All Projects",
  "agentic-ai": "Agentic AI & Generative AI",
  "ml-cv": "Machine Learning & Computer Vision",
  "software-engineering": "Software Engineering",
  "cloud-devops": "Cloud & DevOps",
};

export const PROJECTS: Project[] = [
  {
    id: "rubberex",
    name: "RubberEX",
    title: "AI-Powered Rubber Industry Intelligence & Digital Supply Chain Platform",
    category: ["ml-cv", "software-engineering"],
    categoryLabel: "AI Engineering · Machine Learning · Computer Vision",
    description:
      "RubberEX is an AI-powered platform modernising Sri Lanka's rubber industry by integrating Machine Learning, Computer Vision, Generative AI, market intelligence, and secure Digital Product Passports.",
    githubUrl: "https://github.com/Mithun-Mh/Final-Year-Research-Project.git",
    placeholder: "RubberEX",
    tech: [
      "C#", ".NET 8", "Python", "Machine Learning", "Computer Vision",
      "RAG", "LangChain", "Google Gemini", "MongoDB", "React Native",
      "JWT", "SHA-256",
    ],
    features: [
      {
        heading: "AI Plantation Health Intelligence",
        points: [
          "Rubber plantation disease detection and identification.",
          "AI-assisted plantation health monitoring.",
          "Intelligent plantation management insights.",
        ],
      },
      {
        heading: "Computer Vision – Production Quality Control",
        points: [
          "Image-based rubber quality assessment.",
          "Automated quality classification.",
          "Rubber grading and production evaluation.",
        ],
      },
      {
        heading: "Rubber Market Intelligence & Auction Price Prediction",
        points: [
          "Historical rubber auction price analysis.",
          "Machine Learning-based rubber auction price prediction.",
          "Rubber market trend analysis.",
          "Auction price comparison and market insights.",
          "Data-driven pricing decision support.",
        ],
      },
      {
        heading: "RubberBot – RAG-Based AI Assistant",
        points: [
          "Retrieval-Augmented Generation (RAG).",
          "Context-aware information retrieval.",
          "AI-powered rubber industry assistance.",
        ],
      },
      {
        heading: "Secure Digital Product Passport (DPP)",
        points: [
          "Digital product traceability.",
          "SHA-256 hash-based document verification.",
          "Confidentiality-aware document access.",
          "JWT-based role authorisation and access control.",
        ],
      },
    ],
    overview:
      "RubberEX is a final-year research project addressing digitisation gaps across Sri Lanka's rubber industry — from plantation management to global supply-chain transparency.",
    problem:
      "Sri Lanka's rubber industry operates with limited digital tooling, leading to inefficient disease management, inconsistent quality grading, opaque pricing, and no verifiable product traceability.",
    solution:
      "An integrated platform combining Computer Vision for disease detection and quality grading, ML models for auction price prediction, a RAG-based chatbot for domain Q&A, and a cryptographically secured Digital Product Passport.",
    contributions: [
      "Designed and implemented the ML pipeline for auction price prediction.",
      "Built the Computer Vision module for rubber quality classification.",
      "Integrated LangChain and Google Gemini for the RubberBot RAG assistant.",
      "Developed the SHA-256-based Digital Product Passport verification system.",
      "Contributed to the React Native mobile interface and .NET 8 backend APIs.",
    ],
    architecture:
      "Mobile-first React Native client communicating with .NET 8 REST APIs. Python ML services exposed via FastAPI microservices. MongoDB for flexible document storage. LangChain / Google Gemini powering the RAG assistant.",
  },
  {
    id: "tripmate-ai",
    name: "TripMate AI",
    title: "Intelligent Multi-Agent AI Travel Planning Assistant",
    category: ["agentic-ai"],
    categoryLabel: "Agentic AI · Generative AI · Multi-Agent Systems",
    description:
      "TripMate AI is an intelligent travel planning application exploring agentic workflows, LLM-powered reasoning, and tool integration to assist users with travel-related tasks.",
    githubUrl: "https://github.com/Mithun-Mh/TripeMate-AI--Muti-Agent-Trip-Planner.git",
    placeholder: "TripMate AI",
    tech: ["Python", "LangChain", "LangGraph", "Google Gemini", "LangSmith"],
    features: [
      {
        heading: "Agentic Workflow",
        points: [
          "LangGraph-based agentic workflows.",
          "LLM integration using Google Gemini.",
          "Tool-based execution.",
          "Multi-step task orchestration.",
          "AI agent coordination for travel planning.",
          "LangSmith monitoring and debugging.",
        ],
      },
    ],
    overview:
      "TripMate AI explores how LangGraph-orchestrated agents can decompose complex travel planning tasks into coordinated, tool-driven steps — a practical study in agentic AI patterns.",
    problem:
      "Travel planning involves many interdependent subtasks — itinerary generation, accommodation search, local activity research — that benefit from agent coordination rather than a single LLM call.",
    solution:
      "A LangGraph state-machine routes user intent through specialised agents, each equipped with targeted tools, monitored end-to-end via LangSmith.",
    contributions: [
      "Designed the LangGraph agent graph and state schema.",
      "Implemented individual agent nodes and tool integrations.",
      "Integrated Google Gemini as the underlying LLM.",
      "Set up LangSmith tracing for observability and debugging.",
    ],
    architecture:
      "Python application with a LangGraph directed-graph orchestrating multiple agent nodes. Each node calls Google Gemini with tool-use enabled. LangSmith captures traces for every execution.",
  },
  {
    id: "book-publisher-api",
    name: "Book Publisher API",
    title: "Containerised REST API with Automated CI/CD and AWS Deployment",
    category: ["cloud-devops", "software-engineering"],
    categoryLabel: "Cloud Engineering · DevOps · CI/CD Automation",
    description:
      "A containerised Python REST API project demonstrating automated software testing, Docker image publishing, CI/CD automation, and deployment to AWS EC2.",
    githubUrl: "https://github.com/Mithun-Mh/Book-Publisher-CI_CD.git",
    placeholder: "Book Publisher API",
    tech: ["Python", "FastAPI", "Docker", "Docker Hub", "GitHub Actions", "AWS EC2", "Linux"],
    features: [
      {
        heading: "DevOps Pipeline",
        points: [
          "Python REST API development.",
          "Docker containerisation.",
          "Automated testing using GitHub Actions.",
          "Docker image building and publishing to Docker Hub.",
          "AWS EC2 deployment.",
          "Application health-check endpoint.",
          "Linux-based deployment environment.",
        ],
      },
    ],
    overview:
      "A practical DevOps showcase: a FastAPI service fully containerised with Docker, automatically tested and published via GitHub Actions, then deployed to AWS EC2.",
    problem:
      "Demonstrating a repeatable, automated path from code commit to production deployment without manual intervention.",
    solution:
      "GitHub Actions workflow triggers on every push — runs tests, builds a Docker image, pushes to Docker Hub, and SSH-deploys to an AWS EC2 Linux instance.",
    contributions: [
      "Built the FastAPI REST API and health-check endpoint.",
      "Wrote the Dockerfile and docker-compose configuration.",
      "Authored the GitHub Actions CI/CD workflow YAML.",
      "Configured AWS EC2 instance and deployment scripts.",
    ],
    architecture:
      "FastAPI app → Docker container → Docker Hub registry → GitHub Actions pipeline → AWS EC2 instance running Docker on Ubuntu.",
  },
  {
    id: "fashion-wander-wear",
    name: "Fashion Wander Wear",
    title: "Fashion Retail E-Commerce & Sales Forecasting Platform",
    category: ["software-engineering"],
    categoryLabel: "Full-Stack Development · E-Commerce · Machine Learning",
    description:
      "A fashion retail application combining full-stack web development with sales forecasting and optimisation concepts using machine learning and time-series analysis.",
    githubUrl: "https://github.com/Mithun-Mh/ITPM-CLOTHING.git",
    placeholder: "Fashion Wander Wear",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Python", "Pandas", "Machine Learning", "Time-Series Forecasting"],
    features: [
      {
        heading: "Platform Capabilities",
        points: [
          "Full-stack fashion retail application.",
          "Sales data preprocessing.",
          "Sales trend analysis.",
          "Time-series forecasting.",
          "Business intelligence and visualisation.",
          "Frontend and backend integration.",
        ],
      },
    ],
    overview:
      "Fashion Wander Wear is a MERN-stack e-commerce platform extended with a Python ML layer for sales trend analysis and time-series forecasting.",
    problem:
      "Fashion retailers need both a transactional web store and data-driven demand forecasting to manage stock and pricing effectively.",
    solution:
      "A React/Node.js storefront connected to a Python analytics service that preprocesses sales data and applies time-series forecasting models.",
    contributions: [
      "Built the React frontend and Express.js backend.",
      "Designed the MongoDB schema for products and orders.",
      "Developed the Python sales forecasting pipeline using Pandas.",
      "Integrated the forecasting output into the admin dashboard.",
    ],
    architecture:
      "React SPA → Express.js REST API → MongoDB. Separate Python service (Pandas / ML) processes historical sales and returns forecast data to the Node.js backend.",
  },
  {
    id: "infoplus",
    name: "InfoPlus",
    title: "Multi-Agent Research & Intelligence System",
    category: ["agentic-ai"],
    categoryLabel: "Multi-Agent AI · Generative AI · AI Research Automation",
    description:
      "InfoPlus is a multi-agent Generative AI system that automates web research, information extraction, research report generation, and quality evaluation through coordinated AI agents.",
    githubUrl: "https://github.com/Mithun-Mh/Multi-Agent-Research-System.git",
    placeholder: "InfoPlus",
    tech: ["Python", "LangChain", "Google Gemini", "Tavily", "Trafilatura", "Beautiful Soup", "Streamlit"],
    features: [
      {
        heading: "Automated Multi-Agent Research",
        points: [
          "Developed a multi-agent Generative AI workflow.",
          "Automates web research, information extraction, and report generation.",
        ],
      },
      {
        heading: "Web Search & Web Scraping",
        points: [
          "Integrated web search and web scraping tools.",
          "Retrieves, processes, and synthesises information from web sources.",
        ],
      },
      {
        heading: "Source-Linked Research Reports",
        points: [
          "Generates structured research reports.",
          "Connects generated information with relevant source references.",
        ],
      },
      {
        heading: "Critic Agent & Quality Evaluation",
        points: [
          "Implemented a Critic Agent to evaluate generated reports.",
          "Identifies information gaps.",
          "Flags unsupported claims.",
          "Supports research report quality evaluation.",
        ],
      },
    ],
    overview:
      "InfoPlus demonstrates a production-style multi-agent pipeline where specialised agents collaborate to research a topic, extract web content, generate a report, and self-evaluate its quality.",
    problem:
      "Manual research is time-consuming and inconsistent. A single LLM call lacks the depth, source verification, and iterative quality-checking that rigorous research requires.",
    solution:
      "A LangChain-orchestrated multi-agent system: a Research Agent searches and scrapes the web, a Report Agent synthesises findings, and a Critic Agent evaluates and flags gaps — served through a Streamlit interface.",
    contributions: [
      "Designed the multi-agent architecture and agent communication protocol.",
      "Implemented the Research Agent with Tavily search and Trafilatura/BeautifulSoup scraping.",
      "Built the Report Agent for structured, source-linked output generation.",
      "Developed the Critic Agent for quality evaluation and gap detection.",
      "Created the Streamlit frontend for user interaction.",
    ],
    architecture:
      "Streamlit UI → LangChain orchestrator → Research Agent (Tavily + Trafilatura) → Report Agent (Google Gemini) → Critic Agent (Google Gemini) → final report output.",
  },
];
