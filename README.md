                                                                				                    NAME:SWADESH NANDI						     	        
                                                                                        M.Sc. in Computer Science 
                                                                			LinkedIn: https://www.linkedin.com/in/swadesh-nandi-4992412b9/
                                                                			     Facebook: https://m.facebook.com/swadesh.nandi.56/  


Sing UP:
=================================

⦁	Frontend JS:
-------------------------------
<script>
        const scriptURL = 'Enter_your_url';  // 🔗 Replace with your Web App URL
        const form = document.forms['google-sheet'];
        const message = document.getElementById('success-message');
        const submitButton = document.querySelector('.submit-btn');

        // Sanitize user inputs
        function sanitizeInput(input) {
            return input ? input.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
        }

        form.addEventListener('submit', e => {
            e.preventDefault();
            submitButton.disabled = true;
            submitButton.querySelector('.submit-text').classList.add('hidden');
            submitButton.querySelector('svg').classList.remove('hidden');

            const formData = new FormData(form);
            formData.set('Name', sanitizeInput(formData.get('Name')));

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    if (data.result === "success") {
						alert("✅signing up! successfully done");
                        message.textContent = "✅signing up! successfully done.wellcome to the computer Science department";
                        message.classList.remove('hidden', 'text-red-600');
                        message.classList.add('text-green-600');
                        form.reset();
						window.location.href = "Login.html";
                    } else if (data.result === "duplicate") {
						alert("Phone number already registered.");
                        message.textContent = "⚠️ Phone number already registered.";
                        message.classList.remove('hidden', 'text-green-600');
                        message.classList.add('text-red-600');
						window.location.href = "Login.html";
                    } else if (data.result === "invalid") {
						alert("Invalid input.");
                        message.textContent = "⚠️ " + data.message || "Invalid input.";
                        message.classList.remove('hidden', 'text-green-600');
                        message.classList.add('text-red-600');
                    } else {
                        message.textContent = "⚠️ Error: " + (data.message || "Please try again.");
                        message.classList.remove('hidden', 'text-green-600');
                        message.classList.add('text-red-600');
                    }
                })
                .catch(error => {
                    console.error('Full error:', error);
                    message.textContent = "❌ Server error. Please try again later.";
                    message.classList.remove('hidden', 'text-green-600');
                    message.classList.add('text-red-600');
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.querySelector('.submit-text').classList.remove('hidden');
                    submitButton.querySelector('svg').classList.add('hidden');
                });
        });
    </script>

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

⦁	Backend JS:
----------------------------
var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var phoneColumnIndex = headers.indexOf('Phone') + 1;

    if (phoneColumnIndex < 1) {
      throw 'ERROR: "Phone" column not found.';
    }

    var submittedPhone = String(e.parameter['Phone']).replace(/\D/g, '').trim();

    // ✅ Validate phone number (exactly 10 digits)
    if (!/^\d{10}$/.test(submittedPhone)) {
      return ContentService.createTextOutput(JSON.stringify({
        result: 'invalid',
        message: 'Phone number must be exactly 10 digits.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ✅ Force compare as pure strings
    var phoneValues = sheet.getRange(2, phoneColumnIndex, sheet.getLastRow() - 1).getValues()
      .flat()
      .map(p => String(p).replace(/\D/g, '').trim());

    if (phoneValues.includes(submittedPhone)) {
      return ContentService.createTextOutput(JSON.stringify({
        result: 'duplicate',
        message: 'Phone number already registered. Signup rejected.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var newRow = headers.map(header => {
      if (header === 'timestamp') {
        return new Date();
      }
      return e.parameter[header] || '';
    });

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Signup successful. Your phone number is now registered.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

⦁	Web app URL:
Like that : https://script.google.com/macros/s/AKfycbwxxxxxxx/exec


========================================+++++++++++++++++++++++++++++++++++++++++++===========@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@===============================++++++++++++==========================
========================%%%%%%%%%%%%%%%%%%%%%%%%%################################@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5================================

Sing In:
-----------------------
⦁	Frontend JS:
----------------------------------
<script>
        const scriptURL = 'Enter_your_url';  // 🔗 Replace with your login backend URL
        const form = document.forms['login-form'];
        const message = document.getElementById('login-message');
        const loginButton = document.querySelector('.login-btn');

        form.addEventListener('submit', e => {
            e.preventDefault();
            loginButton.disabled = true;
            message.classList.add('hidden');

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => response.json())
                .then(data => {
                    if (data.result === "success") {
                        message.textContent = "✅ Login successful! Welcome.";
                        message.classList.remove('hidden', 'text-red-600');
                        message.classList.add('text-green-600');
                        form.reset();
						window.location.href = "user.html";
						
						
						
                    } else {
						alert("Invalid input.");
                        message.textContent = "❌ Invalid phone number or password.";
                        message.classList.remove('hidden', 'text-green-600');
                        message.classList.add('text-red-600');
                    }
                    loginButton.disabled = false;
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    message.textContent = "❌ Login failed. Try again.";
                    message.classList.remove('hidden', 'text-green-600');
                    message.classList.add('text-red-600');
                    loginButton.disabled = false;
                });
        });
    </script>


⦁	Backend JS:
----------------------------
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var phoneIndex = headers.indexOf('Phone');
  var passwordIndex = headers.indexOf('Password');

  var submittedPhone = e.parameter['Phone'];
  var submittedPassword = e.parameter['Password'];

  for (var i = 1; i < data.length; i++) {
    var rowPhone = String(data[i][phoneIndex]).trim();
    var rowPassword = String(data[i][passwordIndex]).trim();

    if (rowPhone === submittedPhone && rowPassword === submittedPassword) {
      var userData = {};
      headers.forEach(function(header, index) {
        userData[header] = data[i][index];
      });

      return ContentService.createTextOutput(JSON.stringify({
        result: 'success',
        user: userData
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    result: 'failed',
    message: 'Invalid phone number or password.'
  })).setMimeType(ContentService.MimeType.JSON);
}

Web app URL:

Like that : https://script.google.com/macros/s/AKfycbwxxxxxxx/exec

Excel Format:
-------------------
Name	   |	  Email	      |	Phone		      DOB	       Gender     Password														
avcd xyz |	abc@gmail.com |	1234567890	12/8/1900  	 female	    1234@h668																				

