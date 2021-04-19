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
const placeOrder = async (order) => {
    // The try/catch statement needs to be called from within an asynchronous function
    try {
        const { body } = await ordersApi.createOrder(order)
        return JSON.parse(body);
    } catch (error) {
        if (error instanceof ApiError) {
            console.log("There was an error in your request: ", error.errors)
        } else {
            console.log("Unexpected Error: ", error)
        }
    }
}

export {
    placeOrder
}