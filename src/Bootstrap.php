<?php

namespace Digthis\PluginBase;

use Digthis\PluginBase\AdminArea\Admin;
use Digthis\PluginBase\Frontend\Shortcodes;
use Digthis\PluginBase\Helpers\templates;

final class Bootstrap {
	const VERSION = '1.0.0';
	const MINIMUM_PHP_VERSION = '7.4';
	public static $_instance = null;
	private $admin_area = null;
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
		$this->templating = templates::get_instance();

		add_action( 'plugins_loaded', array( $this, 'admin_init' ) );
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
		$this->admin_area = new Admin();
		new Shortcodes();
	}

}

Bootstrap::get_instance();