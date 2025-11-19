// /assets/js/header-loader.js  (simple version)
(function(){
  var HEADER_PATH = '/header.html'; // assumes header.html is at the web root

  fetch(HEADER_PATH, {cache: 'no-cache'})
    .then(function(resp){
      if (!resp.ok) throw new Error('Failed to load header: ' + resp.status);
      return resp.text();
    })
    .then(function(html){
      var placeholder = document.getElementById('header-placeholder');
      if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.id = 'header-placeholder';
        document.body.insertBefore(placeholder, document.body.firstChild);
      }
      placeholder.innerHTML = html;
      // simple init: highlight the active menu item
      try {
        var map = {
          'index.html': 'home', '': 'home',
          'about-us.html': 'about',
          'our-products.html': 'products',
          'industries-we-serve.html': 'industries',
          'contact.html': 'contact'
        };
        var path = location.pathname.split('/').pop();
        var pageKey = map[path] || null;
        if (pageKey) {
          var el = document.querySelector('#header-placeholder nav a[data-page="'+pageKey+'"]');
          if (el) el.classList.add('active');
        }
      } catch(e){ console.warn(e); }
    })
    .catch(function(err){
      console.error('header-loader error:', err);
    });
})();
