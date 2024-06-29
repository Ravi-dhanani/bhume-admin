import config from "../config";
import AuthServices from "./AuthServices";
import HttpService from "./HttpService";
const token = AuthServices.getToken();
class ApiServices {
  static register(data: any) {
    return HttpService.post(`${config.API_URL}/api/add_admin`, data);
  }

  static login(data: any) {
    let res = HttpService.post(`${config.API_URL}/api/login_admin`, data);
    return res;
  }

  static async getLstLanguage() {
    let res = await HttpService.get(
      `${config.API_URL}/api/get_language`,
      localStorage.token
    );
    return res.data;
  }

  static async getLstServices() {
    let res = await HttpService.get(
      `${config.API_URL}/api/get_services`,
      localStorage.token
    );
    return res.data;
  }

  static async add_language(data: { title: string }) {
    let res = await HttpService.post(
      `${config.API_URL}/api/add_language`,
      data,
      localStorage.token
    );
    return res;
  }

  static async add_Services(data: {
    langauge: string;
    title: string;
    shortDescription: string;
    longDescription: string;
  }) {
    let res = await HttpService.post(
      `${config.API_URL}/api/add_services`,
      data,
      localStorage.token
    );
    return res;
  }

  static async update_language(
    data?: { title: string; _id: string },
    _id?: string
  ) {
    let res = await HttpService.put(
      `${config.API_URL}/api/update_language/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }
  static async delete_language(_id?: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/delete_language/${_id}`,
      AuthServices.getToken()
    );
    return res;
  }

  static async getLstCareer() {
    let res = await HttpService.get(
      `${config.API_URL}/api/get_career`,
      localStorage.token
    );
    return res.data;
  }

  static async add_career(data: any) {
    let res = await HttpService.post(
      `${config.API_URL}/api/add_career`,
      data,
      localStorage.token
    );
    return res;
  }

  static async update_career(
    data?: {
      title: string;
      shortDescription: string;
      longDescription: string;
      date: string;
    },
    _id?: string
  ) {
    let res = await HttpService.put(
      `${config.API_URL}/api/update_career/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async update_Services(
    data?: {
      language: string;
      title: string;
      shortDescription: string;
      longDescription: string;
    },
    _id?: string
  ) {
    let res = await HttpService.put(
      `${config.API_URL}/api/update_services/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }
  static async delete_Career(_id?: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/delete_career/${_id}`,
      localStorage.token
    );
    return res;
  }
  static async delete_Services(_id?: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/delete_services/${_id}`,
      localStorage.token
    );
    return res;
  }

  static async delete_Enquiry(_id?: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/delete_enquiry/${_id}`,
      localStorage.token
    );
    return res;
  }

  static async getTitle(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/get_title/${_id}`,
      localStorage.token
    );
    return res.data;
  }

  static async getLanguage(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/get_language/${_id}`,
      localStorage.token
    );
    return res.data;
  }

  static async getEnquiry() {
    let res = await HttpService.get(`${config.API_URL}/api/get_enquiry`, token);
    return res.data;
  }

  static async add_title(data: {
    title: string;
    language_id: string;
    description: string;
  }) {
    let res = await HttpService.post(
      `${config.API_URL}/api/add_title`,
      data,
      localStorage.token
    );
    return res;
  }

  static async update_title(
    data?: {
      title: string;
    },
    _id?: string
  ) {
    let res = await HttpService.put(
      `${config.API_URL}/api/update_title/${_id}`,
      data,
      token
    );
    return res;
  }

  static async add_About(data?: {
    title: string;
    language: string;
    shortDescription: string;
    longDescription: string;
  }) {
    let res = await HttpService.post(
      `${config.API_URL}/api/add_about`,
      data,
      localStorage.token
    );
    return res;
  }
  static async get_about_data(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/get_about_data/${_id}`,
      localStorage.token
    );
    return res.data;
  }
  static async get_career_data(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/get_Career_data/${_id}`,
      localStorage.token
    );
    return res.data;
  }
  static async update_about(
    data?: {
      title: string;
      language: string;
      shortDescription: string;
      longDescription: string;
    },
    _id?: string
  ) {
    let res = await HttpService.put(
      `${config.API_URL}/api/update_about/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async getTermsCondition(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/get_termsCondition/${_id}`,
      localStorage.token
    );
    return res.data;
  }

  static async add_TermsCondition(data: { title: string; language: string }) {
    let res = await HttpService.post(
      `${config.API_URL}/api/add_termsCondition`,
      data,
      localStorage.token
    );
    return res;
  }

  static async update_TermsCondition(
    data?: {
      title: string;
    },
    _id?: string
  ) {
    let res = await HttpService.put(
      `${config.API_URL}/api/update_termsCondition/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async getPrivacyPolicy(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/get_privacyPolicy/${_id}`,
      localStorage.token
    );
    return res.data;
  }

  static async add_PrivacyPolicy(data: { title: string; language: string }) {
    let res = await HttpService.post(
      `${config.API_URL}/api/add_privacyPolicy`,
      data,
      localStorage.token
    );
    return res;
  }

  static async update_PrivacyPolicy(
    data?: {
      title: string;
    },
    _id?: string
  ) {
    let res = await HttpService.put(
      `${config.API_URL}/api/update_privacyPolicy/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }
}

export default ApiServices;
