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
const { invoicesApi } = client

const createInvoice = async (orderId, customerId, locationId) => {

  const invoice = {
    idempotencyKey: uuid(),
    invoice: {
      orderId,
      locationId,
      customFields: [
        {
          label: "Special Offer",
          value: "Refer a friend and get 10% off your next subscription! Check our website for offer details.",
          placement: "ABOVE_LINE_ITEMS"
        },
        {
          label: "Next steps",
          value: "Please confirm your account on the Blended Sense platform and schedule a creative vision call!",
          placement: "BELOW_LINE_ITEMS"
        }
      ],
      primaryRecipient: {
        customerId
      },
      deliveryMethod: "EMAIL",
      paymentRequests: [
        {
          requestType: "BALANCE",
          dueDate: "2021-04-20"
        }
      ],
      title: "Blended Sense"
    }
  };

  return invoicesApi.createInvoice(invoice);

}

const listInvoices = async (locationId) => {
  const response = await invoicesApi.listInvoices(locationId);
  return response.result.invoices;
}

const publishInvoice = async (invoiceId, body) => {
  body.idempotencyKey = uuid();
  const response = await invoicesApi.publishInvoice(invoiceId, body);
  return response;
}


export {
  createInvoice,
  listInvoices,
  publishInvoice
}