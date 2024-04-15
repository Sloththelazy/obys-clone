function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 200,
    stagger: 0.35,
    duration: 0.6,
    delay: 0.5,
  });
  tl.from("#line1-part1", {
    opacity: 0,
    onStart: function () {
      var h5timer = document.querySelector("#line1-part1 h5");
      var grow = 0;
      setInterval(function () {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
        }
      }, 16);
    },
  });
  tl.to(".line-h2", {
    animationName: "loaderAnime",
    opacity: 1,
    ease:'power4.out'
  });
  tl.from (".lineh3" , {
    opacity: 0 ,
    ease: 'power2.out', 
});
  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 2.6,
  });
  tl.from("#page1", {
    delay: 0.2,
    y: 1600,
    duration: 0.5,
    ease: Power4,
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from("#nav", {
    y:140,
    opacity:0,
    ease:'power2.out'
  });
  tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1", {
    y: 140,
    stagger: 0.2,
    ease:'power4.out'
  });
  tl.from(
    "#hero1, #page2",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}
function cursorAnimation() {
  //Cumbunto Animation
  var frames = document.querySelectorAll(".frame") 
  const lerp = (x , y, a) => x * ( 1 - a ) + y * a ;

  frames.forEach(frame => {
      frame.addEventListener("mousemove" , function (dets) {

          var dims = frame.getBoundingClientRect(); // gives you the dimensions of the frame
          var xstart = dims.x - 10
          var xend = dims.x + dims.width -10
          var zerotoone = gsap.utils.mapRange(xstart , xend , 0, 1, dets.clientX)
         
  
          gsap.to("#crsr" , {
              scale: 2 ,
              innerHTML:"" ,
              ease:'power4.out'
          })
          gsap.to(frame.children , {
              color: "#fff" ,
              fontSize: '1.5vw',
              ease: "power4.out",
              duration: 1, 
              y: "-3.5vw"
          })
          gsap.to(frame.children , {
              x: lerp(-75 , 75 , zerotoone),
              duration: 0.3 ,
              ease:"power4.out"
          })
      })
      frame.addEventListener("mouseleave" , function(dets) {
          gsap.to("#crsr" , {
              scale:1 ,
              innerHTML:"Scroll",
              ease:"power4.out"
          })
          gsap.to(frame.children, {
              color: "#fff" ,
              fontSize: '1vw',
              ease: "power4.out",
              duration: 1,
              y:0
          })
          gsap.to(frame.children , {
              x: 0,
              duration: 0.3 ,
              ease:"power4.out"
          })
      })
  })
 

  document.addEventListener("mousemove", function(dets) {
      gsap.to("#crsr", {
          left: dets.x,
          top: dets.y,
      });
  });
  document.addEventListener("mouseenter" , function() {
      gsap.to("#crsr" , { // mouse enter and leave animation
          scale: 1 ,
          opacity: 1
      })
  })
  document.addEventListener("mouseleave" , function() {
      gsap.to("#crsr" , { // mouse leave animation (this is a problem in the website the mosue seems stuck when we leave the window)
          scale: 0,
          opacity:0
      })
  })

  var page4 = document.querySelector("#page4")
  var page3 = document.querySelector("#page3")

  page3.addEventListener("mouseenter" , function() {
      gsap.to("#crsr" , { // mouse enter and leave animation
          scale: 0 ,
          opacity: 0
      })
  })
  page3.addEventListener("mouseleave" , function() {
      gsap.to("#crsr" , { // mouse leave animation (this is a problem in the website the mosue seems stuck when we leave the window)
          scale: 1,
          opacity:1
      })
  })


  page4.addEventListener("mouseenter" , function() {
      gsap.to("#crsr" , { // mouse enter and leave animation
          scale: 0 ,
          opacity: 0
      })
  })
  page4.addEventListener("mouseleave" , function() {
      gsap.to("#crsr" , { // mouse leave animation (this is a problem in the website the mosue seems stuck when we leave the window)
          scale: 1,
          opacity:1
      })
  })



  var flag = 0
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play()
      video.style.opacity = 1
      document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`
      gsap.to("#video-cursor", {
        scale: 0.5
      })
      flag = 1
    } else {
      video.pause()
      video.style.opacity = 0
      document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`
      gsap.to("#video-cursor", {
        scale: 1
      })
      flag = 0
    }
  })
}
function sheryAnimation(){
  Shery.imageEffect(".image-div" , {
      style:5,
      // debug:true,
      config:{"a":{"value":0.45,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.6857083080101598},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.2,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":1.15,"range":[0,10]},"metaball":{"value":0.52,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
      gooey:true
  })
}
function flagAnimation() {

  document.addEventListener("mousemove", function (dets) {
    gsap.to("#flag", {
      x: dets.x,
      y: dets.y
    })
  })
  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to("#flag", {
      opacity: 1
    })
  })
  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to("#flag", {
      opacity: 0
    })
  })

}
function footerAnimation() {

  var clutter = ""
  var clutter2 = ""
  document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`
  })
  document.querySelector("#footer h1").innerHTML = clutter
  document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
    clutter2 += `<span>${elem}</span>`
  })
  document.querySelector("#footer h2").innerHTML = clutter2


  document.querySelector("#footer-text").addEventListener("mouseenter", function () {
    gsap.to("#footer h1 span", {
      opacity: 0,
      stagger: 0.05
    })
    gsap.to("#footer h2 span", {
      delay: 0.35,
      opacity: 1,
      stagger: 0.1
    })
  })
  document.querySelector("#footer-text").addEventListener("mouseleave", function () {
    gsap.to("#footer h1 span", {
      opacity: 1,
      stagger: 0.1,
      delay: 0.35,

    })
    gsap.to("#footer h2 span", {
      opacity: 0,
      stagger: 0.05
    })
  })
}

loadingAnimation();
cursorAnimation();
locomotiveAnimation();
sheryAnimation();
flagAnimation()
footerAnimation()