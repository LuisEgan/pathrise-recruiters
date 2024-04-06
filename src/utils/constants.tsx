export const MOBILE_WINDOW_WIDTH = 768;

export const BASE_ANIM = {
  duration: 0.5,
  ease: "power3.inOut",
};
export const BASE_FADE_IN_ANIM = {
  from: { yPercent: 100, opacity: 0 },
  to: { yPercent: 0, opacity: 1, ...BASE_ANIM },
};

export const LOGOS_DIR = "./public/logos/companies";
