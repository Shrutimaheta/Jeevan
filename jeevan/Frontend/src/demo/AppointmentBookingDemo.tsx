import React, { useState } from 'react';
import AppointmentBooking from '@/components/AppointmentBooking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Stethoscope, 
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AppointmentBookingDemo: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  if (!showDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Patient Appointment Booking System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Modern, responsive appointment booking with ABHA ID integration
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  ABHA Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Optional ABHA ID creation with OTP verification and smart validation
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">OTP Verification</Badge>
                  <Badge variant="secondary">Smart Validation</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  Hospital Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dynamic hospital and doctor selection with real-time availability
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">Dynamic Loading</Badge>
                  <Badge variant="secondary">Real-time</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Smart Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Flexible date/time selection with business hours validation
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">Date Validation</Badge>
                  <Badge variant="secondary">Time Slots</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-red-600" />
                  Symptom Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Detailed symptom description with autocomplete suggestions
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">Autocomplete</Badge>
                  <Badge variant="secondary">Smart Suggestions</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  Patient Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Complete patient information with contact details and preferences
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">Contact Info</Badge>
                  <Badge variant="secondary">Preferences</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Instant confirmation with email/SMS notifications and print options
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">Email/SMS</Badge>
                  <Badge variant="secondary">Print</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Features */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Technical Features
              </CardTitle>
              <CardDescription>
                Built with modern technologies and best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Frontend Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>React 18</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>Tailwind CSS</Badge>
                    <Badge>Radix UI</Badge>
                    <Badge>Lucide Icons</Badge>
                    <Badge>Vite</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Responsive Design</Badge>
                    <Badge variant="secondary">Accessibility</Badge>
                    <Badge variant="secondary">Loading States</Badge>
                    <Badge variant="secondary">Error Handling</Badge>
                    <Badge variant="secondary">Form Validation</Badge>
                    <Badge variant="secondary">Progress Indicators</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Button */}
          <div className="text-center">
            <Button 
              onClick={() => setShowDemo(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Try the Demo
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Experience the full appointment booking flow
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Appointment Booking Demo
              </h2>
              <p className="text-sm text-gray-600">
                Interactive demonstration of the booking system
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowDemo(false)}
            >
              Back to Overview
            </Button>
          </div>
        </div>
      </div>
      
      <AppointmentBooking />
    </div>
  );
};

export default AppointmentBookingDemo;
