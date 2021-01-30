FROM node AS builder

COPY . /front_end

WORKDIR /front_end

RUN npm config set registry https://registry.npm.taobao.org;\
    npm install; \
    npm run build;

FROM nginx

COPY --from=builder /front_end/dist /site

COPY ./nginx.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
