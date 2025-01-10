import mongoose, { Types } from "mongoose";

const coinSchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: true,
    },
    price: {
      type: Types.Decimal128,
      required: true,
    },
    marketCap: {
      type: Types.Decimal128,
      required: true,
    },
    dayChange: {
      type: Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

coinSchema.methods.toPlainObject = function () {
  return {
    _id: this?._id,
    coinId: this?.coinId,
    price: parseFloat(this?.price?.toString()),
    marketCap: this?.marketCap && parseFloat(this?.marketCap?.toString()),
    dayChange: this?.dayChange && parseFloat(this?.dayChange?.toString()),
    createdAt: this?.createdAt,
    updatedAt: this?.updatedAt,
  };
};

const Coin = mongoose.model("Coin", coinSchema);

export default Coin;
