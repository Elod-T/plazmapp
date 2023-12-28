import axios from "axios";
import qs from "qs";
import type {
  User,
  Settings,
  LoginResponse,
  BloodDonationResponse,
  ReservationsResponse,
  OpenDaysResponse,
  TimeSlotsResponse,
  ReservationResponse,
  ModifyReservationResponse,
  MessagesResponse,
} from "./types";

interface Props {
  accessToken?: string;
  birthDate?: string;
  donor_number?: string;
}

interface SavedState {
  user: User;
  settings: Settings;
  access_token: string;
}

class PlazmAPP {
  private APP_VERSION = "1.3.9";
  private PLATFORM = "android";

  private BASE_URL = "https://app.plazmapont.hu/api";
  private QUERYSTRING_URL = `?app_version=${this.APP_VERSION}&platform=${this.PLATFORM}`;

  private LOGIN_URL = `${this.BASE_URL}/login`;
  private REFRESH_URL = `${this.BASE_URL}/refresh${this.QUERYSTRING_URL}`;
  private BLOOD_DONATION_URL = `${this.BASE_URL}/blood_donation${this.QUERYSTRING_URL}`;
  private RESERVATIONS_URL = `${this.BASE_URL}/reservations${this.QUERYSTRING_URL}`;
  private OPEN_DAYS_URL = `${this.BASE_URL}/opendays${this.QUERYSTRING_URL}`;
  private TIMESLOTS_URL = (date: string) => {
    return `${this.BASE_URL}/timeslots/${date}${this.QUERYSTRING_URL}`;
  };
  private RESERVATION_URL = `${this.BASE_URL}/reservation`;
  private MODIFY_RESERVATION_URL = (reservationId: string) => {
    return `${this.BASE_URL}/reservation/${reservationId}`;
  };
  private MESSAGES_URL = `${this.BASE_URL}/messages${this.QUERYSTRING_URL}`;

  private ACCESS_TOKEN = "";
  private USER: User | null = null;
  private SETTINGS: Settings | null = null;

  constructor() {
    this.loadState();
  }

  getUser() {
    return this.USER;
  }

  getSettings() {
    return this.SETTINGS;
  }

  loadState() {
    const state = localStorage.getItem("state");

    if (state) {
      const savedState = JSON.parse(state) as SavedState;
      this.ACCESS_TOKEN = savedState.access_token;
      this.USER = savedState.user;
      this.SETTINGS = savedState.settings;
    }
  }

  saveState() {
    const state = {
      user: this.USER,
      settings: this.SETTINGS,
      access_token: this.ACCESS_TOKEN,
    };

    localStorage.setItem("state", JSON.stringify(state));
  }

  logout() {
    localStorage.removeItem("state");
    window.location.reload();
  }

  async login({
    date_of_birth,
    donor_number,
  }: {
    date_of_birth: string;
    donor_number: string;
  }) {
    const data = qs.stringify({
      app_version: this.APP_VERSION,
      date_of_birth: date_of_birth,
      donor_number: donor_number,
      platform: this.PLATFORM,
    });

    const config = {
      method: "post",
      url: this.LOGIN_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    };
    console.log(config);

    const response = await axios(config);

    this.ACCESS_TOKEN = response.data.access_token;
    this.USER = response.data.user;
    this.SETTINGS = response.data.settings;

    this.saveState();

    return response.data as LoginResponse;
  }

  async refresh() {
    const config = {
      method: "post",
      url: this.REFRESH_URL,
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      },
    };

    const response = await axios(config);

    this.ACCESS_TOKEN = response.data.access_token;
    this.USER = response.data.user;
    this.SETTINGS = response.data.settings;

    this.saveState();

    return response.data as LoginResponse;
  }

  async getBloodDonation() {
    const config = {
      method: "get",
      url: this.BLOOD_DONATION_URL,
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      },
    };

    const response = await axios(config);

    return response.data as BloodDonationResponse;
  }

  async getMyReservations() {
    const config = {
      method: "get",
      url: this.RESERVATIONS_URL,
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      },
    };

    const response = await axios(config);

    return response.data as ReservationsResponse;
  }

  async getOpenDays() {
    const config = {
      method: "get",
      url: this.OPEN_DAYS_URL,
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      },
    };

    const response = await axios(config);

    return response.data as OpenDaysResponse;
  }

  async getTimeslots(date: string) {
    const config = {
      method: "get",
      url: this.TIMESLOTS_URL(date),
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      },
    };

    const response = await axios(config);

    return response.data as TimeSlotsResponse;
  }

  async reserve(date: string) {
    const data = qs.stringify({
      app_version: this.APP_VERSION,
      datetime: date,
      platform: this.PLATFORM,
    });

    const config = {
      method: "post",
      url: this.RESERVATION_URL,
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    };

    const response = await axios(config);

    return response.data as ReservationResponse;
  }

  async cancelReservation({ reservationId }: { reservationId: string }) {
    const data = qs.stringify({
      _method: "delete",
      app_version: this.APP_VERSION,
      platform: this.PLATFORM,
    });

    const config = {
      method: "post",
      url: this.MODIFY_RESERVATION_URL(reservationId),
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      },
      data,
    };

    const response = await axios(config);

    return response.data as ModifyReservationResponse;
  }

  async getMyMessages() {
    const config = {
      method: "get",
      url: this.MESSAGES_URL,
      headers: {
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      },
    };

    const response = await axios(config);

    return response.data as MessagesResponse;
  }
}

export default PlazmAPP;
