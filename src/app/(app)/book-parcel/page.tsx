// src/app/(app)/book-parcel/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useData } from "@/hooks/useData";
import BookingStepsHeader from "@/components/booking/BookingStepsHeader";
import CustomerStep from "@/components/booking/CustomerStep";
import ParcelStep from "@/components/booking/ParcelStep";
import CourierStep from "@/components/booking/CourierStep";
import ReviewStep from "@/components/booking/ReviewStep";
import BookingSuccessModal from "@/components/booking/BookingSuccessModal";
import type { Parcel, FraudCheckResult } from "@/types";

const districts = [
  "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur",
  "Mymensingh", "Bogura", "Cumilla", "Gazipur", "Narayanganj", "Jashore", "Cox's Bazar",
];

function BookParcelForm() {
  const searchParams = useSearchParams();
  const phoneParam = searchParams.get("phone");

  const { addParcel, checkPhoneRisk } = useData();

  const [step, setStep] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState(phoneParam || "");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [productName, setProductName] = useState("");
  const [weight, setWeight] = useState("500g");
  const [codAmount, setCodAmount] = useState("");
  const [advanceFee, setAdvanceFee] = useState("0");
  const [specialNotes, setSpecialNotes] = useState("");
  const [selectedCourier, setSelectedCourier] = useState<Parcel["courier"]>("Steadfast");
  const [fraudResult, setFraudResult] = useState<FraudCheckResult | null>(null);
  const [checkingRisk, setCheckingRisk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedParcel, setBookedParcel] = useState<Parcel | null>(null);

  useEffect(() => {
    if (phone.length >= 11) {
      setCheckingRisk(true);
      const timer = setTimeout(() => {
        const res = checkPhoneRisk(phone, customerName);
        setFraudResult(res);
        setCheckingRisk(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phone, customerName, checkPhoneRisk]);

  const handleConfirmBooking = () => {
    setLoading(true);
    setTimeout(() => {
      const charge = selectedCourier === "Steadfast" ? 110 : selectedCourier === "Pathao" ? 120 : selectedCourier === "RedX" ? 130 : 115;
      const created = addParcel({
        customer: customerName,
        phone,
        address,
        district,
        product: productName,
        weight,
        courier: selectedCourier,
        cod: Number(codAmount) || 0,
        charge,
        advance: Number(advanceFee) || 0,
        risk: fraudResult ? fraudResult.risk : "Safe",
        status: "Pending Pickup",
        createdAt: new Date().toISOString(),
        notes: specialNotes,
      });

      setLoading(false);
      setBookedParcel(created);
    }, 800);
  };

  const handleReset = () => {
    setBookedParcel(null);
    setStep(1);
    setCustomerName("");
    setPhone("");
    setAddress("");
    setProductName("");
    setCodAmount("");
    setAdvanceFee("0");
    setSpecialNotes("");
    setFraudResult(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Book Single Parcel</h1>
        <p className="text-sm text-slate-500 mt-0.5">Generate shipping label and dispatch orders with instant rate comparison.</p>
      </div>

      <BookingStepsHeader currentStep={step} onStepClick={setStep} />

      {step === 1 && (
        <CustomerStep
          customerName={customerName} setCustomerName={setCustomerName}
          phone={phone} setPhone={setPhone}
          address={address} setAddress={setAddress}
          district={district} setDistrict={setDistrict}
          districts={districts}
          fraudResult={fraudResult}
          checkingRisk={checkingRisk}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <ParcelStep
          productName={productName} setProductName={setProductName}
          weight={weight} setWeight={setWeight}
          codAmount={codAmount} setCodAmount={setCodAmount}
          advanceFee={advanceFee} setAdvanceFee={setAdvanceFee}
          specialNotes={specialNotes} setSpecialNotes={setSpecialNotes}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <CourierStep
          selectedCourier={selectedCourier}
          setSelectedCourier={setSelectedCourier}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <ReviewStep
          customerName={customerName} phone={phone} address={address} district={district}
          productName={productName} weight={weight} codAmount={codAmount} advanceFee={advanceFee}
          selectedCourier={selectedCourier} fraudResult={fraudResult} loading={loading}
          onBack={() => setStep(3)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {bookedParcel && (
        <BookingSuccessModal
          bookedParcel={bookedParcel}
          onBookAnother={handleReset}
        />
      )}
    </div>
  );
}

export default function BookParcelPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading booking form...</div>}>
      <BookParcelForm />
    </Suspense>
  );
}
