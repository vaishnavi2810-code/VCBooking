import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import App from "./App";
import Layout2 from './Layout2'
import NewBooking from './NewBooking'
import MyBooking from './MyBooking'
import Profile from './Profile'
import LoginActivity from './LoginActivity'
import ResetPassword from './ResetPassword'
import ForgotPassword from './ForgotPassword'
import AdminLogin from './AdminLogin'
import Layout3 from './Layout3'
import BookingGrid from './BookingGrid'
import TodayVC from './TodayVC'
import ScheduledVC from './ScheduledVC'
import CompletedVC from './CompleteVC'
import Mathan from './Mathan'
import GMB from './GMB'
import Maskfab from './Maskfab'
export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<App />} />
          <Route path="adminLogin" element={<AdminLogin />} />
          <Route path="resetPassword/:token" element={<ResetPassword/>}/>
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="booking" element={<Layout2 />} >
          <Route index element={<NewBooking />} />
          <Route path="newbooking" element={<NewBooking />} />
          <Route path="mybooking" element={<MyBooking />} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="loginactivity" element={<LoginActivity/>}/>
          </Route>
          <Route path="bookingGrid" element={<Layout3 />} >
          <Route index element={<BookingGrid />} />
          <Route path="todayVcs" element={<TodayVC />} />
          <Route path="scheduledVcs" element={<ScheduledVC />} />
          <Route path="completedVcs" element={<CompletedVC />} />
          <Route path="manthan" element={<Mathan />} />
          <Route path="gmb" element={<GMB />} />
          <Route path="maskfab" element={<Maskfab />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);