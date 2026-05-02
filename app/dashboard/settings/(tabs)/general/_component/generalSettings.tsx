"use client"
import EmailInput from "./settingEmailInput";
import SettingsSection from "./settingsSection";
import SwitchItem from "./settingSwitch";

export default function GeneralSettings() {
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
    <main className="bg-surface p-10 space-y-6">
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
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3>Password</h3>
            <p className="text-segment">***************</p>
            <p className="text-segment">Last changed 12/12/2025</p>
          </div>
          <div
            className="text-accent cursor-pointer transition-transform duration-200 active:scale-95"
            onClick={() => console.log("Change password clicked")}
          >
            Change password
          </div>
        </div>
      </SettingsSection>
    </main>
  );
}
