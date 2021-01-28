#!bin/sh

uwsgi --ini /uwsgi-conf.ini
nginx -g "daemon off;"
