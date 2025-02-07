(() => {
  var contactFormEl = document.querySelector('#main-contact-form');
  var dropArea = contactFormEl.querySelector('.input-group_upload');
  var inputFiles = dropArea.querySelector('input');
  var filesToUpload = document.querySelectorAll('.upload-zone__file');
  var filesToUploadDeleteBtns = document.querySelectorAll('.upload-zone__file > button');
  var successStatusEl = contactFormEl.querySelector('.submit-status');

  var uploadFile = () => {
    var { files } = inputFiles;

    [...files].forEach(({ name }, i) => {
      filesToUpload[i].querySelector('p').innerHTML = name;
      filesToUpload[i].removeAttribute('hidden', '');
      filesToUpload[i].dataset.name = name;
    });
  };

  var removeFile = (e) => {
    var fileName = e.target.parentNode.dataset.name;
    var { files } = inputFiles;

    // remove file from form fileList
    var files = [...files].filter((file) => file.name != fileName);

    // update interface
    filesToUpload.forEach(
      (fileEl) => fileEl.dataset.name === fileName && fileEl.setAttribute('hidden', ''),
    );
  };

  var dropFile = (e) => {
    e.preventDefault();
    inputFiles.files = e.dataTransfer.files;
    uploadFile();
  };

  var dragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-hover');
  };

  var dragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-hover');
  };

  filesToUploadDeleteBtns.forEach((button) => button.addEventListener('click', removeFile));

  inputFiles.addEventListener('change', uploadFile);
  dropArea.addEventListener('dragover', dragOver);
  dropArea.addEventListener('dragleave', dragLeave);
  dropArea.addEventListener('drop', dropFile);

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
