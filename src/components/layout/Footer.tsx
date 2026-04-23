import { FooterBrandSection } from "./footer-sections/FooterBrandSection";
import { FooterContactSection } from "./footer-sections/FooterContactSection";
import { FooterLinksColumn } from "./footer-sections/FooterLinksColumn";

export default function Footer() {
  return (
    <footer className="max-mobile:px-2 max-tablet:px-12 max-laptop:px-25 px-44.25 mt-40 max-tablet:mt-20 border-t border-grayscale-200 bg-grayscale-10 pt-20 max-laptop:pt-16 max-tablet:pt-12 pb-5 flex flex-col gap-18.5 max-laptop:gap-12 max-tablet:gap-8">
      <div className="flex justify-between max-tablet:flex-col max-tablet:gap-12">
        <FooterBrandSection />

        <div className="flex items-start gap-30 max-laptop:gap-20 max-tablet:gap-12 max-tablet:flex-col">
          <FooterLinksColumn title="Explore" />
          <FooterLinksColumn title="Account" />
          <FooterContactSection />
        </div>
      </div>

      <div className="flex items-center justify-between max-tablet:flex-col max-tablet:gap-6 max-tablet:items-start">
        <p className="text-body-m max-laptop:text-body-s max-tablet:text-body-xs text-grayscale-500">
          Copyright © 2026 Redberry International
        </p>

        <div className="flex items-center gap-3 max-laptop:gap-2 max-tablet:flex-wrap max-tablet:gap-2 text-body-m max-laptop:text-body-s max-tablet:text-body-xs text-grayscale-500">
          <span>All Rights Reserved</span>
          <span className="max-tablet:hidden">|</span>
          <a className="text-purple-500 hover:underline" href="#">
            Terms and Conditions
          </a>
          <span className="max-tablet:hidden">|</span>
          <a className="text-purple-500 hover:underline" href="#">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
