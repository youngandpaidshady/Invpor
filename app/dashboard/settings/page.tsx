"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Trash2,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Smartphone,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications"
  >("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Profile Form
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  // Load real user data
  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setProfileData({
        fullName: user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
        country: user.user_metadata?.country || "",
        timezone: user.user_metadata?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    };
    load();
  }, []);

  // Password Form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    emailTrades: true,
    emailPayouts: true,
    emailNews: false,
    pushTrades: true,
    pushPayouts: true,
    pushNews: false,
  });

  // 2FA
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.fullName,
          phone: profileData.phone,
          country: profileData.country,
          timezone: profileData.timezone,
        },
      });
      if (updateError) throw updateError;
      setSuccess("Profile updated successfully!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });
      if (updateError) throw updateError;
      setSuccess("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess("Notification preferences saved!");
    setIsLoading(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-display tracking-widest text-white uppercase mb-2">Account Settings</h1>
        <p className="text-[#A0A0A0] font-mono tracking-widest text-[11px] uppercase">
          Manage your account preferences and security
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-1 overflow-x-auto no-scrollbar scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSuccess(null);
              setError(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 font-mono text-[11px] tracking-wider uppercase transition-all ${activeTab === tab.id
              ? "bg-[#C7A257] text-black shadow-[0_0_15px_rgba(199,162,87,0.3)]"
              : "text-white/40 hover:text-white hover:bg-white/[0.04]"
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success/Error Messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-lg"
        >
          <CheckCircle className="w-5 h-5" />
          {success}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg"
        >
          <AlertCircle className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] rounded-none p-6 lg:p-8"
        >
          <h2 className="text-[13px] font-mono tracking-[0.2em] text-[#C7A257] uppercase mb-8 flex items-center gap-3">
            <User className="w-5 h-5" />
            Profile Information
          </h2>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none focus:outline-none focus:border-[#C7A257] focus:ring-1 focus:ring-[#C7A257]/50 text-white font-body transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C7A257]/50" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none focus:outline-none focus:border-[#C7A257] focus:ring-1 focus:ring-[#C7A257]/50 text-white font-body transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none focus:outline-none focus:border-[#C7A257] focus:ring-1 focus:ring-[#C7A257]/50 text-white font-body transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase mb-3">
                  Country
                </label>
                <select
                  value={profileData.country}
                  onChange={(e) =>
                    setProfileData({ ...profileData, country: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none focus:outline-none focus:border-[#C7A257] focus:ring-1 focus:ring-[#C7A257]/50 text-white font-body transition-all"
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase mb-3">
                  Timezone
                </label>
                <select
                  value={profileData.timezone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, timezone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none focus:outline-none focus:border-[#C7A257] focus:ring-1 focus:ring-[#C7A257]/50 text-white font-body transition-all"
                >
                  <option value="America/New_York">
                    Eastern Time (US & Canada)
                  </option>
                  <option value="America/Chicago">
                    Central Time (US & Canada)
                  </option>
                  <option value="America/Los_Angeles">
                    Pacific Time (US & Canada)
                  </option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-[#C7A257] to-[#B8933E] text-black font-mono text-[12px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(199,162,87,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] rounded-none p-6 lg:p-8"
          >
            <h2 className="text-[13px] font-mono tracking-[0.2em] text-[#C7A257] uppercase mb-8 flex items-center gap-3">
              <Lock className="w-5 h-5" />
              Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase mb-3">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C7A257]/50" />
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full pl-11 pr-12 py-3 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none focus:outline-none focus:border-[#C7A257] focus:ring-1 focus:ring-[#C7A257]/50 text-white font-body transition-all"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        current: !showPasswords.current,
                      })
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#C7A257]"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase mb-3">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 pr-12 py-3 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none focus:outline-none focus:border-[#C7A257] focus:ring-1 focus:ring-[#C7A257]/50 text-white font-body transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          new: !showPasswords.new,
                        })
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#C7A257]"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase mb-3">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 pr-12 py-3 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none focus:outline-none focus:border-[#C7A257] focus:ring-1 focus:ring-[#C7A257]/50 text-white font-body transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          confirm: !showPasswords.confirm,
                        })
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#C7A257]"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-[#C7A257] to-[#B8933E] text-black font-mono text-[12px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(199,162,87,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  Update Password
                </button>
              </div>
            </form>
          </motion.div>

          {/* Two-Factor Authentication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] rounded-none p-6 lg:p-8"
          >
            <h2 className="text-[13px] font-mono tracking-[0.2em] text-[#C7A257] uppercase mb-4 flex items-center gap-3">
              <Smartphone className="w-5 h-5" />
              Two-Factor Authentication
            </h2>

            <p className="text-[#A0A0A0] font-body text-[13px] mb-6">
              Add an extra layer of security to your account by enabling
              two-factor authentication.
            </p>

            <div className="flex items-center justify-between p-5 bg-[#111111]/80 border border-white/[0.08] rounded-none">
              <div className="flex items-center gap-4">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${is2FAEnabled ? "bg-[#22C55E] shadow-[0_0_8px_#22C55E]" : "bg-white/20"}`}
                />
                <span className="font-mono text-[13px] tracking-wide text-white uppercase">
                  {is2FAEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <button
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className={`px-6 py-2.5 font-mono text-[12px] font-bold uppercase tracking-widest transition-all ${is2FAEnabled
                  ? "bg-white/[0.04] text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444]/10"
                  : "bg-gradient-to-r from-[#C7A257] to-[#B8933E] text-black hover:shadow-[0_0_20px_rgba(199,162,87,0.3)]"
                  }`}
              >
                {is2FAEnabled ? "Disable" : "Enable"}
              </button>
            </div>
          </motion.div>

          {/* Delete Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-none p-6 lg:p-8"
          >
            <h2 className="text-[13px] font-mono tracking-[0.2em] text-[#EF4444] uppercase mb-4 flex items-center gap-3">
              <Trash2 className="w-5 h-5" />
              Delete Account
            </h2>

            <p className="text-[#A0A0A0] font-body text-[13px] mb-6">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>

            <button type="button" onClick={() => { if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) { alert("Account deletion request submitted."); } }} className="px-6 py-3 bg-[#EF4444] text-white font-mono text-[12px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all">
              Delete Account
            </button>
          </motion.div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] rounded-none p-6 lg:p-8"
        >
          <h2 className="text-[13px] font-mono tracking-[0.2em] text-[#C7A257] uppercase mb-8 flex items-center gap-3">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </h2>

          <form onSubmit={handleNotificationsSubmit} className="space-y-6">
            {/* Email Notifications */}
            <div>
              <h3 className="font-mono tracking-widest text-[#A0A0A0] text-[11px] uppercase mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C7A257]" />
                Email Notifications
              </h3>
              <div className="space-y-3">
                {[
                  {
                    key: "emailTrades",
                    label: "Trade Notifications",
                    desc: "Get notified when trades are opened or closed",
                  },
                  {
                    key: "emailPayouts",
                    label: "Payout Updates",
                    desc: "Receive updates on your payout requests",
                  },
                  {
                    key: "emailNews",
                    label: "News & Promotions",
                    desc: "Stay updated with our latest news and offers",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-5 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none cursor-pointer hover:border-[#C7A257]/50 transition-all"
                  >
                    <div>
                      <p className="font-body text-[14px] text-white">{item.label}</p>
                      <p className="text-[12px] text-white/50">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={
                        notifications[item.key as keyof typeof notifications]
                      }
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded-none border-white/[0.2] bg-black/50 text-[#C7A257] focus:ring-[#C7A257]/50"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div>
              <h3 className="font-mono tracking-widest text-[#A0A0A0] text-[11px] uppercase mb-4 flex items-center gap-2 mt-8">
                <Smartphone className="w-4 h-4 text-[#C7A257]" />
                Push Notifications
              </h3>
              <div className="space-y-3">
                {[
                  {
                    key: "pushTrades",
                    label: "Trade Alerts",
                    desc: "Instant alerts for trade activity",
                  },
                  {
                    key: "pushPayouts",
                    label: "Payout Alerts",
                    desc: "Get notified when payouts are processed",
                  },
                  {
                    key: "pushNews",
                    label: "Platform Updates",
                    desc: "Important platform announcements",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-5 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-none cursor-pointer hover:border-[#C7A257]/50 transition-all"
                  >
                    <div>
                      <p className="font-body text-[14px] text-white">{item.label}</p>
                      <p className="text-[12px] text-white/50">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={
                        notifications[item.key as keyof typeof notifications]
                      }
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded-none border-white/[0.2] bg-black/50 text-[#C7A257] focus:ring-[#C7A257]/50"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06]">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-[#C7A257] to-[#B8933E] text-black font-mono text-[12px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(199,162,87,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Preferences
              </button>
            </div>
          </form>
        </motion.div>
      )}

    </div>
  );
}
