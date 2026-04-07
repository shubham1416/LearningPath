import { 
  GitBranch, 
  GitPullRequest, 
  Settings, 
  Activity, 
  PlayCircle,
  Code,
  Box,
  Layers,
  Terminal,
  TerminalSquare,
  FileCode,
  Globe2,
  CloudCog,
  Infinity as InfinityIcon,
  BarChart
} from 'lucide-react';

import React from 'react';

export type CommandDetail = {
  cmd: string;
  desc: string;
};

export type LevelData = {
  title: string;
  description: string | string[];
  studyMaterials: { name: string; link: string; isInternal?: boolean; internalRouteKey?: string; isVideo?: boolean }[];
  studyContent?: {
    whatIsIt: string;
    whyUseIt: string;
    howToUseIt: string;
    commands: CommandDetail[];
  };
};

export type ToolCategory = 
  | 'Programming Languages' 
  | 'OS & Environment' 
  | 'Scripting Languages' 
  | 'Version Control' 
  | 'CI/CD' 
  | 'Containerization' 
  | 'Orchestration'
  | 'Infrastructure as Code'
  | 'Configuration Management'
  | 'Monitoring & Observability'
  | 'Cloud Platforms'
  | 'Build Tools'
  | 'Architecture & Design';

export type ToolData = {
  id: string;
  name: string;
  icon: React.ElementType;
  category: ToolCategory;
  shortDesc: string;
  concept: string;
  advancedConcept: string;
  levels: {
    beginner: LevelData;
    intermediate: LevelData;
    expert: LevelData;
  };
};

