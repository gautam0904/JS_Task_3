var t = 1;
var currentlyEditingRow = null;
var table; // Declare table variable globally
$('#loader').hide();
fetch('your-server-endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // Your form data here
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
$(document).ready(function () {
   // loader
   $('#bdy').css('filter', 'blur(8px)');
   $('#loader').show();
   setTimeout(function() {
     $('#loader').hide(); // Hide the loader when operation is complete
     $('#bdy').css('filter', 'blur(0px)');
   }, 2000);
  // Initialize DataTable
  table = $('#s-outputTable').DataTable({
    "columnDefs": [
      { "orderable": false, "targets": -1 }
    ],
    responsive: {
      details: {
          type: 'column'
      }
  },
    "order": [[ 0, 'asc' ]]
  });
  

  $('#ed-add').click(function (event) {
    event.preventDefault();
    let table = $('#s-outputTable').get(0);
    let newRow = $('<tr/>');
    newRow.append('<td><input type="text" name="" id="degree/board"></td>');
    newRow.append('<td><input type="text" name="" id="school/College"></td>');
    newRow.append('<td><input type="date" name="" id="startdate"></td>');
    newRow.append('<td><select class="form-select" id="passoutYear" name="passoutYear"><option selected>2020</option><option value="2022">2019</option><option value="2023">2020</option><option value="2024">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2023">2025</option><option value="2024">2026</option></select></td>');
    newRow.append('<td><input type="number" name="percentage" id="percentage" min="0" max="100"></td>');
    newRow.append('<td><input type="number" name="backlog" id="backlog" max="20"></td>');
    newRow.append('<td><button class="icon-plus rounded-circle bg-dark w-auto ms-auto add-row" onclick="deleteRow(this)">-</button></td>');
    $(table).append(newRow);
  });

  $(document).on('click', '.add-row', function () {
    deleteRow(this);
  });
});

function deleteRow(button) {
  $(button).closest('tr').remove();
}

function adduser() {
   // loader
   $('#bdy').css('filter', 'blur(8px)');
   $('#loader').show();
   setTimeout(function() {
     $('#loader').hide(); // Hide the loader when operation is complete
     $('#bdy').css('filter', 'blur(0px)');
   }, 500);
  if ($('#shBtn').length === 0) {
    $('#saveChanges').remove();
    var newSubmitButton = $('<button/>', {
      text: 'Submit',
      id: 'shBtn',
      type: 'button',
      class: 'btn btn-primary',
      click: function () {
        if (validateForm()) {
          show();
        }
      }
    });
    $('#st-form').append(newSubmitButton);
  }
}

function show() {

  if (t == 1) {
  
    // loader
    $('#bdy').css('filter', 'blur(8px)');
    $('#loader').show();
    setTimeout(function() {
      $('#loader').hide(); // Hide the loader when operation is complete
      $('#bdy').css('filter', 'blur(0px)');
    }, 500);
    if (validateForm()) {
      $('#exampleModal').modal('hide');
      let formData = [
        $('#first-name').val(),
        $('#last-name').val(),
        $('#dob').val(),
        $('#email').val(),
        $('#address').val(),
        $('#grd-year').val(),
        '<button class="btn edit-button edit-row" data-bs-toggle: "modal",data-bs-target:"exampleModal" id:"editR" >  <svg class="edit-svgIcon" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg></button>' +
        '<button class="btn button delete-row"> <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button>'
      ];
      var table = $('#s-outputTable').DataTable();
      // Add row to DataTable and redraw
      table.row.add(formData).draw(false);
    } else {
      alert("Please fill in all required fields correctly.");
    }
  }
}
// Delete row functionality
$('#s-outputTable').on('click', '.delete-row', function () {
  var table = $('#s-outputTable').DataTable(); // Ensure you have a reference to the DataTable
  table.row($(this).parents('tr')).remove().draw();
});

// Edit row functionality
$('#s-outputTable').on('click', '.edit-row', function () {
   // loader
   $('#bdy').css('filter', 'blur(8px)');
   $('#loader').show();
   setTimeout(function() {
     $('#loader').hide(); // Hide the loader when operation is complete
     $('#bdy').css('filter', 'blur(0px)');
   }, 2000);
  var row = $(this).closest('tr');
  var rowData = table.row(row).data();
  t = 0;
  // Assuming the order of rowData matches your form fields
  $('#first-name').val(rowData[0]);
  $('#last-name').val(rowData[1]);
  $('#dob').val(rowData[2]);
  $('#email').val(rowData[3]);
  $('#address').val(rowData[4]);
  $('#grd-year').val(rowData[5]);
  $('#shBtn').remove();
  // Check if the update button already exists
  if ($('#saveChanges').length === 0) { // If the update button does not exist
    var newSubmitButton = $('<button/>', {
      text: 'update',
      id: 'saveChanges',
      type: 'button',
      class: 'btn btn-primary',
      click: function () {
        if (validateForm()) {
          updateRow();
        }
      }
    });
  }
  $('#st-form').append(newSubmitButton);
  // Show modal or form for editing
  $('#exampleModal').modal('show');
  // Update the global variable to reference the row being edited
  currentlyEditingRow = row;
});

function updateRow() {
  // loader
  $('#bdy').css('filter', 'blur(8px)');
  $('#loader').show();
  setTimeout(function() {
    $('#loader').hide(); // Hide the loader when operation is complete
    $('#bdy').css('filter', 'blur(0px)');
  }, 500);
  
  if (!currentlyEditingRow) return;

  if (validateForm()) {
   
    currentlyEditingRow.find('td:eq(0)').text($('#first-name').val());
    currentlyEditingRow.find('td:eq(1)').text($('#last-name').val());
    currentlyEditingRow.find('td:eq(2)').text($('#dob').val());
    currentlyEditingRow.find('td:eq(3)').text($('#email').val());
    currentlyEditingRow.find('td:eq(4)').text($('#address').val());
    currentlyEditingRow.find('td:eq(5)').text($('#grd-year').val());

    currentlyEditingRow = null;
    t = 1
    $('#exampleModal').modal('hide');
  } else {
    alert("Please fill in all required fields correctly.");
  }
}



$(document).ready(function () {

 // Real-time validation listeners
$('#first-name').on('input', function () {
  validateField('#first-name', 'Please enter your first name.');
});

$('#last-name').on('input', function () {
  validateField('#last-name', 'Please enter your last name.');
});

$('#dob').on('change', function () {
  validateAge('#dob', 'You must be at least 18 years old.');
});

$('#email').on('input', function () {
  validateEmail('#email', 'Please enter a valid email address.');
});

$('#address').on('input', function () {
  validateField('#address', 'Please enter your address.');
});

$('#grd-year').on('input', function () {
  validateField('#grd-year', 'Please enter your graduation year.');
});

  // Form submission event listener
  $('#yourFormId').on('submit', function (event) {
    if (!validateForm()) {
      event.preventDefault(); // Prevent form submission
      alert('Please correct the errors before submitting.');
    }
  });
});





function validateAge(fieldSelector, errorMessage) {
  var dob = $(fieldSelector).val();
  var dobDate = new Date(dob);
  var age = getAge(dobDate);

  if (age < 18) {
    displayErrorMessage(fieldSelector, errorMessage);
    return false;
  } else {
    removeErrorMessage(fieldSelector);
    return true;
  }
}

function validateEmail(fieldSelector, errorMessage) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var field = $(fieldSelector);
  if (!emailRegex.test(field.val().trim())) {
    displayErrorMessage(fieldSelector, errorMessage);
    return false;
  } else {
    removeErrorMessage(fieldSelector);
    return true;
  }
}

