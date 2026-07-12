"use client";

import React from 'react';
export default function ImageButton(props: any){
    const handleClick= () => {
        // Send user to instagram for post
        if(props.imageLocation){
            window.open(props.imageLocation);
        }
        if(props.href){
            window.open(props.href);
        }
    }
    return (
        <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat bg-blend-overlay"
            style={{
                backgroundImage:`url(${props.image}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.2))`
            }}>
            <button
                type="button"
                onClick={handleClick}
                className="h-full w-full bg-center bg-no-repeat transition-colors hover:bg-[rgba(255,255,255,0.1)]"
                style={{
                    backgroundImage:`url(${props.hoverIcon})`
                }}>
                    <span className="text-2xl normal-case text-white">{props.category}</span>
                </button>
        </div>
        
    )
}