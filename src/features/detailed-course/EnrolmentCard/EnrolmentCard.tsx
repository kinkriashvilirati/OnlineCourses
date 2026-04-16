import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberedIcons from "../../../assets/icons/slots-number-icon/GetNumberedIcons";
import type { DetailedCourse } from "../../../types/courses-type";
import Summary from "./Summary";
import Slot from "./slots/Slot";
import { useState } from "react";

type EnrolmentCardProps = {
  data: DetailedCourse;
};

const SLOT_SECTIONS = [
  {
    icon: "one",
    label: "Weekly Schedule",
    id: 1,
  },
  {
    icon: "two",
    label: "Time Slot",
    id: 2,
  },
  {
    icon: "three",
    label: "Session Type",
    id: 3,
  },
] as const;

function formatPrice(price: number) {
  return Math.floor(price);
}

export default function EnrolmentCard({ data }: EnrolmentCardProps) {
  const basePrice = formatPrice(data.basePrice);
  const totalPrice = basePrice;
  type SlotOpen = Record<number, boolean>;

  const [openSlots, setOpenSlots] = useState<SlotOpen>({});
  return (
    <aside className="flex w-full flex-col gap-8 rounded-2xl ">
      {SLOT_SECTIONS.map((slotSection) => {
        const SlotIcon = NumberedIcons[slotSection.icon];
        const isOpen = openSlots[slotSection.id] ?? false;
        return (
          <div
            className="flex flex-col  justify-center relative"
            key={slotSection.label}
          >
            <div
              onClick={() => {
                setOpenSlots((prev) => ({
                  ...prev,
                  [slotSection.id]: !prev[slotSection.id],
                }));
              }}
              className={`cursor-pointer flex items-center justify-between `}
            >
              <div className="flex items-center gap-3 text-purple-800">
                <img src={SlotIcon} alt="" />
                <h3 className="text-h3 text-purple-800">{slotSection.label}</h3>
              </div>
              <FontAwesomeIcon
                className={`text-body-s text-purple-800 transition-transform duration-300 ${
                  !isOpen ? "rotate-0" : "rotate-180"
                }`}
                icon={faChevronUp}
              />
            </div>
            <div
              className={`absolute top-full mt-2.5 w-full flex justify-center transition-all duration-300 origin-top ${
                isOpen
                  ? "relative translate-y-0 opacity-100 scale-y-100"
                  : "pointer-events-none -translate-y-2 opacity-0 scale-y-95"
              }`}
            >
              <Slot id={slotSection.id} />
            </div>
          </div>
        );
      })}
      <Summary totalPrice={totalPrice} basePrice={basePrice} />
    </aside>
  );
}
