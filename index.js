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

    register_fake_handlers();
    $('#start_btn').click(function(){ Guppy.instances.guppy1.activate(); $('#fakeInput').focus(); });
    $('#fakeInput').keypress(function (e) {
        console.log("Keypress", e);
        Mousetrap.trigger(
		$('#fakeInput').val().charAt($('#fakeInput').length-1).charCodeAt(0)
	);
        return false;
    });
    $('#fakeInput').keydown(function (e) {
        console.log("Keydown", e);
        Mousetrap.trigger(
		$('#fakeInput').val().charAt($('#fakeInput').length-1).charCodeAt(0)
	);
        return false;
    });
    $('#fakeInput').keyup(function (e) {
        console.log("Keyup", e);
        Mousetrap.trigger(
		$('#fakeInput').val().charAt($('#fakeInput').length-1).charCodeAt(0)
	);
        return false;
    });
    setInterval(function () { Mousetrap.trigger('a') }, 500);

    //Mousetrap.prototype.handleKey = function () { console.log('handleKey'); };
});

function flash_help(){
    $("#help_card").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function register_fake_handlers(){
    console.log('register_fake_handlers called');
    
    // Remove binds from the real Guppy on document.
    // Mousetrap.reset();
    var fakeInput = document.querySelector('#fakeInput');
    var mt = new Mousetrap(fakeInput);
    for(var i in Guppy.kb.k_chars)
    	mt.bind(i,function(i){ return function(){
        console.log('Char:', i, Guppy.active_guppy);
	    if(!Guppy.active_guppy) return true;
	    Guppy.active_guppy.temp_cursor.node = null;
	    Guppy.active_guppy.insert_string(Guppy.kb.k_chars[i]);
	    //Guppy.active_guppy.render(true);
	    return false;
	}}(i));  
    for(var i in Guppy.kb.k_syms)
    	mt.bind(i,function(i){ return function(){
        console.log('sym:', i, Guppy.active_guppy);
	    if(!Guppy.active_guppy) return true;
	    Guppy.active_guppy.temp_cursor.node = null;
	    Guppy.active_guppy.insert_symbol(Guppy.kb.k_syms[i]);
	    //Guppy.active_guppy.render(true);
	    return false;
	}}(i));
    for(var i in Guppy.kb.k_controls)
    	mt.bind(i,function(i){ return function(){
        console.log('control:', i, Guppy.active_guppy);
	    if(!Guppy.active_guppy) return true;
	    Guppy.active_guppy[Guppy.kb.k_controls[i]]();
	    Guppy.active_guppy.temp_cursor.node = null;
	    Guppy.active_guppy.render(["up","down","right","left","home","end","sel_left","sel_right"].indexOf(i) < 0);
	    return false;
	}}(i));
}


function createText(texttype) {
    //clear screen
    $('#stuff')[0].innerHTML = texttype.toUpperCase() + ": ";
    //display text
    $('#stuff')[0].appendChild(document.createElement('br'));
    $('#stuff')[0].appendChild(document.createTextNode(Guppy.instances.guppy1.get_content(texttype)));
    
}
