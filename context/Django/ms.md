## 集合

### 1.1 java中有哪些容器

​	Collection StringBuffered 数组 

### 1.2 数组和集合的区别

  长度：

- **数组的长度固定**
- **集合的长度可变**

元素的数据类型

- 数组可以存储基本数据类型,也可以存储引用类型
- **集合只能存储引用类型(你存储的是简单的int，它会自动装箱成Integer)**

### 1.3 集合的继承结构

 Collection
        List 自动扩展的数组
            ArrayList(常用)（底层数据数组）
            LinkedList（底层数据链表）
            Vector(了解，已过时)（底层数据数组 线程安全）
        Set 不能重复的数组 全部非线程同步 
         TreeSet(红黑树)
         HashSet(常用)（哈希表）（红黑树）
         LinkedHashSet（底层数据结构由哈希表和链表组成。）
	Map
  	  HashMap(常用) （底层数据结构是哈希表(是一个元素为链表的数组)）
   	     LinkedHashMap（底层数据链表）
 	   TreeMap（底层数据结构是红黑树(是一个自平衡的二叉树)） 
  	  ConcurrentHashMap (线程安全的HashMap 比Hashtable效率高)
 	   Hashtable(了解，，已过时) (线程安全)		

### 1.4 Collection常用方法	![img](https://user-gold-cdn.xitu.io/2018/4/4/1628e4e1f75125d8?w=1292&h=578&f=png&s=42527)

### 1.5 集合使用Iterator遍历

```java
List<String> list=  Arrays.asList("wo","lai","test");
Iterator<String> it = list.iterator();
while (it.hasNext()){
    System.out.println(it.next());
}
```

### 1.6 迭代器为什么不定义成一个类,而是一个接口？

