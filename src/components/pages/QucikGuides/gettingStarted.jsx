import { FaArrowLeft } from "react-icons/fa";


const GettingStarted = () => {
    return (
        <>            
           <a href="/help">
                <button className="my-7 border w-[3rem] h-[2rem] justify-center items-center rounded flex hover:bg-white hover:text-black">
                    <FaArrowLeft/>
                </button> 
            </a>                               
            <div className=" text-white">
                <div className="space-y-3">
                    <h1 className=" text-2xl font-bold">GETTING STARTED!</h1>
                    <p className="text-white">Welcome to SFcollab! This guide will help you set up your account and start collaborating with your team in no time.</p>
                </div>                
                
                <h2 className="text-2xl text-white font-bold mt-8 mb-4">Creating Your Account</h2>
                <p className="mb-4 ">To get started with SFcollab, you need to create an account. Follow these simple steps:</p>
                <ul className="list-disc pl-5 mb-6">
                    <li className="mb-2">Visit our signup page and enter your email address</li>
                    <li className="mb-2">Check your email for a verification link</li>
                    <li className="mb-2">Create a secure password</li>
                    <li>Complete your profile with your name and photo</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Setting Up Your First Project</h2>
                <p className="mb-4">Once your account is created, it's time to set up your first project:</p>
                <ul className="list-disc pl-5 mb-6">
                    <li className="mb-2">Click on the "Create New Project" button on your dashboard</li>
                    <li className="mb-2">Give your project a descriptive name</li>
                    <li className="mb-2">Add a project description to help team members understand the goals</li>
                    <li>Set the project visibility (private or team-wide)</li>
                </ul>
            </div>
        </>
    )
}

export default GettingStarted