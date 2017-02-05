$('document').ready(function() {
    $('#xml_btn').on('click', function() {
        createText('xml');
    });
    $('#text_btn').on('click', function() {
        createText('text');
    });
    $('#latex_btn').on('click', function() {
        createText('latex');
    });
    $('#clear_btn').on('click', function() {
        $('#stuff')[0].innerHTML = '';
    });

    Guppy.get_symbols(["builtins","sym/symbols.json","sym/extra_symbols.json"]);
    var g1 = new Guppy("guppy1", {
	//'debug':10,
        'right_callback': function() {},
        'left_callback': function() {},
        'done_callback': function() { createText('text'); },
        //'blank_caret': "[?]",
        'empty_content': "\\color{gray}{\\text{Click here to start typing a mathematical expression}}"
    });

    // The focus() call must be in a click event handler and on a text field to make the mobile keyboard appear.
    $('#start_btn').click(function(){ Guppy.instances.guppy1.activate(); $('#fakeInput').focus(); });

    // Mapping characters back to Mousetrap codes. Use Mousetrap.trigger(code) to replay them.
    k_sym_reverse_map = {
        '^': 'shift+6',
        '*': 'shift+8',
        '(': 'shift+9',
        '<': 'shift+,',
        '>': 'shift+.',
        '\\': 'shift+\\',
        
        ' ': 'space',
        ')': 'shift+0',
        '>': 'shift+.'
        // Missing up/down - user will have to use [space], 'sub' instead.
        // Mobile devices typically don't have arrow keys anyways.
    };
    
    // TODO: Determine which events are actually needed.
    $('#fakeInput').on('input change compositionstart compositionend compositionupdate keydown', $.debounce(100, function (e) {
        console.log(e);
        
        // Clear the Guppy instance by setting its content to the output of get_content when empty.
        Guppy.instances.guppy1.set_content('<m><e></e></m>');
        Guppy.instances.guppy1.render(true);
        
        // Get the content of the text input field as an array of characters.
        var textContent = document.querySelector('#fakeInput').value.toLowerCase().split('');
        
        for ( var i = 0; i < textContent.length; i++ ) {
            c = textContent[i];
            console.log(c);
            
            // Replay the key combination for each character on the document.
            if ( c in k_sym_reverse_map ) {
                Mousetrap.trigger(k_sym_reverse_map[c]);
            } else {
                Mousetrap.trigger(c);
            }
        }
    }));
});

function flash_help(){
    $("#help_card").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function createText(texttype) {
    //clear screen
    $('#stuff')[0].innerHTML = texttype.toUpperCase() + ": ";
    //display text
    $('#stuff')[0].appendChild(document.createElement('br'));
    $('#stuff')[0].appendChild(document.createTextNode(Guppy.instances.guppy1.get_content(texttype)));
    
}
