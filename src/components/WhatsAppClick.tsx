import React from 'react';

interface WhatsAppClickProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export default function WhatsAppClick({
  phoneNumber = '919837262798',
  message = "Hello, I'm interested in booking a free design consultation with Elite Interiors. Please provide more details.",
  className = 'bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center',
}: WhatsAppClickProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-.72-.916-.923-.248-.203-.496-.203-.669-.099-.173.099-1.489.696-1.786.893-.297.198-.495.867-.595 1.164-.099.297-.099 1.712.793 3.275.892 1.563 3.277 4.998 7.966 7.033.792.335 1.411.496 1.89.595.595.124 1.838.074 2.634-.595.248-.198.892-.645 1.04-.893.149-.248.149-.496.025-.744-.124-.248-.595-.397-.892-.496z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.133.558 4.139 1.53 5.893l-1.007 3.78a.75.75 0 00.947.947l3.78-1.007A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.933 0-3.738-.558-5.262-1.518l-.297-.174-2.238.595.596-2.237-.174-.297A10.467 10.467 0 011.5 12c0-5.799 4.701-10.5 10.5-10.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z" />
      </svg>
      Contact via WhatsApp
    </a>
  );
}