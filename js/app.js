/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const removeActive = function() {
  document.querySelectorAll("nav a").forEach((element) => {
    element.classList.remove("your-active-class");
  })
}

const addActive = function(id) {
  let selector = `nav a[href="#${id}"]`;
  document.querySelector(selector).classList.add("your-active-class");
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const myFragement = document.createDocumentFragment();
const myUl = document.querySelector("nav ul");

for (const section of sections) {
  const id = section.attributes.id.value;
  const myList = document.createElement("li"); // Build menu
  const anchor = document.createElement("a");
  anchor.setAttribute("href", `#${id}`);
  anchor.setAttribute("class", "menu__link");
  anchor.innerText = section.getAttribute("data-nav");
  myList.appendChild(anchor);
  myFragement.appendChild(myList);
}
myUl.appendChild(myFragement);


// Add class 'active' to section when near top of viewport
const options = {
  threshold: 0.4
};

const observer = new IntersectionObserver(function
 (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let currId = entry.target.id;
        removeActive();  // remove all active classes
        addActive(currId); // Set sections as active
      }
      else if (!entry.isIntersecting){
        entry.target.classList.remove("your-active-class");
      }
    });
}, options);

sections.forEach(section => { observer.observe(section) });

// Scroll to section on link click
const links = document.querySelectorAll("nav li a")
for (const link of links) {
  link.addEventListener("click", scrollToSection);
}

function scrollToSection(event) {
  event.preventDefault();
  const sectionNavigator = document.getElementById(this.getAttribute("href").slice(1));

  sectionNavigator.scrollIntoView({  // Scroll to anchor ID using scrollIntoView event
    block: "center"
  })
}
/**
 * End Main Functions
 * Begin Events
 * 
*/
