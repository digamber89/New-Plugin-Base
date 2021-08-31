const { __ } = wp.i18n;

const { Fragment } = wp.element;

const { CardBody, CardDivider, TextControl } = wp.components;

export const GeneralTab = ( props ) => {
	const { settings, updateSettings } = props;
	return (
		<Fragment>
			<CardBody>
				<TextControl
					label={ __( 'Setting', 'plugin-base' ) }
					placeholder={ __( 'Enter Text', 'plugin-base' ) }
					value={ settings && settings.setting_1 }
					onChange={ ( newVal ) =>
						updateSettings( 'setting_1', newVal )
					}
				/>
			</CardBody>
			<CardDivider />
		</Fragment>
	);
};
