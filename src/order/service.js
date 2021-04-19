import { v4 as uuid } from 'uuid';

import { ApiError, Client, Environment } from 'square'

const environment = process.env.NODE_ENV === 'dev' ? Environment.Sandbox : Environment.Production
// Create an instance of the API Client 
// and initialize it with the credentials 
// for the Square account whose assets you want to manage
const client = new Client({
  timeout: 3000,
  environment,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
})

// Get an instance of the Square API you want call
const { ordersApi } = client

// Create wrapper async function 
const placeOrder = async (payload, customerId) => {
  const order = Object.assign({ customerId }, payload);
  console.log(JSON.stringify(order));
  const { body } = await ordersApi.createOrder({ order, idempotencyKey: uuid() });
  return JSON.parse(body);
}

const fetchOrders = async (locationId) => {
  return ordersApi.searchOrders({ locationIds: [locationId] });
}

export {
  placeOrder,
  fetchOrders
}