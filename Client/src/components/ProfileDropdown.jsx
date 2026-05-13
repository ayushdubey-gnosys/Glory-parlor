import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useMyCustomer } from "../services/customers/useCustomerQuery";
import { LogOut, Edit2 } from "lucide-react";

const ProfileDropdown = ({ open, onClose }) => {
  const { user, logout, refetchUser } = useAuth();
  const { data: customer, isLoading } = useMyCustomer();
  const navigate = useNavigate();
  const ref = React.useRef();

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const avatar = customer?.profilePic || user?.profilePic || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
  const name = customer?.name || user?.name || "Unnamed";
  const email = user?.email || customer?.email || "-";
  const category = customer?.category;
  const status = customer?.status;

  const handleUpdate = () => {
    onClose();
    navigate("/customers/me");
  };

  const handleLogout = async () => {
    try {
      // clear client-side storage
      localStorage.clear();
      await logout();
    } finally {
      onClose();
      navigate("/login");
    }
  };

  return (
    <div ref={ref} className="absolute right-4 top-16 w-80 bg-zinc-800 text-white border border-white/10 rounded-2xl p-4 shadow-xl z-50 animate-fadeIn">
      <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10" />
        <div className="flex-1">
          <div className="font-semibold text-white">{name}</div>
          <div className="text-xs text-zinc-400">{email}</div>
          <div className="mt-2 flex items-center gap-2">
            {category && <span className="px-2 py-1 text-xs rounded-full bg-amber-800 text-amber-200">{category}</span>}
            {status && <span className={`px-2 py-1 text-xs rounded-full ${status === 'active' ? 'bg-emerald-800 text-emerald-200' : 'bg-zinc-700 text-zinc-300'}`}>{status}</span>}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button onClick={handleUpdate} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/5 transition"><Edit2 size={16} /> Update Profile</button>
        <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/5 transition text-rose-700"><LogOut size={16} /> Logout</button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
