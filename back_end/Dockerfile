FROM python:3.8-buster

COPY . /back_end

WORKDIR /back_end

RUN mv sources.list /etc/apt/sources.list; \
    apt-get update; \
    apt-get install nginx -y; \
    mv nginx.conf /etc/nginx/conf.d/nginx.conf; \
    mkdir /root/.pip; \
    mv pip.conf /root/.pip/; \
    /usr/local/bin/python -m pip install --upgrade pip; \
    pip install -r requirements.txt; \
    python manage.py migrate; \
    pip install uwsgi; \
    mv run.sh /; \
    chmod +x /run.sh;

EXPOSE 8000

WORKDIR /

ENTRYPOINT ["/run.sh"]
