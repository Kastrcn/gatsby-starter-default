---
title: "安装djangorestframework"
date: "2019-01-13"
---

`pip install djangorestframework`

添加setting.py

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
]
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
    ]
}
```

创建api包

```
api/
    __init__.py
    serializers.py
```

创建 serializers.py

```python
from rest_framework import serializers
from ..models import Role

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id','name']
```

创建urls.py文件

```python
from . import views
from django.urls import path
app_name = 'apps'


urlpatterns = [
    path('Role/', views.RoleListView.as_view(), name='subject_list'),
    path('Role/<pk>/', views.RoleDetailView.as_view(), name='subject_detail'),
]
```

创建views.py文件

```python
from rest_framework import generics
from ..models import Role
from .serializers import RoleSerializer

class RoleListView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class RoleDetailView(generics.RetrieveAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
```

添加urls.py

```python
from django.urls import path,include

urlpatterns = [
    ...,
    path('api/', include('app.api.urls', namespace='api'))

]
```

## python shell 

解析

```python
>>> from io import BytesIO
>>> from rest_framework.parsers import JSONParser
>>> data = b'{"id":4,"title":"Programming","slug":"programming"}'
>>> JSONParser().parse(BytesIO(data))
{'id': 4, 'title': 'Programming', 'slug': 'programming'}

```

生成

```python
>>> from rest_framework.renderers import JSONRenderer
>>> JSONRenderer().render(serializer.data)
b'{"id":4,"title":"Programming","slug":"programming"}'
```





