<?php
/*
Plugin Name: Plugin Base Digamber
Description: My Plugin Description Goes Here
Plugin URI: URI goes here
Author: Digamber Pradhan
Author URI: https://www.digamberpradhan.com/
Version: 1.0
License: http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
Text Domain: plugin-base
*/

defined( 'ABSPATH' ) or die( 'Script Kiddies Go Away' );

if ( ! defined( 'PLUGIN_FILE_PATH' ) ) {
	define( 'PLUGIN_FILE_PATH', __FILE__ );
}
if ( ! defined( 'PLUGIN_DIR' ) ) {
	define( 'PLUGIN_DIR', DIRNAME( __FILE__ ) );
}

require_once PLUGIN_DIR . '/src/Bootstrap.php';