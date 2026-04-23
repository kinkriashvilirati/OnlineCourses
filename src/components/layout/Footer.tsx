import { FooterBrandSection } from "./footer-sections/FooterBrandSection";
import { FooterContactSection } from "./footer-sections/FooterContactSection";
import { FooterLinksColumn } from "./footer-sections/FooterLinksColumn";

export default function Footer() {
  return (
    <footer className="mt-40 border-t border-grayscale-200 bg-grayscale-10 max-laptop:px-25 px-44.25 pt-20 pb-5 flex flex-col gap-18.5">
      <div className="flex justify-between ">
        <FooterBrandSection />

        <div className="flex items-start gap-30">
          <FooterLinksColumn title="Explore" />
          <FooterLinksColumn title="Account" />
          <FooterContactSection />
        </div>
      </div>

      <div className="flex items-center justify-between ">
        <p className="text-body-m text-grayscale-500">
          Copyright © 2026 Redberry International
        </p>

        <div className="flex items-center gap-3 text-body-m text-grayscale-500">
          <span>All Rights Reserved</span>
          <span>|</span>
          <a className="text-purple-500" href="#">
            Terms and Conditions
          </a>
          <span>|</span>
          <a className="text-purple-500" href="#">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
