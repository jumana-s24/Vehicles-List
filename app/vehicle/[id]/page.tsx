"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/types/vehicle";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { fetchVehicle } from "@/lib/fetchVehicle";
import Skeleton from "@/components/ ui/Skeleton";
import Accordion from "@/components/ ui/Accordion";
import "swiper/css";
import "swiper/css/navigation";

export default function VehicleDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const { id } = use(params);

  useEffect(() => {
    const loadVehicle = async () => {
      const fetchedVehicle = await fetchVehicle(id);
      if (!fetchedVehicle) {
        router.push("/");
      } else {
        setVehicle(fetchedVehicle);
      }
    };
    loadVehicle();
  }, [id, router]);

  if (!vehicle) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-center min-h-screen p-40"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          <div className="">
            <Skeleton width="600px" height="400px" className="rounded-lg" />
          </div>

          <div className="flex flex-col justify-center">
            <Skeleton width="200px" height="20px" className="mb-4" />
            <Skeleton width="200px" height="20px" className="mb-4" />
            <Skeleton width="200px" height="20px" className="mb-4" />
            <Skeleton width="300px" height="50px" className="mb-4" />
            <Skeleton width="300px" height="50px" className="mb-4" />
            <Skeleton width="300px" height="50px" className="mb-4" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen px-10 py-20"
      role="main"
    >
      <div className="w-full max-w-6xl">
        <button
          onClick={() => router.push("/")}
          className="mb-6 text-blue-500 hover:text-blue-700 font-semibold underline focus:outline-none focus:ring focus:ring-blue-500"
          aria-label="Back to vehicle listings"
        >
          Back to Listings
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-[200px] xs:h-[300px] sm:h-[400px]">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                aria-label="Vehicle image carousel"
              >
                {vehicle.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-[200px] xs:h-[300px] sm:h-[400px]">
                      <Image
                        src={image}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {vehicle.brand}, {vehicle.model}
            </h1>

            <div className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
              {vehicle.price} €
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm">
                Year: {vehicle.year}
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm">
                Location: {vehicle.location}
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm">
                Condition: {vehicle.condition}
              </span>
            </div>

            <div className="w-full bg-white rounded-lg shadow">
              <Accordion title="Performance">
                <p className="mb-1">
                  <strong>Range:</strong> {vehicle.range_km} km
                </p>
                <p className="mb-1">
                  <strong>Battery Capacity:</strong>{" "}
                  {vehicle.battery_capacity_kWh} kWh
                </p>
                <p className="mb-1">
                  <strong>Charging Speed:</strong> {vehicle.charging_speed_kW}{" "}
                  kW
                </p>
                <p className="mb-1">
                  <strong>Autopilot:</strong> {vehicle.autopilot ? "Yes" : "No"}
                </p>
                <p className="mb-1">
                  <strong>Kilometers Driven:</strong>{" "}
                  {vehicle.kilometer_count.toLocaleString()} km
                </p>
                <p className="mb-1">
                  <strong>Drive Train:</strong> {vehicle.drivetrain}
                </p>
              </Accordion>

              <Accordion title="Interior">
                <p className="mb-1">
                  <strong>Seats:</strong> {vehicle.seats}
                </p>
                <p className="mb-1">
                  <strong>Color:</strong> {vehicle.color}
                </p>
              </Accordion>

              <Accordion title="Accident History">
                <p className="mb-1">
                  <strong>Accidents:</strong> {vehicle.accidents ? "Yes" : "No"}
                </p>
                {vehicle.accidents && (
                  <p className="mb-1">
                    <strong>Description:</strong> {vehicle.accident_description}
                  </p>
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
