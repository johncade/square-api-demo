import { Router } from 'express';
import enableWs from '@small-tech/express-ws';

import { INDEX_NAME } from '~/env';

import customer from '~/customer';
import order from '~/order';
import invoice from '~/invoice';

const router = Router();
enableWs(router);

router.get('/', (req, res) => {
  res.send(`app-root, ${INDEX_NAME} mode`);
});

router.use(customer.prefix, customer);
router.use(order.prefix, order);
router.use(invoice.prefix, invoice);

export default router;
