# Square API Demo

Demo of the square API.


## Usage

1. Set the following `ENV` vars in your terminal:
```bash
$ export SQUARE_ACCESS_TOKEN=<TOKEN>
$ export NODE_ENV='develop` # If using a prod square location, set to production
```

2. Download postman and import the postman collection [here](https://github.com/johncade/square-api-demo/blob/master/docs/postman_collection.json)

3. Start the node service:

```bash
$ npm run serve
```

4. To create an invoice and send the invoice as an email:
```
1. Create a new customer, or select customer ID of an existing one
2. Create an order
3. Create an invoice associated with an order & customer
4. Publish the invoice
```

