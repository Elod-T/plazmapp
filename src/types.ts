export interface User {
  id: string;
  firstname: string;
  lastname: string;
  appointment: string;
  centre: string;
  firstday: {
    date: string;
    name_of_day: string;
  };
  blood_donation_date: null;
  labTill: {
    labForbiddenTill: null;
    labProvisoryTill: null;
  };
  pphtotal: number;
  emailstat: number;
}

export interface Facility {
  code: string;
  name: string;
  image: string;
  contact_email: string;
  contact_phone: string;
  url: string;
  facebook: string;
  instagram: string;
  color: string;
  opening_times: string;
  address: string;
  description: null;
  about_us: string;
  friend_invite_text: null;
}

export interface Notification {
  reminder: number[];
  birthday: number;
  interval: number;
  blood_donation_reminder: string;
}

export interface AvailableCentrum {
  code: string;
  name: string;
  color: string;
  image_url: string;
}

export interface Settings {
  facility: Facility;
  notification: Notification;
  available_centrums: AvailableCentrum[];
}

export interface LoginResponse {
  user: User;
  settings: Settings;
  access_token: string;
}

export interface Centrum {
  id: number;
  code: string;
  alter_code: string;
  name: string;
  email: string;
  phone: string;
  url: string;
  facebook: string;
  instagram: string | null;
  image: string | null;
  color: string;
  zip: number;
  city: string;
  street_nr: string;
  address_info: string | null;
  lat: string;
  lng: string;
  opening_times: string;
  description: string | null;
  about_us: string | null;
  friend_invite_text: string | null;
  active: number;
  open: number;
  group_name: string | null;
  bd_group_name: string | null;
  privacy_policy_url: string;
  email_extends_text: string | null;
  examination_with_donor_number: number;
  coupon_code: number;
  email_body: string;
  sms_text: string;
  short_name: string | null;
  default_payment: number;
  custom_payments: Array<{ number: string; value: string }>;
  payment_text: string;
  _lft: number;
  _rgt: number;
  parent_id: number | null;
  image_url: string;
  address: string;
}

export interface AppointmentType {
  id: number;
  alias: string;
  name: string;
  donor: boolean;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    validate: string;
  }>;
  all_fields: Array<{
    name: string;
    label: string;
    type: string;
    validate: string;
  }>;
}

export interface Date {
  date: string;
  day_name: string;
  reserved: number;
  all_reserved: number;
  free: number;
  count: number;
  sum: number;
  reservations: null;
  removeable: null;
  add_times: null;
  past: null;
}

export interface BloodDonationResponse {
  centrum: Centrum;
  appointment_type: AppointmentType;
  dates: Date[];
  reservation: null;
  centrum_code: string;
}

export interface Reservation {
  id: string;
  start: string;
  centre: string;
  category: string;
  withexam: number;
  provisory: number;
}
export type ReservationsResponse = Reservation[];

export interface Day {
  day: string;
  name: string;
}

export interface Banner {
  desktop_image: string | null;
  desktop_image_url: string;
  name: string;
  phone_image: string | null;
  phone_image_url: string;
  tablet_image: string | null;
  tablet_image_url: string;
  link: string;
}

export interface OpenDaysResponse {
  opendays: Day[];
  restricted: boolean;
  banners: Banner[];
}

export type TimeSlotsResponse = string[];

export interface ReservationResponse {
  success: number;
  id: number;
  withexam: number;
}

export interface ModifyReservationResponse {
  success: number;
}

export interface Message {
  id: number;
  facility_code: string | null;
  system_messge: number;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
  pivot: {
    donor_id: number;
    message_id: number;
    seen: string;
    error: number;
    removed: null;
  };
}

export type MessagesResponse = Message[];
