class Modal {
    constructor(id, title, text) {
        this.id = id;
        this.setup();
    }

    setup() {
        const modalHtml =
            `
            <div class="modal-inner">
              <div class="modal-inner-content">
                <div class="modal-header">
                  <button type="button" class="close-button modal-close-button" data-target="parts-modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h3 class="modal-title">title</h3>
                </div><!--End modal-header-->
                <div class="modal-body">
                    <p>text</p>
                </div><!--End Modal-Body-->
                <div class="modal-footer">
                  <button type="button" class="footer-close-button modal-close-button" data-target="parts-modal" aria-label="Close" ><span aria-hidden="true">Close</span></button>
                </div><!-- End Modal Footer-->
              </div>
            </div>
        `;
        return modalHtml;

    }
}







// show() {

// }

// hide() {

// }

// }

const mod1 = new Modal('modal1', 'Modal1', 'Some random text');
const mod2 = new Modal('modal2', 'Hellop World', 'Text');

// console.log(mod1.setup());
const body = document.body;




buttonEvent = document.querySelectorAll('button.modal-button.footer-close-button');
buttonEvent[0].onclick = function() {
    body.insertAdjacentHTML('afterbegin', mod1.setup());
    let buttonClose = document.querySelector("[data-target='parts-modal']");
    return buttonClose;
};

let buttonClose;
console.log(buttonClose);


// console.log(body.querySelector(".modal-inner"));
// buttonClose.onclick = function() { console.log('click close!') };


buttonEvent[1].onclick = function() {
    body.insertAdjacentHTML('afterbegin', mod1.setup());
    buttonClose = document.querySelector("[data-target='parts-modal']");
    console.log(buttonClose)
};


console.dir(document);