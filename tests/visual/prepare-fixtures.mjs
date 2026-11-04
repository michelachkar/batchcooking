// Copie les photos de la démo nécessaires aux tests visuels dans public/vr (non versionné, jamais livré).
import { cpSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const uploads = new URL('../../wp-reference/site/wp-content/uploads/', import.meta.url).pathname
const out = new URL('../../public/vr/', import.meta.url).pathname
mkdirSync(out, { recursive: true })

const wanted = {
  'hero.jpg': /^private-chef-serving-dinner-party-at-home\.jpg$/,
  'card-1.jpg': /^friends-dinner-party-private-chef-kitchen-768x1024\.jpg$/,
  'card-2.jpg': /^anniversary-celebration-dinner-champagne-toast-768x1024\.jpg$/,
  'chef.jpg': /^chef-julien-marchetti-portrait-kitchen-768x1024\.jpg$/,
  'chef-inset.jpg': /^chef-choosing-produce-farmers-market-768x768\.jpg$/,
  'about-1.jpg': /^private-chef-plating-scallops-home-kitchen\.jpg$/,
  'about-2.jpg': /^private-chef-presenting-dish-to-hosts\.jpg$/,
  'about-3.jpg': /^candlelit-dining-room-table-set-for-guests\.jpg$/,
  'menu-1.jpg': /^seared-grouper-tasting-menu-course-768x576\.jpg$/,
  'menu-2.jpg': /^family-style-sharing-table-shrimp-grits-768x576\.jpg$/,
  'menu-3.jpg': /^plant-based-roasted-beets-course-768x576\.jpg$/,
  'strip-1.jpg': /^lowcountry-oysters-on-ice-768x768\.jpg$/,
  'strip-2.jpg': /^seared-grouper-tasting-menu-course-768x576\.jpg$/,
  'strip-3.jpg': /^bartender-pouring-coupe-cocktail-768x768\.jpg$/,
  'strip-4.jpg': /^crate-of-heirloom-tomatoes-herbs-768x768\.jpg$/,
  'strip-5.jpg': /^pecan-tart-plated-dessert-768x768\.jpg$/,
  'strip-6.jpg': /^guests-toasting-candlelit-dinner-768x768\.jpg$/,
  'strip-7.jpg': /^plant-based-roasted-beets-course-768x576\.jpg$/,
  'strip-8.jpg': /^shrimp-and-grits-bowl-768x768\.jpg$/,
  'strip-9.jpg': /^anniversary-celebration-dinner-champagne-toast-768x1024\.jpg$/,
  'strip-10.jpg': /^villa-terrace-dinner-marsh-view-chef-768x1024\.jpg$/,
  'included.jpg': /^private-chef-plating-home-kitchen-service-768x1024\.jpg$/,
  'included-inset.jpg': /^elegant-table-setting-linen-glassware-768x768\.jpg$/,
  'event-1.jpg': /^corporate-retreat-family-style-barn-feast-1024x576\.jpg$/,
  'event-2.jpg': /^rooftop-launch-cocktail-party-harbor-1024x576\.jpg$/,
  'event-3.jpg': /^chefs-table-dinner-kitchen-island-1024x576\.jpg$/,
  'event-4.jpg': /^garden-wedding-cocktail-hour-mobile-bars-1024x576\.jpg$/,
  'event-5.jpg': /^lowcountry-oyster-roast-marsh-golden-hour-1024x576\.jpg$/,
  'event-6.jpg': /^candlelit-anniversary-dinner-twelve-guests-1024x576\.jpg$/,
  'face-1.jpg': /^testimonial-1\.jpg$/,
  'face-2.jpg': /^testimonial-2-BRS8aNI2\.jpg$/,
  'face-3.jpg': /^testimonial-3-1\.jpg$/,
  'face-4.jpg': /^testimonial-4\.jpg$/,
  'partner-magnolia-hall.png': /^partner-magnolia-hall\.png$/,
  'partner-oak-and-ember.png': /^partner-oak-and-ember\.png$/,
  'partner-tidewater-oyster-co.png': /^partner-tidewater-oyster-co\.png$/,
  'partner-palmetto-events.png': /^partner-palmetto-events\.png$/,
  'partner-the-rutledge-inn.png': /^partner-the-rutledge-inn\.png$/,
  'partner-harbor-and-vine.png': /^partner-harbor-and-vine\.png$/,
  'occasion-1.jpg': /^date-night-dinner-for-two-private-chef\.jpg$/,
  'occasion-1-popup.webp': /^plated-tasting-course-cutout\.webp$/,
  'occasion-2.jpg': /^corporate-client-dinner-private-loft\.jpg$/,
  'occasion-2-popup.webp': /^coupe-cocktail-rosemary-cutout\.webp$/,
  'occasion-3.jpg': /^wedding-rehearsal-dinner-garden-toast\.jpg$/,
  'occasion-3-popup.webp': /^white-wedding-cake-flowers-cutout\.webp$/,
  'occasion-4.jpg': /^birthday-dinner-party-cake-candles\.jpg$/,
  'occasion-4-popup.webp': /^champagne-bottle-two-flutes-cutout\.webp$/,
  'team-1.webp': /^julien-marchetti-executive-chef-683x1024\.webp$/,
  'team-2.webp': /^theo-ramirez-sous-chef-683x1024\.webp$/,
  'team-3.webp': /^sofia-lindqvist-pastry-chef-683x1024\.webp$/,
  'team-4.webp': /^amara-okafor-head-mixologist-683x1024\.webp$/,
  'proposal-bg.jpg': /^guests-toasting-candlelit-dinner\.jpg$/,
  'post-1.jpg': /^private-chef-tasting-session-1024x576\.jpg$/,
  'post-2.jpg': /^private-chef-client-menu-consultation-1024x576\.jpg$/,
  'post-3.jpg': /^backyard-party-mobile-bar-cart-1024x576\.jpg$/,
  'team-5.webp': /^grace-whitfield-events-director-683x1024\.webp$/,
  'faq-1.jpg': /^chef-julien-marchetti-portrait-kitchen\.jpg$/,
  'faq-2.jpg': /^private-chef-plating-home-kitchen-service\.jpg$/,
  'service-private-chef-dinners.jpg': /^private-chef-plating-home-kitchen-service-768x1024\.jpg$/,
  'service-event-catering.jpg': /^corporate-retreat-family-style-barn-feast-768x432\.jpg$/,
  'service-mobile-cocktail-bar.jpg': /^backyard-party-mobile-bar-cart-768x432\.jpg$/,
  'service-wedding-dinners-rehearsals.jpg': /^wedding-rehearsal-dinner-garden-toast-768x1024\.jpg$/,
  'service-corporate-dinners-launches.jpg': /^corporate-client-dinner-private-loft-768x1024\.jpg$/,
  'service-cooking-cocktail-classes.jpg': /^chefs-table-dinner-kitchen-island-768x432\.jpg$/,
  'team-julien-marchetti.webp': /^julien-marchetti-executive-chef-683x1024\.webp$/,
  'team-theo-ramirez.webp': /^theo-ramirez-sous-chef-683x1024\.webp$/,
  'team-sofia-lindqvist.webp': /^sofia-lindqvist-pastry-chef-683x1024\.webp$/,
  'team-amara-okafor.webp': /^amara-okafor-head-mixologist-683x1024\.webp$/,
  'team-grace-whitfield.webp': /^grace-whitfield-events-director-683x1024\.webp$/,
  'team-nora-castellano.webp': /^nora-castellano-sommelier-683x1024\.webp$/,
  'team-leo-park.webp': /^leo-park-bar-logistics-manager-683x1024\.webp$/,
  'team-malik-johnson.webp': /^malik-johnson-lead-bartender-683x1024\.webp$/,
  'thumb-planning-a-mobile-bar-for-your-party.jpg':
    /^backyard-party-mobile-bar-cart-1024x576\.jpg$/,
  'thumb-private-chef-questions-answered.jpg':
    /^private-chef-client-menu-consultation-1024x576\.jpg$/,
  'thumb-seasonal-lowcountry-menu-autumn.jpg': /^autumn-lowcountry-menu-spread-1024x576\.jpg$/,
  'thumb-what-to-expect-from-a-private-chef-tasting.jpg':
    /^private-chef-tasting-session-1024x576\.jpg$/,
  'thumb-signature-cocktails-for-your-wedding.jpg':
    /^signature-wedding-cocktails-mobile-bar-1024x576\.jpg$/,
  'thumb-how-to-host-a-dinner-party-with-a-private-chef.jpg':
    /^host-dinner-party-private-chef-1024x576\.jpg$/,
  'project-corporate-retreat-feast.jpg': /^corporate-retreat-family-style-barn-feast-768x432\.jpg$/,
  'project-rooftop-launch-cocktail-party.jpg':
    /^rooftop-launch-cocktail-party-harbor-768x432\.jpg$/,
  'project-seven-course-chefs-table.jpg': /^chefs-table-dinner-kitchen-island-768x432\.jpg$/,
  'project-garden-wedding-cocktail-hour.jpg':
    /^garden-wedding-cocktail-hour-mobile-bars-768x432\.jpg$/,
  'project-lowcountry-oyster-roast.jpg': /^lowcountry-oyster-roast-marsh-golden-hour-768x432\.jpg$/,
  'project-candlelit-anniversary-dinner.jpg':
    /^candlelit-anniversary-dinner-twelve-guests-768x432\.jpg$/,
  'project-rooftop-hero.jpg': /^rooftop-launch-cocktail-party-harbor-1024x576\.jpg$/,
  'project-gallery-2.jpg': /^bartender-pouring-coupe-cocktail-768x768\.jpg$/,
  'project-gallery-3.jpg': /^lowcountry-oysters-on-ice-768x768\.jpg$/,
  'project-gallery-4.jpg': /^anniversary-celebration-dinner-champagne-toast-768x1024\.jpg$/,
  'project-gallery-5.jpg': /^guests-toasting-candlelit-dinner-768x768\.jpg$/,
  'bar-hero.jpg': /^mobile-cocktail-bar-garden-party-dusk\.jpg$/,
  'bar-card-1.jpg': /^garden-wedding-cocktail-hour-mobile-bars-1024x576\.jpg$/,
  'bar-card-2.jpg': /^backyard-party-mobile-bar-cart-1024x576\.jpg$/,
  'bar-card-3.jpg': /^rooftop-launch-cocktail-party-harbor-1024x576\.jpg$/,
  'bar-chef.jpg': /^amara-okafor-mixologist-behind-bar-768x1024\.jpg$/,
  'bar-chef-inset.jpg': /^bartender-preparing-cocktail-garnishes-768x1024\.jpg$/,
  'bar-about-1.jpg': /^bartender-shaking-cocktail-mobile-bar\.jpg$/,
  'bar-about-2.jpg': /^signature-wedding-cocktails-mobile-bar\.jpg$/,
  'bar-about-3.jpg': /^bartender-pouring-coupe-cocktail\.jpg$/,
  'bar-menu-1.jpg': /^pink-sparkling-cocktails-coupes-768x1024\.jpg$/,
  'bar-menu-2.jpg': /^tray-of-spritz-cocktails-garden-party-768x1024\.jpg$/,
  'bar-menu-3.jpg': /^bartender-preparing-cocktail-garnishes-768x1024\.jpg$/,
  'bar-strip-1.jpg': /^negroni-orange-twist-copper-bar-768x1024\.jpg$/,
  'bar-strip-2.jpg': /^bartender-pouring-coupe-cocktail-768x768\.jpg$/,
  'bar-strip-3.jpg': /^tray-of-spritz-cocktails-garden-party-768x1024\.jpg$/,
  'bar-strip-4.jpg': /^bartender-preparing-cocktail-garnishes-768x1024\.jpg$/,
  'bar-strip-5.jpg': /^signature-wedding-cocktails-mobile-bar-768x432\.jpg$/,
  'bar-strip-6.jpg': /^rooftop-launch-cocktail-party-harbor-768x432\.jpg$/,
  'bar-strip-7.jpg': /^pink-sparkling-cocktails-coupes-768x1024\.jpg$/,
  'bar-strip-8.jpg': /^garden-wedding-cocktail-hour-mobile-bars-768x432\.jpg$/,
  'bar-strip-9.jpg': /^bartender-shaking-cocktail-mobile-bar-768x512\.jpg$/,
  'bar-strip-10.jpg': /^backyard-party-mobile-bar-cart-768x432\.jpg$/,
  'bar-included.jpg': /^copper-mobile-bar-cart-stocked-768x1024\.jpg$/,
  'bar-included-inset.jpg': /^pink-sparkling-cocktails-coupes-768x1024\.jpg$/,
  'post-body-planning-a-mobile-bar.jpg': /^backyard-party-mobile-bar-cart-1536x864\.jpg$/,
  'post-planning-a-mobile-bar-for-your-party.jpg': /^backyard-party-mobile-bar-cart-1400x650\.jpg$/,
  'post-private-chef-questions-answered.jpg':
    /^private-chef-client-menu-consultation-1400x650\.jpg$/,
  'post-seasonal-lowcountry-menu-autumn.jpg': /^autumn-lowcountry-menu-spread-1400x650\.jpg$/,
  'post-what-to-expect-from-a-private-chef-tasting.jpg':
    /^private-chef-tasting-session-1400x650\.jpg$/,
  'post-signature-cocktails-for-your-wedding.jpg':
    /^signature-wedding-cocktails-mobile-bar-1400x650\.jpg$/,
  'post-how-to-host-a-dinner-party-with-a-private-chef.jpg':
    /^host-dinner-party-private-chef-1400x650\.jpg$/,
  'card-3.jpg': /^villa-terrace-dinner-marsh-view-chef-768x1024\.jpg$/,
}
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  )
const files = walk(uploads)
for (const [name, re] of Object.entries(wanted)) {
  const f = files.find((p) => re.test(p.split('/').pop()))
  if (!f) throw new Error(`Photo de démo introuvable pour ${name}`)
  cpSync(f, out + name)
}
console.log('fixtures prêtes :', Object.keys(wanted).join(', '))
