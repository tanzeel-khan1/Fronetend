import React from "react";
import { Bell, Lock, UserCog } from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";
import Profile from "./Profile";

const Setting = () => {
  const settings = [
    {
      title: "Account",
      text: "Manage your account details and preferences.",
      icon: UserCog,
    },
    {
      title: "Security",
      text: "Update password and secure your account.",
      icon: Lock,
    },
    {
      title: "Notifications",
      text: "Control your notification settings.",
      icon: Bell,
    },
  ];

  return (
    <div className="min-h-screen transition">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
              Workspace
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Settings
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage profile, preferences and security in one place.
            </p>
          </div>

          <div className="self-start sm:self-auto">
            <DarkModeToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="premium-panel rounded-lg p-4 sm:p-6">
              <Profile />
            </div>
          </div>

          <div className="space-y-4">
            {settings.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="premium-panel rounded-lg p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/12 text-teal-600 dark:text-teal-300">
                    <Icon size={19} />
                  </div>
                  <h2 className="mb-2 font-bold text-slate-950 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
