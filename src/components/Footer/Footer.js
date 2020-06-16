import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
	return (
		<footer>
			<div>
				<p>&copy; 2020 MovieBuddy</p>
			</div>
			<div>
				<a
					href='https://github.com/Connorrichter4'
					target='_blank'
					rel='noopener noreferrer'
					className='footer-links'>
					<FontAwesomeIcon icon={faGithub} size='2x' />
				</a>
				<a
					href='https://www.linkedin.com/in/connorrichter4/'
					target='_blank'
					rel='noopener noreferrer'
					className='footer-links'>
					<FontAwesomeIcon icon={faLinkedinIn} size='2x' />
				</a>
			</div>
		</footer>
	);
}

export default Footer;
