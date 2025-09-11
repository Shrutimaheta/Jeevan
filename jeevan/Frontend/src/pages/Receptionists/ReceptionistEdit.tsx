import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ReceptionistEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/receptionists/${id}/`)
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/api/receptionists/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });
    navigate("/receptionists");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Edit Receptionist</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full" />
        <input value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full" />
        <input value={phone} onChange={e => setPhone(e.target.value)} className="border p-2 w-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
