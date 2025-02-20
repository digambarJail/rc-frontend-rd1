import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoutes from "./privateRoutes/Privateroutes";
import LandingPage from './Pages/LandingPage.jsx';
import Layout from './Layout/Layout.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import InstructionPage from './Pages/Instructions/InstructionPage.jsx';
import Leaderboard from './Pages/Leaderboard/Leaderboard.jsx';
import ResultPage from './Pages/Result/ResultPage.jsx';
import QuestionPage from './Pages/Questions/QuestionPage.jsx';
import Lifelines from './components/Lifelines/Lifelines.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      


      <Route element={<PrivateRoutes/>} >
      {/* <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/questions" element={<Questions />} /> */}
      <Route path="/instructions" element={<InstructionPage />} />
      <Route path="/questions" element={<QuestionPage />} />

      <Route path="/lifelines" element={<Lifelines />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/result" element={<ResultPage />} />
      

      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
);

