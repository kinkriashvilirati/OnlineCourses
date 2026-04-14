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
    <aside className="flex w-full flex-col gap-8 rounded-2xl border border-grayscale-100 ">
      {SLOT_SECTIONS.map((slotSection) => {
        const SlotIcon = NumberedIcons[slotSection.icon];
        return (
          <div
            className={` flex items-center justify-between `}
            key={slotSection.label}
          >
            <div className="flex items-center gap-3 text-purple-800">
              <img src={SlotIcon} alt="" />
              <h3 className="text-h3 text-purple-800">{slotSection.label}</h3>
            </div>

            <FontAwesomeIcon
              className="text-body-s text-purple-800"
              icon={faChevronDown}
            />
          </div>
        );
      })}
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
              <span className="text-body-s text-grayscale-700">+$0</span>
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
    </aside>
  );
}
