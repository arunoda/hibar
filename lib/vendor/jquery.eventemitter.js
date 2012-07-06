function makeProxy( name ) {
	return function() {
		( this._JQ || ( this._JQ = $( this ) ) )[name].apply( this._JQ, arguments );
	};
}

$.eventEmitter = {
	emit: makeProxy( "trigger" ),
	once: makeProxy( "one" ),
	on: makeProxy( "on" ),
	off: makeProxy( "off" )
};