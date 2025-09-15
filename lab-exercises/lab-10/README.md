# Implement a Full Proxying Service

The `lab-2` folder is completely empty. Create a service that listens on port 3000. The service must proxy all requests and responses to [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com).

Use the following command to check whether the implementation was successful:

```shell
node -e "http.get('http://localhost:3000/todos/1',(res)=>res.pipe(process.stdout))"
```