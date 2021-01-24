cp ../back_end/requirements.txt back_end/

docker build -t back_end ./back_end/

rm back_end/requirements.txt
