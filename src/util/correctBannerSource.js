import defaultBanner from '~/assets/defaultBanner.png';
/**
 * This function creates the uri source object for banners, corrects the uri
 * source of banners for the development environment or sets the default banner
 */
export default function setBannerSource(banner) {
  if (banner && __DEV__) {
    const sourceObject = {
      uri: banner.url.replace(/localhost/, '10.0.2.2'),
    };
    return sourceObject;
  }
  if (banner) {
    const sourceObject = {
      uri: banner.url,
    };
    return sourceObject;
  }
  return defaultBanner;
}
