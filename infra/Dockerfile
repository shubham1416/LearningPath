# DevOps Mastery - Ultimate Playground Environment
FROM ubuntu:22.04

# Avoid prompts
ENV DEBIAN_FRONTEND=noninteractive

# Update and install core utilities
RUN apt-get update && apt-get install -y \
    curl \
    git \
    vim \
    nano \
    sudo \
    wget \
    unzip \
    zip \
    openssh-client \
    python3 \
    python3-pip \
    htop \
    jq \
    ca-certificates \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Ansible (via pip - more reliable than apt repo)
RUN pip3 install --no-cache-dir ansible

# Install Terraform (direct binary download - no apt repo needed)
RUN TERRAFORM_VERSION=$(curl -s https://checkpoint-api.hashicorp.com/v1/check/terraform | jq -r '.current_version') \
    && curl -fsSL "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip" -o /tmp/terraform.zip \
    && unzip /tmp/terraform.zip -d /usr/local/bin/ \
    && rm /tmp/terraform.zip \
    && terraform version

# Install Kubectl (direct binary download)
RUN KUBECTL_VERSION=$(curl -L -s https://dl.k8s.io/release/stable.txt) \
    && curl -fsSL "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl" -o /usr/local/bin/kubectl \
    && chmod +x /usr/local/bin/kubectl \
    && kubectl version --client

# Install Docker CLI (No Daemon) via official apt repo
RUN install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && chmod a+r /etc/apt/keyrings/docker.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu jammy stable" | \
       tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update && apt-get install -y docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /home/student
RUN chown -R 1000:1000 /home/student

# Add a welcome message
RUN echo 'echo -e "\x1b[32m╔════════════════════════════════════════╗\x1b[0m"' >> /root/.bashrc \
    && echo 'echo -e "\x1b[32m║  Welcome to DevOps Mastery Playground! ║\x1b[0m"' >> /root/.bashrc \
    && echo 'echo -e "\x1b[32m╚════════════════════════════════════════╝\x1b[0m"' >> /root/.bashrc \
    && echo 'echo -e "Available tools: \x1b[36mDocker  Kubectl  Terraform  Ansible  Git  Python\x1b[0m"' >> /root/.bashrc \
    && echo 'echo ""' >> /root/.bashrc

CMD ["/bin/bash"]
