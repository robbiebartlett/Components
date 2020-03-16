// accessible accordian functionality based on docs from:
// https://www.w3.org/TR/wai-aria-practices/examples/accordian/accordian.html

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

console.clear();
("use strict");

function arraySelector(parent, selector) {
  return Array.prototype.slice.call(parent.querySelectorAll(selector));
}

const accordians = arraySelector(document, ".accordian");

function toggleaccordian(target) {
  const isExpanded = target.getAttribute("aria-expanded") === "true";
  const controls = document.getElementById(
    target.getAttribute("aria-controls")
  );
  const action = isExpanded ? "setAttribute" : "removeAttribute";
  controls[action]("hidden", "");
  target.setAttribute("aria-expanded", !isExpanded);
}

accordians.forEach(accordian => {
  const triggers = arraySelector(accordian, ".accordian__button");
  const panels = arraySelector(accordian, ".accordian__panel");

  accordian.addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains("accordian__button")) {
      toggleaccordian(target);
      event.preventDefault();
    }
  });

  // Bind keyboard behaviors on the main accordian container
  accordian.addEventListener("keydown", event => {
    const target = event.target;
    const key = event.which.toString();
    const ctrlPageUpDown = event.ctrlKey && key.match(/33|34/);
    const ctrlPageUp = event.ctrlKey && key.match("33");
    const ctrlPageDown = event.ctrlKey && key.match("34");
    const isTrigger = target.classList.contains("accordian__button");

    if (isTrigger) {
      handleUpDownKeys(target, key, keys, ctrlPageUpDown, triggers);
    } else if (ctrlPageUpDown) {
      // !isTrigger
      // Control + Page Up/ Page Down keyboard operations
      // Catches events that happen inside of panels
      panels.forEach((panel, index) => {
        if (panel.contains(target)) {
          triggers[index].focus();
          event.preventDefault();
        }
      });
    }

  });//accordian
});//accordians

function handleUpDownKeys(target, key, keys, ctrlPageUpDown, triggers) {
  const first = 0;
  const last = triggers.length - 1;
  if (key.match(keys.upDown) || ctrlPageUpDown) {
    const index = triggers.indexOf(target);
    const direction = key.match(keys.pageDownArrowDown) ? 1 : -1;
    const length = triggers.length;
    const newIndex = (index + length + direction) % length;
    triggers[newIndex].focus();
  } else if (key.match(keys.end)) {
    triggers[first].focus();
  } else if (key.match(keys.home)) {
    triggers[last].focus();
  } else {
    return false; // no event.preventDefault();
  }

  event.preventDefault();
}

// 33: page up
// 34: page down
// 35: end
// 36: home
// 37: arrow left
// 38: arrow up
// 39: arrow right
// 40: arrow down
// Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
const keys = {
  upDown: new RegExp(/38|40/),
  pageDownArrowDown: new RegExp(/34|40/),
  endHome: new RegExp(/35|36/),
  end: "35",
  home: "36",

  pageUp: "33",
  pageDown: "34"
};


function getHeight(el){
  return el.clientHeight;
}
