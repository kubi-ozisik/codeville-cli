
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# Install Python
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive     && apt-get -y install --no-install-recommends python3-pip

# Install global dependencies
RUN npm install -g npm@latest


# Install Python dependencies
COPY requirements.txt /tmp/pip-tmp/
RUN pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/pip-tmp/requirements.txt     && rm -rf /tmp/pip-tmp


# Set the default shell to bash instead of sh
ENV SHELL /bin/bash
