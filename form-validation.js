export var validateForm = (formSelector) => {
  var formEl = document.querySelector(formSelector);

  formEl.setAttribute('novalidate', '');

  [...formEl.elements].forEach((element) => {
    element.closest('.js-form-group') &&
      element.addEventListener('blur', (e) => {
        validateSingleFormGroup(e.target.closest('.js-form-group'));
      });
  });

  var validationOptions = [
    {
      attribute: 'pattern',
      isValid: (input) => {
        var patternRegex = new RegExp(input.pattern, 'u');
        return patternRegex.test(input.value);
      },
      errorMessage: (input, label) => `Not a valid ${label.textContent}`,
    },
    {
      attribute: 'minlength',
      isValid: (input) => input.value && input.value.length >= input.minLength,
      errorMessage: (input, label) =>
        `${label.textContent} need to be at least ${input.minLength} charecters`,
    },
    {
      attribute: 'required',
      isValid: (input) => {
        if (input.type === 'checkbox') {
          return input.checked;
        } else {
          return input.value.trim() !== '';
        }
      },
      errorMessage: (input, label) => `This field is required`,
    },
  ];

  var validateSingleFormGroup = (formGroup) => {
    var label = formGroup.querySelector('label');
    var input = formGroup.querySelector('input, textarea');
    var errorText = formGroup.querySelector('.error-tooltip');

    var formGroupInvalid = false;

    validationOptions.forEach((option) => {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorText.textContent = option.errorMessage(input, label);
        input.setAttribute('aria-invalid', 'true');
        formGroupInvalid = true;
      }
    });

    !formGroupInvalid && input.setAttribute('aria-invalid', 'false');
  };

  var validateFormGroups = (formEl) => {
    var formGroups = [...formEl.querySelectorAll('.js-form-group')];

    formGroups.forEach((formGroup) => {
      validateSingleFormGroup(formGroup);
    });
  };

  // submit event handler
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    validateFormGroups(e.currentTarget);

    var formData = new FormData(formEl);

    fetch('http://localhost:4000/contact', {
      method: 'post',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Thank you! We'll be in touch soon");
      });
  });
};
