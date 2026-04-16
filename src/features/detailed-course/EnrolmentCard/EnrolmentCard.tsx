import { useQueryClient } from "@tanstack/react-query";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAxiosError } from "axios";
import { useState } from "react";
import NumberedIcons from "../../../assets/icons/slots-number-icon/GetNumberedIcons";
import { useAuth } from "../../../context/AuthContext";
import { useCreateEnrollmentMutation } from "../../../hooks/mutation-hooks/useCreateEnrollmentMutation";
import type { DetailedCourse } from "../../../types/courses-type";
import CourseTakeModal from "../CourseTakeModal";
import Summary from "./Summary";
import Slot from "./slots/Slot";

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
  const { isAuthenticated, isAuthRestoring, profileComplete } = useAuth();
  const queryClient = useQueryClient();
  const basePrice = formatPrice(data.basePrice);
  type SlotOpen = Record<number, boolean>;

  const [openSlots, setOpenSlots] = useState<SlotOpen>({});
  const [selectedWeeklyScheduleId, setSelectedWeeklyScheduleId] = useState<
    number | null
  >(null);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(
    null,
  );
  const [selectedSessionTypeId, setSelectedSessionTypeId] = useState<
    number | null
  >(null);
  const [selectedCourseScheduleId, setSelectedCourseScheduleId] = useState<
    number | null
  >(null);
  const [selectedSessionTypePrice, setSelectedSessionTypePrice] = useState(0);
  const [isEnrollmentConfirmedModalOpen, setIsEnrollmentConfirmedModalOpen] =
    useState(false);
  const createEnrollmentMutation = useCreateEnrollmentMutation({
    invalidateOnSuccess: false,
  });
  const totalPrice = Number(basePrice) + Number(selectedSessionTypePrice);
  const canEnroll =
    !isAuthRestoring &&
    isAuthenticated &&
    profileComplete &&
    data.enrollment === null &&
    selectedWeeklyScheduleId !== null &&
    selectedTimeSlotId !== null &&
    selectedSessionTypeId !== null &&
    selectedCourseScheduleId !== null;
  const conflictData =
    createEnrollmentMutation.isError &&
    isAxiosError(createEnrollmentMutation.error)
      ? (createEnrollmentMutation.error.response?.data?.conflicts?.[0] ?? null)
      : null;
  const enrollErrorMessage =
    createEnrollmentMutation.isError && !conflictData
      ? isAxiosError(createEnrollmentMutation.error)
        ? (createEnrollmentMutation.error.response?.data?.message ??
          "Failed to enroll in this course.")
        : "Failed to enroll in this course."
      : null;
  const enrollErrorContent = enrollErrorMessage ? (
    <p className="text-body-xs text-helper-error text-center">
      {enrollErrorMessage}
    </p>
  ) : null;

  async function invalidateEnrollmentQueries() {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["courses", "detail", data.id],
      }),
      queryClient.invalidateQueries({
        queryKey: ["courses", "in-progress"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["enrollments"],
      }),
    ]);
  }

  function handleEnrollmentSuccess() {
    setIsEnrollmentConfirmedModalOpen(true);
  }

  function getIsSectionDisabled(sectionId: number) {
    if (sectionId === 2) {
      return selectedWeeklyScheduleId === null;
    }

    if (sectionId === 3) {
      return selectedWeeklyScheduleId === null || selectedTimeSlotId === null;
    }

    return false;
  }

  function getIsSectionFilled(sectionId: number) {
    if (sectionId === 1) {
      return selectedWeeklyScheduleId !== null;
    }

    if (sectionId === 2) {
      return selectedTimeSlotId !== null;
    }

    if (sectionId === 3) {
      return selectedSessionTypeId !== null;
    }

    return false;
  }

  return (
    <>
      <aside className="flex w-full flex-col gap-8 rounded-2xl ">
        {SLOT_SECTIONS.map((slotSection) => {
          const isDisabled = getIsSectionDisabled(slotSection.id);
          const isFilled = getIsSectionFilled(slotSection.id);
          const iconKey = isFilled
            ? `${slotSection.icon}_fill`
            : slotSection.icon;
          const SlotIcon = NumberedIcons[iconKey];
          const isOpen = openSlots[slotSection.id] ?? false;

          return (
            <div
              className="flex flex-col justify-center relative"
              key={slotSection.label}
            >
              <div
                onClick={() => {
                  if (isDisabled) return;

                  setOpenSlots((prev) => ({
                    ...prev,
                    [slotSection.id]: !prev[slotSection.id],
                  }));
                }}
                className={`flex items-center justify-between ${
                  isDisabled ? "cursor-auto" : "cursor-pointer"
                }`}
              >
                <div
                  className={`flex items-center gap-3 ${
                    isDisabled ? "text-grayscale-400" : "text-purple-800"
                  }`}
                >
                  <img
                    alt=""
                    className={isDisabled ? "opacity-45" : ""}
                    src={SlotIcon}
                  />
                  <h3
                    className={`text-h3 ${
                      isDisabled ? "text-grayscale-400" : "text-purple-800"
                    }`}
                  >
                    {slotSection.label}
                  </h3>
                </div>
                <FontAwesomeIcon
                  className={`text-body-s transition-transform duration-300 ${
                    isDisabled ? "text-grayscale-400" : "text-purple-800"
                  } ${!isOpen ? "rotate-0" : "rotate-180"}`}
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
                <Slot
                  id={slotSection.id}
                  onSelectSessionType={(
                    sessionTypeId,
                    priceModifier,
                    courseScheduleId,
                  ) => {
                    createEnrollmentMutation.reset();
                    setSelectedSessionTypeId(sessionTypeId);
                    setSelectedCourseScheduleId(courseScheduleId);
                    setSelectedSessionTypePrice(priceModifier);
                  }}
                  onSelectTimeSlot={(timeSlotId) => {
                    createEnrollmentMutation.reset();
                    setSelectedTimeSlotId(timeSlotId);
                    setSelectedSessionTypeId(null);
                    setSelectedCourseScheduleId(null);
                    setSelectedSessionTypePrice(0);
                  }}
                  onSelectWeeklySchedule={(weeklyScheduleId) => {
                    createEnrollmentMutation.reset();
                    setSelectedWeeklyScheduleId(weeklyScheduleId);
                    setSelectedTimeSlotId(null);
                    setSelectedSessionTypeId(null);
                    setSelectedCourseScheduleId(null);
                    setSelectedSessionTypePrice(0);
                  }}
                  selectedSessionTypeId={selectedSessionTypeId}
                  selectedTimeSlotId={selectedTimeSlotId}
                  selectedWeeklyScheduleId={selectedWeeklyScheduleId}
                />
              </div>
            </div>
          );
        })}

        <Summary
          basePrice={basePrice}
          canEnroll={canEnroll}
          enrollErrorContent={enrollErrorContent}
          isEnrolling={createEnrollmentMutation.isPending}
          onEnroll={() => {
            if (!canEnroll || selectedCourseScheduleId === null) {
              return;
            }

            createEnrollmentMutation.mutate(
              {
                courseId: data.id,
                courseScheduleId: selectedCourseScheduleId,
              },
              {
                onSuccess: handleEnrollmentSuccess,
              },
            );
          }}
          sessionTypePrice={selectedSessionTypePrice}
          totalPrice={totalPrice}
        />
      </aside>

      <CourseTakeModal
        actions={
          <>
            <button
              className="w-full cursor-pointer rounded-xl border-2 border-purple-300 bg-grayscale-50 px-3 py-2 text-button-s text-purple-600 transition-all duration-300 hover:bg-purple-50 disabled:cursor-auto disabled:border-purple-100 disabled:text-purple-200"
              disabled={createEnrollmentMutation.isPending}
              onClick={() => {
                if (!canEnroll || selectedCourseScheduleId === null) {
                  return;
                }

                createEnrollmentMutation.mutate(
                  {
                    courseId: data.id,
                    courseScheduleId: selectedCourseScheduleId,
                    force: true,
                  },
                  {
                    onSuccess: handleEnrollmentSuccess,
                  },
                );
              }}
              type="button"
            >
              {createEnrollmentMutation.isPending
                ? "Continuing..."
                : "Continue Anyway"}
            </button>
            <button
              className="w-full cursor-pointer rounded-xl border-2 border-purple-500 bg-purple-500 px-3 py-2 text-button-s text-grayscale-50 transition-all duration-300 hover:bg-purple-600 disabled:cursor-auto disabled:border-purple-100 disabled:bg-purple-100 disabled:text-purple-300"
              disabled={createEnrollmentMutation.isPending}
              onClick={() => createEnrollmentMutation.reset()}
              type="button"
            >
              Cancel
            </button>
          </>
        }
        description={
          <>
            <p>
              You are already enrolled in{" "}
              <span className="font-semibold">
                “{conflictData?.conflictingCourseName}”
              </span>{" "}
              with the same schedule:
            </p>
            <p>{conflictData?.schedule}</p>
          </>
        }
        icon="warning"
        isOpen={Boolean(conflictData)}
        onClose={() => createEnrollmentMutation.reset()}
        title="Enrollment Conflict"
      />

      <CourseTakeModal
        actions={
          <button
            className="w-full cursor-pointer rounded-xl border-2 border-purple-500 bg-purple-500 px-5 py-4 text-button-l text-grayscale-50 transition-all duration-300 hover:bg-purple-600"
            onClick={() => {
              setIsEnrollmentConfirmedModalOpen(false);
              createEnrollmentMutation.reset();
              void invalidateEnrollmentQueries();
            }}
            type="button"
          >
            Done
          </button>
        }
        description={
          <p>
            You've successfully enrolled to the{" "}
            <span className="font-semibold">“{data.title}”</span> Course!
          </p>
        }
        icon="complete"
        isOpen={isEnrollmentConfirmedModalOpen}
        onClose={() => {
          setIsEnrollmentConfirmedModalOpen(false);
          createEnrollmentMutation.reset();
          void invalidateEnrollmentQueries();
        }}
        title="Enrollment Confirmed!"
      />
    </>
  );
}
