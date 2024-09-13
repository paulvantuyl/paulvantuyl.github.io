FROM ubuntu:24.04

# "#################################################"
# "Get the latest APT packages"
# "apt-get update"
RUN apt-get update

# "#################################################"
# "Install Ubuntu prerequisites for Ruby and GitHub Pages (Jekyll)"
RUN apt-get -y install git \
    curl \
    autoconf \
    bison \
    build-essential \
    libssl-dev \
    libyaml-dev \
    libreadline6-dev \
    zlib1g-dev \
    libncurses5-dev \
    libffi-dev \
    libgdbm6 \
    libgdbm-dev \
    libdb-dev \
    apt-utils

# "#################################################"
# "GitHub Pages/Jekyll, Ruby. Set the version and path"
ENV RBENV_ROOT /usr/local/src/rbenv
ENV RUBY_VERSION 3.3.5
ENV PATH ${RBENV_ROOT}/bin:${RBENV_ROOT}/shims:$PATH

# "#################################################"
# "Install rbenv to manage Ruby versions"
RUN git clone https://github.com/rbenv/rbenv.git ${RBENV_ROOT} \
    && git clone https://github.com/rbenv/ruby-build.git \
    ${RBENV_ROOT}/plugins/ruby-build \
    && ${RBENV_ROOT}/plugins/ruby-build/install.sh \
    && echo 'eval "$(rbenv init -)"' >> /etc/profile.d/rbenv.sh

# "#################################################"
# "Install ruby and set the global version"
RUN rbenv install ${RUBY_VERSION} \
    && rbenv global ${RUBY_VERSION}

# "#################################################"
# "Install the version of Jekyll that GitHub Pages supports"
# "Based on: https://pages.github.com/versions/"
RUN gem install jekyll -v '3.10.0'