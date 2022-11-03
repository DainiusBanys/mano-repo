    // let navElement = document.getElementsByTagName('nav');
    // navElement.classList = 'navigation';
    // console.log(navElement.classList);

    // let liElems = document.querySelectorAll('li a');
    // console.log(liElems);
    // liElems.forEach(el => el.setAttribute('style', 'textTransform : uppercase'));

    // let ULElem = document.getElementsByTagName('ul').item(0).style.textTransform = 'uppercase';
    // console.log(ULElem);

    // const link = document.querySelector('li');
    // link.remove();
    // console.log(link);

    // const head = document.querySelector("h1");
    // head.style.color = 'gray';


    // let textDiv = Array.from(document.querySelectorAll('div.site-wrap p'));
    // console.log(textDiv);

    // textDiv.forEach((element, index) => {
    //     (index % 2) ? element.classList.add('odd'): element.classList.add('even')
    // });

    let element = document.querySelectorAll('#main a');
    console.log(element[0]);
    element[0].onclick = function() { window.open("https://www.google.com/search?q=home"); }
    element[1].onclick = function() { window.open("https://www.google.com/search?q=about"); }
    element[2].onclick = function() { window.open("https://www.google.com/search?q=images"); }
    element[3].onclick = function() { window.open("https://www.google.com/search?q=locations"); }
    element[4].onclick = function() { window.open("https://www.google.com/search?q=maps"); }