import { FaArrowLeft } from "react-icons/fa";

const TeamCollaboration = () => {

    return (
        <>
            <a href="/help">
                <button className="my-7 border w-[3rem] h-[2rem] justify-center items-center rounded flex hover:bg-white hover:text-black">
                    <FaArrowLeft/>
                </button> 
            </a> 
            <div className="text-white">
                <div className="space-y-3">
                        <h1 className=" text-2xl font-bold">TEAM COLLABORATIONS!!</h1>
                        <p className="mb-4">Great collaboration is the key to successful projects. This guide will show you how to effectively communicate and work together using SFcollab's collaboration features.</p>
                </div> 
                
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Real-time Collaboration Features</h2>
                <p className="mb-4 text-1xl font-semibold">SFcollab offers several tools for seamless teamwork:</p>
                <ul className="list-disc pl-5 mb-6">
                    <li className="mb-2"><strong>Live Editing:</strong> Multiple team members can work on documents simultaneously</li>
                    <li className="mb-2"><strong>Comments & Mentions:</strong> Provide feedback and notify specific teammates</li>
                    <li className="mb-2"><strong>Version History:</strong> Track changes and revert to previous versions if needed</li>
                    <li><strong>File Sharing:</strong> Easily share documents, images, and other files</li>
                </ul>
            </div>
        </>        
    )
}

  
export default  TeamCollaboration

