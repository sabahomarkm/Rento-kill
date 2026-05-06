function handleSubmit() {
  var service = document.getElementById('service').value;
  var type = document.getElementById('type').value;
  var serviceDate = document.getElementById('serviceDate').value;
  var name = document.getElementById('name').value;
  var address = document.getElementById('address').value;
  var errorEl = document.getElementById('formError');

  errorEl.classList.remove('show');

  if (!service || !type || !serviceDate || !name || !address) {
    errorEl.classList.add('show');
    return;
  }

  var data = JSON.stringify({
    service: service,
    type: type,
    serviceDate: serviceDate,
    name: name,
    address: address
  });

  if (window.voltmxweb) {
    voltmxweb.fireEvent('onBookService', { data: data });
  } else if (window.voltmx) {
    voltmx.evaluateJavaScriptInNativeContext("bookService('" + data + "')");
  } else {
    alert('Booking submitted!\n' + data);
  }
}

function handleCancel() {
  if (window.voltmxweb) {
    voltmxweb.fireEvent('onCancel', {});
  } else if (window.voltmx) {
    voltmx.evaluateJavaScriptInNativeContext("cancelBooking()");
  }
}

function handleLogout() {
  if (window.voltmxweb) {
    voltmxweb.fireEvent('onLogout', {});
  } else if (window.voltmx) {
    voltmx.evaluateJavaScriptInNativeContext("logoutUser()");
  }
}
