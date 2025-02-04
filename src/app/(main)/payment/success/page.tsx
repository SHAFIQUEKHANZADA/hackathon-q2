"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { Address, Rate } from "../../../../components/types";
import { cartProductsWhichCanBeShipped } from "../../../../components/data";
import PreFooter from "@/components/PreFooter";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const PaymentSuccess = () => {
  const router = useRouter();
  
  const [shipeToAddress, setshipeToAddress] = useState<Address>({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    cityLocality: "",
    stateProvince: "",
    postalCode: "",
    countryCode: "",
    addressResidentialIndicator: "no",
  });

  const [rates, setRates] = useState<Rate[]>([]);
  const [rateId, setRateId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Fetch shipping rates based on the entered address and package details.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setRates([]);

    try {
      const response = await axios.post("/api/shipping/get-rates", {
        shipeToAddress,
        packages: cartProductsWhichCanBeShipped.map((product) => ({
          weight: product.weight,
          dimensions: product.dimensions,
        })),
      });
      setRates(response.data.shipmentDetails.rateResponse.rates);
    } catch (error) {
      console.log(error)
      setErrors(["An error occurred while fetching rates."]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLabel = async () => {
    if (!rateId) {
      alert("Please select a rate to create a label.");
      return;
    }
    setLoading(true);
    setErrors([]);
    try {
      const response = await axios.post("/api/shipping/label", { rateId });
      const labelData = response.data;
      router.push(
        `/order-confirmation?labelPdf=${encodeURIComponent(labelData.labelDownload.href)}&trackingNumber=${encodeURIComponent(labelData.trackingNumber)}&labelId=${encodeURIComponent(labelData.labelId)}&carrierCode=${encodeURIComponent(labelData.carrierCode)}`
      );
    } catch (error) {
      console.log(error)
      setErrors(["An error occurred while generating the label."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${poppins.className} min-h-screen`}>
      {/* Main Banner */}
      <div className="relative">
        <div className="w-full">
          <Image
            src="/images/bgmain.png"
            alt="Main Banner"
            width={1920}
            height={1080}
            className="w-full h-[150px] md:h-auto object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={22}
            className="w-[48px] h-[30px]"
          />
          <h1 className="md:text-[48px] text-[38px] font-medium">
            Payment Status
          </h1>
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="text-[16px] font-bold">Home</span>
            </Link>
            <Image src="/images/grater.png" alt="Separator" width={8} height={8} />
            <span className="text-[16px] font-light">Payment Successful</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 py-8 px-4 sm:px-6 lg:px-8">
        {/* Payment Success Message & Shipping Address Prompt */}
        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-lg text-gray-700">
            Please provide your shipping details below to deliver your order.
          </p>
        </div>

        {/* Shipping Details Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-md text-gray-600 mb-4">
              Enter your complete shipping address.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={shipeToAddress.name}
                onChange={(e) => setshipeToAddress({ ...shipeToAddress, name: e.target.value })}
                className="w-full border border-gray-400 rounded-[10px] p-3"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={shipeToAddress.phone}
                onChange={(e) => setshipeToAddress({ ...shipeToAddress, phone: e.target.value })}
                className="w-full border border-gray-400 rounded-[10px] p-3"
                required
              />
              <input
                type="text"
                placeholder="Address Line 1"
                value={shipeToAddress.addressLine1}
                onChange={(e) => setshipeToAddress({ ...shipeToAddress, addressLine1: e.target.value })}
                className="w-full border border-gray-400 rounded-[10px] p-3"
                required
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={shipeToAddress.addressLine2}
                onChange={(e) => setshipeToAddress({ ...shipeToAddress, addressLine2: e.target.value })}
                className="w-full border border-gray-400 rounded-[10px] p-3"
              />
              <input
                type="text"
                placeholder="City"
                value={shipeToAddress.cityLocality}
                onChange={(e) => setshipeToAddress({ ...shipeToAddress, cityLocality: e.target.value })}
                className="w-full border border-gray-400 rounded-[10px] p-3"
                required
              />
              <input
                type="text"
                placeholder="State/Province"
                value={shipeToAddress.stateProvince}
                onChange={(e) => setshipeToAddress({ ...shipeToAddress, stateProvince: e.target.value })}
                className="w-full border border-gray-400 rounded-[10px] p-3"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={shipeToAddress.postalCode}
                onChange={(e) => setshipeToAddress({ ...shipeToAddress, postalCode: e.target.value })}
                className="w-full border border-gray-400 rounded-[10px] p-3"
                required
              />
              <input
                type="text"
                placeholder="Country Code (e.g., US)"
                value={shipeToAddress.countryCode}
                onChange={(e) => setshipeToAddress({ ...shipeToAddress, countryCode: e.target.value })}
                className="w-full border border-gray-400 rounded-[10px] p-3"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-[#B88E2F] text-white rounded-md  disabled:bg-gray-400"
            >
              {loading ? "Calculating Rates..." : "Get Shipping Rates"}
            </button>
          </form>
        </div>

        {/* Display Shipping Rates */}
        {rates.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Available Shipping Rates
            </h2>
            <div className="flex flex-wrap gap-4">
              {rates.map((rate) => (
                <div
                  key={rate.rateId}
                  className={`p-4 border duration-200 transition-transform transform hover:scale-105 cursor-pointer ${
                    rateId === rate.rateId
                      ? "border-transparent bg-[#B88E2F] text-white"
                      : "border-[#B88E2F]"
                  }`}
                  onClick={() => setRateId(rate.rateId)}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shippingRate"
                      checked={rateId === rate.rateId}
                      onChange={() => setRateId(rate.rateId)}
                      className="form-radio h-4 w-4 text-blue-500"
                    />
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        <strong>Carrier:</strong> {rate.carrierFriendlyName}
                      </p>
                      <p className="text-gray-600">
                        <strong>Service:</strong> {rate.serviceType}
                      </p>
                      <p className="text-gray-800 font-semibold">
                        <strong>Cost:</strong> {rate.shippingAmount.amount}{" "}
                        {rate.shippingAmount.currency}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generate Label Button */}
        {rateId && (
          <div className="mb-8">
            <button
              onClick={handleGenerateLabel}
              disabled={loading}
              className="w-full px-4 py-2 bg-[#B88E2F] text-white border border-transparent hover:border-[#B88E2F] duration-200 hover:bg-transparent hover:text-[#B88E2F] disabled:bg-gray-400"
            >
              {loading ? "Order Confirm..." : "Confirm Order"}
            </button>
          </div>
        )}

        {/* Display Errors */}
        {errors.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Errors</h2>
            <div className="space-y-2">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <PreFooter />
    </div>
  );
};

export default PaymentSuccess;
