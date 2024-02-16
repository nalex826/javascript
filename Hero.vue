<template>
    <div class="hero bkg" :style="{ 'background-image': 'url(' + require('@/assets/' + bkgImage) + ')', 'background-color': bkgColor }">
      <div v-if="bkgVideo" class="embed-responsive embed-responsive-16by9 d-none d-md-block">
        <video class="embed-responsive-item" autoplay loop muted playsinline>
          <source :src="require('@/assets/' + bkgVideo)" type="video/mp4" />
        </video>
      </div>
      <div v-else-if="bkgVideoFull" class="video-wrapper">
        <iframe id="video-hero" :src="`https://player.vimeo.com/video/${bkgVideoFull}&title=0&api=1&background=1&autoplay=1&loop=1&byline=0&title=0`" width="100%" height="100%" frameborder="0" allow="autoplay" allowfullscreen=""></iframe>
      </div>
      <img v-if="bkgImageMobile" class="img-fluid d-md-none mobile-image" :src="require('@/assets/' + bkgImageMobile)" :alt="title" />
      <div :class="positionClass ? 'align-position d-flex h-100 align-items-center ' + positionClass : 'align-position d-flex h-100 align-items-center'">
        <div class="overlay">
          <div class="wrapper inview animated delay-1" :data-offset="offset ? offset : null">
            <div v-if="titleClass" class="d-flex justify-content-start align-items-center">
              <img v-if="iconImage" :src="require('@/assets/' + iconImage)" class="img-fluid icon" :alt="title">
              <h1 :class="titleClass">{{ title }}</h1>
            </div>
            <div v-if="$slots.default" class="content inview animated delay-2 slow" :data-offset="offset ? offset : null">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import helpers from '@/scripts/helpers.js';
  
  export default {
    props: ['content', 'title', 'titleClass', 'bkgImage', 'bkgColor', 'bkgImageMobile', 'iconImage', 'positionClass', 'offset', 'bkgVideo', 'bkgVideoFull'],
    mounted() {
      helpers.initWaypoint();
    }
  };
  </script>
  
  <style lang="scss" scoped>
  $mobile: 767px;
  
  .hero {
    position: relative;
    height: 85vh;
    min-height: 700px;
    overflow: hidden;
  
    &.video {
      height: 46vw;
      min-height: inherit;
  
      @media (max-width: 1799px) {
        height: 50vw;
      }
    }
  
    &.full-video {
      background: #000 !important;
    }
  
    .video-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
  
      iframe {
        width: 100vw;
        height: 56.25vw;
        min-height: 100vh;
        min-width: 177.77vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  
    &.bkg,
    .bkg {
      background-position: center top;
      background-repeat: no-repeat;
      background-size: cover;
  
      @media (max-width: $mobile) {
        background-image: none !important;
        padding-bottom: 60rem;
      }
    }
  
    &.long {
      @media (max-width: $mobile) {
        padding-bottom: 75rem;
      }
    }
  
    .embed-responsive {
      position: absolute;
      z-index: 0;
    }
  
    .mobile-image {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
  }
  </style>
  