(function() {

  let linkContainer = document.querySelector('.link-container');
  let addLink = document.querySelector('.link-add');
  let addLinkButton = document.querySelector('.add-link-button');
  let linkFilter = document.querySelector('.link-filter');
  let linkForm = document.querySelector('.link-form');
  let removeAllLinks = document.querySelector('.remove-all-links');
  let exportLink = document.querySelector('.export-all-links');
  let importLink = document.querySelector('.import-all-links');
  let linkExportImport = document.querySelector('.link-export-import');
  let tag;
  let tags;
  let links = [
    {
      url: 'http://www.google.com',
      name: 'Google',
      tags: ['javascript'],
      favorite: 'a'
    },
    {
      url: 'http://learnpythonthehardway.org/book/',
      name: 'Learn Python the Hard Way',
      tags: ['python'],
      favorite: 'a'
    },
  ];

  function saveLinks () {
    store.set('links', links);
  }

  function loadLinks () {
    if (store.get('links')  {
      links = store.get('links');
    } else {
      links = links;
    }
  }

  function createLinks () {
    linkContainer.innerHTML = '';
    links.sort(function (a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    links.sort(function (a, b) {
      var nameA = a.favorite.toUpperCase();
      var nameB = b.favorite.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    for (let i = 0; i < links.length; i++) {
      if (links[i].tags !== []) {
        tag = `<div class='tag' data-tag='${links[i].tags[0]}'>
          ${links[i].tags[0]}
        </div>`;
      } else {
        tag = '';
      }
      linkContainer.innerHTML += `
        <div class='link'>
          <i class='fa fa-star favorite-star' data-index=${i} data-favorite=${links[i].favorite}></i>
          <a title='${links[i].url}' href='${links[i].url}'>
            ${links[i].name}
          </a>
          ${tag}
          <i title='delete' data-index=${i} class='fa fa-trash delete-link'></i>
        </div>`;
    }
  }

  function handleFavoriteStar() {
    let favorites = document.querySelectorAll('.favorite-star');

    Array.from(favorites).forEach(favorite => {
      favorite.addEventListener('click', function () {
        let i = favorite.getAttribute('data-index');
        let f = favorite.getAttribute('data-favorite');
        if (f === 'a') { f = 'b'; } else { f = 'a'; }
        links[i].favorite = f;
        favorite.setAttribute('data-favorite', f);
        saveLinks();
      });
    });

  }

  function handleDeleteLink() {
    let deletes = document.querySelectorAll('.delete-link');

    Array.from(deletes).forEach(deletes => {
      deletes.addEventListener('click', function () {
        let i = deletes.getAttribute('data-index');
        links.splice(i, 1);
        createLinks();
        saveLinks();
      });
    });

  }

  function handleAddLink() {
    addLink.addEventListener('click', function () {
      let f = linkForm.getAttribute('data-hidden');
      if (f === 'true') {
        linkForm.setAttribute('data-hidden', 'false');
        addLink.innerHTML = "<i class='fa fa-minus'></i>";
      } else {
        addLink.innerHTML = "<i class='fa fa-plus'></i>";
        linkForm.setAttribute('data-hidden', 'true');
      }
    });
  }

  function handleAddNewLink() {
    addLinkButton.addEventListener('click', function () {
      let linkUrl = document.querySelector('.link-url').value;
      let linkName = document.querySelector('.link-name').value;
      let linkTags = document.querySelector('.link-tags').value;
      let linkFavorite = document.querySelector('.link-favorite');
      if (linkFavorite.checked) {
        linkFavorite = 'a';
      } else {
        linkFavorite = 'b';
      }

      linkTags = linkTags.split(', ');

      links.push({
        url: linkUrl,
        name: linkName,
        tags: linkTags,
        favorite: 'b'
      });

      document.querySelector('.link-url').value = '';
      document.querySelector('.link-name').value = '';
      document.querySelector('.link-tags').value = '';
      document.querySelector('.link-url').focus();

      createLinks();
      saveLinks();
      handleFavoriteStar();
    });
  }

  function handleRemoveAllLinks() {
    removeAllLinks.addEventListener('click', function () {
      event.preventDefault();
      links = [];
      createLinks();
      saveLinks();
    }
  }

  function handleExportLink() {
    exportLink.addEventListener('click', function () {
      linkExportImport.setAttribute('data-hidden', 'false');
      let resultString = '';
      event.preventDefault();
      for (let i = 0; i < links.length; i++) {
        resultString += links[i].url + '|' + links[i].name + '|' + links[i].tags[0] + '|' + links[i].favorite + '|';
      }
      resultString += ';';
      linkExportImport.textContent = resultString;
    });
  }

  function handleImportLink() {

  }

  function handleLinkFilter() {
    linkFilter.addEventListener('keydown', function () {
      let filterString = this.value;
      function matchesSubString(obj) {
        if (obj.name.includes(filterString)) {
          return true;
        } else {
          return false;
        }
      }
      links = links.filter(matchesSubString);
      createLinks();

    });
  }

  function init() {
    linkExportImport.setAttribute('data-hidden', 'true');
    loadLinks();
    createLinks();
    handleFavoriteStar();
    handleDeleteLink();
    handleLinkFilter();
    handleAddLink();
    handleAddNewLink();
    handleRemoveAllLinks();
    handleExportLink();
    handleImportLink();
  }

  init();

})();
