const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  // const { size } = req.query;
  const products = await service.find();
  console.log(products);
  res.json(products);
});

/**
 *
 Los endpoints especificos deben declararsen antes de los endpoints dinamicos.
 */
router.get('/filter', (req, res) => {
  res.send('yo soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
    // if (id === '999') {
    //   res.status(404).json({
    //     message: 'Not found',
    //   });
    // } else {
    //   res.status(200).json([
    //     {
    //       id,
    //       name: 'product 1',
    //       price: 1000,
    //     },
    //   ]);
    // }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
    // res.status(201).json({
    //   message: 'created',
    //   data: body,
    // });
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
      // res.status(404).json({
      //   message: error.message,
      // });
    }
    // res.json({
    //   message: 'update',
    //   data: body,
    //   id,
    // });
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
  // res.json({
  //   message: 'deleted',
  //   id,
  // });
});

module.exports = router;

/**
 *
 *
 Si quieren buscar la documentación de alguna librería de una manera mas fácil solo escribe
npm docs <nombre de la libreria>
Acá me abrió la doc de boom

npm docs boom
 */
