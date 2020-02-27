<?php
/*
Plugin Name: Plugin Base Digamber
Description: My Plugin Description Goes Here
Plugin URI: URI goes here
Author: Digamber Pradhan
Author URI: https://www.digamberpradhan.com/
Version: 1.0
License: http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
Text Domain: plugin-text-domain
*/

defined( 'ABSPATH' ) or die( 'Script Kiddies Go Away' );

if ( ! defined( 'PLUGIN_FILE_PATH' ) ) {
				define( 'PLUGIN_FILE_PATH', __FILE__ );
}
if ( ! defined( 'PLUGIN_DIR' ) ) {
	define( 'PLUGIN_DIR', DIRNAME( __FILE__ ) );
}

final class pluginName {
	const VERSION = '1.0.0';
	public static $_instance = null;
	private $admin_area = null;

	/**
	 * @return pluginName|null
	 */
	public static function get_instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self:: $_instance;
	}

	/**
	 * pluginName constructor.
	 */
	public function __construct() {
		$this->autoload();

		add_action('plugins_loaded',array($this,'admin_init'));
	}

	/**
	 * Autoload - PSR 4 Compliance
	 */
	public function autoload() {
		require_once PLUGIN_DIR . '/vendor/autoload.php';
	}

	public function admin_init() {
		$admin_area = new Digthis\AdminArea\Admin();
	}

}

pluginName::get_instance();