import { ApiError, Client, Environment } from 'square'

import { v4 as uuid } from 'uuid';
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
const { customersApi } = client



// Create wrapper async function 
export async function createCustomer(payload) {

  const customer = Object.assign({ idempotencyKey: uuid(), referenceId: uuid() }, payload);

  try {
    const { result, ...httpResponse } = await customersApi.createCustomer(customer);
    return result
  } catch (error) {
    if (error instanceof ApiError) {
      const errors = error.result;
      // const { statusCode, headers } = error;
    }
  }
}

export async function listCustomers() {
  const response = await customersApi.listCustomers();
  return response.result.customers;
}


