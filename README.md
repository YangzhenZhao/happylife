### HappyLife

一个前后端分离的娱乐项目~      
后端 Django 2.2     
前端 Vue 3.0    

### 环境准备

- Docker      
- Python3.7+           
- docker-compose          

#### Linux-x86_64 安装 Python3.7.3、docker-comose 示例   

```
$ wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2019.07-Linux-x86_64.sh
$ bash Anaconda3-2019.07-Linux-x86_64.sh
```


例如使用的`SHELL`为`zsh`，则在`.zshrc`中添加如下示例内容，具体按照自己的`anaconda3`安装目录修改    

```
export PATH="/root/anaconda3/bin:$PATH"
```

然后执行以下内容:  

```
$ source ~/.zshrc

$ python --version
Python 3.7.3

$ pip install --upgrade docker-compose
$ docker-compose --version
docker-compose version 1.28.2, build unknown
```


### 部署

开放服务器的`8000`和`8080`端口    
确保服务器`3306`端口不被占用   

服务器的`~`(`$HOME`)目录下新建`happylife_mysql`文件夹用于存放 mysql 数据

将`front_end/src/hooks/utils.ts`中的`BASE_URL`修改为`http://你的服务器地址:8000`   

修改`back_end/back_end/settings.py`内容:

```py
ALLOWED_HOSTS = ['你的服务器地址']   
```

执行: 

```
docker-compose up -d mysql
docker-compose up -d
```

然后访问`你的服务器地址:8080`即可    

### 开发依赖


第三方 API:    

- <a href="https://cj.weather.com.cn/plugin/standard" target="_blank">中国天气网</a>

- <a href="https://dev.qweather.com/docs/api/" target="_blank">和风天气API</a>        

- <a href="https://lbs.qq.com/service/webService/webServiceGuide/webServiceDistrict" target="_blank">腾讯位置服务</a>

省份列表:   

<a href="https://github.com/wecatch/china_regions" target="_blank">https://github.com/wecatch/china_regions</a>        
