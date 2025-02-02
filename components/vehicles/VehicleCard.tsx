"use client";

import Image from "next/image";
import Link from "next/link";
import { Vehicle } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link
      href={`/vehicle/${vehicle.model.replace(/\s+/g, "-").toLowerCase()}`}
      aria-label={`View details about the ${vehicle.brand} ${vehicle.model}`}
      className="focus:outline-none"
    >
      <article
        className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500"
        aria-labelledby={`vehicle-title-${vehicle.model
          .replace(/\s+/g, "-")
          .toLowerCase()}`}
      >
        <div className="relative w-full h-40">
          <Image
            src={vehicle.images[0]}
            alt={`Image of ${vehicle.brand} ${vehicle.model}`}
            className="rounded-md object-cover"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <h2 className="text-lg font-semibold mt-2 p-2 truncate overflow-hidden whitespace-nowrap">
          {vehicle.brand} {vehicle.model}
        </h2>
        <p className="text-gray-600 p-2">{vehicle.year}</p>
        <p className="text-gray-600 p-2">{vehicle.condition}</p>
        <p className="text-blue-500 font-bold p-2">
          ${vehicle.price.toLocaleString()}
        </p>
      </article>
    </Link>
  );
}
