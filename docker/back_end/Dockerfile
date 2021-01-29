FROM python:3.8-buster

RUN mkdir /root/.pip

COPY install-nginx.sh /
COPY pip.conf /root/.pip/
COPY sources.list /etc/apt/sources.list
COPY uwsgi-conf.ini /
COPY requirements.txt /
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY run.sh /

RUN sh install-nginx.sh; \
    chmod +x /run.sh; \
    /usr/local/bin/python -m pip install --upgrade pip; \
    pip install -r /requirements.txt; \
    pip install uwsgi;

EXPOSE 8000

WORKDIR /
ENTRYPOINT ["/run.sh"]
