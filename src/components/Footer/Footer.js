import React from 'react'

export default function Footer() {
    return (
        <div>
            <div className="flex justify-center w-full mt-12 md:mt-16 bg-white border-t fixed bottom-0">
                <div className="flex items-center">
                    <span className="text-xs mb-0 p-3">&copy; {new Date().getFullYear()} by Jay. All rights reserved.</span>
                </div>
            </div>
        </div>
    )
}
