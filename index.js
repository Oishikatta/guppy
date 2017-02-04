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
});

function flash_help(){
    $("#help_card").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function register_fake_handlers(){
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

register_fake_handlers();
$('#fakeInput').click(function(){ Guppy.instances.guppy1.activate(); $('#fakeInput').focus(); });

function createText(texttype) {
    //clear screen
    $('#stuff')[0].innerHTML = texttype.toUpperCase() + ": ";
    //display text
    $('#stuff')[0].appendChild(document.createElement('br'));
    $('#stuff')[0].appendChild(document.createTextNode(Guppy.instances.guppy1.get_content(texttype)));
}
