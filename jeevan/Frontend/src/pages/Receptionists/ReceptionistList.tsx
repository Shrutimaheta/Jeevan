import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Receptionist = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export default function ReceptionistList() {
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/receptionists/")
      .then(res => res.json())
      .then(data => setReceptionists(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Receptionists</h1>
      <Link to="/receptionists/new" className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Receptionist</Link>
      <ul className="mt-4">
        {receptionists.map(r => (
          <li key={r.id} className="border p-2 mb-2 flex justify-between">
            <span>{r.name} – {r.email} – {r.phone}</span>
            <Link to={`/receptionists/edit/${r.id}`} className="text-blue-600">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
