// ==UserScript==
// @name  Max Movie AI Preview
// @namespace http://github.com/xyzith/maxAiPreview
// @version 2025-2-24
// @description Add a felo ai preview btn to Max movie page
// @author  You
// @updateURL https://github.com/xyzith/maxMovieAiPreview.user.js/blob/master/maxAiPreview.user.js
// @match https://play.max.com/*
// @grant none
// ==/UserScript==
//

(function () {
  'use strict';
  let aiButton = null;

  const addFeloButton = () => {

    const buttonSection = document.querySelector('[class^="StyledButtonRowWrapper"]');
    const buttonRow = buttonSection?.children[1];

    if (aiButton?.parentNode === buttonRow) {
      return;
    }


    aiButton = buttonRow.firstChild.cloneNode(true);


    const icon = aiButton.querySelector('[class^="StyledAnimatedIconDiv"]');
    icon.textContent = '?';
    icon.style.fontSize = '22px';

    const text = aiButton.querySelector('[class^="StyledTextContainer"]')
    text.textContent = 'AI影評';
    text.style.fontSize = 'var(--font_body_sm_bp_01_font_size, 11px)'

    aiButton.addEventListener('click', () => {
      const movieName = document.title.replace(/ • Max$/, '').trim();
      const query = encodeURIComponent(`<<${movieName}>> What is this movie about? How are the ratings on IMDb and Rotten Tomatoes?`);
      const url = `https://felo.ai/search/?q=${query}`;
      window.open(url, '_blank');
    })

    buttonRow.appendChild(aiButton);
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const target = document.querySelector('[class^="StyledButtonRowWrapper"]');
      if (target) {
        addFeloButton();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

})();
