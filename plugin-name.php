<?php
/*
Plugin Name: Plugin Base Digamber
Description: My Plugin Description Goes Here
Plugin URI: URI goes here
Author: Digamber Pradhan
Author URI: http://www.digamberpradhan.com.np/
Version: 1.0
License: http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
Text Domain: plugin-text-domain
*/

/**
 * Define Plugin FILE PATH
 */

defined( 'ABSPATH' ) or die( 'Script Kiddies Go Away' );

if ( ! defined( 'PLUGIN_FILE_PATH' ) ) {
	define( 'PLUGIN_FILE_PATH', __FILE__ );
}
if ( ! defined( 'PLUGIN_DIR' ) ) {
	define( 'PLUGIN_DIR', DIRNAME( __FILE__ ) );
}

if ( file_exists( PLUGIN_DIR . '/vendor/autoload.php' ) ) {
	require_once PLUGIN_DIR . '/vendor/autoload.php';
	add_action('plugins_loaded',function(){
		new Digthis\AdminArea\Admin();
	});
}