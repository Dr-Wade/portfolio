# ---- Build stage ----
FROM node:24-alpine AS build
WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

# Install dependencies (cached unless lockfile/manifest change)
COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --frozen-lockfile

# Build the static site
COPY . .
RUN pnpm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine AS runtime

# Static output + SPA-free routing config
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
