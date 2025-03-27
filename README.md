## EduBook

![image](https://github.com/user-attachments/assets/ab76a6d8-2bda-4d2b-9668-4b5d9f6f6061)


## Getting Started 

First, download the appropriate `dev.properties` file and place it into the directory 
`.\backend\soen343\src\main\resources\` alongside the `application.properties` file. 

Then, run the java code `backend\soen343\src\main\java\com\example\soen343\Soen343Application.java` in order to 
get the SpringBoot backend process running. 
You should get a message like 
```
2025-03-24T17:57:29.010-04:00  INFO 14460 --- [soen343] [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2025-03-24T17:57:29.021-04:00  INFO 14460 --- [soen343] [  restartedMain] com.example.soen343.Soen343Application   : Started Soen343Application in 2.976 seconds (process running for 3.323) 
2025-03-24T17:58:18.851-04:00  INFO 14460 --- [soen343] [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2025-03-24T17:58:18.851-04:00  INFO 14460 --- [soen343] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2025-03-24T17:58:18.854-04:00  INFO 14460 --- [soen343] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
```

Now, in `.\frontend` , do `npm install` to get all the necessary dependencies. 
Once done, do `npm start` do run the program. 

 
## Run using maven

Go to backend/soen343 then do `mvn clean install` 
then, do `mvn spring-boot:run` after the build succeeds. 

Go to frontend , do `npm i` and `npm start`
