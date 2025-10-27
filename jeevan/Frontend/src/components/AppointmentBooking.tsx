import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Stethoscope, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ExternalLink,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';

// Types
interface Hospital {
  id: string;
  name: string;
  location: string;
  specialties: string[];
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
}

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

interface ABHAData {
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  mobileNumber: string;
  otp: string;
}

const AppointmentBooking: React.FC = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isABHAModalOpen, setIsABHAModalOpen] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [abhaData, setABHAData] = useState<ABHAData>({
    name: '',
    dob: '',
    gender: '',
    aadhaarNumber: '',
    mobileNumber: '',
    otp: ''
  });
  
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    abhaId: '',
    hospitalId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    symptoms: '',
    paymentMode: '',
    needsAbha: false
  });

  // Mock data - replace with actual API calls
  const [hospitals] = useState<Hospital[]>([
    { id: '1', name: 'Jeevan Multi-Specialist Hospital', location: 'Mumbai', specialties: ['Cardiology', 'Neurology', 'Orthopedics'] },
    { id: '2', name: 'Aarogya Healthcare', location: 'Delhi', specialties: ['General Medicine', 'Pediatrics', 'Gynecology'] },
    { id: '3', name: 'Sanjeevani Medical Center', location: 'Bangalore', specialties: ['Dermatology', 'Ophthalmology', 'ENT'] }
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Load doctors when hospital is selected
  useEffect(() => {
    if (appointmentData.hospitalId) {
      const hospital = hospitals.find(h => h.id === appointmentData.hospitalId);
      setSelectedHospital(hospital || null);
      
      // Mock doctors data - replace with actual API call
      const mockDoctors: Doctor[] = [
        { id: '1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', experience: '10 years', rating: 4.8 },
        { id: '2', name: 'Dr. Michael Chen', specialization: 'Neurology', experience: '8 years', rating: 4.9 },
        { id: '3', name: 'Dr. Emily Davis', specialization: 'Orthopedics', experience: '12 years', rating: 4.7 }
      ];
      setDoctors(mockDoctors);
    }
  }, [appointmentData.hospitalId, hospitals]);

  // Handle ABHA creation
  const handleABHACreation = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to ABHA sandbox
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock ABHA ID
      const mockABHAId = `ABHA${Math.random().toString(36).substr(2, 10).toUpperCase()}`;
      
      setAppointmentData(prev => ({
        ...prev,
        abhaId: mockABHAId,
        needsAbha: false
      }));
      
      setIsABHAModalOpen(false);
      toast.success('ABHA ID created successfully!');
      
    } catch (error) {
      toast.error('Failed to create ABHA ID. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleOTPVerification = async () => {
    setIsLoading(true);
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsOTPSent(true);
      toast.success('OTP sent to your mobile number');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle appointment booking
  const handleAppointmentBooking = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Appointment booked successfully!');
      setCurrentStep(4); // Show confirmation
      
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Continue without ABHA
  const handleContinueWithoutABHA = () => {
    setAppointmentData(prev => ({
      ...prev,
      needsAbha: true,
      abhaId: ''
    }));
    setCurrentStep(2);
    toast.info('You can link your ABHA ID later for seamless health record management.');
  };

  const steps = [
    { id: 1, title: 'ABHA ID', description: 'Link your health ID' },
    { id: 2, title: 'Details', description: 'Patient information' },
    { id: 3, title: 'Appointment', description: 'Schedule your visit' },
    { id: 4, title: 'Confirmation', description: 'Booking confirmed' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h1>
          <p className="text-gray-600">
            Schedule your medical appointment with our healthcare providers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: ABHA ID Selection */}
        {currentStep === 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                ABHA ID (Ayushman Bharat Health Account)
              </CardTitle>
              <CardDescription>
                Link your ABHA ID for seamless health record management across healthcare providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  ABHA ID helps you access your health records across different healthcare providers and enables better continuity of care.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Create ABHA ID */}
                <Dialog open={isABHAModalOpen} onOpenChange={setIsABHAModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-32 flex flex-col items-center justify-center space-y-2 bg-green-50 hover:bg-green-100 border-green-200">
                      <Shield className="w-8 h-8 text-green-600" />
                      <span className="font-semibold text-green-800">Create ABHA ID</span>
                      <span className="text-sm text-green-600">Get your health ID now</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create Your ABHA ID</DialogTitle>
                      <DialogDescription>
                        Fill in your details to create your Ayushman Bharat Health Account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="abha-name">Full Name</Label>
                          <Input
                            id="abha-name"
                            value={abhaData.name}
                            onChange={(e) => setABHAData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="abha-dob">Date of Birth</Label>
                          <Input
                            id="abha-dob"
                            type="date"
                            value={abhaData.dob}
                            onChange={(e) => setABHAData(prev => ({ ...prev, dob: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="abha-gender">Gender</Label>
                          <Select value={abhaData.gender} onValueChange={(value) => setABHAData(prev => ({ ...prev, gender: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="abha-mobile">Mobile Number</Label>
                          <Input
                            id="abha-mobile"
                            value={abhaData.mobileNumber}
                            onChange={(e) => setABHAData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                            placeholder="Enter mobile number"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="abha-aadhaar">Aadhaar Number / Driving License</Label>
                        <Input
                          id="abha-aadhaar"
                          value={abhaData.aadhaarNumber}
                          onChange={(e) => setABHAData(prev => ({ ...prev, aadhaarNumber: e.target.value }))}
                          placeholder="Enter Aadhaar number or driving license"
                        />
                      </div>

                      {isOTPSent && (
                        <div>
                          <Label htmlFor="abha-otp">OTP Verification</Label>
                          <div className="flex gap-2">
                            <Input
                              id="abha-otp"
                              value={abhaData.otp}
                              onChange={(e) => setABHAData(prev => ({ ...prev, otp: e.target.value }))}
                              placeholder="Enter OTP"
                            />
                            <Button onClick={handleOTPVerification} disabled={isLoading}>
                              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                            </Button>
                          </div>
                        </div>
                      )}

                      {!isOTPSent && (
                        <Button onClick={handleOTPVerification} className="w-full">
                          Send OTP
                        </Button>
                      )}

                      <div className="flex gap-2">
                        <Button 
                          onClick={handleABHACreation} 
                          disabled={isLoading || !isOTPSent}
                          className="flex-1"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              Creating ABHA ID...
                            </>
                          ) : (
                            'Create ABHA ID'
                          )}
                        </Button>
                        <Button variant="outline" onClick={() => setIsABHAModalOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Continue Without ABHA */}
                <Button 
                  variant="outline" 
                  className="h-32 flex flex-col items-center justify-center space-y-2"
                  onClick={handleContinueWithoutABHA}
                >
                  <User className="w-8 h-8 text-gray-600" />
                  <span className="font-semibold text-gray-800">Continue Without ABHA</span>
                  <span className="text-sm text-gray-600">Book appointment now</span>
                </Button>
              </div>

              {appointmentData.abhaId && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>ABHA ID Linked:</strong> {appointmentData.abhaId}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Patient Details */}
        {currentStep === 2 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Patient Information
              </CardTitle>
              <CardDescription>
                Provide your contact details for appointment confirmation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient-name">Full Name</Label>
                  <Input
                    id="patient-name"
                    value={appointmentData.patientName}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, patientName: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="patient-email">Email Address</Label>
                  <Input
                    id="patient-email"
                    type="email"
                    value={appointmentData.patientEmail}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, patientEmail: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="patient-phone">Phone Number</Label>
                <Input
                  id="patient-phone"
                  value={appointmentData.patientPhone}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, patientPhone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>

              {appointmentData.needsAbha && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You can link your ABHA ID later for seamless health record management.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep(3)}>
                  Continue to Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Appointment Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Hospital Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Select Hospital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={appointmentData.hospitalId} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, hospitalId: value, doctorId: '' }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{hospital.name}</div>
                            <div className="text-sm text-gray-500">{hospital.location}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedHospital && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">{selectedHospital.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <MapPin className="w-4 h-4" />
                      {selectedHospital.location}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {selectedHospital.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Doctor Selection */}
            {appointmentData.hospitalId && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Select Doctor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={appointmentData.doctorId} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, doctorId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-sm text-gray-500">{doctor.specialization} • {doctor.experience}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedDoctor && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">{selectedDoctor.name}</h4>
                      <div className="text-sm text-green-700">{selectedDoctor.specialization} • {selectedDoctor.experience}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-green-700">{selectedDoctor.rating}/5</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Date and Time */}
            {appointmentData.doctorId && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Schedule Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="appointment-date">Date</Label>
                      <Input
                        id="appointment-date"
                        type="date"
                        value={appointmentData.appointmentDate}
                        onChange={(e) => setAppointmentData(prev => ({ ...prev, appointmentDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="appointment-time">Time</Label>
                      <Select value={appointmentData.appointmentTime} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, appointmentTime: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => {
                            const hour = 8 + Math.floor(i / 2);
                            const minute = i % 2 === 0 ? '00' : '30';
                            const time = `${hour.toString().padStart(2, '0')}:${minute}`;
                            return (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Symptoms and Payment */}
            {appointmentData.appointmentTime && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                    <Textarea
                      id="symptoms"
                      value={appointmentData.symptoms}
                      onChange={(e) => setAppointmentData(prev => ({ ...prev, symptoms: e.target.value }))}
                      placeholder="Describe your symptoms or reason for the appointment..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="payment-mode">Payment Mode</Label>
                    <Select value={appointmentData.paymentMode} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, paymentMode: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleAppointmentBooking} disabled={isLoading} className="w-full md:w-auto">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Booking Appointment...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Book Appointment
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                Appointment Confirmed!
              </CardTitle>
              <CardDescription>
                Your appointment has been successfully booked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Success!</strong> Your appointment has been booked successfully. You will receive a confirmation email and SMS shortly.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Appointment Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>{appointmentData.patientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span>{selectedHospital?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-gray-500" />
                        <span>{selectedDoctor?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{appointmentData.appointmentDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{appointmentData.appointmentTime}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{appointmentData.patientEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{appointmentData.patientPhone}</span>
                      </div>
                      {appointmentData.abhaId && (
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-gray-500" />
                          <span>{appointmentData.abhaId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {appointmentData.needsAbha && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>ABHA ID Not Linked:</strong> You can link your ABHA ID later for seamless health record management. 
                      <Button variant="link" className="p-0 h-auto ml-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Create ABHA ID
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Book Another Appointment
                  </Button>
                  <Button onClick={() => window.print()}>
                    Print Confirmation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
