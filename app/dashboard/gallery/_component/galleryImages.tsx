"use client";

import { Button } from "@/app/component/ui";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export type Props = {
  gallery: Gallery;
  alt: string;
  handleDelete: (id: string) => void;
};

export default function GalleryImages({ gallery, alt, handleDelete }: Props) {
    const [showPreview, setShowPreview] = useState(false);

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };

    return (
        <>
            <div className="relative group">
                <Image
                    src={gallery.imageUrl}
                    width={353.67}
                    height={175}
                    alt={alt}
                    className="rounded-md w-full"
                />

                {/* Overlay with buttons - appears on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex flex-col items-center justify-center gap-3">
                    <Button 
                        size="md" 
                        type="button" 
                        onClick={handlePreview}
                        className="w-full"
                    >
                        Preview
                    </Button>

                    <Button 
                        size="md" 
                        type="button" 
                        className="w-full text-red-800 border border-red-800" 
                        variant="ghost"
                        onClick={() => handleDelete(gallery.id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                    onClick={handleClosePreview}
                >
                    <div 
                        className="relative w-[90vw] h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button - positioned inside the modal */}
                        <button
                            onClick={handleClosePreview}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-1"
                        >
                            <X size={28} />
                        </button>

                        {/* Preview Image */}
                        <div className="relative w-full h-full">
                            <Image
                                src={gallery.imageUrl}
                                alt={alt}
                                fill
                                className="rounded-lg object-contain"
                                sizes="90vw"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}