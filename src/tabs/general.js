const {__} = wp.i18n;

const {Fragment} = wp.element;

const {CardBody, CardDivider, TextControl} = wp.components;
import Select from 'react-select';

export const GeneralTab = (props) => {
    const {settings, updateSettings} = props;
    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ]
    return (
        <Fragment>
            <CardBody>
                <TextControl
                    label={__('Setting', 'plugin-base')}
                    placeholder={__('Enter Text', 'plugin-base')}
                    value={settings && settings.setting_1}
                    onChange={(newVal) =>
                        //carefull if you set this wrong then you;ll have errors    
                        updateSettings('setting_1', newVal)
                    }
                />
            </CardBody>
            <CardDivider/>
            <CardBody>
                <Select
                    //alright for now lets take the option of saving the options as key value pair.
                    //default option should be {label:'Chocholate','value':'chocolate'} format
                    defaultValue={settings && settings.flavor}
                    options={options}
                    onChange={(newVal) => {
                        updateSettings('flavor', newVal);
                    }}
                />
            </CardBody>
        </Fragment>
    );
};
