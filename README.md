# README

## Requirements

- Node 15.14.0
- NPM 7.11.1

## TODO:

### Address

- Update action
- Destroy action

## Card

Save card token to avoid re enter card every time.

We are going to assume that the payment was processed with Stripe Checkout and we only need to send shipment address to complete the purchase. 

## Before To Start

### Initial Setup

Install the project dependencies using NPM.

```
npm i
```

Add .env file with api endpoint.


```
REACT_APP_API_ENDPOINT=http://localhost:3001/api/v1
```

## Running

Server will start running on port 3000

```
npm start
```

## Testing

```
npm run test
```

## Credentials

There's a user with

email: seller@test.com
password: Seller1!

to access the seller side.