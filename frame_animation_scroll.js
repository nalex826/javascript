// Get the 2D rendering context of the canvas
const context = canvas.getContext("2d");

// Total number of frames in the animation
const frameCount = 100; 

// Array to hold image objects
const images = [];

// Object to store the current frame
const frames = {
    frame: 0
};

// Function to render frames onto the canvas
const RenderFrames = () => {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the current frame onto the canvas
    context.drawImage(images[frames.frame], 0, 0);
}

// Function to animate frames using GSAP (GreenSock Animation Platform)
const FramesAnimation = () => {
    // Use GSAP to animate the frames
    gsap.to(frames, { 
        // Animate the 'frame' property from 0 to frameCount - 1
        frame: frameCount - 1, 
        // Snap to the nearest integer frame value
        snap: "frame", 
        // Linear easing function
        ease: "none", 
        // Render frames immediately
        immediateRender: true, 
        // Scroll trigger options
        scrollTrigger: { 
            // Disable scrubbing effect
            scrub: 0, 
            // Trigger point for the animation
            trigger: "#elementId", 
            // End point for the animation
            end: "+=" + (window.innerHeight * 4), 
            // Pin the trigger element during animation
            pin: true 
        }, 
        // Callback function to render frames on update
        onUpdate: RenderFrames 
    });
    // Call RenderFrames function when the first image is loaded
    images[0].onload = RenderFrames;
}
