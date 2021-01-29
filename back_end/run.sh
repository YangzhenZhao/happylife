#!bin/sh

uwsgi --ini /back_end/uwsgi-conf.ini
nginx -g "daemon off;"
