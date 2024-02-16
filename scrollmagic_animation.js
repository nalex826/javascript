/**
 * Scroll animation function to animate elements based on scroll position
 * @param {object} json - Object containing animation configuration
 *   - {string} element - Selector for the trigger element
 *   - {string} trigger - Position of the trigger element (e.g., '0.7' for 70% of the viewport)
 *   - {string} duration - Duration of the animation (e.g., '100%' for the full viewport height)
 *   - {string} target - Selector for the elements to animate
 *   - {string} offset - Offset value for triggering the animation
 *   - {object} tween - GSAP tween animation for the scroll animation
 *   - {boolean} pin - Whether to pin the trigger element during animation
 *   - {function} callback - Callback function to execute on animation start
 */
const ScrollAnim = (json) => {
    // Create a new ScrollMagic scene with the provided configuration
    var Scrolls = new ScrollMagic.Scene({ triggerElement: json.element, triggerHook: json.trigger, duration: json.duration }).addTo(ScrollController);
    // Check if target elements are specified
    if (json.target) {
        // Select target elements
        var elements = document.querySelectorAll(json.target);
        // Event listener for entering the scene
        Scrolls.on('enter', function (e) {
            // Iterate through target elements
            for (var i = 0; i < elements.length; ++i) {
                // Determine animation easing for the element
                var setAnimation = (elements[i].dataset.ease) ? elements[i].dataset.ease : 'fadeInUp';
                // Add animation class to the element
                elements[i].classList.add(setAnimation);
            }
        });
        // Event listener for leaving the scene
        Scrolls.on('leave', function (e) {
            // Iterate through target elements
            for (var i = 0; i < elements.length; ++i) {
                // Determine animation easing for the element
                var setAnimation = (elements[i].dataset.ease) ? elements[i].dataset.ease : 'fadeInUp';
                // Check if the element has 'static' class
                var setStatic = (elements[i].classList.contains('static')) ? 1 : 0;
                // Remove animation class from the element if not 'static'
                if (!setStatic) {
                    elements[i].classList.remove(setAnimation);
                }
            }
        });
    }
    // Check if offset is specified
    if (json.offset) {
        // Set the offset value for triggering the animation
        Scrolls.offset(json.offset);
    }
    // Check if tween animation is specified
    if (json.tween) {
        // Set GSAP tween animation for the scroll animation
        Scrolls.setTween(json.tween);
    }
    // Check if pinning is specified
    if (json.pin) {
        // Pin the trigger element during animation
        Scrolls.setPin(json.element);
    }
    // Check if callback function is specified
    if (json.callback) {
        // Event listener for animation start with callback function
        Scrolls.on('start', e => {
            // Execute the provided callback function
            json.callback(e);
        });
    }
}

// GSAP tween animation for bouncing balls
const BallAnim = gsap.fromTo(['#red-ball', '#green-ball', '#blue-ball'], { yPercent: 0 }, { yPercent: 200, ease: 'none' });

// GSAP tween animation for scaling phone image
const PhoneAnim = gsap.fromTo('#phones', { scale: 0.8 }, { scale: 1, ease: 'none' });

// Scroll animations for various sections
ScrollAnim({ 'element': '#features', 'duration': '100%', 'trigger': 0.7, 'target': '#features .inview' }); // Features 
ScrollAnim({ 'element': '#fit', 'duration': '100%', 'trigger': 0.7, 'target': '#fit .inview' }); // Fit  
ScrollAnim({ 'element': '#gallery', 'duration': '100%', 'trigger': 0.7, 'target': '#gallery .inview' }); // Gallery   
ScrollAnim({ 'element': '#smart', 'duration': '100%', 'trigger': 0.7, 'target': '#smart .inview', }); // Smart 
ScrollAnim({ 'element': '#specs .specs-wrapper', 'duration': '100%', 'trigger': 0.7, 'target': '#specs .specs-wrapper', 'callback': SpecsCounter }); // Spec 
ScrollAnim({ 'element': '#smart', 'duration': '100%', 'tween': BallAnim, 'trigger': 0.3 }); // Ball animation 
ScrollAnim({ 'element': '#smart', 'duration': '100%', 'tween': PhoneAnim, 'trigger': 0.7 }); // Phone animation
