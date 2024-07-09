gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", function () {
  // Start the loader number increment
  let $loaderNumber = $(".loader_number");
  let currentNumber = 0;

  // Initially hide the loader number
  $loaderNumber.css("opacity", 0);

  let interval = setInterval(function () {
    if (currentNumber < 100) {
      currentNumber++;
      $loaderNumber.text(currentNumber);

      // Show the loader number when the increment starts
      if (currentNumber === 1) {
        $loaderNumber.css("opacity", 1);
      }
    } else {
      clearInterval(interval);
      init_loader();
    }
  }, 95); // Adjust the speed of the increment as needed

  // Animate reveal-text elements
  const splitTypes = document.querySelectorAll(".reveal-text");
  splitTypes.forEach((char) => {
    const bg = char.dataset.bgColor;
    const fg = char.dataset.fgColor;

    const text = new SplitType(char, { types: "chars" });

    gsap.fromTo(
      text.chars,
      {
        color: bg,
        opacity: 0,
      },
      {
        color: fg,
        opacity: 1,
        duration: 10, // Set the duration to 10 seconds
        stagger: 0.02,
      }
    );
  });

  // After 10 seconds delay
  setTimeout(function () {
    clearInterval(interval); // Ensure interval stops at 100%
    const loader = document.getElementById("loader");
    loader.classList.add("slide-up");
    loader.addEventListener("transitionend", function () {
      loader.style.display = "none";
      document.getElementById("main").style.display = "block";
    });
  }, 10000); // 10 seconds delay
});

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function init_loader() {
  // Functionality for when the loader finishes
  console.log("Loader finished");
}
