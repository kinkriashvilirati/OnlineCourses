import { useState } from "react";
import { Link } from "react-router";
import sliderArrowLeft from "../../../assets/icons/icon-set/slider_left.svg";
import sliderArrowRight from "../../../assets/icons/icon-set/slider_right.svg";
import sliderArrowLeftDisabled from "../../../assets/icons/icon-set/slider_left_disabled.svg";
import sliderArrowRightDisabled from "../../../assets/icons/icon-set/slider_right_disabled.svg";
import {
  dashboardHeroSlides,
  type DashboardHeroSlide,
} from "./dashboardHeroSlides";

export function DashboardHeroSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const activeSlide: DashboardHeroSlide = dashboardHeroSlides[activeSlideIndex];
  const isFirstSlide = activeSlideIndex === 0;
  const isLastSlide = activeSlideIndex === dashboardHeroSlides.length - 1;

  const goToPreviousSlide = () => {
    if (isFirstSlide) {
      return;
    }

    setActiveSlideIndex((currentIndex) => currentIndex - 1);
  };

  const goToNextSlide = () => {
    if (isLastSlide) {
      return;
    }

    setActiveSlideIndex((currentIndex) => currentIndex + 1);
  };

  return (
    <section className="pt-6  w-full">
      <div className="relative max-h-105 overflow-hidden rounded-[20px]">
        <img
          alt={activeSlide.imageAlt}
          className="h-105 w-full object-cover"
          src={activeSlide.imageSrc}
        />

        <div className="absolute inset-0 flex flex-col justify-between px-7 py-10 ">
          <div className="pt-1 text-grayscale-50 max-w-300 ">
            <h1 className="text-display-xl">{activeSlide.title}</h1>

            <p className="text-body-light-xl mb-10">
              {activeSlide.description}
            </p>

            <Link
              className="button-primary mt-6 inline-flex px-6.25 py-4.25 text-button-s"
              to="/courses"
            >
              {activeSlide.buttonLabel}
            </Link>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-1 justify-center mb-3 gap-2">
              {dashboardHeroSlides.map((slide, index) => (
                <span
                  aria-label={`Go to slide ${slide.id}`}
                  className={[
                    "h-2 rounded-full transition-all duration-300",
                    index === activeSlideIndex
                      ? "w-14.25 bg-grayscale-50"
                      : "w-14.25 bg-grayscale-200/55",
                  ].join(" ")}
                  key={slide.id}
                />
              ))}
            </div>

            <div className="flex items-center absolute bottom-7 right-7 gap-7">
              <button
                aria-label="Previous slide"
                className="flex h-11 w-11 items-center justify-center"
                disabled={isFirstSlide}
                onClick={goToPreviousSlide}
                type="button"
              >
                {isFirstSlide ? (
                  <img
                    alt=""
                    className="h-11 w-11 "
                    src={sliderArrowLeftDisabled}
                  />
                ) : (
                  <img
                    alt=""
                    className="h-11 w-11  cursor-pointer"
                    src={sliderArrowLeft}
                  />
                )}
              </button>

              <button
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center"
                disabled={isLastSlide}
                onClick={goToNextSlide}
                type="button"
              >
                {isLastSlide ? (
                  <img
                    alt=""
                    className="h-11 w-11 object-contain"
                    src={sliderArrowRightDisabled}
                  />
                ) : (
                  <img
                    alt=""
                    className="h-11 w-11 object-contain cursor-pointer"
                    src={sliderArrowRight}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
