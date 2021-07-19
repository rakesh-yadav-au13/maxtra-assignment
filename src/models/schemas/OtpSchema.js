import mongoose from "mongoose";

const OtpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    otpcode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamp: true }
);

export default mongoose.model("otp", OtpSchema);
