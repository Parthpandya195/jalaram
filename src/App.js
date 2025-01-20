import './App.css';
import { Contact } from './contact/contact';
import { Header } from './headerFooter/header';
import { Footer } from './headerFooter/footer';
import { RestrictedPage } from './restrictedPage/restricted';
import { PricingPlan } from './pricingPlan/pricingPlan';
import { Faq } from './faq/faq';
import { ProjectDetails } from './projectDetails/projectDetails';
import { Team } from './team/team';
import { TeamSingle } from './teamSingle/teamSingle';
import { About } from './about/about';
import { NotFound } from './404/404';
import { BlogDetails } from './blogDetails/blogDetails';
import { Services } from './servicesPage/services';
import { ServiceSingle } from './serviceSingle/serviceSingle';
import { Home } from './home/home';
import { Blog } from './blog/blog';
import { Project } from './project/project';
import { Terms } from './Allterms/terms';
import { Cookies } from './Allterms/cookies';
import { Privacy } from './Allterms/privacy';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import { SmoothScroll } from './smooth';
import LoginPage from './userLogin/Login';
import Signup from './userLogin/signUp';
import AdminDashboard from './admin/pages/AdminDashboard';
import UserDashboard from './user/pages/UserDashboard';

function Layout({ children }) {
  const location = useLocation();

  // Define routes where Header and Footer are not needed
  const noHeaderFooterRoutes = ['/login','/signup'];

  const shouldRenderHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {shouldRenderHeaderFooter && <Header />}
      {children}
      {shouldRenderHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <Layout>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/restricted-page" element={<RestrictedPage />} />
          <Route path="/pricing" element={<PricingPlan />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team-single" element={<TeamSingle />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/error" element={<NotFound />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-single" element={<ServiceSingle />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies-policy" element={<Cookies />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