![img](https://user-gold-cdn.xitu.io/2018/4/4/1628e4e2686de25a?w=1213&h=556&f=bmp&s=2023894)

### 1.7 list常用的子类有几个？作用是什么？

- ArrayList  底层数据结构是数组。线程不安全
- LinkedList 底层数据结构是链表。线程不安全
- Vector 底层数据结构是数组。线程安全

### 1.8 Set集合的常用子类

- HashSet集合
  - A:底层数据结构是哈希表(是一个元素为链表的数组)
- TreeSet集合
  - A:底层数据结构是红黑树(是一个自平衡的二叉树)
  - B:保证元素的排序方式
- LinkedHashSet集合
  - A:：底层数据结构由哈希表和链表组成。



### 1.9 创建线程安全的ArrayList

```
List list = Collections.synchronizedList(new ArrayList());
```

### 1.10 为什么现在不是用**Vector**了？

​	被ArrayList替代

​		Vector所有方法都是同步，有性能损失。

​		Vector初始length是10 超过length时 以100%比率增长，**相比于ArrayList更多消耗内存**	

### 1.11Map与Collection的区别

![img](https://image-static.segmentfault.com/263/852/2638529766-5acb2898afc6a_articlex)



### 1.12 Map基本功能

![img](https://image-static.segmentfault.com/378/032/3780325928-5acb2898afbf5_articlex)

### 1.13 Map遍历

```java
Map map = new HashMap();
map.put("object","object");
Set<Map.Entry<Integer, String>> entries = map.entrySet();
Iterator<Map.Entry<Integer, String>> iteratorMap = entries.iterator();
while (iteratorMap.hasNext()){
    Map.Entry<Integer, String> next = iteratorMap.next();
    System.out.println(next);//object=object
}
```

## 多线程

### 1.1 run()和start()方法区别：

run():仅仅是封装被线程执行的代码，直接调用是普通方法
start():首先启动了线程，然后再由jvm去调用该线程的run()方法。

### 1.2 jvm虚拟机的启动是单线程的还是多线程的?

是多线程的。不仅仅是启动main线程，还至少会启动垃圾回收线程的，不然谁帮你回收不用的内存~

### 1.3 线程安全

​    线程安全是针对多线程来讲的，如果所使用的公用变量在多线程下没有被保护机制时，变量结果会和理论值不一致，这样就叫作线程不安全，
​    相反公用变量在保护机制下工作，就不会出现“随机”变化，这时叫线程安全。  

### 1.4 原子性和可见性是什么

- synchronized保证了线程的**原子性**。(被保护的代码块是一次被执行的，没有任何线程会同时访问)
- synchronized还保证了**可见性**。(当执行完synchronized之后，修改后的变量对其他的线程是可见的)

### 1.5 同步方法和同步代码块的区别是什么？

```
同步方法默认用this或者当前类class对象作为锁；

同步代码块可以选择以什么来加锁，比同步方法要更细颗粒度，我们可以选择只同步会发生同步问题的部分代码而不是整个方法；

同步方法使用关键字 synchronized修饰方法，而同步代码块主要是修饰需要进行同步的代码，用   synchronized（object）{代码内容}进行修饰；
```

### 1.6 僵尸进程和孤儿进程：

僵尸：一个进程使用fork创建子进程，如果子进程退出，而父进程并没有调用wait或waitpid获取子进程的状态信息，那么子进程的进程描述符仍然保存在系统中。这种进程称之为僵死进程。

孤儿：父进程退出，子进程仍在运行中。这些子进程就叫做孤儿进程，孤儿进程将被init进程(进程号为1)所收养，并由init进程对它们完成状态收集工作



## java基础

### 1.1 Druid

- 替代C3P0、DBCP数据库连接池(因为它的性能更好)
- 自带监控页面，实时监控应用的连接池情况

### 1.2 NIO和IO的区别

- `I`- 就是从硬盘到内存
- `O`- 就是从内存到硬盘

| IO         | NIO        |
| ---------- | ---------- |
| 面向Stream | 面向Buffer |
| 阻塞IO     | 非阻塞IO   |
|            | Selectors  |

​	1、使用IO和NIO的API是不同的（废话）

​	2、处理数据的方式

​	3、处理数据所用到的线程数

### 1.3 内存溢出原因和解决

- 内存泄露导致堆栈内存不断增大，从而引发内存溢出。

- 大量的jar，class文件加载，装载类的空间不够，溢出

- 操作大量的对象导致堆内存空间已经用满了，溢出

- nio直接操作内存，内存过大导致溢出

  解决

  - 查看程序是否存在内存泄漏的问题
  - 设置参数加大空间
  - 代码中是否存在死循环或循环产生过多重复的对象实体、
  - 查看是否使用了nio直接操作内存。







![img](https://camo.githubusercontent.com/e6c35ea95750cdfcae6de380336e2886fbe540ad/68747470733a2f2f692e696d6775722e636f6d2f4c554e436d594a2e706e67)



## Spring 

### 1.1 Spring和Springboot区别

* SpringBoot是能够创建出独立的Spring应用程序的
* 简化Spring配置
* 嵌入式Tomcat，Jetty容器，无需部署WAR包

### 1.2  微服务架构 


Spring Cloud基于Spring Boot，

为微服务体系开发中的架构问题，
提供了一整套的解决方案——服务注册与发现，服务消费，服务保护与熔断，网关，分布式调用追踪，分布式配置管理等。

### 1.3 你对Spring的理解

Spring是一个大的概念，Spring从最开始的一个Library到现在一个系列，其中最主要的包括Spring Framework, Spring Data, Spring Security, Spring Batch等等，以及快速框架Spring Boot，其中最重要的项目是Spring Framework，这个项目包括了IoC, AOP, MVC以及Testing。

第一个需要明白的是Spring的核心思想是什么？Spring整个系列的最最核心的概念当属IoC, AOP，什么是IoC和AOP就不展开了，简而言之，将对象创建过程的职责赋予容器，通过容器管理对象的生老病死， 将对象创建过程从编译时延期到运行时，即通过配置进行加载，这样一来就解决了不用编译后期选择具体实现，其实就是面向对象的核心理念，针对接口编程。IoC开始就是个factory加上依赖管理罢了，这样一来，一个系统的创建过程就从原先的new改为配置组装，内部通过注入解决了依赖关系，只要满足接口协议即插即用。通过IoC, AOP事实上形成了一个套路，通过这个套路完成了系统的整合。所以Spring并没有说自己写一个ORM，而是用统一的套路完成了多个ORM的集成，这也是Spring越做越大的基础，慢慢就形成了Spring Way，其实这个才是Spring最有价值的地方。

### 1.4 Spring 有哪些模块

 Spring框架至今已集成了20多个模块。这些模块主要被分如下图所示的核心容器、数据访问/集成,、Web、AOP（面向切面编程）、工具、消息和测试模块。

Core module
Bean module
Context module
Expression Language module
JDBC module
ORM module
OXM module
Java Messaging Service(JMS) module
Transaction module
Web module
Web-Servlet module
Web-Struts module
Web-Portlet module

### 1.5 控制反转(IOC)？什么是依赖注入？

控制反转是一种设计原则  最常见的方式叫做依赖注入 还有一种方式叫“依赖查找”

### 1.6 Spring Bean的作用域之间有什么区别？

Spring容器中的bean可以分为5个范围。所有范围的名称都是自说明的，但是为了避免混淆，还是让我们来解释一下：

singleton：这种bean范围是默认的，这种范围确保不管接受到多少个请求，每个容器中只有一个bean的实例，单例的模式由bean factory自身来维护。
prototype：原形范围与单例范围相反，为每一个bean请求提供一个实例。
request：在请求bean范围内会每一个来自客户端的网络请求创建一个实例，在请求完成以后，bean会失效并被垃圾回收器回收。
Session：与请求范围类似，确保每个session中有一个bean的实例，在session过期后，bean会随之失效。
global-session：global-session和Portlet应用相关。当你的应用部署在Portlet容器中工作时，它包含很多portlet。如果你想要声明让所有的portlet共用全局的存储变量的话，那么这全局变量需要存储在global-session中。
全局作用域与Servlet中的session作用域效果相同。

### 1.7  Spring Bean的生命周期？

Spring Bean的生命周期简单易懂。在一个bean实例被初始化时，需要执行一系列的初始化操作以达到可用的状态。同样的，当一个bean不在被调用时需要进行相关的析构操作，并从bean容器中移除。

Spring bean factory 负责管理在spring容器中被创建的bean的生命周期。Bean的生命周期由两组回调（call back）方法组成。

初始化之后调用的回调方法。
销毁之前调用的回调方法。
Spring框架提供了以下四种方式来管理bean的生命周期事件：

InitializingBean和DisposableBean回调接口
针对特殊行为的其他Aware接口
Bean配置文件中的Custom init()方法和destroy()方法
@PostConstruct和@PreDestroy注解方式
使用customInit()和 customDestroy()方法管理bean生命周期的代码样例如下：

### 1.8 BeanFactory和ApplicationContext有什么区别？

BeanFactory 可以理解为含有bean集合的工厂类。BeanFactory 包含了种bean的定义，以便在接收到客户端请求时将对应的bean实例化。

BeanFactory还能在实例化对象的时生成协作类之间的关系。此举将bean自身与bean客户端的配置中解放出来。BeanFactory还包含了bean生命周期的控制，调用客户端的初始化方法（initialization methods）和销毁方法（destruction methods）。

从表面上看，application context如同bean factory一样具有bean定义、bean关联关系的设置，根据请求分发bean的功能。但application context在此基础上还提供了其他的功能。

### 1.9 使用Spring框架的好处是什么？

轻量：Spring 是轻量的，基本的版本大约2MB。
控制反转：Spring通过控制反转实现了松散耦合，对象们给出它们的依赖，而不是创建或查找依赖的对象们。
面向切面的编程(AOP)：Spring支持面向切面的编程，并且把应用业务逻辑和系统服务分开。
容器：Spring 包含并管理应用中对象的生命周期和配置。
MVC框架：Spring的WEB框架是个精心设计的框架，是Web框架的一个很好的替代品。
事务管理：Spring 提供一个持续的事务管理接口，可以扩展到上至本地事务下至全局事务（JTA）。
异常处理：Spring 提供方便的API把具体技术相关的异常（比如由JDBC，Hibernate or JDO抛出的）转化为一致的unchecked 异常。

https://blog.csdn.net/a745233700/article/details/80959716

http://ifeve.com/spring-interview-questions-and-answers/

https://juejin.im/post/5b065000f265da0de45235e6#heading-8

## SpringMVC

### 1.0 简单介绍下你对springMVC的理解?

Spring MVC是一个基于Java的实现了MVC设计模式的请求驱动类型的轻量级Web框架，通过把Model，View，Controller分离，将web层进行职责解耦，把复杂的web应用分成逻辑清晰的几部分，简化开发，减少出错，方便组内开发人员之间的配合。

### 1.1 SpringMVC的流程？

（1）用户发送请求至前端控制器DispatcherServlet；
（2） DispatcherServlet收到请求后，调用HandlerMapping处理器映射器，请求获取Handle；
（3）处理器映射器根据请求url找到具体的处理器，生成处理器对象及处理器拦截器(如果有则生成)一并返回给DispatcherServlet；
（4）DispatcherServlet 调用 HandlerAdapter处理器适配器；
（5）HandlerAdapter 经过适配调用 具体处理器(Handler，也叫后端控制器)；
（6）Handler执行完成返回ModelAndView；
（7）HandlerAdapter将Handler执行结果ModelAndView返回给DispatcherServlet；
（8）DispatcherServlet将ModelAndView传给ViewResolver视图解析器进行解析；
（9）ViewResolver解析后返回具体View；
（10）DispatcherServlet对View进行渲染视图（即将模型数据填充至视图中）
（11）DispatcherServlet响应用户。

### 1.2 Springmvc的优点:

（1）可以支持各种视图技术,而不仅仅局限于JSP；

（2）与Spring框架集成（如IoC容器、AOP等）；

（3）清晰的角色分配：前端控制器(dispatcherServlet) , 请求到处理器映射（handlerMapping), 处理器适配器（HandlerAdapter), 视图解析器（ViewResolver）。

（4） 支持各种请求资源的映射策略。

### 1.2 springMVC和struts2的区别有哪些?

（1）springmvc的入口是一个servlet即前端控制器（DispatchServlet），而struts2入口是一个filter过虑器（StrutsPrepareAndExecuteFilter）。

（2）springmvc是基于方法开发(一个url对应一个方法)，请求参数传递到方法的形参，可以设计为单例或多例(建议单例)，struts2是基于类开发，传递参数是通过类的属性，只能设计为多例。

（3）Struts采用值栈存储请求和响应的数据，通过OGNL存取数据，springmvc通过参数解析器是将request请求内容解析，并给方法形参赋值，将数据和视图封装成ModelAndView对象，最后又将ModelAndView中的模型数据通过reques域传输到页面。Jsp视图解析器默认使用jstl。

### 1.3 SpringMVC怎么样设定重定向和转发的？

（1）转发：在返回值前面加"forward:"，譬如"forward:user.do?name=method4"

（2）重定向：在返回值前面加"redirect:"，譬如"redirect:http://www.baidu.com"

### 1.4 SpringMvc怎么和AJAX相互调用的？

通过Jackson框架就可以把Java里面的对象直接转化成Js可以识别的Json对象。具体步骤如下 ：

（1）加入Jackson.jar

（2）在配置文件中配置json的映射

（3）在接受Ajax方法里面可以直接返回Object,List等,但方法前面要加上@ResponseBody注解。

### 1.5 如何解决POST请求中文乱码问题，GET的又如何处理呢？

**解决post请求乱码问题：**
在web.xml中配置一个CharacterEncodingFilter过滤器，设置成utf-8；

**get请求中文参数出现乱码解决方法有两个：**
修改tomcat配置文件添加编码与工程编码一致
**另外一种方法对参数进行重新编码：**
String userName = new String(request.getParamter("userName").getBytes("ISO8859-1"),"utf-8")

ISO8859-1是tomcat默认编码，需要将tomcat编码后的内容按utf-8编码。

### 1.6 Spring MVC的异常处理 ？

答：可以将异常抛给Spring框架，由Spring框架来处理；我们只需要配置简单的异常处理器，在异常处理器中添视图页面即可。

### 1.7 SpringMvc的控制器是不是单例模式,如果是,有什么问题,怎么解决？

是单例模式,所以在多线程访问的时候有线程安全问题,不要用同步,会影响性能的,解决方案是在控制器里面不能写字段。

### 1.8  SpringMVC常用的注解有哪些？

@RequestMapping：用于处理请求 url 映射的注解，可用于类或方法上。用于类上，则表示类中的所有响应请求的方法都是以该地址作为父路径。

@RequestBody：注解实现接收http请求的json数据，将json转换为java对象。

@ResponseBody：注解实现将conreoller方法返回对象转化为json对象响应给客户。

SpingMvc中的控制器的注解一般用那个,有没有别的注解可以替代？

一般用@Conntroller注解,表示是表现层,不能用别的注解代替。

### 1.9 如果在拦截请求中，我想拦截get方式提交的方法,怎么配置？

可以在@RequestMapping注解里面加上method=RequestMethod.GET。

### 1.10 怎样在方法里面得到Request,或者Session？

答：直接在方法的形参中声明request,SpringMvc就自动把request对象传入。

### 1.11、如果想在拦截的方法里面得到从前台传入的参数,怎么得到？

答：直接在形参里面声明这个参数就可以,但必须名字和传过来的参数一样。

### 1.12、如果前台有很多个参数传入,并且这些参数都是一个对象的,那么怎么样快速得到这个对象？

答：直接在方法中声明这个对象,SpringMvc就自动会把属性赋值到这个对象里面。

### 1.13、SpringMvc中函数的返回值是什么？

答：返回值可以有很多类型,有String, ModelAndView。ModelAndView类把视图和数据都合并的一起的，但一般用String比较好。

### 1.14、SpringMvc用什么对象从后台向前台传递数据的？

答：通过ModelMap对象,可以在这个对象里面调用put方法,把对象加到里面,前台就可以通过el表达式拿到。

### 1.15 、怎么样把ModelMap里面的数据放入Session里面？

答：可以在类上面加上@SessionAttributes注解,里面包含的字符串就是要放入session里面的key。

### 1.16 SpringMvc里面拦截器是怎么写的：

 有两种写法,一种是实现HandlerInterceptor接口，另外一种是继承适配器类，接着在接口方法当中，实现处理逻辑；然后在SpringMvc的配置文件中配置拦截器即可：

 注解原理： 
 注解本质是一个继承了Annotation的特殊接口，其具体实现类是Java运行时生成的动态代理类。我们通过反射获取注解时，返回的是Java运行时生成的动态代理对象。通过代理对象调用自定义注解的方法，会最终调用AnnotationInvocationHandler的invoke方法。该方法会从memberValues这个Map中索引出对应的值。而memberValues的来源是Java常量池。



## Mybatis



https://blog.csdn.net/a745233700/article/details/80977133

### 1.0 JDBC

导包 

创建链接对象 

往传递prepareStatement sql



### 1.1 #{}和${}的区别是什么？

- `#{}`解析传递进来的参数数据
- **#{}是预编译处理，${}是字符串替换**。

- ${}对传递进来的参数**原样**拼接在SQL中
- 使用#{}可以有效的防止SQL注入，提高系统安全性。

### 1.2 当实体类中的属性名和表中的字段名不一样 ，怎么办 

1. 查询sql起别名
2. 做映射 **resultMap**

### 1.3 如何获取自动生成的(主)键值?

mysql 使用 LAST_INSERT_ID()

oracle  select 序列.nextval() from dual

### 1.4 在mapper中如何传递多个参数?

* **使用占位符的思想 ** {0} {1}
* @param注解方式
* **使用Map集合作为参数来装载**



### 1.5 Mybatis动态sql是做什么的？都有哪些动态sql？能简述一下动态sql的执行原理不？

**以标签的形式编写动态sql，完成逻辑判断和动态拼接sql的功能**。

**根据表达式的值动态拼接sql，以此来完成动态sql的功能**。

trim|where|set|foreach|if|choose|when|otherwise|bind。



### 1.6 Mybatis的Xml映射文件中，不同的Xml映射文件，id是否可以重复？

**如果配置了namespace那么当然是可以重复的，因为我们的Statement实际上就是namespace+id**

如果没有配置namespace的话，那么相同的id就会导致覆盖了。



### 1.7 为什么说Mybatis是半自动ORM映射工具？它与全自动的区别在哪里？

- Hibernate属于全自动ORM映射工具，使用Hibernate查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。

- 而Mybatis在查询关联对象或关联集合对象时，需要手动编写sql来完成，所以，称之为半自动ORM映射工具。

  

### 1.8 通常一个Xml映射文件，都会写一个Dao接口与之对应，请问，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？

- Dao接口，就是人们常说的Mapper接口，接口的全限名，就是映射文件中的namespace的值，接口的方法名，就是映射文件中MappedStatement的id值，接口方法内的参数，就是传递给sql的参数。
- Mapper接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为key值，可唯一定位一个MappedStatement
- Dao接口里的方法，**是不能重载的，因为是全限名+方法名的保存和寻找策略**。
- **Dao接口的工作原理是JDK动态代理，Mybatis运行时会使用JDK动态代理为Dao接口生成代理proxy对象，代理对象proxy会拦截接口方法，转而执行MappedStatement所代表的sql，然后将sql执行结果返回。**

### 1.9 Mybatis比IBatis比较大的几个改进是什么

- a.**有接口绑定,包括注解绑定sql和xml绑定Sql** ,
- b.动态sql由原来的节点配置变成OGNL表达式,
- c. 在一对一,一对多的时候引进了association,在一对多的时候引入了collection节点,不过都是在resultMap里面配置



### 1.11Mybatis是如何进行分页的？分页插件的原理是什么？

Mybatis使用RowBounds对象进行分页，它是针对ResultSet结果集执行的内存分页，而非物理分页，可以在sql内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页。

**分页插件的基本原理是使用Mybatis提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的sql，然后重写sql，根据dialect方言，添加对应的物理分页语句和物理分页参数。**

select * from student，拦截sql后重写为：select t.* from （select * from student）t limit 0，10

### 1.12 简述Mybatis的插件运行原理，以及如何编写一个插件

Mybatis仅可以**编写针对ParameterHandler、ResultSetHandler、StatementHandler、Executor这4种接口的插件，Mybatis使用JDK的动态代理，为需要拦截的接口生成代理对象以实现接口方法拦截功能**，每当执行这4种接口对象的方法时，就会进入拦截方法，具体就是InvocationHandler的invoke()方法，当然，只会拦截那些你指定需要拦截的方法。

实现Mybatis的Interceptor接口并复写intercept()方法，**然后在给插件编写注解，指定要拦截哪一个接口的哪些方法即可，记住，别忘了在配置文件中配置你编写的插件。**

### 1.13 Mybatis是否支持延迟加载？如果支持，它的实现原理是什么？

Mybatis仅支持association关联对象和collection关联集合对象的延迟加载，association指的就是一对一，collection指的就是一对多查询。在Mybatis配置文件中，**可以配置是否启用延迟加载lazyLoadingEnabled=true|false。**

它的原理是，**使用CGLIB创建目标对象的代理对象**，当调用目标方法时，**进入拦截器方法**，比如调用a.getB().getName()，拦截器invoke()方法发现a.getB()是null值，那么就会单独发送事先保存好的查询关联B对象的sql，把B查询上来，然后调用a.setB(b)，于是a的对象b属性就有值了，接着完成a.getB().getName()方法的调用。这就是延迟加载的基本原理。

当然了，不光是Mybatis，几乎所有的包括Hibernate，支持延迟加载的原理都是一样的。

### 1.14 Mybatis都有哪些Executor执行器？它们之间的区别是什么？

Mybatis有三种基本的Executor执行器，**SimpleExecutor、ReuseExecutor、BatchExecutor**。

- SimpleExecutor：每执行一次update或select，就开启一个Statement对象，**用完立刻关闭Statement对象**。
- ReuseExecutor：执行update或select，以sql作为key查找Statement对象，存在就使用，不存在就创建，用完后，不关闭Statement对象，而是放置于Map<String, Statement>内，供下一次使用。简言之，**就是重复使用Statement对象**。
- BatchExecutor：执行update（没有select，JDBC批处理不支持select），将所有sql都添加到批处理中（addBatch()），等待统一执行（executeBatch()），**它缓存了多个Statement对象，每个Statement对象都是addBatch()完毕后，等待逐一执行executeBatch()批处理。与JDBC批处理相同**。

作用范围：Executor的这些特点，都严格限制在SqlSession生命周期范围内。



### 1.15 MyBatis与Hibernate有哪些不同？

Mybatis和hibernate不同，它不完全是一个ORM框架，因为MyBatis需要程序员自己编写Sql语句，不过mybatis可以通过XML或注解方式灵活配置要运行的sql语句，并将java对象和sql语句映射生成最终执行的sql，最后将sql执行的结果再映射生成java对象。

Mybatis学习门槛低，简单易学，程序员直接编写原生态sql，可严格控制sql执行性能，灵活度高，非常适合对关系数据模型要求不高的软件开发，例如互联网软件、企业运营类软件等，因为这类软件需求变化频繁，一但需求变化要求成果输出迅速。但是灵活的前提是mybatis无法做到数据库无关性，如果需要实现支持多种数据库的软件则需要自定义多套sql映射文件，工作量大。

Hibernate对象/关系映射能力强，数据库无关性好，对于关系模型要求高的软件（例如需求固定的定制化软件）如果用hibernate开发可以节省很多代码，提高效率。但是Hibernate的缺点是学习门槛高，要精通门槛更高，而且怎么设计O/R映射，在性能和对象模型之间如何权衡，以及怎样用好Hibernate需要具有很强的经验和能力才行。 
总之，按照用户的需求在有限的资源环境下只要能做出维护性、扩展性良好的软件架构都是好架构，所以框架只有适合才是最好。



### 1.16 一级缓存和二级缓存的区别

一个seesion多次

多个session共享

## JSP

### 1.1 指令有几个 分别干什么

page
include
taglib JSTL

### 1.2 内置对象有几个,分别干什么 

pageContext          PageContext             当前页面共享数据，还可以获取其他八个内置对象
request              HttpServletRequest      一次请求访问的多个资源(转发)
session 			 HttpSession             一次会话的多个请求间
application 		 ServletContext          所有用户间共享数据
response 			 HttpServletResponse     响应对象
page 				 Object                  当前页面(Servlet)的对象 this
out 				 JspWriter               输出对象，数据输出到页面上
config               ServletConfig           Servlet的配置对象
exception 			 Throwable               异常对象

### 1.3 4大作用域

pageScope	--> pageContext
requestScope --> request
sessionScope --> session
applicationScope --> application（ServletContext）

### 1.4 JSTL

if 
choosee
foreach
out



## mysql

### 1.1 优化方式

 不*号查询
 使用连接查询代替子查询 
 创建索引
 通过explain

### 1.2 数据库有几大范例

第一范式：每列都是不可再分的最小数据单位
第二范式：一个表中只能保存一种数据
第三范式：每一列数据都和主键直接相关，而不能间接相关

### 1.3 limit 起点

5 10 ->6 15 实际+1 

### 1.4 事务隔离级别

![image-20190310230502121](/Users/kastrcn/Library/Application Support/typora-user-images/image-20190310230502121.png)



### 1.5 事务的并发问题

　　1、脏读： 读取了回滚的数据  事务A读取了事务B更新的数据，然后B回滚操作，那么A读取到的数据是脏数据 度

　　2、不可重复读：有人操作 两次结果不一致  事务 A 多次读取同一数据，事务 B 在事务A多次读取的过程中，对数据作了更新并提交，导致事务A多次读取同一数据时，结果 不一致。

　　3、幻读： 读取了未修改过的数据   系统管理员A将数据库中所有学生的成绩从具体分数改为ABCDE等级，但是系统管理员B就在这个时候插入了一条具体分数的记录，当系统管理员A改结束后发现还有一条记录没有改过来，就好像发生了幻觉一样，这就叫幻读。

### 1.6 事务的基本要素（ACID）

　1、原子性（Atomicity）：事务开始后所有操作，要么全部做完，要么全部不做，不可能停滞在中间环节。事务执行过程中出错，会回滚到事务开始前的状态，所有的操作就像没有发生一样。也就是说事务是一个不可分割的整体，就像化学中学过的原子，是物质构成的基本单位。

　 2、一致性（Consistency）：事务开始前和结束后，数据库的完整性约束没有被破坏 。比如A向B转账，不可能A扣了钱，B却没收到。

　 3、隔离性（Isolation）：同一时间，只允许一个事务请求同一数据，不同的事务之间彼此没有任何干扰。比如A正在从一张银行卡中取钱，在A取钱的过程结束前，B不能向这张卡转账。

　4、持久性（Durability）：事务完成后，事务对数据库的所有更新将被保存到数据库，不能回滚。

### 1.7 mysql和oracle的事物隔离级别

mysql 可重复读

oracle 读已提交

## Redis

### 1.1 Redis相比memcached有哪些优势？

memcached所有的值均是简单的字符串，redis作为其替代者，支持更为丰富的数据类型

redis的速度比memcached快很多

redis可以持久化其数据

### 1.2 Redis支持哪几种数据类型？

String、List、Set、Sorted Set、hashes

### 1.3 一个字符串类型的值能存储最大容量是多少？

512M

### 1.4 缓存机制

​     一)、Snapshotting

 快照是默认的持久化方式。这种方式是就是将内存中数据以快照的方式写入到二进制文件中,默认的文件名为dump.rdb。可以通过配置设置自动做快照持久化的方式。我们可以配置 redis在 n 秒内如果超过 m 个 key 被修改就自动做快照，下面是默认的快照保存配置：

- save 900 1 #900 秒内如果超过 1 个 key 被修改，则发起快照保存
- save 300 10 #300 秒内容如超过 10 个 key 被修改，则发起快照保存
- save 60 10000

redis 支持两种持久化方式，一种是 Snapshotting（快照）也是默认方式，另一种是 Append-only file（缩写 aof）的方式。下面分别介绍：

​        1.redis 调用 fork,现在有了子进程和父进程。

​        2. 父进程继续处理 client 请求，子进程负责将内存内容写入到临时文件。由于 os 的实时复制机制（ copy on write)父子进程会共享相同的物理页面，当父进程处理写请求时 os 会为父进程要修改的页面创建副本，而不是写共享的页面。所以子进程地址空间内的数据是 fork时刻整个数据库的一个快照。

