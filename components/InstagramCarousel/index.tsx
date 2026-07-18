"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const instaContent = [
  { img: "/images/instagram/img1.jpg", link: "https://www.instagram.com/p/Cio8HO_Kzh9/" },
  { img: "/images/instagram/img2.jpg", link: "https://www.instagram.com/p/CdaG3sKqwqQ/" },
  { img: "/images/instagram/img3.jpg", link: "https://www.instagram.com/p/CdKqLHDqYrg/" },
  { img: "/images/instagram/img4.jpg", link: "https://www.instagram.com/p/Cbo3IdeqBu4/" },
  { img: "/images/instagram/img5.jpg", link: "https://www.instagram.com/p/CVXOLAEKVw_/" },
  { img: "/images/instagram/img6.jpg", link: "https://www.instagram.com/p/CS_PvDmq20Y/" },
];

export default function InstagramCarousel() {
  return (
    <Carousel opts={{ loop: true, align: "start" }} className="w-full">
      <CarouselContent className="-ml-0">
        {instaContent.map((post, i) => (
          <CarouselItem key={i} className="basis-1/3 pl-0 md:basis-1/6">
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="aspect-square overflow-hidden">
                <img
                  src={post.img}
                  alt="Instagram"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
