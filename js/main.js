'use strict';
{
// GoogleMap
  let map;
  async function initMap() {
    const kirameki = { lat: 35.64373, lng: 139.79450 };
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
    center: kirameki,
    zoom: 14,
  });
}
  initMap();

// バリデーション
  const form = document.querySelector("#entryform");
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // 各inputを検証
    [...form.elements].forEach(input => {
      if (input.name !== 'payment') {
        const errorMessage = input.nextElementSibling;
        if (errorMessage) {
          if (!input.checkValidity()) {
            valid = false;
            input.classList.add('invalid');
            errorMessage.textContent = input.validationMessage;
          } else if (input.id === 'address' && !input.value.match(/^\d{7}$/)) {
            errorMessage.textContent = "郵便番号は7文字の数字で入力してください。";
          } else if (input.id === 'city' && !input.value.match(/^[^\x20-\x7e]*$/)) {
            errorMessage.textContent = "住所は全角文字で入力してください。";
          } else if (input.id === 'tel' && !input.value.match(/^0\d{10,11}$/)) {
            errorMessage.textContent = "半角かつ10桁or11桁の数字で入力してください。";
          } else if (
            input.id === 'password' && !input.value.match(/^([a-zA-Z0-9]{4,})$/)) {
            errorMessage.textContent = "4文字以上の英数字を入力してください。";
          } else {
            input.classList.remove("invalid");
            input.setCustomValidity("");
            errorMessage.textContent = "";
          }
        }
      }
    });
  });

// フェードイン
  const fadein = {
    opacity: [0, 1]
  };
  
  // フェードイン効果(右から左)
  const fadeinRight = {
    opacity: [0, 1],
    transform: ["translate(-200px, 0px)", "translate(0px, 0px)"],
  };
  
  // フェードイン効果(左から右)
  const fadeinLeft = {
    opacity: [0, 1],
    transform: ["translate(200px, 0)", "translate(0px, 0px)"],
  };

  // 範囲内に対象が現れたら実行
  const show = (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("fadein")) {
          entry.target.animate(fadein, {
            duration: 2000,
            easing: "ease",
            fill: "forwards",
          });
        }
        else if (entry.target.classList.contains("fadeinRight")) {
          entry.target.animate(fadeinRight, {
            duration: 700,
            easing: "ease",
            fill: "forwards",
          });
        }
        else if (entry.target.classList.contains("fadeinLeft")) {
          entry.target.animate(fadeinLeft, {
            duration: 700,
            easing: "ease",
            fill: "forwards",
          });
        }
        obs.unobserve(entry.target);
      }
    });
  };

  // 監視設定
  const showObserver = new IntersectionObserver(show);
  // .animationを監視
  const showElements = document.querySelectorAll(".animation");
  showElements.forEach((showElement) => {
    showObserver.observe(showElement);
  });  
}