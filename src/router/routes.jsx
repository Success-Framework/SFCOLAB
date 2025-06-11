import { createBrowserRouter } from "react-router-dom";
import Home from '../components/pages/Home.jsx'
import Layout from '../Layout/Layout.jsx'
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
import RegisterStartUp from "../components/pages/RegisterStartUp.jsx";

export const router = createBrowserRouter([
    {
        path:'/',
        element:(
            <Layout/>
        ),
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/projects',
                element:<Project/>
            },
            {
                path:'/profile',
                element:<Profile/>
            },
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/ideation',
                element:<Ideation/>
            },
            {
                path:'/knowledge',
                element:<Knowledge/>
            },
            {
                path:'/setting',
                element:<Setting/>,
                children:[
                    {
                        path:'/setting/',
                        element:<ProfileSetting/>
                    },
                    {
                        path:'/setting/preferences',
                        element:<Preferences/>
                    },
                    {
                        path:'/setting/account',
                        element:<AccountandSecurity/>
                    }
                ]
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<SignUp/>
            },
            {
                path:'/register-startup',
                element:<RegisterStartUp/>
            }
        ]
    }
]) 