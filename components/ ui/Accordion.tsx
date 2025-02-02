import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="w-full flex justify-between items-center p-4 text-lg font-semibold hover:bg-gray-100 border-b focus:outline-none focus:ring focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title
          .replace(/\s+/g, "-")
          .toLowerCase()}`}
      >
        {title}
        {isOpen ? (
          <FiChevronUp className="text-gray-500 text-xl transition-transform duration-300 ease-in-out" />
        ) : (
          <FiChevronDown className="text-gray-500 text-xl transition-transform duration-300 ease-in-out" />
        )}
      </button>

      <div
        id={`accordion-content-${title.replace(/\s+/g, "-").toLowerCase()}`}
        role="region"
        aria-labelledby={`accordion-header-${title
          .replace(/\s+/g, "-")
          .toLowerCase()}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
