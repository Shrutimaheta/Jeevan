import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReceptionistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/receptionists/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });
    navigate("/receptionists");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Add Receptionist</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 w-full" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className="border p-2 w-full" />
        <button className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
