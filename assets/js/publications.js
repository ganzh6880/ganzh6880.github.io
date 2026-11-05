/*
 * Publication teasers + BibTeX, pulled live from each paper's project page.
 *
 * For every .publication-entry[data-project] this fetches the project page once and finds:
 *   - the teaser: the first <img>/<video> whose file name contains "teaser"; otherwise the
 *     first <img>/<video> on the page. Only media hosted under the project's own URL counts,
 *     so a link to a sibling project's teaser is never picked up.
 *   - the BibTeX: <pre id="bib">, or the first <pre> that starts with "@".
 * Images go through the optional resizing proxy (site.teaser_image_proxy) and fall back to the
 * original file; videos play muted while on screen. If nothing usable is found the thumbnail
 * slot is hidden and the entry shows as text only.
 */
(function () {
  'use strict';

  var root = document.querySelector('.publications');
  if (!root || !window.fetch || !window.DOMParser || !window.URL) return;

  var proxyTemplate = root.getAttribute('data-image-proxy') || '';
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var VIDEO_EXT = /\.(mp4|webm|m4v|mov|ogv)$/i;
  var NO_RESIZE_EXT = /\.(gif|svg)$/i;

  var playWhenVisible = 'IntersectionObserver' in window && new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !reduceMotion) {
        var p = e.target.play();
        if (p && p.catch) p.catch(function () {});
      } else {
        e.target.pause();
      }
    });
  }, { threshold: 0.25 });

  function fileName(url) {
    return new URL(url).pathname.split('/').pop();
  }

  function projectBase(pageUrl) {
    var u = new URL(pageUrl, location.href);
    u.search = '';
    u.hash = '';
    u.pathname = u.pathname.replace(/[^/]*$/, '');
    return u.href;
  }

  function resized(src, width) {
    if (!proxyTemplate || NO_RESIZE_EXT.test(fileName(src))) return null;
    return proxyTemplate.replace('{url}', encodeURIComponent(src)).replace('{width}', width);
  }

  function findTeaser(doc, pageUrl) {
    var base = projectBase(pageUrl);
    var baseTag = doc.querySelector('base[href]');
    var resolveFrom = baseTag ? new URL(baseTag.getAttribute('href'), pageUrl).href : pageUrl;
    var candidates = [];

    Array.prototype.forEach.call(doc.querySelectorAll('img[src], video'), function (el) {
      if (el.closest('nav, footer')) return;
      var isVideoTag = el.tagName === 'VIDEO';
      var source = isVideoTag ? (el.getAttribute('src') ? el : el.querySelector('source[src]')) : el;
      if (!source) return;
      var src;
      try { src = new URL(source.getAttribute('src'), resolveFrom).href; } catch (err) { return; }
      if (src.indexOf(base) !== 0) return; // belongs to another site or project
      var name = fileName(src);
      var poster = isVideoTag && el.getAttribute('poster');
      candidates.push({
        src: src,
        name: name,
        video: isVideoTag || VIDEO_EXT.test(name),
        poster: poster ? new URL(poster, resolveFrom).href : '',
        alt: el.getAttribute('alt') || el.getAttribute('aria-label') || ''
      });
    });

    for (var i = 0; i < candidates.length; i++) {
      if (/teaser/i.test(candidates[i].name)) return candidates[i];
    }
    return candidates[0] || null;
  }

  function findBibtex(doc) {
    var bib = doc.getElementById('bib');
    if (bib && bib.textContent.trim().charAt(0) === '@') return bib.textContent.trim();
    var pres = doc.querySelectorAll('pre');
    for (var i = 0; i < pres.length; i++) {
      var text = pres[i].textContent.trim();
      if (text.charAt(0) === '@') return text;
    }
    return '';
  }

  function hideSlot(slot) {
    var box = slot && slot.closest('.paper-box-image');
    if (box) box.style.display = 'none';
  }

  function markLoaded(slot) {
    slot.classList.remove('is-loading');
  }

  function renderImage(slot, teaser, fallbackAlt) {
    var img = document.createElement('img');
    var small = resized(teaser.src, 720);
    img.alt = teaser.alt || fallbackAlt;
    img.loading = 'lazy';
    img.decoding = 'async';
    if (small) {
      img.srcset = small + ' 720w, ' + resized(teaser.src, 1280) + ' 1280w';
      img.sizes = '(min-width: 48em) 32vw, 100vw';
      img.src = small;
    } else {
      img.src = teaser.src;
    }
    img.addEventListener('load', function () { markLoaded(slot); });
    img.addEventListener('error', function () {
      if (small && !img.getAttribute('data-original')) {
        img.setAttribute('data-original', '1'); // proxy failed: load the original file
        img.removeAttribute('srcset');
        img.src = teaser.src;
      } else {
        hideSlot(slot);
      }
    });
    slot.appendChild(img);
  }

  function renderVideo(slot, teaser, fallbackAlt) {
    var video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.preload = 'metadata';
    video.setAttribute('aria-label', teaser.alt || fallbackAlt);
    if (teaser.poster) video.poster = resized(teaser.poster, 720) || teaser.poster;
    video.addEventListener('loadeddata', function () { markLoaded(slot); });
    video.addEventListener('error', function () { hideSlot(slot); });
    video.src = teaser.src + (teaser.src.indexOf('#') < 0 ? '#t=0.1' : '');
    slot.appendChild(video);
    if (playWhenVisible) playWhenVisible.observe(video);
    else if (!reduceMotion) video.play();
  }

  function renderTeaser(slot, teaser, fallbackAlt) {
    if (!slot) return;
    if (!teaser) return hideSlot(slot);
    (teaser.video ? renderVideo : renderImage)(slot, teaser, fallbackAlt);
  }

  function setBibtex(entry, text) {
    if (!text) return;
    entry.querySelector('.paper-bib pre').textContent = text;
    entry.querySelector('.paper-bib-toggle').hidden = false;
  }

  Array.prototype.forEach.call(root.querySelectorAll('.publication-entry'), function (entry) {
    var project = entry.getAttribute('data-project');
    var override = entry.getAttribute('data-teaser');
    var slot = entry.querySelector('.paper-teaser');
    var title = (entry.querySelector('.paper-title') || {}).textContent || '';
    var needBib = !entry.querySelector('.paper-bib pre').textContent.trim();
    var overrideTeaser = override && {
      src: new URL(override, location.href).href,
      video: VIDEO_EXT.test(fileName(new URL(override, location.href).href)),
      poster: '',
      alt: ''
    };

    if (!project || (overrideTeaser && !needBib)) {
      renderTeaser(slot, overrideTeaser, title);
      return;
    }

    fetch(project, { mode: 'cors' })
      .then(function (res) { if (!res.ok) throw new Error(res.status); return res.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        renderTeaser(slot, overrideTeaser || findTeaser(doc, project), title);
        if (needBib) setBibtex(entry, findBibtex(doc));
      })
      .catch(function () { renderTeaser(slot, overrideTeaser, title); });
  });

  // BibTeX toggle + copy
  root.addEventListener('click', function (e) {
    var button = e.target.closest && e.target.closest('.paper-bib-toggle, .paper-bib-copy');
    if (!button) return;
    var entry = button.closest('.publication-entry');
    var box = entry.querySelector('.paper-bib');

    if (button.classList.contains('paper-bib-toggle')) {
      box.hidden = !box.hidden;
      button.setAttribute('aria-expanded', String(!box.hidden));
      return;
    }

    var text = box.querySelector('pre').textContent;
    var done = function () {
      button.textContent = 'Copied';
      setTimeout(function () { button.textContent = 'Copy'; }, 1500);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () {});
    } else {
      var range = document.createRange();
      range.selectNodeContents(box.querySelector('pre'));
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      try { if (document.execCommand('copy')) done(); } catch (err) {}
      sel.removeAllRanges();
    }
  });
})();
