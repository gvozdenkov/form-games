var customSelectEls = document.querySelectorAll('.custom-select');

var toggleOpen = (e) => {
  var selectStyles = e.currentTarget.classList;
  var dropdownEl = e.currentTarget.querySelector('ul');
  var buttonEl = e.currentTarget.querySelector('button');

  var selectOption = (e) => {
    var optionEl = e.target;
    var value = optionEl.innerText;
    buttonEl.innerText = value;
    buttonEl.classList.add('custom-select__button_selected');
    console.log(e.currentTarget);
    e.currentTarget.querySelectorAll('li').forEach((li) => {
      // console.log(li);
      li.classList.remove('.custom-select__dropdown-item_selected');
    });

    optionEl.classList.add('custom-select__dropdown-item_selected');
  };

  if (selectStyles.contains('custom-select_opened')) {
    selectStyles.remove('custom-select_opened');
    // dropdownEl.removeEventListener('click', selectOption);
  } else {
    selectStyles.add('custom-select_opened');
    dropdownEl.addEventListener('click', selectOption);
  }
};

customSelectEls.forEach((el) => el.addEventListener('click', toggleOpen));
