import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from "lucide-react";

export default function ShowPassword({ showPassword, setShowPassword }) {
    return (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FFCB74]"
        >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
    )
}