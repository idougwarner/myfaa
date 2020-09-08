import { Coupon } from '@server/models';

export default {
  Query: {
    couponByCode: (_, { code }) => Coupon.query().where('code', code).first()
  }
};
