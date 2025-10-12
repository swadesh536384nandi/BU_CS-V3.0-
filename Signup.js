const scriptURL = 'https://script.google.com/macros/s/AKfycbzaOw__wfrrRhTvWubgaVA0ME5nnzq6xU7eTo3SyFsEZfgVTTcFGkD7jZ_lWZozdHuMVg/exec';  // Replace with your Apps Script URL
const form = document.forms['google-sheet'];
const otpModal = document.getElementById('otpModal');
const otpInput = document.getElementById('otpInput');
const verifyBtn = document.getElementById('verifyOTPBtn');
let tempEmail = "", base64Image = "";

// Convert image file to Base64 before sending
document.getElementById("profilePic").addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = function() {
      base64Image = reader.result.split(",")[1]; // remove prefix
    };
    reader.readAsDataURL(file);
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  sendOTP();
});

function sendOTP() {
  const email = form.Email.value.trim();
  if (!email) return alert("Please enter your email first.");
  tempEmail = email;

  fetch(scriptURL, {
    method: 'POST',
    body: new URLSearchParams({ action: 'sendOTP', Email: email })
  })
  .then(res => res.json())
  .then(data => {
    if (data.result === 'success') otpModal.showModal();
    else alert("❌ " + data.message);
  });
}

verifyBtn.addEventListener('click', () => {
  const otp = otpInput.value.trim();
  if (otp.length !== 6) return alert("Enter 6-digit OTP");

  const formData = new URLSearchParams({
    action: 'verifyAndRegister',
    Email: tempEmail,
    OTP: otp,
    Name: form.Name.value,
    Phone: form.Phone.value,
    DOB: form.DOB.value,
    Gender: form.Gender.value,
    Password: form.Password.value,
    ImageData: base64Image, // send encoded image
    ImageName: form.Name.value + "_" + Date.now() + ".jpg"
  });

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      if (data.result === 'success') {
        alert("✅ Registration successful!");
        form.reset();
        otpModal.close();
        window.location.href = "Login.html";
      } else {
        alert("⚠️ " + data.message);
      }
    })
    .catch(err => alert("Server error: " + err));
});