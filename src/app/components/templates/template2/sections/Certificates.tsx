"use client";

import React, { useState } from "react";
import Image from 'next/image';

interface Certificate {
  image: string;
  title: string;
  subtitle: string;
}

const certificates: Certificate[] = [
  { image: "/c1.jpg", title: "Apex Core Engineering", subtitle: "ISO 14001" },
  { image: "/c2.jpg", title: "Apex Core Engineering", subtitle: "ISO 45001" },
  { image: "/c3.jpg", title: "Apex Core Engineering", subtitle: "ISO 9001" },
  { image: "/c4.jpg", title: "MMS (PVT)", subtitle: "LCCI Membership" },
  { image: "/c5.jpg", title: "MTTI", subtitle: "PSDA (1)" },
  { image: "/c6.jpg", title: "MTTI", subtitle: "PSDA (2)" },
  { image: "/c7.jpg", title: "NAVTTC", subtitle: "Registration MTTI Lahore Campus" },
  { image: "/c8.jpg", title: "AWS", subtitle: "Member Institute" },
];

const ceoImages = ["/ceo1.jpg", "/ceo2.jpg"];

const CertificatesSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);

  const openModal = (images: string[]) => {
    setModalImages(images);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImages([]);
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[#4B3F72] text-2xl md:text-3xl font-bold">
            Certificates
          </h2>
          <p className="text-[#8E8D8A] text-sm md:text-base mt-2">
            Recognizing Our Commitment
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              onClick={() => openModal([cert.image])}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={cert.image}
                  alt={`${cert.title} ${cert.subtitle}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-[#4B3F72] font-semibold text-lg md:text-xl mb-1">
                  {cert.title}
                </h3>
                <p className="text-[#8E8D8A] text-sm md:text-base">{cert.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CEO Video CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openModal(ceoImages)}
            className="bg-[#F28C28] hover:bg-[#EE6C4D] text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
          >
            Watch our CEO share insights in interviews
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 font-bold text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {modalImages.map((img, idx) => (
                <div key={idx} className="relative w-full h-64 md:h-80">
                  <Image
                    src={img}
                    alt={`Certificate ${idx + 1}`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;
