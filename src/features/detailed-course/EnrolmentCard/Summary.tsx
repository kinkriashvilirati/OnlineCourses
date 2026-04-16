type SummaryProps = {
  sessionTypePrice: number;
  totalPrice: number;
  basePrice: number;
};
export default function Summary({
  sessionTypePrice,
  totalPrice,
  basePrice,
}: SummaryProps) {
  return (
    <div>
      <div className="bg-grayscale-50 p-10 rounded-xl flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <div className="flex  justify-between gap-6 items-center">
            <h4 className="text-h4 text-grayscale-400">Total Price</h4>
            <h2 className="text-h2 text-grayscale-800">${totalPrice}</h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-body-s text-grayscale-400">Base Price</span>
              <span className="text-body-s text-grayscale-800">
                ${basePrice}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-body-s text-grayscale-400">
                Session Type
              </span>
              <span className="text-body-s text-grayscale-700">
                {sessionTypePrice === 0 ? "Included" : `+$${sessionTypePrice}`}
              </span>
            </div>
          </div>
        </div>

        <button
          className="w-full cursor-auto rounded-xl border-2 border-purple-100 bg-purple-50 px-5 py-4 text-button-l text-purple-300"
          disabled
          type="button"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
