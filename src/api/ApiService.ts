import axios from "axios";
import { error } from "console";

import { Feedback } from "../models/feedback";
import { UserLogInCredentials } from "../models/userLogInCredentials";
import { UserRegistrationCredentials } from "../models/userRegistrationCredentials";
import { SellerExistCredential } from "../models/sellerExistCredential";

export class ApiService {
  async userLogin(userCredentials: UserLogInCredentials) {
    return axios.post(`https://alexeygrinch.pythonanywhere.com/api/login/`, userCredentials)
      .then(res => {

        const dataUser = res.data;

        return dataUser
      })
      .catch(error => {
        return error
      })
  }

  async userRegistration(userRegistrationCredentials: UserRegistrationCredentials) {
    return axios.post(`https://alexeygrinch.pythonanywhere.com/api/register/`, userRegistrationCredentials)
      .then(res => {
        return res
      })
      .catch(err => {
        if (err.response) {
          console.log("err.response");
          const error = err
          return error
        } else if (err.request) {
          console.log("err.request");
          console.log(err);
        } else {
          console.log(err);
        }
      })

  }

  saveFeedback(feedBack: Feedback) {
    axios.post(`https://alexeygrinch.pythonanywhere.com/api/feedback/`, feedBack)
      .then((res) => alert("Отзыв принят"))
      .catch(error => console.log(error))
  }

  getFeedbacks() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/feedback/`)
      .then((res) => { return res.data; })
      .catch(error => console.log(error))
  }
  async getGames() {
    return axios.get(`https://alexeygrinch.pythonanywhere.com/api/games/`)
      .then((res) => {
        const data = res.data
        return data;
      })
      .catch(error => console.log(error))
  }
  async sellerExist(sellerExistCredential: SellerExistCredential) {
    axios.post(`https://alexeygrinch.pythonanywhere.com/api/is_seller_for_exist/`, sellerExistCredential)
      .then(res => console.log(res))
      .catch(error => console.log(error))

  }
}