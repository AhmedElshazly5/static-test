// query them and store them in variables
let sections = document.querySelectorAll('section');
let myUL = document.getElementById('navbar__list');
let myFragment = document.createDocumentFragment();


//create the links dynamically,store them in variables
sections.forEach((section) => {
    let myText = section.getAttribute('data-nav');
    let myList = document.createElement('li');
    let myLink = document.createElement('a');
    myLink.addEventListener('click', function() {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
    let newText = document.createTextNode(myText);
    myLink.appendChild(newText);
    myList.appendChild(myLink);
    //we append them to the document fragment in the forEach loop for better performance,less reflow/repaint
    myFragment.appendChild(myList);
});
//the final step is to append my document fragment to the list
myUL.appendChild(myFragment);

//this function purpose is so that each links get the data-nav value for his section
function active_link(active_section) {
    let myLink = document.querySelectorAll('a');
    let mySection = active_section.getAttribute('data-nav');
    myLink.forEach((link) => {
        //it's important to remove the class from all the links before adding the active ones        
        link.classList.remove('active');
        if (link.textContent == mySection) {
            link.classList.add('active');
        }
    });

}


document.addEventListener("scroll", function() {
    sections.forEach((section) => {
        section.classList.remove('active');
        // we use getBoundingClientRect for interacting with the viewport so that the active section is the one differentiated        
        let myRect = section.getBoundingClientRect();
        if (myRect.top >= 0 && myRect.bottom < window.innerHeight + 60) {
            //it's also important here to remove classes before adding the active ones
            section.classList.add('active');
            active_link(section);
        }
    });

});