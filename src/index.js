/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import { GeneralTab } from './tabs/general';
import { AdvancedTab } from './tabs/advanced';
/*Code goes here
 * Output : build/index.js
 * */

const { __ } = wp.i18n;

const { render, useState, useEffect } = wp.element;

const { isEqual } = lodash;

const { apiFetch } = wp;

const {
	TabPanel,
	Notice,
	Button,
	Card,
	CardHeader,
	CardBody,
	CardDivider,
	CardFooter,
	Spinner,
} = wp.components;

const AdminPanel = () => {
	const [ settings, setSettings ] = useState( {} ),
		[ needSave, setNeedsSave ] = useState( false ),
		[ isSaving, setIsSaving ] = useState( false ),
		[ initialTab, setInitialTab ] = useState( 'general' ),
		[ notice, setNotice ] = useState( {
			show: false,
			status: 'success',
			message: 'suffering from success',
		} );

	const tabs = [
		{
			name: 'general',
			title: 'General',
			className: 'tab-one',
		},
		{
			name: 'advanced',
			title: 'Advanced',
			className: 'tab-two',
		},
	];

	//on initial mount
	useEffect( () => {
		// console.log(digthisAdminObj);
		apiFetch( {
			url: ajaxurl + '?action=getDigthisAdminSettings',
		} ).then( ( res ) => {
			setSettings( res );
		} );
	}, [] );

	const PluginNotice = () => {
		if ( ! notice.show ) return '';

		return (
			<div>
				<Notice
					status={ notice.status }
					onRemove={ () => {
						setNotice( ( prevNotice ) => {
							const newNotice = { ...prevNotice };
							newNotice.show = false;
							return newNotice;
						} );
					} }
				>
					{ notice.message }
				</Notice>
			</div>
		);
	};
	const savePluginSettings = ( updateSettings ) => {
		// apiFetch.use( apiFetch.createNonceMiddleware( nonce ) );
		apiFetch( {
			url: ajaxurl + '?action=saveDigthisAdminSettings',
			method: 'POST',
			data: { settings: updateSettings, nonce: digthisAdminObj.nonce },
		} )
			.then( ( res ) => {
				setIsSaving( false );
				setSettings( res.settings );
				setNotice( ( prevNotice ) => {
					let updateNotice = { ...prevNotice };
					updateNotice.show = true;
					updateNotice.status = res.notice.status;
					updateNotice.message = res.notice.message;
					return updateNotice;
				} );
				setNeedsSave( false );
			} )
			.catch( ( error ) => {
				// If the browser doesn't support AbortController then the code below will never log.
				// However, in most cases this should be fine as it can be considered to be a progressive enhancement.
				if ( error.name === 'AbortError' ) {
					console.log( 'Request has been aborted' );
				} else {
					setIsSaving( false );
					setNotice( {
						show: true,
						status: 'error',
						message: 'Settings could not be saved!',
					} );
					setNeedsSave( true );
				}
			} );
	};

	const updateSettingsState = ( key, val ) => {
		let newSetting = { ...settings };
		newSetting[ key ] = val;
		setSettings( newSetting );
		setNeedsSave( true );
	};

	return (
		<Card>
			<CardHeader>
				<h1>{ __( 'Plugin Settings', 'plugin-base' ) }</h1>
			</CardHeader>
			<CardBody>
				<PluginNotice />
				{ ( ! Object.keys( settings ).length || isSaving ) && (
					<Spinner />
				) }

				{ ! isSaving && Object.keys( settings ).length > 0 && (
					<TabPanel
						className="my-tab-panel"
						activeClass="active-tab"
						initialTabName={ initialTab }
						tabs={ tabs }
					>
						{ ( tab ) => {
							if ( 'general' === tab.name ) {
								setInitialTab( 'general' );
								return (
									<GeneralTab
										settings={ settings }
										updateSettings={ updateSettingsState }
									/>
								);
							} else if ( 'advanced' === tab.name ) {
								setInitialTab( 'advanced' );
								return (
									<AdvancedTab
										settings={ settings }
										updateSettings={ updateSettingsState }
									/>
								);
							}
							return '';
						} }
					</TabPanel>
				) }
			</CardBody>
			<CardDivider />
			<CardFooter>
				<Button
					className={ 'button button-large button-primary' }
					onClick={ () => {
						setIsSaving( true );
						savePluginSettings( settings );
					} }
					disabled={ ! needSave || isSaving }
					isPrimary
				>
					{ __( 'Save', 'plugin-base' ) }
				</Button>
			</CardFooter>
		</Card>
	);
};

document.addEventListener( 'DOMContentLoaded', () => {
	if (
		'undefined' !==
			typeof document.getElementById( 'plugin-base-admin-settings' ) &&
		null !== document.getElementById( 'plugin-base-admin-settings' )
	) {
		render(
			<AdminPanel />,
			document.getElementById( 'plugin-base-admin-settings' )
		);
	}
} );
