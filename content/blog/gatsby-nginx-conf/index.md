---
title: NGINX config for Gatsby
date: "2017-10-01T21:02:55.392Z"
---

This blog is set up on DigitalOcean, with NGINX. I originally wanted to use S3 +
Cloudfront, but I'd rather scoop my eyeballs out with a sextant than trawl
through AWS documentation.

After some searching, I found an adequate NGINX config that I could crib from in
the [gatsby-docker](https://github.com/gatsbyjs/gatsby-docker) repo, and I ended
up with:

```nginx
worker_processes    auto;
user                [whatever user you use];

events {
  worker_connections 1024;
}

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  keepalive_timeout  15;
  autoindex          off;
  server_tokens      off;
  port_in_redirect   off;
  sendfile           off;
  tcp_nopush         on;
  tcp_nodelay        on;

  client_max_body_size 64k;
  client_header_buffer_size 16k;
  large_client_header_buffers 4 16k;

  ## Cache open FD
  open_file_cache max=10000 inactive=3600s;
  open_file_cache_valid 7200s;
  open_file_cache_min_uses 2;

  ## Gzipping is an easy way to reduce page weight
  gzip                on;
  gzip_vary           on;
  gzip_proxied        any;
  gzip_types          [some types]
  gzip_buffers        16 8k;

  access_log         /var/log/access.log;
  error_log         /var/log/error.log;

  server {
    listen 80;
    root [wherever your blog is];

    index index.html;
    autoindex off;
    charset urtf-8;

    error_page 404 /404.html;

    location ~* \.(html)$ {
      add_header Cache-Control "no-store";
      expires    off;
    }

    location ~* \.([all the extensions you want to cache])$ {
      add_header Cache-Control "public";
      expires +1y;
    }

    rewrite ^([^.\?]*[^/])$ $1/ permanent

    try_files $uri $uri/ $uri/index.html =404;

    [some SSL stuff]
  }
}
```
