# 🛴 Checkout System API - Fullstack Engineer Code Challenge - Wunder Mobility

<br>

## 🚀 Challenge
Implement a checkout system that can scan items in any order and apply certain promotional campaigns to give discounts. The system needs to be flexible regarding the promotional rules.

## 👨🏽‍💻 Tech Stack
- Node.js
- Typescript
- Express
- Jest

## 📝 Functional Requirements
- Endpoint that handle the checkout of products
- Scan products and get the subtotal from the product groups
- Run promotions defined by the developer
- Obtain the total price of the order

## 🚙 How to run this application

1. `npm install` to install the dependencies;
2. `npm test` to run test suite;
3. `npm run start:dev` to run the project locally.


## 🛤 Endpoints

#### 🛒 Base URL: http://localhost:3000/

#### 🤑 Promotions

There are two types of promotions on this application: `AMOUNT_OF_PRODUCTS` and `PERCENTAGE_OF_TOTAL_PRICE`.

Promotion entity:
|  id | type   |  min_value | discount   |
|---|---|---|---|
|  number |"PERCENTAGE_OF_TOTAL_PRICE" or "AMOUNT_OF_PRODUCTS"   |  number | discount   |


` AMOUNT_OF_PRODUCTS ` applies the `discount` when the product reaches the minium quantity specified in `min_value`
` PERCENTAGE_OF_TOTAL_PRICE ` applies the `discount` when the product reaches the minimum subtotal specified in `min_value`

To add new promotions, simply add new entities to the `promotional_rules.json`, give it unique ids and referentiate it in the `promotion_id` request body.

#### 🔐 Routes

<br>

**`POST /v1/checkout`** This endpoint must return a list of GitHub users and the link for the next page. Use the _query param_ `since` to fetch users from the given number

Example request (imitating how would a checkout work on real-life, each product by the time):

```
[
  { "id": 2, "name": "Hamburguer", "price": 6, "promotion_id": 1, "quantity": 1 },
  { "id": 2, "name": "Hamburguer", "price": 6, "promotion_id": 1, "quantity": 1 },
  { "id": 2, "name": "Hamburguer", "price": 6, "promotion_id": 1, "quantity": 1 },
  { "id": 3, "name": "Sushi", "price": 6, "promotion_id": 1, "quantity": 1 },
  { "id": 3, "name": "Sushi", "price": 6, "promotion_id": 1, "quantity": 1 },
  { "id": 3, "name": "Sushi", "price": 6, "promotion_id": 1, "quantity": 1 }
]
```
### 🚨 Observation

Since it's a small project, I didn't add any verifications regarding some values in this application. 
For example, you can add negative discounts, negative minimum values for promotions, etc... I had that in mind but I decided not to code those verifications since it's just a code challenge. Hope you understand.

#### 👋🏽 How to reach me

Lourenço Passos | Fullstack Software Engineer | lo.passos93@gmail.com | 55-51-996106010
