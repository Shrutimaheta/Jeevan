// Utility type for flexible objects
export interface GenericObject<T = unknown> {
  [key: string]: T;
}

export interface CommonState {
  darkMode: boolean;
}
export interface RootState {
  headerCollapse: boolean; // Assuming headerCollapse is a boolean value
}
// Refactored TableData with specific types and fallback to generic
export interface TableData extends GenericObject<string | number | boolean | undefined> {
  by?: string;
  plan_type?: string;
  Apr?: number;
  Mar?: number;
  Feb?: number;
  Jan?: number;
  Dec?: number;
  Nov?: number;
  Oct?: number;
  Sep?: number;
  Aug?: number;
  Jul?: number;
  Jun?: number;
  dob?: string;
  parent?: string;
  refId?: string | number;
  mode?: string;
  datePaid?: string;
  discount?: number;
  fine?: number;
  balance?: number;
  medicalUsed?: number;
  medicalAvailable?: number;
  casualUsed?: number;
  casualAvailable?: number;
  maternityUsed?: number;
  maternityAvailable?: number;
  paternityUsed?: number;
  paternityAvailable?: number;
  specialUsed?: number;
  specialAvailable?: number;
  percent?: number;
  total?: number;
  envScience?: number;
  computer?: number;
  maths?: number;
  chemistry?: number;
  physics?: number;
  spanish?: number;
  english?: number;
  message?: string;
  contact?: string;
  dateAdded?: string;
  countryCode?: string;
  cityName?: string;
  stateName?: string;
  countryName?: string;
  comment?: string;
  review?: string;
  blog?: string;
  tags?: string; // Changed from string[] to string for index signature compatibility
  page?: string;
  slug?: string;
  rtl?: boolean;
  language?: string;
  allowAll?: boolean;
  delete?: boolean;
  edit?: boolean;
  modules?: string; // Changed from string[] to string for index signature compatibility
  createdBy?: string;
  dateOfJoined?: string;
  createdOn?: string;
  deleteRequestDate?: string;
  requisitionDate?: string;
  transactionDate?: string;
  planType?: string;
  providerName?: string;
  invoiceNumber?: string;
  method?: string;
  incomeName?: string;
  attendance?: string;
  notes?: string;
  classe?: string;
  rollNo?: string | number;
  admissionNo?: string | number;
  authority?: string;
  noofDays?: number;
  submittedBy?: string;
  sectionName?: string;
  sNo?: string;
  view?: boolean;
  salaryFor?: string;
  netSalary?: number;
  details?: string;
  holidayTitle?: string;
  Result?: string;
  Percent?: number;
  Total?: number;
  EnvScience?: number;
  Computer?: number;
  Maths?: number;
  Chemistry?: number;
  Physics?: number;
  Spanish?: number;
  English?: number;
  studentName?: string;
  submissionDate?: string;
  homeworkDate?: string;
  subject?: string;
  code?: string;
  subjectGroup?: string;
  noOfSubjects?: number;
  noOfStudents?: number;
  capacity?: string;
  reason?: string;
  role?: string;
  examName?: string;
  minMarks?: string;
  maxMarks?: string;
  route?: string;
  roomNo?: string;
  duration?: string;
  endTime?: string;
  startTime?: string;
  examDate?: string;
  gradePoints?: string;
  percentage?: string;
  grade?: string;
  dateOfJoin?: string;
  designation?: string;
  department?: string;
  id?: string | number;
  questions?: string;
  answers?: string;
  created_at?: string;
  name?: string;
  type?: string;
  progress?: string;
  members?: string;
  startDate?: string;
  endDate?: string;
  lead_name?: string;
  company_address?: string;
  pages?: string;
  page_slug?: string;
  phone?: string;
  company_name?: string;
  location?: string;
  Action?: string;
  rating?: string;
  owner?: string;
  created?: string;
  leadName?: string;
  companyName?: string;
  source?: string;
  leadOwner?: string;
  createdDate?: string;
  leadStatus?: string;
  email?: string;
  Stage?: string;
  Deal_Value?: string;
  close_date?: string;
  Probability?: string;
  Status?: string;
  created_date?: string;
  Deal_Name?: string;
  industry?: string;
  company?: string;
  wonDeals?: string;
  lostDeals?: string;
  dateCreated?: string;
  budgetValue?: string;
  currentlySpend?: string;
  pipelineStage?: string;
  client?: string;
  addedOn?: string;
  priority?: string;
  dueDate?: string;
  taskName?: string;
  assignedTo?: string;
  status?: string;
  createdAt?: string;
  driverLicenseNo?: string;
  title?: string;
  roleName?: string;
  paymentType?: string;
  createdat?: string;
  vehicle?: string;
  no_deal?: string;
  deal_value?: string;
  stage?: string;
  dealValue?: string;
  start_date?: string;
  end_date?: string;
  piority?: string;
  customer_no?: string;
  customer_name?: string;
  content?: string;
  userName?: string;
  position?: string;
  office?: string;
  age?: string;
  salary?: string;
  class?: string;
  section?: string;
  mark?: string;
  marks?: string;
  cgpa?: string;
  exams?: string;
  ownedMemberImgSrc?: string;
  imgSrc?: string;
  mobile?: string;
  action?: string;
  ownedMember?: string;
  size?: string;
  lastModified?: string;
  AdmissionNo?: string;
  RollNo?: string;
  DateofJoin?: string;
  noofBed?: string;
  DOB?: string;
  gender?: string;
  leaveType?: string;
  leaveDate?: string;
  noOfDays?: string;
  appliedOn?: string;
  jan?: string;
  feb?: string;
  mar?: string;
  apr?: string;
  may?: string;
  jun?: string;
  jul?: string;
  aug?: string;
  sep?: string;
  oct?: string;
  nov?: string;
  dec?: string;
  result?: string;
  promotion?: number;
  dateofJoin?: string;
  Child?: string;
  count?: string;
  expenseName?: string;
  description?: string;
  category?: string;
  date?: string;
  amount?: number;
  invoiceNo?: string;
  paymentMethod?: string;
  feesGroup?: string;
  feesCode?: string;
  present?: string;
  absent?: string;
  percentange?: string;
  absentPercentange?: string;
  feesType?: string;
  fineType?: string;
  fineAmount?: string;
  admNo?: string;
  lastDate?: string;
  student?: string;
  cardNo?: string;
  fname?: string;
  bookName?: string;
  bookNo?: string;
  publisher?: string;
  author?: string;
  rackNo?: string;
  qty?: string;
  available?: string;
  price?: string;
  postDate?: string;
  dateofIssue?: string;
  issueTo?: string;
  booksIssued?: string;
  bookReturned?: string;
  issueRemarks?: string;
  year?: string;
  coachName?: string;
  sports?: string;
  hostelName?: string;
  hostelType?: string;
  address?: string;
  inTake?: string;
  roomType?: string;
  routes?: string;
  pickupPoint?: string;
  vehicleNo?: string;
  gps?: string;
  chassisNo?: string;
  registrationNo?: string;
  madeofYear?: string;
  vehicleModel?: string;
  key?: string;
}

export interface status {
  text: string;
  status: string;
}

// Define a generic column type for tables
export interface TableColumn<T = unknown> {
  ID: string;
  title: string;
  dataIndex: keyof T | string;
  key: string;
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
  // Add more properties as needed for your table implementation
}

// Refactored DatatableProps to use generics
export interface DatatableProps<T = TableData> {
  columns: TableColumn<T>[];
  dataSource: T[];
  Selection?: boolean;
  searchText: string;
}

export interface CountriesData {
  name: string;
  countryName: string;
  countryId: string;
  startDate: string;
  endDate: string;
  countryCode: string;
}
export interface DealsInterface {
  dealName: string;
  stage: string;
  dealValue: string;
  tag1: string;
  closeDate: string;
  crearedDate: string;
  owner: string;
  status: string;
  probability: string;
}
export interface DeleteRequestInterface {
  id: number;
  si_no: string;
  select: string;
  customer_name: string;
  customer_image: string;
  customer_no: string;
  created: string;
  delete_request: string;
  Action: string;
}
export interface AppState {
  mouseOverSidebar: string;
}
