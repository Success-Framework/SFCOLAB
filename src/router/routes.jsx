import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../components/pages/Home.jsx";
import Layout from "../Layout/Layout.jsx";
import Project from "../components/pages/Project.jsx";
import Profile from "../components/pages/Profile.jsx";
import Dashboard from "../components/pages/dashboard.jsx";
import Ideation from "../components/pages/Ideation.jsx";
import Knowledge from "../components/pages/Knowledge.jsx";
import Setting from "../components/pages/Setting.jsx";
import ProfileSetting from "../components/pages/ProfileSetting.jsx";
import Preferences from "../components/pages/Preferences.jsx";
import AccountandSecurity from "../components/pages/AccountandSecurity.jsx";
import Login from "../components/auth/Login.jsx";
import SignUp from "../components/auth/SignUp.jsx";
import OAuthCallback from "../components/auth/OAuthCallback.jsx";
import RegisterStartUp from "../components/pages/RegisterStartUp.jsx";
import StartUp from "../components/pages/StartUp.jsx";
import HomedetailsPage from "../components/detailspage/HomedetailsPage.jsx";
import Idationdetails from "../components/detailspage/Idationdetails.jsx";
import Knowledgedetails from "../components/detailspage/Knowledgedetails.jsx";
import ProjectDetails from "../components/detailspage/ProjectDetails.jsx";
import StartUpdetails from "../components/detailspage/StartUpdetails.jsx";
import Help from "../components/pages/Help.jsx";
import ProjectManagement from "../components/pages/ProjectManagement.jsx";
import VideoTutorials from "../components/pages/VideoTutorials.jsx";
import Notifications from "../components/pages/Notifications.jsx";
import Chat from "../components/sections/Chat.jsx";
import NotFound from "../components/NotFound.jsx";
import { ProtectedRoute, AuthRoute } from "../components/ProtectedRoute.jsx";
import SavedList from "../components/pages/SavedIdeaList.jsx";

export const router = createBrowserRouter([
  // Authentication routes (accessible only when not logged in)
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <SignUp />
      </AuthRoute>
    ),
  },
  // OAuth callback route
  {
    path: "/auth/callback",
    element: <OAuthCallback />,
  },
  // Protected routes (accessible only when logged in)
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Project />,
      },
      {
  path: "/project-management",
  element: <ProjectManagement />,
},
{
  path: "/video-tutorials",
  element: <VideoTutorials />,
},

      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/ideation",
        element: <Ideation />,
      },
      {
        path: "/knowledge",
        element: <Knowledge />,
      },
      {
        path: "/setting",
        element: <Setting />,
        children: [
          {
            path: "/setting/",
            element: <ProfileSetting />,
          },
          {
            path: "/setting/preferences",
            element: <Preferences />,
          },
          {
            path: "/setting/account",
            element: <AccountandSecurity />,
          },
        ],
      },
      {
        path: "/saved",
        element: <SavedList />
      },
      {
        path: "/register-startup",
        element: <RegisterStartUp />,
      },
      {
        path: "/startup",
        element: <StartUp />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/home-details",
        element: <HomedetailsPage />,
      },
      {
        path: "/ideation-details",
        element: <Idationdetails />,
      },
      {
        path: "/knowledge-details",
        element: <Knowledgedetails />,
      },
      {
        path: "/project-details",
        element: <ProjectDetails />,
      },
      {
        path: "/startup-details",
        element: <StartUpdetails />,
      },
      {
        path: "/messages",
        element: <Chat />,
      },
    ]
  },
  // Catch all unmatched routes
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <NotFound />
      </ProtectedRoute>
    ),
  },
]);
