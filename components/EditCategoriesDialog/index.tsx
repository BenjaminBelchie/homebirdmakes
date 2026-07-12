import { useState } from "react";

type Props = {
    open:boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    categories:any[]
}

export default function EditCategoriesDialog(props:Props){
    const [addCategory, setAddCategory] = useState(false);

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleAddCategory = () => {
        setAddCategory(true);
    }

    if (!props.open) {
        return null;
    }

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-[600px] rounded-md bg-white p-4 shadow-xl sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-xl">Current Categories</h2>
                    <button aria-label="close" className="text-slate-500" onClick={handleClose} type="button">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M6 6l12 12M18 6 6 18" />
                        </svg>
                    </button>
                </div>
                <div className="mb-2 h-px w-full bg-slate-200" />
                <div className="flex flex-col gap-2">
                    {props.categories.map((category) => {
                        return(
                            <div key={category.id} className="flex justify-between">
                                <p className="text-brand-primary">{category.category}</p>
                                <button className="rounded bg-red-600 px-3 py-1 text-sm text-white" type="button">Remove</button>
                            </div>
                        )
                    })}
                    {props.categories.length >= 4 ? null:
                        <>
                            <button className="w-fit rounded bg-emerald-600 px-3 py-1 text-white" onClick={handleAddCategory} type="button">Add Category</button>
                            {addCategory ?
                                <input className="w-full rounded-none border-0 border-b border-slate-300 bg-white px-0 py-2 text-brand-primary focus:border-brand-info focus:outline-none" placeholder="Category Name" />
                                : null
                            }
                        </>
                    }
                </div>
                <div className="mb-1 mt-2 h-px w-full bg-slate-200" />
                <p className="text-xs text-red-600">(Max 6)</p>
            </div>
        </div>
    )
}