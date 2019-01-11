---
title: "Object-relational mapper"
date: "2019-01-11"
---

## Field types

**AutoField** 字段自增

**BooleanField** 布尔字段

**CharField** 字符串字段

**DateField** 日期字段

**DateTimeField** 时间日期字段

**DecimalField** Decimal字段

**EmailField** 邮箱字段

**FilePathField** 文件路径字段

**FloatField** 浮点字段

**IntegerField** 整数字段

**IPAddressField** ip地址字段

**GenericIPAddressField** ip地址字段

**SlugField** Slug字段

**TextField** 文本字段

**TimeField** 时间字段

**URLField** url字段

**BinaryField** 二进制字段

**UUIDField** uuid字段


## field options

**verbose_name** from表单显示名称

**primary_key** 主键

**max_length** 最大长度

**blank** 是否为null

**default** 默认值

**choices** 选择项

**db_index** 是否创建索引

**db_column** 列名

**unique** 是否唯一

**editable** from表单可编辑

```python
from django.db import models
import datetime
import uuid
from django.utils import timezone

class Person(models.Model):
    id = models.UUIDField( primary_key=True, default=uuid.uuid1())
    # id = models.AutoField(primary_key=True)
    gender = models.CharField(blank=False, db_column="gender", max_length=250, choices=(
        ('female', '男'),
        ('male', '女'),
    ),
                              db_index=True, default="默认值", editable=False,
                              error_messages={'blank': 'INVALID!!11', 'null': 'NULL11!'},
                              help_text="Please use the following format: <em>YYYY-MM-DD</em>.",
                              primary_key=False, unique=False
                              )
    age = models.IntegerField(default=0)
    email = models.EmailField(default="kastrcn@outlook.com")
    birthday = models.DateField(default=datetime.date.today)
    create_at = models.DateTimeField(verbose_name="创建时间", default=timezone.now)
    class Meta:
        db_table = 'user'
        # abstract = True
        ordering = ['-gender']

```

