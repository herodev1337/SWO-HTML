$(document).ready(function() {
    $('.main-container').css('padding-top', $('nav').css("height"));
});
window.onscroll = function() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $('*[class^="nav-caption"]').each(function(index) {
            $(this).addClass('d-none');
        });
    } else {
        $('*[class^="nav-caption"]').each(function(index) {
            $(this).removeClass('d-none');
        });
    }
    $('.main-container').css('padding-top', $('nav').css("height"));
};

/*------------------------------------------------------------------------------------------------*/

/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LETTERIZE /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Input: None
Output: None
Action: Sets the animation for the Letters on the Home Screen
*/


var textWrapper = document.querySelector('.letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
    .add({
        targets: '.letter',
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 600,
        delay: (el, i) => 70 * (i + 1)
    });

/*------------------------------------------------------------------------------------------------*/

/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// PROGRESSBAR ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Input: Element
Output: none
Action: Initialize the Progressbar and starts to observe it. When called again and the element is already initialized, it starts the animation if in viewport.
*/

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            //In viewport? Animate!
            animateProgressbar(entry.target);
            return;
        }
    });
});

let pgb = [];

function animateProgressbar(element) {
    //Index Variable for Array
    let i;

    //Already Initialized? If not ->
    if (!$(element).attr('aria-init')) {
        console.log("Element %s not initialized. Pushing to pgb...", element);

        //Push the Progressbar element into the Array
        pgb.push(new ProgressBar.SemiCircle(element, {
            strokeWidth: 6,
            color: '#ED6A5A',
            trailColor: '#eee',
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 2000,
            svgStyle: null,
            text: {
                value: '',
                alignToBottom: false
            },
            from: { color: '#ED6A5A' },
            to: { color: '#32CD32' },

            step: (state, bar) => {
                bar.path.setAttribute('stroke', state.color);
                var value = Math.round(bar.value() * 100);
                if (value === 0) {
                    bar.setText('');
                } else {
                    bar.setText(value);
                }

                bar.text.style.color = state.color;
            }
        }));

        //Set the element attr "aria-init" to true
        $(element).attr('aria-init', true);
        console.log("Pushed successfully. Starting to observe...");

        //Lets observe the element
        observer.observe(element);
        return;
    } else { //<- Already initialized
        //Check all entries in Array to get the matching ID
        pgb.forEach((arrayitem, index) => {
            if ($(arrayitem["_container"]).attr("id").match($(element).attr('id'))) {
                console.log("Got element %s -> Container %s with Index %s", $(element).attr('id'), $(arrayitem["_container"]).attr("id"), index)
                i = index;
            }
        });

        //Already loaded? If true, return. If not, go on
        if ($(element).attr('aria-loaded')) { return; }

        //Get the Element from the Array and let it animate. Value from "aria-valuenow"/100
        pgb[i].animate($(element).attr('aria-valuenow') / 100);

        //Set "aria-loaded" to true
        $(element).attr('aria-loaded', true);
        console.log("Successfully animated %s with ID %s", element, i)
        return;
    }
}

//Get all Elements with "progress-animated-*" and let the observe
$('*[id^="progress-animated-"]').each(function(i, obj) {
    animateProgressbar(document.getElementById($(this)[0].id), i);
});

/*------------------------------------------------------------------------------------------------*/