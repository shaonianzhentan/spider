# 使用多阶段构建来创建一个支持 Puppeteer 的 Docker 镜像

# 第一阶段：构建 Puppeteer 环境
FROM node:18 AS builder

# 安装必要的依赖
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# 安装 Puppeteer 依赖
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# 安装 Puppeteer
RUN npm install puppeteer express

# 第二阶段：创建最终镜像
FROM node:18-slim

# 复制 Puppeteer 依赖
COPY --from=builder /node_modules /node_modules

# 设置工作目录
WORKDIR /app

# 复制应用程序代码
COPY . .

# 安装应用程序依赖
RUN npm install

# 暴露服务端口
EXPOSE 3000

# 启动应用程序
CMD ["node", "index.js"]