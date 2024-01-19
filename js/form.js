(function () {

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const targetNode = document.getElementsByClassName("blue-form")[0].parentElement;
  const config = { attributes: true, childList: true, subtree: true };

  let repository = params.repository;
  let repoDropdown = document.querySelector('[id$="Repository_SelectedValue"]');
  let hiddenFields = document.querySelectorAll('[id*="HiddenFieldComponent"]');

  if (hiddenFields.length > 0) {
    let ele = document.querySelector('[value="Submit"]');
    if (ele.addEventListener) {
      ele.addEventListener("click", function () { handleHiddenFields(hiddenFields) }, false); //Modern browsers
    } else if (ele.attachEvent) {
      ele.attachEvent('click', function () { handleHiddenFields(hiddenFields) }); //Old IE
    }
  }

  // fix file required preventing form submission
  const callback = function (mutationList, observer) {
    for (const mutation of mutationList) {
      if (mutation.type == 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.className == 'blue-form') {
            removeRequired();
          }
        }
      }
    }
  };

  if (targetNode) {
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }



  if (repoDropdown != null && repoDropdown != 'undefined') {
    repoDropdown.value = repository;
    repoDropdown.disabled = true;

    let ele = document.querySelector('[value="Submit"]');
    if (ele.addEventListener) {
      ele.addEventListener("click", resetDisabled, false);  //Modern browsers
    } else if (ele.attachEvent) {
      ele.attachEvent('click', resetDisabled);            //Old IE
    }
  }

  function resetDisabled() {
    repoDropdown.disabled = false;
  }

  // save hidden fields to localstorage; retrieve them if the form fails and needs to reload
  function handleHiddenFields(fields) {
    for (var item of fields) {
      let fieldNameStart = item.name.indexOf('HiddenFieldComponent');
      let fieldName = item.name.substr(fieldNameStart, item.name.length);
      if (item.value != "") {
        window.localStorage[fieldName] = item.value;
      }
      else {
        item.value = window.localStorage[fieldName];
      }
    }
  }

  function removeRequired() {
    document.querySelector('input[type=file]').required = false;
    document.querySelector('input[type=file]').removeAttribute('aria-required');
  }

})();
