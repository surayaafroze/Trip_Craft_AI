import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Loader2, Check } from "lucide-react";
import { useTrips, useAddActivityToTrip } from "@/hooks/useTrips";
import { useRouter } from "next/navigation";

interface AddToTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    title: string;
    avgDailyCost: number;
    region: string;
  };
}

export default function AddToTripModal({ isOpen, onClose, item }: AddToTripModalProps) {
  const router = useRouter();
  const { data: trips, isLoading: isLoadingTrips } = useTrips();
  const { mutate: addActivity, isPending, isSuccess, reset } = useAddActivityToTrip();

  const [selectedTripId, setSelectedTripId] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [time, setTime] = useState("10:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTripId) return;

    // Convert 24h time to 12h for UI consistency if needed, but simple string is fine
    let formattedTime = time;
    if (time) {
      const [hours, minutes] = time.split(":");
      const h = parseInt(hours);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      formattedTime = `${h12}:${minutes} ${ampm}`;
    } else {
      formattedTime = "10:00 AM";
    }

    addActivity(
      {
        tripId: selectedTripId,
        day: selectedDay,
        activity: item.title,
        cost: item.avgDailyCost || 0,
        time: formattedTime,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            onClose();
            reset();
            router.push(`/dashboard/trips/${selectedTripId}`);
          }, 1500);
        },
      }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl premium-shadow w-full max-w-md overflow-hidden relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add to Trip Planner</h2>
              <p className="text-gray-500 mb-6 flex items-center gap-2">
                <MapPin size={16} className="text-ocean-600" />
                {item.title}
              </p>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Added successfully!</h3>
                  <p className="text-gray-500">Redirecting to your trip...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Trip</label>
                    {isLoadingTrips ? (
                      <div className="w-full p-3 bg-gray-50 rounded-xl flex items-center gap-2 text-gray-500">
                        <Loader2 size={16} className="animate-spin" /> Loading trips...
                      </div>
                    ) : trips && trips.length > 0 ? (
                      <select
                        required
                        value={selectedTripId}
                        onChange={(e) => setSelectedTripId(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500"
                      >
                        <option value="" disabled>Choose a trip...</option>
                        {trips.map((trip: { _id: string; title: string; region: string }) => (
                          <option key={trip._id} value={trip._id}>
                            {trip.title} ({trip.region})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="p-4 bg-orange-50 text-orange-700 rounded-xl border border-orange-100 text-sm">
                        You don&apos;t have any trips yet. Create one first!
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Day Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Calendar size={16} />
                        </div>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          required
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(parseInt(e.target.value) || 1)}
                          className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isPending || !selectedTripId}
                      className="w-full bg-gradient-to-r from-ocean-600 to-ocean-800 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={18} />
                          Adding...
                        </>
                      ) : (
                        "Add to Trip"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
