export type PracticeDifficulty = 'Beginner' | 'Intermediate' | 'Expert';

export interface PracticeProject {
  id: string;
  title: string;
  githubUrl: string;
  difficulty: PracticeDifficulty;
}

const GITHUB_BASE = 'https://github.com/NotHarshhaa/DevOps-Projects/tree/master/';

export const practiceProjects: PracticeProject[] = [
  // BEGINNER PROJECTS
  { id: 'DevOps-Project-03', title: 'Fun with Linux for Cloud & DevOps Engineers', difficulty: 'Beginner', githubUrl: `${GITHUB_BASE}DevOps-Project-03` },
  { id: 'DevOps-Project-05', title: 'Deploy your code on a Docker Container using Jenkins on AWS', difficulty: 'Beginner', githubUrl: `${GITHUB_BASE}DevOps-Project-05` },
  { id: 'DevOps-Project-10', title: 'Create a CI/CD pipeline for .NET with the DevOps Starter Project', difficulty: 'Beginner', githubUrl: `${GITHUB_BASE}DevOps-Project-10` },
  { id: 'DevOps-Project-11', title: '🏗️ Two-Tier AWS Infrastructure with Terraform', difficulty: 'Beginner', githubUrl: `${GITHUB_BASE}DevOps-Project-11` },
  { id: 'DevOps-Project-14', title: '🚀 End-to-End CI/CD Pipeline for Android Apps with GitHub Actions', difficulty: 'Beginner', githubUrl: `${GITHUB_BASE}DevOps-Project-14` },
  { id: 'DevOps-Project-21', title: 'AWS DevOps CICD Pipeline', difficulty: 'Beginner', githubUrl: `${GITHUB_BASE}DevOps-Project-21` },
  { id: 'DevOps-Project-34', title: 'Complete DevOps Project: Multi-Tier Application Deployment Locally', difficulty: 'Beginner', githubUrl: `${GITHUB_BASE}DevOps-Project-34` },
  { id: 'DevOps-Project-07', title: 'DevOps-Journey-Using-Azure-DevOps', difficulty: 'Beginner', githubUrl: `${GITHUB_BASE}DevOps-Project-07` },

  // INTERMEDIATE PROJECTS
  { id: 'DevOps-Project-01', title: 'Deploy Java Application on AWS 3-Tier Architecture', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-01` },
  { id: 'DevOps-Project-02', title: 'Deploy Scalable VPC Architecture on AWS Cloud', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-02` },
  { id: 'DevOps-Project-04', title: 'Production-Ready Django Deployment on AWS: Complete ECS & ECR pipeline', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-04` },
  { id: 'DevOps-Project-12', title: '🎮 Deployment of Super Mario on Kubernetes using Terraform', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-12` },
  { id: 'DevOps-Project-15', title: 'Deploy an E-Commerce Three Tier application on AWS EKS with Helm', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-15` },
  { id: 'DevOps-Project-17', title: 'Deploying an app to AKS using Azure DevOps & Azure Cloud Shell', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-17` },
  { id: 'DevOps-Project-20', title: 'Azure DevOps pipeline + Terraform Deployment Tutorial', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-20` },
  { id: 'DevOps-Project-22', title: 'AWS Fully Serverless Architecture with CI/CD', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-22` },
  { id: 'DevOps-Project-24', title: '🌻 DevSecOps Pipeline for a DotNet Web App 🌻', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-24` },
  { id: 'DevOps-Project-25', title: 'Deploying a Petshop Java Application with CI/CD, Docker, and Kubernetes', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-25` },
  { id: 'DevOps-Project-31', title: 'Scalable, Secure Web Applications with AWS 3-Tier Architecture', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-31` },
  { id: 'DevOps-Project-32', title: 'Real Time CI/CD Pipeline for Java Application to Deploy on Apache Server', difficulty: 'Intermediate', githubUrl: `${GITHUB_BASE}DevOps-Project-32` },

  // EXPERT PROJECTS
  { id: 'DevOps-Project-06', title: '🚀 Implementation of Entire Advanced CI/CD Pipeline with Major Tools', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-06` },
  { id: 'DevOps-Project-08', title: 'Kubernetes End to End Project on EKS(Amazon Kubernetes Service)', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-08` },
  { id: 'DevOps-Project-09', title: 'DevSecOps : Netflix Clone CI-CD with Monitoring | Email', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-09` },
  { id: 'DevOps-Project-13', title: '🍽️ Zomato Clone: Secure Deployment with DevSecOps CI/CD', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-13` },
  { id: 'DevOps-Project-16', title: 'End to End DevOps Project | Deploy to Kubernetes Using Jenkins', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-16` },
  { id: 'DevOps-Project-18', title: 'Jenkins Pipeline for Java using Maven, SonarQube, Argo CD, Helm and K8s', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-18` },
  { id: 'DevOps-Project-19', title: 'Deploying EKS Clusters and Applications with Jenkins and Terraform', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-19` },
  { id: 'DevOps-Project-23', title: 'DevSecOps: Blue-Green Deployment of Swiggy-Clone on AWS ECS', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-23` },
  { id: 'DevOps-Project-26', title: '🚀 Automate Infrastructure on AWS Using Terraform and GitLab CICD', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-26` },
  { id: 'DevOps-Project-27', title: '🚀 Deploy Reddit App to EKS using ArgoCD and monitor performance', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-27` },
  { id: 'DevOps-Project-28', title: 'DevSecOps: OpenAI Chatbot UI Deployment in EKS with Jenkins & Terraform', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-28` },
  { id: 'DevOps-Project-29', title: 'Deploy a 3-tier Microservice Voting App using ArgoCD and Azure DevOps', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-29` },
  { id: 'DevOps-Project-30', title: 'Production Blog APP Deployment using EKS, Nexus, SonarQube, Trivy', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-30` },
  { id: 'DevOps-Project-33', title: 'Ultimate DevSecOps CI/CD Pipeline To deploy 3-Tier Application in K8s', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-33` },
  { id: 'DevOps-Project-35', title: 'CI/CD DevOps Pipeline: Deployment of Java Application on Kubernetes', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-35` },
  { id: 'DevOps-Project-36', title: 'Production-ready 3-tier App on AWS EKS with real-world setup', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-36` },
  { id: 'DevOps-Project-37', title: 'Deploy a 3-tier Voting App using ArgoCD and Azure DevOps Pipeline', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-37` },
  { id: 'DevOps-Project-38', title: 'End to End Deployment of FullStack Blogging Application', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-38` },
  { id: 'DevOps-Project-39', title: 'Secure CI/CD Pipeline on Local Ubuntu Using Jenkins, SonarQube & Trivy', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-39` },
  { id: 'DevOps-Project-40', title: 'Mega Project: From Code to Kubernetes - Production-Grade GitOps Platform', difficulty: 'Expert', githubUrl: `${GITHUB_BASE}DevOps-Project-40` }
];
