import axiosHelper from "../../services/axiosHelper";
import { resetLocalStorage } from "../../components/searchCard/searchCard";

export const getAllCards = async (req, res) => {
  try {
    return await axiosHelper.getRequest(`${process.env.NEXT_PUBLIC_API_URL}/payment/my_cards`);
  } catch (err) {
    console.log(err);
  }
};

export const postSecret = async (id) => {
  try {
    const response = await axiosHelper.postRequest(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/secret`, {
        card_id: id,
      });
    console.log(`response`, response);
    return response.client_secret;
  } catch (err) {
    console.log(err);
  }
};

export const addCard = async (form) => {
  try {
    const response = await axiosHelper.postRequest(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/add_card`,
      form
      // {
      //   number: "4242424242424242",
      //   exp_month: 12,
      //   exp_year: 2025,
      //   cvc: "111",
      // }
    );
    console.log(`response`, response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const removeCard = async (id) => {
  try {
    const response = await axiosHelper.postRequest(`${process.env.NEXT_PUBLIC_API_URL}/payment/remove_card`, {
      card_id: id,
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log("err", err);

    console.log(err);
  }
};

export const paymentSuccess = async (id) => {
  try {
    const response = await axiosHelper.getRequest(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/success`)
    alert("Trip has been Confirmed.")
  } catch (err) {
    console.log(err);
  }
};
