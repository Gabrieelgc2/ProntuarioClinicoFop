import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = "primary", 
  fullWidth = false, 
  children, 
  className = "",
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl",
    outline: "border-2 border-white text-white hover:bg-white hover:text-blue-900 backdrop-blur-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
