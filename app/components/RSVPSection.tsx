"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, User, Mail, MessageSquare } from "lucide-react";

interface FormState {
  name: string; email: string; attendance: "yes" | "no" | ""; message: string;
}
interface FieldError { name?: string; email?: string; attendance?: string; }

export default function RSVPSection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", attendance: "", message: "" });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const err: FieldError = {};
    if (!form.name.trim()) err.name = "Please enter your name";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) err.email = "Please enter a valid email";
    if (!form.attendance) err.attendance = "Please let us know if you'll attend";
    return err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  const borderColor = (field: string) =>
    errors[field as keyof FieldError] ? "#d4788a" : focused === field ? "#c9a96e" : "rgba(201,169,110,0.3)";

  const inputBase: React.CSSProperties = {
    background: "rgba(253,248,244,0.85)",
    borderRadius: "12px",
    color: "#6b4c3b",
    outline: "none",
    width: "100%",
    padding: "13px 16px 13px 44px",
    fontFamily: "var(--font-inter)",
    fontSize: "0.93rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    border: `1.5px solid ${borderColor(field)}`,
    boxShadow: focused === field ? "0 0 0 3px rgba(201,169,110,0.12)" : "none",
  });

  return (
    <section
      id="rsvp"
      className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf8f4 0%, #fce8e8 50%, #fdf8f4 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 10% 80%, #d4788a 0%, transparent 40%), radial-gradient(circle at 90% 20%, #c9a96e 0%, transparent 40%)" }} />

      <div className="w-full max-w-xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-8 md:mb-12">
          <p className="section-eyebrow mb-3 md:mb-4">Kindly Reply By September 1st</p>
          <h2 className="section-title">RSVP</h2>
          <p className="font-cormorant italic text-lg md:text-xl mt-3 opacity-70" style={{ color: "#6b4c3b" }}>
            We&apos;d love to know you&apos;re coming
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              className="glass-card rounded-2xl md:rounded-3xl p-8 md:p-12 text-center"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-5 md:mb-6 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #d4788a, #c9a96e)", boxShadow: "0 12px 32px rgba(212,120,138,0.35)" }}>
                <Check size={30} color="white" strokeWidth={2.5} />
              </motion.div>
              <h3 className="font-playfair font-bold text-2xl md:text-3xl mb-3" style={{ color: "#6b4c3b" }}>
                {form.attendance === "yes" ? "See You There!" : "We'll Miss You!"}
              </h3>
              <p className="font-cormorant italic text-lg md:text-xl opacity-75" style={{ color: "#6b4c3b" }}>
                {form.attendance === "yes"
                  ? "We're so excited to celebrate with you. Love, Aria & Ethan 💕"
                  : "Thank you for letting us know. Your love and wishes mean everything to us. 💕"}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form" id="rsvp-form" onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}
              className="glass-card rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 space-y-5 md:space-y-6"
            >
              {/* Name */}
              <div>
                <label htmlFor="rsvp-name" className="block text-xs font-inter tracking-widest uppercase mb-2 font-medium" style={{ color: "#c9a96e" }}>
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: focused === "name" ? "#c9a96e" : "#6b4c3b", opacity: 0.45 }} />
                  <input id="rsvp-name" type="text" placeholder="Your full name" value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    style={inputStyle("name")} />
                </div>
                {errors.name && <p className="mt-1.5 text-xs font-inter" style={{ color: "#d4788a" }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="rsvp-email" className="block text-xs font-inter tracking-widest uppercase mb-2 font-medium" style={{ color: "#c9a96e" }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: focused === "email" ? "#c9a96e" : "#6b4c3b", opacity: 0.45 }} />
                  <input id="rsvp-email" type="email" placeholder="your@email.com" value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    style={inputStyle("email")} />
                </div>
                {errors.email && <p className="mt-1.5 text-xs font-inter" style={{ color: "#d4788a" }}>{errors.email}</p>}
              </div>

              {/* Attendance — stacks on mobile */}
              <div>
                <label className="block text-xs font-inter tracking-widest uppercase mb-3 font-medium" style={{ color: "#c9a96e" }}>
                  Will You Attend?
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  {(["yes", "no"] as const).map((val) => (
                    <motion.button
                      key={val}
                      type="button"
                      id={`rsvp-attendance-${val}`}
                      onClick={() => setForm((f) => ({ ...f, attendance: val }))}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-3.5 rounded-xl font-inter font-medium text-sm tracking-wide cursor-pointer text-center"
                      style={{
                        background: form.attendance === val
                          ? val === "yes" ? "linear-gradient(135deg, #d4788a, #e8a4a4)" : "linear-gradient(135deg, #c9a96e, #e8d5b0)"
                          : "rgba(253,248,244,0.85)",
                        border: form.attendance === val ? "1.5px solid transparent" : "1.5px solid rgba(201,169,110,0.3)",
                        color: form.attendance === val ? "white" : "#6b4c3b",
                        boxShadow: form.attendance === val
                          ? val === "yes" ? "0 6px 20px rgba(212,120,138,0.32)" : "0 6px 20px rgba(201,169,110,0.32)"
                          : "none",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {val === "yes" ? "✓ Joyfully Accept" : "✗ Regretfully Decline"}
                    </motion.button>
                  ))}
                </div>
                {errors.attendance && <p className="mt-1.5 text-xs font-inter" style={{ color: "#d4788a" }}>{errors.attendance}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="rsvp-message" className="block text-xs font-inter tracking-widest uppercase mb-2 font-medium" style={{ color: "#c9a96e" }}>
                  Message <span className="ml-1 opacity-45 normal-case tracking-normal">(optional)</span>
                </label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-4 top-4 pointer-events-none"
                    style={{ color: focused === "message" ? "#c9a96e" : "#6b4c3b", opacity: 0.45 }} />
                  <textarea id="rsvp-message" rows={4} placeholder="Share a warm wish..." value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("message"), paddingTop: "13px", resize: "none" }} />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                id="rsvp-submit-btn" type="submit" disabled={status === "submitting"}
                whileHover={status !== "submitting" ? { scale: 1.02, y: -2 } : {}}
                whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
                className="w-full py-4 rounded-xl font-inter font-medium tracking-widest flex items-center justify-center gap-2.5 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #c9a96e, #a07840)",
                  color: "#fff",
                  fontSize: "0.88rem",
                  letterSpacing: "0.1em",
                  boxShadow: "0 8px 24px rgba(201,169,110,0.35)",
                  opacity: status === "submitting" ? 0.8 : 1,
                }}
              >
                {status === "submitting" ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send RSVP
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
