import { Coupon } from '@server/models';

export default {
  Query: {
    coupon: (_, { name }) => Coupon.query().where('name', name)
  }
};
