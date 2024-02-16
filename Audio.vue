<template>
<div id="audio">
  <div class="audio-wrapper d-flex justify-content-start">
    <div class="audio-brand" @click="toggleSlide(audio)"><img src="@/assets/brand_logo.png" class="img-fluid" alt="Play Audio" /></div>
    <div class="description collapse fade">
      <div class="d-flex h-100 justify-content-start">
        <div class="title-wrapper d-flex align-items-center">
          <div class="audio-title"></div>
        </div>
        <div class="buttons d-flex align-items-center justify-content-end">
          <div class="button" @click="togglePrev(audio)"><svg class="img-fluid" stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="m16 7-7 5 7 5zm-7 5V7H7v10h2z"></path>
            </svg></div>
          <div class="button play" :class="{ pause: isActive }" @click.prevent="audio[isIndex].isPlaying ? pause(audio) : play(audio)"><svg class="img-fluid playbtn" stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="24"
              width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 6v12l10-6z"></path>
            </svg><svg class="img-fluid pausebtn" stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7h3v10H8zm5 0h3v10h-3z"></path>
            </svg></div>
          <div class="button" @click="toggleNext(audio)"><svg class="img-fluid" stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 7v10l7-5zm9 10V7h-2v10z"></path>
            </svg></div>
        </div>
      </div>
    </div>
    <div class="play-icon" @click="toggleSlide(audio)">
      <img src="@/assets/play-button.png" class="img-fluid" alt="Play Audio" />
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Audio',
  data: function() {
    return {
      isActive: false,
      isIndex: 0,
      audio: [{
          title: 'Rebels',
          file: new Audio(require('@/assets/rebels.mp3')),
          isPlaying: false
        },
        {
          title: 'Rebels 2',
          file: new Audio(require('@/assets/Rebels2.mp3')),
          isPlaying: false
        },
        {
          title: 'Beasts',
          file: new Audio(require('@/assets/Beasts.mp3')),
          isPlaying: false
        },
        {
          title: 'Dreams',
          file: new Audio(require('@/assets/Dreams.mp3')),
          isPlaying: false
        },
        {
          title: 'Nightmares',
          file: new Audio(require('@/assets/Nightmares.mp3')),
          isPlaying: false
        }
      ]
    }
  },
  methods: {
    toggleSlide: function(audio) {
      let parent = document.getElementById('audio');
      let element = parent.getElementsByClassName("audio-wrapper");
      let elementTitle = parent.getElementsByClassName("audio-title");
      let elementDesc = parent.getElementsByClassName("description");
      if (!element[0].classList.contains('expand')) {
        element[0].classList.add("expand");
        elementDesc[0].classList.add("show");
        if (audio[this.isIndex].isPlaying === false) {
          this.isIndex = 0;
          elementTitle[0].innerHTML = audio[this.isIndex].title;
          audio[this.isIndex].isPlaying = true;
          audio[this.isIndex].file.play();
          this.isActive = true;
          var $this = this;
          audio[this.isIndex].file.addEventListener("ended", function() {
            $this.toggleNext(audio);
          });
        }
      } else {
        element[0].classList.remove("expand");
        elementDesc[0].classList.remove("show");
      }
    },
    play(audio) {
      audio[this.isIndex].isPlaying = true;
      audio[this.isIndex].file.play();
      this.isActive = !this.isActive;
    },
    pause(audio) {
      audio[this.isIndex].isPlaying = false;
      audio[this.isIndex].file.pause();
      this.isActive = !this.isActive;
    },
    togglePrev(audio) {
      let parent = document.getElementById('audio');
      let elementTitle = parent.getElementsByClassName("audio-title");
      audio[this.isIndex].file.pause();
      audio[this.isIndex].file.currentTime = 0;
      this.isIndex = this.isIndex - 1;
      if (audio[this.isIndex] !== undefined) {
        audio[this.isIndex].isPlaying = true;
        audio[this.isIndex].file.play();
      } else {
        this.isIndex = audio.length - 1;
        audio[this.isIndex].isPlaying = true;
        audio[this.isIndex].file.play();
      }
      if (audio[this.isIndex].isPlaying === true) {
        this.isActive = true;
      }
      var $this = this;
      elementTitle[0].innerHTML = audio[this.isIndex].title;
      audio[this.isIndex].file.addEventListener("ended", function() {
        $this.togglePrev(audio);
      });
    },
    toggleNext(audio) {
      let parent = document.getElementById('audio');
      let elementTitle = parent.getElementsByClassName("audio-title");
      audio[this.isIndex].file.pause();
      audio[this.isIndex].file.currentTime = 0;
      this.isIndex = this.isIndex + 1;
      if (audio[this.isIndex] !== undefined) {
        audio[this.isIndex].isPlaying = true;
        audio[this.isIndex].file.play();
      } else {
        this.isIndex = 0;
        audio[this.isIndex].isPlaying = true;
        audio[this.isIndex].file.play();
      }
      if (audio[this.isIndex].isPlaying === true) {
        this.isActive = true;
      }
      elementTitle[0].innerHTML = audio[this.isIndex].title;
      var $this = this;
      audio[this.isIndex].file.addEventListener("ended", function() {
        $this.togglePrev(audio);
      });
    },
  }
}
</script>

<style lang="scss" scoped>
#audio {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    z-index: 2;
    cursor: pointer;
    .audio-wrapper {
        width: 140px;
        height: 50px;
        border-radius: 7px;
        background: #3d1c94;
        box-shadow: 0 0 6px rgba(0,0,0,0.4);
        @media(max-width: 767px) {
            width: 80px;
            height: 40px;
        }
        &.expand {
            width: 320px;
            .play-icon {
                transform: scale(0.7) !important;
            }
            .description {
                width: 100%;
            }
        }
        .audio-brand {
            max-width: 80px;
            padding: 10px;
            @media(max-width: 767px) {
                max-width: 65px;
                padding: 8px;
            }
        }
        .title-wrapper {
            width: 50%;
            .audio-title {
                color: #fff;
                font-size: 1rem;
            }
        }
        .buttons {
            width: 84px;
        }
        .button {
            transform: scale(1);
            transition: transform 0.3s ease;
            &.play {
                transform: scale(1.2);
                .playbtn {
                    display: block;
                }
                .pausebtn {
                    display: none;
                }
            }
            &.pause {
                .playbtn {
                    display: none;
                }
                .pausebtn {
                    display: block;
                }
            }
            &:hover {
                transform: scale(1);
            }
        }
        .play-icon {
            width: 40px;
            height: 40px;
            position: absolute;
            right: -10px;
            top: -10px;
            border-radius: 50%;
            background-color: #3d1c94;
            transform: scale(0.9);
            transition: transform 0.4s ease;
            @media(max-width: 767px) {
                width: 30px;
                height: 30px;
            }
        }
        &:hover {
            .play-icon {
                transform: scale(1);
            }
        }
    }
}
</style>
