import React, { useState } from 'react';
import api from './Api';
import ShowPassword from './ShowPassword';

export default function ChangeAdminPassword() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmNewPassword) {
            return setError("New passwords must match.");
        }

        try {
            setIsLoading(true);
            setError('');
            const res = await api.post('/change-admin-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });
            setMessage(res.data.message || "Password changed successfully.");
            setError('');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            });
        } catch (err) {
            setMessage('');
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <div className="bg-[#1F1F1F] p-6 rounded border border-[#FFCB74]/40 max-w-md mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4 text-[#FFCB74]">Change Password</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative mb-4">
                    <input
                        type={showPassword.currentPassword ? "text" : "password"}
                        name="currentPassword"
                        placeholder="Current Password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-black border border-[#FFCB74]/40 text-white"
                        required
                    />

                    <ShowPassword
                        showPassword={showPassword.currentPassword}
                        setShowPassword={() => setShowPassword((prev) => ({
                            ...prev,
                            currentPassword: !prev.currentPassword,
                        }))}
                    />
                </div>

                <div className="relative mb-4">
                    <input
                        type={showPassword.newPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-black border border-[#FFCB74]/40 text-white"
                        required
                    />

                    <ShowPassword
                        showPassword={showPassword.newPassword}
                        setShowPassword={() => setShowPassword((prev) => ({
                            ...prev,
                            newPassword: !prev.newPassword,
                        }))}
                    />
                </div>

                <div className="relative mb-4">
                    <input
                        type={showPassword.confirmNewPassword ? "text" : "password"}
                        name="confirmNewPassword"
                        placeholder="Confirm New Password"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-black border border-[#FFCB74]/40 text-white"
                        required
                    />

                    <ShowPassword
                        showPassword={showPassword.confirmNewPassword}
                        setShowPassword={() => setShowPassword((prev) => ({
                            ...prev,
                            confirmNewPassword: !prev.confirmNewPassword,
                        }))}
                    />
                </div>

                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-[#FFCB74] text-black px-4 py-2 rounded font-semibold w-full hover:brightness-105"
                >
                    {isLoading ? 'Changing...' : 'Change Password'}
                </button>

                {message && <p className="text-green-500 text-sm">{message}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    );
};