#!/bin/sh

for file in /usr/share/nginx/html/assets/*.js
do
  sed -i 's|VITE_AUTHENTIK_URL_PLACEHOLDER|'${VITE_AUTHENTIK_URL}'|g' $file
  sed -i 's|VITE_AUTHENTIK_CLIENT_ID_PLACEHOLDER|'${VITE_AUTHENTIK_CLIENT_ID}'|g' $file
  sed -i 's|VITE_AUTHENTIK_CLIENT_SECRET_PLACEHOLDER|'${VITE_AUTHENTIK_CLIENT_SECRET}'|g' $file
  sed -i 's|VITE_API_BASE_URL_PLACEHOLDER|'${VITE_API_BASE_URL}'|g' $file
done
