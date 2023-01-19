###### 本地跨域请求的解决方案----代理

```js
devServer:{
    proxy:{
        "/maoyan":{
            target:"https://m.maoyan.com",
            changeOrigin:true,
            pathRewrite:{
                '^/maoyan':''
            }
        }
    }
}
```

组件发请求

```javascript
axios.get("/maoyan/ajax/movie/OnInfoList?token=&optimus_uuid=2345679sdfn89fgx8s&optimus_risk_level=71&optimus_code=10").then(res=>{
    console.log(res.data)
})
```

**nginx配置**

server->location

```json
location /{
	root dist
    index	index.html	index.htm;
}
```

**代理配置**

```
location /maoyan/{
	proxy_pass	https://m.maoyan.com/;
}
```

**nginx 服务器重启**

```
./nginx.exe -s stop
```

**nginx 服务器重新热加载**

```
./nginx.exe	-s reload
```

**nginx 服务器启动**

```
nginx.exe -c conf\kerwin.conf
```

**阿里云的安全组必须开启80端口**



