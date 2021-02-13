#!bin/sh

cd /back_end && python manage.py migrate
uwsgi --ini /back_end/uwsgi-conf.ini
nginx -g "daemon off;"
