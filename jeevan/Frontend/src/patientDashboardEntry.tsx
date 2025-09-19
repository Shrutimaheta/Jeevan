import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface DashboardStats { total:number; accepted:number; pending:number; rejected:number; completed:number }
interface UpcomingAppt { id:number; appointment_date:string; appointment_time:string; status:string }
interface Prescription { id:number; appointment_id:number; diagnosis:string; created_at:string }

const PatientDashboardApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [upcoming, setUpcoming] = useState<UpcomingAppt[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const patient = (window as any).__PATIENT__ || { name: 'Patient' };

  useEffect(() => {
    fetch('/patient/api/dashboard-data/')
      .then(r => { if(!r.ok) throw new Error('Failed to load dashboard'); return r.json(); })
      .then(data => {
        setStats(data.stats);
        setUpcoming(data.upcomingAppointments);
        setPrescriptions(data.recentPrescriptions);
      })
      .catch(e => setError(e.message))
      .finally(()=> setLoading(false));
  }, []);

  if (loading) return <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container-fluid py-3 patient-dash">
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-4">
        <div>
          <h2 className="fw-semibold mb-1">Welcome back, {patient.name}.</h2>
          <p className="text-muted mb-0">Here is a quick overview of your health activity.</p>
        </div>
        <div className="text-end small text-secondary">
          <span className="me-2"><i className="ti ti-calendar"/> Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {stats && [
          { label:'Total', value:stats.total, icon:'ti ti-activity-heartbeat', color:'primary' },
          { label:'Accepted', value:stats.accepted, icon:'ti ti-circle-check', color:'success' },
          { label:'Pending', value:stats.pending, icon:'ti ti-clock', color:'warning' },
          { label:'Completed', value:stats.completed, icon:'ti ti-checkup-list', color:'teal' }
        ].map(card => (
          <div className="col-sm-6 col-xl-3" key={card.label}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-uppercase small text-muted mb-1">{card.label}</p>
                  <h4 className="mb-0 fw-bold">{card.value}</h4>
                </div>
                <div className={`icon-circle bg-${card.color} bg-opacity-10 text-${card.color} fs-3 d-flex align-items-center justify-content-center`} style={{width:54,height:54,borderRadius:'50%'}}>
                  <i className={card.icon}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-3 pb-0"><h5 className="mb-0 fw-semibold">Upcoming Appointments</h5></div>
            <div className="card-body">
              {upcoming.length === 0 && <p className="text-muted mb-0">No upcoming appointments scheduled.</p>}
              {upcoming.map(a => (
                <div key={a.id} className="d-flex align-items-center justify-content-between py-2 border-bottom small">
                  <div>
                    <div className="fw-semibold">{a.appointment_date} <span className="text-muted">{a.appointment_time?.slice(0,5)}</span></div>
                    <span className="badge bg-light text-secondary">{a.status}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <a href={`/appointments/${a.id}/`} className="btn btn-sm btn-outline-primary">View</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-3 pb-0"><h5 className="mb-0 fw-semibold">Recent Prescriptions</h5></div>
            <div className="card-body">
              {prescriptions.length === 0 && <p className="text-muted mb-0">No prescriptions yet.</p>}
              <ul className="list-unstyled mb-0">
                {prescriptions.map(p => (
                  <li key={p.id} className="py-2 border-bottom small">
                    <div className="fw-semibold">Appointment #{p.appointment_id}</div>
                    <div className="text-muted text-truncate" style={{maxWidth:'100%'}}>{p.diagnosis || '—'}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body d-flex flex-wrap gap-3 align-items-center">
              <div className="flex-grow-1">
                <h4 className="fw-semibold mb-2">Stay on top of your health</h4>
                <p className="text-muted mb-3 mb-md-0">Book your next check-up now and keep your records organized.</p>
              </div>
              <div className="text-end flex-shrink-0">
                <a href="/appointments/book/" className="btn btn-primary btn-lg">Book Appointment</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pt-3 pb-0"><h5 className="mb-0 fw-semibold">Quick Actions</h5></div>
            <div className="card-body pt-2">
              <div className="d-grid gap-2">
                <a className="btn btn-outline-secondary" href="/patient/documents/upload/">Upload Report</a>
                <a className="btn btn-outline-secondary" href="/patient/documents/">View Reports</a>
                <a className="btn btn-outline-secondary" href="/patient/profile/">Edit Profile</a>
                <a className="btn btn-outline-secondary" href="/patient/dashboard/">Legacy Dashboard</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mountEl = document.getElementById('patient-dashboard-root');
if (mountEl) {
  const root = createRoot(mountEl);
  root.render(<PatientDashboardApp />);
}
