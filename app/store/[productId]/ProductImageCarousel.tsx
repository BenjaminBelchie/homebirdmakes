"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  productName: string;
};

export default function ProductImageCarousel({ images, productName }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length === 0) {
    return <div className="aspect-square w-full rounded-[var(--radius)] bg-muted" />;
  }

  return (
    <div className="flex flex-col gap-3">
      <Carousel setApi={setApi} opts={{ loop: images.length > 1 }}>
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="aspect-square overflow-hidden rounded-[var(--radius)] bg-muted">
                <img
                  src={src}
                  alt={
                    images.length > 1
                      ? `${productName} — image ${i + 1} of ${images.length}`
                      : productName
                  }
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </>
        )}
      </Carousel>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "h-16 w-16 overflow-hidden rounded-sm border-2 transition-all",
                current === i
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-50 hover:opacity-75",
              )}
            >
              <img src={src} alt="" aria-hidden className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
