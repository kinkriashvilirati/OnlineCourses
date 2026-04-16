import { useState } from "react";
import empty_star_icon from "../../../assets/icons/icon-set/empty_star.svg";
import full_star_icon from "../../../assets/icons/icon-set/full_star.svg";
import modal_close_icon from "../../../assets/icons/icon-set/modal_close.svg";

const RATING_STARS = [1, 2, 3, 4, 5] as const;

function getRatingStarIcon(starValue: number, hoveredRating: number | null) {
  if (hoveredRating === null) {
    return empty_star_icon;
  }

  if (starValue <= hoveredRating) {
    return full_star_icon;
  }

  return empty_star_icon;
}

type RateProps = {
  setIsRatingVisible: (value: boolean) => void;
};

export default function Rate({ setIsRatingVisible }: RateProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  return (
    <div className="rounded-xl bg-grayscale-50 px-12.5 py-10 relative flex flex-col justify-center items-center gap-4.5">
      <button
        className="cursor-pointer absolute w-3 h-3 top-5 right-5"
        onClick={() => setIsRatingVisible(false)}
        type="button"
      >
        <img alt="Close rating" className="h-5 w-5" src={modal_close_icon} />
      </button>

      <div className="flex items-start justify-between ">
        <p className="text-body-s text-grayscale-600">Rate your experience</p>
      </div>

      <div className="flex items-center gap-4.5 ">
        {RATING_STARS.map((starValue) => (
          <button
            className="cursor-pointer"
            key={starValue}
            onClick={() => {
              alert(`Clicked star: ${starValue}`);
              // setIsRatingVisible(false);
            }}
            onMouseEnter={() => setHoveredRating(starValue)}
            onMouseLeave={() => setHoveredRating(null)}
            type="button"
          >
            <img
              alt={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
              className="h-12.5 w-12.5"
              src={getRatingStarIcon(starValue, hoveredRating)}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
