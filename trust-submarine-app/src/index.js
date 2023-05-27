import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AboutPage from './AboutPage/AboutPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SearchPage from './SearchPage/SearchPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage/>,
  },
  {
    path: "/about",
    element: <AboutPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
