import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PageLoader from './Pages/PageLoader';

// import Login from './components/Authorization/Login';
// import Signup from './components/Authorization/Signup';
// import Directory from './Pages/Directory';
// import Home from './Pages/Home';
// import UserProfile from './Pages/UserProfile';
// import Admin from './Pages/Admin';

const Login = React.lazy(()=>import('./components/Authorization/Login'))
const Signup = React.lazy(()=>import('./components/Authorization/Signup'))
const Directory = React.lazy(()=>import('./Pages/Directory'))
const Home = React.lazy(()=>import('./Pages/Home'))
const UserProfile = React.lazy(()=>import('./Pages/UserProfile'))
const Admin = React.lazy(()=>import('./Pages/Admin'))

const LazyComponent = ({children})=>{
  return <React.Suspense fallback={<PageLoader />}>{children}</React.Suspense>
}

// const Router = () => {
//   return (
//     <Routes>
//       <Route path="/Home" element={<Home />} />
//       <Route path="/" element={<Login />} />
//       <Route path="/Signup" element={<Signup />} />
//       <Route path="/Directory" element={<Directory />} />
//       <Route path="/UserProfile" element={<UserProfile />} />
//       <Route path='/Admin' element={<Admin />} />
//     </Routes>
//   );
// };

const Router = () => {
  return (
    <Routes>
      <Route path="/Home" element={<LazyComponent><Home /></LazyComponent>} />
      <Route path="/" element={<LazyComponent><Login /></LazyComponent>} />
      <Route path="/Signup" element={<LazyComponent><Signup /></LazyComponent>} />
      <Route path="/Directory" element={<LazyComponent><Directory /></LazyComponent>} />
      <Route path="/UserProfile" element={<LazyComponent><UserProfile /></LazyComponent>} />
      <Route path='/Admin' element={<LazyComponent><Admin /></LazyComponent>} />
    </Routes>
  );
};


export default Router;


