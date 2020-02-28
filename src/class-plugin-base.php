<?php

final class base {
	const VERSION = '1.0.0';
	public static $_instance = null;
	private $admin_area = null;
	public $templating = null;

	/**
	 * @return base|null
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
		$this->templating = \Digthis\PluginBase\Helpers\templates::get_instance();
		add_action( 'plugins_loaded', array( $this, 'admin_init' ) );
	}

	/**
	 * Autoload - PSR 4 Compliance
	 */
	public function autoload() {
		require_once PLUGIN_DIR . '/vendor/autoload.php';
	}

	public function admin_init() {
		$this->admin_area = new \Digthis\PluginBase\AdminArea\Admin();
		new \Digthis\PluginBase\Frontend\Shortcodes();
	}

}

function digthisPluginBase() {
	return base::get_instance();
}

digthisPluginBase();