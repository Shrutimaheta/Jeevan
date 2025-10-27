# Patient Appointment Booking Component

A comprehensive React component for patient appointment booking with integrated ABHA ID handling, built with modern UI components and responsive design.

## Features

### 🎯 **ABHA ID Integration**
- **Optional ABHA ID**: Users can choose to create ABHA ID or continue without it
- **ABHA Creation Modal**: Complete form for ABHA ID creation with OTP verification
- **Smart Validation**: Real-time ABHA ID format validation
- **Fallback Handling**: Internal patient codes for users without ABHA

### 🏥 **Appointment Booking**
- **Multi-step Process**: Guided 4-step booking process
- **Hospital Selection**: Dynamic hospital and doctor selection
- **Date/Time Picker**: Flexible appointment scheduling
- **Payment Integration**: Multiple payment mode options
- **Symptom Tracking**: Detailed symptom description

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Progress Indicators**: Visual step progression
- **Loading States**: Professional loading animations
- **Success Feedback**: Confirmation and success messages
- **Accessibility**: ARIA-compliant components

## Component Structure

```
AppointmentBooking/
├── AppointmentBooking.tsx     # Main component
├── hooks/
│   ├── useABHA.ts            # ABHA ID management
│   └── useAppointment.ts     # Appointment booking logic
├── ui/                       # Reusable UI components
│   ├── card.tsx
│   ├── button.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── dialog.tsx
│   └── ...
└── README.md                 # Documentation
```

## Usage

### Basic Implementation

```tsx
import AppointmentBooking from '@/components/AppointmentBooking';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppointmentBooking />
    </div>
  );
}
```

### With Custom Styling

```tsx
import AppointmentBooking from '@/components/AppointmentBooking';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AppointmentBooking />
    </div>
  );
}
```

## API Integration

### ABHA API Hooks

The component includes hooks for ABHA API integration:

```tsx
import { useABHA } from '@/hooks/useABHA';

const {
  isLoading,
  error,
  sendOTP,
  verifyOTP,
  createABHA,
  validateABHAId,
  checkABHAStatus
} = useABHA();
```

### Appointment API Hooks

```tsx
import { useAppointment } from '@/hooks/useAppointment';

const {
  isLoading,
  error,
  bookAppointment,
  validateAppointmentData,
  checkAvailability,
  getAppointmentDetails
} = useAppointment();
```

## Configuration

### Environment Variables

```env
# ABHA API Configuration
REACT_APP_ABHA_BASE_URL=https://abha.abdm.gov.in/api
REACT_APP_ABHA_SANDBOX=true

# Backend API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_API_TOKEN=your_api_token
```

### API Endpoints

The component expects the following API endpoints:

#### ABHA API Endpoints
- `POST /abha/send-otp` - Send OTP for ABHA creation
- `POST /abha/verify-otp` - Verify OTP
- `POST /abha/create` - Create ABHA ID
- `GET /abha/status/{abhaId}` - Check ABHA status

#### Appointment API Endpoints
- `GET /hospitals` - Get list of hospitals
- `GET /doctors?hospital_id={id}` - Get doctors by hospital
- `POST /appointments` - Book appointment
- `GET /appointments/{id}` - Get appointment details
- `GET /appointments/availability` - Check availability

## State Management

### Appointment Data Structure

```typescript
interface AppointmentData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  abhaId?: string;
  hospitalId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  symptoms: string;
  paymentMode: string;
  needsAbha: boolean;
}
```

### ABHA Data Structure

```typescript
interface ABHAData {
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  mobileNumber: string;
  otp: string;
}
```

## Customization

### Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
// Custom color scheme
<AppointmentBooking className="bg-custom-gradient" />

// Custom step colors
const customSteps = [
  { id: 1, title: 'ABHA ID', color: 'bg-green-600' },
  { id: 2, title: 'Details', color: 'bg-blue-600' },
  // ...
];
```

### Validation Rules

Customize validation rules in the hooks:

```tsx
// Custom ABHA validation
const validateABHAId = (abhaId: string): boolean => {
  // Your custom validation logic
  return /^[A-Z0-9]{14}$/i.test(abhaId);
};
```

## Error Handling

### Error States

The component handles various error states:

- **Network Errors**: API connection failures
- **Validation Errors**: Form validation failures
- **ABHA Errors**: ABHA ID creation/verification failures
- **Appointment Errors**: Booking failures

### Error Messages

Customize error messages:

```tsx
const errorMessages = {
  network: 'Network error. Please check your connection.',
  validation: 'Please fill in all required fields.',
  abha: 'ABHA ID creation failed. Please try again.',
  appointment: 'Appointment booking failed. Please try again.'
};
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentBooking from '@/components/AppointmentBooking';

test('renders appointment booking form', () => {
  render(<AppointmentBooking />);
  expect(screen.getByText('Book Your Appointment')).toBeInTheDocument();
});
```

### Integration Tests

```tsx
test('completes appointment booking flow', async () => {
  render(<AppointmentBooking />);
  
  // Test ABHA selection
  fireEvent.click(screen.getByText('Continue Without ABHA'));
  
  // Test form filling
  fireEvent.change(screen.getByLabelText('Full Name'), {
    target: { value: 'John Doe' }
  });
  
  // Test submission
  fireEvent.click(screen.getByText('Book Appointment'));
  
  expect(screen.getByText('Appointment Confirmed!')).toBeInTheDocument();
});
```

## Performance

### Optimization Features

- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Debounced Input**: Debounced form validation
- **Code Splitting**: Dynamic imports for large components

### Bundle Size

The component is optimized for minimal bundle size:

- **Tree Shaking**: Unused code elimination
- **Dynamic Imports**: Lazy loading of heavy dependencies
- **Minimal Dependencies**: Only essential dependencies included

## Accessibility

### ARIA Compliance

- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus handling
- **Color Contrast**: WCAG AA compliant colors

### Accessibility Features

```tsx
// ARIA labels
<Button aria-label="Create ABHA ID">
  <Shield className="w-5 h-5" />
  Create ABHA ID
</Button>

// Screen reader support
<div role="alert" aria-live="polite">
  {error && <span>{error}</span>}
</div>
```

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Responsive**: Works on all screen sizes
- **Progressive Enhancement**: Graceful degradation for older browsers

## Contributing

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Code Style

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Git hooks for quality

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:

- **Documentation**: Check this README
- **Issues**: Create GitHub issues
- **Discussions**: Use GitHub discussions
- **Email**: support@example.com
