import { $, $$ } from './variables/utils.js';

export default function addHomeAnimation() {
  /*=====================
      Sale Banner Container
    ======================*/

  const saleBannerContainer = $('.banner-sale__container');
  const saleBannerContainerOptions = {
    rootMargin: '-45% 0px 0px 0px',
    threshold: 0,
  };
  const saleBannerContainerObserver = new IntersectionObserver(
    (entries, saleBannerContainerObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('appear');
        else entry.target.classList.remove('appear');
      });
    },
    saleBannerContainerOptions
  );

  saleBannerContainerObserver.observe(saleBannerContainer);

  /*====================
      Sale Banner Contents
    =====================*/

  const saleBannerContents = $$(
    '.banner-sale__heading, .banner-sale__desc, .banner-sale__cta'
  );
  const saleBannerContentOptions = {
    rootMargin: '-30% 0px 0px 0px',
    threshold: 0,
  };
  const saleBannerContentObserver = new IntersectionObserver(
    (entries, saleBannerContentsObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('appear');
        else entry.target.classList.remove('appear');
      });
    },
    saleBannerContentOptions
  );

  saleBannerContents.forEach((content) => {
    saleBannerContentObserver.observe(content);
  });

  /*========
      Others
    ========*/

  const items = $$(
    '.col.col-12.xl-12.lg-7.md-12.sm-12,.col.col-6.xl-6.lg-12.md-6.sm-12, .product-top-item, .accessories-item, .home-blog-item'
  );
  const itemOptions = {
    rootMargin: '0px 0px -20% 0px',
    threshold: 0,
  };
  const itemObserver = new IntersectionObserver((entries, itemsObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('appear');
    });
  }, itemOptions);

  items.forEach((product) => {
    itemObserver.observe(product);
  });

  /*=============
      Banners
    ==============*/

  const banners = $$(
    '.banner-stick__content, .banner-stick__img, .banner-side__img, .banner-side__content'
  );
  const bannerOptions = {
    rootMargin: '0px 0px -30% 0px',
    threshold: 0,
  };
  const bannerObserver = new IntersectionObserver(
    (entries, bannersObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('appear');
      });
    },
    bannerOptions
  );

  banners.forEach((banner) => {
    bannerObserver.observe(banner);
  });
}
