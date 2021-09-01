<?php

namespace Digthis\PluginBase;

use Digthis\PluginBase\Backend\Admin;
use Digthis\PluginBase\Main\Shortcodes;
use Digthis\PluginBase\Helpers\templates;

final class Bootstrap {
	const VERSION = '1.0.0';
	const MINIMUM_PHP_VERSION = '7.4';
	public static $_instance = null;
	public $templating = null;

	/**
	 * @return Bootstrap|null
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
		if ( version_compare( PHP_VERSION, self::MINIMUM_PHP_VERSION, '<' ) ) {
			add_action( 'admin_notices', [ $this, 'admin_notice_minimum_php_version' ] );

			return;
		}
		$this->autoload();
		$this->templating = Templates::get_instance();

		add_action( 'plugins_loaded', array( $this, 'admin_init' ) );
		register_activation_hook( PLUGIN_FILE_PATH, [ $this, 'plugin_activated' ] );
		register_deactivation_hook( PLUGIN_FILE_PATH, [ $this, 'plugin_deactivated' ] );
	}

	public function plugin_activated() {
		//other plugins can get this option and check if plugin is activated
		update_option( 'digthis_plugin_activate', 'activated' );
	}

	public function plugin_deactivated() {
		delete_option( 'digthis_plugin_activate' );
	}

	public function admin_notice_minimum_php_version() {

		if ( isset( $_GET['activate'] ) ) {
			unset( $_GET['activate'] );
		}
		$message = sprintf(
		/* translators: 1: Plugin name 2: PHP 3: Required PHP version */
			esc_html__( '"%1$s" requires "%2$s" version %3$s or greater.', 'plugin-base' ),
			'<strong>' . esc_html__( 'Plugin Base', 'plugin-base' ) . '</strong>',
			'<strong>' . esc_html__( 'PHP', 'plugin-base' ) . '</strong>',
			self::MINIMUM_PHP_VERSION
		);

		printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

	}

	/**
	 * Autoload - PSR 4 Compliance
	 */
	public function autoload() {
		require_once PLUGIN_DIR . '/vendor/autoload.php';
	}

	public function admin_init() {
		Admin::get_instance();
		Shortcodes::get_instance();
	}

}

Bootstrap::get_instance();