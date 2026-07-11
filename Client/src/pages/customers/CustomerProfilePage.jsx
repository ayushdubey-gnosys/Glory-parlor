import React from "react";
import { getAvatarUrl } from "../../utils/avatar";
import { useForm } from "react-hook-form";
import {
  User, Mail, Phone, MapPin, FileText, Crown, Camera, Eye, Pencil, Lock, CheckCircle, Calendar
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { useMyCustomer } from "../../services/customers/useCustomerQuery";
import { createMyCustomer, updateMyCustomer } from "../../services/customers/customer.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChangePassword } from "../../services/auth/useAuthMutation";

/* ─── tiny design tokens via inline style (no extra CSS file needed) ─── */
const token = {
  bg: "#faf9f5",
  surface: "#ffffff",
  border: "rgba(214, 139, 42, 0.15)",
  borderFocus: "#D68B2A",
  accent: "#D68B2A",
  accentHover: "#b57321",
  textPrimary: "#18181b",
  textMuted: "#71717a",
  textLabel: "#D68B2A",
  gold: "#D68B2A",
  goldBg: "rgba(214, 139, 42, 0.05)",
  green: "#10b981",
  greenBg: "rgba(16, 185, 129, 0.1)",
  red: "#ef4444",
  redBg: "rgba(239, 68, 68, 0.1)",
  inputBg: "#ffffff",
  shadow: "0 1px 3px 0 rgb(0 0 0 / 0.05)",
  shadowMd: "0 10px 25px -5px rgba(214, 139, 42, 0.1)",
};

/* ─── Reusable field wrapper ─── */
const Field = ({ label, icon: Icon, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: token.textLabel }}>
      {label}
    </label>
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: token.inputBg, border: `1px solid ${token.border}`,
      borderRadius: 12, padding: "0 14px", transition: "border-color .2s",
    }}
      onFocus={() => {}} // handled via CSS :focus-within below
    >
      {Icon && <Icon size={15} color={token.textMuted} style={{ flexShrink: 0 }} />}
      {children}
    </div>
  </div>
);

const inputStyle = {
  width: "100%", background: "transparent", border: "none", outline: "none",
  padding: "13px 0", fontSize: 14, color: token.textPrimary, fontFamily: "inherit",
};

/* ─── Static display field ─── */
const DisplayField = ({ label, value, icon: Icon }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: token.textLabel }}>
      {label}
    </label>
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: token.inputBg, border: `1px solid ${token.border}`,
      borderRadius: 12, padding: "13px 14px",
    }}>
      {Icon && <Icon size={15} color={token.textMuted} style={{ flexShrink: 0 }} />}
      <span style={{ fontSize: 14, color: value ? token.textPrimary : token.textMuted }}>
        {value || "—"}
      </span>
    </div>
  </div>
);

/* ─── Tab button ─── */
const Tab = ({ active, onClick, icon: Icon, children }) => (
  <button onClick={onClick} style={{
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 16px", borderRadius: 9, border: "none", cursor: "pointer",
    fontSize: 13, fontWeight: 600, transition: "all .18s",
    background: active ? token.accent : "transparent",
    color: active ? "#fff" : token.textMuted,
    fontFamily: "inherit",
  }}>
    <Icon size={14} />
    {children}
  </button>
);

