(function() {

  let linkContainer = document.querySelector('.link-container');
  let addLink = document.querySelector('.link-add');
  let addLinkButton = document.querySelector('.add-link-button');
  let linkFilter = document.querySelector('.link-filter');
  let linkForm = document.querySelector('.link-form');
  let removeAllLinks = document.querySelector('.remove-all-links');
  let tag;
  let links = [
    {
      url: 'http://www.google.com',
      name: 'Google',
      tag: 'javascript',
      favorite: 'a'
    },
    {
      url: 'http://learnpythonthehardway.org/book/',
      name: 'Learn Python the Hard Way',
      tag: 'python',
      favorite: 'a'
    },
    {
      url: 'http://www.google.com',
      name: 'Google2',
      tag: 'javascript',
      favorite: 'b'
    },
    {
      url: 'https://entrepreneurs.maqtoob.com/the-37-best-websites-to-learn-something-new-895e2cb0cad4#.ss2lwydh8',
      name: '37 Best Websites To Learn Something New',
      tag: '',
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
      if (links[i].tag !== '') {
        tag = `<div class='tag' data-tag='${links[i].tag}'>
          ${links[i].tag}
        </div>`;
      } else {
        tag = '';
      }
      linkContainer.innerHTML += `
        <div class='link'>
          <i class='fa fa-star favorite-star' data-index=${i} data-favorite=${links[i].favorite}></i>
          <a href='${links[i].url}'>
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

      links.push({
        url: linkUrl,
        name: linkName,
        tag: linkTags,
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

  function init() {
    loadLinks();
    createLinks();
    handleFavoriteStar();
    handleDeleteLink();
    handleAddLink();
    handleAddNewLink();
    handleRemoveAllLinks();
  }

  init();

})();
