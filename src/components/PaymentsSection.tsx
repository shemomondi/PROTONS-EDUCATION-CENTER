import React, { useState } from "react";
import { CreditCard, Landmark, Check, HelpCircle, ArrowRight, Settings, Sparkles, AlertCircle, FileText, CheckCircle, Calculator, RefreshCw } from "lucide-react";
import { TuitionPackage, PaymentTransaction, Course } from "../types";

interface PaymentsProps {
  packages: TuitionPackage[];
  courses: Course[];
  selectedCourseForEstimate?: string | null;
}

export default function PaymentsSection({ packages, courses, selectedCourseForEstimate }: PaymentsProps) {
  // Live states mimicking database configuration that users can Edit on the fly
  const [activePackages, setActivePackages] = useState<TuitionPackage[]>(packages);
  const [bankAccountDetails, setBankAccountDetails] = useState({
    bankName: "Maybank Islamic Bhd",
    accountNumber: "5140-1200-8839",
    accountHolder: "PROTONS ACADEMY SDN BHD",
    whatsappReference: "0114605536",
  });
  const [paymentMethods, setPaymentMethods] = useState([
    "Instant Bank Transfer (FPX)",
    "DuitNow QR QR code",
    "Boost / Touch 'n Go eWallet",
    "WhatsApp Fast Checkout",
  ]);

  // Admin edit panel states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editPriceBasic, setEditPriceBasic] = useState("95");
  const [editPricePro, setEditPricePro] = useState("180");
  const [editPriceUltimate, setEditPriceUltimate] = useState("495");
  const [editBankName, setEditBankName] = useState(bankAccountDetails.bankName);
  const [editAccNo, setEditAccNo] = useState(bankAccountDetails.accountNumber);
  const [editAccHolder, setEditAccHolder] = useState(bankAccountDetails.accountHolder);
  const [newMethodInput, setNewMethodInput] = useState("");

  // Interactive Fee Calculator States
  const [calcGrade, setCalcGrade] = useState("Secondary Upper (Form 4 - 5)");
  const [calcSubjectCount, setCalcSubjectCount] = useState(2);
  const [calcIncludeAIPremium, setCalcIncludeAIPremium] = useState(true);
  const [calcWorksheetBox, setCalcWorksheetBox] = useState(false);

  // Student Checkout form states
  const [checkoutStudentName, setCheckoutStudentName] = useState("");
  const [checkoutSelectedPkg, setCheckoutSelectedPkg] = useState("Protons Accelerated Duo");
  const [checkoutMethod, setCheckoutMethod] = useState("Instant Bank Transfer (FPX)");
  const [checkoutMonth, setCheckoutMonth] = useState("June 2026");
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<PaymentTransaction | null>(null);

  // Transaction Ledger Log
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      id: "tx-mock-1",
      studentName: "Sharifa Momondi",
      purpose: "Protons Accelerated Duo - May Intake",
      amount: 180,
      method: "Instant Bank Transfer (FPX)",
      status: "Successful",
      date: "02 May 2026",
      referenceId: "TX-PRTN-9981",
    },
  ]);

  // Compute live local updates
  const handleSaveAdminRates = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = activePackages.map((pkg) => {
      if (pkg.id === "pkg-basic") {
        return { ...pkg, price: parseFloat(editPriceBasic) || 0 };
      }
      if (pkg.id === "pkg-pro") {
        return { ...pkg, price: parseFloat(editPricePro) || 0 };
      }
      if (pkg.id === "pkg-ultimate") {
        return { ...pkg, price: parseFloat(editPriceUltimate) || 0 };
      }
      return pkg;
    });

    setActivePackages(updated);
    setBankAccountDetails({
      bankName: editBankName,
      accountNumber: editAccNo,
      accountHolder: editAccHolder,
      whatsappReference: bankAccountDetails.whatsappReference,
    });
    setIsAdminMode(false);
  };

  const handleAddPaymentMethod = () => {
    if (newMethodInput.trim() && !paymentMethods.includes(newMethodInput.trim())) {
      setPaymentMethods([...paymentMethods, newMethodInput.trim()]);
      setNewMethodInput("");
    }
  };

  const handleRemovePaymentMethod = (index: number) => {
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
  };

  // Live Pricing Dynamic calculation
  const getSubjectRate = () => {
    if (calcGrade.includes("Primary")) return 80;
    if (calcGrade.includes("Lower")) return 90;
    if (calcGrade.includes("Upper")) return 110;
    return 130; // Pre-U
  };

  const computeEstimatorTotal = () => {
    const ratePerSubject = getSubjectRate();
    let totalBase = ratePerSubject * calcSubjectCount;

    // Apply bundle discount if more than 2 subjects are chosen
    if (calcSubjectCount >= 3) {
      totalBase = totalBase * 0.85; // 15% discount for package bundling
    }

    if (calcIncludeAIPremium) totalBase += 15; // premium AI modules addition
    if (calcWorksheetBox) totalBase += 35; // printed booklets ship fee

    return Math.round(totalBase);
  };

  // Checkout submission
  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutStudentName.trim()) {
      alert("Please specify a valid student name.");
      return;
    }

    setIsProcessing(true);
    setReceipt(null);

    const priceMatch = activePackages.find((p) => p.title === checkoutSelectedPkg)?.price || computeEstimatorTotal();

    setTimeout(() => {
      const txId = `TX-${Math.floor(Math.random() * 900000) + 100000}`;
      const newTx: PaymentTransaction = {
        id: txId,
        studentName: checkoutStudentName,
        purpose: `${checkoutSelectedPkg} Tuition Fees - ${checkoutMonth}`,
        amount: priceMatch,
        method: checkoutMethod,
        status: "Successful",
        date: "Today (03 June 2026)",
        referenceId: txId,
      };

      setTransactions([newTx, ...transactions]);
      setReceipt(newTx);
      setIsProcessing(false);
      setCheckoutStudentName("");
    }, 2000);
  };

  return (
    <div className="space-y-12 animate-fade-in p-1">
      {/* SECTION BANNER HERO */}
      <section className="bg-brand-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-brand-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-brand-500/20 text-brand-200 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            <Landmark className="w-4 h-4 text-emerald-400" />
            <span>Secured Tuition payment channels</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-display leading-tight">
            Plans, Estimates & Fee Settlements
          </h1>
          <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">
            Transparent pricing for parents and students. Use our dynamic fee calculator to construct customized courses plans, settle monthly packages, or adjust structures instantly via the admin desk below.
          </p>
        </div>

        {/* Toggle Admin editing panel */}
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`px-4 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-2 shrink-0 ${
            isAdminMode ? "ring-2 ring-brand-500 bg-brand-500/20" : ""
          }`}
        >
          <Settings className={`w-4 h-4 text-brand-200 ${isAdminMode ? "animate-spin" : ""}`} />
          <span>{isAdminMode ? "Exit rates editing mode" : "Enter Admin rates adjustment Panel"}</span>
        </button>
      </section>

      {/* ================= EDIT RATES / PANELS DESK (ONLY IF TRIGGERED BY SWITCH) ================= */}
      {isAdminMode && (
        <section className="bg-amber-50/70 border border-amber-200/50 p-6 rounded-3xl animate-slide-down space-y-6">
          <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
            <Settings className="w-5 h-5 text-amber-700" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-display">Administrative rate adjuster board</h3>
              <p className="text-[10px] text-amber-700 font-medium">As Principal, configure displaying pricing rates, methods, and bank details instantly.</p>
            </div>
          </div>

          <form onSubmit={handleSaveAdminRates} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
            {/* Packages pricing edits */}
            <div className="bg-white p-5 rounded-xl border border-amber-250/40 space-y-3">
              <h4 className="font-bold text-slate-900 border-b pb-1">Tuition Plans pricing:</h4>

              <div className="space-y-2">
                <label className="block font-medium">Basic Starter Package Fee (RM):</label>
                <input
                  type="number"
                  value={editPriceBasic}
                  onChange={(e) => setEditPriceBasic(e.target.value)}
                  className="w-full bg-slate-50 border p-2 rounded"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Accelerated Pro Package Fee (RM):</label>
                <input
                  type="number"
                  value={editPricePro}
                  onChange={(e) => setEditPricePro(e.target.value)}
                  className="w-full bg-slate-50 border p-2 rounded"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Ultimate STEM Package Fee (RM):</label>
                <input
                  type="number"
                  value={editPriceUltimate}
                  onChange={(e) => setEditPriceUltimate(e.target.value)}
                  className="w-full bg-slate-50 border p-2 rounded"
                />
              </div>
            </div>

            {/* Bank detail edits */}
            <div className="bg-white p-5 rounded-xl border border-amber-250/40 space-y-3">
              <h4 className="font-bold text-slate-900 border-b pb-1">Deposit accounts Details:</h4>

              <div className="space-y-2">
                <label className="block font-medium">Official Bank Institution Name:</label>
                <input
                  type="text"
                  value={editBankName}
                  onChange={(e) => setEditBankName(e.target.value)}
                  className="w-full bg-slate-50 border p-2 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Official Account Number:</label>
                <input
                  type="text"
                  value={editAccNo}
                  onChange={(e) => setEditAccNo(e.target.value)}
                  className="w-full bg-slate-50 border p-2 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Beneficiary Corporate Holder:</label>
                <input
                  type="text"
                  value={editAccHolder}
                  onChange={(e) => setEditAccHolder(e.target.value)}
                  className="w-full bg-slate-50 border p-2 rounded-lg"
                />
              </div>
            </div>

            {/* Acceptable channels edits */}
            <div className="bg-white p-5 rounded-xl border border-amber-250/40 space-y-3">
              <h4 className="font-bold text-slate-900 border-b pb-1">Acceptable payment methods:</h4>

              <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                {paymentMethods.map((met, idx) => (
                  <div key={idx} className="flex justify-between items-center p-1.5 bg-slate-50 rounded text-[11px]">
                    <span className="truncate">{met}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePaymentMethod(idx)}
                      className="text-rose-600 hover:text-rose-800 font-bold ml-1.5"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="e.g. PayPal Settlement"
                  value={newMethodInput}
                  onChange={(e) => setNewMethodInput(e.target.value)}
                  className="flex-1 bg-slate-50 border px-2 py-1.5 rounded-lg text-[11px]"
                />
                <button
                  type="button"
                  onClick={handleAddPaymentMethod}
                  className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[10px]"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 text-right">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-all font-display shadow-xs"
              >
                Save rates and update board
              </button>
            </div>
          </form>
        </section>
      )}

      {/* 2. TUITION PACKAGES AND OFFERS DISPLAYS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {activePackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-2xl border p-6 flex flex-col justify-between space-y-6 relative hover:scale-[1.01] transition-transform ${
              pkg.isPopular ? "border-brand-500 shadow-md ring-1 ring-brand-500/20" : "border-slate-100 shadow-xs"
            }`}
          >
            {pkg.isPopular && (
              <span className="absolute top-0 right-6 -translate-y-1/2 bg-brand-600 text-white px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-brand-200" />
                <span>Most Selected Plan</span>
              </span>
            )}

            <div className="space-y-4">
              <div className="space-y-1 border-b border-slate-50 pb-4">
                <h3 className="font-extrabold text-slate-900 font-display text-lg leading-tight">{pkg.title}</h3>
                <p className="text-slate-400 text-xs font-light">{pkg.subtitle}</p>
              </div>

              <div className="flex items-baseline gap-1 pt-1.5">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">RM {pkg.price}</span>
                <span className="text-slate-400 text-xs text-medium">/{pkg.frequency.toLowerCase()}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-3">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <Check className="w-4.5 h-4.5 text-brand-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                setCheckoutSelectedPkg(pkg.title);
                const firstInput = document.getElementById("checkout-name-box");
                firstInput?.scrollIntoView({ behavior: "smooth" });
                firstInput?.focus();
              }}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                pkg.isPopular
                  ? "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-250/60"
              }`}
            >
              Select {pkg.title}
            </button>
          </div>
        ))}
      </section>

      {/* 3. DUAL SECTION FORM: ESTIMATOR AND CHECKOUT PORTAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Estimator Portal (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-150 p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-150 pb-2.5">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="font-bold text-slate-800 text-base font-display">Direct Fee Estimates Calculator</h3>
                <p className="text-[10px] text-slate-400">Estimate custom quotes based on course configurations.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-600">Educational Grade level:</label>
                <select
                  value={calcGrade}
                  onChange={(e) => setCalcGrade(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-700"
                >
                  <option value="Primary Lower (Form 1 - 3)">Primary (RM 80/subj)</option>
                  <option value="Secondary Lower (Form 1 - 3)">Secondary Lower Form 1-3 (RM 90/subj)</option>
                  <option value="Secondary Upper (Form 4 - 5)">Secondary Upper Form 4-5 (RM 110/subj)</option>
                  <option value="Pre-University">Pre-University / A-Level (RM 130/subj)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-600 flex justify-between pr-1">
                  <span>Number of core subjects to bundle:</span>
                  <span className="text-[10px] text-brand-600">&bull; 15% Bundle discount applied for 3+ subjects</span>
                </label>
                <select
                  value={calcSubjectCount}
                  onChange={(e) => setCalcSubjectCount(parseInt(e.target.value))}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-700"
                >
                  <option value="1">1 Subject (Mathematics or Science)</option>
                  <option value="2">2 Subjects Accelerated</option>
                  <option value="3">3 Subjects Complete Package</option>
                  <option value="4">4 Subjects Elite STEM Package</option>
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/50">
                <label className="flex gap-2.5 items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={calcIncludeAIPremium}
                    onChange={() => setCalcIncludeAIPremium(!calcIncludeAIPremium)}
                    className="accent-brand-600 w-4 h-4 cursor-pointer"
                  />
                  <span>Include Protons Premium AI Homework Help (RM 15/mo)</span>
                </label>

                <label className="flex gap-2.5 items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={calcWorksheetBox}
                    onChange={() => setCalcWorksheetBox(!calcWorksheetBox)}
                    className="accent-brand-600 w-4 h-4 cursor-pointer"
                  />
                  <span>Ship physically bound worksheets booklets (RM 35 dispatch)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/60 mt-4 text-center bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimated Tuition Rate Quote:</span>
            <span className="text-2xl font-extrabold text-brand-700 font-mono mt-1">RM {computeEstimatorTotal()} / month</span>
            <p className="text-[10px] text-slate-400 pt-1">All quotes are transparent and subjected to admin adjustments based on school sessions.</p>

            <button
              onClick={() => {
                setCheckoutSelectedPkg(`Estimated Custom (${calcGrade})`);
                const keyIn = document.getElementById("checkout-name-box");
                keyIn?.focus();
              }}
              className="mt-3 px-3.5 py-1.5 bg-brand-50 text-brand-700 border border-brand-100 rounded-lg text-[10px] font-bold hover:bg-brand-100 transition-colors"
            >
              Apply Estimate to Checkout form below
            </button>
          </div>
        </div>

        {/* Checkout Form (6 Cols) */}
        <div id="checkout-form-block" className="lg:col-span-6 bg-white rounded-2xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-bold text-slate-800 text-base font-display">Simulated school Fees Settlement Portal</h3>
                <p className="text-[10px] text-slate-400">Process practice transactions mock and print receipts.</p>
              </div>
            </div>

            <form onSubmit={handleProcessCheckout} className="space-y-3.5 text-xs text-slate-600">
              <div className="space-y-1">
                <label className="block font-bold text-slate-600">Enrolling Student's Name:</label>
                <input
                  id="checkout-name-box"
                  type="text"
                  placeholder="e.g. Sharifa Momondi"
                  required
                  value={checkoutStudentName}
                  onChange={(e) => setCheckoutStudentName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-brand-500 font-bold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-600">Tuition Program selection:</label>
                  <select
                    value={checkoutSelectedPkg}
                    onChange={(e) => setCheckoutSelectedPkg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  >
                    <option value="Proton Standard Starter">Proton Standard Starter</option>
                    <option value="Protons Accelerated Duo">Protons Accelerated Duo</option>
                    <option value="Protons Elite STEM Bundle">Protons Elite STEM Bundle</option>
                    {checkoutSelectedPkg.startsWith("Estimated") && (
                      <option value={checkoutSelectedPkg}>{checkoutSelectedPkg}</option>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-600">Payment Period month:</label>
                  <select
                    value={checkoutMonth}
                    onChange={(e) => setCheckoutMonth(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  >
                    <option value="June 2026">June 2026</option>
                    <option value="July 2026">July 2026</option>
                    <option value="August 2026">August 2026</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-600">Secure Payment Channel:</label>
                <select
                  value={checkoutMethod}
                  onChange={(e) => setCheckoutMethod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                >
                  {paymentMethods.map((chan, i) => (
                    <option key={i} value={chan}>
                      {chan}
                    </option>
                  ))}
                </select>
              </div>

              {/* Deposit target info display */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/65 flex items-start gap-2.5">
                <Landmark className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="text-[10px] text-slate-500 leading-normal">
                  <span className="block font-bold text-slate-700">Official Protons Deposit Box:</span>
                  Bank Name: <strong>{bankAccountDetails.bankName}</strong><br />
                  Account No: <strong>{bankAccountDetails.accountNumber}</strong><br />
                  Beneficiary: <strong>{bankAccountDetails.accountHolder}</strong>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-transform flex items-center justify-center gap-2 shadow-xs"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Contacting Pay Gateways & Verifying...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed & Simulate School Fee Payment</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 4. CHECKOUT INVOICE RECEIPT OUTPUT BOX (IF PAYED SUCCESSFULLY) */}
      {receipt && (
        <section className="p-6 bg-emerald-50 rounded-2xl border border-emerald-150 animate-slide-down flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-start gap-4 text-slate-600 text-xs">
            <CheckCircle className="w-10 h-10 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm md:text-base leading-snug">Fee Settlement Successful!</h4>
              <p>Reference: <strong className="font-mono text-slate-700">{receipt.referenceId}</strong></p>
              <p>Particulars: <strong>{receipt.purpose}</strong></p>
              <p>Amount Settle: <strong>RM {receipt.amount}</strong> &bull; Channel: <strong>{receipt.method}</strong></p>
            </div>
          </div>

          <button
            onClick={() => {
              window.print();
            }}
            className="px-4 py-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Print Invoice Record</span>
          </button>
        </section>
      )}

      {/* 5. HISTORIC PAYMENT LEDGER TRANCS LOG COMPILER */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Historical fee transactions ledger</h3>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 font-semibold text-slate-700">
                  <th className="p-4">Reference No</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Payment Description</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4">Method Used</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-mono text-slate-500">{tx.referenceId}</td>
                    <td className="p-4 font-bold text-slate-800">{tx.studentName}</td>
                    <td className="p-4">{tx.purpose}</td>
                    <td className="p-4 font-mono">RM {tx.amount}</td>
                    <td className="p-4 text-slate-500">{tx.method}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-150 rounded text-[9px] font-bold">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
