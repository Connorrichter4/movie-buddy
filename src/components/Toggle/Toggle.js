import React, { useState } from 'react';

function Toggle({ render }) {
	const [on, setOn] = useState(false);

	const toggle = () => {
		setOn(!on);
	};

	return <div>{render({ on: on, toggle: toggle })}</div>;
}

export default Toggle;
