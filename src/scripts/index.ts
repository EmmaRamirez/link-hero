(function() {

  let linkContainer = document.querySelector('.link-container');
  let addLink = document.querySelector('.link-add');
  let addLinkButton = document.querySelector('.add-link-button');
  let linkFilter = document.querySelector('.link-filter');
  let linkForm = document.querySelector('.link-form');
  let linkTagsFilter = document.querySelector('.link-tags-filter');
  let removeAllLinks = document.querySelector('.remove-all-links');
  let exportLink = document.querySelector('.export-all-links');
  let importLink = document.querySelector('.import-all-links');
  let linkAlphaSort = document.querySelector('.link-alpha-sort');
  let linkExportImport = document.querySelector('.link-export-import');
  let linkTagsFilterToggle = 2;
  let settingsToggle = 2;
  let settingsContainer = document.querySelector('.settings');
  let settingsIcon = document.querySelector('.settings-icon');
  let settingsClose = document.querySelector('.close-settings');
  let addNewTag = document.querySelector('.add-new-tag');
  let userTagColorsContainer = document.querySelector('.user-tag-colors');
  let tagColorsStyle = document.querySelector('#tag-colors');
  let customCSSInput = document.querySelector('.custom-css');
  let tag;
  let tags;
  let customCSS = '';
  let tagColors = [
    {
      tag: 'javascript',
      color: '#EBEB2A',
    },
    {
      tag: 'haskell',
      color: '#A654D6',
    },
    {
      tag: 'react',
      color: '#80D2ED',
    }
  ];
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

  function saveTags() {
    store.set('tags', tagColors);
  }

  function loadLinks () {
    if (store.get('links'))  {
      links = store.get('links');
    } else {
      links = links;
    }
  }

  function loadTags () {
    if (store.get('tags')) {
      tagColors = store.get('tags');
    } else {
      tagColors = tagColors;
    }
  }

  function createTags() {
    let styleString = '';
    userTagColorsContainer.innerHTML = '';
    sortTagColors();

    for (let i = 0; i < tagColors.length; i++) {
      userTagColorsContainer.innerHTML += `
      <label data-id='${i}' class='tag-color-container'>
        ${tagColors[i].tag}
        <div class='tag-color' style='background:${tagColors[i].color}'></div>
        <div class='tag-color-options'>
          <div  data-id='${i}' class='tag-color-option delete-tag'>Delete</div>
          <!--<div  data-id='${i}' class='tag-color-option'>Edit</div>-->
        </div>
      </label>
      `;
      styleString += `.link .tag[data-tag='${tagColors[i].tag}'] { background: ${tagColors[i].color}; }`;
    }
    tagColorsStyle.innerHTML = styleString;
  }

  function sortLinks() {
    links.sort(function (a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    sortFavorites();
  }

  function sortFavorites() {
    links.sort(function (a, b) {
      var nameA = a.favorite.toUpperCase();
      var nameB = b.favorite.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  function sortTagColors() {
    tagColors.sort(function (a, b) {
      let nameA = a.tag.toUpperCase();
      let nameB = b.tag.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    })
  }

  function handleCustomCSS() {
    // customCSSInput.addEventListener('keypress', function() {
    //   customCSS = this.textContent;
    //   document.head.innerHTML += '<style>' + customCSS + '</style>';
    // });
  }

  function createLinks (sort = false) {
    if (sort === true) {
      sortLinks();
    }
    linkContainer.innerHTML = '';

    for (let i = 0; i < links.length; i++) {
      tag = '';
      for (let j = 0; j < links[i].tags.length; j++) {
        tag += `
          <div class='tag' data-tag='${links[i].tags[j]}'>
            ${links[i].tags[j]}
          </div>`;
      }
      linkContainer.innerHTML += `
        <div class='link'>
          <i class='fa fa-star favorite-star' data-index=${i} data-favorite=${links[i].favorite}></i>
          <a target="_blank" title='${links[i].url}' href='${links[i].url}'>
            ${links[i].name}
          </a>
          <div class='tag-container'>
            ${tag}
          </div>
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
        createLinks(true);
      });
    });

  }

  function handleTagSort() {
    linkTagsFilter.addEventListener('click', function() {
      event.preventDefault();
      if (linkTagsFilterToggle % 2 === 0) {
        links.sort(function (a, b) {
          var tagA = a.tags[0];
          var tagB = b.tags[0];
          if (tagA > tagB) return -1;
          if (tagA < tagB) return 1;
          return 0;
        });
        sortFavorites();
      } else {
        links.sort(function (a, b) {
          var tagA = a.tags[0];
          var tagB = b.tags[0];
          if (tagA > tagB) return 1;
          if (tagA < tagB) return -1;
          return 0;
        });
        sortFavorites();
      }
      createLinks();
      linkTagsFilterToggle++;
    });
  }

  function handleAddNewTag() {
    addNewTag.addEventListener('click', function () {
      let tagColorColor = document.querySelector('.tag-color-color');
      let tagColorTag = document.querySelector('.tag-color-tag');
      tagColors.push({ tag: tagColorTag.textContent, color: tagColorColor.textContent });
      tagColorColor.textContent = 'Tag Name';
      tagColorTag.textContent = '#ff0000';
      createTags();
      saveTags();
    });
  }

  function handleDeleteLink() {
    let deletes = document.querySelectorAll('.delete-link');

    Array.from(deletes).forEach(deletes => {
      deletes.addEventListener('click', function () {
        let i = deletes.getAttribute('data-index');
        links.splice(i, 1);
        createLinks();
        saveLinks(true);
      });
    });

  }

  function handleDeleteTag() {
    let deletes = document.querySelectorAll('.delete-tag');

    Array.from(deletes).forEach(deletes => {
      deletes.addEventListener('click', function () {
        let i = deletes.getAttribute('data-index');
        tagColors.splice(i, 1);
        createTags();
        saveTags();
      })
    })
  }

  function handleAddLink() {
    addLink.addEventListener('click', function () {
      let f = linkForm.getAttribute('data-hidden');
      if (f === 'true') {
        linkForm.setAttribute('data-hidden', 'false');
        addLink.innerHTML = "<i class='fa fa-minus'></i>";
        document.querySelector('.link-url').focus();
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
      createLinks(true);
      saveLinks();
    });
  }

  function handleExportLink() {
    exportLink.addEventListener('click', function () {
      linkExportImport.setAttribute('data-hidden', 'false');
      let resultString = '';
      event.preventDefault();
      for (let i = 0; i < links.length; i++) {
        resultString += `
          {
            url: '${links[i].url}'
            name: '${links[i].name}'
            tags: ['${links[i].tags[0]}']
            favorite: '${links[i].favorite}'
          }
        `
      }
      resultString += ',';
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
      createLinks(true);

    });
  }

  function handleLinkAlphaSort() {
    linkAlphaSort.addEventListener('click', function () {
      createLinks(true);
    });
  }

  function handleSettingsClose() {
    settingsClose.addEventListener('click', function () {
      settingsContainer.setAttribute('data-hidden', 'true');
      settingsIcon.className = 'fa fa-gear settings-icon';
      settingsToggle = 2;
    });
  }

  function handleSettingsIcon() {
    settingsIcon.addEventListener('click', function () {
      if (settingsToggle % 2 == 0) {
        settingsContainer.setAttribute('data-hidden', 'false');
        this.className += ' active';
      } else {
        settingsContainer.setAttribute('data-hidden', 'true');
        settingsIcon.className = 'fa fa-gear settings-icon';
      }
      settingsToggle++;
    });
  }

  function init() {
    linkExportImport.setAttribute('data-hidden', 'true');
    settingsContainer.setAttribute('data-hidden', 'true');
    loadLinks();
    loadTags();
    createLinks(true);
    createTags();
    handleFavoriteStar();
    handleDeleteLink();
    handleLinkFilter();
    handleLinkAlphaSort();
    handleAddLink();
    handleAddNewLink();
    handleTagSort();
    handleCustomCSS();
    handleAddNewTag();
    handleDeleteTag();
    handleSettingsIcon();
    handleSettingsClose();
    handleRemoveAllLinks();
    handleExportLink();
    handleImportLink();
  }

  init();

})();
