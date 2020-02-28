<?php

namespace Digthis\PluginBase\AdminArea;
/**
 * Class plugin_admin
 */
class Admin {
	public static $instance = null;
	public $settings = '';
	public $admin_page_url = 'plugin-url';
	public $menu_page = '';
	private $message = null;

	/**
	 * @return Admin
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 * plugin_admin constructor.
	 */
	public function __construct() {
		/*load dependencies if required*/
		add_action( 'admin_menu', array( $this, 'admin_menu_page' ) );
		add_action( 'admin_init', array( $this, 'save_settings' ), 10 );
		//Priority for the settings objects need to be done after the fact
		add_action( 'admin_init', array( $this, 'setSettings' ), 20 );
		add_action( 'admin_enqueue_scripts', array( $this, 'load_scripts' ) );

	}

	public function admin_menu_page() {
		$this->menu_page = add_menu_page(
			'Plugin Title',
			'Plugin Dashboard Title',
			'manage_options',
			$this->admin_page_url,
			array( $this, 'generate_admin_page' )
		);
		//var_dump($menu_page); die;

	}

	/**
	 * @param $hook_suffix
	 */
	public function load_scripts( $hook_suffix ) {
		$assets_url = plugins_url( '/assets/', PLUGIN_FILE_PATH );
		wp_register_script( 'plugin-admin-script', $assets_url . '/js/admin.js', [ 'jquery' ], '1.0.0', true );

		if ( $hook_suffix == $this->menu_page ) {
			wp_enqueue_script( 'plugin-admin-script' );
		}
	}

	/**
	 *
	 */
	public function generate_admin_page() {
		require_once( PLUGIN_DIR . '/views/AdminArea/index.php' );
	}

	/**
	 *
	 */
	public function save_settings() {
		$nonce = filter_input( INPUT_POST, 'plugin_settings_nonce' );

		/*Bail Early*/
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if ( empty( $nonce ) ) {
			return;
		}

		if ( ! wp_verify_nonce( $_POST['plugin_settings_nonce'], 'verify_plugin_settings_nonce' ) ) {
			return;
		}

		$config          = array();
		$config['email'] = filter_input( INPUT_POST, 'email' );
		$config['api-key'] = filter_input( INPUT_POST, 'api-key' );
		if ( empty( $config['email'] ) ) {
			$this->set_message( 'error', 'Error - email cannot be empty' );
			return; 
		}
		update_option( 'my_plugin_settings', $config );
		$this->set_message( 'success', 'Settings Saved' );

	}

	/**
	 * @param string $type
	 * @param string $message
	 */
	public function set_message( $type = '', $message = '' ) {

		$class = array(
			'error'   => 'notice error',
			'success' => 'notice updated'
		);

		if ( ! array_key_exists( $type, $class ) ) {
			return;
		}

		$this->message = '<div class="' . $class[ $type ] . '"><p>' . $message . '</p></div>';
	}

	public function get_message() {
		return $this->message;
	}

	public function setSettings() {
		$this->settings = get_option( 'my_plugin_settings' );
	}

}
