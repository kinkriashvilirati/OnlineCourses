import mailIcon from "../../../assets/icons/icon-set/Mail.svg";
import mapPinIcon from "../../../assets/icons/icon-set/map_pin.svg";
import phoneIcon from "../../../assets/icons/icon-set/Phone.svg";

const contactRows = [
  {
    icon: mailIcon,
    label: "Email",
    text: "hello@redclass.ge",
  },
  {
    icon: phoneIcon,
    label: "Phone",
    text: "+995 555 000 000",
  },
  {
    icon: mapPinIcon,
    label: "Location",
    text: "Tbilisi, Georgia",
  },
];

export function FooterContactSection() {
  return (
    <div className="flex  flex-col gap-4">
      <h4 className="text-h4 text-purple-800">Contact</h4>

      <div className="flex flex-col gap-2">
        {contactRows.map((row) => (
          <div className="flex items-center gap-3" key={row.label}>
            <img alt="" className="h-6 w-6" src={row.icon} />
            <span className="text-body-m text-grayscale-500">{row.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