// Organize according to roadmap.sh/devops flow roughly
export const toolsData: ToolData[] = [
  // ===================== PROGRAMMING LANGUAGES =====================
  {
    id: 'python',
    name: 'Python',
    icon: FileCode,
    category: 'Programming Languages',
    shortDesc: 'A powerful, readable language heavily used in DevOps.',
    concept: 'Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability, making it exceptional for writing automation scripts, interacting with cloud APIs via Boto3, or data analysis.',
    advancedConcept: 'Building robust concurrent CLI tooling with asyncio, deep library packaging, creating fully-fledged webhooks with FastAPI, and complex state management.',
    levels: {
      beginner: {
        title: 'Python Basics',
        description: 'Variables, loops, functions, lists, and dicts.',
        studyMaterials: [{ name: 'Learn Python - Full Course', link: 'https://www.youtube.com/watch?v=rfscVS0vtbw', isVideo: true }]
      },
      intermediate: {
        title: 'Scripting & APIs',
        description: 'Using requests module, parsing JSON, managing virtual environments.',
        studyMaterials: [{ name: 'Automate the Boring Stuff', link: 'https://automatetheboringstuff.com/' }]
      },
      expert: {
        title: 'Advanced Automation',
        description: 'Boto3 (AWS SDK), Async IO, testing with PyTest, CI pipelines.',
        studyMaterials: [{ name: 'Boto3 Documentation', link: 'https://boto3.amazonaws.com/v1/documentation/api/latest/index.html' }]
      }
    }
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    icon: Code,
    category: 'Programming Languages',
    shortDesc: 'The language of modern cloud-native systems.',
    concept: 'Go is an open source programming language supported by Google. It is compiled, typed, and features excellent concurrency. The majority of DevOps tools (Docker, K8s, Terraform) are written in Go.',
    advancedConcept: 'Advanced Goroutines, context handling, memory profiling, and writing custom Terraform providers or Kubernetes Operators.',
    levels: {
      beginner: {
        title: 'Go Fundamentals',
        description: 'Syntax, structs, interfaces, and packages.',
        studyMaterials: [{ name: 'Tour of Go', link: 'https://go.dev/tour/' }]
      },
      intermediate: {
        title: 'Concurrency & Tooling',
        description: 'Goroutines, channels, waitgroups, and building CLI apps.',
        studyMaterials: [{ name: 'Go by Example', link: 'https://gobyexample.com/' }]
      },
      expert: {
        title: 'Extending DevOps',
        description: 'Building custom K8s controllers and Terraform plugins.',
        studyMaterials: [{ name: 'Kubebuilder Book', link: 'https://book.kubebuilder.io/' }]
      }
    }
  },

  // ===================== OS & ENVIRONMENT =====================
  {
    id: 'linux',
    name: 'Linux / Unix',
    icon: TerminalSquare,
    category: 'OS & Environment',
    shortDesc: 'The foundation of modern server infrastructure.',
    concept: 'Linux is an open-source, Unix-like operating system kernel. Operating bare-metal via CLI, managing permissions, and understanding how processes interface with the hardware is critical.',
    advancedConcept: 'Kernel tuning, systemd deeply, eBPF performance tuning, and complex network packet routing.',
    levels: {
      beginner: {
        title: 'Core Navigation',
        description: 'Files, Folders, and basic file reading operations.',
        studyMaterials: [{ name: 'Linux Command Line', link: 'https://ubuntu.com/tutorials/command-line-for-beginners' }]
      },
      intermediate: {
        title: 'Permissions & Process',
        description: 'Chmod, Chown, Top, Ps, and Network utils (ping, curl).',
        studyMaterials: [{ name: 'Linux Survival', link: 'https://linuxsurvival.com/' }]
      },
      expert: {
        title: 'Advanced Operations',
        description: 'Text mastery (awk, sed), systemd, and tracing (strace).',
        studyMaterials: [{ name: 'RedHat Admin Guide', link: '#' }]
      }
    }
  },

  // ===================== SCRIPTING LANGUAGES =====================
  {
    id: 'bash',
    name: 'Bash Scripting',
    icon: Terminal,
    category: 'Scripting Languages',
    shortDesc: 'Glue the ecosystem together directly in the terminal.',
    concept: 'Bash is deeply integrated into standard Linux environments. Writing robust bash scripts allows you to chain commands, pipe outputs, and automate tasks natively without compiler dependencies.',
    advancedConcept: 'Safe scripts (`set -euxo pipefail`), subprocess substitution, trap handlers, and advanced text stream manipulation.',
    levels: {
      beginner: {
        title: 'Script Structure',
        description: 'Variables, shebangs, conditionals, and loops in Bash.',
        studyMaterials: [{ name: 'Bash Scripting Tutorial', link: 'https://linuxconfig.org/bash-scripting-tutorial-for-beginners' }]
      },
      intermediate: {
        title: 'Pipes & Arguments',
        description: 'Handling parameters ($1, $@), awk/sed parsing, and exits.',
        studyMaterials: [{ name: 'Advanced Bash-Scripting', link: 'https://tldp.org/LDP/abs/html/' }]
      },
      expert: {
        title: 'Production Safety',
        description: 'Error trapping, parallel background processes, robust deployments.',
        studyMaterials: [{ name: 'Google Shell Style Guide', link: 'https://google.github.io/styleguide/shellguide.html' }]
      }
    }
  },

  // ===================== VERSION CONTROL =====================
  {
    id: 'git',
    name: 'Git',
    icon: GitBranch,
    category: 'Version Control',
    shortDesc: 'Distributed version control system.',
    concept: 'Tracks changes in any set of computer files. It enables highly collaborative environments, branch strategy handling, and code version preservation over time.',
    advancedConcept: 'Interactive rebasing, reflogs, bisecting, and complex merge conflict resolution.',
    levels: {
      beginner: {
        title: 'Git Basics',
        description: 'clone, add, commit, push, pull.',
        studyMaterials: [{ name: 'Git Official Docs', link: 'https://git-scm.com/doc' }]
      },
      intermediate: {
        title: 'Branching & Merging',
        description: 'Conflicts, rebasing, and stashing.',
        studyMaterials: [{ name: 'Atlassian Git Tutorial', link: 'https://www.atlassian.com/git/tutorials' }]
      },
      expert: {
        title: 'Advanced Git',
        description: 'reflog, squashing, cherry-picking, hooks.',
        studyMaterials: [{ name: 'Pro Git Book', link: 'https://git-scm.com/book/en/v2' }]
      }
    }
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: GitPullRequest,
    category: 'Version Control',
    shortDesc: 'Collaborative code hosting and management.',
    concept: 'A cloud platform providing UI access to Git, alongside powerful project management tools like Pull Requests, Issues, and Actions.',
    advancedConcept: 'Advanced PR management, CI integration, webhooks, and enterprise administration.',
    levels: {
      beginner: {
        title: 'Repositories',
        description: 'Creating repos, forks, and basic PRs.',
        studyMaterials: [{ name: 'GitHub Hello World', link: 'https://docs.github.com/en/get-started/quickstart/hello-world' }]
      },
      intermediate: {
        title: 'Collaboration',
        description: 'Issues, labels, team code reviews.',
        studyMaterials: [{ name: 'GitHub Reviews Docs', link: '#' }]
      },
      expert: {
        title: 'Security & Enterprise',
        description: 'Dependabot, Advanced Security, Branch protection rules.',
        studyMaterials: [{ name: 'GitHub Security', link: '#' }]
      }
    }
  },

  // ===================== CI/CD =====================
  {
    id: 'jenkins',
    name: 'Jenkins',
    icon: Settings,
    category: 'CI/CD',
    shortDesc: 'Widely used open-source automation server.',
    concept: 'Jenkins builds, tests, and deploys your software reliably with thousands of plugins to connect virtually anything.',
    advancedConcept: 'JCasC, Jenkins Groovy Shared Libraries, and sprawling agent architectures.',
    levels: {
      beginner: {
        title: 'Freestyle Jobs',
        description: 'Installation and basic job triggers.',
        studyMaterials: [{ name: 'Jenkins Docs', link: 'https://www.jenkins.io/doc/' }]
      },
      intermediate: {
        title: 'Declarative Pipelines',
        description: 'Jenkinsfiles, build stages, and credentials.',
        studyMaterials: [{ name: 'Pipeline Syntax', link: 'https://www.jenkins.io/doc/book/pipeline/' }]
      },
      expert: {
        title: 'JCasC & Groovy',
        description: 'Configuration as Code and shared libraries.',
        studyMaterials: [{ name: 'Shared Libraries Guide', link: 'https://www.jenkins.io/doc/book/pipeline/shared-libraries/' }]
      }
    }
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    icon: PlayCircle,
    category: 'CI/CD',
    shortDesc: 'Automate directly in your repository.',
    concept: 'Action workflows run via YAML triggers based on GitHub events (like pushing code). Extremely seamless integration.',
    advancedConcept: 'Matrix builds, custom TS/Docker actions, OIDC integration.',
    levels: {
      beginner: {
        title: 'Workflows',
        description: 'Steps, Jobs, Events.',
        studyMaterials: [{ name: 'GitHub Actions Intro', link: 'https://docs.github.com/en/actions' }]
      },
      intermediate: {
        title: 'Environments',
        description: 'Secrets, artifacts, caching.',
        studyMaterials: [{ name: 'Actions Best Practices', link: '#' }]
      },
      expert: {
        title: 'Custom Builders',
        description: 'Drafting custom actions and utilizing self-hosted runners.',
        studyMaterials: [{ name: 'Creating Actions', link: 'https://docs.github.com/en/actions/creating-actions' }]
      }
    }
  },
  {
    id: 'gitlab-ci',
    name: 'GitLab CI',
    icon: InfinityIcon,
    category: 'CI/CD',
    shortDesc: 'Integrated CI/CD platform by GitLab.',
    concept: 'A powerful built-in CI/CD engine inside GitLab using .gitlab-ci.yml definition. Highly preferred in modern enterprise environments.',
    advancedConcept: 'GitLab Runners, complex DAG pipelines, auto-scaling runners via Docker/K8s.',
    levels: {
      beginner: {
        title: 'Gitlab-ci.yml',
        description: 'Stages, jobs, scripts.',
        studyMaterials: [{ name: 'GitLab CI Quickstart', link: 'https://docs.gitlab.com/ee/ci/quick_start/' }]
      },
      intermediate: {
        title: 'Artifacts & Caching',
        description: 'Passing data between jobs and speed optimization.',
        studyMaterials: [{ name: 'GitLab CI Variables', link: '#' }]
      },
      expert: {
        title: 'Custom Runners',
        description: 'Deploying and scaling runners on Kubernetes.',
        studyMaterials: [{ name: 'GitLab Runners Architecture', link: '#' }]
      }
    }
  },

  // ===================== CONTAINERIZATION =====================
  {
    id: 'docker',
    name: 'Docker',
    icon: Box,
    category: 'Containerization',
    shortDesc: 'Platform for developing, shipping, and running containers.',
    concept: 'OS-level virtualization delivering software in standardized units (containers) bundling code, dependencies, and environments.',
    advancedConcept: 'Multi-stage builds, Distroless images, rootless containers, overlay networks.',
    levels: {
      beginner: {
        title: 'Docker 101',
        description: 'Images, Containers, Dockerfile.',
        studyMaterials: [{ name: 'Start Docker Basic Study', link: '#', isInternal: true, internalRouteKey: 'beginner' }]
      },
      intermediate: {
        title: 'Compose & Net',
        description: 'Docker-compose, networking, persistent volumes.',
        studyMaterials: [{ name: 'Start Docker Intermediate Study', link: '#', isInternal: true, internalRouteKey: 'intermediate' }]
      },
      expert: {
        title: 'Architecture & Security',
        description: 'Multi-stage, security scanning, rootless.',
        studyMaterials: [{ name: 'Start Docker Expert Study', link: '#', isInternal: true, internalRouteKey: 'expert' }]
      }
    }
  },

  // ===================== ORCHESTRATION =====================
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: Globe2,
    category: 'Orchestration',
    shortDesc: 'Automates deployment, scaling, and management of containers.',
    concept: 'K8s groups containers into logical units (Pods), orchestrating them across a clustered array of nodes.',
    advancedConcept: 'CRDs, Operators, Statefulness, CNI networking, Service Meshes.',
    levels: {
      beginner: {
        title: 'Pods & Deployments',
        description: 'Basic resource architecture in K8s.',
        studyMaterials: [{ name: 'Kubernetes Crash Course', link: 'https://www.youtube.com/watch?v=X48VuDVv0do', isVideo: true }]
      },
      intermediate: {
        title: 'State & Networking',
        description: 'ConfigMaps, PersistentVolumes, Ingress.',
        studyMaterials: [{ name: 'Kubernetes Ingress Guide', link: '#' }]
      },
      expert: {
        title: 'Cluster Administration',
        description: 'RBAC, Operators, Network Policies.',
        studyMaterials: [{ name: 'K8s The Hard Way', link: 'https://github.com/kelseyhightower/kubernetes-the-hard-way' }]
      }
    }
  },
  {
    id: 'helm',
    name: 'Helm',
    icon: Layers,
    category: 'Orchestration',
    shortDesc: 'The package manager for Kubernetes.',
    concept: 'Helm helps you manage Kubernetes applications. Helm Charts help you define, install, and upgrade even the most complex K8s apps.',
    advancedConcept: 'Chart museum, templating pipelines, creating completely dynamic resources.',
    levels: {
      beginner: {
        title: 'Installing Charts',
        description: 'helm install, helm upgrade, public repos.',
        studyMaterials: [{ name: 'Helm Docs', link: 'https://helm.sh/docs/' }]
      },
      intermediate: {
        title: 'Creating Charts',
        description: 'Templating, values.yaml, loops and conditionals.',
        studyMaterials: [{ name: 'Chart Development Guide', link: '#' }]
      },
      expert: {
        title: 'Advanced Templating',
        description: 'Hooks, complex dependency management.',
        studyMaterials: [{ name: 'Helm Best Practices', link: '#' }]
      }
    }
  },
  {
    id: 'argocd',
    name: 'ArgoCD',
    icon: Activity,
    category: 'CI/CD',
    shortDesc: 'Declarative, GitOps continuous delivery tool for K8s.',
    concept: 'Pulls the state declared in your Git repo and ensures your Kubernetes cluster strictly matches it. Say goodbye to direct `kubectl apply`.',
    advancedConcept: 'App of Apps pattern, SSO integration, ApplicationSets.',
    levels: {
      beginner: {
        title: 'GitOps Basics',
        description: 'Installing Argo, tracking a basic repo.',
        studyMaterials: [{ name: 'ArgoCD Getting Started', link: 'https://argo-cd.readthedocs.io/en/stable/getting_started/' }]
      },
      intermediate: {
        title: 'Helm & Diffing',
        description: 'Deploying Helm charts via Argo, handling drift.',
        studyMaterials: [{ name: 'Sync Options & Policies', link: '#' }]
      },
      expert: {
        title: 'App of Apps',
        description: 'Managing dozens of clusters across environments scalably.',
        studyMaterials: [{ name: 'App of Apps Pattern', link: 'https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/' }]
      }
    }
  },

  // ===================== INFRASTRUCTURE AS CODE =====================
  {
    id: 'terraform',
    name: 'Terraform',
    icon: Layers,
    category: 'Infrastructure as Code',
    shortDesc: 'Automate multi-cloud infrastructure declaratively.',
    concept: 'HashiCorp tool enabling you to build, change, and version cloud infrastructure via HCL files.',
    advancedConcept: 'Complex modularization, remote state locks, custom providers.',
    levels: {
      beginner: {
        title: 'Terraform Basics',
        description: 'Providers, init, plan, apply.',
        studyMaterials: [{ name: 'Terraform Full Course', link: 'https://www.youtube.com/watch?v=S9mohJI_R34', isVideo: true }]
      },
      intermediate: {
        title: 'State & Modules',
        description: 'Variables, output, external backends, reusable modules.',
        studyMaterials: [{ name: 'Terraform Best Practices', link: '#' }]
      },
      expert: {
        title: 'Enterprise Automation',
        description: 'Workspaces, CI/CD integrations, dynamic blocks.',
        studyMaterials: [{ name: 'HashiCorp Advanced TF', link: '#' }]
      }
    }
  },
  {
    id: 'pulumi',
    name: 'Pulumi',
    icon: Code,
    category: 'Infrastructure as Code',
    shortDesc: 'Developer-first infrastructure as code.',
    concept: 'Instead of HCL/YAML, use actual programming languages (Python, Go, JS) to write, test, and deploy infrastructure.',
    advancedConcept: 'Unit testing infrastructure, multi-cloud abstraction layers.',
    levels: {
      beginner: {
        title: 'Pulumi Setup',
        description: 'Using existing language knowledge for cloud resources.',
        studyMaterials: [{ name: 'Pulumi Intro', link: 'https://www.pulumi.com/docs/' }]
      },
      intermediate: {
        title: 'State Management',
        description: 'Managing stacks and Pulumi service.',
        studyMaterials: [{ name: 'Managing Pulumi Stacks', link: '#' }]
      },
      expert: {
        title: 'Testing Infra',
        description: 'Unit testing and mocking cloud resources in code.',
        studyMaterials: [{ name: 'Pulumi Testing', link: '#' }]
      }
    }
  },

  // ===================== CONFIGURATION MANAGEMENT =====================
  {
    id: 'ansible',
    name: 'Ansible',
    icon: TerminalSquare,
    category: 'Configuration Management',
    shortDesc: 'Agentless IT automation system.',
    concept: 'Provision, configure, and manage servers via SSH using highly readable YAML playbooks.',
    advancedConcept: 'Custom Python modules, Ansible AWX, dynamic EC2 inventories.',
    levels: {
      beginner: {
        title: 'Ansible Basics',
        description: 'Ad-hoc commands, basic playbooks, inventory.',
        studyMaterials: [{ name: 'Ansible Docs', link: 'https://docs.ansible.com/' }]
      },
      intermediate: {
        title: 'Variables & Roles',
        description: 'Structuring with roles, Ansible Galaxy, Vault.',
        studyMaterials: [{ name: 'Ansible Best Practices', link: '#' }]
      },
      expert: {
        title: 'Enterprise Ansible',
        description: 'Dynamic inventories, custom modules, AWX management.',
        studyMaterials: [{ name: 'Advanced Ansible', link: '#' }]
      }
    }
  },

  // ===================== MONITORING & OBSERVABILITY =====================
  {
    id: 'prometheus',
    name: 'Prometheus & Grafana',
    icon: BarChart,
    category: 'Monitoring & Observability',
    shortDesc: 'Industry standard metrics scraping and dashboarding.',
    concept: 'Prometheus scrapes time-series metrics from nodes. Grafana visuals those metrics into beautiful, actionable dashboards.',
    advancedConcept: 'PromQL deep dives, AlertManager configurations, Thanos distributed scaling.',
    levels: {
      beginner: {
        title: 'Setup & Dashboards',
        description: 'Node Exporter, scraping, standard Grafana dashboards.',
        studyMaterials: [{ name: 'Prometheus Official Docs', link: 'https://prometheus.io/docs/' }]
      },
      intermediate: {
        title: 'PromQL & Alerts',
        description: 'Writing complex queries, creating Grafana alerts.',
        studyMaterials: [{ name: 'PromQL Intro', link: '#' }]
      },
      expert: {
        title: 'Scaling Prometheus',
        description: 'Federation, Thanos, custom application instrumentation.',
        studyMaterials: [{ name: 'Thanos Architecture', link: '#' }]
      }
    }
  },
  {
    id: 'datadog',
    name: 'Datadog',
    icon: Activity,
    category: 'Monitoring & Observability',
    shortDesc: 'Enterprise observability and security in the cloud.',
    concept: 'A SaaS-based data analytics platform providing monitoring of servers, databases, tools, and services natively.',
    advancedConcept: 'APM distributed tracing, synthetic checks, SIEM capabilities.',
    levels: {
      beginner: {
        title: 'Agent Setup',
        description: 'Deploying agents, exploring infrastructure metrics.',
        studyMaterials: [{ name: 'Datadog Quickstart', link: 'https://docs.datadoghq.com/' }]
      },
      intermediate: {
        title: 'APM & Logs',
        description: 'Application Performance Monitoring and Log pipelines.',
        studyMaterials: [{ name: 'Datadog APM', link: '#' }]
      },
      expert: {
        title: 'Monitors & Tracing',
        description: 'Complex monitor formulas and distributed tracing flows.',
        studyMaterials: [{ name: 'Distributed Tracing', link: '#' }]
      }
    }
  },

  // ===================== CLOUD PLATFORMS =====================
  {
    id: 'aws',
    name: 'AWS',
    icon: CloudCog,
    category: 'Cloud Platforms',
    shortDesc: 'Complete cloud platform infrastructure.',
    concept: 'Amazon Web Services is the market-leading platform offering IaaS, PaaS, and Serverless computing directly over the internet.',
    advancedConcept: 'Multi-region routing, Transit Gateways, robust IAM policies.',
    levels: {
      beginner: {
        title: 'Core Services',
        description: 'EC2, S3, IAM, basic VPC network boundaries.',
        studyMaterials: [{ name: 'AWS Cloud Practitioner Study', link: '#' }]
      },
      intermediate: {
        title: 'Scaling',
        description: 'Auto Scaling, ALB/ELB, ECS, RDS databases.',
        studyMaterials: [{ name: 'AWS Free Tier Guides', link: '#' }]
      },
      expert: {
        title: 'Enterprise Architect',
        description: 'Well-Architected Framework, Control Tower, EKS deep-dives.',
        studyMaterials: [{ name: 'AWS Architecture Center', link: '#' }]
      }
    }
  }
];
