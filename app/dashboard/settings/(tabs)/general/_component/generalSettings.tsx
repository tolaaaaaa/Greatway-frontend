"use client"
import EmailInput from "./settingEmailInput";
import SettingsSection from "./settingsSection";
import SwitchItem from "./settingSwitch";
import { useState } from "react";
import { customToast, Input } from "@/app/component/ui";
import { updatePassword } from "@/actions/user.action";

export default function GeneralSettings() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordSave = async () => {
    if (!password.trim()) return;

    setIsSaving(true);
    const success = await updatePassword(password);
    setIsSaving(false);

    if (success) {
      customToast.success("Password updated successfully");
      setIsChangingPassword(false);
      setPassword("");
    } else {
      customToast.error("Failed to update password. Please try again.");
    }
  };

  const notificationItems = [
    "New Booking",
    "New Upload",
    "Property Listings",
    "Applications",
  ];

  const description = "Lorem ipsum dolor sit amet.";

  const emailInputs = [
    {
      label: "Email",
      placeholder: "Enter Email Address",
      name: "Account Email",
    },
    {
      label: "Alternate Email",
      placeholder: "Enter Address",
      name: "Alternate Email",
    },
  ];

  return (
    <main className="bg-surface p-10 space-y-6 min-h-screen">
      {/* Email Notifications */}
      <SettingsSection title="Email Notification">
        {notificationItems.map((label, index) => (
          <SwitchItem key={index} label={label} description={description} />
        ))}
      </SettingsSection>

      {/* Contact Email */}
      <SettingsSection
        title="Contact Email"
        description={
          <>
            Provide your contact email for your
            <br />
            payout invoices.
          </>
        }
      >
        {emailInputs.map((input) => (
          <EmailInput key={input.name} {...input} />
        ))}
        <hr className="border-segment border" />
      </SettingsSection>

      {/* Security */}
      <SettingsSection title="Security">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1 flex-1">
            <h3>Password</h3>
            <div className="min-h-12">
              {isChangingPassword ? (
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(val) => setPassword(val)}
                />
              ) : (
                <p className="text-segment leading-12">***************</p>
              )}
            </div>
            <p className="text-segment">Last changed 12/12/2025</p>
          </div>
          <div
            className="text-accent cursor-pointer transition-transform duration-200 active:scale-95 shrink-0 ml-4 mt-1"
            onClick={() => {
              if (isChangingPassword) {
                handlePasswordSave();
              } else {
                setIsChangingPassword(true);
              }
            }}
          >
            {isSaving ? "Saving..." : isChangingPassword ? "Save password" : "Change password"}
          </div>
        </div>
      </SettingsSection>
    </main>
  );
}