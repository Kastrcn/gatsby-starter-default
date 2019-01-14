---
title: "使用vue框架进行前端渲染"
date: "2019-01-13"
---
## 使用脚手架生成vue项目

```bash
vue-init webpack frontend
```

修改django项目静态文件**setting.py**

```python
TEMPLATES = [
    {
        # 'DIRS': [os.path.join(BASE_DIR, 'templates')]
        'DIRS': ['frontend/dist'],
    },
]
# 添加静态文件
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend/dist/static"),
]
```

添加前端页面修改django项目**urls.py**文件

```python
from django.views.generic import TemplateView

from django.urls import path,include

from django.conf.urls import  include, url

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(myapp.urls)),
    url(r'^$', TemplateView.as_view(template_name="index.html")),
]
```

## 解决跨域

Django的第三方包`django-cors-headers`来解决跨域问题：

```python
 pip install django-cors-headers
```

**settings.py** 修改：

```python
# 注意中间件的添加顺序
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = True
```

