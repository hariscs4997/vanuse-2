// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Axios from "axios";

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

function getMyItems(req, res) {
  try {
    const response = Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/item/category-wise/`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

const getAllNavMenus = (req, res) => {
  try {
    return Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/item/category-wise/`);
  } catch (err) {
    console.log(err);
  }
};

export { getMyItems, getAllNavMenus };
