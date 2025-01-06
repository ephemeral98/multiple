# 使用 Ubuntu 作为基础镜像
FROM ubuntu:20.04

# 更新软件包列表并安装依赖
RUN apt-get update && \
    apt-get install -y curl gnupg2

# 设置时区为默认时区，避免安装过程中的时区提示
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y tzdata

# 安装一些必要的依赖
RUN apt-get install -y \
    curl \
    gnupg \
    lsb-release \
    ca-certificates \
    software-properties-common

# 添加 NodeSource APT 仓库并安装 Node.js 22.x
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# 安装 Yarn（通过官方仓库安装）
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | tee /etc/apt/trusted.gpg.d/yarn.asc && \
#     echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#     apt-get update && \
#     apt-get install -y yarn

# 使用 npm 安装 Yarn
RUN npm install -g yarn

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件到工作目录
COPY package.json ./

# 安装依赖，这里不使用yarn install --production是因为还需要安装dev的依赖
RUN yarn

# 复制 .next 和 public 文件夹到工作目录
COPY .next .next
COPY public public

# 复制 ecosystem.config.js 文件到工作目录
COPY ecosystem.config.js ./

COPY next.config.js ./

# 安装 PM2 全局依赖
RUN yarn global add pm2

# 暴露端口
EXPOSE 3000

# 使用 PM2 运行 Next.js 应用程序
CMD ["pm2-runtime", "ecosystem.config.js"]
