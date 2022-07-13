"use strict";

let from = document.querySelector("select[name='from']");
let to = document.querySelector("select[name='to']");
let amount = document.querySelector("input[name='amount']");
let btn = document.querySelector("button");

let display = document.querySelector("input[name='display']");

fetch(`https://v6.exchangerate-api.com/v6/555b7100681c9f7029157c0d/latest/USD`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let currency of Object.keys(data.conversion_rates)) {
      from.innerHTML += `<option value="${currency}">${currency}</option>`;
      to.innerHTML += `<option value="${currency}">${currency}</option>`;
    }
  });

btn.addEventListener("click", (e) => {
  e.preventDefault();
  async function currency() {
    let response = await fetch(
      `https://v6.exchangerate-api.com/v6/555b7100681c9f7029157c0d/pair/${
        from.value
      }/${to.value}/${amount.value || 1}`
    );

    let data = await response.json();

    display.value = `${amount.value} ${from.value} = ${data.conversion_result} ${to.value}`;
  }

  currency();
});


