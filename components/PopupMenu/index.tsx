"use client";

import { useState } from "react";

type Props = {
    menuItems:any[];
    buttonText:string;
    anchorOrigin:{vertical:string; horizontal:string};
    transformOrigin:{vertical:string; horizontal:string};
    itemFontSize:string;
}

export default function PopupMenu(props:Props){
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        setMenuOpen((prev) => !prev);
      };
  
      const handleMenuClose = () => {
        setMenuOpen(false);
      };

    return(
        <div className="relative">
        <button
            id="popup-button"
            aria-controls={menuOpen ? 'popup-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleClick}
            className="flex items-center gap-1 text-sm text-brand-primary"
            type="button"
        >
            {props.buttonText}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
            </svg>
        </button>
        {menuOpen ? (
            <div
                id="popup-menu"
                className="absolute left-0 top-full z-30 mt-2 min-w-[180px] rounded-md border border-slate-200 bg-white py-1 shadow-lg"
                role="menu"
                aria-labelledby="popup-button"
            >
                {props.menuItems.map((item, index) => {
                    return(
                        <button
                            type="button"
                            key={index}
                            data-value={item.value}
                            style={{fontSize:props.itemFontSize}}
                            className="block w-full px-3 py-2 text-left text-brand-primary hover:bg-slate-50"
                            onClick={handleMenuClose}
                        >
                            {item.title}
                        </button>
                    )
                })}
            </div>
        ) : null}
        </div>
        
    )
}