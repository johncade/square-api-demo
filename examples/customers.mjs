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
export async function createCustomer(customer) {
    // The try/catch statement needs to be called from within an asynchronous function
    const bodyAddress = {
        addressLine1: '500 Electric Ave',
        locality: 'Austin',
        administrativeDistrictLevel1: 'TX',
        postalCode: '78725',
        country: 'US'
    };

    const body = {
        idempotencyKey: uuid(),
        givenName: 'JC',
        familyName: 'G',
        companyName: 'Murica',
        nickname: 'El Jefe',
        emailAddress: 'johncade@blendedsense.com',
        address: bodyAddress,
        phone: '1-512-459-2222',
        referenceId: uuid(),
        note: 'VIP Customer'
    }


    let payload = body;
    if (customer) {
        payload = customer
    }

    try {
        const { result, ...httpResponse } = await customersApi.createCustomer(payload);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;'
        console.log('Customer created');
        console.log(result);
        return result
    } catch (error) {
        if (error instanceof ApiError) {
            const errors = error.result;
            // const { statusCode, headers } = error;
        }
    }
}

export async function listCustomers() {
    return await customersApi.listCustomers();
}

