# Giai đoạn build
FROM node:20.9 AS build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và yarn.lock vào thư mục làm việc
COPY package.json yarn.lock ./

# Cài đặt các dependencies bằng Yarn
RUN yarn

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng Vite (tạo thư mục dist)
RUN yarn build

# Giai đoạn phục vụ với Nginx
FROM nginx:alpine

# Sao chép các file build sang thư mục Nginx để phục vụ
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80

# Chạy Nginx server
CMD ["nginx", "-g", "daemon off;"]
