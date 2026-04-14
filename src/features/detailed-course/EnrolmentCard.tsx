import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberedIcons from "../../assets/icons/slots-number-icon/GetNumberedIcons";
import type { DetailedCourse } from "../../types/courses-type";

type EnrolmentCardProps = {
  data: DetailedCourse;
};

const SLOT_SECTIONS = [
  {
    icon: "one",
    label: "Weekly Schedule",
  },
  {
    icon: "two",
    label: "Time Slot",
  },
  {
    icon: "three",
    label: "Session Type",
  },
] as const;

function formatPrice(price: string) {
  return Math.floor(Number(price));
}

export default function EnrolmentCard({ data }: EnrolmentCardProps) {
  const basePrice = formatPrice(data.basePrice);
  const totalPrice = basePrice;

  return (
    <aside className="flex w-full flex-col gap-6 rounded-2xl border border-grayscale-100 bg-grayscale-50 p-6">
      <div className="flex flex-col">
        {SLOT_SECTIONS.map((slotSection, index) => {
          const SlotIcon = NumberedIcons[slotSection.icon];
          const isLastItem = index === SLOT_SECTIONS.length - 1;
          console.log(SlotIcon);
          return (
            <div
              className={`flex items-center justify-between py-5 ${
                isLastItem ? "" : "border-b border-grayscale-100"
              }`}
              key={slotSection.label}
            >
              <div className="flex items-center gap-3 text-purple-800">
                <SlotIcon />
                <h3 className="text-h3 text-purple-800">{slotSection.label}</h3>
              </div>

              <FontAwesomeIcon
                className="text-body-s text-purple-800"
                icon={faChevronDown}
              />
            </div>
          );
        })}
      </div>

      <div className="h-px w-full bg-grayscale-100" />

      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-h4 text-grayscale-400">Total Price</p>
          <h2 className="text-h2 text-grayscale-900">${totalPrice}</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-body-s text-grayscale-400">Base Price</span>
            <span className="text-body-s text-grayscale-700">${basePrice}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-body-s text-grayscale-400">Session Type</span>
            <span className="text-body-s text-grayscale-700">+$0</span>
          </div>
        </div>
      </div>

      <button
        className="w-full cursor-not-allowed rounded-xl border-2 border-purple-100 bg-purple-100 px-5 py-4 text-button-m text-purple-300"
        disabled
        type="button"
      >
        Enroll Now
      </button>
    </aside>
  );
}
