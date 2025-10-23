import React, * as react from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "src/views/components/ui/badge";
import { Button } from "src/views/components/ui/forms/button";
import { SearchInput } from "src/views/components/ui/forms/search-input";
import { FilterSelect } from "src/views/components/ui/filter-select";
import { Separator } from "src/views/components/ui/separator";
import { SectionHeader } from "src/views/components/ui/section/section-header";
import {
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Filter,
  GitBranch,
  GitFork,
  Globe,
  Layers,
  LucideProps,
  Search,
  Shield,
  Smartphone,
  Star,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  maintainers: number;
  stars: string;
  forks: string;
  language: string;
  languages: string[];
  primaryLanguage?: string;
  supportedEcosystems?: string[];
  status: "active" | "featured" | "new" | "trending";
  icon: react.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
  lastUpdated: string;
  githubUrl: string;
  website?: string;
  license: string;
  weeklyDownloads?: string;
  monthlyActiveUsers?: string;
  avatar?: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  onboardedMaintainers?: number;
  maintainerTypes?: ("founder" | "pmc" | "core-team" | "contributors" | "sponsors" | "advocates")[];
  primaryMaintainerType?: "founder" | "pmc" | "core-team" | "contributors" | "sponsors" | "advocates";
}

interface ProjectsShowcaseProps {
  title?: string;
  description?: string;
  projects?: Project[];
  variant?: "grid" | "list" | "featured" | "compact" | "stats" | "category";
  showSearch?: boolean;
  showFilters?: boolean;
  showStats?: boolean;
  maxProjects?: number;
  className?: string;
  onNavigation?: (href: string) => void;
}

