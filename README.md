### HappyLife

一个前后端分离的娱乐项目~


### 依赖

python3.7+

第三方 API:    

- <a href="https://cj.weather.com.cn/plugin/standard" target="_blank">中国天气网</a>

- <a href="https://dev.qweather.com/docs/api/" target="_blank">和风天气API</a>        

- <a href="https://lbs.qq.com/service/webService/webServiceGuide/webServiceDistrict" target="_blank">腾讯位置服务</a>

省份列表:   

<a href="https://github.com/wecatch/china_regions" target="_blank">https://github.com/wecatch/china_regions</a>        



### 安装

```bash
cd back_end
pip install -r requirements.txt

cd front_end
npm install
```

### docker

```
$ cd docker
$ sh build.sh
$ docker run -d --rm -p 8000:8000 back_end

$ docker run -ti --rm -v /Users/nocilantro/happylife/back_end:/back_end -p 8000:8000 back_end /bin/sh

$ docker run -ti --rm -v /Users/nocilantro/happylife/back_end:/back_end -p 8000:8000 --entrypoint /bin/sh  back_end
```