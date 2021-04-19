import { v4 as uuid } from 'uuid'
import { placeOrder } from './orders.mjs'
import { listCustomers, createCustomer } from './customers.mjs'
import { getLocations } from './locations.mjs'
import { createInvoice, listInvoices, publishInvoice } from './invoices.mjs'

const customerId = '1PBM7Y0H04YP10EP75PQVSQWY0'
const locationId = 'LX4JNEYW08380'

const customer1 = {
    idempotencyKey: uuid(),
    givenName: 'JC',
    familyName: 'G',
    companyName: 'Murica',
    nickname: 'El Jefe',
    emailAddress: 'johncade@blendedsense.com',
    address: {
        addressLine1: '500 Electric Ave',
        locality: 'Austin',
        administrativeDistrictLevel1: 'TX',
        postalCode: '78725',
        country: 'US'
    },
    phone: '1-512-459-2222',
    referenceId: uuid(),
    note: 'VIP Customer'
}

const customer2 = {
    idempotencyKey: uuid(),
    givenName: 'Albert',
    familyName: 'B',
    companyName: 'NY Yankees',
    nickname: 'El Flamethrower',
    emailAddress: 'albert@blendedsense.com',
    address: {
        addressLine1: '500 Electric Ave',
        locality: 'New York',
        administrativeDistrictLevel1: 'NY',
        postalCode: '10032',
        country: 'US'
    },
    phone: '1-512-459-2222',
    referenceId: uuid(),
    note: 'VIP Customer'
}

const createCustomers = async () => {
    const customerPayloads = [customer1, customer2];
    const createPomises = customerPayloads.map(c => createCustomer(c))
    return Promise.all(createPomises);
}

const run = async () => {

    const orderPayload = {
        idempotencyKey: uuid(),
        order: {
            customerId: 'BWEHPWXYN4SA34KBYYC1KQAZKM',
            locationId,
            lineItems: [
                {
                    name: "Immersive Blend",
                    quantity: "1",
                    basePriceMoney: {
                        amount: 1499.00,
                        currency: "USD"
                    }
                }
            ]
        }
    }

    // const order = await placeOrder(orderPayload);
    // console.log(`Order placed!\n ${JSON.stringify(order)}`)
    const orderId = 'XILRRmbvlHdA81azghMuOXwNcd4F'
    // const invoice = await createInvoice(orderId, customerId, locationId);
    // const invoices = await listInvoices(locationId)
    const invoiceId = 'inv:0-ChCkbadSPKIS9CsdH-kiZ-HjEMMC'
    const body = {
        version: 1,
    };
    body.idempotencyKey = uuid();
    const result = await publishInvoice(invoiceId, body)

    console.log(result)
}

const createOrder = async (customerId) => {
    const orderPayload = {
        idempotencyKey: uuid(),
        order: {
            customerId,
            locationId,
            lineItems: [
                {
                    name: "Immersive Blend",
                    quantity: "1",
                    basePriceMoney: {
                        amount: 1499.00,
                        currency: "USD"
                    }
                }
            ]
        }
    }
    const order = await placeOrder(orderPayload);
    console.log('Order placed')
    console.log(order)

}

const logInvoices = async () => {
    const result = await listInvoices(locationId);
    console.log(result[0]);
}

const initInvoice = async (orderId, customerId) => {

    const invoice = await createInvoice(orderId, customerId, locationId);
    const invoices = await listInvoices(locationId)
    console.log(invoices);
}

const pubInvoice = async () => {
    const invoiceId = 'inv:0-ChBIVII19JWxgkiNC1e8KaxlEKkH'
    const body = {
        version: 0,
    };
    body.idempotencyKey = uuid();
    try {
        const result = await publishInvoice(invoiceId, body)
        console.log(result)
    } catch (error) {
        console.log(error)
    }

}

const orderNumber = 'Ou0Sj9232bEzCohx0RZKCFsX1QQZY'
const customerNumber = 'SPRMFNZ9K8RQF7JNNKPJR2KVKW'
// // createOrder(customerNumber)
// initInvoice(orderNumber, customerNumber)
// // const orderNumber = '4rQY4Vwmsv8YDGboA1OphJT6xwdZY'
// // const customerNumber = 'BWEHPWXYN4SA34KBYYC1KQAZKM'
pubInvoice()

// logInvoices()