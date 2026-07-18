"use client";

import { useState } from "react";
import { useMyItems, useDeleteItem } from "@/hooks/useItems";
import Link from "next/link";
import { Trash2, Edit2, ExternalLink, Loader2, AlertTriangle, MapPin } from "lucide-react";

export default function ManageItemsPage() {
  const { data: items, isLoading, isError } = useMyItems();
  const deleteItem = useDeleteItem();
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteItem.mutate(id, {
      onSuccess: () => setDeleteId(null)
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Destinations</h1>
            <p className="text-gray-600">View and manage destinations you've contributed.</p>
          </div>
          <Link href="/items/add" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium">
            Add New
          </Link>
        </div>

        {isError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8">
            Failed to load your destinations.
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : items?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No destinations yet</h3>
            <p className="text-gray-500 mb-6">You haven't contributed any destinations to the platform.</p>
            <Link href="/items/add" className="text-blue-600 font-medium hover:underline">
              Create your first destination &rarr;
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-semibold text-gray-600 text-sm">Destination</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Region</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Added On</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Cost</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items?.map((item: any) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={item.images[0]} alt={item.title} className="w-12 h-12 rounded-md object-cover bg-gray-100" />
                          <div className="font-medium text-gray-900">{item.title}</div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 text-sm">{item.region}</td>
                      <td className="p-4 text-gray-600 text-sm">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-gray-600 text-sm">${item.estimatedCostPerDay}/day</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/items/${item._id}`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                            <ExternalLink size={18} />
                          </Link>
                          <button 
                            onClick={() => setDeleteId(item._id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-4 text-red-600">
                <AlertTriangle size={32} />
                <h3 className="text-xl font-bold text-gray-900">Delete Destination</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this destination? This action cannot be undone and will also remove all associated reviews.
              </p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setDeleteId(null)}
                  disabled={deleteItem.isPending}
                  className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleteItem.isPending}
                  className="px-4 py-2 font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  {deleteItem.isPending && <Loader2 size={16} className="animate-spin" />}
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