/* ═══════════════════════════════════════════════════════════════════ */
const CustomerProfilePage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: customer, isLoading } = useMyCustomer();

  const { register, handleSubmit, setValue, watch } = useForm();
  const [mode, setMode] = React.useState("view");
  const profilePreview = watch("profilePic");

  React.useEffect(() => {
    if (customer || user) {
      setValue("name", customer?.name || user?.name || "");
      setValue("email", customer?.email || user?.email || "");
      setValue("phone", customer?.phone || user?.mobile || user?.phone || "");
      setValue("address", customer?.address || user?.address || "");
      setValue("notes", customer?.notes || user?.notes || "");
      setValue("dob", (customer?.dob || user?.dob) ? new Date(customer?.dob || user?.dob).toISOString().split('T')[0] : "");
      setValue("anniversary", (customer?.anniversary || user?.anniversary) ? new Date(customer?.anniversary || user?.anniversary).toISOString().split('T')[0] : "");
      setValue("gender", customer?.gender || user?.gender || "Female");
    }
  }, [customer, user, setValue]);

  const createMutation = useMutation({
    mutationFn: createMyCustomer,
    onSuccess: (created) => {
      toast.success("Profile created successfully");
      if (created) queryClient.setQueryData(["customers", "me"], created);
      else queryClient.invalidateQueries(["customers", "me"]);
      setMode("view");
    },
    onError: () => toast.error("Failed to create profile"),
  });

  const updateMutation = useMutation({
    mutationFn: updateMyCustomer,
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      const updatedCustomer = data?.customer ?? data;
      const updatedUser = data?.user ?? null;
      if (updatedCustomer) queryClient.setQueryData(["customers", "me"], updatedCustomer);
      else queryClient.invalidateQueries(["customers", "me"]);
      if (updatedUser) queryClient.setQueryData(["auth", "me"], updatedUser);
      else queryClient.invalidateQueries(["auth", "me"]);
      setMode("view");
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "profilePic") {
        if (data.profilePic?.[0]) formData.append("profilePic", data.profilePic[0]);
      } else {
        if (data[key] !== undefined && data[key] !== null) formData.append(key, data[key]);
      }
    });
    customer ? updateMutation.mutate(formData) : createMutation.mutate(formData);
  };

  const { register: pwRegister, handleSubmit: handlePwSubmit, reset: resetPw } = useForm();
  const changePwMutation = useChangePassword();

  const onChangePassword = (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;
    if (!currentPassword || !newPassword) return toast.error("Please fill both current and new password");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
    changePwMutation.mutate({ currentPassword, newPassword }, {
      onSuccess: (res) => { toast.success(res?.message || "Password updated"); resetPw(); },
      onError: (err) => toast.error(err?.response?.data?.message || "Failed to change password"),
    });
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: token.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            border: `3px solid ${token.border}`, borderTopColor: token.accent,
            animation: "spin 0.8s linear infinite",
          }} />
          <span style={{ color: token.textMuted, fontSize: 14 }}>Loading profile…</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const avatarSrc = profilePreview?.[0]
    ? URL.createObjectURL(profilePreview[0])
    : getAvatarUrl(customer || user);

  return (
    <div style={{ minHeight: "100vh", background: token.bg, padding: "32px 20px", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>

      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        textarea { resize: none; }
        button:disabled { opacity: .5; cursor: not-allowed; }
        input[type="file"] { display: none; }
        .profile-card-btn:hover { background: #b57321 !important; color: white !important; }
        .submit-btn:hover:not(:disabled) { background: linear-gradient(to bottom, #c27d25, #a3671e) !important; transform: scale(1.02); }
        .submit-btn { background: linear-gradient(to bottom, #D68B2A, #b57321) !important; border: none !important; }
        .tab-btn-outline:hover { background: #ffffff !important; border-color: #D68B2A !important; color: #D68B2A !important; }
      `}</style>

      <div style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>

        {/* ── PAGE HEADER ── */}
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: token.textPrimary, margin: 0 }}>Account</h1>
          <p style={{ fontSize: 14, color: token.textMuted, margin: "4px 0 0" }}>Manage your personal information and security</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, alignItems: "start" }}>

          {/* ══ LEFT SIDEBAR CARD ══ */}
          <div style={{
            background: token.surface, border: `1px solid ${token.border}`,
            borderRadius: 20, padding: 28, boxShadow: token.shadowMd,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
          }}>
            {/* Avatar */}
            <div style={{ position: "relative", marginBottom: 20 }}>
              <img
                src={avatarSrc}
                alt="profile"
                style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: `3px solid ${token.border}`, display: "block" }}
              />
              <label style={{
                position: "absolute", bottom: 2, right: 2,
                background: token.accent, color: "#fff",
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", boxShadow: "0 2px 8px rgb(0 0 0 / .18)",
                transition: "background .18s",
              }} className="profile-card-btn" title="Change photo">
                <Camera size={13} />
                <input type="file" {...register("profilePic")} />
              </label>
            </div>

            {/* Name & email */}
            <h2 style={{ fontSize: 18, fontWeight: 700, color: token.textPrimary, margin: 0, textAlign: "center" }}>
              {customer?.name || user?.name || "Customer"}
            </h2>
            <p style={{ fontSize: 13, color: token.textMuted, margin: "4px 0 20px", textAlign: "center" }}>
              {customer?.email || user?.email}
            </p>

            {/* Divider */}
            <div style={{ width: "100%", height: 1, background: token.border, marginBottom: 20 }} />

            {/* Category badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: token.goldBg, color: token.gold,
              padding: "6px 14px", borderRadius: 99,
              fontSize: 12, fontWeight: 600, textTransform: "capitalize",
              letterSpacing: "0.04em", marginBottom: 10,
            }}>
              <Crown size={13} />
              {customer?.category || "Middle"}
            </div>

            {/* Status badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: customer?.status === "inactive" ? token.redBg : token.greenBg,
              color: customer?.status === "inactive" ? token.red : token.green,
              padding: "6px 14px", borderRadius: 99,
              fontSize: 12, fontWeight: 600, textTransform: "capitalize",
            }}>
              <CheckCircle size={13} />
              {customer?.status || "Active"}
            </div>

            {/* Divider */}
            <div style={{ width: "100%", height: 1, background: token.border, margin: "20px 0 0" }} />

            {/* Quick info list */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
              {[
                { icon: Phone, label: "Phone", value: customer?.phone || user?.mobile || user?.phone },
                { icon: MapPin, label: "Location", value: customer?.address || user?.address },
                { icon: User, label: "Gender", value: customer?.gender || user?.gender },
                { icon: Calendar, label: "DOB", value: (customer?.dob || user?.dob) ? new Date(customer?.dob || user?.dob).toLocaleDateString() : null },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: token.bg,
                    border: `1px solid ${token.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon size={13} color={token.textMuted} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: token.textMuted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
                    <div style={{ fontSize: 13, color: value ? token.textPrimary : token.textMuted, marginTop: 1, lineHeight: 1.4 }}>
                      {value || "Not set"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT MAIN CARD ══ */}
          <div style={{
            background: token.surface, border: `1px solid ${token.border}`,
            borderRadius: 20, padding: 32, boxShadow: token.shadowMd,
          }}>
            {/* Tab bar */}
            <div style={{
              display: "flex", gap: 4, background: token.bg,
              border: `1px solid ${token.border}`, borderRadius: 12,
              padding: 4, marginBottom: 28, width: "fit-content",
            }}>
              <Tab active={mode === "view"} onClick={() => setMode("view")} icon={Eye}>Overview</Tab>
              <Tab active={mode === "edit"} onClick={() => setMode("edit")} icon={Pencil}>Edit Profile</Tab>
              <Tab active={mode === "password"} onClick={() => setMode("password")} icon={Lock}>Security</Tab>
            </div>

            {/* ── VIEW MODE ── */}
            {mode === "view" && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: token.textPrimary, margin: "0 0 4px" }}>Personal Information</h3>
                  <p style={{ fontSize: 13, color: token.textMuted, margin: 0 }}>Your profile details at a glance</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <DisplayField label="Full Name" value={customer?.name || user?.name} icon={User} />
                  <DisplayField label="Email Address" value={customer?.email || user?.email} icon={Mail} />
                  <DisplayField label="Phone Number" value={customer?.phone || user?.mobile || user?.phone} icon={Phone} />
                  <DisplayField label="Category" value={customer?.category || "Middle"} icon={Crown} />
                  <DisplayField label="Gender" value={customer?.gender || user?.gender} icon={User} />
                  <DisplayField label="Date of Birth" value={(customer?.dob || user?.dob) ? new Date(customer?.dob || user?.dob).toLocaleDateString() : ""} icon={Calendar} />
                  <DisplayField label="Anniversary" value={(customer?.anniversary || user?.anniversary) ? new Date(customer?.anniversary || user?.anniversary).toLocaleDateString() : ""} icon={Calendar} />
                </div>
                <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
                  <DisplayField label="Address" value={customer?.address || user?.address} icon={MapPin} />
                  <DisplayField label="Notes" value={customer?.notes || user?.notes} icon={FileText} />
                </div>
                <button
                  onClick={() => setMode("edit")}
                  style={{
                    marginTop: 24, padding: "11px 24px", borderRadius: 11,
                    background: token.accent, color: "#fff", border: "none",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background .18s",
                    display: "flex", alignItems: "center", gap: 7, fontFamily: "inherit",
                  }}
                  className="submit-btn"
                >
                  <Pencil size={14} /> Edit Profile
                </button>
              </div>
            )}

            {/* ── EDIT MODE ── */}
            {mode === "edit" && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: token.textPrimary, margin: "0 0 4px" }}>Edit Profile</h3>
                  <p style={{ fontSize: 13, color: token.textMuted, margin: 0 }}>Update your personal information below</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <Field label="Full Name" icon={User}>
                    <input {...register("name")} placeholder="Enter your name" style={inputStyle} />
                  </Field>

                  <Field label="Email Address" icon={Mail}>
                    <input {...register("email")} type="email" placeholder="Enter your email" style={inputStyle} />
                  </Field>

                  <Field label="Phone Number" icon={Phone}>
                    <input {...register("phone")} placeholder="Enter phone number" style={inputStyle} />
                  </Field>

                  {/* Category: read-only */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: token.textLabel }}>
                      Category
                    </label>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10,
                      background: token.goldBg, border: `1px solid #fde68a`,
                      borderRadius: 12, padding: "13px 14px",
                    }}>
                      <Crown size={15} color={token.gold} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: token.gold, fontWeight: 600, textTransform: "capitalize" }}>
                        {customer?.category || "Middle"}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: token.textLabel }}>
                      Address
                    </label>
                    <div style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      background: token.inputBg, border: `1px solid ${token.border}`,
                      borderRadius: 12, padding: "0 14px",
                    }}>
                      <MapPin size={15} color={token.textMuted} style={{ flexShrink: 0, marginTop: 14 }} />
                      <textarea {...register("address")} rows={3} placeholder="Enter your address"
                        style={{ ...inputStyle, paddingTop: 13, paddingBottom: 13, lineHeight: 1.5 }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: token.textLabel }}>
                      Notes
                    </label>
                    <div style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      background: token.inputBg, border: `1px solid ${token.border}`,
                      borderRadius: 12, padding: "0 14px",
                    }}>
                      <FileText size={15} color={token.textMuted} style={{ flexShrink: 0, marginTop: 14 }} />
                      <textarea {...register("notes")} rows={4} placeholder="Add any notes…"
                        style={{ ...inputStyle, paddingTop: 13, paddingBottom: 13, lineHeight: 1.5 }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                  <button type="button" onClick={() => setMode("view")} style={{
                    padding: "11px 20px", borderRadius: 11,
                    background: "transparent", color: token.textPrimary,
                    border: `1px solid ${token.border}`, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                  }} className="tab-btn-outline">
                    Cancel
                  </button>
                  <button type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    style={{
                      padding: "11px 28px", borderRadius: 11,
                      background: token.accent, color: "#fff",
                      border: "none", fontSize: 13, fontWeight: 600,
                      cursor: "pointer", transition: "background .18s", fontFamily: "inherit",
                    }} className="submit-btn">
                    {customer
                      ? (updateMutation.isPending ? "Saving…" : "Save Changes")
                      : (createMutation.isPending ? "Creating…" : "Create Profile")}
                  </button>
                </div>
              </form>
            )}

            {/* ── PASSWORD MODE ── */}
            {mode === "password" && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: token.textPrimary, margin: "0 0 4px" }}>Change Password</h3>
                  <p style={{ fontSize: 13, color: token.textMuted, margin: 0 }}>Keep your account secure with a strong password</p>
                </div>

                {/* Security tips pill */}
                <div style={{
                  background: "#eff6ff", border: "1px solid #bfdbfe",
                  borderRadius: 10, padding: "10px 14px", marginBottom: 24,
                  fontSize: 12, color: "#1d4ed8", lineHeight: 1.5,
                }}>
                  💡 Use at least 8 characters with a mix of letters, numbers, and symbols.
                </div>

                <form onSubmit={handlePwSubmit(onChangePassword)} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
                  {[
                    { name: "currentPassword", label: "Current Password" },
                    { name: "newPassword", label: "New Password" },
                    { name: "confirmPassword", label: "Confirm New Password" },
                  ].map(({ name, label }) => (
                    <div key={name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: token.textLabel }}>
                        {label}
                      </label>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 10,
                        background: token.inputBg, border: `1px solid ${token.border}`,
                        borderRadius: 12, padding: "0 14px",
                      }}>
                        <Lock size={15} color={token.textMuted} style={{ flexShrink: 0 }} />
                        <input type="password" {...pwRegister(name)} style={inputStyle} />
                      </div>
                    </div>
                  ))}

                  <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                    <button type="button" onClick={() => resetPw()} style={{
                      padding: "11px 20px", borderRadius: 11,
                      background: "transparent", color: token.textPrimary,
                      border: `1px solid ${token.border}`, fontSize: 13, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit",
                    }} className="tab-btn-outline">
                      Reset
                    </button>
                    <button type="submit" disabled={changePwMutation.isLoading} style={{
                      padding: "11px 28px", borderRadius: 11,
                      background: token.accent, color: "#fff",
                      border: "none", fontSize: 13, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit", transition: "background .18s",
                    }} className="submit-btn">
                      {changePwMutation.isLoading ? "Updating…" : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;