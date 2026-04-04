import { 
  GitBranch, 
  GitPullRequest, 
  Settings, 
  Activity, 
  PlayCircle,
  Package,
  Server,
  Code,
  Box,
  Layers,
  Wrench,
  Terminal
} from 'lucide-react';

export type CommandDetail = {
  cmd: string;
  desc: string;
};

export type LevelData = {
  title: string;
  description: string | string[];
  studyMaterials: { name: string; link: string; isInternal?: boolean; internalRouteKey?: string }[];
  studyContent?: {
    whatIsIt: string;
    whyUseIt: string;
    howToUseIt: string;
    commands: CommandDetail[];
  };
};

export type ToolData = {
  id: string;
  name: string;
  icon: any;
  category: 'Version Control' | 'CI/CD' | 'Code Quality' | 'Artifact Repo' | 'Containerization' | 'Build Tool' | 'IDE' | 'OS & Environment';
  shortDesc: string;
  concept: string;
  advancedConcept: string;
  levels: {
    beginner: LevelData;
    intermediate: LevelData;
    expert: LevelData;
  };
};

export const toolsData: ToolData[] = [
  {
    id: 'linux',
    name: 'Linux Environment',
    icon: Terminal,
    category: 'OS & Environment',
    shortDesc: 'The foundation of modern DevOps and server management.',
    concept: 'Linux is an open-source, Unix-like operating system kernel that serves as the backbone of modern server infrastructure, cloud computing, and DevOps environments. Knowing how to powerfully navigate the CLI is fundamental.',
    advancedConcept: 'Advanced Linux usage involves intricate shell scripting (Bash, Awk, Sed), strict network programming, configuring packet-filtering firewalls (iptables), and deep system profiling to fine-tune memory and IO constraints at scale.',
    levels: {
      beginner: {
        title: 'Core Navigation & Files',
        description: [
          'Basic operations require you to comfortably navigate the system and manipulate files.',
          '• pwd & cd: Check your current directory footprint and navigate paths.',
          '• ls & touch: List existing items (use -l for details, -a for hidden) and create empty files.',
          '• mkdir, rm, cp, mv: Make folders, safely remove files/folders (use with caution), copy, and move/rename assets.',
          '• cat & echo: Display file contents immediately to the terminal and output literal text.'
        ],
        studyMaterials: [{ name: 'Linux Basics for Hackers', link: 'https://linuxsurvival.com/' }]
      },
      intermediate: {
        title: 'Permissions & System Monitoring',
        description: [
          'Take command over permissions, processes, and network troubleshooting.',
          '• Access Control: Use chmod (e.g., 755) and chown to manage security privileges and ownership.',
          '• Processing Data: Search directories with find, filter text streams utilizing grep, or count content with wc.',
          '• Performance: Oversee live running tasks with top and ps, and gracefully stop them using kill.',
          '• Disk & Network: Evaluate storage constraints via df -h and du -sh. Test network reachability utilizing ping, and perform web requests using curl and wget.'
        ],
        studyMaterials: [{ name: 'The Linux Command Line', link: 'https://ubuntu.com/tutorials/command-line-for-beginners' }]
      },
      expert: {
        title: 'Advanced Operations & Streams',
        description: [
          'Master real-time environment automation, packet structures, and complex data streams.',
          '• Text Mastery: Leverage awk for advanced column filtering and sed to powerfully edit text on the fly.',
          '• System Orchestration: Control the entire service lifecycle utilizing systemctl and forensically analyze kernel logs via journalctl.',
          '• Deep Networking: Use ip, netstat, and iptables to trace out robust networking and firewall strategies.',
          '• Automation & Maintenance: Schedule robust recurring cron jobs, mount partitions, analyze hardware stats via iostat and vmstat, and handle deeply nested processes.'
        ],
        studyMaterials: [{ name: 'Advanced Bash-Scripting Guide', link: 'https://www.gnu.org/software/bash/manual/' }]
      }
    }
  },
  {
    id: 'git',
    name: 'Git',
    icon: GitBranch,
    category: 'Version Control',
    shortDesc: 'Distributed version control system.',
    concept: 'Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers collaboratively developing source code during software development.',
    advancedConcept: 'Advanced Git concepts include interactive rebasing, reflogs, bisecting, submodules, and complex branching strategies like GitFlow or Trunk-based development.',
    levels: {
      beginner: {
        title: 'Git Basics',
        description: 'Learn the basic commands: clone, add, commit, push, pull, and branch.',
        studyMaterials: [{ name: 'Git Official Documentation', link: '#' }]
      },
      intermediate: {
        title: 'Branching & Merging',
        description: 'Understanding merge conflicts, rebasing, and branching strategies.',
        studyMaterials: [{ name: 'Atlassian Git Tutorial', link: '#' }]
      },
      expert: {
        title: 'Advanced Git Operations',
        description: 'Mastering the reflog, interactive rebase, squashing, cherry-picking, and submodules.',
        studyMaterials: [{ name: 'Pro Git Book (Free)', link: '#' }]
      }
    }
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: GitPullRequest,
    category: 'Version Control',
    shortDesc: 'Hosting service for software development and version control.',
    concept: 'GitHub is a developer platform that allows developers to create, store, manage and share their code. It uses Git software, providing the distributed version control of Git plus access control, bug tracking, and task management.',
    advancedConcept: 'Leveraging GitHub APIs, Webhooks, GitHub Apps, security alerting, and intricate repository management.',
    levels: {
      beginner: {
        title: 'GitHub Fundamentals',
        description: 'Creating repositories, Pull Requests, and basic Code Reviews.',
        studyMaterials: [{ name: 'GitHub Learning Lab', link: '#' }]
      },
      intermediate: {
        title: 'Collaboration & Management',
        description: 'Managing teams, issues, milestones, and advanced PR policies.',
        studyMaterials: [{ name: 'GitHub Docs: Collaborating', link: '#' }]
      },
      expert: {
        title: 'GitHub Administration & Security',
        description: 'Advanced administration, Dependabot setup, GitHub Advanced Security.',
        studyMaterials: [{ name: 'GitHub Admin Guides', link: '#' }]
      }
    }
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: Box,
    category: 'Containerization',
    shortDesc: 'Platform for developing, shipping, and running applications in containers.',
    concept: 'Docker uses OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files.',
    advancedConcept: 'Deep dive into container runtimes, multi-stage builds, building minimal base images, security scanning, and internal networking.',
    levels: {
      beginner: {
        title: 'Docker 101 & Basic Commands',
        description: 'Understanding Images, Containers, Dockerfile basics, and docker run.',
        studyMaterials: [{ name: 'Start Docker Basic Study', link: '#', isInternal: true, internalRouteKey: 'beginner' }],
        studyContent: {
          whatIsIt: 'Docker is an open platform for developing, shipping, and running applications in isolated execution environments called containers.',
          whyUseIt: 'We use Docker to ensure "it works on my machine" means "it works everywhere". It eliminates manual environment setup and standardizes code deployment.',
          howToUseIt: 'You primarily use Docker by writing a Dockerfile, building it into an image, and running that image via the CLI engine. Below are the foundational commands.',
          commands: [
            { cmd: 'docker --version', desc: 'Shows installed version' },
            { cmd: 'docker info', desc: 'Detailed system info' },
            { cmd: 'docker pull ubuntu', desc: 'Downloads image' },
            { cmd: 'docker images', desc: 'Lists images' },
            { cmd: 'docker run -it ubuntu bash', desc: 'Runs container interactively' },
            { cmd: 'docker ps -a', desc: 'Lists containers (running and stopped)' },
            { cmd: 'docker stop/start', desc: 'Stops/starts container' },
            { cmd: 'docker rm / rmi', desc: 'Deletes container / image' },
            { cmd: 'docker exec', desc: 'Access running container' }
          ]
        }
      },
      intermediate: {
        title: 'Management & Operations',
        description: 'Multi-container applications, persisting data, network modes, and building workflows.',
        studyMaterials: [{ name: 'Start Docker Intermediate Study', link: '#', isInternal: true, internalRouteKey: 'intermediate' }],
        studyContent: {
          whatIsIt: 'Intermediate Docker usage involves persisting state, networking multiple containers together, and optimizing image building.',
          whyUseIt: 'Real-world applications are not solitary. They require databases (which need volume storage), cache servers (which need networks), and efficient builds.',
          howToUseIt: 'Use these commands to deeply inspect container configurations, build production layers, and securely persist data out of the container lifecycle.',
          commands: [
            { cmd: 'docker build -t myapp .', desc: 'Build an image from a Dockerfile' },
            { cmd: 'docker commit <id> myimg', desc: 'Save container as a new image' },
            { cmd: 'docker logs <id>', desc: 'View output logs of a container' },
            { cmd: 'docker inspect <id>', desc: 'Deep details (JSON) of container setup' },
            { cmd: 'docker stats', desc: 'Live CPU/Memory resource usage' },
            { cmd: 'docker cp file.txt <id>:/path', desc: 'Copy files between host and container' },
            { cmd: 'docker rename <old> <new>', desc: 'Rename an existing container' },
            { cmd: 'docker network create net', desc: 'Manage/create isolated virtual networks' },
            { cmd: 'docker volume create vol', desc: 'Manage persistent storage volumes' }
          ]
        }
      },
      expert: {
        title: 'Advanced Architecture & Orchestration',
        description: 'Multi-stage builds, orchestration, clustering, and enterprise distribution.',
        studyMaterials: [{ name: 'Start Docker Expert Study', link: '#', isInternal: true, internalRouteKey: 'expert' }],
        studyContent: {
          whatIsIt: 'Advanced Docker orchestration shifts focus from single containers to managing thousands of services, security, and cluster architectures.',
          whyUseIt: 'Enterprise applications require High Availability (HA), zero-downtime rolling updates, and vast scalable node replication. ',
          howToUseIt: 'These commands configure complex multi-service declarations, swarm mode clustering, and heavy operations.',
          commands: [
            { cmd: 'docker-compose up/down', desc: 'Run multi-container apps declaratively via yaml' },
            { cmd: 'docker save / load', desc: 'Export/import images as tarballs' },
            { cmd: 'docker export / import', desc: 'Container root filesystem backup' },
            { cmd: 'docker system prune', desc: 'Cleanup heavily unused images/containers' },
            { cmd: 'docker tag / push', desc: 'Tag an image and distribute to a registry' },
            { cmd: 'docker swarm init', desc: 'Initialize native docker server clustering' },
            { cmd: 'docker service create', desc: 'Manage decentralized clustered services' },
            { cmd: 'docker stack deploy', desc: 'Full-stack distributed orchestration' },
            { cmd: 'docker checkpoint', desc: 'Save & restore exact container execution state' }
          ]
        }
      }
    }
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: Server,
    category: 'Containerization',
    shortDesc: 'Open-source container orchestration system.',
    concept: 'Automates deployment, scaling, and management of containerized applications. It groups containers that make up an application into logical units for easy management and discovery.',
    advancedConcept: 'CRDs, Operators, Service Meshes, deep cluster networking (CNI), and cluster administration.',
    levels: {
      beginner: {
        title: 'K8s Architecture & Pods',
        description: 'Understanding Nodes, Pods, Deployments, and Services.',
        studyMaterials: [{ name: 'Kubernetes.io Beginners Guide', link: '#' }]
      },
      intermediate: {
        title: 'Configurability & State',
        description: 'ConfigMaps, Secrets, Ingress, PersistentVolumes, and StatefulSets.',
        studyMaterials: [{ name: 'Kubernetes The Hard Way (Intro)', link: '#' }]
      },
      expert: {
        title: 'Operators & Cluster Admin',
        description: 'Writing custom controllers, RBAC, NetworkPolicies, and CRDs.',
        studyMaterials: [{ name: 'K8s Cluster Administration', link: '#' }]
      }
    }
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    icon: Settings,
    category: 'CI/CD',
    shortDesc: 'Open source automation server.',
    concept: 'Jenkins is an automation server which enables developers around the world to reliably build, test, and deploy their software. It is highly extensible with thousands of plugins.',
    advancedConcept: 'Jenkins Configuration as Code (JCasC), Shared Libraries, scalable agent provisioning, and advanced pipeline development.',
    levels: {
      beginner: {
        title: 'Jenkins Basics',
        description: 'Installing Jenkins, creating Freestyle jobs, and basic triggers.',
        studyMaterials: [{ name: 'Jenkins User Documentation', link: '#' }]
      },
      intermediate: {
        title: 'Declarative Pipelines',
        description: 'Writing Jenkinsfiles, using credentials, and multi-branch pipelines.',
        studyMaterials: [{ name: 'Pipeline Syntax Guide', link: '#' }]
      },
      expert: {
        title: 'JCasC & Shared Libraries',
        description: 'Jenkins Configuration as Code and Groovy Shared Libraries.',
        studyMaterials: [{ name: 'JCasC Documentation', link: '#' }]
      }
    }
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    icon: PlayCircle,
    category: 'CI/CD',
    shortDesc: 'Automate workflows directly in your repository.',
    concept: 'GitHub Actions makes it easy to automate all your software workflows. Build, test, and deploy your code right from GitHub with fully integrated CI/CD.',
    advancedConcept: 'Creating Custom Actions, Self-hosted runners, Matrix builds, OIDC integrations for cloud authentication.',
    levels: {
      beginner: {
        title: 'Workflow Basics',
        description: 'Creating a basic workflow, understanding Steps, Jobs, and Events.',
        studyMaterials: [{ name: 'GitHub Actions Intro', link: '#' }]
      },
      intermediate: {
        title: 'Environments & Artifacts',
        description: 'Using matrix builds, secrets, artifacts, and caching.',
        studyMaterials: [{ name: 'Essential Features', link: '#' }]
      },
      expert: {
        title: 'Custom Actions & Runners',
        description: 'Building custom TS/Docker actions, self-hosted runner infrastructure.',
        studyMaterials: [{ name: 'Building Actions', link: '#' }]
      }
    }
  },
  {
    id: 'sonarqube',
    name: 'SonarQube',
    icon: Activity,
    category: 'Code Quality',
    shortDesc: 'Continuous code quality and security.',
    concept: 'An open-source platform developed by SonarSource for continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities.',
    advancedConcept: 'Custom rule writing via XPath or Java plugins, complex quality gate strategies, and deep branch analysis.',
    levels: {
      beginner: {
        title: 'Understanding Code smells',
        description: 'Basic integration with CI, understanding Bugs, Vulnerabilities, and Smells.',
        studyMaterials: [{ name: 'Clean Code principles', link: '#' }]
      },
      intermediate: {
        title: 'Quality Gates & Branching',
        description: 'Setting up custom quality profiles, gates, and PR decoration.',
        studyMaterials: [{ name: 'SonarQube Documentation', link: '#' }]
      },
      expert: {
        title: 'Custom Rules',
        description: 'Writing custom Sonar rules for niche requirements.',
        studyMaterials: [{ name: 'Customizing SonarQube', link: '#' }]
      }
    }
  },
  {
    id: 'artifactory',
    name: 'Artifactory',
    icon: Package,
    category: 'Artifact Repo',
    shortDesc: 'Universal artifact repository manager.',
    concept: 'JFrog Artifactory functions as a single source of truth for all packages, container images and Helm charts, as they move across the entire DevOps pipeline.',
    advancedConcept: 'High availability clustering, advanced metadata properties, edge node distribution, and replication strategies.',
    levels: {
      beginner: {
        title: 'Repo Management',
        description: 'Difference between local, remote, and virtual repositories.',
        studyMaterials: [{ name: 'JFrog Quickstart', link: '#' }]
      },
      intermediate: {
        title: 'Build Integration',
        description: 'Integrating Artifactory with Maven/Npm, understanding build-info.',
        studyMaterials: [{ name: 'Artifactory Integrations', link: '#' }]
      },
      expert: {
        title: 'Access & Replication',
        description: 'RBAC, AQL (Artifactory Query Language), and multi-site replication.',
        studyMaterials: [{ name: 'JFrog Advanced Admin', link: '#' }]
      }
    }
  },
  {
    id: 'maven',
    name: 'Maven',
    icon: Wrench,
    category: 'Build Tool',
    shortDesc: 'Project management and comprehension tool primarily for Java.',
    concept: 'Maven uses a Project Object Model (POM) to manage a project\'s build, reporting, and documentation from a central piece of information.',
    advancedConcept: 'Custom Plugin development, intricate build profiles, and complex multi-module reactor builds.',
    levels: {
      beginner: {
        title: 'Maven Fundamentals',
        description: 'Understanding POM.xml, dependencies, and basic lifecycles.',
        studyMaterials: [{ name: 'Maven in 5 Minutes', link: '#' }]
      },
      intermediate: {
        title: 'Plugins & Profiles',
        description: 'Using plugins effectively, setting up environment-specific profiles.',
        studyMaterials: [{ name: 'Maven Comprehensive Guide', link: '#' }]
      },
      expert: {
        title: 'Custom Plugins',
        description: 'Writing your own Mojos (Maven Plugins) and managing huge multi-modules.',
        studyMaterials: [{ name: 'Developing Maven Plugins', link: '#' }]
      }
    }
  },
  {
    id: 'gradle',
    name: 'Gradle',
    icon: Layers,
    category: 'Build Tool',
    shortDesc: 'Highly flexible build automation tool.',
    concept: 'Gradle is an open-source build automation tool focused on flexibility and performance. Gradle build scripts are written using a Groovy or Kotlin DSL.',
    advancedConcept: 'Build cache configuration, deep dependency resolution strategies, and custom task types in Kotlin.',
    levels: {
      beginner: {
        title: 'Gradle Basics',
        description: 'Structure of build.gradle, basic tasks, and dependencies.',
        studyMaterials: [{ name: 'Gradle User Manual', link: '#' }]
      },
      intermediate: {
        title: 'Scripting & Plugins',
        description: 'Applying plugins, writing custom tasks, managing multi-project builds.',
        studyMaterials: [{ name: 'Gradle Multi-Project Builds', link: '#' }]
      },
      expert: {
        title: 'Performance & Kotlin DSL',
        description: 'Migrating to Kotlin DSL, build cache tuning, and initialization scripts.',
        studyMaterials: [{ name: 'Advanced Gradle', link: '#' }]
      }
    }
  },
  {
    id: 'intellij',
    name: 'IntelliJ IDEA',
    icon: Code,
    category: 'IDE',
    shortDesc: 'Capable and Ergonomic IDE for Java and more.',
    concept: 'Leading Java IDE outperforming others regarding intelligence. It provides comprehensive tooling, smart code completion, and out-of-the-box framework support.',
    advancedConcept: 'Structural search and replace, memory profiling, remote debugging, and custom plugin creation.',
    levels: {
      beginner: {
        title: 'Getting Started',
        description: 'Navigation, basic refactoring, running/debugging code.',
        studyMaterials: [{ name: 'IntelliJ IDEA Basics', link: '#' }]
      },
      intermediate: {
        title: 'Productivity Tricks',
        description: 'Advanced refactoring, Live Templates, Git integration in IDE.',
        studyMaterials: [{ name: 'JetBrains Guide', link: '#' }]
      },
      expert: {
        title: 'Deep Integrations',
        description: 'Profilers, Structural Search, customizing inspections.',
        studyMaterials: [{ name: 'Advanced Productivity Guide', link: '#' }]
      }
    }
  },
  {
    id: 'eclipse',
    name: 'Eclipse',
    icon: Terminal,
    category: 'IDE',
    shortDesc: 'A popular open source IDE, mainly for Java.',
    concept: 'The Eclipse platform which provides the foundation for the Eclipse IDE is composed of plug-ins and is designed to be extensible using additional plug-ins.',
    advancedConcept: 'Workspace management, Eclipse Rich Client Platform (RCP) development.',
    levels: {
      beginner: {
        title: 'Eclipse 101',
        description: 'Setting up perspectives, compiling, and running projects.',
        studyMaterials: [{ name: 'Eclipse Foundation Tutorials', link: '#' }]
      },
      intermediate: {
        title: 'Shortcuts & Plugins',
        description: 'Keyboard shortcuts, working with Marketplace plugins (e.g. SonarLint).',
        studyMaterials: [{ name: 'Effective Eclipse', link: '#' }]
      },
      expert: {
        title: 'RCP Development',
        description: 'Building custom tools leveraging the Eclipse RCP ecosystem.',
        studyMaterials: [{ name: 'Eclipse RCP Architecture', link: '#' }]
      }
    }
  }
];
