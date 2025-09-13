import React from 'react'

const HeaderCard = ({
    title,
    value,
    subtitle,
    progress
}) => {
  return (
     <div className="overallCompletion-card border-2 hover:border-fuchsia-600 shadow-xl cursor-pointer  border-fuchsia-400 p-3 rounded-2xl my-5 min-w-1/5  grow min-h-[150px] text-white">
                    <p className="pb-5">{title}</p>
                    <h2 className="font-extrabold text-2xl">{value}</h2>
                    <p className="text-[14px] opacity-75">{subtitle}</p>
                    {progress !==undefined && (
                    <div className="progress-line bg-gray-300 h-3 flex items-center rounded mt-3">
                    <input type="range" name="" id=""  className="appearance-none w-[100%]" min={0} max={100} value={progress} readOnly/>
                    </div>
                    )}
     </div>
  )
}

export default HeaderCard