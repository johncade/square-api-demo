import { Router } from 'express';

import { listCustomers, createCustomer } from './service';

const controller = (() => {
  const router = Router();

  /**
   * POST /customer { data?: Customer }
   * @example http POST :3000/customer
   */
  router.post('/', async (req, res) => {
    const payload = req.body;
    const response = await createCustomer(payload);
    res.json(response);
  });

  /**
   * GET /customer { data?: any }
   * @example http GET :3000/customer
   */
  router.get('/', async (req, res) => {
    const response = await listCustomers();
    res.json(response);
  });

  return router;
})();

controller.prefix = '/customer';

export default controller;
