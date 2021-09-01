<?php
// if uninstall.php is not called by WordPress, die
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	die;
}
$option_keys = [
	'digthis_plugin_activate'
];

foreach ( $option_keys as $option_key ) {
	delete_option( 'digthis_plugin_activate' );
	delete_option( 'digthisAdminSettings' );
}