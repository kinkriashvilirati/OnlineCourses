import business_svg from "./business.svg";
import data_science_svg from "./data_science.svg";
import design_svg from "./design.svg";
import development_svg from "./development.svg";
import marketing_svg from "./marketing.svg";

const CategoriesIcons: Record<string, string> = {
  business: business_svg,
  design: design_svg,
  development: development_svg,
  marketing: marketing_svg,
  "data-science": data_science_svg, // matches backend value
} as const;

export default CategoriesIcons;
