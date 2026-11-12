const mediaQuery = window.matchMedia('(min-width: 481px)')
if (mediaQuery.matches) {

    window.addEventListener("load", function (event) {
        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                reverse: true
            }
        });

        // Create a GSAP timeline for the scaling and property change animation
        var scaleTimeline = gsap.timeline();

        // Add the scale and property change animations to the timeline
        scaleTimeline.to(".branding", {
            "--logo-scroll-position": "-50%",
            "--logo-scroll-margin": "50px",
            duration: 2 // duration in seconds for the scaling (2 seconds)
        });

        // Create the scene for the scaling and property change animation
        var scaleScene = new ScrollMagic.Scene({
            triggerHook: 0,
            duration: 2000 // Adjust duration as needed
        })
        .setTween(scaleTimeline)
        .addTo(controller);

        // Create a GSAP timeline for the width change animation
        var widthTimeline = gsap.timeline();

        // Add the width change animation to the timeline
        widthTimeline.to(".branding__logo", {
            "--logo-scroll-width": "50vw",
            duration: 2 // duration in seconds for the width change
        });

        // Create the scene for the width change animation
        var widthScene = new ScrollMagic.Scene({
            triggerHook: 0,
            duration: 2000 // Adjust duration as needed
        })
        .setTween(widthTimeline)
        .addTo(controller);

        
        // Create a GSAP timeline for the color change animation
        var colorTimeline = gsap.timeline();

        // Add the color change animation to the timeline როდესაც არ მინდა work-და home-ი სხვადასხვა იყოს
        // colorTimeline.to(".branding__logo, .site-nav__list a.is-active", {
        //     color: "red",
        //     duration: 0.1 // duration in seconds for the color change
        // });

        // როდესაც მინდა work-და home-ი სხვადასხვა იყოს
        colorTimeline.to(".branding__logo, .site-nav__list a.work-active", {
            color: "rgb(235,63,67)",
            duration: 0.1 // duration in seconds for the color change
        });
        // End of როდესაც მინდა work-და home-ი სხვადასხვა იყოს

        // Create the scene for the color change animation
        var colorScene = new ScrollMagic.Scene({
            triggerElement: "#work", // Set the trigger element to the #work element
            triggerHook: 0.5, // Adjust triggerHook as needed
            duration: 0 // Duration of 0 means it will happen immediately when triggered
        })
        .setTween(colorTimeline)
        .addTo(controller);

        // Create the scene to add the has-red-nav class
        var classToggleScene = new ScrollMagic.Scene({
            triggerHook: 0,
            triggerElement: "#work",
            triggerHook: 0.5, // Adjust triggerHook as needed
            duration: 0 // Duration of 0 means it will happen immediately when triggered
        })
        .setClassToggle(".site-nav__list a", "has-red-nav") // Add the has-red-nav class to .site-nav__list a
        .addTo(controller);

        // როდესაც მინდა work-და home-ი სხვადასხვა იყოს
        var activeClassScene = new ScrollMagic.Scene({
            triggerElement: "#work",
            triggerHook: 0.5, // Adjust triggerHook as needed
            duration: 0 // Duration of 0 means it will happen immediately when triggered
        })
        .setClassToggle(".site-nav__list a.work-active", "is-active") // Add the is-active class to .site-nav__list a.work-active
        .addTo(controller);
        // End of როდესაც მინდა work-და home-ი სხვადასხვა იყოს


        // Calculate the duration dynamically
        var heroConOffsetTop = document.querySelector(".section--v-center").offsetTop;
        var workOffsetTop = document.querySelector("#work").offsetTop;
        var totalDuration = workOffsetTop - heroConOffsetTop;

        // Define the number of steps and the step size
        var steps = 1;
        var stepSize = 0 / steps;

        // Create ScrollMagic Scenes for each step
        for (let i = 0; i < steps; i++) {
            let scene = new ScrollMagic.Scene({
                triggerElement: ".section--v-center",
                triggerHook: 0,
                offset: (totalDuration / steps) * i,
                duration: totalDuration / steps
            })
            .on("progress", function (e) {
                // Calculate the current position based on the step size
                var currentPosition = stepSize * Math.ceil(steps * e.progress);
                // Set the y position of the element
                document.querySelector(".section--v-center").style.transform = "translateY(" + currentPosition + "px)";
            })
            .setPin(".section--v-center")
            // .addIndicators({name: "Step " + (i + 1)}) // Uncomment for debugging
            .addTo(controller);
        }
    });

    // For logo pointerevents
    window.addEventListener("DOMContentLoaded", function () {
        // Select the branding logo element
        var brandingLogo = document.querySelector(".branding__logo");

        // Create a function to handle style attribute changes
        function handleStyleChanges(mutationsList, observer) {
            mutationsList.forEach(function(mutation) {
                // Check if the mutation type is attributes and if the changed attribute is style
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    // Check if the --logo-scroll-width property has changed
                    if (mutation.target.style.getPropertyValue("--logo-scroll-width") === "50vw") {
                        brandingLogo.style.pointerEvents = "all";
                    } else {
                        brandingLogo.style.pointerEvents = "none";
                    }
                }
            });
        }

        // Create a MutationObserver instance
        var observer = new MutationObserver(handleStyleChanges);

        // Start observing changes in the branding logo element's attributes
        observer.observe(brandingLogo, { attributes: true });
    });
    // End of for logo pointerevents


    // slider
    // გარე კლიკით (სლაიდერის კონტეინერის მიღმა) აჩქარებით
    // document.addEventListener("DOMContentLoaded", function() {
    //     const carouselSlider = document.querySelector('.carousel_slider');
    //     const carouselTrack = document.querySelector('.carousel_track');
    //     const cols = document.querySelectorAll('.carousel_track .col');
    //     const cloneCount = 2;  // Adjust this if you have a different number of clones
    //     let isDragging = false;
    //     let startX, scrollLeft, animationId;
    //     let speed = 0.4;  // Adjust speed as needed
    //     let isPaused = false;

    //     function startDrag(e) {
    //         isDragging = true;
    //         startX = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         scrollLeft = carouselTrack.getBoundingClientRect().left;
    //         cancelAnimationFrame(animationId);
    //     }

    //     function endDrag() {
    //         isDragging = false;
    //         if (!isPaused) {
    //             requestAnimationFrame(animate);
    //         }
    //     }

    //     function moveDrag(e) {
    //         if (!isDragging) return;
    //         const x = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         const diff = x - startX;
    //         carouselTrack.style.transform = `translateX(${scrollLeft + diff}px)`;
    //         handleInfiniteScroll();
    //     }

    //     function handleInfiniteScroll() {
    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right < sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(${sliderRect.width - trackRect.width}px)`;
    //         }

    //         if (trackRect.left > sliderRect.left) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         }
    //     }

    //     function animate() {
    //         if (isPaused) return;
            
    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right <= sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         } else {
    //             const currentTranslateX = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    //             carouselTrack.style.transform = `translateX(${currentTranslateX - speed}px)`;
    //         }

    //         animationId = requestAnimationFrame(animate);
    //     }

    //     carouselSlider.addEventListener('mousedown', startDrag);
    //     carouselSlider.addEventListener('touchstart', startDrag);

    //     document.addEventListener('mousemove', moveDrag);
    //     document.addEventListener('touchmove', moveDrag);

    //     document.addEventListener('mouseup', endDrag);
    //     document.addEventListener('touchend', endDrag);

    //     // Prevent images from interfering with dragging
    //     const images = document.querySelectorAll('.carousel_slide img');
    //     images.forEach(image => {
    //         image.addEventListener('dragstart', function(e) {
    //             e.preventDefault();
    //         });

    //         image.addEventListener('mousedown', function(e) {
    //             startDrag(e);
    //         });

    //         image.addEventListener('touchstart', function(e) {
    //             startDrag(e);
    //         });
    //     });

    //     // Handle hover to pause and resume
    //     carouselSlider.addEventListener('mouseenter', function() {
    //         isPaused = true;
    //         cancelAnimationFrame(animationId);
    //     });

    //     carouselSlider.addEventListener('mouseleave', function() {
    //         isPaused = false;
    //         if (!isDragging) {
    //             requestAnimationFrame(animate);
    //         }
    //     });

    //     // Start the animation
    //     requestAnimationFrame(animate);
    // });

    // document.addEventListener("DOMContentLoaded", function() {
    //     const carouselSlider = document.querySelector('.carousel_slider');
    //     const carouselTrack = document.querySelector('.carousel_track');
    //     let isDragging = false;
    //     let startX, scrollLeft, animationId;
    //     let speed = 0.4;  // Adjust speed as needed
    //     let isPaused = false;

    //     function startDrag(e) {
    //         isDragging = true;
    //         startX = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         scrollLeft = carouselTrack.getBoundingClientRect().left;
    //         cancelAnimationFrame(animationId);

    //         // Add class to disable text selection
    //         carouselSlider.classList.add('disable-select');
    //     }

    //     function endDrag() {
    //         isDragging = false;
    //         if (!isPaused) {
    //             requestAnimationFrame(animate);
    //         }

    //         // Remove class to enable text selection
    //         carouselSlider.classList.remove('disable-select');
    //     }

    //     function moveDrag(e) {
    //         if (!isDragging) return;
    //         const x = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         const diff = x - startX;
    //         carouselTrack.style.transform = `translateX(${scrollLeft + diff}px)`;
    //         handleInfiniteScroll();
    //     }

    //     function handleInfiniteScroll() {
    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right < sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(${sliderRect.width - trackRect.width}px)`;
    //         }

    //         if (trackRect.left > sliderRect.left) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         }
    //     }

    //     function animate() {
    //         if (isPaused) return;

    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right <= sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         } else {
    //             const currentTranslateX = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    //             carouselTrack.style.transform = `translateX(${currentTranslateX - speed}px)`;
    //         }

    //         animationId = requestAnimationFrame(animate);
    //     }

    //     carouselSlider.addEventListener('mousedown', startDrag);
    //     carouselSlider.addEventListener('touchstart', startDrag);

    //     document.addEventListener('mousemove', moveDrag);
    //     document.addEventListener('touchmove', moveDrag);

    //     document.addEventListener('mouseup', endDrag);
    //     document.addEventListener('touchend', endDrag);

    //     // Prevent images from interfering with dragging
    //     const images = document.querySelectorAll('.carousel_slide img');
    //     images.forEach(image => {
    //         image.addEventListener('dragstart', function(e) {
    //             e.preventDefault();
    //         });

    //         image.addEventListener('mousedown', function(e) {
    //             startDrag(e);
    //         });

    //         image.addEventListener('touchstart', function(e) {
    //             startDrag(e);
    //         });
    //     });

    //     // Handle hover to pause and resume
    //     carouselSlider.addEventListener('mouseenter', function() {
    //         isPaused = true;
    //         cancelAnimationFrame(animationId);
    //     });

    //     carouselSlider.addEventListener('mouseleave', function() {
    //         isPaused = false;
    //         if (!isDragging) {
    //             requestAnimationFrame(animate);
    //         }
    //     });

    //     // Start the animation
    //     requestAnimationFrame(animate);
    // });
    // End of გარე კლიკით (სლაიდერის კონტეინერის მიღმა) აჩქარებით

    // გარე კლიკით (სლაიდერის კონტეინერის მიღმა) აჩქარების გარეშე
    // დრაგი ფოტოზე არ მოქმედებს
    // document.addEventListener("DOMContentLoaded", function() {
    //     const carouselSlider = document.querySelector('.carousel_slider');
    //     const carouselTrack = document.querySelector('.carousel_track');
    //     let isDragging = false;
    //     let startX, scrollLeft;
    //     let animationId;
    //     let speed = 0.4; // Adjust speed as needed
    //     let isPaused = false;

    //     function startDrag(e) {
    //         isDragging = true;
    //         startX = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         scrollLeft = carouselTrack.getBoundingClientRect().left;
    //         cancelAnimationFrame(animationId);
    //         carouselSlider.classList.add('disable-select');

    //         // Attach move and end listeners
    //         document.addEventListener('mousemove', moveDrag);
    //         document.addEventListener('touchmove', moveDrag);
    //         document.addEventListener('mouseup', endDrag);
    //         document.addEventListener('touchend', endDrag);
    //     }

    //     function endDrag() {
    //         isDragging = false;
    //         carouselSlider.classList.remove('disable-select');

    //         // Remove move and end listeners
    //         document.removeEventListener('mousemove', moveDrag);
    //         document.removeEventListener('touchmove', moveDrag);
    //         document.removeEventListener('mouseup', endDrag);
    //         document.removeEventListener('touchend', endDrag);

    //         if (!isPaused) {
    //             requestAnimationFrame(animate);
    //         }
    //     }

    //     function moveDrag(e) {
    //         if (!isDragging) return;
    //         const x = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         const diff = x - startX;
    //         carouselTrack.style.transform = `translateX(${scrollLeft + diff}px)`;
    //         handleInfiniteScroll();
    //     }

    //     function handleInfiniteScroll() {
    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right < sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(${sliderRect.width - trackRect.width}px)`;
    //         }

    //         if (trackRect.left > sliderRect.left) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         }
    //     }

    //     function animate() {
    //         if (isPaused || isDragging) return;

    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right <= sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         } else {
    //             const currentTranslateX = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    //             carouselTrack.style.transform = `translateX(${currentTranslateX - speed}px)`;
    //         }

    //         animationId = requestAnimationFrame(animate);
    //     }

    //     carouselSlider.addEventListener('mousedown', startDrag);
    //     carouselSlider.addEventListener('touchstart', startDrag);

    //     carouselSlider.addEventListener('mouseenter', function() {
    //         isPaused = true;
    //         cancelAnimationFrame(animationId);
    //     });

    //     carouselSlider.addEventListener('mouseleave', function() {
    //         isPaused = false;
    //         if (!isDragging) {
    //             requestAnimationFrame(animate);
    //         }
    //     });

    //     // Start the animation
    //     requestAnimationFrame(animate);
    // });
    // End of დრაგი ფოტოზე არ მოქმედებს

    // დრაგი ფოტოზეც მოქმედებს
    // document.addEventListener("DOMContentLoaded", function() {
    //     const carouselSlider = document.querySelector('.carousel_slider');
    //     const carouselTrack = document.querySelector('.carousel_track');
    //     let isDragging = false;
    //     let startX, scrollLeft;
    //     let animationId;
    //     let speed = 0.4; // Adjust speed as needed
    //     let isPaused = false;

    //     function startDrag(e) {
    //         isDragging = true;
    //         startX = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         scrollLeft = carouselTrack.getBoundingClientRect().left;
    //         cancelAnimationFrame(animationId);
    //         carouselSlider.classList.add('disable-select');

    //         // Attach move and end listeners
    //         document.addEventListener('mousemove', moveDrag);
    //         document.addEventListener('touchmove', moveDrag);
    //         document.addEventListener('mouseup', endDrag);
    //         document.addEventListener('touchend', endDrag);
    //     }

    //     function endDrag() {
    //         isDragging = false;
    //         carouselSlider.classList.remove('disable-select');

    //         // Remove move and end listeners
    //         document.removeEventListener('mousemove', moveDrag);
    //         document.removeEventListener('touchmove', moveDrag);
    //         document.removeEventListener('mouseup', endDrag);
    //         document.removeEventListener('touchend', endDrag);

    //         if (!isPaused) {
    //             requestAnimationFrame(animate);
    //         }
    //     }

    //     function moveDrag(e) {
    //         if (!isDragging) return;
    //         const x = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         const diff = x - startX;
    //         carouselTrack.style.transform = `translateX(${scrollLeft + diff}px)`;
    //         handleInfiniteScroll();
    //     }

    //     function handleInfiniteScroll() {
    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right < sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(${sliderRect.width - trackRect.width}px)`;
    //         }

    //         if (trackRect.left > sliderRect.left) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         }
    //     }

    //     function animate() {
    //         if (isPaused || isDragging) return;

    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right <= sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         } else {
    //             const currentTranslateX = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    //             carouselTrack.style.transform = `translateX(${currentTranslateX - speed}px)`;
    //         }

    //         animationId = requestAnimationFrame(animate);
    //     }

    //     // Prevent images from interfering with dragging
    //     const images = document.querySelectorAll('.carousel_slide img');
    //     images.forEach(image => {
    //         image.addEventListener('dragstart', function(e) {
    //             e.preventDefault();
    //         });

    //         image.addEventListener('mousedown', startDrag);
    //         image.addEventListener('touchstart', startDrag);
    //     });

    //     carouselSlider.addEventListener('mousedown', startDrag);
    //     carouselSlider.addEventListener('touchstart', startDrag);

    //     images.forEach(image => {
    //         image.addEventListener('mousedown', startDrag);
    //         image.addEventListener('touchstart', startDrag);
    //     });


    //     carouselSlider.addEventListener('mouseenter', function() {
    //         isPaused = true;
    //         cancelAnimationFrame(animationId);
    //     });

    //     carouselSlider.addEventListener('mouseleave', function() {
    //         isPaused = false;
    //         if (!isDragging) {
    //             requestAnimationFrame(animate);
    //         }
    //     });


    //     // Start the animation
    //     requestAnimationFrame(animate);
    // });

    // ჰოვერი და პაუზა მხოლოდ ფოტოზე
    // document.addEventListener("DOMContentLoaded", function() {
    //     const carouselSlider = document.querySelector('.carousel_slider');
    //     const carouselTrack = document.querySelector('.carousel_track');
    //     let isDragging = false;
    //     let startX, scrollLeft;
    //     let animationId;
    //     let speed = 10; // Adjust speed as needed
    //     let isPaused = false;

    //     function startDrag(e) {
    //         isDragging = true;
    //         startX = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         scrollLeft = carouselTrack.getBoundingClientRect().left;
    //         cancelAnimationFrame(animationId);
    //         carouselSlider.classList.add('disable-select');

    //         // Attach move and end listeners
    //         document.addEventListener('mousemove', moveDrag);
    //         document.addEventListener('touchmove', moveDrag);
    //         document.addEventListener('mouseup', endDrag);
    //         document.addEventListener('touchend', endDrag);
    //     }

    //     function endDrag() {
    //         isDragging = false;
    //         carouselSlider.classList.remove('disable-select');

    //         // Remove move and end listeners
    //         document.removeEventListener('mousemove', moveDrag);
    //         document.removeEventListener('touchmove', moveDrag);
    //         document.removeEventListener('mouseup', endDrag);
    //         document.removeEventListener('touchend', endDrag);

    //         if (!isPaused) {
    //             requestAnimationFrame(animate);
    //         }
    //     }

    //     function moveDrag(e) {
    //         if (!isDragging) return;
    //         const x = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
    //         const diff = x - startX;
    //         carouselTrack.style.transform = `translateX(${scrollLeft + diff}px)`;
    //         handleInfiniteScroll();
    //     }

    //     function handleInfiniteScroll() {
    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right < sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(${sliderRect.width - trackRect.width}px)`;
    //         }

    //         if (trackRect.left > sliderRect.left) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         }
    //     }

    //     function animate() {
    //         if (isPaused || isDragging) return;

    //         const trackRect = carouselTrack.getBoundingClientRect();
    //         const sliderRect = carouselSlider.getBoundingClientRect();

    //         if (trackRect.right <= sliderRect.right) {
    //             carouselTrack.style.transform = `translateX(0px)`;
    //         } else {
    //             const currentTranslateX = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    //             carouselTrack.style.transform = `translateX(${currentTranslateX - speed}px)`;
    //         }

    //         animationId = requestAnimationFrame(animate);
    //     }

    //     // Prevent images from interfering with dragging
    //     const images = document.querySelectorAll('.carousel_slide img');
    //     images.forEach(image => {
    //         image.addEventListener('dragstart', function(e) {
    //             e.preventDefault();
    //         });

    //         image.addEventListener('mouseenter', function() {
    //             isPaused = true;
    //             cancelAnimationFrame(animationId);
    //         });

    //         image.addEventListener('mouseleave', function() {
    //             isPaused = false;
    //             if (!isDragging) {
    //                 requestAnimationFrame(animate);
    //             }
    //         });
    //     });

    //     carouselSlider.addEventListener('mousedown', startDrag);
    //     carouselSlider.addEventListener('touchstart', startDrag);

    //     // Start the animation
    //     requestAnimationFrame(animate);
    // });

    // With jump
   // document.addEventListener("DOMContentLoaded", function() {
   //      const carouselSlider = document.querySelector('.carousel_slider');
   //      const carouselTrack = document.querySelector('.carousel_track');
   //      let isDragging = false;
   //      let startX, scrollLeft;
   //      let animationId;
   //      let speed = 0.4; // Adjust speed as needed
   //      let isPaused = false;

   //      function startDrag(e) {
   //          isDragging = true;
   //          startX = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
   //          scrollLeft = carouselTrack.getBoundingClientRect().left;
   //          cancelAnimationFrame(animationId);
   //          carouselSlider.classList.add('disable-select');

   //          // Attach move and end listeners
   //          document.addEventListener('mousemove', moveDrag);
   //          document.addEventListener('touchmove', moveDrag);
   //          document.addEventListener('mouseup', endDrag);
   //          document.addEventListener('touchend', endDrag);
   //      }

   //      function endDrag() {
   //          isDragging = false;
   //          carouselSlider.classList.remove('disable-select');

   //          // Remove move and end listeners
   //          document.removeEventListener('mousemove', moveDrag);
   //          document.removeEventListener('touchmove', moveDrag);
   //          document.removeEventListener('mouseup', endDrag);
   //          document.removeEventListener('touchend', endDrag);

   //          if (!isPaused) {
   //              requestAnimationFrame(animate);
   //          }
   //      }

   //      function moveDrag(e) {
   //          if (!isDragging) return;
   //          const x = (e.pageX || e.touches[0].pageX) - carouselSlider.getBoundingClientRect().left;
   //          const diff = x - startX;
   //          carouselTrack.style.transform = `translateX(${scrollLeft + diff}px)`;
   //          handleInfiniteScroll();
   //      }

   //      function handleInfiniteScroll() {
   //          const trackRect = carouselTrack.getBoundingClientRect();
   //          const sliderRect = carouselSlider.getBoundingClientRect();
   //          const trackWidth = trackRect.width;
   //          const sliderWidth = sliderRect.width;
   //          const currentTranslateX = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;

   //          if (currentTranslateX < -trackWidth / 2) {
   //              carouselTrack.style.transform = `translateX(${currentTranslateX + trackWidth}px)`;
   //          } else if (currentTranslateX > 0) {
   //              carouselTrack.style.transform = `translateX(${currentTranslateX - trackWidth / 2}px)`;
   //          }
   //      }

   //      function animate() {
   //          if (isPaused || isDragging) return;

   //          const currentTranslateX = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
   //          carouselTrack.style.transform = `translateX(${currentTranslateX - speed}px)`;
   //          handleInfiniteScroll();

   //          animationId = requestAnimationFrame(animate);
   //      }

   //      // Prevent images from interfering with dragging
   //      const images = document.querySelectorAll('.carousel_slide img');
   //      images.forEach(image => {
   //          image.addEventListener('dragstart', function(e) {
   //              e.preventDefault();
   //          });

   //          image.addEventListener('mouseenter', function() {
   //              isPaused = true;
   //              cancelAnimationFrame(animationId);
   //          });

   //          image.addEventListener('mouseleave', function() {
   //              isPaused = false;
   //              if (!isDragging) {
   //                  requestAnimationFrame(animate);
   //              }
   //          });
   //      });

   //      carouselSlider.addEventListener('mousedown', startDrag);
   //      carouselSlider.addEventListener('touchstart', startDrag);

   //      // Start the animation
   //      requestAnimationFrame(animate);
   // });

   // Final, without jump
   // document.addEventListener("DOMContentLoaded", function() {
   //      const carouselSlider = document.querySelector('.carousel_slider');
   //      const carouselTrack = document.querySelector('.carousel_track');
   //      let isDragging = false;
   //      let startX, currentX;
   //      let animationId;
   //      let speed = 0.4; // Adjust speed as needed
   //      let isPaused = false;

   //      function startDrag(e) {
   //          isDragging = true;
   //          startX = e.pageX || e.touches[0].pageX;
   //          currentX = startX;
   //          cancelAnimationFrame(animationId);
   //          carouselSlider.classList.add('disable-select');

   //          // Attach move and end listeners
   //          document.addEventListener('mousemove', moveDrag);
   //          document.addEventListener('touchmove', moveDrag);
   //          document.addEventListener('mouseup', endDrag);
   //          document.addEventListener('touchend', endDrag);
   //      }

   //      function endDrag() {
   //          isDragging = false;
   //          carouselSlider.classList.remove('disable-select');

   //          // Remove move and end listeners
   //          document.removeEventListener('mousemove', moveDrag);
   //          document.removeEventListener('touchmove', moveDrag);
   //          document.removeEventListener('mouseup', endDrag);
   //          document.removeEventListener('touchend', endDrag);

   //          if (!isPaused) {
   //              requestAnimationFrame(animate);
   //          }
   //      }

   //      function moveDrag(e) {
   //          if (!isDragging) return;
   //          const newX = e.pageX || e.touches[0].pageX;
   //          const diffX = newX - currentX;
   //          currentX = newX;

   //          carouselTrack.style.transform = `translateX(${parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) + diffX}px)`;
   //          handleInfiniteScroll();
   //      }

   //      function handleInfiniteScroll() {
   //          const trackRect = carouselTrack.getBoundingClientRect();
   //          const trackWidth = trackRect.width;
   //          let currentTranslateX = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;

   //          if (currentTranslateX < -trackWidth / 2) {
   //              currentTranslateX += trackWidth;
   //          } else if (currentTranslateX > 0) {
   //              currentTranslateX -= trackWidth / 2;
   //          }

   //          carouselTrack.style.transform = `translateX(${currentTranslateX}px)`;
   //      }

   //      function animate() {
   //          if (isPaused || isDragging) return;

   //          let currentTranslateX = parseFloat(carouselTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
   //          currentTranslateX -= speed;

   //          carouselTrack.style.transform = `translateX(${currentTranslateX}px)`;
   //          handleInfiniteScroll();

   //          animationId = requestAnimationFrame(animate);
   //      }

   //      // Prevent images from interfering with dragging
   //      const images = document.querySelectorAll('.carousel_slide img');
   //      images.forEach(image => {
   //          image.addEventListener('dragstart', function(e) {
   //              e.preventDefault();
   //          });

   //          image.addEventListener('mouseenter', function() {
   //              isPaused = true;
   //              cancelAnimationFrame(animationId);
   //          });

   //          image.addEventListener('mouseleave', function() {
   //              isPaused = false;
   //              if (!isDragging) {
   //                  requestAnimationFrame(animate);
   //              }
   //          });
   //      });

   //      carouselSlider.addEventListener('mousedown', startDrag);
   //      carouselSlider.addEventListener('touchstart', startDrag);

   //      // Start the animation
   //      requestAnimationFrame(animate);
   // });
   // End of Final, without jump
    // End of ჰოვერი და პაუზა მხოლოდ ფოტოზე
    // End of დრაგი ფოტოზეც მოქმედებს
    // End of გარე კლიკით (სლაიდერის კონტეინერის მიღმა) აჩქარების გარეშე
    // End of slider

    

    document.addEventListener('DOMContentLoaded', function() {
        var searchButton = document.querySelector('.js-work-search');
        var advSearchIcon = document.querySelector('.advsearchicon');
        var inputElement = searchButton.querySelector('input');

        searchButton.addEventListener('click', function(event) {
            if (event.target !== inputElement) {
                searchButton.classList.add('is-active');

                advSearchIcon.style.display = 'inline';
                
                // if (advSearchIcon.style.display === 'none' || advSearchIcon.style.display === '') {
                //     advSearchIcon.style.display = 'inline';
                // } else {
                //     advSearchIcon.style.display = 'none';
                // }
            }
        });

        advSearchIcon.addEventListener('click', function(event) {
            if (event.target !== inputElement) {
                searchButton.classList.remove('is-active');

                advSearchIcon.style.display = 'none';
            }
        });

        inputElement.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the click event from bubbling up to the searchButton
        });
    });
}


 $(document).ready(function() {
     // Initialize ScrollMagic Controller
     var controller = new ScrollMagic.Controller();

     // Create a ScrollMagic Scene
     var classToggleScene = new ScrollMagic.Scene({
        triggerElement: "#work",
        triggerHook: 0.5, // Adjust triggerHook as needed
        duration: 0 // Duration of 0 means it will happen immediately when triggered
     })
     .setClassToggle(".burger", "change") // Add the change class to .burger
     .addTo(controller);
 });



function resetConnectScroll() {
    $('.connect-crm-wrap').scrollTop(0); // Ensure modal content is scrolled to the top
}
$('.crm-form a').click(function(){
    $('body').addClass('has-feed-modal');
    $('.feed-modal').addClass('is-active');
});
$('.js-post-close').click(function(){
    $('body').removeClass('has-feed-modal');
    $('.feed-modal').removeClass('is-active');

    // Reset the scroll position when closing
    resetConnectScroll();
});
$('.connect-crm-wrap').click(function(){
    $('body').removeClass('has-feed-modal');
    $('.feed-modal').removeClass('is-active');

    // Reset the scroll position when closing
    resetConnectScroll();
});

$(".container--s").click(function(event){
  event.stopPropagation();
  // Do something
});


// select codes
// old codes
// document.addEventListener('DOMContentLoaded', function () {
//     const customSelect = document.querySelector('.custom-select');
//     const customSelectTrigger = customSelect.querySelector('.custom-select-trigger');
//     const customOptions = customSelect.querySelector('.custom-options');
//     const customOptionsList = customOptions.querySelectorAll('.custom-option');
//     const hiddenInput = document.getElementById('field_crm_industries');

//     customSelectTrigger.addEventListener('click', function (e) {
//         e.stopPropagation(); // Prevents the event from bubbling up to the document click listener
//         customSelect.classList.toggle('open');
//     });

//     customOptionsList.forEach(option => {
//         option.addEventListener('click', function (e) {
//             e.stopPropagation(); // Prevents the event from bubbling up to the document click listener
//             customSelectTrigger.textContent = this.textContent;
//             customSelectTrigger.style.color = window.getComputedStyle(this).color;
//             hiddenInput.value = this.getAttribute('data-value');
//             customSelect.classList.remove('open');
//         });
//     });

//     // Click handler to close dropdown when clicking elsewhere
//     document.addEventListener('click', function (e) {
//         if (!customSelect.contains(e.target) && !e.target.closest('.container--s')) {
//             customSelect.classList.remove('open');
//         }
//     });

//     // jQuery equivalent to close dropdown
//     $('.container--s').click(function (e) {
//         $('.custom-select').removeClass('open');
//         e.stopPropagation(); // Prevents this click from bubbling up to the document click listener
//     });
// });


// document.addEventListener('DOMContentLoaded', function () {
//     const customSelect1 = document.querySelector('.custom-select1');
//     const customSelectTrigger1 = customSelect1.querySelector('.custom-select-trigger1');
//     const customOptions1 = customSelect1.querySelector('.custom-options1');
//     const customOptionsList1 = customOptions1.querySelectorAll('.custom-option1');
//     const hiddenInput1 = document.getElementById('field_crm_industries1');

//     customSelectTrigger1.addEventListener('click', function (e) {
//         e.stopPropagation(); // Prevents the event from bubbling up to the document click listener
//         customSelect1.classList.toggle('open');
//     });

//     customOptionsList1.forEach(option => {
//         option.addEventListener('click', function (e) {
//             e.stopPropagation(); // Prevents the event from bubbling up to the document click listener
//             customSelectTrigger1.textContent = this.textContent;
//             customSelectTrigger1.style.color = window.getComputedStyle(this).color;
//             hiddenInput1.value = this.getAttribute('data-value');
//             customSelect1.classList.remove('open');
//         });
//     });

//     // Click handler to close dropdown when clicking elsewhere
//     document.addEventListener('click', function (e) {
//         if (!customSelect1.contains(e.target) && !e.target.closest('.container--s')) {
//             customSelect1.classList.remove('open');
//         }
//     });

//     // jQuery equivalent to close dropdown
//     $('.container--s').click(function (e) {
//         $('.custom-select1').removeClass('open');
//         e.stopPropagation(); // Prevents this click from bubbling up to the document click listener
//     });
// });
// end of old codes

document.addEventListener('DOMContentLoaded', function () {
    // First custom-select
    const customSelect = document.querySelector('.custom-select');
    const customSelectTrigger = customSelect.querySelector('.custom-select-trigger');
    const customOptions = customSelect.querySelector('.custom-options');
    const customOptionsList = customOptions.querySelectorAll('.custom-option');
    const hiddenInput = document.getElementById('field_crm_industries');

    customSelectTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        customSelect.classList.toggle('open');
        // Close the other custom-select
        document.querySelector('.custom-select1').classList.remove('open');
    });

    customOptionsList.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            customSelectTrigger.textContent = this.textContent;
            customSelectTrigger.style.color = window.getComputedStyle(this).color;
            hiddenInput.value = this.getAttribute('data-value');
            customSelect.classList.remove('open');
        });
    });

    document.addEventListener('click', function (e) {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });

    // Second custom-select1
    const customSelect1 = document.querySelector('.custom-select1');
    const customSelectTrigger1 = customSelect1.querySelector('.custom-select-trigger1');
    const customOptions1 = customSelect1.querySelector('.custom-options1');
    const customOptionsList1 = customOptions1.querySelectorAll('.custom-option1');
    const hiddenInput1 = document.getElementById('field_crm_industries1');

    customSelectTrigger1.addEventListener('click', function (e) {
        e.stopPropagation();
        customSelect1.classList.toggle('open');
        // Close the other custom-select
        document.querySelector('.custom-select').classList.remove('open');
    });

    customOptionsList1.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            customSelectTrigger1.textContent = this.textContent;
            customSelectTrigger1.style.color = window.getComputedStyle(this).color;
            hiddenInput1.value = this.getAttribute('data-value');
            customSelect1.classList.remove('open');
        });
    });

    document.addEventListener('click', function (e) {
        if (!customSelect1.contains(e.target)) {
            customSelect1.classList.remove('open');
        }
    });


    $('.feed-modal, .container--s').click(function (e) {
        $('.custom-select, .custom-select1').removeClass('open');
        e.stopPropagation(); // Prevents this click from bubbling up to the document click listener
    });
});
// End of select codes



// $('.social-list-open').click(function (e) {
//     $('.social-list-open, .social-list').toggleClass('active');
//     $('.social-nav-list').toggle(500);
//     $('.social-nav-list li, .social-nav-list li span').toggleClass('is__active');

//     $('.Country-list').removeClass('open');
//     $('.location-list-open, .country-list').removeClass('active');
//     $('.Country-list li').removeClass('is__active');
// });


// $('.location-list-open').click(function (e) {
//     $('.location-list-open, .country-list').toggleClass('active');
//     $('.Country-list').toggleClass('open');
//     $('.Country-list li').toggleClass('is__active');

//     $('.social-nav-list').toggle(500);
// });


$('.social-list-open').click(function (e) {
    $('.social-list-open, .social-list').toggleClass('active');
    $('.social-nav-list').toggle(500);
    $('.social-nav-list li, .social-nav-list li span').toggleClass('is__active');

    $('.Country-list').removeClass('open');
    $('.location-list-open, .country-list').removeClass('active');
    $('.Country-list li').removeClass('is__active');
});

$('.location-list-open').click(function (e) {
    $('.location-list-open, .country-list').toggleClass('active');
    $('.Country-list').toggleClass('open');
    $('.Country-list li').toggleClass('is__active');

    $('.social-list-open, .social-list').removeClass('active');
    $('.social-nav-list li, .social-nav-list li span').removeClass('is__active');

    // Ensure the .social-nav-list is not toggled and is hidden
    if ($('.social-nav-list').is(':visible')) {
        $('.social-nav-list').toggle(500);
    }
});

function reloadPage() {
    // Forces the page to reload
    location.reload();
}


// Direct Scroll to Section
document.addEventListener("DOMContentLoaded", function() {
    document.body.style.visibility = "visible";
    // document.getElementById("header").style.visibility = "visible";
// Rest of the scroll code here
});