​        3.当子进程将快照写入临时文件完毕后，用临时文件替换原来的快照文件，然后子进程退出。client 也可以使用 save 或者 bgsave 命令通知 redis 做一次快照持久化。 save 操作是在主线程中保存快照的，由于 redis 是用一个主线程来处理所有 client 的请求，这种方式会阻塞所有client 请求。所以不推荐使用。另一点需要注意的是，每次快照持久化都是将内存数据完整写入到磁盘一次，并不是增量的只同步变更数据。如果数据量大的话，而且写操作比较多，必然会引起大量的磁盘 io 操作，可能会严重影响性能。



​       二)、AOF方式 

​		每一条都持久化

​        由于快照方式是在一定间隔时间做一次的，所以如果 redis 意外 down 掉的话，就会丢失最后一次快照后的所有修改。如果应用要求不能丢失任何修改的话，可以采用 aof 持久化方式。下面介绍 Append-only file:aof 比快照方式有更好的持久化性，是由于在使用 aof 持久化方式时,redis 会将每一个收到的写命令都通过 write 函数追加到文件中(默认是 appendonly.aof)。当 redis 重启时会通过重新执行文件中保存的写命令来在内存中重建整个数据库的内容。当然由于 os 会在内核中缓存 write 做的修改，所以可能不是立即写到磁盘上。这样 aof 方式的持久化也还是有可能会丢失部分修改。不过我们可以通过配置文件告诉 redis 我们想要通过 fsync 函数强制 os 写入到磁盘的时机。有三种方式如下（默认是：每秒 fsync 一次）





