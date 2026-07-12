import ImageButton from "../ImageButton";

const instaContent = [
    {
        img:'/images/instagram/img1.jpg',
        link:"https://www.instagram.com/p/Cio8HO_Kzh9/"
    },
    {
        img:'/images/instagram/img2.jpg',
        link:"https://www.instagram.com/p/CdaG3sKqwqQ/",
    },
    {
        img:'/images/instagram/img3.jpg',
        link:"https://www.instagram.com/p/CdKqLHDqYrg/"
    },
    {
        img:'/images/instagram/img4.jpg',
        link:"https://www.instagram.com/p/Cbo3IdeqBu4/"
    },
    {
        img:'/images/instagram/img5.jpg',
        link:"https://www.instagram.com/p/CVXOLAEKVw_/",
    },
    {
        img:'/images/instagram/img6.jpg',
        link:"https://www.instagram.com/p/CS_PvDmq20Y/"
    }
]

export default function InstagramFeed(){
    return(
        <div className="w-screen">
            <div className="my-2 flex w-full items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <p className="text-base">Instagram</p>
                <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="flex w-full items-center justify-center pt-[55px]">
                <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
                <p className="text-base">HOMEBIRD_MAKES</p>
            </div>

            <div className="mx-8 mb-[71px] mt-8 grid grid-cols-1 gap-8 tablet:grid-cols-3 desktop:grid-cols-6">
                {instaContent.map((post, index) => (
                <div key={index} className="flex h-[300px] w-full flex-col">
                        <ImageButton image={post.img} hoverIcon="/images/instagram.png" imageLocation={post.link}/>
                </div>
                ))}
            </div>
        </div>
    )
}