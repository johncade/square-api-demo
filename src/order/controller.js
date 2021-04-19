import { Router } from 'express';
import JSONBig from 'json-bigint';

import { fetchOrders, placeOrder } from './service';

const controller = (() => {
  const router = Router();

  /**
   * POST /order { data?: Order }
   * @example http POST :3000/order
   */
  router.post('/', async (req, res) => {
    const payload = req.body;
    const { customerId } = req.query;
    try {
      const response = await placeOrder(payload, customerId);
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  /**
   * GET /order { data?: any }
   * @example http GET :3000/order
   */
  router.get('/', async (req, res) => {
    try {
      const { locationId } = req.query;
      console.log(`Location ID: ${locationId}`);
      const { result: { orders } } = await fetchOrders(locationId);
      res.json({
        locationId,
        orders: JSONBig.parse(JSONBig.stringify(orders))
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  return router;
})();

controller.prefix = '/order';

export default controller;
