function loadingAnimation() {
var tl = gsap.timeline();
tl.from (".line h1 , .line-h2 " , {
    y:150 ,
    stagger: 0.35,
    duration: 0.8,
    ease:'power2.out',
    delay: 0.4
})
tl.from ("#line1-part1  " , {
    opacity: 0,
    onStart: function () {
        var h5timer = document.querySelector("#line1-part1 h5");
        var grow = 0 ;
        setInterval(function () {
            if (grow < 100) {
                h5timer.innerHTML = grow++ ;
            }
            else {
                h5timer.innerHTML = grow ;
            }
        }, 21);
    },
});

// tl.to(" .line h2" , {
//     animationName: "anime" ,
// })
tl.from (".lineh3" , {
    opacity: 0 ,
    ease: Power4, 
});
tl.to ("#loader" , {
    opacity: 0,
    duration: 0.4,
    delay: 2,
});

tl.from("#page1" , {
    delay:0.2,
    y:1600,
    opacity:0,
    ease:Power4
});
tl.to ("#loader" , {
    display: "none"
})
tl.from("#nav" , {
    opacity:0,
    ease:'power2.out'

})
tl.from("#hero1 h1 ,#hero2 h1 ,#hero3 h2,#hero4 h1", {
    y:150 ,
    stagger: 0.1,
    ease:'power2.out'
})

// disabling the cursor for the loader 
const yourDiv = document.getElementById("loader");

yourDiv.style.cursor = 'none';

// Optionally, restore the cursor when the mouse leaves the div
yourDiv.addEventListener('mouseleave', () => {
  yourDiv.style.cursor = 'auto';
});
}

function cursorAnime() {
    //Cumbunto Animation
    var frames = document.querySelectorAll(".frame") 
    const lerp = (x , y, a) => x * ( 1 - a ) + y * a ;

    frames.forEach(frame => {
        frame.addEventListener("mousemove" , function (dets) {

            var dims = frame.getBoundingClientRect(); // gives you the dimensions of the frame
            var xstart = dims.x
            var xend = dims.x + dims.width
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
}
 function imageAnime() {
    var Elem = document.querySelectorAll(".blue-div-elem"); // gives us a node list
    var imgElem = document.querySelectorAll(".blue-div-elem img");

    Elem.forEach(function(elem){
        elem.addEventListener("mouseenter" , function(){
            // console.log(elem.childNodes) i used this to find the index of image in the nodelist
            
            gsap.to(elem.childNodes[5] , {
                opacity: 1,
                scale:1 ,
                ease: 'power2.out'
            })
        })
        elem.addEventListener("mouseleave" , function () {
            // console.log(elem.childNodes)
            gsap.to(elem.childNodes[5] , {
                opacity: 0,
                scale:0 ,
                ease:'power2.out'
            })
        })
        // dets ---- gives us the details about the x and the y axis coordinates of the mouse
        // in real time and we can use it to make a animation for when the mouse enters a
        // particular div
        elem.addEventListener("mousemove" , function(dets) {
            // since div is also used for making shapes hence we have properties to know about is 
            // height and width one such property can tell us from where to where hsall the image
            // follow the cursor
            gsap.to(elem.childNodes[5] , {
                x:dets.x - elem.getBoundingClientRect().x -25 ,
                y:dets.y - elem.getBoundingClientRect().y -50  
            })
        })
    })
 }

 imageAnime();
cursorAnime();
loadingAnimation();