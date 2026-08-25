// src/lib/csv.ts
import type { Parcel, Settlement } from "../types";

export function exportParcelsToCSV(parcels: Parcel[], filenamePrefix = "parcelguard_export") {
  const headers = [
    "Tracking ID",
    "Customer Name",
    "Phone",
    "Full Address",
    "District",
    "Product",
    "Courier",
    "COD (BDT)",
    "Charge (BDT)",
    "Risk",
    "Status",
    "Date",
  ];

  const rows = parcels.map(p => [
    p.id,
    `"${p.customer.replace(/"/g, '""')}"`,
    p.phone,
    `"${p.address.replace(/"/g, '""')}"`,
    p.district,
    `"${p.product.replace(/"/g, '""')}"`,
    p.courier,
    p.cod,
    p.charge,
    p.risk,
    p.status,
    p.date,
  ]);

  downloadCSV([headers.join(","), ...rows.map(e => e.join(","))].join("\n"), `${filenamePrefix}_${new Date().toISOString().slice(0, 10)}.csv`);
}

export function exportSettlementsToCSV(settlements: Settlement[]) {
  const headers = ["Settlement ID", "Courier", "Period", "Expected (BDT)", "Received (BDT)", "Difference (BDT)", "Status", "Parcels Count"];
  const rows = settlements.map(s => [
    s.id,
    s.courier,
    `"${s.period}"`,
    s.expected,
    s.received,
    s.diff,
    s.status,
    s.parcelsCount,
  ]);

  downloadCSV([headers.join(","), ...rows.map(e => e.join(","))].join("\n"), `parcelguard_settlements_${new Date().toISOString().slice(0, 10)}.csv`);
}

export function downloadSampleOrdersCSV() {
  const sampleHeaders = ["Customer Name", "Phone Number", "Full Address", "District", "COD Amount", "Product Name", "Weight", "Courier Preference", "Special Notes"];
  const sampleRows = [
    ["Rahim Uddin", "01711234567", "House 14, Road 5, Mirpur-10", "Dhaka", "1250", "Cotton Shirt", "500g", "Steadfast", "Call before delivery"],
    ["Nasrin Akter", "01913456789", "Zindabazar Point", "Sylhet", "850", "Silk Scarf", "250g", "RedX", "Deliver during business hours"],
    ["Farhan Hossain", "01614567890", "Station Road, Bogura Sadar", "Bogura", "3200", "Leather Shoes", "1kg", "Pathao", "Fragile item handle with care"],
    ["Sadia Islam", "01515678901", "GEC Circle, Nasirabad", "Chattogram", "1800", "Skincare Box", "500g", "Steadfast", "Call recipient"],
  ];

  const csvContent = [sampleHeaders.join(","), ...sampleRows.map(r => r.map(x => `"${x}"`).join(","))].join("\n");
  downloadCSV(csvContent, "parcelguard_sample_orders.csv");
}

function downloadCSV(content: string, filename: string) {
  if (typeof window === "undefined") return;
  const csvContent = "data:text/csv;charset=utf-8," + content;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
