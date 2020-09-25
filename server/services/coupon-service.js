import { Coupon } from '@server/models';

export const applyCoupon = async (subTotal, couponId) => {
  if (!couponId) return subTotal;

  const coupon = await Coupon.query().findById(couponId);
  if (!coupon) return subTotal;

  let grandTotal = subTotal;

  if (coupon.discountPercent) {
    grandTotal = subTotal - (subTotal * coupon.discountPercent) / 100;
  }

  if (coupon.discountAmount) {
    grandTotal -= coupon.discountAmount;
  }

  return grandTotal;
};
