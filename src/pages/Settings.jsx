import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../api/users.api";
import { sendOtp, verifyOtp } from "../api/auth.api";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, LogOut } from "lucide-react";

function Settings() {
  const { darkMode, setDarkMode } = useTheme();

  const { user, updateUser: updateAuthUser } = useAuth();

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [securityData, setSecurityData] = useState({
    email: user?.email || "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderNotifications: true,
    productUpdates: false,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        id: user._id || user.id || "",
        name: user.username || user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      setSecurityData((prev) => ({
        ...prev,
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(userData.id, {
        username: userData.name,
        email: userData.email,
        phone: userData.phone,
      });

      const updatedUser = {
        ...user,
        username: userData.name,
        email: userData.email,
        phone: userData.phone,
      };

      updateAuthUser(updatedUser);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed To Update Profile");
    }
  };

  const handleSendOtp = async () => {
    try {
      await sendOtp(securityData.email);

      alert("OTP sent successfully");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      alert("Failed to send OTP");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await verifyOtp({
        email: securityData.email,
        otp: securityData.otp,
        newPassword: securityData.newPassword,
      });

      alert("Password changed successfully");

      setSecurityData({
        email: user?.email || "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to change password");
    }
  };

  return (
    <div className="text-[var(--page-text)">
      <div className="rounded-2xl shadow-md p-6 bg-[var(--card-bg)] ">
        <h1 className="text-2xl font-bold mb-6 ">Profile</h1>

        <form className="space-y-5" onSubmit={handleProfileSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              User Name
            </label>

            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  name: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  email: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Phone
            </label>

            <input
              type="number"
              value={userData.phone}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  phone: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-[#0f2f2a] transition"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className=" rounded-2xl shadow-md p-6 mt-6 bg-[var(--card-bg)]">
        <h2 className="text-2xl font-bold mb-6 --page-text ">Security</h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={securityData.email}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  email: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <button
            type="button"
            onClick={handleSendOtp}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Send OTP
          </button>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              OTP Code
            </label>

            <input
              type="text"
              value={securityData.otp}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  otp: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              New Password
            </label>

            <input
              type="password"
              autoComplete="new-password"
              value={securityData.newPassword}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  newPassword: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <input
              type="password"
              autoComplete="new-password"
              value={securityData.confirmPassword}
              onChange={(e) =>
                setSecurityData({
                  ...securityData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-[#0f2f2a] transition"
          >
            Change Password
          </button>
        </form>
      </div>

      <div className=" rounded-2xl shadow-md p-6 mt-6 bg-[var(--card-bg)]">
        <h2 className="text-2xl font-bold mb-6 ">
          Notifications
        </h2>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-slate-500">Receive updates by email</p>
            </div>

            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={() =>
                setNotifications({
                  ...notifications,
                  emailNotifications: !notifications.emailNotifications,
                })
              }
              className="h-5 w-5 accent-emerald-600"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium">Order Notifications</p>
              <p className="text-sm text-slate-500">
                Notify me when orders are placed
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications.orderNotifications}
              onChange={() =>
                setNotifications({
                  ...notifications,
                  orderNotifications: !notifications.orderNotifications,
                })
              }
              className="h-5 w-5 accent-emerald-600"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium">Product Updates</p>
              <p className="text-sm text-slate-500">
                Receive product update alerts
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications.productUpdates}
              onChange={() =>
                setNotifications({
                  ...notifications,
                  productUpdates: !notifications.productUpdates,
                })
              }
              className="h-5 w-5 accent-emerald-600"
            />
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-2xl shadow-md p-6 mt-6 bg-[var(--card-bg)]">
        <div>
          <h3 className="font-bold ">Dark Mode</h3>

          <p className="text-sm text-slate-500">
            Switch between light and dark theme
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
            darkMode
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}

export default Settings;