// Mock data for participating projects
const defaultProjects: Project[] = [
  {
    id: "react",
    name: "React",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces with component-based architecture.",
    category: "Frontend Framework",
    subcategory: "UI Library",
    maintainers: 1500,
    stars: "220k",
    forks: "45k",
    language: "JavaScript",
    languages: ["JavaScript", "TypeScript", "Flow"],
    primaryLanguage: "JavaScript",
    supportedEcosystems: ["TypeScript", "Node.js", "Next.js"],
    status: "featured",
    icon: Code2,
    lastUpdated: "2 hours ago",
    githubUrl: "https://github.com/facebook/react",
    website: "https://reactjs.org",
    license: "MIT",
    weeklyDownloads: "18M",
    monthlyActiveUsers: "15M",
    tags: ["ui", "components", "javascript", "typescript"],
    featured: true,
    trending: true,
    onboardedMaintainers: 12,
    maintainerTypes: ["core-team", "contributors", "sponsors"],
    primaryMaintainerType: "core-team",
  },
  {
    id: "vue",
    name: "Vue.js",
    description: "The Progressive JavaScript Framework for building modern user interfaces and single-page applications.",
    category: "Frontend Framework",
    subcategory: "Progressive Framework",
    maintainers: 900,
    stars: "207k",
    forks: "34k",
    language: "TypeScript",
    languages: ["TypeScript", "JavaScript"],
    status: "active",
    icon: Globe,
    lastUpdated: "1 day ago",
    githubUrl: "https://github.com/vuejs/vue",
    website: "https://vuejs.org",
    license: "MIT",
    weeklyDownloads: "4.2M",
    monthlyActiveUsers: "3.8M",
    tags: ["vue", "javascript", "framework", "spa"],
    featured: true,
    onboardedMaintainers: 6,
    maintainerTypes: ["founder", "core-team", "contributors"],
    primaryMaintainerType: "founder",
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for scalable network applications.",
    category: "Runtime",
    subcategory: "JavaScript Runtime",
    maintainers: 1800,
    stars: "105k",
    forks: "28k",
    language: "JavaScript",
    languages: ["JavaScript", "C++", "Python"],
    status: "active",
    icon: Terminal,
    lastUpdated: "6 hours ago",
    githubUrl: "https://github.com/nodejs/node",
    website: "https://nodejs.org",
    license: "MIT",
    weeklyDownloads: "25M",
    tags: ["runtime", "javascript", "server", "backend"],
    onboardedMaintainers: 8,
    maintainerTypes: ["pmc", "core-team", "contributors"],
    primaryMaintainerType: "pmc",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Production-Grade Container Orchestration system for automating deployment, scaling, and management.",
    category: "Infrastructure",
    subcategory: "Container Orchestration",
    maintainers: 3200,
    stars: "108k",
    forks: "39k",
    language: "Go",
    languages: ["Go", "Shell", "Python"],
    status: "featured",
    icon: Layers,
    lastUpdated: "1 hour ago",
    githubUrl: "https://github.com/kubernetes/kubernetes",
    website: "https://kubernetes.io",
    license: "Apache-2.0",
    tags: ["containers", "orchestration", "devops", "cloud-native"],
    featured: true,
    trending: true,
    onboardedMaintainers: 15,
    maintainerTypes: ["pmc", "core-team", "contributors", "advocates"],
    primaryMaintainerType: "pmc",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    description: "An end-to-end open source platform for machine learning and artificial intelligence applications.",
    category: "Machine Learning",
    subcategory: "ML Framework",
    maintainers: 2100,
    stars: "185k",
    forks: "74k",
    language: "Python",
    languages: ["Python", "C++", "CUDA"],
    status: "active",
    icon: Cpu,
    lastUpdated: "3 hours ago",
    githubUrl: "https://github.com/tensorflow/tensorflow",
    website: "https://tensorflow.org",
    license: "Apache-2.0",
    weeklyDownloads: "2.1M",
    tags: ["machine-learning", "ai", "python", "deep-learning"],
    onboardedMaintainers: 20,
    maintainerTypes: ["sponsors", "core-team", "contributors"],
    primaryMaintainerType: "sponsors",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "The world's most advanced open source relational database system with strong ACID compliance.",
    category: "Database",
    subcategory: "Relational Database",
    maintainers: 800,
    stars: "15k",
    forks: "4.2k",
    language: "C",
    languages: ["C", "SQL"],
    status: "active",
    icon: Database,
    lastUpdated: "4 hours ago",
    githubUrl: "https://github.com/postgres/postgres",
    website: "https://postgresql.org",
    license: "PostgreSQL",
    tags: ["database", "sql", "relational", "acid"],
    onboardedMaintainers: 5,
    maintainerTypes: ["pmc", "core-team"],
    primaryMaintainerType: "pmc",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    description: "Modern, fast web framework for building APIs with Python 3.7+ based on standard Python type hints.",
    category: "Web Framework",
    subcategory: "API Framework",
    maintainers: 450,
    stars: "74k",
    forks: "6.1k",
    language: "Python",
    languages: ["Python"],
    status: "trending",
    icon: Zap,
    lastUpdated: "2 days ago",
    githubUrl: "https://github.com/tiangolo/fastapi",
    website: "https://fastapi.tiangolo.com",
    license: "MIT",
    weeklyDownloads: "1.8M",
    tags: ["api", "python", "async", "openapi"],
    trending: true,
    onboardedMaintainers: 2,
    maintainerTypes: ["founder", "contributors"],
    primaryMaintainerType: "founder",
  },
  {
    id: "redis",
    name: "Redis",
    description: "In-memory data structure store, used as a database, cache, and message broker with persistence.",
    category: "Database",
    subcategory: "In-Memory Database",
    maintainers: 650,
    stars: "66k",
    forks: "23k",
    language: "C",
    languages: ["C", "TCL"],
    status: "active",
    icon: Database,
    lastUpdated: "1 day ago",
    githubUrl: "https://github.com/redis/redis",
    website: "https://redis.io",
    license: "Redis",
    tags: ["cache", "database", "in-memory", "nosql"],
    onboardedMaintainers: 4,
    maintainerTypes: ["core-team", "contributors", "advocates"],
    primaryMaintainerType: "core-team",
  },
  {
    id: "docker",
    name: "Docker",
    description: "Platform for developing, shipping, and running applications using containerization technology.",
    category: "DevOps",
    subcategory: "Containerization",
    maintainers: 2800,
    stars: "68k",
    forks: "18k",
    language: "Go",
    languages: ["Go", "Shell"],
    status: "featured",
    icon: Layers,
    lastUpdated: "5 hours ago",
    githubUrl: "https://github.com/docker/docker-ce",
    website: "https://docker.com",
    license: "Apache-2.0",
    tags: ["containers", "devops", "deployment", "virtualization"],
    featured: true,
  },
  {
    id: "angular",
    name: "Angular",
    description: "Platform for building mobile and desktop web applications with TypeScript and comprehensive tooling.",
    category: "Frontend Framework",
    subcategory: "Full Framework",
    maintainers: 1600,
    stars: "95k",
    forks: "25k",
    language: "TypeScript",
    languages: ["TypeScript", "JavaScript"],
    status: "active",
    icon: Shield,
    lastUpdated: "1 day ago",
    githubUrl: "https://github.com/angular/angular",
    website: "https://angular.io",
    license: "MIT",
    weeklyDownloads: "3.1M",
    tags: ["typescript", "framework", "spa", "enterprise"],
  },
  {
    id: "django",
    name: "Django",
    description: "High-level Python web framework that encourages rapid development and clean, pragmatic design.",
    category: "Web Framework",
    subcategory: "Full-Stack Framework",
    maintainers: 1200,
    stars: "78k",
    forks: "31k",
    language: "Python",
    languages: ["Python", "HTML", "CSS"],
    primaryLanguage: "Python",
    supportedEcosystems: ["Python 3.8+", "PyPy", "Jython"],
    status: "active",
    icon: Code2,
    lastUpdated: "2 days ago",
    githubUrl: "https://github.com/django/django",
    website: "https://djangoproject.com",
    license: "BSD-3-Clause",
    weeklyDownloads: "1.2M",
    tags: ["python", "web", "mvc", "orm"],
  },
  {
    id: "flutter",
    name: "Flutter",
    description: "Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop.",
    category: "Mobile Framework",
    subcategory: "Cross-Platform",
    maintainers: 1100,
    stars: "164k",
    forks: "27k",
    language: "Dart",
    languages: ["Dart", "C++", "Java"],
    status: "trending",
    icon: Smartphone,
    lastUpdated: "8 hours ago",
    githubUrl: "https://github.com/flutter/flutter",
    website: "https://flutter.dev",
    license: "BSD-3-Clause",
    tags: ["mobile", "cross-platform", "dart", "google"],
    trending: true,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "A document database designed for ease of application development and scaling.",
    category: "Database",
    subcategory: "Document Database",
    maintainers: 1200,
    stars: "26k",
    forks: "5.7k",
    language: "C++",
    languages: ["C++", "JavaScript", "Python"],
    status: "active",
    icon: Database,
    lastUpdated: "6 hours ago",
    githubUrl: "https://github.com/mongodb/mongo",
    website: "https://mongodb.com",
    license: "SSPL",
    weeklyDownloads: "2.1M",
    tags: ["document-database", "nosql", "mongodb", "json"],
  },
  {
    id: "mysql",
    name: "MySQL",
    description: "The world's most popular open source database with proven performance, reliability and ease-of-use.",
    category: "Database",
    subcategory: "Relational Database",
    maintainers: 950,
    stars: "24k",
    forks: "12k",
    language: "C++",
    languages: ["C++", "C", "SQL"],
    status: "active",
    icon: Database,
    lastUpdated: "12 hours ago",
    githubUrl: "https://github.com/mysql/mysql-server",
    website: "https://mysql.com",
    license: "GPL-2.0",
    tags: ["relational", "sql", "mysql", "database"],
  },
  {
    id: "cassandra",
    name: "Apache Cassandra",
    description: "Highly-scalable partitioned row store designed for high availability and linear scalability.",
    category: "Database",
    subcategory: "Wide Column Store",
    maintainers: 650,
    stars: "8.7k",
    forks: "3.6k",
    language: "Java",
    languages: ["Java", "Python"],
    primaryLanguage: "Java",
    supportedEcosystems: ["Scala", "Kotlin", "Clojure", "Python"],
    status: "active",
    icon: Database,
    lastUpdated: "1 day ago",
    githubUrl: "https://github.com/apache/cassandra",
    website: "https://cassandra.apache.org",
    license: "Apache-2.0",
    tags: ["distributed", "nosql", "scalable", "cassandra"],
  },
  {
    id: "sqlite",
    name: "SQLite",
    description: "A C-language library that implements a small, fast, self-contained, high-reliability SQL database engine.",
    category: "Database",
    subcategory: "Embedded Database",
    maintainers: 12,
    stars: "6.1k",
    forks: "2.1k",
    language: "C",
    languages: ["C", "SQL"],
    status: "active",
    icon: Database,
    lastUpdated: "2 days ago",
    githubUrl: "https://github.com/sqlite/sqlite",
    website: "https://sqlite.org",
    license: "Public Domain",
    tags: ["embedded", "sql", "lightweight", "serverless"],
  },
  {
    id: "elasticsearch",
    name: "Elasticsearch",
    description: "Distributed, RESTful search and analytics engine capable of solving growing number of use cases.",
    category: "Database",
    subcategory: "Search Engine",
    maintainers: 1800,
    stars: "69k",
    forks: "24k",
    language: "Java",
    languages: ["Java", "Groovy"],
    status: "featured",
    icon: Database,
    lastUpdated: "3 hours ago",
    githubUrl: "https://github.com/elastic/elasticsearch",
    website: "https://elastic.co",
    license: "Elastic-2.0",
    weeklyDownloads: "890k",
    tags: ["search", "analytics", "distributed", "lucene"],
    featured: true,
  },
  {
    id: "influxdb",
    name: "InfluxDB",
    description: "Scalable datastore for metrics, events, and real-time analytics built specifically for time series data.",
    category: "Database",
    subcategory: "Time Series Database",
    maintainers: 420,
    stars: "28k",
    forks: "3.5k",
    language: "Go",
    languages: ["Go", "Rust"],
    status: "active",
    icon: Database,
    lastUpdated: "8 hours ago",
    githubUrl: "https://github.com/influxdata/influxdb",
    website: "https://influxdata.com",
    license: "MIT",
    tags: ["time-series", "metrics", "monitoring", "iot"],
  },
  {
    id: "neo4j",
    name: "Neo4j",
    description: "Graph database management system designed to store and query complex networks of connected data.",
    category: "Database",
    subcategory: "Graph Database",
    maintainers: 780,
    stars: "13k",
    forks: "2.4k",
    language: "Java",
    languages: ["Java", "Scala"],
    status: "active",
    icon: Database,
    lastUpdated: "1 day ago",
    githubUrl: "https://github.com/neo4j/neo4j",
    website: "https://neo4j.com",
    license: "GPL-3.0",
    tags: ["graph", "cypher", "relationships", "connected-data"],
  },
  {
    id: "couchdb",
    name: "Apache CouchDB",
    description: "Seamless multi-master sync, that scales from Big Data to Mobile, with an Intuitive HTTP/JSON API.",
    category: "Database",
    subcategory: "Document Database",
    maintainers: 320,
    stars: "6.1k",
    forks: "1.0k",
    language: "Erlang",
    languages: ["Erlang", "JavaScript"],
    status: "active",
    icon: Database,
    lastUpdated: "5 days ago",
    githubUrl: "https://github.com/apache/couchdb",
    website: "https://couchdb.apache.org",
    license: "Apache-2.0",
    tags: ["document", "json", "replication", "sync"],
  },
  {
    id: "rethinkdb",
    name: "RethinkDB",
    description: "The open-source database for the realtime web with an intuitive query language and easy scalability.",
    category: "Database",
    subcategory: "Realtime Database",
    maintainers: 180,
    stars: "26k",
    forks: "1.8k",
    language: "C++",
    languages: ["C++", "JavaScript"],
    status: "trending",
    icon: Database,
    lastUpdated: "2 weeks ago",
    githubUrl: "https://github.com/rethinkdb/rethinkdb",
    website: "https://rethinkdb.com",
    license: "Apache-2.0",
    tags: ["realtime", "reactive", "changefeed", "json"],
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Open source Firebase alternative providing instant APIs, realtime subscriptions, and user management.",
    category: "Database",
    subcategory: "Backend as a Service",
    maintainers: 890,
    stars: "72k",
    forks: "6.9k",
    language: "TypeScript",
    languages: ["TypeScript", "PostgreSQL", "Rust"],
    primaryLanguage: "TypeScript",
    supportedEcosystems: ["JavaScript", "Python", "Dart", "Go"],
    status: "trending",
    icon: Database,
    lastUpdated: "2 hours ago",
    githubUrl: "https://github.com/supabase/supabase",
    website: "https://supabase.com",
    license: "Apache-2.0",
    weeklyDownloads: "450k",
    tags: ["baas", "realtime", "auth", "postgresql"],
    trending: true,
  },
  {
    id: "kafka",
    name: "Apache Kafka",
    description: "Distributed event streaming platform for high-performance data pipelines, streaming analytics, and mission-critical applications.",
    category: "Data Platform",
    subcategory: "Event Streaming",
    maintainers: 750,
    stars: "28k",
    forks: "13k",
    language: "Java",
    languages: ["Java", "Scala"],
    primaryLanguage: "Java",
    supportedEcosystems: ["Scala", "Kotlin", "Clojure", "Python", "Go"],
    status: "active",
    icon: Database,
    lastUpdated: "4 hours ago",
    githubUrl: "https://github.com/apache/kafka",
    website: "https://kafka.apache.org",
    license: "Apache-2.0",
    tags: ["streaming", "distributed", "real-time", "jvm"],
    onboardedMaintainers: 8,
    maintainerTypes: ["pmc", "core-team", "contributors"],
    primaryMaintainerType: "pmc",
  },
  {
    id: "rust",
    name: "Rust",
    description: "A language empowering everyone to build reliable and efficient software with memory safety and zero-cost abstractions.",
    category: "Programming Language",
    subcategory: "Systems Language",
    maintainers: 1100,
    stars: "96k",
    forks: "12k",
    language: "Rust",
    languages: ["Rust", "C++"],
    primaryLanguage: "Rust",
    supportedEcosystems: ["WebAssembly", "Embedded", "CLI"],
    status: "featured",
    icon: Cpu,
    lastUpdated: "1 hour ago",
    githubUrl: "https://github.com/rust-lang/rust",
    website: "https://rust-lang.org",
    license: "MIT",
    tags: ["systems", "memory-safe", "performance", "webassembly"],
    featured: true,
    onboardedMaintainers: 15,
    maintainerTypes: ["core-team", "contributors", "sponsors"],
    primaryMaintainerType: "core-team",
  },
];