function validateField(fieldSelector, errorMessage) {
  var field = $(fieldSelector);
  if (field.val().trim() === '') {
    displayErrorMessage(fieldSelector, errorMessage);
    return false;
  } else {
    removeErrorMessage(fieldSelector);
    return true;
  }
}

function displayErrorMessage(fieldSelector, message) {
  var field = $(fieldSelector);
  field.addClass('error');
  field.next('.error-message').remove(); // Remove existing error message if any
  var errorMessageElement = $('<span/>', {
    class: 'error-message',
    text: message
  }).css('color', 'red'); // Style as needed
  field.after(errorMessageElement);
}

function removeErrorMessage(fieldSelector) {
  var field = $(fieldSelector);
  field.removeClass('error');
  field.removeClass('error');
  field.next('.error-message').remove();
}

function getAge(dob) {
  var today = new Date();
  var age = today.getFullYear() - dob.getFullYear();
  var m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function validateForm() {
  var isValid = true;

  // Validate each field
  isValid &= validateField('#first-name', 'Please enter your first name.');
  isValid &= validateAge('#dob', 'You must be at least 18 years old.');
  isValid &= validateEmail('#email', 'Please enter a valid email address.');
  isValid &= validateField('#address', 'Please enter your address.');

  return !!isValid; // Convert to boolean
}

