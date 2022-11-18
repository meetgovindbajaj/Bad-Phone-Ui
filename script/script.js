var slider = document.getElementById("slider");
var angleSlider = document.getElementById("angleSlider");
var phoneDisplay = document.getElementById("phoneDisplay");
var advancedModeCheckbox = document.getElementById("advancedMode");
var angle = 0;
var speed = 0;
var friction = 0.99;
var value = Number(slider.value);
function PhoneNumberToDisplay(value) {
  var display =
    "(" +
    value.toString().substr(0, 2) +
    ") " +
    value.toString().substr(2, 3) +
    "-" +
    value.toString().substr(5, 3) +
    "-" +
    value.toString().substr(8, 4);
  return display;
}
function UpdatePhone() {
  angle = Number(angleSlider.value);
  value = Number(slider.value);
  speed += Math.sin((angle * Math.PI) / 180) * 1000;
  // Friction
  speed *= friction;
  value += Math.round(speed * 1000000);
  // Update phone value
  // Bounce off edges, inverting speed
  if (value > slider.max) {
    value = slider.max;
    speed *= -1;
  } else if (value < slider.min) {
    value = slider.min;
    speed *= -1;
  }
  slider.value = value;
  // Update phone display
  phoneDisplay.innerHTML = PhoneNumberToDisplay(value);
}

// Continuous update
setInterval(UpdatePhone, 10);

// Advanced Mode
advancedModeCheckbox.addEventListener("change", function () {
  if (this.checked) {
    // Show advanced controls
    document.getElementById("angleSlider").style.display = "block";
    slider.style.width = "100%";
  } else {
    // Hide advanced controls
    document.getElementById("angleSlider").style.display = "none";
    slider.style.width = "129px";
    angleSlider.style.display = "none";
    // speed = 0;
    angleSlider.value = 0;
    slider.style.transform = "rotate(0deg)";
  }
});

slider.oninput = function () {
  speed = 0;
};

angleSlider.oninput = function () {
  angle = Number(angleSlider.value);
  slider.style.transform = "rotate(" + angle + "deg)";
};

// Advanced Mode
var advancedMode = false;
/* When checked, set a variable */
advancedModeCheckbox.addEventListener("change", function () {
  advancedMode = advancedModeCheckbox.checked;
});

// On submit
document.getElementById("submit").addEventListener("click", function (event) {
  if (confirm("Is this your Phone Number?\n" + PhoneNumberToDisplay(value))) {
    // Thank you
    alert("Thank you for your submission!");
  } else {
    // Please Contact your phone administrator
    alert(
      "Please contact your phone administrator to change your phone number to " +
        PhoneNumberToDisplay(value)
    );
  }
  // Prevent default form submission
  event.preventDefault();
});
