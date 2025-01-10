var customSelectEls = document.querySelectorAll('.custom-select');
// var selectDepartmentDropdownEl = customSelectEl.querySelector('ul');
// console.log(selectDepartmentDropdownEl);

var toggleOpen = (e) => {
  var selectStyles = e.currentTarget.classList;

  if (selectStyles.contains('custom-select_opened')) {
    selectStyles.remove('custom-select_opened');
  } else {
    selectStyles.add('custom-select_opened');
  }
};

customSelectEls.forEach((el) => el.addEventListener('click', toggleOpen));
