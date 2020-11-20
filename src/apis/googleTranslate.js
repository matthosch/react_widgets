import axios from "axios";

export default axios.create({
  baseURL: "https://translation.googleapis.com/language/translate/v2",
  params: { key: process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY },
});
