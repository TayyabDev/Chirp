FROM tiangolo/nginx-rtmp:latest-2020-08-16
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 1935
CMD ["nginx", "-g", "daemon off;"]