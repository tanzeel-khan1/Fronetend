import React from 'react'
import DarkModeToggle from '../components/DarkModeToggle'
import Profile from './Profile'

const Setting = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage profile, preferences and security in one place.
            </p>
          </div>

          <div className="self-start sm:self-auto">
            <DarkModeToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
              <Profile />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-4">
              <h2 className="font-semibold text-gray-800 dark:text-white mb-2">
                Account
              </h2>
              <p className="text-sm text-gray-500">
                Manage your account details and preferences.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-4">
              <h2 className="font-semibold text-gray-800 dark:text-white mb-2">
                Security
              </h2>
              <p className="text-sm text-gray-500">
                Update password and secure your account.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-4">
              <h2 className="font-semibold text-gray-800 dark:text-white mb-2">
                Notifications
              </h2>
              <p className="text-sm text-gray-500">
                Control your notification settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting