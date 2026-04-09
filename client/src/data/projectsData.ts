export type PracticeDifficulty = 'Beginner' | 'Intermediate' | 'Expert';

export interface PracticeProject {
  id: string;
  title: string;
  githubUrl: string;
  difficulty: PracticeDifficulty;
  steps?: string[];
}

const GITHUB_BASE = 'https://github.com/NotHarshhaa/DevOps-Projects/tree/master/';

export const practiceProjects: PracticeProject[] = [
  // BEGINNER PROJECTS — Steps sourced from actual GitHub READMEs
  {
    id: 'DevOps-Project-03',
    title: 'Fun with Linux for Cloud & DevOps Engineers',
    difficulty: 'Beginner',
    githubUrl: `${GITHUB_BASE}DevOps-Project-03`,
    steps: [
      'Login to AWS and launch a Linux-based EC2 instance (Amazon Linux or Ubuntu).',
      'SSH into the instance as root. Create users (user1, user2, user3) and set passwords for each.',
      'Create groups: devops, aws. Change primary group of user2 & user3 to "devops". Add "aws" as secondary group to user1.',
      'Create the directory and file structure as specified: /dir1 through /dir8, /dir7/dir10, /f1, /f2. Change group of /dir1, /dir7/dir10, /f2 to "devops" and ownership to "user1".',
      'Login as user1: Create users user4, user5. Create groups: app, database.',
      'Login as user4: Create /dir6/dir4, /f3. Move /dir1/f1 to /dir2/dir1/dir2. Rename /f2 to /f4.',
      'Login as user1: Create /home/user2/dir1. Navigate to /dir2/dir1/dir2/dir10 and create /opt/dir14/dir10/f1 using relative path. Move that file to user1 home. Delete /dir4 recursively. Delete all children under /opt/dir14. Write "Linux assessment for an DevOps Engineer!! Learn with Fun!!" to /f3.',
      'Login as user2: Create /dir1/f2. Delete /dir6 and /dir8. Replace "DevOps" with "devops" in /f3 without an editor. Use Vi-Editor to copy line1 and paste 10 times. Search "Engineer" and replace with "engineer" using single sed command. Delete /f3.',
      'Login as root: Search for file "f3" on the entire server. Show count of files in "/". Print last line of /etc/passwd.',
      'In AWS console, create a 5GB EBS volume in the same AZ. Attach it to your EC2 instance. Back in the server: create a filesystem on the new volume, mount it on /data, verify with df -h, create file f1 in /data.',
      'Login as user5: Delete /dir1, /dir2, /dir3, /dir5, /dir7, /f1, /f4, /opt/dir14.',
      'Login as root: Delete all created users and groups. Delete leftover home directories. Unmount /data and delete the directory. In AWS console, detach & delete the EBS volume, then terminate the EC2 instance.'
    ]
  },
  {
    id: 'DevOps-Project-05',
    title: 'Deploy your code on a Docker Container using Jenkins on AWS',
    difficulty: 'Beginner',
    githubUrl: `${GITHUB_BASE}DevOps-Project-05`,
    steps: [
      'Launch an Amazon Linux EC2 instance (t2.micro). In Security Group, open ports 22 (SSH) and 8080 (Jenkins). SSH into the instance.',
      'Install Java: sudo yum install java-openjdk11 -y. Add Jenkins repo: sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo && sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key. Install Jenkins: sudo yum install jenkins -y.',
      'Start & enable Jenkins: sudo systemctl enable jenkins && sudo systemctl start jenkins. Access Jenkins at http://<PUBLIC_IP>:8080. Unlock with password from: sudo cat /var/lib/jenkins/secrets/initialAdminPassword. Install suggested plugins and create your admin user.',
      'Install Git on the Jenkins EC2: sudo yum install git -y. In Jenkins UI → Manage Jenkins → Manage Plugins → Install "GitHub Integration" plugin. Configure Git path in Global Tool Configuration.',
      'Install Maven: cd /opt && sudo wget https://dlcdn.apache.org/maven/maven-3/3.9.x/binaries/apache-maven-3.9.x-bin.tar.gz && sudo tar xzf apache-maven-*.tar.gz. Set M2_HOME & JAVA_HOME in ~/.bash_profile and source it. Install "Maven Integration" plugin in Jenkins. Configure Maven & Java paths in Global Tool Configuration.',
      'Launch a second EC2 instance (Docker Host). Install Docker: sudo yum install docker -y && sudo systemctl enable docker && sudo systemctl start docker. Pull Tomcat image: docker pull tomcat:latest. Run: docker run -d --name tomcat-container -p 8081:8080 tomcat. Open ports 8081-9000 in its Security Group.',
      'Fix Tomcat 404: docker exec -it tomcat-container bash → cp -R /usr/local/tomcat/webapps.dist/* /usr/local/tomcat/webapps. Create a custom Dockerfile: FROM tomcat:latest / RUN cp -R /usr/local/tomcat/webapps.dist/* /usr/local/tomcat/webapps. Build: docker build -t tomcatserver .',
      'On the Docker Host: create user "dockeradmin" with password, add to docker group. Enable password auth in /etc/ssh/sshd_config (PasswordAuthentication yes), reload sshd. In Jenkins → Install "Publish Over SSH" plugin → Configure System → Add Docker Host as SSH server with dockeradmin credentials.',
      'Create directory /opt/docker on Docker Host, chown to dockeradmin. Update Dockerfile to include COPY ./*.war /usr/local/tomcat/webapps. In Jenkins job config, set remote directory to //opt//docker and add Exec commands: cd /opt/docker; docker build -t regapp:v1 .; docker run -d --name registerapp -p 8087:8080 regapp:v1.',
      'Enable Poll SCM in the Jenkins job for auto-trigger. Make a code change in GitHub and push. Verify the pipeline triggers automatically, builds the WAR, copies it to Docker Host, builds image, and deploys. Access the app at http://<DOCKER_HOST_IP>:8087/webapp/.'
    ]
  },
  {
    id: 'DevOps-Project-10',
    title: 'Create a CI/CD pipeline for .NET with the DevOps Starter Project',
    difficulty: 'Beginner',
    githubUrl: `${GITHUB_BASE}DevOps-Project-10`,
    steps: [
      'Sign in to Azure Portal (portal.azure.com). In the search box, type "DevOps Starter" and click Create DevOps Starter.',
      'Click "change settings here" to switch the destination from GitHub to Azure DevOps, then click Done.',
      'Select .NET as the sample application framework. Choose .NET Core → ASP.NET Core MVC. Optionally enable "Add a database". Click Next.',
      'Select "Web App on Windows" as the deployment target (you can also choose Virtual Machine). Click Next.',
      'Select your Azure DevOps organization, choose a name for the project and Web App. Optionally click "Additional Settings" to customize App Service and DB parameters. Click Review + Create.',
      'Wait for deployment to complete, then click "Go to resource". The DevOps Starter dashboard will appear showing your CI/CD pipeline, repo, and Web App.',
      'Click "Browse" on the right side of the dashboard to view your running ASP.NET Core application live on Azure App Service.',
      'Select "Build Pipelines" from the dashboard. Click Edit to examine tasks: fetch sources, restore deps, compile, test, publish artifacts. Check History tab for audit trail. Check Triggers tab — CI trigger is auto-enabled.',
      'Navigate to Pipelines → Releases. Edit the release pipeline. Inspect the Artifacts → Drop, and the CD trigger (enabled by default). View Tasks: Azure Resource Group Deployment, App Service Deploy, SQL DB Deploy, and Visual Studio Tests.',
      'Go to Repos, navigate to Application/aspnet-core-dotnet-core/Pages/Index.cshtml, click Edit. Change the h2 heading text (e.g., "Get started right away with Azure DevOps Projects"). Commit the change. Watch the pipeline auto-trigger under Pipelines → Pipelines. After Build + Release completes, click Browse on the dashboard to verify your updated text is live.'
    ]
  },
  {
    id: 'DevOps-Project-11',
    title: '🏗️ Two-Tier AWS Infrastructure with Terraform',
    difficulty: 'Beginner',
    githubUrl: `${GITHUB_BASE}DevOps-Project-11`,
    steps: [
      'Prerequisites: Install Terraform >= 1.0.0 and AWS CLI. Configure AWS credentials with sufficient IAM permissions using: aws configure.',
      'Clone the repository: git clone https://github.com/NotHarshhaa/DevOps-Projects.git && cd DevOps-Projects/DevOps-Project-11/',
      'Review the project structure: main.tf (module calls), variables.tf (declarations), variables.tfvars (values to customize), backend.tf (provider config), and modules/ directory for reusable Terraform modules.',
      'Edit variables.tfvars: Change RDS-PWD to a strong secure password. Update DOMAIN-NAME to your actual domain. Modify other values (region, instance type, etc.) as needed for your environment.',
      'Initialize Terraform: terraform init — This downloads provider plugins and initializes the modules.',
      'Preview the infrastructure plan: terraform plan -var-file=variables.tfvars — Review the resources that will be created: VPC, subnets, IGW, ALB, ASG, EC2, RDS, Route53, CloudFront, WAF, S3, ACM SSL.',
      'Apply the infrastructure: terraform apply -var-file=variables.tfvars --auto-approve — This provisions the full two-tier architecture on AWS including networking, compute (Auto Scaling + ALB), storage (S3), database (RDS), DNS (Route53), CDN (CloudFront), and security (WAF + IAM).',
      'Verify all resources in AWS Console: Check VPC & Subnets, EC2 instances behind ALB, RDS database in private subnet, Route53 DNS records, CloudFront distribution, and S3 buckets.',
      'Test the deployment: Access your application via the domain name or ALB DNS. Verify the web tier can communicate with the database tier.',
      'Cleanup when done: terraform destroy -var-file=variables.tfvars --auto-approve — This tears down all provisioned resources to avoid ongoing charges.'
    ]
  },
  {
    id: 'DevOps-Project-14',
    title: '🚀 End-to-End CI/CD Pipeline for Android Apps with GitHub Actions',
    difficulty: 'Beginner',
    githubUrl: `${GITHUB_BASE}DevOps-Project-14`,
    steps: [
      'Prerequisites: A GitHub account, a sample Android project (or fork the provided repo). Ensure the project uses Gradle for builds.',
      'Create the workflow directory in the repo root: mkdir -p .github/workflows',
      'Create .github/workflows/android-ci.yml. Define the trigger: on: push: branches: [main] and on: pull_request: branches: [main].',
      'Set up the job environment: runs-on: ubuntu-latest. Add steps: actions/checkout@v3, actions/setup-java@v3 with java-version 17 and distribution "temurin".',
      'Add Gradle caching step: actions/cache@v3 with path ~/.gradle/caches and key based on gradle-wrapper.properties and *.gradle files.',
      'Add the build step: run: chmod +x gradlew && ./gradlew assembleDebug — This compiles the Android app and produces the debug APK.',
      'Add code quality checks: run: ./gradlew lint — Integrate with SonarQube if needed for advanced analysis.',
      'Add unit test step: run: ./gradlew test — This executes all unit tests defined in the project.',
      'Upload the built APK as an artifact: uses: actions/upload-artifact@v3 with name "debug-apk" and path app/build/outputs/apk/debug/*.apk.',
      'Push the workflow file to GitHub. Go to the Actions tab to verify the pipeline runs. On success, download the APK artifact from the completed workflow run to verify. Optionally, add deployment steps to Firebase App Distribution or Google Play Store using appropriate actions.'
    ]
  },
  {
    id: 'DevOps-Project-21',
    title: 'AWS DevOps CICD Pipeline',
    difficulty: 'Beginner',
    githubUrl: `${GITHUB_BASE}DevOps-Project-21`,
    steps: [
      'Clone the repo: git clone https://github.com/NotHarshhaa/DevOps-Projects.git. This is a Netflix-clone video streaming app deployment on EC2 using Docker + AWS Developer Tools.',
      'Create a CodeCommit repository in AWS Console. Create an IAM user with AWSCodeCommitFullAccess. Generate SSH keys: ssh-keygen. Upload the public key (~/.ssh/id_rsa.pub) to IAM → Security credentials → SSH keys for CodeCommit. Create ~/.ssh/config with Host github-codecommit and the SSH key ID. Clone your CodeCommit repo via SSH and push the project code.',
      'Create a CodeBuild project: Source → CodeCommit repo. Environment → Managed image (Amazon Linux, Standard runtime). Check "Enable this flag if you want to build Docker images". The buildspec.yml in the repo root defines install, build, and post_build phases.',
      'Store secrets in AWS Systems Manager Parameter Store: /myapp/docker-credentials/username (SecureString, DockerHub username), /myapp/docker-credentials/password (SecureString, DockerHub token), /myapp/api/key (SecureString, TMDB API key). Add an inline IAM policy to the CodeBuild role granting ssm:GetParameters on arn:aws:ssm:*:<ACCOUNT_ID>:parameter/*.',
      'Run a test build in CodeBuild. Verify the Docker image is pushed to your DockerHub repository. Test locally: docker run -n netflix -p 8080:80 <your-dockerhub>/netflix-react-app.',
      'Configure CodeBuild artifacts: Edit → Artifacts → Type: S3 → provide your bucket name for artifact storage.',
      'Create a CodeDeploy Application (Compute platform: EC2/On-premises). Create a Service Role with: AmazonEC2FullAccess, AmazonEC2RoleforAWSCodeDeploy, AmazonS3FullAccess, AWSCodeDeployFullAccess, AWSCodeDeployRole.',
      'Launch an EC2 instance (Amazon Linux, t2.micro). Create & attach an IAM Role with: AmazonEC2FullAccess, AmazonEC2RoleforAWSCodeDeploy, AmazonS3FullAccess, AWSCodeDeployFullAccess. In User Data, add the bootstrap script: install Docker, install CodeDeploy agent (wget install script from aws-codedeploy-<region>.s3 bucket).',
      'Create a CodeDeploy Deployment Group linked to your EC2 instance (tag-based). Create a deployment and start it.',
      'Create a CodePipeline: Source stage → CodeCommit (branch, poll for changes). Build stage → CodeBuild project. Deploy stage → CodeDeploy application + deployment group. Review and create. Push a code change to CodeCommit to trigger the full end-to-end pipeline. Verify output at http://<EC2_PUBLIC_IP>:8080.'
    ]
  },
  {
    id: 'DevOps-Project-34',
    title: 'Complete DevOps Project: Multi-Tier Application Deployment Locally',
    difficulty: 'Beginner',
    githubUrl: `${GITHUB_BASE}DevOps-Project-34`,
    steps: [
      'Install VirtualBox & Vagrant on your machine. On Mac: brew install virtualbox vagrant. Install the hostmanager plugin: vagrant plugin install vagrant-hostmanager. Verify: VBoxManage --version && vagrant --version.',
      'Clone the project repo: git clone https://github.com/Muncodex/digiprofile-project.git && cd digiprofile-project && git checkout local-vagrant.',
      'Navigate to the Vagrantfile location: cd vagrant/Manual/. The Vagrantfile defines 5 VMs: db01 (MySQL, 192.168.56.15), mc01 (Memcache, 192.168.56.14), rmq01 (RabbitMQ, 192.168.56.13), app01 (Tomcat, 192.168.56.12), web01 (Nginx, 192.168.56.11).',
      'Bring up all VMs: vagrant up. Verify with: vagrant status. SSH into each VM (vagrant ssh db01, etc.) and verify IP addresses with: ip a (CentOS) or ip addr (Ubuntu). Test inter-VM communication: ping mc01 from db01.',
      'Setup MySQL (db01): vagrant ssh db01 → sudo yum update -y → sudo dnf install -y mariadb-server mariadb → sudo systemctl start mariadb && sudo systemctl enable mariadb → sudo mysql_secure_installation (set root password to "admin"). Create database: mysql -u root -padmin → CREATE DATABASE accounts; GRANT ALL PRIVILEGES ON accounts.* TO \'admin\'@\'%\' IDENTIFIED BY \'admin\'; FLUSH PRIVILEGES;. Restore dump: mysql -u root -padmin accounts < db_backup.sql. Open firewall port 3306.',
      'Setup Memcache (mc01): sudo dnf install epel-release memcached -y → start & enable memcached → sed -i \'s/127.0.0.1/0.0.0.0/g\' /etc/sysconfig/memcached → restart memcached. Open firewall ports 11211/tcp and 11111/udp. Start memcached daemon: sudo memcached -p 11211 -U 11111 -u memcached -d.',
      'Setup RabbitMQ (rmq01): sudo dnf install epel-release centos-release-rabbitmq-38 -y → sudo dnf install rabbitmq-server -y → sudo systemctl enable --now rabbitmq-server. Configure: echo "loopback_users = none" | sudo tee /etc/rabbitmq/rabbitmq.conf → sudo rabbitmqctl add_user test test → sudo rabbitmqctl set_user_tags test administrator → set full permissions → restart. Open firewall port 5672.',
      'Setup Tomcat (app01): sudo dnf install java-11-openjdk java-11-openjdk-devel git maven wget -y. Download & extract Tomcat 9.0.75. Create tomcat user, copy files to /usr/local/tomcat, set ownership. Create systemd service file at /etc/systemd/system/tomcat.service. daemon-reload, start & enable tomcat. Open firewall port 8080.',
      'Build & Deploy the app on app01: cd /tmp → git clone the repo → git checkout local-setup-mun → edit src/main/resources/application.properties (set jdbc.url=jdbc:mysql://db01:3306/accounts, memcached.active.host=mc01, rabbitmq.address=rmq01). Run: export MAVEN_OPTS="-Xmx512m" && mvn install. Copy the WAR: sudo cp target/vprofile-v2.war /usr/local/tomcat/webapps/ROOT.war → restart tomcat.',
      'Setup Nginx (web01): vagrant ssh web01 → sudo apt update && sudo apt install nginx -y. Create config: sudo vi /etc/nginx/sites-available/vproapp → add: upstream vproapp { server app01:8080; } server { listen 80; location / { proxy_pass http://vproapp; } }. Symlink: sudo ln -s /etc/nginx/sites-available/vproapp /etc/nginx/sites-enabled/. Remove default. Restart nginx. Access the app at http://192.168.56.11 in your browser. Login with admin_vp/mgt_vp.'
    ]
  },
  {
    id: 'DevOps-Project-07',
    title: 'DevOps-Journey-Using-Azure-DevOps',
    difficulty: 'Beginner',
    githubUrl: `${GITHUB_BASE}DevOps-Project-07`,
    steps: [
      'Prerequisites: Azure account (free trial OK), Azure DevOps account (free at dev.azure.com). Review the prerequisite doc in the repo.',
      'Lab 1 — Initial Setup: Create an Azure DevOps Organization and a new Project. Create an Azure Service Principal (SPN) for Terraform to authenticate with Azure. Create Blob Storage for Terraform remote state file. Create an Azure AD group for AKS Admins.',
      'Lab 2 — Setup Azure DevOps Terraform Pipeline: Create an Azure DevOps Pipeline (YAML-based) that provisions all infrastructure using Terraform modules — VNet, AKS cluster, ACR, etc. Run the pipeline and verify resources appear in Azure Portal.',
      'Lab 3 — Deploy Application to Azure Container Registry (ACR): Build the sample Docker image locally: docker build -t <appname> . → Run locally to test: docker run -p 8080:80 <appname>. Push to ACR: az acr login --name <acrname> → docker tag & docker push.',
      'Lab 4a — Add AKS-ACR Role Assignment: Add Terraform config to grant the AKS managed identity the AcrPull role on your ACR, so AKS pods can pull images.',
      'Lab 4b — Add Application Insights: Add Application Insights resource via Terraform for monitoring your app after deployment.',
      'Lab 4c — Add Azure Key Vault: Add Key Vault via Terraform. Store secrets used in Azure DevOps Variable Groups (connection strings, credentials, etc.).',
      'Lab 4d — Update Pipeline to Deploy to AKS: Update your Azure DevOps pipeline YAML to include a deploy stage that applies Kubernetes manifests (Deployment + Service) to your AKS cluster, pulling the image from ACR.',
      'Lab 5 — CI/CD: Add a pipeline trigger (trigger: - main) so the pipeline runs automatically on every push. Update the Kubernetes deployment to use a dynamic image tag (Build.BuildId) so each pipeline run deploys the latest image automatically.',
      'Lab 6 — Testing: Add Inspec-Azure tests to validate infrastructure (verify AKS cluster exists, node count, ACR exists, etc.). Add Inspec test stage to the pipeline. View Inspec reports in Azure DevOps. Lab 7 — Monitoring: Review Application Insights telemetry. Configure Availability Tests. Review Container Insights in Log Analytics for AKS pod-level monitoring.'
    ]
  },

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
