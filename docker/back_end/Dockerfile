FROM python:3.8-alpine3.11

RUN mkdir /root/.pip

COPY pip.conf /root/.pip/
COPY install-nginx.sh /
COPY uwsgi-conf.ini /
COPY requirements.txt /
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY run.sh /

RUN sh /install-nginx.sh; \
    apk add --no-cache uwsgi-python3; \
    pip install --upgrade pip; \
    pip install -r requirements.txt;

EXPOSE 8000

CMD ["/run.sh"]
