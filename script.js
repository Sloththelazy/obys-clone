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

// disabling the cursor for the loader 
const yourDiv = document.getElementById("loader");

yourDiv.style.cursor = 'none';

// Optionally, restore the cursor when the mouse leaves the div
yourDiv.addEventListener('mouseleave', () => {
  yourDiv.style.cursor = 'auto';
});
}

function cursorAnime() {
    document.addEventListener("mousemove", function(dets) {
        gsap.to("#crsr", {
            left: dets.x,
            top: dets.y,
        });
    });
    document.addEventListener("mouseenter" , function() {
        gsap.to("#crsr" , {
            scale: 1 ,
            opacity: 1
        })
    })
    document.addEventListener("mouseleave" , function() {
        gsap.to("#crsr" , {
            scale: 0,
            opacity:0
        })
    })
}

cursorAnime()
loadingAnimation();