const getStatusBadge = (status: Project["status"]) => {
  switch (status) {
    case "featured":
      return <Badge className="bg-brand-primary text-primary-foreground">Featured</Badge>;
    case "trending":
      return <Badge className="bg-brand-warning text-white">Trending</Badge>;
    case "new":
      return <Badge className="bg-brand-success text-white">New</Badge>;
    case "active":
    default:
      return null;
  }
};

const getProjectIcon = (project: Project) => {
  const IconComponent = project.icon;
  return (
    <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
      <IconComponent size={20} className="text-brand-primary" />
    </div>
  );
};

export function ProjectsShowcase({
  title = "Open Source Projects",
  description = "Discover and connect with the world's most important open source projects. Our platform provides direct access to expert maintainers and comprehensive project support.",
  projects = defaultProjects,
  variant = "grid",
  showSearch = true,
  showFilters = true,
  showStats = true,
  maxProjects,
  className = "",
  onNavigation,
}: ProjectsShowcaseProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all");
  const [selectedMaintainerType, setSelectedMaintainerType] = React.useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("all");
  const [showAll, setShowAll] = React.useState(false);
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(new Set());

  // Filter and search logic
  const filteredProjects = React.useMemo(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        project =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    if (selectedMaintainerType !== "all") {
      filtered = filtered.filter(
        project => project.primaryMaintainerType === selectedMaintainerType || project.maintainerTypes?.includes(selectedMaintainerType as any),
      );
    }

    if (selectedLanguage !== "all") {
      filtered = filtered.filter(
        project =>
          project.primaryLanguage === selectedLanguage ||
          project.supportedEcosystems?.includes(selectedLanguage) ||
          project.language === selectedLanguage ||
          project.languages.includes(selectedLanguage),
      );
    }

    return filtered;
  }, [projects, searchTerm, selectedCategory, selectedStatus, selectedMaintainerType, selectedLanguage]);

  const displayedProjects = maxProjects && !showAll ? filteredProjects.slice(0, maxProjects) : filteredProjects;

  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(projects.map(p => p.category)));
    return cats.sort();
  }, [projects]);

  const maintainerTypes = React.useMemo(() => {
    const types = new Set<string>();
    projects.forEach(p => {
      if (p.primaryMaintainerType) types.add(p.primaryMaintainerType);
      p.maintainerTypes?.forEach(type => types.add(type));
    });
    return Array.from(types).sort();
  }, [projects]);

  const availableLanguages = React.useMemo(() => {
    const languages = new Set<string>();
    projects.forEach(p => {
      if (p.primaryLanguage) languages.add(p.primaryLanguage);
      if (p.language) languages.add(p.language);
      p.languages?.forEach(lang => languages.add(lang));
      p.supportedEcosystems?.forEach(eco => languages.add(eco));
    });
    return Array.from(languages).sort();
  }, [projects]);

  const stats = React.useMemo(() => {
    const totalStars = projects.reduce((sum, p) => sum + parseInt(p.stars.replace("k", "000").replace("M", "000000")), 0);
    const totalMaintainers = projects.reduce((sum, p) => sum + p.maintainers, 0);
    return {
      totalProjects: projects.length,
      totalStars: totalStars > 1000000 ? `${(totalStars / 1000000).toFixed(1)}M` : `${Math.round(totalStars / 1000)}k`,
      totalMaintainers: totalMaintainers > 1000 ? `${(totalMaintainers / 1000).toFixed(1)}k` : totalMaintainers.toString(),
      featuredProjects: projects.filter(p => p.featured).length,
    };
  }, [projects]);

  // Toggle category expansion
  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Render different variants
  const renderGridVariant = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedProjects.map(project => (
        <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-brand-primary/20">
          <CardContent className="p-6">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getProjectIcon(project)}
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
              </div>
              {getStatusBadge(project.status)}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star size={12} />
                <span>{project.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork size={12} />
                <span>{project.forks}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>{project.maintainers}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand-primary rounded-full"></div>
                <span className="text-xs text-muted-foreground">{project.language}</span>
              </div>
              <div className="flex gap-2">
                {project.website && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink size={14} />
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <GitBranch size={14} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderListVariant = () => (
    <div className="space-y-4">
      {displayedProjects.map(project => (
        <Card key={project.id} className="group hover:shadow-md transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {getProjectIcon(project)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium truncate">{project.name}</h3>
                    {getStatusBadge(project.status)}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{project.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star size={12} />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {project.maintainers}
                    </span>
                    <span>{project.category}</span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                      {project.language}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFeaturedVariant = () => {
    const featuredProjects = displayedProjects.filter(p => p.featured);
    const otherProjects = displayedProjects.filter(p => !p.featured);

    return (
      <div className="space-y-8">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-brand-primary" />
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {featuredProjects.slice(0, 4).map(project => (
                <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 border-brand-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                        <project.icon size={28} className="text-brand-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{project.name}</h3>
                          <Badge className="bg-brand-primary text-primary-foreground">Featured</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Star size={14} />
                            {project.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {project.maintainers} maintainers
                          </span>
                          {project.weeklyDownloads && <span>{project.weeklyDownloads} weekly downloads</span>}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 4).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="font-medium mb-4">All Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map(project => (
                <Card key={project.id} className="group hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                        <project.icon size={16} className="text-brand-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{project.name}</h4>
                        <p className="text-xs text-muted-foreground">{project.category}</p>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star size={10} />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={10} />
                        {project.maintainers}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                        {project.language}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCompactVariant = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {displayedProjects.map(project => (
        <Card key={project.id} className="group hover:shadow-md transition-all duration-200 cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-primary/20 transition-colors">
              <project.icon size={20} className="text-brand-primary" />
            </div>
            <h4 className="font-medium text-sm mb-1 truncate">{project.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{project.category}</p>
            <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star size={10} />
                {project.stars}
              </span>
              <span className="flex items-center gap-1">
                <Users size={10} />
                {project.maintainers}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderStatsVariant = () => (
    <div className="space-y-6">
      {displayedProjects.map(project => (
        <Card key={project.id} className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                    <project.icon size={28} className="text-brand-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{project.name}</h3>
                      {getStatusBadge(project.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.slice(0, 5).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-3 h-3 bg-brand-primary rounded-full"></div>
                      <span>{project.language}</span>
                      <span>•</span>
                      <span>{project.license}</span>
                      <span>•</span>
                      <span>Updated {project.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-brand-neutral-50/50 rounded-lg">
                  <div className="font-medium">{project.stars}</div>
                  <div className="text-xs text-muted-foreground">Stars</div>
                </div>
                <div className="text-center p-3 bg-brand-neutral-50/50 rounded-lg">
                  <div className="font-medium">{project.forks}</div>
                  <div className="text-xs text-muted-foreground">Forks</div>
                </div>
                <div className="text-center p-3 bg-brand-neutral-50/50 rounded-lg">
                  <div className="font-medium">{project.maintainers}</div>
                  <div className="text-xs text-muted-foreground">Maintainers</div>
                </div>
                <div className="text-center p-3 bg-brand-neutral-50/50 rounded-lg">
                  <div className="font-medium">{project.weeklyDownloads || "N/A"}</div>
                  <div className="text-xs text-muted-foreground">Weekly DL</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCategoryVariant = () => {
    const groupedProjects = categories.reduce(
      (acc, category) => {
        acc[category] = projects.filter(p => p.category === category);
        return acc;
      },
      {} as Record<string, Project[]>,
    );

    return (
      <div className="space-y-8">
        {categories.map(category => {
          const categoryProjects = groupedProjects[category];
          if (!categoryProjects || categoryProjects.length === 0) return null;

          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{category}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{categoryProjects.length} projects</Badge>
                  {categoryProjects.length > 6 && (
                    <Button variant="ghost" size="sm" onClick={() => toggleCategoryExpansion(category)} className="text-xs">
                      {expandedCategories.has(category) ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(expandedCategories.has(category) ? categoryProjects : categoryProjects.slice(0, 6)).map(project => (
                  <Card key={project.id} className="group hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4 relative overflow-hidden">
                      {/* Subtle background pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.01] via-transparent to-brand-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-brand-primary/5 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                      <div className="relative space-y-3">
                        {/* Enhanced Header */}
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/10 to-brand-accent/5 rounded-xl flex items-center justify-center group-hover:from-brand-primary/20 group-hover:to-brand-accent/10 transition-all duration-300 border border-brand-primary/10 group-hover:border-brand-primary/20">
                              <project.icon size={18} className="text-brand-primary group-hover:scale-110 transition-transform duration-300" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-brand-primary transition-colors duration-300">
                                {project.name}
                              </h4>
                              {getStatusBadge(project.status)}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Maintainer Section */}
                        <div className="relative p-3 bg-gradient-to-r from-brand-accent/20 via-brand-primary/5 to-brand-accent/10 rounded-xl border border-brand-primary/15 shadow-sm backdrop-blur-sm">
                          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/2 via-brand-accent/4 to-brand-success/2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative space-y-2">
                            {/* Maintainer Count Header */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-brand-primary/15 rounded-lg flex items-center justify-center">
                                  <Users size={12} className="text-brand-primary" />
                                </div>
                                <span className="text-xs font-medium text-foreground">{project.onboardedMaintainers || "3"} Expert Maintainers</span>
                              </div>
                              <div className="flex-1 h-px bg-gradient-to-r from-brand-primary/20 via-brand-primary/10 to-transparent"></div>
                            </div>

                            {/* Maintainer Types */}
                            <div className="flex flex-wrap gap-1.5">
                              {project.maintainerTypes && project.maintainerTypes.length > 0 ? (
                                project.maintainerTypes.slice(0, 2).map((type, index) => (
                                  <Badge
                                    key={type}
                                    variant="outline"
                                    className="text-xs px-2 py-0.5 bg-brand-primary/5 text-brand-primary border-brand-primary/30 hover:bg-brand-primary/10 transition-colors duration-300"
                                  >
                                    {type === "core-team" ? "Core Team" : type === "pmc" ? "PMC" : type.charAt(0).toUpperCase() + type.slice(1)}
                                  </Badge>
                                ))
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-xs px-2 py-0.5 border-brand-success/40 text-brand-success-dark bg-brand-success/25 hover:bg-brand-success/30 transition-colors duration-300"
                                >
                                  Expert
                                </Badge>
                              )}
                              {project.maintainerTypes && project.maintainerTypes.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs px-2 py-0.5 border-brand-neutral-300 text-brand-neutral-600 bg-brand-neutral-100/80 hover:bg-brand-neutral-200/80 transition-colors duration-300 dark:border-brand-neutral-600 dark:text-brand-neutral-400 dark:bg-brand-neutral-700/80"
                                >
                                  +{project.maintainerTypes.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Languages Section */}
                        {(project.primaryLanguage || (project.supportedEcosystems && project.supportedEcosystems.length > 0)) && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.primaryLanguage && (
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-1 border-border/60 text-muted-foreground bg-muted/30 hover:bg-muted/50 hover:border-border transition-all duration-300"
                              >
                                {project.primaryLanguage}
                              </Badge>
                            )}
                            {project.supportedEcosystems &&
                              project.supportedEcosystems.slice(0, 2).map((ecosystem, index) => (
                                <Badge
                                  key={ecosystem}
                                  variant="outline"
                                  className="text-xs px-2 py-1 border-border/60 text-muted-foreground bg-muted/30 hover:bg-muted/50 hover:border-border transition-all duration-300"
                                >
                                  {ecosystem}
                                </Badge>
                              ))}
                            {project.supportedEcosystems && project.supportedEcosystems.length > 2 && (
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-1 border-border/60 text-muted-foreground bg-muted/30 hover:bg-muted/50 hover:border-border transition-all duration-300"
                              >
                                +{project.supportedEcosystems.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Enhanced Stats and Actions */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5 group-hover:text-brand-accent transition-colors duration-300">
                              <Star size={12} className="fill-current" />
                              <span className="font-medium">{project.stars}</span>
                            </div>
                            <div className="w-px h-4 bg-border/60" />
                            <div className="flex items-center gap-1.5 group-hover:text-brand-primary transition-colors duration-300">
                              <GitFork size={12} />
                              <span className="font-medium">{project.forks || "2.1k"}</span>
                            </div>
                          </div>

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all duration-300"
                            title="View on GitHub"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>

                        {/* Enhanced CTA Button */}
                        <Button
                          size="sm"
                          className="w-full h-8 text-sm font-medium bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]"
                          onClick={() => onNavigation && onNavigation("get-started")}
                        >
                          Request Service
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {!expandedCategories.has(category) && categoryProjects.length > 6 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm" onClick={() => toggleCategoryExpansion(category)} className="text-xs">
                    View {categoryProjects.length - 6} More Projects
                  </Button>
                </div>
              )}
              {category !== categories[categories.length - 1] && <Separator className="mt-8" />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className={`relative py-16 md:py-24 bg-gradient-to-b from-background via-brand-neutral-50/30 to-background ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,64,175,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionHeader title={title} description={description} maxWidth="4xl" />
        </div>

        {/* Enhanced Stats Overview */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { label: "Total Projects", value: stats.totalProjects, icon: Layers },
              { label: "Combined Stars", value: stats.totalStars, icon: Star },
              { label: "Expert Maintainers", value: stats.totalMaintainers, icon: Users },
              { label: "Featured Projects", value: stats.featuredProjects, icon: TrendingUp },
            ].map((stat, index) => (
              <div key={stat.label} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-300" />
                <div className="relative p-6 bg-background/80 backdrop-blur-sm border border-brand-primary/10 rounded-xl hover:border-brand-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-lg flex items-center justify-center">
                      <stat.icon size={20} className="text-brand-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Search and Filters */}
        {(showSearch || showFilters) && (
          <div className="mb-12">
            <div className="p-6 bg-background/60 backdrop-blur-sm border border-brand-primary/10 rounded-2xl shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {showSearch && (
                  <div className="flex-1 min-w-0">
                    <SearchInput placeholder="Search projects, technologies, or maintainers..." value={searchTerm} onChange={setSearchTerm} size="lg" />
                  </div>
                )}

                {showFilters && (
                  <div className="flex flex-wrap xl:flex-nowrap items-center justify-start lg:justify-end gap-3 lg:flex-shrink-0">
                    <FilterSelect
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                      placeholder="All Categories"
                      icon={Filter}
                      width="w-[180px] lg:w-[160px] xl:w-[180px]"
                      size="lg"
                      options={[{ value: "all", label: "All Categories" }, ...categories.map(category => ({ value: category, label: category }))]}
                    />

                    <FilterSelect
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                      placeholder="All Languages"
                      icon={Code2}
                      width="w-[160px] lg:w-[140px] xl:w-[160px]"
                      size="lg"
                      options={[{ value: "all", label: "All Languages" }, ...availableLanguages.map(language => ({ value: language, label: language }))]}
                    />

                    <FilterSelect
                      value={selectedMaintainerType}
                      onValueChange={setSelectedMaintainerType}
                      placeholder="All Maintainers"
                      icon={Users}
                      width="w-[200px] lg:w-[180px] xl:w-[200px]"
                      size="lg"
                      options={[
                        { value: "all", label: "All Maintainers" },
                        { value: "founder", label: "Founders" },
                        { value: "pmc", label: "PMC Members" },
                        { value: "core-team", label: "Core Team" },
                        { value: "contributors", label: "Contributors" },
                        { value: "sponsors", label: "Sponsors" },
                        { value: "advocates", label: "Advocates" },
                      ]}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Projects Display */}
        <div className="mb-12">
          {variant === "grid" && renderGridVariant()}
          {variant === "list" && renderListVariant()}
          {variant === "featured" && renderFeaturedVariant()}
          {variant === "compact" && renderCompactVariant()}
          {variant === "stats" && renderStatsVariant()}
          {variant === "category" && renderCategoryVariant()}
        </div>

        {/* Enhanced No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 rounded-2xl blur-sm" />
            </div>
            <h3 className="text-xl font-semibold mb-3">No projects found</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
          </div>
        )}

        {/* Enhanced Request Project Support CTA */}
        <div className="relative mt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 via-brand-accent/5 to-brand-success/10 rounded-2xl blur-sm" />
          <div className="relative p-8 md:p-10 bg-background/90 backdrop-blur-sm border border-brand-primary/20 rounded-2xl shadow-xl shadow-brand-primary/5">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left flex-1">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 rounded-xl flex items-center justify-center">
                    <Zap size={24} className="text-brand-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">Don't see your project?</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  We're constantly expanding our network of expert maintainers. Request support for your critical dependencies and get direct access to the
                  world's best open source talent.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-white px-8 py-3 text-base font-medium shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300"
                >
                  Request Project Support
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5 px-8 py-3 text-base font-medium"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
