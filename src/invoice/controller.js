import { Router } from 'express';
import JSONBig from 'json-bigint';

import {
  createInvoice,
  listInvoices,
  publishInvoice
} from './service';

const controller = (() => {
  const router = Router();

  /**
   * POST /invoice { data?: Order }
   * @example http POST :3000/invoice
   */
  router.post('/', async (req, res) => {
    const { orderId, customerId, locationId } = req.body;

    try {
      const result = await createInvoice(orderId, customerId, locationId);
      res.json(JSONBig.parse(JSONBig.stringify(result)));
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  /**
 * PUT /invoice 
 * @example http PUT :3000/invoice
 */
  router.put('/', async (req, res) => {
    const { invoiceId, body } = req.body;
    try {
      const { result: { invoice } } = await publishInvoice(invoiceId, body);
      res.json(JSONBig.parse(JSONBig.stringify(invoice)));
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  /**
   * GET /invoice { data?: any }
   * @example http GET :3000/invoice
   */
  router.get('/', async (req, res) => {
    try {
      const { locationId } = req.query;
      const result = await listInvoices(locationId);
      res.json({
        locationId,
        invoices: JSONBig.parse(JSONBig.stringify(result))
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  return router;
})();

controller.prefix = '/invoice';

export default controller;
