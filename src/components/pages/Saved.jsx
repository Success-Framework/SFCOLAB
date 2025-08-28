import { useState} from 'react'

 const Saved = () => {

  const [saved, setSaved] = useState([{  savedType: "" }])
  const [showRoleTypeDropdown, setShowRoleTypeDropdown] = useState({})

  const savedType = [
    "Saved Ideas",
    "Saved Start-Ups",
    "Saved Posts"
  ]


  return (
     <div className="min-h-screen bg-black text-white">
      <div className="w-full mx-auto">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold">Saved</h1>
            <p className="text-gray-400 text-sm">You can view your data here.</p>
          </div>

          <hr className="border-gray-800" />

          {/* Customize Experience */}
          <div className="flex gap-6 justify-between">
            <div className="w-1/2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium">Select a category</h2>
                <span className="text-gray-400 text-sm" title="Info">ℹ️</span>
              </div>
              <p className="text-gray-400 text-sm">
                You can view your saved ideas, start-ups, and posts.
              </p>
          {saved.map((save, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <div
                    role="combobox"
                    className="w-full px-3 py-2 border border-gray-700 rounded-md text-white focus:outline-none focus:border-gray-600 cursor-pointer"
                    tabIndex="0"
                    onClick={() => setShowRoleTypeDropdown({ ...showRoleTypeDropdown, [index]: !showRoleTypeDropdown[index] })}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setShowRoleTypeDropdown({ ...showRoleTypeDropdown, [index]: !showRoleTypeDropdown[index] })
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>{save.savedType || "Select Saved Data"}</span>
                      <span>▼</span>
                    </div>
                  </div>
                  {showRoleTypeDropdown[index] && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                      {savedType.map((type) => (
                        <div
                          key={type}
                          className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            const newSaved = [...saved]
                            newSaved[index].savedType = type
                            setSaved(newSaved)
                            setShowRoleTypeDropdown({ ...showRoleTypeDropdown, [index]: false })
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              </div>
          ))}
            </div>
          </div>

          <hr className="border-gray-800" />
        </div>
      </div>
    </div>
  
  )
}

export default Saved