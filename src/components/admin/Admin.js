import React  from 'react';
import AdminLogin from './Login';
import { AdminContext } from '../../Context';
import {  Outlet, useLocation, Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import '../../css/admin/admin.css';
import { apiAuth } from '../../Api';


const Header = () => {
	const path = useLocation().pathname;
	const [burgerOpen, setBurgerOpen] = React.useState(false);

	const links = () => (
		<div className='adminHeader'>
			<Link className={`link${path === '/photos' && ' selected'}`} to="photos">Photo Upload</Link>
		</div>
	);

	return (
		<div className="Header">
			<h2>Admin</h2>
			<nav className='listNav'>
				{ links() }
			</nav>
			<nav className='burgerNav'>
				<HamburgerMenu isOpen={burgerOpen} menuClicked={() => setBurgerOpen(current => !current)} />
				{ burgerOpen && <div className='burgerNavLinks'>
					{ links() }
				</div> }
			</nav>
		</div>
	);
}

const Admin = ({ setErr }) => {
	const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem('ce_admin') || '{}'));
	React.useEffect(() => {
		if (!admin) {
			return;
		}
		apiAuth({ admin }).then((res) => {
			if (!res || res?.health !== 'healthy') {
				setAdmin(null);
			}
		})
	}, [admin]);
	return (
		<div>
			<AdminContext.Provider value={[admin, setAdmin]}>
				<AdminLogin setAdmin={setAdmin} admin={admin} />
				{ admin && <Header /> }
				<Outlet setErr={setErr} />
			</AdminContext.Provider>
		</div>
	);
};

export default Admin;
