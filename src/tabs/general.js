const { __ } = wp.i18n;

const { Fragment } = wp.element;

const { CardBody, CardDivider, TextControl } = wp.components;
const { apiFetch } = wp;
import { debounce } from 'lodash';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';

export const GeneralTab = ( props ) => {
	const { settings, updateSettings } = props;

	const promiseOptions = ( inputValue, callback ) => {
		apiFetch( {
			url: ajaxurl + '?action=digthisGetPosts&search=' + inputValue,
		} )
			.then( ( res ) => {
				callback( res );
			} )
			.catch( ( error ) => {
				callback( [] );
				console.log( error );
			} );
	};

	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];

	return (
		<Fragment>
			<CardBody>
				<TextControl
					label={ __( 'Setting', 'plugin-base' ) }
					placeholder={ __( 'Enter Text', 'plugin-base' ) }
					value={ settings && settings.setting_1 }
					onChange={ ( newVal ) => {
						//carefull if you set this wrong then you;ll have errors
						updateSettings( 'setting_1', newVal );
					} }
				/>
			</CardBody>
			<CardDivider />
			<CardBody>
				<Select
					//alright for now lets take the option of saving the options as key value pair.
					//default option should be {label:'Chocholate','value':'chocolate'} format
					defaultValue={ settings && settings.flavor }
					options={ options }
					loadingMessage={ 'Filtering' }
					onChange={ ( newVal ) => {
						updateSettings( 'flavor', newVal );
					} }
				/>
			</CardBody>
			<CardDivider />
			<CardBody>
				<label>
					Select Featured Post
					<AsyncSelect
						cacheOptions={ true }
						defaultOptions={ settings && settings.selectedPost }
						defaultValue={ settings && settings.selectedPost }
						isClearable
						loadOptions={ debounce( promiseOptions, 800 ) }
						onChange={ ( input, { action } ) => {
							if (
								action === 'select-option' ||
								action === 'clear'
							) {
								updateSettings( 'selectedPost', input );
							}
						} }
					/>
				</label>
			</CardBody>
		</Fragment>
	);
};
