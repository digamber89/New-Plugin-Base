const {
    __
} = wp.i18n;

const {
    Fragment
} = wp.element;

const {
    CardBody,
    CardDivider,
    TextControl,
    ToggleControl
} = wp.components;


export const AdvancedTab = (props) => {
    const {settings, updateSettings} = props;
    return (
        <CardBody>
            <ToggleControl
                label="Fixed Background"
                help={'Set Fixed Background'}
                checked={settings && settings['fixedBackground']}
                onChange={(value) => {
                    updateSettings('fixedBackground',value);
                }}
            />
        </CardBody>

    );
}