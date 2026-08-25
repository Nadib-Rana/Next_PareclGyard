// src/app/admin/couriers/page.tsx
"use client";

import React, { useState } from "react";
import { Activity, RefreshCw, Zap, Key, CheckCircle2, AlertCircle, X, Plus, Trash2, Globe } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { CourierHealthMetric } from "@/types/admin";

export default function AdminCouriersPage() {
  const { couriers, toggleCourierStatus, updateMasterCredentials, testCourierConnection, addCourierGateway, deleteCourierGateway } = useAdmin();
  
  // Modals state
  const [selectedCourier, setSelectedCourier] = useState<CourierHealthMetric | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isActive, setIsActive] = useState(true);
  
  // Add new courier modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLogo, setNewLogo] = useState("");
  const [newColor, setNewColor] = useState("bg-indigo-600");
  const [newApiUrl, setNewApiUrl] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const [newSecretKey, setNewSecretKey] = useState("");

  const [testing, setTesting] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ provider: string; success: boolean; message: string } | null>(null);

  const openConfigModal = (c: CourierHealthMetric) => {
    setSelectedCourier(c);
    setApiKey(c.apiKey || "");
    setSecretKey(c.secretKey || "");
    setIsActive(c.isActive ?? true);
  };

  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourier) return;
    await updateMasterCredentials(selectedCourier.name, apiKey, secretKey, isActive);
    setSelectedCourier(null);
  };

  const handleCreateNewCourier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    await addCourierGateway({
      name: newName.trim(),
      logo: newLogo.trim() || newName.trim().slice(0, 2).toUpperCase(),
      color: newColor,
      apiUrl: newApiUrl.trim() || undefined,
      apiKey: newApiKey.trim() || undefined,
      secretKey: newSecretKey.trim() || undefined,
      isActive: true,
    });
    setShowAddModal(false);
    setNewName("");
    setNewLogo("");
    setNewApiUrl("");
    setNewApiKey("");
    setNewSecretKey("");
  };

  const handleDeleteCourier = async (provider: string) => {
    if (confirm(`Are you sure you want to remove the ${provider} gateway?`)) {
      await deleteCourierGateway(provider);
    }
  };

  const handleTestConnection = async (name: string) => {
    setTesting(name);
    setTestResult(null);
    try {
      const res = await testCourierConnection(name);
      setTestResult({ provider: name, success: res.success, message: res.message });
    } catch {
      setTestResult({ provider: name, success: false, message: "Connection check failed" });
    } finally {
      setTesting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="text-amber-400" size={22} /> Master Courier API Gateways & Health
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure platform-wide Master API keys, add custom gateways, and monitor real-time latency.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus size={15} /> Add New Courier Gateway
        </button>
      </div>

      {/* Global Status Banner */}
      {testResult && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
            testResult.success
              ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
              : "bg-rose-950/60 border-rose-800 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {testResult.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-xs font-semibold">{testResult.message}</span>
          </div>
          <button
            onClick={() => setTestResult(null)}
            className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Courier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {couriers.map((c) => (
          <div
            key={c.name}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-sm relative group"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${
                      c.color ||
                      (c.name === "Steadfast"
                        ? "bg-emerald-600"
                        : c.name === "Pathao"
                        ? "bg-indigo-600"
                        : c.name === "RedX"
                        ? "bg-rose-600"
                        : c.name === "Paperfly"
                        ? "bg-amber-600"
                        : c.name === "ParcelDex"
                        ? "bg-blue-600"
                        : "bg-purple-600")
                    } text-white flex items-center justify-center font-bold text-xs shadow-xs`}
                  >
                    {c.logo || c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-white text-base">{c.name} Gateway</h2>
                      {c.isCustom && (
                        <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded border border-indigo-500/30">
                          Custom
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          c.isConfigured || c.apiKey
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {c.isConfigured || c.apiKey ? "Master Key Active" : "No Master Key"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      c.status === "Operational"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : c.status === "Degraded"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        : "bg-red-500/10 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {c.status}
                  </span>
                  {c.isCustom && (
                    <button
                      onClick={() => handleDeleteCourier(c.name)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                      title="Delete custom gateway"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-slate-500 block">Gateway Uptime:</span>
                  <span className="font-mono font-bold text-slate-200">{c.uptime}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-slate-500 block">Live Latency:</span>
                  <span className="font-mono font-bold text-emerald-400">{c.latencyMs} ms</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-slate-500 block">Error Rate:</span>
                  <span className="font-mono font-bold text-slate-200">{c.errorRate}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-slate-500 block">Daily API Calls:</span>
                  <span className="font-mono font-bold text-slate-200">{c.dailyRequests.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-3">
                <span className="text-slate-500">Last Incident:</span> {c.lastIncident}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openConfigModal(c)}
                  className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Key size={13} /> Configure Master API
                </button>
                <button
                  onClick={() => handleTestConnection(c.name)}
                  disabled={testing === c.name}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Activity size={13} className={testing === c.name ? "animate-spin text-amber-400" : ""} />
                  {testing === c.name ? "Pinging..." : "Test"}
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 text-[11px]">Simulate Status:</span>
                <button
                  onClick={() => toggleCourierStatus(c.name)}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded font-medium text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RefreshCw size={11} /> Cycle State
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Courier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  <Plus size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Add New Courier Gateway</h3>
                  <p className="text-xs text-slate-400">Connect custom Bangladeshi courier API provider</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateNewCourier} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Courier Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. eCourier, SA Paribahan, Sundarban"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Logo Text (2 Letters)</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={newLogo}
                    onChange={(e) => setNewLogo(e.target.value.toUpperCase())}
                    placeholder="EC"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Color</label>
                  <select
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="bg-cyan-600">Cyan</option>
                    <option value="bg-teal-600">Teal</option>
                    <option value="bg-purple-600">Purple</option>
                    <option value="bg-rose-600">Rose</option>
                    <option value="bg-amber-600">Amber</option>
                    <option value="bg-blue-600">Blue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">API Base URL (Optional)</label>
                <input
                  type="text"
                  value={newApiUrl}
                  onChange={(e) => setNewApiUrl(e.target.value)}
                  placeholder="https://api.courier.com.bd/v1"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Master API Key / Token</label>
                <input
                  type="text"
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  placeholder="Enter API Key"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Secret Key (if required)</label>
                <input
                  type="password"
                  value={newSecretKey}
                  onChange={(e) => setNewSecretKey(e.target.value)}
                  placeholder="Enter Secret Key"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Create Gateway
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Master API Credentials Edit Modal */}
      {selectedCourier && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  <Key size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Configure {selectedCourier.name} Master API</h3>
                  <p className="text-xs text-slate-400">Platform-wide credentials for all tenant fraud checks</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCourier(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCredentials} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {selectedCourier.name} API Key / Client ID
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={`Enter ${selectedCourier.name} API Key`}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Secret Key / Secret Token (if required)
                </label>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter Secret Key"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <div>
                  <p className="text-xs font-bold text-slate-200">Enable Master Gateway Fallback</p>
                  <p className="text-[11px] text-slate-500">Allow platform merchants without keys to use this gateway</p>
                </div>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCourier(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Save Master Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
