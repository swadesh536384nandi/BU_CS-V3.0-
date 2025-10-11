async function uploadFile() {
const fileInput = document.getElementById("file");
const folderName = document.getElementById("folderName").value;
const msg = document.getElementById("msg");
const file = fileInput.files[0];

if (!folderName) return msg.textContent = "Please select a folder.";
if (!file) return msg.textContent = "Please select a file.";

msg.textContent = "Encoding & uploading... Please wait.";

// Convert file to Base64
const reader = new FileReader();
reader.onload = async function(e) {
	const base64Data = e.target.result.split(",")[1]; // remove data:mime;base64,
	const mimeType = file.type;

	const body = new URLSearchParams();
	body.append("filedata", base64Data);
	body.append("filename", file.name);
	body.append("mimetype", mimeType);
	body.append("folderName", folderName);

	const response = await fetch("https://script.google.com/macros/s/AKfycbxtQnQKSM_yILHpJtbctYi54NEC4EqYM2IttZHOgzrRE1AyKtahx-_OxTHHwPBtzyunJA/exec", { // Replace with your Apps Script URL
	method: "POST",
	body
	});

	const result = await response.text();
	msg.textContent = result;
	//form.reset();
};
reader.readAsDataURL(file);
}