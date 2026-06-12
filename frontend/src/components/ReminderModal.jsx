import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function ReminderModal({
  closeModal,
  onSave,
}) {
  const [formData, setFormData] = useState({
    plant: "",
    type: "Watering",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 relative">

        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-slate-800">
          Add New Reminder
        </h2>

        <p className="text-slate-500 mt-1">
          Schedule a reminder for your plant.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Plant Name"
            value={formData.plant}
            onChange={(e) =>
              setFormData({
                ...formData,
                plant: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            <option>Watering</option>
            <option>Fertilizer</option>
            <option>Repotting</option>
            <option>Pruning</option>
          </select>

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({
                ...formData,
                time: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <textarea
            placeholder="Notes (optional)"
            rows="3"
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Save Reminder
          </button>
        </form>
      </div>
    </div>
  );
}