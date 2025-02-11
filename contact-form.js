(() => {
  var contactFormEl = document.querySelector('#main-contact-form');
  var dropArea = contactFormEl.querySelector('.input-group_upload');
  var inputFiles = dropArea.querySelector('input');
  var filesToUpload = document.querySelectorAll('.upload-zone__file');
  var filesToUploadDeleteBtns = document.querySelectorAll('.upload-zone__file > button');
  var successStatusEl = contactFormEl.querySelector('.submit-status');

  var fileStore = [];
  var maxFileCount = 2;

  var updateVisualUploadedFiles = () => {
    var { files } = inputFiles;

    files.length === maxFileCount && dropArea.setAttribute('hidden', '');
    files.length < maxFileCount && dropArea.removeAttribute('hidden', '');

    // clear all
    [...filesToUpload].forEach((item) => {
      item.querySelector('p').innerHTML = '';
      item.setAttribute('hidden', '');
      item.dataset.name = '';
    });

    [...files].forEach(({ name }, i) => {
      filesToUpload[i].querySelector('p').innerHTML = name;
      filesToUpload[i].removeAttribute('hidden', '');
      filesToUpload[i].dataset.name = name;
    });
  };

  var updateInputFiles = (fileArray) => {
    inputFiles.files = fileArray.reduce(
      (dt, f, i) => (dt.items.add(f) && 0) || dt,
      new DataTransfer(),
    ).files;
  };

  var addFiles = () => {
    var { files } = inputFiles;

    if (fileStore.length + files.length <= maxFileCount) {
      fileStore.push.apply(fileStore, files);

      updateInputFiles(fileStore);
      updateVisualUploadedFiles();
    }
  };

  var removeFile = (e) => {
    var fileName = e.target.parentNode.dataset.name;
    var { files } = inputFiles;

    var deletedIndex = [...files].findIndex((file) => file.name === fileName);
    fileStore.splice(deletedIndex, 1);

    updateInputFiles(fileStore);
    updateVisualUploadedFiles();
  };

  inputFiles.addEventListener('change', addFiles);

  filesToUploadDeleteBtns.forEach((button) => button.addEventListener('click', removeFile));

  contactFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    var formData = new FormData(contactFormEl);

    fetch('http://localhost:4000/contact', {
      method: 'post',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        successStatusEl.innerText = data.status && "Thank you! We'll be in touch soon";
      });
  });
})();
