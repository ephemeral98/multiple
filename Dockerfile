# 使用 Ubuntu 作为基础镜像
FROM ubuntu:latest

# 更新软件包列表并安装依赖
RUN apt-get update && \
    apt-get install -y curl gnupg2

RUN apt-get update && apt-get install -y --reinstall ca-certificates curl build-essential \
    && curl -s https://nodejs.org/dist/v22.11.0/node-v22.11.0-linux-x64.tar.xz \
    -o node-v22.11.0-linux-x64.tar.xz && tar xf node-v22.11.0-linux-x64.tar.xz \
    && cd node-v22.11.0-linux-x64 && cp -r bin include lib share /usr/local \
    && rm -rf /node-v22.11.0-linux-x64.tar.xz /node-v22.11.0-linux-x64


# 设置 npm 使用淘宝镜像
RUN npm config set registry https://registry.npmmirror.com

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件到工作目录
COPY package.json ./

# 安装依赖，这里不使用yarn install --production是因为还需要安装dev的依赖
RUN npm i yarn -g

# 复制 .next 和 public 文件夹到工作目录
COPY .next .next
COPY public public

# 复制 ecosystem.config.js 文件到工作目录
COPY ecosystem.config.js ./

COPY next.config.js ./

# 安装 PM2 全局依赖
# RUN yarn global add pm2
# RUN yarn add pm2 -g
RUN npm i pm2 -g

RUN yarn


# 暴露端口
EXPOSE 3000

# 使用 PM2 运行 Next.js 应用程序
CMD ["pm2-runtime", "ecosystem.config.js"]
