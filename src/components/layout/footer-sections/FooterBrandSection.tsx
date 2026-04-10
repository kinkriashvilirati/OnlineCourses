import { Link } from "react-router";
import navLogo from "../../../assets/icons/icon-set/nav_logo.svg";
import facebookIcon from "../../../assets/social_media_icons/facebook.svg";
import instagramIcon from "../../../assets/social_media_icons/instagram.svg";
import linkedInIcon from "../../../assets/social_media_icons/linkedIn.svg";
import twitterIcon from "../../../assets/social_media_icons/twitter.svg";
import youtubeIcon from "../../../assets/social_media_icons/youtube.svg";

const socialLinks = [
  { alt: "Facebook", href: "#", src: facebookIcon },
  { alt: "Twitter", href: "#", src: twitterIcon },
  { alt: "Instagram", href: "#", src: instagramIcon },
  { alt: "LinkedIn", href: "#", src: linkedInIcon },
  { alt: "YouTube", href: "#", src: youtubeIcon },
];

export function FooterBrandSection() {
  return (
    <div className="flex max-w-76 flex-col gap-6">
      <Link className="inline-flex items-center gap-3" to="/">
        <span className="button-primary flex h-12.25 w-12.25 items-center justify-center rounded-[14px] p-0">
          <img alt="RedClass logo" className="h-6 w-6" src={navLogo} />
        </span>
        <span className="text-body-xl text-grayscale-950">Boot Camp</span>
      </Link>

      <p className=" text-body-xs text-grayscale-700">
        Your learning journey starts here! <br /> Browse courses to get started.
      </p>

      <div className="flex items-center gap-5.5">
        {socialLinks.map((link) => (
          <a href={link.href} key={link.alt}>
            <img alt={link.alt} src={link.src} />
          </a>
        ))}
      </div>
    </div>
  );
}
