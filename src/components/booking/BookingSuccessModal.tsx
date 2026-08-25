// src/components/booking/BookingSuccessModal.tsx
"use client";

import React from "react";
import { CheckCircle2, Printer, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, Button, Badge } from "@/components/ui/pg-ui";
import type { Parcel } from "@/types";

interface Props {
  bookedParcel: Parcel;
  onBookAnother: () => void;
}

export default function BookingSuccessModal({ bookedParcel, onBookAnother }: Props) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />
      <Card className="relative z-10 w-full max-w-md p-6 text-center shadow-2xl space-y-4">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 size={32} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900 text-lg">Parcel Booked Successfully!</h2>
          <p className="text-xs text-slate-500 mt-1">
            Tracking ID generated and dispatched to {bookedParcel.courier} logistics.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Tracking ID:</span>
            <span className="font-mono font-bold text-indigo-600">{bookedParcel.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Recipient:</span>
            <span className="font-semibold text-slate-900">{bookedParcel.customer}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">COD Total:</span>
            <span className="font-bold text-slate-900">৳{bookedParcel.cod.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Courier Partner:</span>
            <Badge variant="indigo">{bookedParcel.courier}</Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button
            className="w-full justify-center"
            onClick={() => router.push(`/bulk-labels`)}
          >
            <Printer size={14} /> Print Shipping Label
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-center"
            onClick={onBookAnother}
          >
            Book Another Parcel <ArrowRight size={14} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
