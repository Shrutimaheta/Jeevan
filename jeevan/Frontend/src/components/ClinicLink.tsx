import { clinicUrl } from '../utils/clinicUrl';

export default function ClinicLink() {
  return <main className="container py-5" style={{maxWidth: 720}}>
    <h1>Welcome to Jeevan</h1>
    <p>Sign in to your clinic to book appointments, manage your profile and access your records.</p>
    <a className="btn btn-primary" href={clinicUrl()}>Open your clinic</a>
  </main>;
}
