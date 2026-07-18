import { useState } from "react";
import { useReviews, useCreateReview } from "@/hooks/useItems";
import { useSession } from "@/lib/auth-client";
import { Star, Loader2, UserCircle } from "lucide-react";

export default function ReviewSection({ destinationId }: { destinationId: string }) {
  const { data: session } = useSession();
  const { data: reviews, isLoading } = useReviews(destinationId);
  const createReview = useCreateReview(destinationId);
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please write a comment");
      return;
    }
    
    setError(null);
    createReview.mutate(
      { rating, comment },
      {
        onSuccess: () => {
          setComment("");
          setRating(5);
        },
        onError: () => {
          setError("Failed to submit review");
        }
      }
    );
  };

  if (isLoading) {
    return <div className="py-8 text-center text-gray-500 animate-pulse">Loading reviews...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Review Form */}
      {session ? (
        <div className="bg-gray-50 p-6 rounded-xl border">
          <h3 className="font-bold text-lg mb-4">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your experience..."
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={createReview.isPending}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 font-medium"
            >
              {createReview.isPending && <Loader2 size={16} className="animate-spin" />}
              Submit Review
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-xl border text-center">
          <p className="text-gray-600 mb-4">Please log in to leave a review.</p>
          <a href="/login" className="text-blue-600 font-medium hover:underline">Log in &rarr;</a>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl">Reviews ({reviews?.length || 0})</h3>
        
        {reviews?.length === 0 ? (
          <p className="text-gray-500 italic">No reviews yet. Be the first to review this destination!</p>
        ) : (
          <div className="grid gap-4">
            {reviews?.map((review: any) => (
              <div key={review._id} className="bg-white p-5 rounded-xl border shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <UserCircle className="text-gray-400" size={32} />
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{review.userName}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-200"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
