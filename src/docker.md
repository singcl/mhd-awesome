## DOCKER 几率

### 基础的 nodejs 应用

```dockerfile
FROM node:lts-alpine
ENV NODE_ENV=production PORT=3001
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

```

**构建**

```bash
docker build --tag express:lts-s .
```

**运行**

```bash
docker run --name express3000 -p 3000:3000 express:lts-s
```
