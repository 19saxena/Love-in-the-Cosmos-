const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the two stars
const star1 = { x: 100, y: canvas.height / 2, radius: 10, color: "white" };
const star2 = { x: canvas.width - 100, y: canvas.height / 2, radius: 10, color: "white" };

// Background stars for twinkling effect
let backgroundStars = [];
for (let i = 0; i < 200; i++) {
  backgroundStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3,
    alpha: Math.random(),
    twinkleSpeed: Math.random() * 0.01 +0.01,
  });
}


// Draw stars function
function drawStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Background stars
  backgroundStars.forEach((star) => {
    star.alpha += star.twinkleSpeed;
    if (star.alpha > 1 || star.alpha < 0) star.twinkleSpeed *= -1;

    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;

  // Draw the two moving stars
  ctx.fillStyle = star1.color;
  ctx.beginPath();
  ctx.arc(star1.x, star1.y, star1.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = star2.color;
  ctx.beginPath();
  ctx.arc(star2.x, star2.y, star2.radius, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(drawStars);
}

// Start the animation loop
drawStars();
// Memory data
const memories = [
  {
    src: "101.jpg",
    description: "Our first date at McD! Yaad hai tu kitna sharma jaa raha tha jb m dheere se teri thighs ko rub krri thi? 😂 Hmesha itna hi cutu aur innocent rehna babyy <3",
  },
  {
    src: "102.jpg",
    description: "Jab tu pehli baar (officially) ghar aaya tha! We talked, ate, you played the guitar and it was soo muchh fun!! I can still feel the warmth and comfy smell of your jacket 💕 Hopefully we have more good times in each other's homes hehe ",
  },
  {
    src: "103.jpg",
    description: "When I called you from the juice factory and you actually showed up within 5 mins😚 Waise to jb bhi apn milte hai to achha hi lgta hai, but uss din itni unexpected way m mile to wo aur bhi special ho gaya❤️",
  },
  {
    src: "104.jpg",
    description: "Oh, the popular 'Ek Sath'! Yaha apn ko bht time se jaana tha and apn finally gaye lol. Its always the best with you right by my side💕 Hopefully we have many more dates here!!",
  },
];

// Orbital movement logic
function startOrbiting() {
  gsap.to(star1, { duration: 5, x: canvas.width / 2 - 70, y: canvas.height / 2 - 50 });
  gsap.to(star2, {
    duration: 5,
    x: canvas.width / 2 + 70,
    y: canvas.height / 2 + 50,
    onComplete: () => {
      showImages(0),
      console.log("hahah")}
  });
}

// Show images and descriptions
function showImages(index) {
  if (index >= memories.length) {
    showPoem();
    return;
  }
 
  const memory = memories[index];
  const main=document.querySelector("main");
  const imageSection = document.querySelector(".image-section");
  const img = imageSection.querySelector("img");
  const text = imageSection.querySelector("p");

  img.src = memory.src;
  text.textContent = memory.description;

  imageSection.style.display = "block";
  gsap.to(imageSection, { opacity: 1, duration: 8});
  gsap.to(imageSection, {
    opacity: 0,
    duration: 1,
    delay: 8,
    onComplete: () => {
      imageSection.style.display = "none";
      showImages(index + 1);
    },
  });
}

// Show the poem
function showPoem() {
  const poem = document.querySelector(".poem");
  const paragraphs = poem.querySelectorAll(".poem-paragraph");
  let currentIndex = 0;

  // Ensure the poem container is visible
  poem.style.display ="flex";
  poem.style.flexDirection = "column";
  poem.style.justifyContent = "center";
  poem.style.alignItems = "center";
  gsap.to(poem, { opacity: 1, duration: 1 });

  // Function to display the next paragraph
  function showNextParagraph() {
    if (currentIndex < paragraphs.length) {
      const currentParagraph = paragraphs[currentIndex];

      // Hide all paragraphs initially
      paragraphs.forEach((p, index) => {
        if (index !== currentIndex) {
          p.style.opacity = 0;
          p.style.display = "none"; // Hide all other paragraphs
        }
      });

      // Display the current paragraph
      currentParagraph.style.display = "block"; // Ensure it's visible
      gsap.to(currentParagraph, { opacity: 1, duration: 12 }); // Fade in the current paragraph

      // Fade out the previous paragraph if any
      if (currentIndex > 0) {
        const prevParagraph = paragraphs[currentIndex - 1];
        gsap.to(prevParagraph, { opacity: 0, duration: 1, onComplete: () => {
          prevParagraph.style.display = "none"; // Hide after fading out
        }});
      }
      currentIndex++;
    } else {
      clearInterval(interval);
      fadeOutPoemAndContinue();
    }
  }

  // Fade out the poem and continue with the merging animation
  function fadeOutPoemAndContinue() {
    gsap.to(poem, { opacity: 0, duration: 2, onComplete: mergeStars });
  }

  showNextParagraph(); // Show the first paragraph immediately
  const interval = setInterval(showNextParagraph, 12000); // Show the next paragraph every 3 seconds
}

// Merge stars and trigger heart explosion
function mergeStars() {
  gsap.to(star1, { x: canvas.width / 2, y: canvas.height / 2, duration: 2 });
  gsap.to(star2, {
    x: canvas.width / 2,
    y: canvas.height / 2,
    duration: 2,
    onComplete: heartExplosion,
  });
}

// Create a heart explosion
function heartExplosion() {
  const message = document.querySelector(".message");
  message.style.display = "block";

  let hearts = [];
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.style.position = "absolute";
    heart.style.fontSize = `${Math.random() * 2 + 1}rem`;
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = `${Math.random() * window.innerHeight}px`;
    heart.style.opacity = 0;

    document.body.appendChild(heart);
    hearts.push(heart);

    gsap.to(heart, {
      opacity: 1,
      duration: 1,
      y: `-=${Math.random() * 100 + 50}`,
      x: `+=${Math.random() * 100 - 50}`,
      delay: Math.random(),
      onComplete: () => document.body.removeChild(heart),
    });
  }

  gsap.to(message, { opacity: 1, duration: 3 });
}

// Begin the sequence
startOrbiting();
// Function to draw a star shape
function drawStar(ctx, x, y, radius, spikes, outerRadius, innerRadius, color) {
    let rot = (Math.PI / 2) * 3;
    let step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);
  
    for (let i = 0; i < spikes; i++) {
      let ox = x + Math.cos(rot) * outerRadius;
      let oy = y + Math.sin(rot) * outerRadius;
      ctx.lineTo(ox, oy);
      rot += step;
  
      ox = x + Math.cos(rot) * innerRadius;
      oy = y + Math.sin(rot) * innerRadius;
      ctx.lineTo(ox, oy);
      rot += step;
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  // Update drawStars function for glowing spiky stars
  function drawStars() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Background stars
    backgroundStars.forEach((star) => {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 1 || star.alpha < 0) star.twinkleSpeed *= -1;
  
      ctx.globalAlpha = star.alpha;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
  
    ctx.globalAlpha = 1;
  
    // Draw the two glowing stars
    drawStar(ctx, star1.x, star1.y, star1.radius, 5, 30, 15, "yellow");
    drawStar(ctx, star2.x, star2.y, star2.radius, 5, 30, 15, "yellow");
  
    // Add names to the stars dynamically
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
  
    if (Math.abs(star1.x - star2.x) < 5 && Math.abs(star1.y - star2.y) < 5) {
      // If stars are merged, display "Us" at the merged position
      ctx.fillText("Us💕", (star1.x + star2.x) / 2, (star1.y + star2.y) / 2 + 50);
    } else {
      // If stars haven't merged yet, display their individual names
      ctx.fillText("Sahaj", star1.x, star1.y + 50);
      ctx.fillText("Ishaan", star2.x, star2.y + 50);
    }
  
    requestAnimationFrame(drawStars);
  }

  // Light burst during collision
  function lightBurst() {
    for (let i = 0; i < 100; i++) {
      let angle = Math.random() * Math.PI * 2;
      let distance = Math.random() * 200;
      let x = canvas.width / 2 + Math.cos(angle) * distance;
      let y = canvas.height / 2 + Math.sin(angle) * distance;
  
      const burst = document.createElement("div");
      burst.style.position = "absolute";
      burst.style.width = "5px";
      burst.style.height = "5px";
      burst.style.backgroundColor = "yellow";
      burst.style.left = `${x}px`;
      burst.style.top = `${y}px`;
      burst.style.borderRadius = "50%";
      burst.style.opacity = 1;
  
      document.body.appendChild(burst);
  
      gsap.to(burst, {
        opacity: 0,
        duration: 1,
        delay: Math.random(),
        onComplete: () => document.body.removeChild(burst),
      });
    }
  }
  
  // Update the heart explosion to include light burst
  function heartExplosion() {
    lightBurst(); // Add light burst
    const message = document.querySelector(".message");
    message.style.display = "block";
  
    let hearts = [];
    for (let i = 0; i < 50; i++) {
      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.position = "absolute";
      heart.style.fontSize = `${Math.random() * 2 + 1}rem`;
      heart.style.left = `${Math.random() * window.innerWidth}px`;
      heart.style.top = `${Math.random() * window.innerHeight}px`;
      heart.style.opacity = 0;
  
      document.body.appendChild(heart);
      hearts.push(heart);
  
      gsap.to(heart, {
        opacity: 1,
        duration: 1,
        y: `-=${Math.random() * 100 + 50}`,
        x: `+=${Math.random() * 100 - 50}`,
        delay: Math.random(),
        onComplete: () => document.body.removeChild(heart),
      });
    }
  
    gsap.to(message, { opacity: 1, duration: 3 });
  }