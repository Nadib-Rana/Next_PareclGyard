// src/app/(app)/bulk-upload/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/hooks/useData";
import BulkDropzone from "@/components/bulk-upload/BulkDropzone";
import BulkValidationTable, { type BulkRow } from "@/components/bulk-upload/BulkValidationTable";
import BulkEditModal from "@/components/bulk-upload/BulkEditModal";

const demoRows: BulkRow[] = [
  { id: 1, customer: "Sultan Mahmud", phone: "01711998877", address: "Dhanmondi 27, Dhaka", district: "Dhaka", cod: "2200", product: "Leather Jacket", courier: "Steadfast", risk: "Safe", status: "valid" },
  { id: 2, customer: "Rashedul Islam", phone: "01812001122", address: "GEC Circle, Chattogram", district: "Chattogram", cod: "1450", product: "Smart Sunglasses", courier: "Pathao", risk: "Safe", status: "valid" },
  { id: 3, customer: "Mitu Chowdhury", phone: "0191", address: "Shahjalal Uposhohor, Sylhet", district: "Sylhet", cod: "950", product: "Cosmetics Kit", courier: "RedX", risk: "Moderate", status: "error", errorMsg: "Invalid phone number format (must be 11 digits)" },
  { id: 4, customer: "Shahriar Kabir", phone: "01614332211", address: "", district: "Bogura", cod: "3100", product: "Running Shoes", courier: "Steadfast", risk: "High Risk", status: "error", errorMsg: "Full delivery address is missing" },
  { id: 5, customer: "Afroza Khanom", phone: "01515443322", address: "Rajshahi University Campus", district: "Rajshahi", cod: "1800", product: "Ladies Watch", courier: "Pathao", risk: "Safe", status: "valid" },
];

export default function BulkUploadPage() {
  const router = useRouter();
  const { bulkAddParcels, generateSampleCSV } = useData();

  const [dragging, setDragging] = useState(false);
  const [parsedRows, setParsedRows] = useState<BulkRow[]>([]);
  const [editingRow, setEditingRow] = useState<BulkRow | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleDropFile = (file: File) => {
    parseFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
  };

  const parseFile = (_file: File) => {
    setParsedRows(demoRows);
  };

  const handleLoadDemo = () => {
    setParsedRows(demoRows);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRow) return;

    const phoneValid = editingRow.phone.replace(/\D/g, "").length === 11;
    const addressValid = editingRow.address.trim().length > 3;
    const isValid = phoneValid && addressValid;

    const updated: BulkRow = {
      ...editingRow,
      status: isValid ? "valid" : "error",
      errorMsg: !phoneValid ? "Invalid phone format" : !addressValid ? "Missing address" : undefined,
    };

    setParsedRows(prev => prev.map(r => (r.id === updated.id ? updated : r)));
    setEditingRow(null);
  };

  const handleContinueBooking = () => {
    const validOnes = parsedRows.filter(r => r.status === "valid");
    if (validOnes.length === 0) return;

    setBookingSuccess(true);
    setTimeout(() => {
      const parcelsToCreate = validOnes.map(r => ({
        customer: r.customer,
        phone: r.phone,
        address: r.address,
        district: r.district,
        product: r.product,
        courier: r.courier,
        cod: Number(r.cod) || 0,
        charge: r.courier === "Steadfast" ? 110 : r.courier === "Pathao" ? 120 : 130,
        advance: 0,
        risk: r.risk,
        status: "Pending Pickup" as const,
        createdAt: new Date().toISOString(),
      }));

      bulkAddParcels(parcelsToCreate);
      router.push("/bulk-labels");
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Bulk CSV Order Upload</h1>
        <p className="text-sm text-slate-500 mt-0.5">Upload multiple customer orders at once via CSV/Excel and validate before booking.</p>
      </div>

      {parsedRows.length === 0 ? (
        <BulkDropzone
          dragging={dragging}
          setDragging={setDragging}
          onDropFile={handleDropFile}
          onFileInput={handleFileInput}
          onSampleDownload={generateSampleCSV}
          onLoadDemo={handleLoadDemo}
        />
      ) : (
        <BulkValidationTable
          rows={parsedRows}
          bookingSuccess={bookingSuccess}
          onReupload={() => setParsedRows([])}
          onContinueBooking={handleContinueBooking}
          onEditRow={setEditingRow}
        />
      )}

      {editingRow && (
        <BulkEditModal
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
}
