import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// ক: এখানে স্টোরকে ইম্পোর্ট করতে হবে : import{sotre} from "./app/store" অর্থাৎ স্টোর যেখানে আছে সেখান থেকে।
// খ : এবার প্রভিডেরকেও ইম্পোর্ট করতে হবে সেখানে : import {Provider} from "react-redux"
import { Provider } from "react-redux";
import { Store } from "./app/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* গ : এবার আপ এপ্লিকেশনকে প্রোভাইডার দিয়ে রেপ করে দিতে হবে : <Provider store={store}><App/></Provider> */}
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
