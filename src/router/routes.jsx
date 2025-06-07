import { createBrowserRouter } from "react-router-dom";
import Home from '../components/pages/Home.jsx'
import Layout from '../Layout/Layout.jsx'
import Project from "../components/pages/Project.jsx";
import Profile from "../components/pages/Profile.jsx";
import Dashboard from "../components/sections/dashboard.jsx";

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
            }
        ]
    }
]) 