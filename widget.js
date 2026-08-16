/*
  클라이언트 홈페이지에 붙여넣는 임베드 스니펫.
  아임웹/카페24 등 "코드 삽입" 기능 있는 곳에 <div id="review-widget-<slug>"></div> 와 함께 넣으면 됨.

  사용법 (클라이언트 사이트에 삽입):
  <div id="review-widget-gwangnam"></div>
  <script src="https://saintparkhw.github.io/review-widgets-public/widget.js"
          data-slug="gwangnam"></script>
*/
(function () {
  var script = document.currentScript;
  var slug = script.getAttribute("data-slug");
  var base = script.src.replace(/widget\.js.*$/, "");
  var mount = document.getElementById("review-widget-" + slug);
  if (!mount) return;

  fetch(base + slug + ".json")
    .then(function (res) { return res.json(); })
    .then(function (data) { render(data); })
    .catch(function () {
      mount.innerHTML = "";
    });

  function render(data) {
    var wrap = document.createElement("div");
    wrap.style.cssText = "font-family:inherit;display:flex;flex-direction:column;gap:8px;";

    var label = document.createElement("div");
    label.textContent = "숨고 인증 후기";
    label.style.cssText = "font-size:12px;color:#888;margin-bottom:4px;";
    wrap.appendChild(label);

    (data.reviews || []).forEach(function (r) {
      var card = document.createElement("a");
      card.href = data.source_url;
      card.target = "_blank";
      card.rel = "noopener";
      card.style.cssText =
        "display:block;padding:12px;border:1px solid #e5e5e5;border-radius:8px;" +
        "text-decoration:none;color:#333;font-size:14px;line-height:1.5;";
      card.textContent = r.text;
      wrap.appendChild(card);
    });

    var footer = document.createElement("div");
    footer.style.cssText = "font-size:11px;color:#aaa;margin-top:4px;";
    var updated = new Date(data.updated_at);
    footer.textContent = "업데이트: " + updated.toLocaleDateString("ko-KR");
    wrap.appendChild(footer);

    mount.innerHTML = "";
    mount.appendChild(wrap);
  }
})();
